import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import {
  SITE_META,
  COMPONENT_CATEGORIES,
  COMPONENTS_CATALOG,
  BLOCK_DOMAIN_CATEGORIES,
  BLOCKS_CATALOG_RAW,
  DEMOS_CATALOG,
} from './catalog-meta.mjs'

const require = createRequire(import.meta.url)
const ts = require('../node_modules/typescript')

const ROOT = path.resolve(new URL('..', import.meta.url).pathname)
const REG_ROOT = path.join(ROOT, 'registry/glaze')
const PUBLIC_R_DIR = path.join(ROOT, 'public/r')
const PUBLIC_LLMS_DIR = path.join(ROOT, 'public/llms')
const GENERATED_DIR = path.join(ROOT, 'src/docs/generated')

const REGISTRY_HOMEPAGE = (
  process.env.REGISTRY_HOMEPAGE ||
  process.env.REGISTRY_BASE_URL ||
  SITE_META.homepage
).replace(/\/$/, '')
const REGISTRY_BASE_URL = (process.env.REGISTRY_BASE_URL || SITE_META.registryBaseUrl).replace(/\/$/, '')
const DEP_MODE = process.env.REGISTRY_DEP_MODE || 'namespace' // 'namespace' (@glaze/foo) | 'url' (https://.../r/foo.json)

function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function depRef(name) {
  return DEP_MODE === 'url' ? `${REGISTRY_BASE_URL}/r/${name}.json` : `${SITE_META.registryNamespace}/${name}`
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
  fs.mkdirSync(dir, { recursive: true })
}

// External npm package resolver from import specifier
function resolveNpmPkg(spec) {
  if (spec === 'react' || spec === 'react-dom' || spec.startsWith('react/')) return null
  if (spec.startsWith('@/') || spec.startsWith('./') || spec.startsWith('../')) return null
  if (spec.startsWith('@')) {
    const [scope, pkg] = spec.split('/')
    return `${scope}/${pkg}`
  }
  return spec.split('/')[0]
}

// Parse imports to determine npm dependencies & registryDependencies
function analyzeFileDependencies(code, selfName) {
  const sf = ts.createSourceFile(`${selfName}.tsx`, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const npmDeps = new Set()
  const regDeps = new Set()

  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) && !ts.isExportDeclaration(stmt)) continue
    if (!stmt.moduleSpecifier || !ts.isStringLiteral(stmt.moduleSpecifier)) continue
    const spec = stmt.moduleSpecifier.text

    const npmPkg = resolveNpmPkg(spec)
    if (npmPkg) {
      npmDeps.add(npmPkg)
      continue
    }

    if (spec === '@/lib/tokens') {
      regDeps.add(depRef('tokens'))
    } else if (spec === '@/lib/motion') {
      regDeps.add(depRef('motion'))
    } else if (spec === '@/lib/topology') {
      regDeps.add(depRef('topology'))
    } else if (spec.startsWith('@/components/ui/')) {
      const target = spec.replace('@/components/ui/', '')
      if (target !== selfName) regDeps.add(depRef(target))
    } else if (spec.startsWith('@/components/blocks/')) {
      const target = spec.replace('@/components/blocks/', '')
      if (target !== selfName) regDeps.add(depRef(target))
    }
  }

  // Detect glaze.css utility classes that require @glaze/style
  if (
    /glaze-(grid|size-|popup|dialog-|drawer-|toast-|focus|topology)|animate-glaze-|font-glaze-|rounded-(tile|overlay|inner|control|item|icon)/.test(
      code,
    )
  ) {
    regDeps.add(depRef('style'))
  }

  return {
    dependencies: [...npmDeps].sort(),
    registryDependencies: [...regDeps].sort(),
  }
}

// Extract JSDoc comment text from a TS AST node
function getJsDoc(node, sourceText) {
  const ranges = ts.getLeadingCommentRanges(sourceText, node.pos) || []
  for (let i = ranges.length - 1; i >= 0; i--) {
    const raw = sourceText.slice(ranges[i].pos, ranges[i].end)
    if (raw.startsWith('/**')) {
      return raw
        .replace(/^\/\*\*/, '')
        .replace(/\*\/$/, '')
        .split('\n')
        .map((line) => line.replace(/^\s*\*\s?/, '').trim())
        .filter(Boolean)
        .join(' ')
    }
  }
  return ''
}

// Extract default values from function parameter object destructuring
function extractDefaultsFromFn(fnNode, sf) {
  const defaults = new Map()
  if (!fnNode?.parameters?.length) return defaults
  const firstParam = fnNode.parameters[0]
  if (firstParam && ts.isObjectBindingPattern(firstParam.name)) {
    for (const el of firstParam.name.elements) {
      if (el.initializer && ts.isIdentifier(el.name)) {
        const key = el.propertyName && ts.isIdentifier(el.propertyName) ? el.propertyName.text : el.name.text
        defaults.set(key, el.initializer.getText(sf).trim())
      }
    }
  }
  return defaults
}

