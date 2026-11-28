import * as React from 'react'
import {
  ArrowsClockwise,
  ArrowSquareOut,
  ArrowUpRight,
  Bell,
  BellSlash,
  Broadcast,
  Buildings,
  CaretRight,
  CaretUpDown,
  ChartBar,
  ChartLineUp,
  Check,
  CheckCircle,
  Command,
  Compass,
  Copy,
  CreditCard,
  Crown,
  DotsThree,
  Export,
  FileText,
  FolderSimple,
  GearSix,
  House,
  Key,
  Link as LinkIcon,
  LockSimple,
  MagnifyingGlass,
  Plus,
  PushPin,
  Receipt,
  ShieldCheck,
  SidebarSimple,
  SignOut,
  SlidersHorizontal,
  Sparkle,
  Tag,
  Terminal,
  Trash,
  Tray,
  UserCircle,
  UserPlus,
  UsersThree,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { AlertBannerCard } from '@/components/blocks/alert-banner-card'
import { AreaTrendCard } from '@/components/blocks/area-trend-card'
import { ChecklistCard } from '@/components/blocks/checklist-card'
import { CodeDeployCard } from '@/components/blocks/code-deploy-card'
import { DualSeriesTrendCard } from '@/components/blocks/dual-series-trend-card'
import { EventTimelineCard } from '@/components/blocks/event-timeline-card'
import { FunnelCard } from '@/components/blocks/funnel-card'
import { HeroMetricCard } from '@/components/blocks/hero-metric-card'
import { InteractiveAnalyticsCard } from '@/components/blocks/interactive-analytics-card'
import { KanbanMiniCard } from '@/components/blocks/kanban-mini-card'
import { KpiStripCard } from '@/components/blocks/kpi-strip-card'
import { LeaderboardCard } from '@/components/blocks/leaderboard-card'
import { MembersCard } from '@/components/blocks/members-card'
import { MetricCard } from '@/components/blocks/metric-card'
import { QuotaCard } from '@/components/blocks/quota-card'
import { ResourceAllocationCard } from '@/components/blocks/resource-allocation-card'
import { StatusCard } from '@/components/blocks/status-card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { ContextMenu } from '@/components/ui/context-menu'
import { CountBadge } from '@/components/ui/count-badge'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Drawer } from '@/components/ui/drawer'
import { Field, FieldLabel } from '@/components/ui/field'
import { Grid } from '@/components/ui/grid'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { Menu, type MenuItemConfig } from '@/components/ui/menu'
import { Popover } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Switch } from '@/components/ui/switch'
import { createGlazeColumnHelper, DataTable } from '@/components/ui/data-table'
import { useToast } from '@/components/ui/toast'
import { Tooltip } from '@/components/ui/tooltip'
import { HUE_PALETTES, type Hue, type Status } from '@/lib/tokens'

// ============================================================================
// Data Models & Constants
// ============================================================================

type TimeRange = 'today' | '7d' | '30d'
type UserPresence = 'online' | 'busy' | 'away'

interface WorkspaceOption {
  id: string
  name: string
  plan: string
  hue: Hue
  code: string
  members: number
}

interface ProjectSpace {
  id: string
  name: string
  hue: Hue
  pinned: boolean
  branch: string
  updatedAt: string
  openIssues: number
}

interface InboxItem {
  id: string
  title: string
  sender: string
  senderInitial: string
  senderHue: Hue
  time: string
  tag: string
  tagHue: Hue
  unread: boolean
  preview: string
}

interface RouteMeta {
  id: string
  title: string
  section: string
  parent?: string
  description: string
}

const WORKSPACES: WorkspaceOption[] = [
  { id: 'glaze-cloud', name: 'Glaze Cloud', plan: '企业旗舰版', hue: 'periwinkle', code: 'GC', members: 48 },
  { id: 'staging-lab', name: '研发沙箱', plan: 'Staging 环境', hue: 'aqua', code: 'ST', members: 16 },
  { id: 'personal-hq', name: '个人实验室', plan: '免费探索版', hue: 'peach', code: 'PL', members: 3 },
]

const INITIAL_PROJECTS: ProjectSpace[] = [
  { id: 'proj-glaze', name: 'Glaze 设计系统', hue: 'periwinkle', pinned: true, branch: 'main', updatedAt: '12 分钟前', openIssues: 5 },
  { id: 'proj-pay', name: '支付网关 v3', hue: 'mint', pinned: true, branch: 'release/3.4', updatedAt: '1 小时前', openIssues: 2 },
  { id: 'proj-growth', name: '增长实验平台', hue: 'peach', pinned: false, branch: 'feat/ab-v2', updatedAt: '昨天', openIssues: 8 },
  { id: 'proj-mobile', name: '移动端 App', hue: 'rose', pinned: false, branch: 'ios/2.8', updatedAt: '2 天前', openIssues: 4 },
]

const TAG_VIEWS: { id: string; label: string; hue: Hue; count: number; description: string }[] = [
  { id: 'tag-revenue', label: '核心营收', hue: 'mint', count: 14, description: '高价值企业订阅与季度 ARR 核心指标追踪' },
  { id: 'tag-incident', label: '高优告警', hue: 'coral', count: 3, description: 'P0/P1 生产集群异常与 SLA 阈值预警事件' },
  { id: 'tag-release', label: 'Q4 发版', hue: 'lilac', count: 9, description: '2.0 里程碑验收、文档同步与灰度发布任务' },
]

const INITIAL_INBOX: InboxItem[] = [
  {
    id: 'm1',
    title: 'Production 网关 P99 延迟恢复至 18ms',
    sender: '运维机器人',
    senderInitial: '运',
    senderHue: 'mint',
    time: '5 分钟前',
    tag: '监控',
    tagHue: 'mint',
    unread: true,
    preview: '华东可用区 A 自动弹性扩容已完成，全部 142 个 Pod 健康探测通过。',
  },
  {
    id: 'm2',
    title: '周舟 请求评审「侧边栏导航规范 v2.1」',
    sender: '周舟',
    senderInitial: '周',
    senderHue: 'lilac',
    time: '24 分钟前',
    tag: '设计评审',
    tagHue: 'lilac',
    unread: true,
    preview: '已补充图标收起态悬停浮层、三级树形缩进与移动端抽屉交互标注。',
  },
  {
    id: 'm3',
    title: '星尘科技 完成年度企业版续约 ¥42.0万',
    sender: '财务助手',
    senderInitial: '财',
    senderHue: 'peach',
    time: '1 小时前',
    tag: '营收',
    tagHue: 'peach',
    unread: true,
    preview: '300 席位授权已自动下发，发票抬头已同步至企业计费中心。',
  },
  {
    id: 'm4',
    title: 'API 密钥「prod-edge-02」将于 14 天后到期',
    sender: '安全中心',
    senderInitial: '安',
    senderHue: 'coral',
    time: '3 小时前',
    tag: '安全',
    tagHue: 'coral',
    unread: true,
    preview: '请尽快在「平台管理 › 访问控制 › API 密钥」中轮换新密钥。',
  },
  {
    id: 'm5',
    title: 'CI/CD 流水线 #1842 构建并部署成功',
    sender: '林一',
    senderInitial: '林',
    senderHue: 'sky',
    time: '昨天',
    tag: '工程',
    tagHue: 'sky',
    unread: false,
    preview: '所有 58 个组件与 112 张业务卡片通过类型检查与静态构建。',
  },
]

const ROUTES_META: Record<string, RouteMeta> = {
  overview: {
    id: 'overview',
    title: '总览驾驶舱',
    section: '工作台',
    description: '核心业务指标、实时吞吐趋势与待办交付一览',
  },
  'live-monitor': {
    id: 'live-monitor',
    title: '实时监控大屏',
    section: '工作台',
    description: '全站实时脉冲遥测、节点在线率与流量波动监控',
  },
  inbox: {
    id: 'inbox',
    title: '消息收件箱',
    section: '工作台',
    description: '审批提醒、系统告警与协作动态集中处理（与侧边栏未读角标实时联动）',
  },
  'ai-assistant': {
    id: 'ai-assistant',
    title: 'AI 洞察助手',
    section: '工作台',
    description: '自动归因异常波动、生成经营周报与 SQL 指标查询',
  },
  'analytics/traffic': {
    id: 'analytics/traffic',
    title: '实时流量分析',
    section: '数据中心',
    parent: '数据中心',
    description: '按区域、渠道与终端维度的秒级吞吐与会话活跃分析',
  },
  'analytics/funnel': {
    id: 'analytics/funnel',
    title: '转化漏斗',
    section: '数据中心',
    parent: '数据中心',
    description: '从自然访问、试用激活到企业版付费转化的全链路转化率',
  },
  'analytics/retention': {
    id: 'analytics/retention',
    title: '留存队列',
    section: '数据中心',
    parent: '数据中心',
    description: '周度与月度净留存率 NRR 与客户生命周期健康度',
  },
  'analytics/custom': {
    id: 'analytics/custom',
    title: '自定义报表',
    section: '数据中心',
    parent: '数据中心',
    description: '多维度指标组合、对比分析与定时 PDF / CSV 导出',
  },
  'platform/access/roles': {
    id: 'platform/access/roles',
    title: '成员与角色',
    section: '平台管理',
    parent: '访问控制',
    description: '三级子菜单示例 · RBAC 角色权限矩阵与成员邀请管理',
  },
  'platform/access/api-keys': {
    id: 'platform/access/api-keys',
    title: 'API 密钥',
    section: '平台管理',
    parent: '访问控制',
    description: '三级子菜单示例 · 生产密钥轮换、调用配额与 IP 白名单',
  },
  'platform/access/sso': {
    id: 'platform/access/sso',
    title: 'SSO 单点登录',
    section: '平台管理',
    parent: '访问控制',
    description: '三级子菜单示例 · SAML 2.0 / OIDC 企业身份提供商集成',
  },
  'platform/billing/usage': {
    id: 'platform/billing/usage',
    title: '用量明细',
    section: '平台管理',
    parent: '计费与账单',
    description: '三级子菜单示例 · 各业务线算力与存储用量分摊明细',
  },
  'platform/billing/invoices': {
    id: 'platform/billing/invoices',
    title: '发票与抬头',
    section: '平台管理',
    parent: '计费与账单',
    description: '三级子菜单示例 · 历史账单下载与企业税务抬头配置',
  },
  'platform/audit': {
    id: 'platform/audit',
    title: '操作审计日志',
    section: '平台管理',
    parent: '平台管理',
    description: '全员关键变更记录、登录 IP 追踪与合规归档',
  },
}

interface DeliveryRecord {
  id: string
  name: string
  group: string
  groupHue: Hue
  owner: string
  ownerAvatar: string
  ownerHue: Hue
  progress: number
  stateKey: 'doing' | 'done' | 'risk'
  stateLabel: string
  status: Status
  updatedAt: string
  updatedRank: number
  pr: string
  targetDate: string
  summary: string
}

interface ApiKeyRecord {
  id: string
  name: string
  prefix: string
  env: 'Production' | 'Staging' | 'Sandbox'
  envHue: Hue
  scope: string
  calls30d: number
  statusKey: 'active' | 'expiring' | 'revoked'
  statusLabel: string
  status: Status
  expiresAt: string
  owner: string
  lastUsed: string
  ipAllowlist: string
}

