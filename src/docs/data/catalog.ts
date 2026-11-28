import componentsApiRaw from '@/docs/generated/components-api.json'
import blocksApiRaw from '@/docs/generated/blocks-api.json'
import demosApiRaw from '@/docs/generated/demos-api.json'

export interface PropDoc {
  name: string
  type: string
  required: boolean
  defaultValue: string | null
  description: string
}

export interface ApiSectionDoc {
  name: string
  extends: string
  props: PropDoc[]
}

export interface HelperInterfaceDoc {
  name: string
  extends: string
  props: PropDoc[]
}

export interface TypeAliasDoc {
  name: string
  definition: string
  description: string
}

export interface ComponentDocMeta {
  slug: string
  title: string
  cnTitle: string
  category: string
  kind: 'primitive' | 'base-ui' | 'chart' | 'ai' | 'topology'
  baseUiSlug?: string
  baseUiPackage?: string
  baseUiUrl: string | null
  description: string
  parts: string[]
  dataAttributes: { attr: string; desc: string }[]
  cssVars: string[]
  dependencies: string[]
  registryDependencies: string[]
  sourceCode: string
  api: {
    exportedComponents: string[]
    sections: ApiSectionDoc[]
    helperInterfaces: HelperInterfaceDoc[]
    typeAliases: TypeAliasDoc[]
  }
}

export interface BlockDocMeta {
  code: string
  slug: string
  componentName: string
  cnName: string
  slots: string
  size: 's' | 'w' | 't' | 'l' | 'f'
  domain: string
  dependencies: string[]
  registryDependencies: string[]
  props: PropDoc[]
  sourceCode: string
}

export interface DemoDocMeta {
  slug: string
  registryName: string
  file: string
  exportName: string
  index: string
  title: string
  enTitle: string
  badge: string
  tone: string
  description: string
  highlights: string[]
  dependencies: string[]
  registryDependencies: string[]
}

export const SITE_CONFIG = {
  name: 'Glaze',
  cnName: 'Glaze（釉）',
  githubUrl: 'https://github.com/pengtikui/glaze-ui',
  registryNamespace: '@glaze',
  registryBaseUrl: 'https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public',
  registryUrl: 'https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json',
  baseUiDocs: 'https://base-ui.com/react/components',
}

export const COMPONENT_CATEGORIES = [
  { id: 'primitives', title: '布局与设计原语', en: 'Primitives & Layout' },
  { id: 'inputs', title: '表单与输入', en: 'Forms & Inputs' },
  { id: 'selection', title: '选择与命令', en: 'Selection & Menus' },
  { id: 'overlays', title: '浮层与反馈', en: 'Overlays & Feedback' },
  { id: 'navigation', title: '导航与结构', en: 'Navigation & Structure' },
  { id: 'charts', title: '数据可视化图表', en: 'Charts & DataViz' },
  { id: 'ai', title: 'AI 智能体元素', en: 'AI Elements' },
  { id: 'topology', title: '网络与架构拓扑', en: 'Topology & Architecture' },
] as const

export const BLOCK_DOMAIN_CATEGORIES = [
  { id: 'all', title: '全部卡片', en: 'All' },
  { id: 'ai', title: 'AI 与智能体', en: 'AI & Agents' },
  { id: 'metrics', title: '核心指标与 KPI', en: 'Metrics & KPI' },
  { id: 'charts', title: 'Recharts 图表卡片', en: 'Charts' },
  { id: 'monitoring', title: '监控与智能硬件', en: 'Monitoring & IoT' },
  { id: 'lists', title: '列表、榜单与动态', en: 'Lists & Feeds' },
  { id: 'productivity', title: '日程、任务与效率', en: 'Productivity' },
  { id: 'controls', title: '交互控制与快捷入口', en: 'Controls' },
  { id: 'layout', title: '通栏表格与规划视图', en: 'Tables & Layout' },
] as const

export const COMPONENTS_MAP = componentsApiRaw as unknown as Record<string, ComponentDocMeta>
export const COMPONENTS_LIST: ComponentDocMeta[] = Object.values(COMPONENTS_MAP)

/** 按组件英文名首字母（A–Z）返回指定分组下的组件列表 */
export function getComponentsByCategory(categoryId: string): ComponentDocMeta[] {
  return COMPONENTS_LIST.filter((c) => c.category === categoryId).sort((a, b) =>
    a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }),
  )
}

/** 按侧边栏分组顺序且组内首字母（A–Z）排好序的全量组件列表 */
export const COMPONENTS_SIDEBAR_ORDER: ComponentDocMeta[] = COMPONENT_CATEGORIES.flatMap((cat) =>
  getComponentsByCategory(cat.id),
)

export const BLOCKS_LIST = blocksApiRaw as unknown as BlockDocMeta[]
export const BLOCKS_MAP: Record<string, BlockDocMeta> = Object.fromEntries(
  BLOCKS_LIST.map((b) => [b.slug, b]),
)
export const DEMOS_LIST = demosApiRaw as unknown as DemoDocMeta[]
export const DEMOS_MAP: Record<string, DemoDocMeta> = Object.fromEntries(
  DEMOS_LIST.map((d) => [d.slug, d]),
)