// Parse TypeScript AST of a component/block file to extract Base UI-style Props API
function extractApiInfo(filePath) {
  const code = fs.readFileSync(filePath, 'utf8')
  const sf = ts.createSourceFile(path.basename(filePath), code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  const interfaces = new Map() // name -> { extends, props: [{name, type, optional, defaultValue, description}] }
  const typeAliases = []
  const componentDefaults = new Map() // componentName -> Map<prop, defaultStr>
  const componentPropsMap = new Map() // componentName -> interfaceName | inlineProps[]
  const exportedComponents = []

  // Pass 1: collect interfaces, type aliases, and component functions/forwardRefs
  for (const stmt of sf.statements) {
    const isExported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)

    if (ts.isInterfaceDeclaration(stmt)) {
      const ext = stmt.heritageClauses
        ? stmt.heritageClauses.map((h) => h.types.map((t) => t.getText(sf)).join(', ')).join(', ')
        : ''
      const props = []
      for (const member of stmt.members) {
        if (ts.isPropertySignature(member) && member.name) {
          const name = member.name.getText(sf).replace(/^['"]|['"]$/g, '')
          const type = member.type ? member.type.getText(sf).replace(/\s+/g, ' ').trim() : 'unknown'
          props.push({
            name,
            type,
            required: !member.questionToken,
            defaultValue: null,
            description: getJsDoc(member, code),
          })
        }
      }
      interfaces.set(stmt.name.text, { name: stmt.name.text, extends: ext, props })
    } else if (isExported && ts.isTypeAliasDeclaration(stmt)) {
      typeAliases.push({
        name: stmt.name.text,
        definition: stmt.type.getText(sf).replace(/\s+/g, ' ').trim(),
        description: getJsDoc(stmt, code),
      })
    } else if (isExported && ts.isFunctionDeclaration(stmt) && stmt.name) {
      const compName = stmt.name.text
      exportedComponents.push(compName)
      componentDefaults.set(compName, extractDefaultsFromFn(stmt, sf))
      const firstParam = stmt.parameters[0]
      if (firstParam?.type) {
        if (ts.isTypeReferenceNode(firstParam.type)) {
          componentPropsMap.set(compName, firstParam.type.typeName.getText(sf))
        } else if (ts.isTypeLiteralNode(firstParam.type)) {
          const inlineProps = []
          for (const member of firstParam.type.members) {
            if (ts.isPropertySignature(member) && member.name) {
              inlineProps.push({
                name: member.name.getText(sf).replace(/^['"]|['"]$/g, ''),
                type: member.type ? member.type.getText(sf).replace(/\s+/g, ' ').trim() : 'unknown',
                required: !member.questionToken,
                defaultValue: null,
                description: getJsDoc(member, code),
              })
            }
          }
          componentPropsMap.set(compName, inlineProps)
        }
      }
    } else if (isExported && ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue
        const compName = decl.name.text
        if (/^[A-Z]/.test(compName) || compName.startsWith('use')) {
          exportedComponents.push(compName)
        }
        // Check React.forwardRef<Ref, Props>(function Name(props, ref) {})
        if (decl.initializer && ts.isCallExpression(decl.initializer)) {
          const exprText = decl.initializer.expression.getText(sf)
          if (exprText.includes('forwardRef')) {
            const typeArgs = decl.initializer.typeArguments
            if (typeArgs && typeArgs.length >= 2) {
              const pArg = typeArgs[1]
              if (ts.isTypeReferenceNode(pArg)) {
                componentPropsMap.set(compName, pArg.typeName.getText(sf))
              }
            }
            const innerFn = decl.initializer.arguments[0]
            if (innerFn && (ts.isFunctionExpression(innerFn) || ts.isArrowFunction(innerFn))) {
              componentDefaults.set(compName, extractDefaultsFromFn(innerFn, sf))
            }
          }
        }
      }
    } else if (ts.isExportDeclaration(stmt) && stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
      for (const el of stmt.exportClause.elements) {
        exportedComponents.push(el.name.text)
      }
    }
  }

  // Merge defaults into interfaces / inline props per exported component
  const sections = []
  const consumedInterfaces = new Set()

  for (const compName of exportedComponents) {
    const defaults = componentDefaults.get(compName) || new Map()
    const mapped = componentPropsMap.get(compName)
    let props = []
    let extendsText = ''

    if (typeof mapped === 'string' && interfaces.has(mapped)) {
      consumedInterfaces.add(mapped)
      const iface = interfaces.get(mapped)
      extendsText = iface.extends
      props = iface.props.map((p) => ({
        ...p,
        defaultValue: defaults.get(p.name) ?? p.defaultValue,
      }))
    } else if (Array.isArray(mapped)) {
      props = mapped.map((p) => ({
        ...p,
        defaultValue: defaults.get(p.name) ?? p.defaultValue,
      }))
    } else if (interfaces.has(`${compName}Props`)) {
      consumedInterfaces.add(`${compName}Props`)
      const iface = interfaces.get(`${compName}Props`)
      extendsText = iface.extends
      props = iface.props.map((p) => ({
        ...p,
        defaultValue: defaults.get(p.name) ?? p.defaultValue,
      }))
    }

    sections.push({
      name: compName,
      extends: extendsText,
      props,
    })
  }

  // Also include supporting exported interfaces (e.g., SelectOption, MenuItemConfig, ComboboxOption)
  const helperInterfaces = []
  for (const [name, iface] of interfaces.entries()) {
    if (!consumedInterfaces.has(name) && !name.endsWith('Props')) {
      helperInterfaces.push(iface)
    }
  }

  return {
    exportedComponents,
    sections,
    helperInterfaces,
    typeAliases,
  }
}

// Build Tailwind v4 cssVars + css payload for @glaze/style
function buildStylePayload() {
  return {
    cssVars: {
      theme: {
        'font-display': '"Plus Jakarta Sans", "Noto Sans SC", system-ui, -apple-system, sans-serif',
        'font-sans': '"Inter", "Noto Sans SC", system-ui, -apple-system, sans-serif',
        'font-mono': '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        'radius-tile': '28px',
        'radius-overlay': '20px',
        'radius-inner': '18px',
        'radius-control': '14px',
        'radius-item': '12px',
        'radius-icon': '10px',
      },
      light: {
        'glaze-canvas': '#F2F4F8',
        'glaze-n0': '#FFFFFF',
        'glaze-n25': '#F6F7F9',
        'glaze-n50': '#F2F3F5',
        'glaze-n100': '#E8EBF0',
        'glaze-n150': '#EEF0F3',
        'glaze-n300': '#CDD3DD',
        'glaze-n500': '#8A90A0',
        'glaze-n600': '#6B7280',
        'glaze-n700': '#5B6170',
        'glaze-n900': '#1B1F27',
        'glaze-dur-exit': '120ms',
        'glaze-dur-fast': '150ms',
        'glaze-dur-base': '200ms',
        'glaze-dur-modal-exit': '150ms',
        'glaze-dur-drawer-in': '300ms',
        'glaze-dur-drawer-out': '220ms',
        'glaze-dur-toast': '360ms',
        'glaze-ease-crisp': 'cubic-bezier(0.2, 0, 0, 1)',
        'glaze-ease-standard': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
    css: {
      '.glaze-grid': {
        display: 'grid',
        'grid-template-columns': 'repeat(4, minmax(0, 1fr))',
        'grid-auto-rows': 'minmax(200px, auto)',
        'grid-auto-flow': 'row dense',
        gap: '16px',
      },
      '.glaze-size-s': { 'grid-column': 'span 1', 'grid-row': 'span 1', 'min-height': '200px' },
      '.glaze-size-w': { 'grid-column': 'span 2', 'grid-row': 'span 1', 'min-height': '200px' },
      '.glaze-size-t': { 'grid-column': 'span 1', 'grid-row': 'span 2', 'min-height': '416px' },
      '.glaze-size-l': { 'grid-column': 'span 2', 'grid-row': 'span 2', 'min-height': '416px' },
      '.glaze-size-f': { 'grid-column': '1 / -1', 'grid-row': 'auto' },
      '.font-glaze-display': { 'font-family': 'var(--font-display)' },
      '.font-glaze-mono': { 'font-family': 'var(--font-mono)' },
    },
  }
}

// ============================================================================
// MAIN BUILD
// ============================================================================
cleanDir(PUBLIC_R_DIR)
cleanDir(PUBLIC_LLMS_DIR)
ensureDir(path.join(PUBLIC_LLMS_DIR, 'components'))
ensureDir(GENERATED_DIR)

const registryItems = [] // Full definitions for registry.json (without content)
const builtItems = [] // Full definitions for public/r/<name>.json (with content)

function addRegistryItem(itemSpec, fileContentsMap) {
  const manifestItem = {
    name: itemSpec.name,
    type: itemSpec.type,
    title: itemSpec.title,
    description: itemSpec.description,
    ...(itemSpec.dependencies?.length ? { dependencies: itemSpec.dependencies } : {}),
    ...(itemSpec.registryDependencies?.length
      ? { registryDependencies: itemSpec.registryDependencies }
      : {}),
    ...(itemSpec.categories?.length ? { categories: itemSpec.categories } : {}),
    files: itemSpec.files,
    ...(itemSpec.cssVars ? { cssVars: itemSpec.cssVars } : {}),
    ...(itemSpec.css ? { css: itemSpec.css } : {}),
  }
  registryItems.push(manifestItem)

  const builtItem = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    ...manifestItem,
    files: itemSpec.files.map((f) => ({
      ...f,
      content: fileContentsMap.get(f.path),
    })),
  }
  builtItems.push(builtItem)
  fs.writeFileSync(
    path.join(PUBLIC_R_DIR, `${itemSpec.name}.json`),
    JSON.stringify(builtItem, null, 2) + '\n',
    'utf8',
  )
}

// 1. Core style + lib items (style, tokens, motion)
const glazeCssPath = 'registry/glaze/styles/glaze.css'
const glazeCssContent = fs.readFileSync(path.join(ROOT, glazeCssPath), 'utf8')
const stylePayload = buildStylePayload()
addRegistryItem(
  {
    name: 'style',
    type: 'registry:style',
    title: 'Glaze Design System Style',
    description:
      'Glaze 核心样式表、Tailwind v4 主题变量、4 列 dense 栅格与纯 CSS GPU 合成弹窗/抽屉/3D 堆叠 Toast 动效。',
    dependencies: ['cn', '@phosphor-icons/react'],
    registryDependencies: [depRef('tokens'), depRef('motion')],
    categories: ['core'],
    files: [{ path: glazeCssPath, type: 'registry:file', target: 'src/styles/glaze.css' }],
    cssVars: stylePayload.cssVars,
    css: stylePayload.css,
  },
  new Map([[glazeCssPath, glazeCssContent]]),
)

const tokensPath = 'registry/glaze/lib/tokens.ts'
const tokensContent = fs.readFileSync(path.join(ROOT, tokensPath), 'utf8')
addRegistryItem(
  {
    name: 'tokens',
    type: 'registry:lib',
    title: 'Glaze Design Tokens',
    description: '9 组柔彩色相 × 6 阶、4 组深色聚焦卡、11 级中性色、5 种语义状态与 DataViz 色板。',
    categories: ['core'],
    files: [{ path: tokensPath, type: 'registry:lib', target: 'lib/tokens.ts' }],
  },
  new Map([[tokensPath, tokensContent]]),
)

const motionPath = 'registry/glaze/lib/motion.ts'
const motionContent = fs.readFileSync(path.join(ROOT, motionPath), 'utf8')
addRegistryItem(
  {
    name: 'motion',
    type: 'registry:lib',
    title: 'Glaze Motion & Surface Presets',
    description: '分级动效时长与缓动、PopupTriggerScope 防锚点抖动上下文、PRESS_CLASS 与统一表面预设。',
    dependencies: ['motion'],
    categories: ['core'],
    files: [{ path: motionPath, type: 'registry:lib', target: 'lib/motion.ts' }],
  },
  new Map([[motionPath, motionContent]]),
)

const topologyLibPath = 'registry/glaze/lib/topology.ts'
const topologyLibContent = fs.readFileSync(path.join(ROOT, topologyLibPath), 'utf8')
addRegistryItem(
  {
    name: 'topology',
    type: 'registry:lib',
    title: 'Glaze Topology Data, ELK Layout & Trace Utils',
    description: '网络与云架构拓扑通用数据模型、上下游链路追踪、级联故障影响推演与基于 elkjs (Eclipse Layout Kernel) 的分组自动布局。',
    dependencies: ['@xyflow/react', 'elkjs'],
    registryDependencies: [depRef('tokens')],
    categories: ['topology'],
    files: [{ path: topologyLibPath, type: 'registry:lib', target: 'lib/topology.ts' }],
  },
  new Map([[topologyLibPath, topologyLibContent]]),
)

// 2. All 58 UI components
const componentsApiMap = {}

for (const meta of COMPONENTS_CATALOG) {
  const relPath = `registry/glaze/ui/${meta.slug}.tsx`
  const absPath = path.join(ROOT, relPath)
  const content = fs.readFileSync(absPath, 'utf8')
  const deps = analyzeFileDependencies(content, meta.slug)
  const api = extractApiInfo(absPath)

  addRegistryItem(
    {
      name: meta.slug,
      type: 'registry:ui',
      title: `${meta.title} (${meta.cnTitle})`,
      description: meta.description,
      dependencies: deps.dependencies,
      registryDependencies: deps.registryDependencies,
      categories: [meta.category],
      files: [{ path: relPath, type: 'registry:ui' }],
    },
    new Map([[relPath, content]]),
  )

  componentsApiMap[meta.slug] = {
    ...meta,
    baseUiUrl: meta.baseUiSlug ? `${SITE_META.baseUiDocsBase}/${meta.baseUiSlug}` : null,
    dependencies: deps.dependencies,
    registryDependencies: deps.registryDependencies,
    api,
    sourceCode: content,
  }
}

// 3. All 112 Blocks
const blocksApiList = []

for (const [code, componentName, cnName, slots, domain] of BLOCKS_CATALOG_RAW) {
  const slug = toKebab(componentName)
  const size = code[0].toLowerCase() // s | w | t | l | f
  const relPath = `registry/glaze/blocks/${slug}.tsx`
  const absPath = path.join(ROOT, relPath)
  if (!fs.existsSync(absPath)) {
    throw new Error(`Missing block file for ${componentName}: ${absPath}`)
  }
  const content = fs.readFileSync(absPath, 'utf8')
  const deps = analyzeFileDependencies(content, slug)
  const api = extractApiInfo(absPath)

  addRegistryItem(
    {
      name: slug,
      type: 'registry:block',
      title: `${code} ${cnName} (${componentName})`,
      description: `${cnName}（${code} · 尺寸 ${size.toUpperCase()}）— ${slots}`,
      dependencies: deps.dependencies,
      registryDependencies: deps.registryDependencies,
      categories: ['blocks', domain, `size-${size}`],
      files: [{ path: relPath, type: 'registry:component', target: `components/blocks/${slug}.tsx` }],
    },
    new Map([[relPath, content]]),
  )

  blocksApiList.push({
    code,
    slug,
    componentName,
    cnName,
    slots,
    size,
    domain,
    dependencies: deps.dependencies,
    registryDependencies: deps.registryDependencies,
    props: api.sections[0]?.props || [],
    sourceCode: content,
  })
}

// 4. All 6 Demo Pages
const demosApiList = []

for (const demo of DEMOS_CATALOG) {
  const relPath = `registry/glaze/demos/${demo.file}`
  const absPath = path.join(ROOT, relPath)
  const content = fs.readFileSync(absPath, 'utf8')
  const deps = analyzeFileDependencies(content, demo.registryName)

  addRegistryItem(
    {
      name: demo.registryName,
      type: 'registry:block',
      title: `Demo ${demo.index} · ${demo.title}`,
      description: demo.description,
      dependencies: deps.dependencies,
      registryDependencies: deps.registryDependencies,
      categories: ['demos'],
      files: [{ path: relPath, type: 'registry:page', target: `components/demos/${demo.file}` }],
    },
    new Map([[relPath, content]]),
  )

  demosApiList.push({
    ...demo,
    dependencies: deps.dependencies,
    registryDependencies: deps.registryDependencies,
  })
}

// Write root registry.json and public/r/registry.json
const masterRegistry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'glaze',
  homepage: REGISTRY_HOMEPAGE,
  items: registryItems,
}

fs.writeFileSync(path.join(ROOT, 'registry.json'), JSON.stringify(masterRegistry, null, 2) + '\n', 'utf8')
fs.writeFileSync(
  path.join(PUBLIC_R_DIR, 'registry.json'),
  JSON.stringify(masterRegistry, null, 2) + '\n',
  'utf8',
)

// Write docs generated JSON (split components and blocks so Vite bundle stays clean and fast!)
fs.writeFileSync(
  path.join(GENERATED_DIR, 'components-api.json'),
  JSON.stringify(componentsApiMap, null, 2) + '\n',
  'utf8',
)
fs.writeFileSync(
  path.join(GENERATED_DIR, 'blocks-api.json'),
  JSON.stringify(blocksApiList, null, 2) + '\n',
  'utf8',
)
fs.writeFileSync(
  path.join(GENERATED_DIR, 'demos-api.json'),
  JSON.stringify(demosApiList, null, 2) + '\n',
  'utf8',
)

// ============================================================================
// GENERATE AI AGENT DOCS (public/llms.txt, public/llms-full.txt, public/llms/**)
// ============================================================================
function renderComponentMarkdown(comp) {
  const lines = []
  lines.push(`# ${comp.title} (${comp.cnTitle})`)
  lines.push('')
  lines.push(`> ${comp.description}`)
  lines.push('')
  lines.push('## Installation (shadcn CLI)')
  lines.push('')
  lines.push('```bash')
  lines.push(`npx shadcn@latest add @glaze/${comp.slug}`)
  lines.push('```')
  lines.push('')
  lines.push(`- **Registry JSON**: \`/r/${comp.slug}.json\``)
  lines.push(`- **Import Path**: \`@/components/ui/${comp.slug}\``)
  lines.push(`- **Exports**: ${comp.api.exportedComponents.map((c) => `\`${c}\``).join(', ') || `\`${comp.title}\``}`)
  if (comp.baseUiUrl) {
    lines.push(`- **Base UI Primitive**: \`${comp.baseUiPackage}\` ([Base UI Docs](${comp.baseUiUrl}))`)
  }
  if (comp.dependencies.length) {
    lines.push(`- **NPM Dependencies**: ${comp.dependencies.map((d) => `\`${d}\``).join(', ')}`)
  }
  if (comp.registryDependencies.length) {
    lines.push(`- **Registry Dependencies**: ${comp.registryDependencies.map((d) => `\`${d}\``).join(', ')}`)
  }
  lines.push('')

  // API Reference (Base UI style)
  lines.push('## API Reference')
  lines.push('')
  for (const sec of comp.api.sections) {
    lines.push(`### ${sec.name}`)
    if (sec.extends) {
      lines.push('')
      lines.push(`Extends: \`${sec.extends}\``)
    }
    lines.push('')
    if (sec.props.length > 0) {
      lines.push('| Prop | Type | Default | Description |')
      lines.push('| --- | --- | --- | --- |')
      for (const p of sec.props) {
        const nameCell = `\`${p.name}${p.required ? '' : '?'}\``
        const typeCell = `\`${p.type.replace(/\|/g, '\\|')}\``
        const defCell = p.defaultValue ? `\`${p.defaultValue.replace(/\|/g, '\\|')}\`` : '—'
        const descCell = p.description || '—'
        lines.push(`| ${nameCell} | ${typeCell} | ${defCell} | ${descCell} |`)
      }
    } else {
      lines.push('Inherits standard Base UI / HTML element props.')
    }
    lines.push('')
  }

  if (comp.api.helperInterfaces.length > 0) {
    lines.push('### Supporting Types')
    lines.push('')
    for (const hi of comp.api.helperInterfaces) {
      lines.push(`#### \`${hi.name}\``)
      lines.push('')
      lines.push('| Property | Type | Required |')
      lines.push('| --- | --- | --- |')
      for (const p of hi.props) {
        lines.push(`| \`${p.name}\` | \`${p.type.replace(/\|/g, '\\|')}\` | ${p.required ? 'Yes' : 'No'} |`)
      }
      lines.push('')
    }
  }

  if (comp.dataAttributes?.length > 0) {
    lines.push('### Data Attributes (Base UI State)')
    lines.push('')
    lines.push('| Attribute | Description |')
    lines.push('| --- | --- |')
    for (const da of comp.dataAttributes) {
      lines.push(`| \`${da.attr}\` | ${da.desc} |`)
    }
    lines.push('')
  }

  if (comp.cssVars?.length > 0) {
    lines.push('### CSS Variables')
    lines.push('')
    for (const cv of comp.cssVars) {
      lines.push(`- \`${cv}\``)
    }
    lines.push('')
  }

  lines.push('## Source Code')
  lines.push('')
  lines.push('```tsx')
  lines.push(comp.sourceCode.trim())
  lines.push('```')
  lines.push('')

  return lines.join('\n')
}