const INITIAL_DELIVERIES: DeliveryRecord[] = [
  {
    id: 'DLV-101',
    name: '企业版 SSO 与 SCIM 目录同步',
    group: '安全',
    groupHue: 'periwinkle',
    owner: '林一',
    ownerAvatar: '林',
    ownerHue: 'sky',
    progress: 94,
    stateKey: 'doing',
    stateLabel: '灰度中',
    status: 'info',
    updatedAt: '10 分钟前',
    updatedRank: 1,
    pr: '#418 · feat/scim-v2',
    targetDate: '2026-12-01',
    summary: '已完成 Okta / Azure AD 双向群组同步压测，正在 20% 租户灰度观察。',
  },
  {
    id: 'DLV-102',
    name: '多区域边缘节点 HTTP/3 升级',
    group: '基建',
    groupHue: 'aqua',
    owner: '陆远',
    ownerAvatar: '陆',
    ownerHue: 'mint',
    progress: 100,
    stateKey: 'done',
    stateLabel: '已完成',
    status: 'normal',
    updatedAt: '今天 11:20',
    updatedRank: 2,
    pr: '#412 · infra/quic-rollout',
    targetDate: '2026-11-26',
    summary: '全球 42 个边缘 POP 均完成 QUIC 零停机切换，首包延迟下降 22%。',
  },
  {
    id: 'DLV-103',
    name: '大客户账单对账任务队列拥塞',
    group: '计费',
    groupHue: 'coral',
    owner: '陈晨',
    ownerAvatar: '陈',
    ownerHue: 'peach',
    progress: 48,
    stateKey: 'risk',
    stateLabel: '需关注',
    status: 'error',
    updatedAt: '今天 09:40',
    updatedRank: 3,
    pr: '#421 · fix/billing-worker',
    targetDate: '2026-11-29',
    summary: '月末批处理触发锁竞争，正在拆分分片消费队列并增加死信重试上限。',
  },
  {
    id: 'DLV-104',
    name: 'AI 异常归因模型 v2 准确率调优',
    group: '智能',
    groupHue: 'lilac',
    owner: '周舟',
    ownerAvatar: '周',
    ownerHue: 'rose',
    progress: 76,
    stateKey: 'doing',
    stateLabel: '进行中',
    status: 'info',
    updatedAt: '昨天',
    updatedRank: 4,
    pr: '#405 · ai/root-cause-v2',
    targetDate: '2026-12-04',
    summary: 'Top-1 根因命中率从 81% 提升至 92.4%，待补齐长尾指标回放验证。',
  },
  {
    id: 'DLV-105',
    name: 'TanStack Table v9 控制台表格封装',
    group: '前端',
    groupHue: 'sky',
    owner: '林一',
    ownerAvatar: '林',
    ownerHue: 'sky',
    progress: 100,
    stateKey: 'done',
    stateLabel: '已完成',
    status: 'normal',
    updatedAt: '今天 09:10',
    updatedRank: 5,
    pr: '#425 · feat/glaze-table',
    targetDate: '2026-11-28',
    summary: '支持排序、搜索、分段筛选、多选批量操作、行展开、列显隐与分页。',
  },
  {
    id: 'DLV-106',
    name: '审计日志冷热分层与 S3 归档',
    group: '合规',
    groupHue: 'lemon',
    owner: '沈清',
    ownerAvatar: '沈',
    ownerHue: 'aqua',
    progress: 82,
    stateKey: 'doing',
    stateLabel: '进行中',
    status: 'info',
    updatedAt: '2 天前',
    updatedRank: 6,
    pr: '#398 · ops/audit-archive',
    targetDate: '2026-12-06',
    summary: '超过 90 天的审计明细自动压缩至 Parquet 格式并支持按租户快速检索。',
  },
  {
    id: 'DLV-107',
    name: '移动端离线缓存与断点续传',
    group: '客户端',
    groupHue: 'rose',
    owner: '吴越',
    ownerAvatar: '吴',
    ownerHue: 'peach',
    progress: 60,
    stateKey: 'risk',
    stateLabel: '需关注',
    status: 'warning',
    updatedAt: '3 天前',
    updatedRank: 7,
    pr: '#391 · mobile/offline-sync',
    targetDate: '2026-12-08',
    summary: '弱网切换场景存在重复上传边界，正在补充幂等上传令牌校验。',
  },
  {
    id: 'DLV-108',
    name: '企业自定义域名自动证书续签',
    group: '基建',
    groupHue: 'aqua',
    owner: '陆远',
    ownerAvatar: '陆',
    ownerHue: 'mint',
    progress: 100,
    stateKey: 'done',
    stateLabel: '已完成',
    status: 'normal',
    updatedAt: '4 天前',
    updatedRank: 8,
    pr: '#384 · infra/acme-auto',
    targetDate: '2026-11-24',
    summary: '支持 ACME DNS-01 自动校验与提前 30 天无感续签，已覆盖全部企业域名。',
  },
]

const INITIAL_API_KEYS: ApiKeyRecord[] = [
  {
    id: 'key-01',
    name: 'prod-edge-gateway',
    prefix: 'glz_live_9a4f••••',
    env: 'Production',
    envHue: 'mint',
    scope: 'read:metrics, write:events',
    calls30d: 482400,
    statusKey: 'active',
    statusLabel: '活跃',
    status: 'normal',
    expiresAt: '2027-06-15',
    owner: '陆远',
    lastUsed: '2 分钟前',
    ipAllowlist: '10.24.0.0/16, 47.100.18.42',
  },
  {
    id: 'key-02',
    name: 'prod-edge-02',
    prefix: 'glz_live_3c8e••••',
    env: 'Production',
    envHue: 'peach',
    scope: 'read:all, write:deploy',
    calls30d: 218900,
    statusKey: 'expiring',
    statusLabel: '14 天后到期',
    status: 'warning',
    expiresAt: '2026-12-12',
    owner: '林一',
    lastUsed: '18 分钟前',
    ipAllowlist: '10.24.0.0/16',
  },
  {
    id: 'key-03',
    name: 'billing-sync-worker',
    prefix: 'glz_live_7d12••••',
    env: 'Production',
    envHue: 'mint',
    scope: 'read:billing, write:invoices',
    calls30d: 58700,
    statusKey: 'active',
    statusLabel: '活跃',
    status: 'normal',
    expiresAt: '2027-03-01',
    owner: '陈晨',
    lastUsed: '1 小时前',
    ipAllowlist: '172.18.4.0/24',
  },
  {
    id: 'key-04',
    name: 'staging-ci-runner',
    prefix: 'glz_test_5f21••••',
    env: 'Staging',
    envHue: 'sky',
    scope: 'read:all, write:preview',
    calls30d: 94120,
    statusKey: 'active',
    statusLabel: '活跃',
    status: 'info',
    expiresAt: '2027-01-20',
    owner: '周舟',
    lastUsed: '35 分钟前',
    ipAllowlist: '不限（CI 动态 IP）',
  },
  {
    id: 'key-05',
    name: 'legacy-webhook-2025',
    prefix: 'glz_live_0b9a••••',
    env: 'Sandbox',
    envHue: 'rose',
    scope: 'write:webhooks',
    calls30d: 0,
    statusKey: 'revoked',
    statusLabel: '已吊销',
    status: 'disabled',
    expiresAt: '已失效',
    owner: '沈清',
    lastUsed: '32 天前',
    ipAllowlist: '已清空',
  },
]

const deliveryColHelper = createGlazeColumnHelper<DeliveryRecord>()
const inboxColHelper = createGlazeColumnHelper<InboxItem>()
const apiKeyColHelper = createGlazeColumnHelper<ApiKeyRecord>()

const RANGE_METRICS: Record<
  TimeRange,
  {
    revenue: string
    delta: string
    points: number[]
    requests: string
    alerts: string
    trendSummary: string
    trendPoints: number[]
    axisLabels: string[]
  }
> = {
  today: {
    revenue: '¥24.8万',
    delta: '+14.2% 较昨日',
    points: [28, 34, 30, 42, 56, 51, 64, 72, 68, 84, 92, 98],
    requests: '1.42',
    alerts: '2',
    trendSummary: '峰值 48.2k req/s',
    trendPoints: [22, 26, 24, 31, 40, 48, 44, 58, 66, 61, 74, 82],
    axisLabels: ['00:00', '06:00', '12:00', '18:00', '现在'],
  },
  '7d': {
    revenue: '¥168.4万',
    delta: '+19.6% 较上周',
    points: [40, 46, 52, 49, 64, 70, 78, 74, 86, 91, 95, 108],
    requests: '9.84',
    alerts: '5',
    trendSummary: '周均 41.6k req/s',
    trendPoints: [34, 42, 39, 54, 62, 58, 71, 76, 69, 82, 88, 94],
    axisLabels: ['周一', '周三', '周五', '周日'],
  },
  '30d': {
    revenue: '¥684.2万',
    delta: '+24.8% 较上月',
    points: [32, 38, 44, 52, 58, 66, 72, 79, 88, 96, 104, 118],
    requests: '41.2',
    alerts: '11',
    trendSummary: '月度峰值 62.0k req/s',
    trendPoints: [28, 36, 44, 48, 56, 60, 68, 74, 80, 86, 92, 98],
    axisLabels: ['第1周', '第2周', '第3周', '第4周'],
  },
}

const SIDEBAR_PATTERN_GUIDE: {
  id: string
  num: string
  name: string
  desc: string
  hue: Hue
  targetRoute?: string
}[] = [
  { id: 'p1', num: '01', name: '工作区切换器菜单', desc: '顶部下拉 Menu，支持切换组织/环境与新建工作区', hue: 'periwinkle' },
  { id: 'p2', num: '02', name: '侧边栏实时过滤框', desc: '行内搜索 Input，实时筛选全部菜单与子菜单节点', hue: 'sky' },
  { id: 'p3', num: '03', name: '基础单级导航项', desc: '激活柔彩胶囊态 + 实心/双色图标强调', hue: 'periwinkle', targetRoute: 'overview' },
  { id: 'p4', num: '04', name: '呼吸状态点监控项', desc: '内置动态 ripple StatusDot 与 LIVE 实时徽标', hue: 'mint', targetRoute: 'live-monitor' },
  { id: 'p5', num: '05', name: '动态计数角标项', desc: '珊瑚红 CountBadge 与收件箱未读数实时双向同步', hue: 'coral', targetRoute: 'inbox' },
  { id: 'p6', num: '06', name: '新功能语义标签项', desc: '搭配 HueTag (NEW / BETA) 突出新上线模块', hue: 'lilac', targetRoute: 'ai-assistant' },
  { id: 'p7', num: '07', name: '二级可展开树形菜单', desc: 'Base UI Collapsible 丝滑高度展开 + 竖向引导线', hue: 'sky', targetRoute: 'analytics/funnel' },
  { id: 'p8', num: '08', name: '三级深层嵌套子菜单', desc: '平台管理 › 访问控制 / 计费账单 三级结构与面包屑联动', hue: 'aqua', targetRoute: 'platform/access/api-keys' },
  { id: 'p9', num: '09', name: '可折叠分组 + 行内新建', desc: '点击分组标题折叠整区，右侧「+」直接弹出新建项目弹窗', hue: 'peach' },
  { id: 'p10', num: '10', name: '悬停更多菜单 + 右键菜单', desc: '项目行支持悬停「···」Menu 与右键 ContextMenu 置顶/归档', hue: 'rose', targetRoute: 'project:proj-glaze' },
  { id: 'p11', num: '11', name: '彩色圆点标签筛选视图', desc: '使用 Token 色相圆点与数量统计的标签分类菜单', hue: 'mint', targetRoute: 'tag:tag-revenue' },
  { id: 'p12', num: '12', name: '行内微开关设置项', desc: '直接内嵌 Switch 控制免打扰模式与紧凑卡片密度', hue: 'aqua' },
  { id: 'p13', num: '13', name: '快捷键提示 & 外链菜单', desc: '显示 ⌘K 触发命令面板与 ↗ 外部文档跳转项', hue: 'sky' },
  { id: 'p14', num: '14', name: '禁用锁定项 + Tooltip', desc: '企业版权限锁定态，悬停 Tooltip 提示升级说明', hue: 'lemon' },
  { id: 'p15', num: '15', name: '配额卡片 + 账号菜单 + 图标栏', desc: '可关闭配额进度卡、底部用户状态菜单与迷你图标栏悬停浮层', hue: 'periwinkle' },
]

const PRESENCE_META: Record<UserPresence, { label: string; status: Status }> = {
  online: { label: '在线中', status: 'normal' },
  busy: { label: '专注忙碌', status: 'error' },
  away: { label: '暂时离开', status: 'warning' },
}

// ============================================================================
// Main Demo Page Component
// ============================================================================

export function AdminShellDemoPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <SidebarProvider
      variant="floating"
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      openMobile={mobileMenuOpen}
      onOpenMobileChange={setMobileMenuOpen}
      className="mx-auto max-w-[1640px]"
    >
      <AdminShellWorkspace />
    </SidebarProvider>
  )
}

