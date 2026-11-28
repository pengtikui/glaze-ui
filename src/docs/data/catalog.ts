import blocksApiRaw from '@/docs/generated/blocks-api.json'
import cardsApiRaw from '@/docs/generated/cards-api.json'
import componentsApiRaw from '@/docs/generated/components-api.json'
import pagesApiRaw from '@/docs/generated/pages-api.json'

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

export interface CardDocMeta {
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

export interface BlockDocMeta {
  slug: string
  exportName: string
  title: string
  enTitle: string
  category: string
  tone: string
  description: string
  highlights: string[]
  dependencies: string[]
  registryDependencies: string[]
  props: PropDoc[]
  sourceCode: string
}

export interface PageDocMeta {
  slug: string
  registryName: string
  file: string
  exportName: string
  index: string
  title: string
  enTitle: string
  badge: string
  tone: string
  category: string
  fullBleed: boolean
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

export const CARD_DOMAIN_CATEGORIES = [
  { id: 'all', title: '全部卡片', en: 'All' },
  { id: 'metrics', title: '指标与 KPI', en: 'Metrics & KPI' },
  { id: 'charts', title: '图表与分析', en: 'Charts & Analytics' },
  { id: 'ops', title: '运维、拓扑与 IoT', en: 'Ops, Topology & IoT' },
  { id: 'ai', title: 'AI 与智能体', en: 'AI & Agents' },
  { id: 'collaboration', title: '列表、日程与协作', en: 'Lists, Schedule & Tasks' },
  { id: 'controls', title: '交互、表单与控制', en: 'Forms, Controls & Actions' },
  { id: 'data-views', title: '表格与通栏视图', en: 'Tables & Full-Width' },
] as const

export const BLOCK_CATEGORIES = [
  { id: 'all', title: '全部 Block', en: 'All' },
  { id: 'auth', title: '认证与安全', en: 'Auth & Security' },
  { id: 'dashboard', title: '仪表盘与数据', en: 'Dashboard & Data' },
  { id: 'workspace', title: '协作与预约', en: 'Workspace & Booking' },
  { id: 'ai', title: 'AI 智能体', en: 'AI Workbench' },
  { id: 'settings', title: '设置与团队', en: 'Settings & Team' },
  { id: 'commerce', title: '定价与计费', en: 'Pricing & Billing' },
  { id: 'ops', title: '运维与拓扑', en: 'Ops & Topology' },
] as const

export const PAGE_CATEGORIES = [
  { id: 'all', title: '全部页面', en: 'All' },
  { id: 'app', title: '业务应用与流程', en: 'Applications & Flows' },
  { id: 'workspace', title: '协作与效率工作台', en: 'Workspace & Productivity' },
  { id: 'dashboard', title: '数据看板与中控', en: 'Dashboards & Consoles' },
  { id: 'ops', title: '运维与拓扑观测', en: 'Ops & Topology' },
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

export const CARDS_LIST = cardsApiRaw as unknown as CardDocMeta[]
export const CARDS_MAP: Record<string, CardDocMeta> = Object.fromEntries(
  CARDS_LIST.map((c) => [c.slug, c]),
)

export const BLOCKS_LIST = blocksApiRaw as unknown as BlockDocMeta[]
export const BLOCKS_MAP: Record<string, BlockDocMeta> = Object.fromEntries(
  BLOCKS_LIST.map((b) => [b.slug, b]),
)

export const PAGES_LIST = pagesApiRaw as unknown as PageDocMeta[]
export const PAGES_MAP: Record<string, PageDocMeta> = Object.fromEntries(
  PAGES_LIST.map((p) => [p.slug, p]),
)