// Write individual component markdown docs
for (const meta of COMPONENTS_CATALOG) {
  const comp = componentsApiMap[meta.slug]
  fs.writeFileSync(
    path.join(PUBLIC_LLMS_DIR, 'components', `${meta.slug}.md`),
    renderComponentMarkdown(comp),
    'utf8',
  )
}

// Write getting-started.md
const gettingStartedMd = `# Glaze UI — Getting Started & Registry Setup

Glaze is an accessible React 19 design system built on **Base UI 1.9** (\`@base-ui/react\`), **Tailwind CSS v4**, **Recharts v3**, **Phosphor Icons** (\`@phosphor-icons/react\`), and **shadcn/ui Registry**.

## 1. Configure \`components.json\`

Add the \`@glaze\` registry namespace to your project's \`components.json\`:

\`\`\`json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "glaze",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles/glaze.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "iconLibrary": "phosphor",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@glaze": "${REGISTRY_BASE_URL}/r/{name}.json"
  }
}
\`\`\`

## 2. Install Base Style & Tokens

\`\`\`bash
npx shadcn@latest add @glaze/style
\`\`\`

Import the generated stylesheet in your app entry (e.g., \`src/main.tsx\`):

\`\`\`tsx
import './styles/glaze.css'
\`\`\`

Wrap your app root with \`TooltipProvider\` and \`ToastProvider\` (plus optional \`IconContext.Provider\` from \`@phosphor-icons/react\`):

\`\`\`tsx
import { IconContext } from '@phosphor-icons/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToastProvider } from '@/components/ui/toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: 'regular' }}>
      <TooltipProvider delay={160}>
        <ToastProvider>{children}</ToastProvider>
      </TooltipProvider>
    </IconContext.Provider>
  )
}
\`\`\`

## 3. Install Components, Blocks, or Full Demos

\`\`\`bash
# Install UI primitives
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/select @glaze/bar-chart

# Install ready-made business cards (112 available)
npx shadcn@latest add @glaze/status-card @glaze/area-trend-card @glaze/data-table-card

# Install a complete demo page (6 available)
npx shadcn@latest add @glaze/demo-homelab
\`\`\`
`
fs.writeFileSync(path.join(PUBLIC_LLMS_DIR, 'getting-started.md'), gettingStartedMd, 'utf8')