function AdminShellWorkspace() {
  const toast = useToast()
  const { state: sidebarState, isMobile, setOpenMobile, toggleSidebar } = useSidebar()
  const isCollapsed = !isMobile && sidebarState === 'collapsed'

  // Shell & Sidebar states
  const [workspaceId, setWorkspaceId] = React.useState(WORKSPACES[0].id)
  const [activeRoute, setActiveRoute] = React.useState('overview')
  const [sidebarFilter, setSidebarFilter] = React.useState('')

  // Collapsible menu tree states (2nd & 3rd levels + collapsible sections)
  const [analyticsOpen, setAnalyticsOpen] = React.useState(true)
  const [platformOpen, setPlatformOpen] = React.useState(true)
  const [accessOpen, setAccessOpen] = React.useState(true)
  const [billingOpen, setBillingOpen] = React.useState(false)
  const [projectsSectionOpen, setProjectsSectionOpen] = React.useState(true)
  const [tagsSectionOpen, setTagsSectionOpen] = React.useState(true)

  // Interactive sidebar & table data
  const [projects, setProjects] = React.useState<ProjectSpace[]>(INITIAL_PROJECTS)
  const [inbox, setInbox] = React.useState<InboxItem[]>(INITIAL_INBOX)
  const [deliveries, setDeliveries] = React.useState<DeliveryRecord[]>(INITIAL_DELIVERIES)
  const [apiKeys, setApiKeys] = React.useState<ApiKeyRecord[]>(INITIAL_API_KEYS)
  const [dndMode, setDndMode] = React.useState(false)
  const [compactDensity, setCompactDensity] = React.useState(false)
  const [showQuotaCard, setShowQuotaCard] = React.useState(true)
  const [presence, setPresence] = React.useState<UserPresence>('online')

  // Topbar states & overlays
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d')
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [cmdQuery, setCmdQuery] = React.useState('')
  const [guideOpen, setGuideOpen] = React.useState(false)
  const [newProjectOpen, setNewProjectOpen] = React.useState(false)
  const [newProjectName, setNewProjectName] = React.useState('')
  const [newProjectHue, setNewProjectHue] = React.useState<Hue>('sky')

  const activeWorkspace = WORKSPACES.find((w) => w.id === workspaceId) ?? WORKSPACES[0]
  const unreadCount = inbox.filter((m) => m.unread).length
  const activeApiKeyCount = apiKeys.filter((k) => k.statusKey !== 'revoked').length
  const filterKeyword = sidebarFilter.trim().toLowerCase()

  // Keyboard shortcut ⌘K / Ctrl+K for Command Palette
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigate = React.useCallback(
    (routeId: string) => {
      setActiveRoute(routeId)
      setOpenMobile(false)
      if (routeId.startsWith('analytics/')) setAnalyticsOpen(true)
      if (routeId.startsWith('platform/')) setPlatformOpen(true)
      if (routeId.startsWith('platform/access/')) setAccessOpen(true)
      if (routeId.startsWith('platform/billing/')) setBillingOpen(true)
    },
    [setOpenMobile],
  )

  const matchesFilter = React.useCallback(
    (...terms: string[]) => {
      if (!filterKeyword) return true
      return terms.some((t) => t.toLowerCase().includes(filterKeyword))
    },
    [filterKeyword],
  )

  const handleTogglePinProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const nextPinned = !p.pinned
        toast({
          title: nextPinned ? `已置顶「${p.name}」` : `已取消置顶「${p.name}」`,
          status: 'info',
        })
        return { ...p, pinned: nextPinned }
      }),
    )
  }

  const handleArchiveProject = (id: string) => {
    const target = projects.find((p) => p.id === id)
    if (!target) return
    setProjects((prev) => prev.filter((p) => p.id !== id))
    if (activeRoute === `project:${id}`) setActiveRoute('overview')
    toast({ title: `已归档项目「${target.name}」`, status: 'warning' })
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = newProjectName.trim()
    if (!trimmed) return
    const created: ProjectSpace = {
      id: `proj-${Date.now()}`,
      name: trimmed,
      hue: newProjectHue,
      pinned: false,
      branch: 'main',
      updatedAt: '刚刚',
      openIssues: 0,
    }
    setProjects((prev) => [created, ...prev])
    setNewProjectName('')
    setNewProjectOpen(false)
    navigate(`project:${created.id}`)
    toast({ title: `已创建项目空间「${created.name}」`, status: 'normal' })
  }

  const handleMarkRead = React.useCallback((id: string) => {
    setInbox((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)))
  }, [])

  const handleMarkAllRead = React.useCallback(() => {
    setInbox((prev) => prev.map((m) => ({ ...m, unread: false })))
    toast({ title: '全部消息已标为已读', status: 'normal' })
  }, [toast])

  const handleMarkDeliveriesDone = React.useCallback(
    (ids: string[]) => {
      const idSet = new Set(ids)
      setDeliveries((prev) =>
        prev.map((d) =>
          idSet.has(d.id)
            ? { ...d, progress: 100, stateKey: 'done', stateLabel: '已完成', status: 'normal', updatedAt: '刚刚', updatedRank: 0 }
            : d,
        ),
      )
      toast({ title: `已将 ${ids.length} 项交付标为已完成`, status: 'normal' })
    },
    [toast],
  )

  const handleRotateApiKey = React.useCallback(
    (id: string) => {
      const suffix = Math.random().toString(16).slice(2, 6)
      setApiKeys((prev) =>
        prev.map((k) =>
          k.id === id
            ? {
                ...k,
                prefix: `glz_live_${suffix}••••`,
                statusKey: 'active',
                statusLabel: '活跃',
                status: 'normal',
                expiresAt: '2027-11-28',
                lastUsed: '刚刚轮换',
              }
            : k,
        ),
      )
      toast({ title: '密钥已轮换签发', description: `新前缀 glz_live_${suffix}•••• 已生效`, status: 'normal' })
    },
    [toast],
  )

  const handleRevokeApiKeys = React.useCallback(
    (ids: string[]) => {
      const idSet = new Set(ids)
      setApiKeys((prev) =>
        prev.map((k) =>
          idSet.has(k.id)
            ? { ...k, statusKey: 'revoked', statusLabel: '已吊销', status: 'disabled', expiresAt: '已失效' }
            : k,
        ),
      )
      toast({ title: `已吊销 ${ids.length} 个 API 密钥`, status: 'warning' })
    },
    [toast],
  )

  // TanStack Table v9 Column Definitions (memoized for stable row models)
  const deliveryColumns = React.useMemo(
    () =>
      deliveryColHelper.columns([
        deliveryColHelper.accessor('name', {
          header: '交付事项',
          meta: { label: '交付事项' },
          cell: ({ row }) => (
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[#1B1F27]">{row.original.name}</span>
              <span className="font-glaze-mono text-[11px] text-[#8A90A0]">
                {row.original.id} · {row.original.pr}
              </span>
            </div>
          ),
        }),
        deliveryColHelper.accessor('group', {
          header: '所属分组',
          meta: { label: '所属分组' },
          cell: ({ row }) => (
            <HueTag hue={row.original.groupHue} size="sm">
              {row.original.group}
            </HueTag>
          ),
        }),
        deliveryColHelper.accessor('owner', {
          header: '负责人',
          meta: { label: '负责人' },
          cell: ({ row }) => (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Avatar fallback={row.original.ownerAvatar} hue={row.original.ownerHue} size="xs" />
              <span className="font-medium text-[#1B1F27]">{row.original.owner}</span>
            </span>
          ),
        }),
        deliveryColHelper.accessor('progress', {
          header: '完成进度',
          meta: { label: '完成进度', headerClassName: 'w-44' },
          cell: ({ getValue }) => {
            const val = getValue()
            return (
              <div className="flex items-center gap-2.5">
                <Progress
                  value={val}
                  hue={val === 100 ? 'mint' : val < 65 ? 'coral' : 'periwinkle'}
                  height="sm"
                  className="flex-1"
                />
                <span className="w-9 text-right font-glaze-mono text-[12px] font-bold text-[#5B6170]">
                  {val}%
                </span>
              </div>
            )
          },
        }),
        deliveryColHelper.accessor('stateKey', {
          header: '状态',
          meta: { label: '状态' },
          cell: ({ row }) => (
            <StatusPill status={row.original.status}>{row.original.stateLabel}</StatusPill>
          ),
        }),
        deliveryColHelper.accessor('updatedRank', {
          header: '更新时间',
          meta: { label: '更新时间', align: 'right' },
          cell: ({ row }) => (
            <span className="whitespace-nowrap text-[12.5px] text-[#6B7280]">
              {row.original.updatedAt}
            </span>
          ),
        }),
        deliveryColHelper.display({
          id: 'actions',
          enableSorting: false,
          enableHiding: false,
          meta: { align: 'right', label: '操作', headerClassName: 'w-14', cellClassName: 'w-14' },
          header: () => null,
          cell: ({ row }) => (
            <Menu
              align="end"
              items={[
                {
                  id: 'done',
                  label: '标记为已完成',
                  icon: <CheckCircle size={14} />,
                  disabled: row.original.stateKey === 'done',
                  onSelect: () => handleMarkDeliveriesDone([row.original.id]),
                },
                {
                  id: 'copy-id',
                  label: `复制编号 ${row.original.id}`,
                  icon: <Copy size={14} />,
                  onSelect: () => toast({ title: `已复制 ${row.original.id}`, status: 'info' }),
                },
                {
                  id: 'remove',
                  label: '从清单移除',
                  icon: <Trash size={14} />,
                  danger: true,
                  separatorBefore: true,
                  onSelect: () => {
                    setDeliveries((prev) => prev.filter((d) => d.id !== row.original.id))
                    toast({ title: `已移除「${row.original.name}」`, status: 'warning' })
                  },
                },
              ]}
              trigger={
                <button
                  type="button"
                  aria-label={`${row.original.name} 更多操作`}
                  className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] transition-colors hover:bg-[#EEF0F3] hover:text-[#1B1F27]"
                >
                  <DotsThree size={16} weight="bold" />
                </button>
              }
            />
          ),
        }),
      ]),
    [handleMarkDeliveriesDone, toast],
  )

  const inboxColumns = React.useMemo(
    () =>
      inboxColHelper.columns([
        inboxColHelper.accessor('title', {
          header: '通知主题',
          meta: { label: '通知主题' },
          cell: ({ row }) => (
            <div className="flex items-center gap-2.5">
              {row.original.unread ? (
                <StatusDot status="info" size={7} />
              ) : (
                <span className="h-1.75 w-1.75 shrink-0 rounded-full bg-transparent" />
              )}
              <span
                className={cn(
                  'text-[13.5px]',
                  row.original.unread ? 'font-bold text-[#1B1F27]' : 'font-medium text-[#5B6170]',
                )}
              >
                {row.original.title}
              </span>
            </div>
          ),
        }),
        inboxColHelper.accessor('sender', {
          header: '来源',
          meta: { label: '来源' },
          cell: ({ row }) => (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Avatar fallback={row.original.senderInitial} hue={row.original.senderHue} size="xs" />
              <span>{row.original.sender}</span>
            </span>
          ),
        }),
        inboxColHelper.accessor('tag', {
          header: '分类',
          meta: { label: '分类' },
          cell: ({ row }) => (
            <HueTag hue={row.original.tagHue} size="xs">
              {row.original.tag}
            </HueTag>
          ),
        }),
        inboxColHelper.accessor((row) => (row.unread ? 'unread' : 'read'), {
          id: 'readState',
          header: '阅读状态',
          meta: { label: '阅读状态' },
          cell: ({ row }) => (
            <StatusPill status={row.original.unread ? 'info' : 'normal'}>
              {row.original.unread ? '未读' : '已读'}
            </StatusPill>
          ),
        }),
        inboxColHelper.accessor('time', {
          header: '时间',
          meta: { label: '时间', align: 'right' },
          cell: (info) => (
            <span className="whitespace-nowrap text-[12px] text-[#8A90A0]">{info.getValue()}</span>
          ),
        }),
        inboxColHelper.display({
          id: 'inbox-action',
          enableSorting: false,
          enableHiding: false,
          meta: { align: 'right', label: '操作' },
          header: () => null,
          cell: ({ row }) =>
            row.original.unread ? (
              <Button
                size="sm"
                variant="soft"
                hue="periwinkle"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMarkRead(row.original.id)
                }}
              >
                标为已读
              </Button>
            ) : (
              <span className="text-[12px] font-medium text-[#8A90A0]">已处理</span>
            ),
        }),
      ]),
    [handleMarkRead],
  )

  const apiKeyColumns = React.useMemo(
    () =>
      apiKeyColHelper.columns([
        apiKeyColHelper.accessor('name', {
          header: '密钥名称',
          meta: { label: '密钥名称' },
          cell: ({ row }) => (
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[#1B1F27]">{row.original.name}</span>
              <code className="font-glaze-mono text-[11px] text-[#6B7280]">{row.original.prefix}</code>
            </div>
          ),
        }),
        apiKeyColHelper.accessor('env', {
          header: '环境',
          meta: { label: '环境' },
          cell: ({ row }) => (
            <HueTag hue={row.original.envHue} size="sm">
              {row.original.env}
            </HueTag>
          ),
        }),
        apiKeyColHelper.accessor('scope', {
          header: '权限范围',
          meta: { label: '权限范围' },
          cell: (info) => (
            <code className="rounded-full bg-[#F6F7F9] px-2.5 py-0.5 font-glaze-mono text-[11px] text-[#5B6170]">
              {info.getValue()}
            </code>
          ),
        }),
        apiKeyColHelper.accessor('calls30d', {
          header: '近 30 日调用',
          meta: { label: '近 30 日调用', numeric: true },
          cell: (info) => (
            <span className="font-bold text-[#1B1F27]">{info.getValue().toLocaleString()}</span>
          ),
        }),
        apiKeyColHelper.accessor('statusKey', {
          header: '状态',
          meta: { label: '状态' },
          cell: ({ row }) => (
            <StatusPill status={row.original.status}>{row.original.statusLabel}</StatusPill>
          ),
        }),
        apiKeyColHelper.accessor('expiresAt', {
          header: '到期日期',
          meta: { label: '到期日期', align: 'right' },
          cell: (info) => (
            <span className="font-glaze-mono text-[12px] text-[#6B7280]">{info.getValue()}</span>
          ),
        }),
        apiKeyColHelper.display({
          id: 'key-actions',
          enableSorting: false,
          enableHiding: false,
          meta: { align: 'right', label: '操作', headerClassName: 'w-14', cellClassName: 'w-14' },
          header: () => null,
          cell: ({ row }) => (
            <Menu
              align="end"
              items={[
                {
                  id: 'rotate',
                  label: '轮换新密钥',
                  icon: <ArrowsClockwise size={14} />,
                  disabled: row.original.statusKey === 'revoked',
                  onSelect: () => handleRotateApiKey(row.original.id),
                },
                {
                  id: 'copy-prefix',
                  label: '复制密钥前缀',
                  icon: <Copy size={14} />,
                  onSelect: () =>
                    toast({ title: `已复制 ${row.original.prefix}`, status: 'info' }),
                },
                {
                  id: 'revoke',
                  label: '吊销此密钥',
                  icon: <Trash size={14} />,
                  danger: true,
                  disabled: row.original.statusKey === 'revoked',
                  separatorBefore: true,
                  onSelect: () => handleRevokeApiKeys([row.original.id]),
                },
              ]}
              trigger={
                <button
                  type="button"
                  aria-label={`${row.original.name} 操作菜单`}
                  className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] transition-colors hover:bg-[#EEF0F3] hover:text-[#1B1F27]"
                >
                  <DotsThree size={16} weight="bold" />
                </button>
              }
            />
          ),
        }),
      ]),
    [handleRevokeApiKeys, handleRotateApiKey, toast],
  )

  // Derive active breadcrumb & page header metadata
  const currentMeta = React.useMemo(() => {
    if (activeRoute.startsWith('project:')) {
      const pid = activeRoute.replace('project:', '')
      const proj = projects.find((p) => p.id === pid)
      return {
        section: '项目空间',
        parent: undefined as string | undefined,
        title: proj?.name ?? '项目详情',
        description: proj
          ? `分支 ${proj.branch} · ${proj.openIssues} 项待处理事务 · 最近更新 ${proj.updatedAt}`
          : '团队协作项目空间',
      }
    }
    if (activeRoute.startsWith('tag:')) {
      const tid = activeRoute.replace('tag:', '')
      const tag = TAG_VIEWS.find((t) => t.id === tid)
      return {
        section: '标签视图',
        parent: undefined as string | undefined,
        title: `# ${tag?.label ?? '标签'}`,
        description: tag?.description ?? '按彩色标签聚合的跨模块数据视图',
      }
    }
    return ROUTES_META[activeRoute] ?? ROUTES_META.overview
  }, [activeRoute, projects])

  // Command palette grouped entries (filtered natively by cmdk)
  const commandRouteEntries = React.useMemo(
    () =>
      Object.values(ROUTES_META).map((r) => ({
        id: r.id,
        label: r.title,
        group: r.parent ? `${r.section} › ${r.parent}` : r.section,
        action: () => navigate(r.id),
      })),
    [navigate],
  )

  const commandProjectEntries = React.useMemo(
    () =>
      projects.map((p) => ({
        id: `project:${p.id}`,
        label: p.name,
        group: '项目空间',
        action: () => navigate(`project:${p.id}`),
      })),
    [navigate, projects],
  )

  const commandTagEntries = React.useMemo(
    () =>
      TAG_VIEWS.map((t) => ({
        id: `tag:${t.id}`,
        label: `# ${t.label}`,
        group: '标签视图',
        action: () => navigate(`tag:${t.id}`),
      })),
    [navigate],
  )

  // Workspace Switcher Menu items
  const workspaceMenuItems: MenuItemConfig[] = [
    ...WORKSPACES.map((ws) => ({
      id: ws.id,
      label: `${ws.name} · ${ws.plan}`,
      icon:
        ws.id === workspaceId ? (
          <Check size={14} weight="bold" className="text-[#4A4FB8]" />
        ) : (
          <Buildings size={14} weight="duotone" />
        ),
      onSelect: () => {
        setWorkspaceId(ws.id)
        toast({ title: `已切换至「${ws.name}」`, description: `${ws.plan} · ${ws.members} 名成员`, status: 'info' })
      },
    })),
    {
      id: 'ws-create',
      label: '创建新工作区',
      icon: <Plus size={14} weight="bold" />,
      separatorBefore: true,
      onSelect: () => toast({ title: '工作区向导', description: '已准备创建新的企业租户空间', status: 'info' }),
    },
  ]

  // User Profile Footer & Topbar Menu items
  const userMenuItems: MenuItemConfig[] = [
    {
      id: 'status-online',
      label: '状态：在线中',
      icon: <StatusDot status="normal" size={8} />,
      onSelect: () => {
        setPresence('online')
        toast({ title: '在线状态已更新为「在线中」', status: 'normal' })
      },
    },
    {
      id: 'status-busy',
      label: '状态：专注忙碌',
      icon: <StatusDot status="error" size={8} />,
      onSelect: () => {
        setPresence('busy')
        toast({ title: '在线状态已更新为「专注忙碌」', status: 'warning' })
      },
    },
    {
      id: 'status-away',
      label: '状态：暂时离开',
      icon: <StatusDot status="warning" size={8} />,
      onSelect: () => {
        setPresence('away')
        toast({ title: '在线状态已更新为「暂时离开」', status: 'info' })
      },
    },
    {
      id: 'account-profile',
      label: '个人偏好设置',
      icon: <UserCircle size={15} />,
      shortcut: '⌘,',
      separatorBefore: true,
      onSelect: () => navigate('platform/access/roles'),
    },
    {
      id: 'account-guide',
      label: '查看 15 种菜单清单',
      icon: <Compass size={15} />,
      onSelect: () => setGuideOpen(true),
    },
    {
      id: 'account-signout',
      label: '退出当前账号',
      icon: <SignOut size={15} />,
      danger: true,
      separatorBefore: true,
      onSelect: () => toast({ title: '演示模式', description: '已拦截退出登录操作', status: 'warning' }),
    },
  ]

  // Sorted projects: pinned first
  const sortedProjects = React.useMemo(
    () => [...projects].sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    [projects],
  )

  // Composable Glaze Sidebar (powered by @/components/ui/sidebar)
  const wsPalette = HUE_PALETTES[activeWorkspace.hue]

  const showOverview = matchesFilter('总览驾驶舱', 'overview', '首页', '工作台')
  const showLive = matchesFilter('实时监控大屏', 'live', '监控', '遥测')
  const showInbox = matchesFilter('消息收件箱', 'inbox', '通知', '未读')
  const showAi = matchesFilter('AI 洞察助手', 'ai', '助手', 'new')
  const showWorkspaceGroup = showOverview || showLive || showInbox || showAi

  const analyticsChildren = [
    { id: 'analytics/traffic', label: '实时流量', trailing: <span className="font-glaze-mono text-[10px] font-bold text-[#2F6B28]">1.4k/s</span> },
    { id: 'analytics/funnel', label: '转化漏斗' },
    { id: 'analytics/retention', label: '留存队列' },
    { id: 'analytics/custom', label: '自定义报表', trailing: <HueTag hue="sky" size="xs">BETA</HueTag> },
  ].filter((c) => matchesFilter('数据中心', c.label, c.id))

  const accessChildren = [
    { id: 'platform/access/roles', label: '成员与角色' },
    { id: 'platform/access/api-keys', label: 'API 密钥', badge: <CountBadge count={activeApiKeyCount} hue="neutral" className="h-4.5 min-w-4.5 text-[10px]" /> },
    { id: 'platform/access/sso', label: 'SSO 单点登录' },
  ].filter((c) => matchesFilter('平台管理', '访问控制', c.label, c.id))

  const billingChildren = [
    { id: 'platform/billing/usage', label: '用量明细' },
    { id: 'platform/billing/invoices', label: '发票与抬头' },
  ].filter((c) => matchesFilter('平台管理', '计费与账单', c.label, c.id))

  const showAudit = matchesFilter('平台管理', '操作审计日志', 'audit')
  const showPlatform = accessChildren.length > 0 || billingChildren.length > 0 || showAudit

  const filteredProjects = sortedProjects.filter((p) => matchesFilter('项目空间', p.name, p.branch))
  const filteredTags = TAG_VIEWS.filter((t) => matchesFilter('标签视图', t.label))
  const showDnd = matchesFilter('免打扰模式', '偏好', '开关')
  const showCompact = matchesFilter('紧凑卡片模式', '密度', '偏好')
  const showCmdItem = matchesFilter('全局命令面板', '搜索', 'command')
  const showDocs = matchesFilter('开发者文档', 'api', 'docs', '外链')
  const showVault = matchesFilter('合规审计 Vault', '锁定', 'pro', '禁用')
  const showUtilityGroup = showDnd || showCompact || showCmdItem || showDocs || showVault

  const hasAnyResult =
    showWorkspaceGroup ||
    analyticsChildren.length > 0 ||
    showPlatform ||
    filteredProjects.length > 0 ||
    filteredTags.length > 0 ||
    showUtilityGroup

  const sidebarElement = (
    <Sidebar variant="floating" collapsible="icon" mobileTitle="导航菜单">
      {/* 1. Workspace Switcher + 2. Quick Menu Filter */}
      <SidebarHeader>
        <Menu
          align="start"
          side={isCollapsed ? 'right' : 'bottom'}
          items={workspaceMenuItems}
          trigger={
            <button
              type="button"
              aria-label="切换工作区"
              className={cn(
                'flex w-full cursor-pointer items-center rounded-[18px] transition-colors duration-150 outline-none',
                'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
                isCollapsed
                  ? 'mx-auto h-11 w-11 justify-center p-0 hover:bg-[#F6F7F9]'
                  : 'gap-2.5 bg-[#F6F7F9] px-2.5 py-2 hover:bg-[#EEF0F3] data-popup-open:bg-[#EEF0F3]',
              )}
            >
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] font-glaze-display text-[13px] font-extrabold"
                style={{ backgroundColor: wsPalette[100], color: wsPalette[700] }}
              >
                {activeWorkspace.code}
              </span>
              {!isCollapsed && (
                <>
                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate font-glaze-display text-[14px] leading-tight font-extrabold text-[#1B1F27]">
                      {activeWorkspace.name}
                    </span>
                    <span className="truncate text-[11px] font-medium text-[#6B7280]">
                      {activeWorkspace.plan}
                    </span>
                  </span>
                  <CaretUpDown size={15} weight="bold" className="shrink-0 text-[#8A90A0]" />
                </>
              )}
            </button>
          }
        />

        {!isCollapsed && (
          <Input
            inputSize="sm"
            surface="soft"
            value={sidebarFilter}
            onChange={(e) => setSidebarFilter(e.target.value)}
            placeholder="筛选菜单项..."
            leadingIcon={<MagnifyingGlass size={14} weight="bold" />}
            trailingElement={
              sidebarFilter ? (
                <button
                  type="button"
                  onClick={() => setSidebarFilter('')}
                  aria-label="清空筛选"
                  className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
                >
                  <X size={11} weight="bold" />
                </button>
              ) : (
                <span className="rounded-full bg-white px-1.5 py-0.5 font-glaze-mono text-[10px] font-semibold text-[#8A90A0]">
                  /
                </span>
              )
            }
          />
        )}
      </SidebarHeader>

      {/* Scrollable Navigation Regions */}
      <SidebarContent>
        {!hasAnyResult && (
          <div className="mx-2 my-6 rounded-inner bg-[#F6F7F9] p-4 text-center">
            <p className="m-0 text-[12.5px] font-semibold text-[#5B6170]">未匹配到菜单项</p>
            <button
              type="button"
              onClick={() => setSidebarFilter('')}
              className="mt-2 cursor-pointer text-[12px] font-semibold text-[#4A4FB8] hover:underline"
            >
              重置过滤条件
            </button>
          </div>
        )}

        {/* Section 1: Workspace Core */}
        {showWorkspaceGroup && (
          <SidebarGroup>
            <SidebarGroupLabel>工作台</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {showOverview && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeRoute === 'overview'}
                      icon={<House size={17} weight={activeRoute === 'overview' ? 'fill' : 'duotone'} />}
                      onClick={() => navigate('overview')}
                    >
                      总览驾驶舱
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {showLive && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeRoute === 'live-monitor'}
                      icon={<Broadcast size={17} weight={activeRoute === 'live-monitor' ? 'fill' : 'duotone'} />}
                      trailing={
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2F5DA] px-2 py-0.5 text-[10px] font-bold text-[#2F6B28]">
                          <StatusDot status="normal" mode="ripple" size={6} />
                          LIVE
                        </span>
                      }
                      onClick={() => navigate('live-monitor')}
                    >
                      实时监控大屏
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {showInbox && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeRoute === 'inbox'}
                      icon={<Tray size={17} weight={activeRoute === 'inbox' ? 'fill' : 'duotone'} />}
                      trailing={
                        unreadCount > 0 ? (
                          <CountBadge count={unreadCount} hue="coral" />
                        ) : (
                          <CheckCircle size={14} weight="fill" className="text-[#49A851]" />
                        )
                      }
                      onClick={() => navigate('inbox')}
                    >
                      消息收件箱
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {showAi && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeRoute === 'ai-assistant'}
                      icon={<Sparkle size={17} weight={activeRoute === 'ai-assistant' ? 'fill' : 'duotone'} />}
                      trailing={<HueTag hue="lilac" size="xs">NEW</HueTag>}
                      onClick={() => navigate('ai-assistant')}
                    >
                      AI 洞察助手
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Section 2: 2-Level & 3-Level Collapsible Tree Menus */}
        {(analyticsChildren.length > 0 || showPlatform) && (
          <SidebarGroup>
            <SidebarGroupLabel>业务与管理</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {analyticsChildren.length > 0 && (
                  <SidebarMenuItem>
                    <SidebarMenuCollapsible
                      icon={<ChartLineUp size={17} weight={activeRoute.startsWith('analytics/') ? 'fill' : 'duotone'} />}
                      label="数据中心"
                      open={Boolean(filterKeyword) || analyticsOpen}
                      onOpenChange={setAnalyticsOpen}
                      hasActiveChild={activeRoute.startsWith('analytics/')}
                      flyoutContent={analyticsChildren.map((child) => (
                        <SidebarMenuButton
                          key={child.id}
                          forceExpanded
                          size="sm"
                          isActive={activeRoute === child.id}
                          icon={<ChartBar size={14} weight="duotone" />}
                          trailing={child.trailing}
                          onClick={() => navigate(child.id)}
                        >
                          {child.label}
                        </SidebarMenuButton>
                      ))}
                    >
                      {analyticsChildren.map((child) => (
                        <SidebarMenuSubItem key={child.id}>
                          <SidebarMenuSubButton
                            isActive={activeRoute === child.id}
                            trailing={child.trailing}
                            onClick={() => navigate(child.id)}
                          >
                            {child.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                )}

                {showPlatform && (
                  <SidebarMenuItem>
                    <SidebarMenuCollapsible
                      icon={<ShieldCheck size={17} weight={activeRoute.startsWith('platform/') ? 'fill' : 'duotone'} />}
                      label="平台管理"
                      badge={
                        <span className="rounded-full bg-[#F2F3F5] px-1.5 py-0.5 font-glaze-mono text-[10px] font-bold text-[#6B7280]">
                          3级
                        </span>
                      }
                      open={Boolean(filterKeyword) || platformOpen}
                      onOpenChange={setPlatformOpen}
                      hasActiveChild={activeRoute.startsWith('platform/')}
                      flyoutContent={
                        <div className="flex flex-col gap-2">
                          {accessChildren.length > 0 && (
                            <div className="flex flex-col gap-0.5">
                              <span className="px-2.5 text-[10px] font-bold tracking-[0.06em] text-[#8A90A0] uppercase">
                                访问控制
                              </span>
                              {accessChildren.map((c) => (
                                <SidebarMenuButton
                                  key={c.id}
                                  forceExpanded
                                  size="sm"
                                  isActive={activeRoute === c.id}
                                  icon={<Key size={14} weight="duotone" />}
                                  trailing={c.badge}
                                  onClick={() => navigate(c.id)}
                                >
                                  {c.label}
                                </SidebarMenuButton>
                              ))}
                            </div>
                          )}
                          {billingChildren.length > 0 && (
                            <div className="flex flex-col gap-0.5">
                              <span className="px-2.5 text-[10px] font-bold tracking-[0.06em] text-[#8A90A0] uppercase">
                                计费与账单
                              </span>
                              {billingChildren.map((c) => (
                                <SidebarMenuButton
                                  key={c.id}
                                  forceExpanded
                                  size="sm"
                                  isActive={activeRoute === c.id}
                                  icon={<Receipt size={14} weight="duotone" />}
                                  onClick={() => navigate(c.id)}
                                >
                                  {c.label}
                                </SidebarMenuButton>
                              ))}
                            </div>
                          )}
                          {showAudit && (
                            <SidebarMenuButton
                              forceExpanded
                              size="sm"
                              isActive={activeRoute === 'platform/audit'}
                              icon={<FileText size={14} weight="duotone" />}
                              onClick={() => navigate('platform/audit')}
                            >
                              操作审计日志
                            </SidebarMenuButton>
                          )}
                        </div>
                      }
                    >
                      {accessChildren.length > 0 && (
                        <SidebarMenuSubItem>
                          <SidebarMenuCollapsible
                            level={1}
                            icon={<UsersThree size={15} weight="duotone" />}
                            label="访问控制"
                            open={Boolean(filterKeyword) || accessOpen}
                            onOpenChange={setAccessOpen}
                            hasActiveChild={activeRoute.startsWith('platform/access/')}
                          >
                            {accessChildren.map((c) => (
                              <SidebarMenuSubItem key={c.id}>
                                <SidebarMenuSubButton
                                  size="sm"
                                  isActive={activeRoute === c.id}
                                  trailing={c.badge}
                                  onClick={() => navigate(c.id)}
                                >
                                  {c.label}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuCollapsible>
                        </SidebarMenuSubItem>
                      )}

                      {billingChildren.length > 0 && (
                        <SidebarMenuSubItem>
                          <SidebarMenuCollapsible
                            level={1}
                            icon={<CreditCard size={15} weight="duotone" />}
                            label="计费与账单"
                            open={Boolean(filterKeyword) || billingOpen}
                            onOpenChange={setBillingOpen}
                            hasActiveChild={activeRoute.startsWith('platform/billing/')}
                          >
                            {billingChildren.map((c) => (
                              <SidebarMenuSubItem key={c.id}>
                                <SidebarMenuSubButton
                                  size="sm"
                                  isActive={activeRoute === c.id}
                                  onClick={() => navigate(c.id)}
                                >
                                  {c.label}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuCollapsible>
                        </SidebarMenuSubItem>
                      )}

                      {showAudit && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            isActive={activeRoute === 'platform/audit'}
                            icon={<FileText size={15} weight="duotone" />}
                            onClick={() => navigate('platform/audit')}
                          >
                            操作审计日志
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Section 3: Collapsible Group + Inline '+' Action + Hover '···' & Right-Click ContextMenu */}
        {filteredProjects.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel
              collapsible
              open={Boolean(filterKeyword) || projectsSectionOpen}
              onToggle={() => setProjectsSectionOpen((o) => !o)}
              action={
                <SidebarGroupAction
                  tooltip="新建项目空间"
                  aria-label="新建项目空间"
                  onClick={() => setNewProjectOpen(true)}
                >
                  <Plus size={12} weight="bold" />
                </SidebarGroupAction>
              }
            >
              项目空间
            </SidebarGroupLabel>

            {(isCollapsed || Boolean(filterKeyword) || projectsSectionOpen) && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredProjects.map((proj) => {
                    const isActive = activeRoute === `project:${proj.id}`
                    const swatch = HUE_PALETTES[proj.hue][500]
                    const projMenuItems: MenuItemConfig[] = [
                      {
                        id: 'pin',
                        label: proj.pinned ? '取消置顶' : '置顶收藏',
                        icon: <PushPin size={14} weight={proj.pinned ? 'fill' : 'regular'} />,
                        onSelect: () => handleTogglePinProject(proj.id),
                      },
                      {
                        id: 'copy-link',
                        label: '复制项目链接',
                        icon: <LinkIcon size={14} />,
                        onSelect: () =>
                          toast({
                            title: '已复制链接',
                            description: `https://glaze.cloud/projects/${proj.id}`,
                            status: 'normal',
                          }),
                      },
                      {
                        id: 'archive',
                        label: '归档该项目',
                        icon: <Trash size={14} />,
                        danger: true,
                        separatorBefore: true,
                        onSelect: () => handleArchiveProject(proj.id),
                      },
                    ]

                    if (isCollapsed) {
                      return (
                        <SidebarMenuItem key={proj.id}>
                          <SidebarMenuButton
                            isActive={isActive}
                            icon={
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: swatch }}
                              />
                            }
                            tooltip={`${proj.name}${proj.pinned ? '（已置顶）' : ''}`}
                            onClick={() => navigate(`project:${proj.id}`)}
                          >
                            {proj.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    }

                    return (
                      <SidebarMenuItem key={proj.id}>
                        <ContextMenu
                          items={[
                            {
                              id: 'ctx-pin',
                              label: '置顶到项目顶部',
                              checked: proj.pinned,
                              onSelect: () => handleTogglePinProject(proj.id),
                            },
                            {
                              id: 'ctx-open',
                              label: '打开项目看板',
                              icon: <FolderSimple size={14} />,
                              separatorBefore: true,
                              onSelect: () => navigate(`project:${proj.id}`),
                            },
                            {
                              id: 'ctx-copy',
                              label: '复制项目 ID',
                              icon: <Copy size={14} />,
                              onSelect: () => toast({ title: `已复制 ${proj.id}`, status: 'info' }),
                            },
                            {
                              id: 'ctx-archive',
                              label: '归档项目',
                              icon: <Trash size={14} />,
                              danger: true,
                              separatorBefore: true,
                              onSelect: () => handleArchiveProject(proj.id),
                            },
                          ]}
                        >
                          <div
                            className={cn(
                              'relative flex h-9 w-full items-center gap-2 rounded-full pr-1.5 pl-3 text-[13px] font-semibold transition-colors duration-150',
                              isActive
                                ? 'bg-[#F3F4FE] text-[#262B7A]'
                                : 'text-[#5B6170] hover:bg-[#F6F7F9] hover:text-[#1B1F27]',
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => navigate(`project:${proj.id}`)}
                              className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-left outline-none"
                            >
                              <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: swatch }}
                              />
                              <span className="truncate">{proj.name}</span>
                            </button>

                            {proj.pinned && (
                              <PushPin
                                size={12}
                                weight="fill"
                                className="shrink-0 text-[#7B80EA] transition-opacity group-hover/menu-item:hidden"
                              />
                            )}

                            <Menu
                              side="right"
                              align="start"
                              items={projMenuItems}
                              trigger={
                                <SidebarMenuAction
                                  showOnHover
                                  aria-label={`${proj.name} 更多操作`}
                                >
                                  <DotsThree size={16} weight="bold" />
                                </SidebarMenuAction>
                              }
                            />
                          </div>
                        </ContextMenu>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}

        {/* Section 4: Color-Coded Tag Filter Views */}
        {filteredTags.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel
              collapsible
              open={Boolean(filterKeyword) || tagsSectionOpen}
              onToggle={() => setTagsSectionOpen((o) => !o)}
            >
              标签视图
            </SidebarGroupLabel>
            {(isCollapsed || Boolean(filterKeyword) || tagsSectionOpen) && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredTags.map((tag) => {
                    const isActive = activeRoute === `tag:${tag.id}`
                    const palette = HUE_PALETTES[tag.hue]
                    return (
                      <SidebarMenuItem key={tag.id}>
                        <SidebarMenuButton
                          isActive={isActive}
                          icon={<Tag size={15} weight="fill" style={{ color: palette[500] }} />}
                          trailing={<SidebarMenuBadge>{tag.count}</SidebarMenuBadge>}
                          onClick={() => navigate(`tag:${tag.id}`)}
                        >
                          {tag.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}

        {/* Section 5: Inline Switch Toggles, Shortcut Item, External Link, Disabled Locked Item */}
        {showUtilityGroup && (
          <SidebarGroup>
            <SidebarGroupLabel>偏好与工具</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {showDnd && !isCollapsed && (
                  <SidebarMenuItem>
                    <div className="flex h-9.5 items-center justify-between gap-2 rounded-full px-3 text-[13px] font-semibold text-[#5B6170] hover:bg-[#F6F7F9]">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <BellSlash
                          size={17}
                          weight={dndMode ? 'fill' : 'duotone'}
                          className={dndMode ? 'text-[#4A4FB8]' : 'text-[#6B7280]'}
                        />
                        <span className="truncate">免打扰模式</span>
                      </span>
                      <Switch
                        size="sm"
                        hue="periwinkle"
                        checked={dndMode}
                        onCheckedChange={(checked) => {
                          setDndMode(checked)
                          toast({
                            title: checked ? '已开启免打扰模式' : '已关闭免打扰模式',
                            description: checked ? '顶部栏将静音非紧急告警通知' : '恢复接收全部实时告警',
                            status: 'info',
                          })
                        }}
                      />
                    </div>
                  </SidebarMenuItem>
                )}
                {showDnd && isCollapsed && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={dndMode}
                      icon={<BellSlash size={17} weight={dndMode ? 'fill' : 'duotone'} />}
                      onClick={() => setDndMode((v) => !v)}
                    >
                      {dndMode ? '免打扰：已开启' : '免打扰：已关闭'}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {showCompact && !isCollapsed && (
                  <SidebarMenuItem>
                    <div className="flex h-9.5 items-center justify-between gap-2 rounded-full px-3 text-[13px] font-semibold text-[#5B6170] hover:bg-[#F6F7F9]">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <SlidersHorizontal
                          size={17}
                          weight={compactDensity ? 'fill' : 'duotone'}
                          className={compactDensity ? 'text-[#17625B]' : 'text-[#6B7280]'}
                        />
                        <span className="truncate">紧凑密度</span>
                      </span>
                      <Switch
                        size="sm"
                        hue="aqua"
                        checked={compactDensity}
                        onCheckedChange={(checked) => {
                          setCompactDensity(checked)
                          toast({
                            title: checked ? '已切换紧凑布局密度' : '已恢复标准 Bento 间距',
                            status: 'info',
                          })
                        }}
                      />
                    </div>
                  </SidebarMenuItem>
                )}

                {showCmdItem && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      icon={<Command size={17} weight="duotone" />}
                      trailing={
                        <span className="rounded-full bg-[#F2F3F5] px-2 py-0.5 font-glaze-mono text-[10px] font-bold text-[#6B7280]">
                          ⌘K
                        </span>
                      }
                      onClick={() => setCmdOpen(true)}
                    >
                      全局命令面板
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {showDocs && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      icon={<Terminal size={17} weight="duotone" />}
                      trailing={<ArrowUpRight size={14} weight="bold" className="text-[#8A90A0]" />}
                      href="/docs/components"
                      target="_blank"
                    >
                      开发者文档
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {showVault && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      disabled
                      icon={<LockSimple size={17} weight="duotone" />}
                      tooltip="仅企业旗舰版可用 · 联系管理员解锁"
                      trailing={
                        <HueTag hue="lemon" size="xs">
                          <Crown size={10} weight="fill" />
                          PRO
                        </HueTag>
                      }
                    >
                      合规审计 Vault
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Bottom Area: Embedded Quota Progress Widget + User Account Menu */}
      <SidebarFooter>
        {!isCollapsed && showQuotaCard && (
          <div className="mb-1 rounded-inner bg-[#F3F4FE] p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#262B7A]">API 调用配额</span>
                <span className="text-[11px] text-[#4A4FB8]">本月已用 760k / 1M</span>
              </div>
              <button
                type="button"
                onClick={() => setShowQuotaCard(false)}
                aria-label="关闭配额提示"
                className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#4A4FB8] hover:bg-[#E4E6FD]"
              >
                <X size={11} weight="bold" />
              </button>
            </div>
            <Progress
              value={76}
              hue="periwinkle"
              height="sm"
              trackColor="rgba(38,43,122,0.12)"
              className="mt-2.5"
            />
            <div className="mt-2.5 flex items-center justify-between">
              <span className="font-glaze-mono text-[11px] font-bold text-[#262B7A]">76%</span>
              <button
                type="button"
                onClick={() => navigate('platform/billing/usage')}
                className="cursor-pointer rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#262B7A] transition-colors hover:bg-[#E4E6FD]"
              >
                升级配额 →
              </button>
            </div>
          </div>
        )}

        <Menu
          side="right"
          align="end"
          items={userMenuItems}
          trigger={
            <button
              type="button"
              aria-label="账号与状态菜单"
              className={cn(
                'flex w-full cursor-pointer items-center rounded-full transition-colors duration-150 outline-none',
                'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
                isCollapsed
                  ? 'mx-auto h-11 w-11 justify-center p-0 hover:bg-[#F6F7F9]'
                  : 'gap-2.5 px-2 py-1.5 hover:bg-[#F6F7F9] data-popup-open:bg-[#F2F3F5]',
              )}
            >
              <span className="relative shrink-0">
                <Avatar fallback="林" hue="sky" size="sm" />
                <span className="absolute -right-0.5 -bottom-0.5 rounded-full bg-white p-0.5">
                  <StatusDot status={PRESENCE_META[presence].status} size={7} />
                </span>
              </span>
              {!isCollapsed && (
                <>
                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate text-[13px] font-bold text-[#1B1F27]">林一</span>
                    <span className="truncate text-[11px] text-[#6B7280]">
                      {PRESENCE_META[presence].label} · 管理员
                    </span>
                  </span>
                  <GearSix size={16} weight="duotone" className="shrink-0 text-[#8A90A0]" />
                </>
              )}
            </button>
          }
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )

  // Main View Content Switcher (reacts to activeRoute & timeRange)
  const rangeData = RANGE_METRICS[timeRange]

  const renderMainContent = () => {
    // 1. Inbox View (Live-linked to Sidebar Counter Badge)
    if (activeRoute === 'inbox') {
      return (
        <div className="flex flex-col gap-4">
          <Grid>
            <AlertBannerCard
              tone={unreadCount > 0 ? 'peach' : 'mint'}
              title={
                unreadCount > 0
                  ? `你有 ${unreadCount} 条未读消息待确认`
                  : '太棒了！全部消息均已处理完毕'
              }
              description="点击下方任意未读通知标为已读，观察左侧边栏「消息收件箱」的珊瑚红数字角标实时递减。"
              actionLabel={unreadCount > 0 ? '全部已读' : '恢复演示未读'}
              onAction={() => {
                if (unreadCount > 0) {
                  handleMarkAllRead()
                } else {
                  setInbox(INITIAL_INBOX)
                  toast({ title: '已重置 4 条未读消息', status: 'info' })
                }
              }}
            />
            <StatusCard
              tone="mint"
              label="自动告警路由"
              statusText="正常"
              description={dndMode ? '当前处于免打扰静音态' : '飞书 / Webhook 实时送达'}
            />
            <MetricCard
              tone="periwinkle"
              label="平均响应耗时"
              value="4.2"
              unit="分钟"
            />
            <DataTable
              title="收件箱通知列表"
              description="支持搜索、未读筛选、展开正文详情与多选批量已读（与侧边栏未读角标实时联动）"
              data={inbox}
              columns={inboxColumns}
              getRowId={(r) => r.id}
              density={compactDensity ? 'compact' : 'comfortable'}
              searchPlaceholder="搜索主题、发送人或分类…"
              enableRowSelection
              enableColumnVisibility
              defaultPageSize={5}
              facetFilter={{
                columnId: 'readState',
                ariaLabel: '收件箱筛选',
                options: [
                  { value: 'unread', label: '未读', badge: unreadCount },
                  { value: 'read', label: '已读' },
                ],
              }}
              onRowClick={(item) => {
                if (item.unread) handleMarkRead(item.id)
              }}
              renderSubComponent={(row) => (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="m-0 text-[13px] leading-relaxed text-[#5B6170]">
                    <strong className="text-[#1B1F27]">消息详情：</strong>
                    {row.original.preview}
                  </p>
                  {row.original.unread && (
                    <Button
                      size="sm"
                      variant="soft"
                      hue="periwinkle"
                      onClick={() => handleMarkRead(row.original.id)}
                    >
                      标为已读
                    </Button>
                  )}
                </div>
              )}
              bulkActions={(rows, clear) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    const idSet = new Set(rows.map((r) => r.id))
                    setInbox((prev) =>
                      prev.map((m) => (idSet.has(m.id) ? { ...m, unread: false } : m)),
                    )
                    clear()
                    toast({ title: `已批量标为已读 (${rows.length} 条)`, status: 'normal' })
                  }}
                >
                  批量标为已读
                </Button>
              )}
            />
          </Grid>
        </div>
      )
    }

    // 2. Analytics Submenu Views (2nd Level)
    if (activeRoute.startsWith('analytics/')) {
      return (
        <Grid>
          <KpiStripCard
            tone="white"
            metrics={[
              { label: '活跃会话数', value: '84,920', delta: '+16.4%', status: 'normal', sub: '较上周期新增 1.2w' },
              { label: '核心转化率', value: '12.8%', delta: '+1.9%', status: 'normal', sub: '试用 → 付费转化' },
              { label: '次月留存 NRR', value: '124.2%', delta: '+3.1%', status: 'info', sub: '企业版增购拉动' },
              { label: '平均停留时长', value: '9m 42s', delta: '+48s', status: 'normal', sub: '工作台粘性提升' },
            ]}
          />
          <InteractiveAnalyticsCard
            tone="white"
            title={currentMeta.title}
            subtitle="支持面积图 / 折线图 / 柱状图实时切换"
            summaries={[
              { label: '窗口期总量', value: rangeData.revenue, delta: rangeData.delta, status: 'normal' },
              { label: '峰值吞吐', value: '48.2k/s', delta: '+8.4%', status: 'info' },
              { label: '异常波动', value: '0 次', delta: '稳定', status: 'normal' },
            ]}
            xKey="period"
            referenceLine={{ y: 120, label: '目标基线' }}
            data={[
              { period: '周一', primary: 96, secondary: 42 },
              { period: '周二', primary: 112, secondary: 51 },
              { period: '周三', primary: 108, secondary: 56 },
              { period: '周四', primary: 132, secondary: 64 },
              { period: '周五', primary: 148, secondary: 72 },
              { period: '周六', primary: 139, secondary: 68 },
              { period: '周日', primary: 162, secondary: 81 },
            ]}
            series={[
              { dataKey: 'primary', label: '核心指标', hue: 'periwinkle', unit: 'k' },
              { dataKey: 'secondary', label: '增购贡献', hue: 'aqua', unit: 'k' },
            ]}
          />
          <FunnelCard
            tone="periwinkle"
            title="核心漏斗转化"
            steps={[
              { label: '官网自然访问', count: '48,200', pct: 100 },
              { label: '创建体验工作区', count: '6,140', pct: 66 },
              { label: '邀请协作成员', count: '2,480', pct: 44 },
              { label: '开通企业订阅', count: '742', pct: 26 },
            ]}
          />
          <LeaderboardCard
            tone="white"
            title="高活跃客户排行"
            entries={[
              { name: '星尘科技', initials: '星', hue: 'periwinkle', score: '98.4', sub: '企业旗舰版 · 300 席' },
              { name: '蔚蓝能源', initials: '蔚', hue: 'sky', score: '94.1', sub: '多活私有集群' },
              { name: '清风医疗', initials: '清', hue: 'mint', score: '91.6', sub: '企业版 · 180 席' },
              { name: '极光物流', initials: '极', hue: 'peach', score: '87.9', sub: '成长专业版' },
            ]}
          />
          <DualSeriesTrendCard
            tone="white"
            label="新增用户 vs 活跃回访"
            seriesA={{ name: '新增注册', color: '#7B80EA', data: [42, 48, 55, 52, 68, 76], current: '760' }}
            seriesB={{ name: '活跃回访', color: '#2FA79B', data: [64, 68, 72, 75, 81, 88], current: '88%' }}
          />
        </Grid>
      )
    }

    // 3. Project Space View (Hover '···' & Right-Click ContextMenu)
    if (activeRoute.startsWith('project:')) {
      const pid = activeRoute.replace('project:', '')
      const proj = projects.find((p) => p.id === pid) ?? projects[0]
      return (
        <Grid>
          <StatusCard
            tone={proj.hue}
            label="项目交付状态"
            statusText={proj.pinned ? '重点置顶' : '正常推进'}
            description={`默认分支 ${proj.branch} · ${proj.openIssues} 项待办`}
          />
          <CodeDeployCard
            tone="white"
            repo={proj.id}
            branch={proj.branch}
            commit="f4b82e1"
            duration="36s"
            status="normal"
            statusLabel="预览已就绪"
          />
          <MembersCard
            tone="white"
            label="项目核心成员"
            countLabel="6 人协作"
            members={[
              { label: '林', hue: 'sky' },
              { label: '周', hue: 'lilac' },
              { label: '陈', hue: 'peach' },
              { label: '陆', hue: 'mint' },
            ]}
            description="支持侧边栏右键菜单置顶或归档"
          />
          <KanbanMiniCard
            tone="white"
            title={`${proj.name} · 迭代看板`}
            columns={[
              {
                name: '进行中',
                hue: proj.hue,
                cards: [
                  { title: '侧边栏多级菜单键盘焦点测试', tag: 'A11y', owner: '林一' },
                  { title: '顶部栏全局命令面板联动', tag: 'UX', owner: '周舟' },
                ],
              },
              {
                name: '待发版',
                hue: 'mint',
                cards: [
                  { title: '紧凑密度模式 Token 对齐', tag: '设计', owner: '周舟' },
                  { title: '移动端左抽屉手势关闭', tag: '交互', owner: '陈晨' },
                ],
              },
            ]}
          />
          <ChecklistCard
            tone="white"
            title="发版验收项"
            items={[
              { id: 'pc1', label: 'TypeScript 零错误编译', checked: true, tag: 'CI', hue: 'mint' },
              { id: 'pc2', label: '图标收起态浮层对齐复核', checked: true, tag: 'UI', hue: 'sky' },
              { id: 'pc3', label: '右键菜单与置顶状态同步', checked: false, tag: '交互', hue: 'periwinkle' },
            ]}
          />
        </Grid>
      )
    }

    // 4. Platform 3rd-Level Admin Views
    if (activeRoute.startsWith('platform/')) {
      return (
        <Grid>
          <QuotaCard
            tone="periwinkle"
            label="月度 API 调用额度"
            used={760000}
            total={1000000}
            unit="次"
            resetNote="距下月重置还有 3 天"
          />
          <StatusCard
            tone="mint"
            label="安全策略基线"
            statusText="合规"
            description="已启用 MFA 与操作审计归档"
          />
          <MembersCard
            tone="white"
            label="已授权管理员"
            countLabel={`${activeWorkspace.members} 名成员`}
            members={[
              { label: '林', hue: 'sky' },
              { label: '陆', hue: 'mint' },
              { label: '周', hue: 'lilac' },
              { label: '沈', hue: 'aqua' },
            ]}
            description="RBAC 细粒度权限"
          />
          <ResourceAllocationCard
            tone="white"
            title="组织算力与席位配额分摊"
            teams={[
              { name: '研发工程', share: 42, hue: 'periwinkle', members: ['林', '陈'], quota: '20 席位' },
              { name: '产品设计', share: 24, hue: 'lilac', members: ['周'], quota: '12 席位' },
              { name: '云运维 SRE', share: 20, hue: 'aqua', members: ['陆', '沈'], quota: '10 席位' },
              { name: '增长运营', share: 14, hue: 'peach', members: ['吴'], quota: '6 席位' },
            ]}
          />
          {activeRoute === 'platform/access/api-keys' ? (
            <DataTable
              title="API 密钥管理"
              description="基于 TanStack Table v9 · 支持调用量排序、多选批量吊销、单行轮换与 IP 白名单展开查看"
              data={apiKeys}
              columns={apiKeyColumns}
              getRowId={(r) => r.id}
              density={compactDensity ? 'compact' : 'comfortable'}
              searchPlaceholder="搜索密钥名、前缀或作用域…"
              enableRowSelection
              enableColumnVisibility
              initialSorting={[{ id: 'calls30d', desc: true }]}
              defaultPageSize={5}
              facetFilter={{
                columnId: 'statusKey',
                ariaLabel: '密钥状态筛选',
                options: [
                  { value: 'active', label: '活跃' },
                  { value: 'expiring', label: '即将到期' },
                  { value: 'revoked', label: '已吊销' },
                ],
              }}
              toolbarActions={
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    const rand = Math.random().toString(16).slice(2, 6)
                    const created: ApiKeyRecord = {
                      id: `key-${Date.now()}`,
                      name: `custom-service-${rand}`,
                      prefix: `glz_live_${rand}••••`,
                      env: 'Production',
                      envHue: 'mint',
                      scope: 'read:metrics',
                      calls30d: 0,
                      statusKey: 'active',
                      statusLabel: '活跃',
                      status: 'normal',
                      expiresAt: '2027-11-28',
                      owner: '林一',
                      lastUsed: '刚刚创建',
                      ipAllowlist: '10.24.0.0/16',
                    }
                    setApiKeys((prev) => [created, ...prev])
                    toast({ title: `已签发新密钥「${created.name}」`, status: 'normal' })
                  }}
                >
                  <Plus size={14} weight="bold" />
                  生成新密钥
                </Button>
              }
              renderSubComponent={(row) => (
                <div className="grid grid-cols-1 gap-3 text-[12.5px] sm:grid-cols-3">
                  <div>
                    <span className="text-[#8A90A0]">创建人：</span>
                    <strong className="text-[#1B1F27]">{row.original.owner}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A90A0]">最近调用：</span>
                    <strong className="text-[#1B1F27]">{row.original.lastUsed}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A90A0]">IP 白名单：</span>
                    <code className="font-glaze-mono text-[#123A5C]">{row.original.ipAllowlist}</code>
                  </div>
                </div>
              )}
              bulkActions={(rows, clear) => (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    handleRevokeApiKeys(rows.map((r) => r.id))
                    clear()
                  }}
                >
                  批量吊销 ({rows.length})
                </Button>
              )}
            />
          ) : (
            <DataTable
              title={`${currentMeta.title} · 实时清单`}
              description="支持关键字检索、列排序、列显隐配置与多选批量处理"
              data={deliveries}
              columns={deliveryColumns}
              getRowId={(r) => r.id}
              density={compactDensity ? 'compact' : 'comfortable'}
              searchPlaceholder="搜索事项、编号或负责人…"
              enableRowSelection
              enableColumnVisibility
              defaultPageSize={5}
              facetFilter={{
                columnId: 'stateKey',
                ariaLabel: '状态筛选',
                options: [
                  { value: 'doing', label: '进行中' },
                  { value: 'done', label: '已完成' },
                  { value: 'risk', label: '需关注' },
                ],
              }}
              renderSubComponent={(row) => (
                <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
                  <p className="m-0 text-[#5B6170]">
                    <strong className="text-[#1B1F27]">交付说明：</strong>
                    {row.original.summary}
                  </p>
                  <span className="font-glaze-mono text-[12px] text-[#6B7280]">
                    目标交付日：{row.original.targetDate}
                  </span>
                </div>
              )}
              bulkActions={(rows, clear) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    handleMarkDeliveriesDone(rows.map((r) => r.id))
                    clear()
                  }}
                >
                  批量标为完成
                </Button>
              )}
            />
          )}
        </Grid>
      )
    }

    // 5. Default Overview / Live Monitor / AI / Tag Views
    return (
      <Grid className={compactDensity ? 'gap-3!' : undefined}>
        <HeroMetricCard
          tone="sky-dark"
          label={`${activeWorkspace.name} · 窗口期累计营收`}
          value={rangeData.revenue}
          delta={rangeData.delta}
          points={rangeData.points}
          subMetrics={[
            { label: '活跃成员', value: `${activeWorkspace.members} 人` },
            { label: 'SLA 达成', value: '99.98%' },
            { label: '待处理通知', value: `${unreadCount} 条` },
          ]}
        />

        <StatusCard
          tone="mint"
          label="核心服务集群"
          statusText="运行正常"
          description="142 / 142 Pods 在线 · P99 18ms"
          onClick={() => navigate('live-monitor')}
        />

        <MetricCard
          tone="peach"
          label="边缘网关请求"
          value={rangeData.requests}
          unit="M"
          onClick={() => navigate('analytics/traffic')}
        />

        <AreaTrendCard
          tone="white"
          title="实时吞吐趋势"
          summary={rangeData.trendSummary}
          points={rangeData.trendPoints}
          axisLabels={rangeData.axisLabels}
          accentColor="#7B80EA"
        />

        <InteractiveAnalyticsCard
          tone="white"
          title="多维度增长与资源消耗"
          subtitle="点击上方时间分段或切换图表类型，体验完整 App Shell 联动"
          summaries={[
            { label: '本季净增 ARR', value: '¥428万', delta: '+24.6%', status: 'normal' },
            { label: '未读收件箱', value: `${unreadCount} 条`, delta: dndMode ? '免打扰' : '实时提醒', status: dndMode ? 'disabled' : 'info' },
            { label: '活跃告警数', value: rangeData.alerts, delta: '低风险', status: 'normal' },
          ]}
          xKey="month"
          referenceLine={{ y: 140, label: '季度基线' }}
          data={[
            { month: '7月', newArr: 112, expansion: 44 },
            { month: '8月', newArr: 124, expansion: 51 },
            { month: '9月', newArr: 118, expansion: 56 },
            { month: '10月', newArr: 138, expansion: 64 },
            { month: '11月', newArr: 152, expansion: 72 },
            { month: '12月', newArr: 168, expansion: 84 },
          ]}
          series={[
            { dataKey: 'newArr', label: '新签营收', hue: 'periwinkle', unit: '万' },
            { dataKey: 'expansion', label: '客户增购', hue: 'aqua', unit: '万' },
          ]}
        />

        <ChecklistCard
          tone="white"
          title="导航壳层体验清单"
          items={[
            { id: 'g1', label: '点击顶部切换工作区与过滤菜单', checked: true, tag: 'Menu', hue: 'periwinkle' },
            { id: 'g2', label: '展开「平台管理」体验 3 级嵌套树', checked: true, tag: 'Tree', hue: 'sky' },
            { id: 'g3', label: '悬停或右键项目空间进行置顶/归档', checked: false, tag: 'Context', hue: 'rose' },
            { id: 'g4', label: '点击侧栏收起按钮切换迷你图标栏', checked: false, tag: 'Rail', hue: 'aqua' },
            { id: 'g5', label: '按 ⌘K 打开顶部栏全局命令面板', checked: false, tag: '⌘K', hue: 'peach' },
          ]}
        />

        <EventTimelineCard
          tone="white"
          title="系统操作动态"
          events={[
            { time: '5 分钟前', text: '华东可用区 A 弹性扩容完成', status: 'normal' },
            { time: '24 分钟前', text: '周舟 更新了导航壳层交互标注', status: 'info' },
            { time: '1 小时前', text: '星尘科技 完成 300 席企业续约', status: 'normal' },
            { time: '3 小时前', text: '安全中心触发密钥到期预警', status: 'warning' },
          ]}
        />

        <AlertBannerCard
          tone="lilac"
          title="侧边栏已内置 15 种常见菜单类型"
          description="包含工作区切换、菜单搜索过滤、2/3 级树形折叠、状态点、动态数字角标、标签徽标、行内 Switch、右键菜单、锁定态与图标收起浮层。"
          actionLabel="查看完整清单"
          onAction={() => setGuideOpen(true)}
        />

        <DataTable
          title="跨团队重点交付追踪"
          description="由 TanStack Table v9 驱动 · 支持列排序、搜索过滤、多选批量完成、行展开详情、列显隐与分页（密度联动左侧「紧凑密度」开关）"
          data={deliveries}
          columns={deliveryColumns}
          getRowId={(r) => r.id}
          density={compactDensity ? 'compact' : undefined}
          enableDensityToggle={!compactDensity}
          searchPlaceholder="搜索交付名称、编号或负责人…"
          enableRowSelection
          enableColumnVisibility
          defaultPageSize={5}
          pageSizeOptions={[5, 8, 15]}
          facetFilter={{
            columnId: 'stateKey',
            ariaLabel: '交付状态筛选',
            options: [
              { value: 'doing', label: '进行中' },
              { value: 'done', label: '已完成' },
              { value: 'risk', label: '需关注' },
            ],
          }}
          toolbarActions={
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                toast({
                  title: '交付明细已导出',
                  description: `共导出 ${deliveries.length} 条记录至 deliveries.csv`,
                  status: 'normal',
                })
              }
            >
              <Export size={14} weight="bold" />
              导出 CSV
            </Button>
          }
          renderSubComponent={(row) => (
            <div className="flex flex-wrap items-center justify-between gap-4 text-[13px]">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-bold text-[#1B1F27]">
                  里程碑备注 · {row.original.pr}
                </span>
                <p className="m-0 leading-relaxed text-[#5B6170]">{row.original.summary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <HueTag hue={row.original.groupHue} size="sm">
                  目标日 {row.original.targetDate}
                </HueTag>
                {row.original.stateKey !== 'done' && (
                  <Button
                    size="sm"
                    variant="soft"
                    hue="mint"
                    onClick={() => handleMarkDeliveriesDone([row.original.id])}
                  >
                    标记已完成
                  </Button>
                )}
              </div>
            </div>
          )}
          bulkActions={(rows, clear) => (
            <>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  handleMarkDeliveriesDone(rows.map((r) => r.id))
                  clear()
                }}
              >
                批量标为完成
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  toast({
                    title: `已导出选中 ${rows.length} 条记录`,
                    status: 'info',
                  })
                  clear()
                }}
              >
                导出选中
              </Button>
            </>
          )}
        />
      </Grid>
    )
  }

  return (
    <>
      {sidebarElement}

      {/* Right Main Column: Sticky Top Bar + Reactive Bento Canvas */}
      <SidebarInset>
        {/* Top Bar (Floating White Bar on #F2F4F8 Canvas) */}
        <header className="sticky top-3 z-30 flex flex-wrap items-center justify-between gap-3 rounded-[22px] bg-white px-3.5 py-2.5 sm:top-4 sm:px-4">
          {/* Left: Sidebar Trigger (Desktop Collapse + Mobile Drawer) + Dynamic Breadcrumbs */}
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger />

            {/* Dynamic Breadcrumbs */}
              <nav aria-label="面包屑导航" className="flex min-w-0 items-center gap-1.5 text-[13px]">
                <button
                  type="button"
                  onClick={() => navigate('overview')}
                  className="hidden cursor-pointer truncate font-medium text-[#8A90A0] hover:text-[#1B1F27] sm:inline"
                >
                  {activeWorkspace.name}
                </button>
                <CaretRight size={12} weight="bold" className="hidden shrink-0 text-[#CDD3DD] sm:inline" />
                <span className="hidden truncate font-medium text-[#6B7280] md:inline">
                  {currentMeta.section}
                </span>
                {currentMeta.parent && currentMeta.parent !== currentMeta.section && (
                  <>
                    <CaretRight size={12} weight="bold" className="hidden shrink-0 text-[#CDD3DD] md:inline" />
                    <span className="hidden truncate font-medium text-[#6B7280] xl:inline">
                      {currentMeta.parent}
                    </span>
                  </>
                )}
                <CaretRight size={12} weight="bold" className="hidden shrink-0 text-[#CDD3DD] md:inline" />
                <span className="truncate font-glaze-display font-extrabold text-[#123A5C]">
                  {currentMeta.title}
                </span>
              </nav>

              {dndMode && (
                <HueTag hue="periwinkle" size="xs" className="hidden sm:inline-flex">
                  <BellSlash size={11} weight="fill" />
                  免打扰
                </HueTag>
              )}
            </div>

            {/* Right: Search Pill + Time Range + Quick Create + Guide + Notifications + Profile */}
            <div className="flex items-center gap-2">
              {/* Global Command Search Trigger */}
              <button
                type="button"
                onClick={() => setCmdOpen(true)}
                className="inline-flex h-9.5 cursor-pointer items-center gap-2 rounded-full bg-[#F6F7F9] px-3.5 text-[13px] text-[#6B7280] transition-colors hover:bg-[#EEF0F3] hover:text-[#1B1F27] outline-none focus-visible:ring-2 focus-visible:ring-[#7B80EA]"
              >
                <MagnifyingGlass size={15} weight="bold" className="text-[#8A90A0]" />
                <span className="hidden md:inline">搜索页面或命令…</span>
                <span className="hidden rounded-full bg-white px-2 py-0.5 font-glaze-mono text-[10px] font-bold text-[#8A90A0] sm:inline">
                  ⌘K
                </span>
              </button>

              {/* Time Range Segmented Control */}
              <div className="hidden xl:block">
                <SegmentedControl
                  size="sm"
                  ariaLabel="统计时间窗口"
                  value={timeRange}
                  onValueChange={setTimeRange}
                  options={[
                    { value: 'today', label: '今日' },
                    { value: '7d', label: '7天' },
                    { value: '30d', label: '30天' },
                  ]}
                />
              </div>

              {/* 15 Menu Types Guide Drawer Trigger */}
              <Tooltip content="侧边栏 15 种菜单类型导览" side="bottom">
                <Button
                  variant="soft"
                  hue="periwinkle"
                  size="sm"
                  onClick={() => setGuideOpen(true)}
                  className="hidden sm:inline-flex"
                >
                  <Compass size={14} weight="bold" />
                  <span>菜单清单</span>
                </Button>
              </Tooltip>

              {/* Quick Create Dropdown Menu */}
              <Menu
                align="end"
                items={[
                  {
                    id: 'qc-project',
                    label: '新建项目空间',
                    icon: <FolderSimple size={15} />,
                    shortcut: 'N',
                    onSelect: () => setNewProjectOpen(true),
                  },
                  {
                    id: 'qc-invite',
                    label: '邀请团队成员',
                    icon: <UserPlus size={15} />,
                    onSelect: () => {
                      navigate('platform/access/roles')
                      toast({ title: '已进入成员与角色管理', status: 'info' })
                    },
                  },
                  {
                    id: 'qc-report',
                    label: '导出当前报表',
                    icon: <Export size={15} />,
                    separatorBefore: true,
                    onSelect: () =>
                      toast({
                        title: '报表导出任务已创建',
                        description: `${currentMeta.title} (${timeRange}).pdf`,
                        status: 'normal',
                      }),
                  },
                ]}
                trigger={
                  <Button variant="primary" size="sm">
                    <Plus size={14} weight="bold" />
                    <span className="hidden sm:inline">新建</span>
                  </Button>
                }
              />

              {/* Notification Center Popover */}
              <Popover
                align="end"
                side="bottom"
                title="通知中心"
                description={
                  dndMode
                    ? '免打扰模式已开启 · 非紧急消息已静音'
                    : unreadCount > 0
                      ? `还有 ${unreadCount} 条未读消息`
                      : '所有通知均已阅读'
                }
                className="w-84 p-4"
                trigger={
                  <button
                    type="button"
                    aria-label="打开通知中心"
                    className="relative inline-flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-full bg-[#F6F7F9] text-[#5B6170] transition-colors hover:bg-[#EEF0F3] hover:text-[#1B1F27] data-popup-open:bg-[#EEF0F3]"
                  >
                    {dndMode ? <BellSlash size={17} weight="duotone" /> : <Bell size={17} weight="duotone" />}
                    {unreadCount > 0 && !dndMode && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#E5603B]" />
                    )}
                  </button>
                }
              >
                <div className="flex flex-col gap-2">
                  {inbox.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        handleMarkRead(item.id)
                        navigate('inbox')
                      }}
                      className={cn(
                        'flex cursor-pointer flex-col gap-0.5 rounded-[14px] p-2.5 text-left transition-colors hover:bg-[#F6F7F9]',
                        item.unread && 'bg-[#F3F4FE]/60',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[12.5px] font-bold text-[#1B1F27]">
                          {item.title}
                        </span>
                        {item.unread && <StatusDot status="info" size={6} />}
                      </div>
                      <span className="text-[11px] text-[#8A90A0]">
                        {item.sender} · {item.time}
                      </span>
                    </button>
                  ))}
                  <div className="mt-1 flex items-center justify-between border-t border-[#F2F3F5] pt-2.5">
                    <button
                      type="button"
                      onClick={() => navigate('inbox')}
                      className="cursor-pointer text-[12px] font-semibold text-[#4A4FB8] hover:underline"
                    >
                      进入收件箱 →
                    </button>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="cursor-pointer text-[12px] font-semibold text-[#6B7280] hover:text-[#1B1F27]"
                      >
                        全部已读
                      </button>
                    )}
                  </div>
                </div>
              </Popover>

              {/* Topbar User Avatar Menu */}
              <Menu
                align="end"
                items={userMenuItems}
                trigger={
                  <button
                    type="button"
                    aria-label="用户菜单"
                    className="relative inline-flex cursor-pointer items-center rounded-full p-0.5 transition-opacity hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-[#7B80EA]"
                  >
                    <Avatar fallback="林" hue="sky" size="sm" />
                    <span className="absolute right-0 bottom-0 rounded-full bg-white p-0.5">
                      <StatusDot status={PRESENCE_META[presence].status} size={6} />
                    </span>
                  </button>
                }
              />
            </div>
          </header>

          {/* Main Dashboard View Header & Bento Content */}
          <main className="flex flex-1 flex-col gap-6 px-1 pt-2 pb-10">
            <div className="flex flex-wrap items-end justify-between gap-4 px-1">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
                    DEMO 07 · ADMIN SHELL · 侧边栏与顶部栏控制台
                  </span>
                  <StatusPill
                    status={dndMode ? 'warning' : 'normal'}
                    label={dndMode ? '静音免打扰' : '全部系统正常'}
                  />
                </div>
                <h1 className="m-0 font-glaze-display text-[32px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C] sm:text-[36px]">
                  {currentMeta.title}
                </h1>
                <p className="m-0 text-[14.5px] text-[#5B6170]">{currentMeta.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="xl:hidden">
                  <SegmentedControl
                    size="sm"
                    ariaLabel="时间窗口"
                    value={timeRange}
                    onValueChange={setTimeRange}
                    options={[
                      { value: 'today', label: '今日' },
                      { value: '7d', label: '7天' },
                      { value: '30d', label: '30天' },
                    ]}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleSidebar}
                  className="hidden lg:inline-flex"
                >
                  <SidebarSimple size={14} weight="bold" />
                  <span>{isCollapsed ? '展开完整侧栏' : '切换迷你图标栏'}</span>
                </Button>
                <Button
                  variant="soft"
                  hue="sky"
                  size="sm"
                  onClick={() => setGuideOpen(true)}
                  className="sm:hidden"
                >
                  <Compass size={14} weight="bold" />
                  <span>15 种菜单</span>
                </Button>
              </div>
            </div>

            {renderMainContent()}
          </main>
        </SidebarInset>

      {/* Command Palette Dialog (⌘K) — powered by Glaze Command (cmdk) */}
      <CommandDialog
        open={cmdOpen}
        onOpenChange={(open) => {
          setCmdOpen(open)
          if (!open) setCmdQuery('')
        }}
        title="全局命令面板"
        description="快速跳转侧边栏任意路由、项目空间或标签视图（快捷键 ⌘K）"
        maxWidth="540px"
      >
        <CommandInput
          autoFocus
          value={cmdQuery}
          onValueChange={setCmdQuery}
          placeholder="输入菜单名、项目名或功能关键字..."
        />
        <CommandList className="max-h-72">
          <CommandEmpty>未找到与 “{cmdQuery}” 匹配的项目</CommandEmpty>

          <CommandGroup heading="导航路由">
            {commandRouteEntries.map((entry) => (
              <CommandItem
                key={entry.id}
                value={`${entry.label} ${entry.group}`}
                keywords={[entry.id, entry.group]}
                onSelect={() => {
                  entry.action()
                  setCmdOpen(false)
                  setCmdQuery('')
                }}
                className="justify-between gap-3"
              >
                <span className="text-[13.5px] font-bold">{entry.label}</span>
                <span className="rounded-full bg-[#F2F3F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#6B7280]">
                  {entry.group}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="项目空间">
            {commandProjectEntries.map((entry) => (
              <CommandItem
                key={entry.id}
                value={entry.label}
                keywords={['项目', '空间', entry.group]}
                onSelect={() => {
                  entry.action()
                  setCmdOpen(false)
                  setCmdQuery('')
                }}
                className="justify-between gap-3"
              >
                <span className="text-[13.5px] font-bold">{entry.label}</span>
                <span className="rounded-full bg-[#F2F3F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#6B7280]">
                  {entry.group}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="标签视图">
            {commandTagEntries.map((entry) => (
              <CommandItem
                key={entry.id}
                value={entry.label}
                keywords={['标签', '视图', entry.group]}
                onSelect={() => {
                  entry.action()
                  setCmdOpen(false)
                  setCmdQuery('')
                }}
                className="justify-between gap-3"
              >
                <span className="text-[13.5px] font-bold">{entry.label}</span>
                <span className="rounded-full bg-[#F2F3F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#6B7280]">
                  {entry.group}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <CommandFooter>
          <span>↑↓ 选择 · Enter 跳转 · Esc 关闭</span>
          <span>
            {commandRouteEntries.length + commandProjectEntries.length + commandTagEntries.length} 项命令
          </span>
        </CommandFooter>
      </CommandDialog>

      {/* New Project Dialog (Triggered from Sidebar Section '+' or Topbar '+ 新建') */}
      <Dialog
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
        title="新建项目空间"
        description="创建后立即添加到左侧「项目空间」分组，支持右键与悬停菜单操作"
        footer={
          <>
            <DialogClose render={<Button variant="secondary">取消</Button>} />
            <Button variant="primary" type="submit" form="new-project-form">
              确认创建
            </Button>
          </>
        }
      >
        <form id="new-project-form" onSubmit={handleAddProject} className="flex flex-col gap-4">
          <Field>
            <FieldLabel>项目名称</FieldLabel>
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="例如：数据中台 3.0"
              required
            />
          </Field>
          <Field>
            <FieldLabel>标识色相</FieldLabel>
            <Select
              value={newProjectHue}
              onValueChange={(v) => setNewProjectHue(v as Hue)}
              options={[
                { value: 'sky', label: '天蓝 Sky' },
                { value: 'mint', label: '薄荷 Mint' },
                { value: 'periwinkle', label: '长春花 Periwinkle' },
                { value: 'peach', label: '杏桃 Peach' },
                { value: 'lilac', label: '丁香 Lilac' },
                { value: 'rose', label: '玫瑰 Rose' },
                { value: 'aqua', label: '湖水 Aqua' },
                { value: 'coral', label: '珊瑚 Coral' },
              ]}
            />
          </Field>
        </form>
      </Dialog>

      {/* 15 Sidebar Menu Patterns Guide Drawer */}
      <Drawer
        open={guideOpen}
        onOpenChange={setGuideOpen}
        title="侧边栏 15 种菜单类型导览"
        description="本 Demo 完整覆盖现代企业控制台常见的全部侧边栏交互形态，点击条目可直接跳转体验"
        footer={
          <Button variant="primary" size="sm" onClick={() => setGuideOpen(false)}>
            知道了
          </Button>
        }
      >
        <div className="flex flex-col gap-2.5">
          {SIDEBAR_PATTERN_GUIDE.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.targetRoute) {
                  navigate(item.targetRoute)
                  setGuideOpen(false)
                }
              }}
              className={cn(
                'flex items-start justify-between gap-3 rounded-inner bg-[#F6F7F9] p-3.5 transition-colors',
                item.targetRoute && 'cursor-pointer hover:bg-[#F3F4FE]',
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <HueTag hue={item.hue} size="xs" className="font-glaze-mono">
                    {item.num}
                  </HueTag>
                  <span className="text-[13.5px] font-bold text-[#1B1F27]">{item.name}</span>
                </div>
                <p className="m-0 text-[12px] leading-relaxed text-[#5B6170]">{item.desc}</p>
              </div>
              {item.targetRoute && (
                <ArrowSquareOut size={15} weight="bold" className="mt-0.5 shrink-0 text-[#4A4FB8]" />
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  )
}