// Write foundations.md
const foundationsMd = `# Glaze Design Foundations & Strict Rules for AI Agents

## Canvas & Card Rules (CRITICAL)
- Page canvas background MUST be \`#F2F4F8\` (\`--glaze-canvas\`).
- Cards (\`<Tile>\`) have **NO border and NO box-shadow** on the canvas; elevation is created purely by surface contrast (white \`#FFFFFF\` or pastel tone against \`#F2F4F8\`).
- Border radius scale:
  - \`rounded-tile\` (\`28px\`): \`Tile\`, \`Dialog\`, \`Drawer\`
  - \`rounded-overlay\` (\`20px\`): floating popups (\`Menu\`, \`Select\`, \`Popover\`, \`Combobox\`, \`ContextMenu\`, \`Toast\`)
  - \`rounded-inner\` (\`18px\`): multiline & nested surfaces (\`Textarea\`, \`Fieldset\`, \`Accordion\`, \`Collapsible\`)
  - \`rounded-full\`: ALL single-line controls (\`Button\`, \`Input\`, \`Select\`, \`Combobox\`, \`Autocomplete\`, \`NumberField\`, \`Switch\`, \`Toggle\`, \`Tabs\`, \`SegmentedControl\`, \`Menubar\`, \`Toolbar\`) at standard \`44px\` height (\`h-11\`), soft background \`#F6F7F9\`, borderless by default.

## Color Tokens
- **9 Pastel Hue Families** (\`Hue\`): \`sky\`, \`mint\`, \`peach\`, \`lilac\`, \`rose\`, \`lemon\`, \`aqua\`, \`periwinkle\`, \`coral\` — each with 6 shades: \`50, 100, 300, 500, 700, 900\`.
- **14 Tile Tones** (\`TileTone\`): \`white\` + 9 pastel hues + 4 dark focus tones (\`sky-dark\`, \`lilac-dark\`, \`aqua-dark\`, \`ink\`).
- **5 Semantic Statuses** (\`Status\`): \`normal\` (mint), \`warning\` (peach), \`error\` (coral), \`info\` (sky), \`disabled\` (neutral).

## Base UI v1.9 Conventions (DO NOT USE RADIX PATTERNS)
- **NEVER** pass \`asChild\` (that is Radix UI). Base UI uses the \`render\` prop (e.g., \`<BaseDialog.Trigger render={<Button>Open</Button>} />\`) or Glaze's explicit \`trigger={<Button>Open</Button>}\` prop.
- Import directly from single component files: \`@/components/ui/button\`, \`@/components/ui/tile\`, \`@/lib/tokens\`, \`@/lib/motion\`.
- Utility class merger is \`import { cn } from 'cn'\` (\`shadcn-ui/cn\`).
- Icons come from \`@phosphor-icons/react\`.

## 4-Column Dense Bento Grid
- Use \`<Grid>\` (\`.glaze-grid\`: 4 cols desktop, 2 cols tablet, 1 col mobile, 16px gap, \`grid-auto-flow: row dense\`).
- Tile sizes:
  - \`s\` (1×1, min 200px)
  - \`w\` (2×1, min 200px)
  - \`t\` (1×2, min 416px)
  - \`l\` (2×2, min 416px)
  - \`f\` (full-width 4×auto)

## Motion Rules (CSS-First, GPU-Composited)
- NEVER use \`backdrop-blur\` on modal/drawer backdrops.
- \`PRESS_SCALE\` (\`0.97\`) is ONLY for standalone compact actions (\`Button\`, \`Toggle\`, \`Checkbox\`, \`Radio\`, \`ToolbarButton\`). NEVER scale popup triggers, \`Select\`, \`Tabs\`, \`Switch\`, or \`Tile\`.
- Duration tiers: Fast \`150ms/120ms\` (popups & press), Base \`200ms/150ms\` (tabs, switch, dialog, accordion), Emphasized \`300ms/220ms\` (drawer) & \`360ms\` (3D stacked toast).
`
fs.writeFileSync(path.join(PUBLIC_LLMS_DIR, 'foundations.md'), foundationsMd, 'utf8')

// Write blocks.md
const blocksMdLines = [
  '# Glaze 112 Business Blocks Catalog',
  '',
  'Every block is independently installable via `npx shadcn@latest add @glaze/<slug>` and imports cleanly from `@/components/blocks/<slug>`.',
  '',
  '| Code | Component | Registry Name | Size | Domain | Slots / Structure |',
  '| --- | --- | --- | --- | --- | --- |',
]
for (const b of blocksApiList) {
  blocksMdLines.push(
    `| ${b.code} | \`${b.componentName}\` | \`@glaze/${b.slug}\` | ${b.size.toUpperCase()} | ${b.domain} | ${b.cnName} — ${b.slots} |`,
  )
}
blocksMdLines.push('')
fs.writeFileSync(path.join(PUBLIC_LLMS_DIR, 'blocks.md'), blocksMdLines.join('\n'), 'utf8')

// Write demos.md
const demosMdLines = [
  '# Glaze 6 Full-Page Business Demos',
  '',
  'Each demo can be viewed standalone at `/view/demos/<slug>` (outside the docs frame) or installed via shadcn CLI.',
  '',
  '| # | Title | Standalone Route | Registry CLI | Description |',
  '| --- | --- | --- | --- | --- |',
]
for (const d of demosApiList) {
  demosMdLines.push(
    `| ${d.index} | ${d.title} (\`${d.exportName}\`) | \`/view/demos/${d.slug}\` | \`npx shadcn@latest add @glaze/${d.registryName}\` | ${d.description} |`,
  )
}
demosMdLines.push('')
fs.writeFileSync(path.join(PUBLIC_LLMS_DIR, 'demos.md'), demosMdLines.join('\n'), 'utf8')

// Write public/llms.txt (llmstxt.org standard)
const llmsTxtLines = [
  `# ${SITE_META.cnName} Design System`,
  '',
  `> ${SITE_META.tagline}. 58 single-file UI components (39 Base UI 1.9 + 9 design primitives + 10 Recharts v3 charts), 112 independently installable business blocks, and 6 full-page demos published as a shadcn Registry.`,
  '',
  '## Quick CLI Reference',
  '',
  `- Repository: ${SITE_META.repository}`,
  `- Registry URL Template: \`${REGISTRY_BASE_URL}/r/{name}.json\``,
  `- Registry Manifest: \`${REGISTRY_BASE_URL}/r/registry.json\` (or \`/r/registry.json\`)`,
  `- Full Consolidated AI Reference: \`${REGISTRY_BASE_URL}/llms-full.txt\` (or \`/llms-full.txt\`)`,
  '- Install Base Theme & Tokens: `npx shadcn@latest add @glaze/style`',
  '- Install Any Component or Block: `npx shadcn@latest add @glaze/<name>`',
  '',
  '## Core Documentation',
  '',
  '- [Getting Started & Registry Setup](/llms/getting-started.md): Configure `components.json`, install `@glaze/style`, and wrap providers.',
  '- [Design Foundations & Strict Rules](/llms/foundations.md): Canvas, shadowless cards, capsule radii, 9 pastel hues, 4-col dense grid, Base UI v1.9 conventions, CSS-first motion rules.',
  '- [112 Business Blocks Catalog](/llms/blocks.md): Complete index of S/W/T/L/F cards with registry slugs.',
  '- [6 Standalone Business Demos](/llms/demos.md): Full-page real-world dashboards and their standalone preview routes.',
  '',
]

for (const cat of COMPONENT_CATEGORIES) {
  llmsTxtLines.push(`## Components — ${cat.en} (${cat.title})`)
  llmsTxtLines.push('')
  for (const c of COMPONENTS_CATALOG.filter((x) => x.category === cat.id)) {
    llmsTxtLines.push(`- [${c.title} (${c.cnTitle})](/llms/components/${c.slug}.md): ${c.description}`)
  }
  llmsTxtLines.push('')
}
fs.writeFileSync(path.join(ROOT, 'public/llms.txt'), llmsTxtLines.join('\n'), 'utf8')

// Write public/llms-full.txt (complete single-file context for AI Agents)
const llmsFullParts = [
  `# ${SITE_META.cnName} — Complete AI Agent Reference (llms-full.txt)`,
  '',
  gettingStartedMd,
  '---',
  '',
  foundationsMd,
  '---',
  '',
  demosMdLines.join('\n'),
  '---',
  '',
  blocksMdLines.join('\n'),
  '---',
  '',
  '# UI Components API Reference (58 Components)',
  '',
]
for (const meta of COMPONENTS_CATALOG) {
  const comp = componentsApiMap[meta.slug]
  // Concise API without repeating full source code so llms-full.txt stays token-efficient yet complete!
  const lines = []
  lines.push(`## ${comp.title} (${comp.cnTitle}) — \`@glaze/${comp.slug}\``)
  lines.push('')
  lines.push(`${comp.description}`)
  lines.push(`- Install: \`npx shadcn@latest add @glaze/${comp.slug}\``)
  lines.push(`- Import: \`import { ${comp.api.exportedComponents.join(', ') || comp.title} } from '@/components/ui/${comp.slug}'\``)
  if (comp.baseUiUrl) lines.push(`- Base UI: \`${comp.baseUiPackage}\` (${comp.baseUiUrl})`)
  if (comp.registryDependencies.length) {
    lines.push(`- Registry Deps: ${comp.registryDependencies.join(', ')}`)
  }
  for (const sec of comp.api.sections) {
    if (sec.props.length > 0) {
      lines.push(`\n**${sec.name} Props:**`)
      for (const p of sec.props) {
        const req = p.required ? ' (required)' : ''
        const def = p.defaultValue ? ` = ${p.defaultValue}` : ''
        const desc = p.description ? ` — ${p.description}` : ''
        lines.push(`- \`${p.name}: ${p.type}\`${def}${req}${desc}`)
      }
    }
  }
  if (comp.dataAttributes?.length) {
    lines.push(
      `\n**Data Attributes:** ${comp.dataAttributes.map((d) => `\`${d.attr}\` (${d.desc})`).join(', ')}`,
    )
  }
  lines.push('')
  llmsFullParts.push(lines.join('\n'))
}
fs.writeFileSync(path.join(ROOT, 'public/llms-full.txt'), llmsFullParts.join('\n'), 'utf8')

console.log(
  `Built shadcn registry: ${registryItems.length} items -> registry.json & public/r/*.json`,
)
console.log(
  `Generated API metadata -> src/docs/generated/{components,blocks,demos}-api.json`,
)
console.log(
  `Generated AI Agent docs -> public/llms.txt, public/llms-full.txt & ${COMPONENTS_CATALOG.length + 4} markdown files under public/llms/`,
)
