import * as React from 'react'
import {
  ChartLineUp,
  Code,
  FileText,
  FolderSimple,
  GearSix,
  House,
  Pulse,
  ShieldCheck,
  Terminal,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
  Tray,
} from '@phosphor-icons/react'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'
import { CountBadge } from '@/components/ui/count-badge'
import { DirectionProvider } from '@/components/ui/direction-provider'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuCollapsible,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  type SidebarCollapsible,
  type SidebarVariant,
} from '@/components/ui/sidebar'
import { Slider } from '@/components/ui/slider'
import { StatusPill } from '@/components/ui/status-pill'
import { Switch } from '@/components/ui/switch'
import {
  createGlazeColumnHelper,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tile } from '@/components/ui/tile'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from '@/components/ui/toolbar'
import type { ComponentDemoGroup } from '@/docs/examples/types'

const TABLE_DEMO_HELPER = createGlazeColumnHelper<{
  id: string
  service: string
  region: string
  latency: number
  status: 'normal' | 'warning' | 'info'
  statusLabel: string
  uptime: string
  notes: string
}>()

const TABLE_DEMO_DATA = [
  { id: 's1', service: 'API Gateway Edge', region: '华东 · 上海', latency: 18, status: 'normal' as const, statusLabel: '运行中', uptime: '99.99%', notes: 'HTTP/3 QUIC 已开启，42 个边缘接入点全部健康。' },
  { id: 's2', service: 'Auth & SSO Core', region: '多活集群', latency: 24, status: 'normal' as const, statusLabel: '运行中', uptime: '100.0%', notes: 'SAML 2.0 与 OIDC 会话平均签发耗时 11ms。' },
  { id: 's3', service: 'Billing Reconciler', region: '华北 · 北京', latency: 86, status: 'warning' as const, statusLabel: '高负载', uptime: '99.82%', notes: '月末出账批处理队列峰值，已触发自动扩容。' },
  { id: 's4', service: 'Realtime Telemetry', region: '新加坡', latency: 31, status: 'info' as const, statusLabel: '灰度中', uptime: '99.95%', notes: 'v4.12 压缩管道正在 20% 流量金丝雀验证。' },
  { id: 's5', service: 'Search Indexer', region: '华南 · 深圳', latency: 42, status: 'normal' as const, statusLabel: '运行中', uptime: '99.94%', notes: '增量索引延迟 < 800ms，缓存命中率 94.6%。' },
  { id: 's6', service: 'AI Insight Worker', region: '华东 · 上海', latency: 64, status: 'info' as const, statusLabel: '灰度中', uptime: '99.91%', notes: '8 × H100 推理池批处理吞吐稳定。' },
]

const TABLE_DEMO_COLUMNS = TABLE_DEMO_HELPER.columns([
  TABLE_DEMO_HELPER.accessor('service', {
    header: '服务名称',
    meta: { label: '服务名称' },
    cell: (info) => <span className="font-bold text-[#1B1F27]">{info.getValue()}</span>,
  }),
  TABLE_DEMO_HELPER.accessor('region', {
    header: '区域',
    meta: { label: '区域' },
    cell: (info) => <HueTag hue="sky" size="sm">{info.getValue()}</HueTag>,
  }),
  TABLE_DEMO_HELPER.accessor('latency', {
    header: 'P99 延迟',
    meta: { label: 'P99 延迟', numeric: true },
    cell: (info) => <span>{info.getValue()} ms</span>,
  }),
  TABLE_DEMO_HELPER.accessor('status', {
    header: '状态',
    meta: { label: '状态' },
    cell: ({ row }) => <StatusPill status={row.original.status}>{row.original.statusLabel}</StatusPill>,
  }),
  TABLE_DEMO_HELPER.accessor('uptime', {
    header: '可用率',
    meta: { label: '可用率', numeric: true },
  }),
])

function DataTableShowcaseDemo() {
  return (
    <div className="w-full">
      <DataTable
        embedded
        data={TABLE_DEMO_DATA}
        columns={TABLE_DEMO_COLUMNS}
        getRowId={(r) => r.id}
        searchPlaceholder="搜索服务或区域…"
        enableRowSelection
        enableColumnVisibility
        enableDensityToggle
        defaultPageSize={4}
        pageSizeOptions={[4, 6]}
        facetFilter={{
          columnId: 'status',
          options: [
            { value: 'normal', label: '运行中' },
            { value: 'info', label: '灰度中' },
            { value: 'warning', label: '高负载' },
          ],
        }}
        renderSubComponent={(row) => (
          <div className="text-[12.5px] leading-relaxed text-[#5B6170]">
            <strong className="text-[#1B1F27]">运行备注：</strong>
            {row.original.notes}
          </div>
        )}
        bulkActions={(rows, clear) => (
          <Button size="sm" variant="primary" onClick={clear}>
            巡检已选 {rows.length} 项
          </Button>
        )}
      />
    </div>
  )
}

function SidebarHeroDemo() {
  const [active, setActive] = React.useState('overview')
  const [analyticsOpen, setAnalyticsOpen] = React.useState(true)

  return (
    <div className="h-112 w-full">
      <SidebarProvider contained sidebarWidth="236px" sidebarWidthIcon="68px">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2.5 rounded-[16px] bg-[#F6F7F9] px-2.5 py-2">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E4E6FD] font-glaze-display text-[12px] font-extrabold text-[#4A4FB8]">
                GC
              </span>
              <div className="min-w-0 flex-1 overflow-hidden group-data-[state=collapsed]/sidebar:hidden">
                <div className="truncate font-glaze-display text-[13px] font-extrabold text-[#1B1F27]">
                  Glaze Cloud
                </div>
                <div className="truncate text-[11px] text-[#6B7280]">企业工作区</div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>工作台</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={active === 'overview'}
                      icon={<House size={16} weight={active === 'overview' ? 'fill' : 'duotone'} />}
                      onClick={() => setActive('overview')}
                    >
                      总览驾驶舱
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={active === 'inbox'}
                      icon={<Tray size={16} weight={active === 'inbox' ? 'fill' : 'duotone'} />}
                      trailing={<CountBadge count={4} hue="coral" />}
                      onClick={() => setActive('inbox')}
                    >
                      消息收件箱
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuCollapsible
                      icon={<ChartLineUp size={16} weight="duotone" />}
                      label="数据中心"
                      open={analyticsOpen}
                      onOpenChange={setAnalyticsOpen}
                      hasActiveChild={active.startsWith('analytics/')}
                      flyoutContent={
                        <>
                          <SidebarMenuButton
                            forceExpanded
                            size="sm"
                            isActive={active === 'analytics/traffic'}
                            onClick={() => setActive('analytics/traffic')}
                          >
                            实时流量
                          </SidebarMenuButton>
                          <SidebarMenuButton
                            forceExpanded
                            size="sm"
                            isActive={active === 'analytics/funnel'}
                            onClick={() => setActive('analytics/funnel')}
                          >
                            转化漏斗
                          </SidebarMenuButton>
                        </>
                      }
                    >
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          isActive={active === 'analytics/traffic'}
                          onClick={() => setActive('analytics/traffic')}
                        >
                          实时流量
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          isActive={active === 'analytics/funnel'}
                          onClick={() => setActive('analytics/funnel')}
                        >
                          转化漏斗
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-2.5 px-1.5 py-1">
              <Avatar fallback="林" hue="sky" size="sm" />
              <div className="min-w-0 flex-1 overflow-hidden group-data-[state=collapsed]/sidebar:hidden">
                <div className="truncate text-[12.5px] font-bold text-[#1B1F27]">林一</div>
                <div className="truncate text-[11px] text-[#6B7280]">管理员</div>
              </div>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between gap-2 rounded-[18px] bg-white px-3.5 py-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-glaze-display text-[14px] font-extrabold text-[#123A5C]">
                当前路由：{active}
              </span>
            </div>
            <HueTag hue="periwinkle" size="xs">点击图标栏可收起/展开</HueTag>
          </header>
          <div className="flex flex-1 flex-col justify-center rounded-tile bg-white p-6">
            <span className="font-glaze-display text-[18px] font-extrabold text-[#1B1F27]">
              主内容画布 (SidebarInset)
            </span>
            <p className="m-0 mt-1.5 text-[13px] text-[#5B6170]">
              支持点击顶部触发按钮或侧边边缘轨道一键切换为迷你图标栏，收起态点击「数据中心」自动弹出右侧浮层菜单。
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

function SidebarVariantsDemo() {
  const [variant, setVariant] = React.useState<SidebarVariant>('floating')
  const [collapsible, setCollapsible] = React.useState<SidebarCollapsible>('icon')
  const [active, setActive] = React.useState('projects')

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SegmentedControl
          size="sm"
          value={variant}
          onValueChange={setVariant}
          options={[
            { value: 'floating', label: 'Floating 悬浮釉面' },
            { value: 'sidebar', label: 'Sidebar 贴边栏' },
            { value: 'inset', label: 'Inset 内嵌画布' },
          ]}
        />
        <SegmentedControl
          size="sm"
          value={collapsible}
          onValueChange={setCollapsible}
          options={[
            { value: 'icon', label: '图标栏收起' },
            { value: 'offcanvas', label: '完全隐藏' },
          ]}
        />
      </div>

      <div className="h-84 w-full">
        <SidebarProvider contained variant={variant} sidebarWidth="216px" sidebarWidthIcon="68px">
          <Sidebar collapsible={collapsible}>
            <SidebarContent className="pt-3">
              <SidebarGroup>
                <SidebarGroupLabel>导航变体</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={active === 'projects'}
                        icon={<FolderSimple size={16} weight="duotone" />}
                        onClick={() => setActive('projects')}
                      >
                        项目空间
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={active === 'security'}
                        icon={<ShieldCheck size={16} weight="duotone" />}
                        onClick={() => setActive('security')}
                      >
                        访问控制
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={active === 'settings'}
                        icon={<GearSix size={16} weight="duotone" />}
                        onClick={() => setActive('settings')}
                      >
                        系统设置
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className={variant === 'sidebar' ? 'p-3' : undefined}>
            <div className="flex h-full flex-col gap-3 p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="font-glaze-display text-[14px] font-extrabold text-[#123A5C]">
                  variant=&quot;{variant}&quot; · collapsible=&quot;{collapsible}&quot;
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center rounded-inner bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
                点击左上角按钮体验当前变体的展开 / 收起过渡效果
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

function TabsControlledDemo() {
  const [tab, setTab] = React.useState('overview')
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#6B7280]">当前面板：{tab}</span>
        <div className="flex gap-1.5">
          <Button size="sm" variant="secondary" onClick={() => setTab('overview')}>
            回到概览
          </Button>
          <Button size="sm" variant="soft" hue="periwinkle" onClick={() => setTab('logs')}>
            跳转日志
          </Button>
        </div>
      </div>
      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="metrics">指标</TabsTrigger>
          <TabsTrigger value="logs">日志</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
          所有核心服务运行健康，可用率 99.98%。
        </TabsContent>
        <TabsContent value="metrics" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
          过去 1 小时平均 CPU 利用率 38%，P99 响应 24ms。
        </TabsContent>
        <TabsContent value="logs" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
          [00:12:41] edge-gateway 热重载路由表完成（耗时 14ms）。
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AccordionControlledDemo() {
  const allKeys = ['network', 'storage', 'security']
  const [openItems, setOpenItems] = React.useState<string[]>(['network'])
  const allOpen = openItems.length === allKeys.length

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#6B7280]">已展开 {openItems.length} / 3 项</span>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setOpenItems(allOpen ? [] : allKeys)}
        >
          {allOpen ? '全部收起' : '全部展开'}
        </Button>
      </div>
      <Accordion multiple value={openItems} onValueChange={(val) => setOpenItems(val as string[])}>
        <AccordionItem value="network" title="网络与边缘加速" subtitle="Anycast BGP · TLS 1.3">
          全球 42 个边缘接入点自动开启 HTTP/3 QUIC 加速与智能健康探测。
        </AccordionItem>
        <AccordionItem value="storage" title="持久化快照策略" subtitle="每 6 小时增量归档">
          支持异地双活冷备份，任意时间点最快 30 秒内完成卷级恢复。
        </AccordionItem>
        <AccordionItem value="security" title="零信任访问控制" subtitle="mTLS 双向证书校验">
          内部东西向微服务流量默认加密并按最小权限签发短期令牌。
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function ToolbarRichDemo() {
  const [formats, setFormats] = React.useState<string[]>(['bold'])
  const [align, setAlign] = React.useState<string[]>(['left'])
  const [fontSize, setFontSize] = React.useState('14')

  return (
    <div className="flex flex-col items-center gap-3">
      <Toolbar className="flex-wrap">
        <ToggleGroup multiple value={formats} onValueChange={setFormats} className="bg-transparent p-0">
          <Toggle value="bold" size="sm" aria-label="加粗">
            <TextB size={15} weight="bold" />
          </Toggle>
          <Toggle value="italic" size="sm" aria-label="斜体">
            <TextItalic size={15} weight="bold" />
          </Toggle>
          <Toggle value="underline" size="sm" aria-label="下划线">
            <TextUnderline size={15} weight="bold" />
          </Toggle>
        </ToggleGroup>
        <ToolbarSeparator />
        <ToggleGroup value={align} onValueChange={setAlign} className="bg-transparent p-0">
          <Toggle value="left" size="sm" aria-label="左对齐">
            <TextAlignLeft size={15} />
          </Toggle>
          <Toggle value="center" size="sm" aria-label="居中">
            <TextAlignCenter size={15} />
          </Toggle>
          <Toggle value="right" size="sm" aria-label="右对齐">
            <TextAlignRight size={15} />
          </Toggle>
        </ToggleGroup>
        <ToolbarSeparator />
        <div className="w-24">
          <Select
            size="sm"
            surface="white"
            value={fontSize}
            onValueChange={setFontSize}
            options={[
              { value: '12', label: '12 px' },
              { value: '14', label: '14 px' },
              { value: '16', label: '16 px' },
              { value: '20', label: '20 px' },
            ]}
          />
        </div>
      </Toolbar>
      <span className="text-[12px] text-[#6B7280]">
        格式：{formats.join(', ') || '无'} · 对齐：{align[0] ?? 'left'} · 字号：{fontSize}px
      </span>
    </div>
  )
}

function DirectionHeroDemo() {
  const [rtl, setRtl] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
        <Switch checked={rtl} onCheckedChange={setRtl} />
        <span>{rtl ? '当前方向：RTL（右向左）' : '当前方向：LTR（左向右）'}</span>
      </label>
      <DirectionProvider direction={rtl ? 'rtl' : 'ltr'}>
        <div dir={rtl ? 'rtl' : 'ltr'} className="rounded-[18px] bg-[#F6F7F9] p-4">
          <Slider defaultValue={62} label="跟随阅读方向自适应的滑块" unit="%" />
        </div>
      </DirectionProvider>
    </div>
  )
}

function DirectionMultiComponentsDemo() {
  const [rtl, setRtl] = React.useState(true)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold">切换 RTL 镜像预览</span>
        <Button size="sm" variant="soft" hue="periwinkle" onClick={() => setRtl((v) => !v)}>
          切换为 {rtl ? 'LTR' : 'RTL'}
        </Button>
      </div>
      <DirectionProvider direction={rtl ? 'rtl' : 'ltr'}>
        <div dir={rtl ? 'rtl' : 'ltr'} className="flex flex-col gap-4 rounded-[20px] bg-[#F6F7F9] p-5">
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="b">التحليلات</TabsTrigger>
              <TabsTrigger value="c">الإعدادات</TabsTrigger>
            </TabsList>
          </Tabs>
          <Input surface="white" placeholder="ابحث عن المكونات..." />
          <Progress value={74} label="نسبة الإنجاز" showValue hue="aqua" />
        </div>
      </DirectionProvider>
    </div>
  )
}

export const NAVIGATION_DEMOS: Record<string, ComponentDemoGroup> = {
  tabs: {
    hero: {
      render: () => (
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="metrics">指标</TabsTrigger>
            <TabsTrigger value="logs">日志</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
            纯 CSS 200ms 水平滑块指示器，零 JS 动画开销。
          </TabsContent>
          <TabsContent value="metrics" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
            当前 P95 延迟 18ms，吞吐量 42.6k req/s。
          </TabsContent>
          <TabsContent value="logs" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
            最近 1 小时无异常错误日志。
          </TabsContent>
        </Tabs>
      ),
      code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">概览</TabsTrigger>
        <TabsTrigger value="metrics">指标</TabsTrigger>
        <TabsTrigger value="logs">日志</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">概览内容</TabsContent>
      <TabsContent value="metrics">指标内容</TabsContent>
      <TabsContent value="logs">日志内容</TabsContent>
    </Tabs>
  )
}`,
    },
    examples: [
      {
        id: 'icons-and-badges',
        title: '带图标与计数徽标',
        description: '在 TabsTrigger 内自由组合 Phosphor 图标与 CountBadge，滑块指示器自动测量实际宽度。',
        render: () => (
          <Tabs defaultValue="activity" className="w-full max-w-lg">
            <TabsList>
              <TabsTrigger value="activity">
                <Pulse size={15} weight="bold" />
                <span>实时监控</span>
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <ChartLineUp size={15} weight="bold" />
                <span>告警</span>
                <CountBadge count={3} hue="coral" />
              </TabsTrigger>
              <TabsTrigger value="terminal">
                <Terminal size={15} weight="bold" />
                <span>终端</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
              14 个边缘节点在线，平均心跳延迟 11ms。
            </TabsContent>
            <TabsContent value="alerts" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
              3 条未确认告警待处理（NAS 卷水位与证书续期提醒）。
            </TabsContent>
            <TabsContent value="terminal" className="rounded-[18px] bg-[#F6F7F9] p-4 font-glaze-mono text-[12px] text-[#1B1F27]">
              $ glaze status --cluster=prod-shanghai
            </TabsContent>
          </Tabs>
        ),
        code: `import { ChartLineUp, Pulse } from '@phosphor-icons/react'
import { CountBadge } from '@/components/ui/count-badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Example() {
  return (
    <Tabs defaultValue="activity">
      <TabsList>
        <TabsTrigger value="activity">
          <Pulse size={15} weight="bold" />
          <span>实时监控</span>
        </TabsTrigger>
        <TabsTrigger value="alerts">
          <ChartLineUp size={15} weight="bold" />
          <span>告警</span>
          <CountBadge count={3} hue="coral" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="activity">实时监控面板</TabsContent>
      <TabsContent value="alerts">告警面板</TabsContent>
    </Tabs>
  )
}`,
      },
      {
        id: 'controlled',
        title: '受控模式与外部切换',
        description: '通过 value 与 onValueChange 实现编程式切换，常用于向导步骤或快捷跳转。',
        render: () => <TabsControlledDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Example() {
  const [tab, setTab] = React.useState('overview')
  return (
    <div className="flex flex-col gap-3">
      <Button size="sm" onClick={() => setTab('logs')}>跳转到日志</Button>
      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="logs">日志</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">概览面板</TabsContent>
        <TabsContent value="logs">日志面板</TabsContent>
      </Tabs>
    </div>
  )
}`,
      },
      {
        id: 'disabled-tab',
        title: '禁用单个选项',
        description: '为指定 TabsTrigger 传入 disabled，键盘左右方向键会自动跳过禁用项。',
        minHeight: 160,
        render: () => (
          <Tabs defaultValue="code" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="code">
                <Code size={15} weight="bold" />
                <span>源码</span>
              </TabsTrigger>
              <TabsTrigger value="docs">
                <FileText size={15} weight="bold" />
                <span>文档</span>
              </TabsTrigger>
              <TabsTrigger value="billing" disabled className="opacity-45 cursor-not-allowed">
                账单（无权限）
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
              当前角色可查看组件源码与 API 文档。
            </TabsContent>
            <TabsContent value="docs" className="rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
              Markdown 与 llms.txt 同步自动生成。
            </TabsContent>
          </Tabs>
        ),
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Example() {
  return (
    <Tabs defaultValue="code">
      <TabsList>
        <TabsTrigger value="code">源码</TabsTrigger>
        <TabsTrigger value="docs">文档</TabsTrigger>
        <TabsTrigger value="billing" disabled>账单（无权限）</TabsTrigger>
      </TabsList>
      <TabsContent value="code">源码内容</TabsContent>
      <TabsContent value="docs">文档内容</TabsContent>
    </Tabs>
  )
}`,
      },
    ],
  },

  accordion: {
    hero: {
      render: () => (
        <div className="w-full max-w-md">
          <Accordion defaultValue={['a']}>
            <AccordionItem value="a" title="如何通过 shadcn CLI 安装 Glaze？">
              在 components.json 注册 @glaze 命名空间后，执行 npx shadcn@latest add @glaze/style 与任意组件名即可。
            </AccordionItem>
            <AccordionItem value="b" title="为什么使用 Base UI 1.9？">
              Base UI 提供完整无障碍键盘行为与原生 data-starting-style / data-ending-style 纯 CSS 动画钩子。
            </AccordionItem>
            <AccordionItem value="c" title="是否支持按需安装单组件？">
              支持，全部 58 个 UI 与 112 张业务卡片均采用单文件直接导入，CLI 会自动拉取关联依赖。
            </AccordionItem>
          </Accordion>
        </div>
      ),
      code: `import { Accordion, AccordionItem } from '@/components/ui/accordion'

export function Example() {
  return (
    <Accordion defaultValue={['a']}>
      <AccordionItem value="a" title="如何通过 shadcn CLI 安装 Glaze？">
        在 components.json 注册 @glaze 后执行 npx shadcn@latest add 即可。
      </AccordionItem>
      <AccordionItem value="b" title="为什么使用 Base UI 1.9？">
        提供原生无障碍与纯 CSS 高度过渡动画。
      </AccordionItem>
    </Accordion>
  )
}`,
    },
    examples: [
      {
        id: 'multiple-controlled',
        title: '多项同时展开与受控切换（multiple）',
        description: '设置 multiple 允许同时打开多个面板，并结合 value / onValueChange 实现全部展开或一键收起。',
        render: () => <AccordionControlledDemo />,
        code: `import * as React from 'react'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

export function Example() {
  const [openItems, setOpenItems] = React.useState<string[]>(['network'])
  return (
    <div className="flex flex-col gap-3">
      <Button size="sm" variant="secondary" onClick={() => setOpenItems(['network', 'storage'])}>
        全部展开
      </Button>
      <Accordion multiple value={openItems} onValueChange={(v) => setOpenItems(v as string[])}>
        <AccordionItem value="network" title="网络与边缘加速" subtitle="Anycast BGP · TLS 1.3">
          全球 42 个边缘接入点自动开启 HTTP/3 加速。
        </AccordionItem>
        <AccordionItem value="storage" title="持久化快照策略" subtitle="每 6 小时增量归档">
          支持异地双活冷备份与秒级恢复。
        </AccordionItem>
      </Accordion>
    </div>
  )
}`,
      },
      {
        id: 'rich-subtitle',
        title: '副标题与富状态内容',
        description: 'AccordionItem 支持 subtitle 辅助说明，面板内可嵌入状态标签与操作按钮。',
        render: () => (
          <div className="w-full max-w-md">
            <Accordion defaultValue={['node-1']}>
              <AccordionItem
                value="node-1"
                title="华东主集群 · cn-sh-01"
                subtitle="14 节点在线 · 延迟 11ms"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <StatusPill status="normal" label="健康检查通过" size="sm" />
                  <HueTag hue="sky" size="xs">Kubernetes 1.31</HueTag>
                </div>
              </AccordionItem>
              <AccordionItem
                value="node-2"
                title="亚太边缘集群 · ap-sg-02"
                subtitle="6 节点在线 · 磁盘水位 84%"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <StatusPill status="warning" label="建议扩容存储卷" size="sm" />
                  <HueTag hue="peach" size="xs">自动伸缩开启</HueTag>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        ),
        code: `import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { StatusPill } from '@/components/ui/status-pill'

export function Example() {
  return (
    <Accordion defaultValue={['node-1']}>
      <AccordionItem value="node-1" title="华东主集群" subtitle="14 节点在线 · 延迟 11ms">
        <StatusPill status="normal" label="健康检查通过" size="sm" />
      </AccordionItem>
    </Accordion>
  )
}`,
      },
    ],
  },

  collapsible: {
    hero: {
      render: () => (
        <div className="w-full max-w-md">
          <Collapsible
            title="查看高级路由规则"
            badge={<HueTag hue="periwinkle" size="xs">3 条生效规则</HueTag>}
            defaultOpen
          >
            <p className="m-0">
              静态资产 /r/*.json 启用长期缓存，/view/demos/* 独立渲染完整画布。
            </p>
          </Collapsible>
        </div>
      ),
      code: `import { Collapsible } from '@/components/ui/collapsible'
import { HueTag } from '@/components/ui/hue-tag'

export function Example() {
  return (
    <Collapsible title="查看高级路由规则" badge={<HueTag hue="periwinkle" size="xs">3 条规则</HueTag>} defaultOpen>
      <p>可折叠展开的明细区域</p>
    </Collapsible>
  )
}`,
    },
    examples: [
      {
        id: 'stacked-panels',
        title: '多个独立折叠面板',
        description: '与手风琴不同，多个 Collapsible 彼此独立，适合日志详情、环境变量等按需展开区块。',
        render: () => (
          <div className="flex w-full max-w-md flex-col gap-2.5">
            <Collapsible title="环境变量清单" badge={<CountBadge count={4} hue="sky" />}>
              <div className="flex flex-col gap-1 font-glaze-mono text-[12px]">
                <span>REGISTRY_BASE_URL=https://glaze.dev</span>
                <span>NODE_ENV=production</span>
                <span>EDGE_CACHE_TTL=3600</span>
              </div>
            </Collapsible>
            <Collapsible title="构建产物校验和" badge={<StatusPill status="normal" size="sm" label="已验证" />}>
              <p className="m-0 font-glaze-mono text-[12px]">sha256: 9f86d081884c7d659a2feaa0c55ad015</p>
            </Collapsible>
          </div>
        ),
        code: `import { Collapsible } from '@/components/ui/collapsible'
import { CountBadge } from '@/components/ui/count-badge'

export function Example() {
  return (
    <div className="flex flex-col gap-2.5">
      <Collapsible title="环境变量清单" badge={<CountBadge count={4} hue="sky" />}>
        <code>NODE_ENV=production</code>
      </Collapsible>
      <Collapsible title="构建产物校验和">
        <code>sha256: 9f86d081...</code>
      </Collapsible>
    </div>
  )
}`,
      },
      {
        id: 'code-details',
        title: '配置明细与日志折叠',
        description: '默认收起冗长的配置或诊断日志，保持主界面清爽并在点击时平滑展开高度。',
        render: () => (
          <div className="w-full max-w-md">
            <Collapsible
              title="查看 components.json 配置片段"
              badge={<HueTag hue="sky" size="xs">JSON</HueTag>}
            >
              <pre className="m-0 overflow-x-auto rounded-[12px] bg-[#1B1F27] p-3 font-glaze-mono text-[11px] text-[#E5E8EE]">
{`{
  "style": "glaze",
  "iconLibrary": "phosphor",
  "registries": { "@glaze": ".../r/{name}.json" }
}`}
              </pre>
            </Collapsible>
          </div>
        ),
        code: `import { Collapsible } from '@/components/ui/collapsible'
import { HueTag } from '@/components/ui/hue-tag'

export function Example() {
  return (
    <Collapsible title="查看配置片段" badge={<HueTag hue="sky" size="xs">JSON</HueTag>}>
      <pre className="rounded-[12px] bg-[#1B1F27] p-3 text-[11px] text-white">{"{ \"style\": \"glaze\" }"}</pre>
    </Collapsible>
  )
}`,
      },
    ],
  },

  toolbar: {
    hero: {
      render: () => (
        <Toolbar>
          <ToolbarGroup>
            <ToolbarButton aria-label="加粗"><TextB size={16} weight="bold" /></ToolbarButton>
            <ToolbarButton aria-label="斜体"><TextItalic size={16} weight="bold" /></ToolbarButton>
            <ToolbarButton aria-label="下划线"><TextUnderline size={16} weight="bold" /></ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarLink href="#preview" onClick={(e) => e.preventDefault()}>排版规范</ToolbarLink>
        </Toolbar>
      ),
      code: `import { TextB, TextItalic, TextUnderline } from '@phosphor-icons/react'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from '@/components/ui/toolbar'

export function Example() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton aria-label="加粗"><TextB size={16} weight="bold" /></ToolbarButton>
        <ToolbarButton aria-label="斜体"><TextItalic size={16} weight="bold" /></ToolbarButton>
        <ToolbarButton aria-label="下划线"><TextUnderline size={16} weight="bold" /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#docs">排版规范</ToolbarLink>
    </Toolbar>
  )
}`,
    },
    examples: [
      {
        id: 'rich-editor',
        title: '组合 ToggleGroup 与 Select',
        description: '参考 Base UI 编辑器工具栏范式，在 Toolbar 中组合多选切换、对齐组与字号下拉选择，统一支持方向键 roving tabindex。',
        render: () => <ToolbarRichDemo />,
        code: `import * as React from 'react'
import { TextAlignLeft, TextAlignCenter, TextB, TextItalic } from '@phosphor-icons/react'
import { Select } from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarSeparator } from '@/components/ui/toolbar'

export function Example() {
  const [formats, setFormats] = React.useState(['bold'])
  const [fontSize, setFontSize] = React.useState('14')
  return (
    <Toolbar>
      <ToggleGroup multiple value={formats} onValueChange={setFormats} className="bg-transparent p-0">
        <Toggle value="bold" size="sm"><TextB size={15} /></Toggle>
        <Toggle value="italic" size="sm"><TextItalic size={15} /></Toggle>
      </ToggleGroup>
      <ToolbarSeparator />
      <Select
        size="sm"
        surface="white"
        value={fontSize}
        onValueChange={setFontSize}
        options={[{ value: '14', label: '14 px' }, { value: '16', label: '16 px' }]}
      />
    </Toolbar>
  )
}`,
      },
      {
        id: 'disabled-items',
        title: '禁用单项与操作分组',
        description: '使用 ToolbarGroup 逻辑分组，禁用按钮会自动跳过键盘焦点循环。',
        minHeight: 150,
        render: () => (
          <Toolbar>
            <ToolbarGroup>
              <ToolbarButton>撤销</ToolbarButton>
              <ToolbarButton disabled className="opacity-40 cursor-not-allowed">重做</ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <ToolbarButton>格式化</ToolbarButton>
              <ToolbarButton>导出</ToolbarButton>
            </ToolbarGroup>
          </Toolbar>
        ),
        code: `import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@/components/ui/toolbar'

export function Example() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>撤销</ToolbarButton>
        <ToolbarButton disabled>重做</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton>格式化</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  )
}`,
      },
    ],
  },

  'scroll-area': {
    hero: {
      render: () => (
        <ScrollArea className="h-44 w-full max-w-md rounded-[18px] bg-[#F6F7F9] p-4">
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex items-center justify-between rounded-[12px] bg-white px-3.5 py-2.5 text-[13px]">
                <span className="font-semibold">集群事件记录 #{i + 1}</span>
                <span className="text-[#8A90A0]">12:0{i}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      ),
      code: `import { ScrollArea } from '@/components/ui/scroll-area'

export function Example() {
  return (
    <ScrollArea className="h-44 rounded-[18px] bg-[#F6F7F9] p-4">
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="rounded-[12px] bg-white px-3.5 py-2.5 text-[13px]">
            集群事件记录 #{i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
    },
    examples: [
      {
        id: 'horizontal-gallery',
        title: '横向卡片滚动画廊',
        description: '配合横向 flex 容器呈现平滑的水平滚动条，适用于时间轴或紧凑色卡陈列。',
        render: () => (
          <ScrollArea className="w-full max-w-lg rounded-[18px] bg-[#F6F7F9] p-4">
            <div className="flex w-max gap-3 pb-1">
              {(['sky', 'mint', 'peach', 'lilac', 'rose', 'aqua', 'periwinkle'] as const).map((hue, idx) => (
                <div
                  key={hue}
                  className="flex h-24 w-32 shrink-0 flex-col justify-between rounded-[16px] bg-white p-3"
                >
                  <HueTag hue={hue} size="xs">{hue}</HueTag>
                  <span className="font-glaze-display text-[18px] font-extrabold">0{idx + 1}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        ),
        code: `import { HueTag } from '@/components/ui/hue-tag'
import { ScrollArea } from '@/components/ui/scroll-area'

export function Example() {
  return (
    <ScrollArea className="w-full max-w-lg rounded-[18px] bg-[#F6F7F9] p-4">
      <div className="flex w-max gap-3">
        {(['sky', 'mint', 'peach', 'lilac', 'rose'] as const).map((hue) => (
          <div key={hue} className="h-24 w-32 shrink-0 rounded-[16px] bg-white p-3">
            <HueTag hue={hue} size="xs">{hue}</HueTag>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
      },
      {
        id: 'both-axes',
        title: '双向滚动宽表预览',
        description: '同时溢出宽高时自动展示纵横双轴柔和滚动条，避免破坏外层卡片圆角。',
        render: () => (
          <ScrollArea className="h-44 w-full max-w-lg rounded-[18px] bg-[#F6F7F9] p-3">
            <div className="w-[640px] rounded-[12px] bg-white p-3 text-[12px]">
              <div className="grid grid-cols-5 border-b border-[#EEF0F3] pb-2 font-bold text-[#6B7280]">
                <span>节点</span>
                <span>区域</span>
                <span>CPU</span>
                <span>内存</span>
                <span>P95 延迟</span>
              </div>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="grid grid-cols-5 border-b border-[#F4F5F8] py-2 last:border-0">
                  <span className="font-semibold">edge-0{i + 1}</span>
                  <span>cn-shanghai</span>
                  <span>{24 + i * 5}%</span>
                  <span>{41 + i * 3}%</span>
                  <span>{12 + i}ms</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        ),
        code: `import { ScrollArea } from '@/components/ui/scroll-area'

export function Example() {
  return (
    <ScrollArea className="h-44 w-full max-w-lg rounded-[18px] bg-[#F6F7F9] p-3">
      <div className="w-[640px] rounded-[12px] bg-white p-4">
        {/* 宽表格内容 */}
      </div>
    </ScrollArea>
  )
}`,
      },
    ],
  },

  separator: {
    hero: {
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <div className="text-[13px] font-semibold">上方区块</div>
          <Separator />
          <div className="flex h-6 items-center gap-3 text-[13px] text-[#5B6170]">
            <span>组件</span>
            <Separator orientation="vertical" />
            <span>卡片</span>
            <Separator orientation="vertical" />
            <span>Demo</span>
          </div>
        </div>
      ),
      code: `import { Separator } from '@/components/ui/separator'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <div>上方区块</div>
      <Separator />
      <div className="flex h-6 items-center gap-3">
        <span>组件</span>
        <Separator orientation="vertical" />
        <span>卡片</span>
      </div>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'card-sections',
        title: '卡片内信息分层',
        description: '在无描边卡片内部使用水平与垂直 Separator 划分标题、正文和底部指标栏。',
        surface: 'canvas',
        render: () => (
          <Tile tone="white" className="w-full max-w-sm">
            <div className="flex items-center justify-between">
              <span className="font-glaze-display text-[17px] font-extrabold text-[#123A5C]">Glaze Registry</span>
              <HueTag hue="mint" size="xs">v2.0</HueTag>
            </div>
            <p className="m-0 mt-1 text-[13px] text-[#5B6170]">基于 Base UI 1.9 与 Tailwind v4 的可组合组件库。</p>
            <Separator className="my-4" />
            <div className="flex h-5 items-center justify-between text-[12px] font-semibold text-[#6B7280]">
              <span>58 组件</span>
              <Separator orientation="vertical" />
              <span>112 卡片</span>
              <Separator orientation="vertical" />
              <span>6 Demo</span>
            </div>
          </Tile>
        ),
        code: `import { Separator } from '@/components/ui/separator'
import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Tile tone="white">
      <div className="font-bold">Glaze Registry</div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-3 text-[12px]">
        <span>58 组件</span>
        <Separator orientation="vertical" />
        <span>112 卡片</span>
      </div>
    </Tile>
  )
}`,
      },
      {
        id: 'action-bar',
        title: '操作栏竖向分隔（orientation="vertical"）',
        description: '在按钮组、筛选条件或统计摘要之间使用垂直分隔线建立清晰分组。',
        minHeight: 140,
        render: () => (
          <div className="flex h-10 items-center gap-3 rounded-full bg-[#F6F7F9] px-4">
            <span className="text-[13px] font-bold text-[#123A5C]">在线 14</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-[13px] font-medium text-[#5B6170]">P95 18ms</span>
            <Separator orientation="vertical" className="h-4" />
            <Button size="sm" variant="soft" hue="periwinkle">刷新</Button>
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Example() {
  return (
    <div className="flex h-10 items-center gap-3 rounded-full bg-[#F6F7F9] px-4">
      <span>在线 14</span>
      <Separator orientation="vertical" className="h-4" />
      <span>P95 18ms</span>
      <Separator orientation="vertical" className="h-4" />
      <Button size="sm" variant="soft">刷新</Button>
    </div>
  )
}`,
      },
    ],
  },

  'direction-provider': {
    hero: {
      render: () => <DirectionHeroDemo />,
      code: `import * as React from 'react'
import { DirectionProvider } from '@/components/ui/direction-provider'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

export function Example() {
  const [rtl, setRtl] = React.useState(false)
  return (
    <div className="flex flex-col gap-4">
      <Switch checked={rtl} onCheckedChange={setRtl} />
      <DirectionProvider direction={rtl ? 'rtl' : 'ltr'}>
        <div dir={rtl ? 'rtl' : 'ltr'}>
          <Slider defaultValue={62} label="自适应方向滑块" unit="%" />
        </div>
      </DirectionProvider>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'multi-components-rtl',
        title: '多组件 RTL 镜像适配',
        description: 'DirectionProvider 会同步通知内部所有 Base UI 控件（Tabs、Input、Progress、Slider 等）切换方向与键盘左右导航逻辑。',
        render: () => <DirectionMultiComponentsDemo />,
        code: `import { DirectionProvider } from '@/components/ui/direction-provider'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Example() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col gap-4">
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="b">التحليلات</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input placeholder="ابحث..." />
        <Progress value={74} showValue hue="aqua" />
      </div>
    </DirectionProvider>
  )
}`,
      },
      {
        id: 'side-by-side-override',
        title: '局部嵌套方向对比（LTR vs RTL）',
        description: '支持在同一页面内局部嵌套 DirectionProvider，并排对比左右阅读方向表现。',
        align: 'start',
        render: () => (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <DirectionProvider direction="ltr">
              <div dir="ltr" className="flex flex-col gap-3 rounded-[18px] bg-[#F6F7F9] p-4">
                <span className="text-[12px] font-bold text-[#6B7280]">LTR（左向右）</span>
                <Slider defaultValue={70} label="进度" unit="%" hue="sky" />
              </div>
            </DirectionProvider>
            <DirectionProvider direction="rtl">
              <div dir="rtl" className="flex flex-col gap-3 rounded-[18px] bg-[#F6F7F9] p-4">
                <span className="text-[12px] font-bold text-[#6B7280]">RTL（右向左）</span>
                <Slider defaultValue={70} label="التقدم" unit="%" hue="periwinkle" />
              </div>
            </DirectionProvider>
          </div>
        ),
        code: `import { DirectionProvider } from '@/components/ui/direction-provider'
import { Slider } from '@/components/ui/slider'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DirectionProvider direction="ltr">
        <div dir="ltr"><Slider defaultValue={70} label="LTR" unit="%" /></div>
      </DirectionProvider>
      <DirectionProvider direction="rtl">
        <div dir="rtl"><Slider defaultValue={70} label="RTL" unit="%" /></div>
      </DirectionProvider>
    </div>
  )
}`,
      },
    ],
  },

  table: {
    hero: {
      align: 'start',
      minHeight: 360,
      render: () => <DataTableShowcaseDemo />,
      code: `import { createGlazeColumnHelper, DataTable } from '@/components/ui/table'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusPill } from '@/components/ui/status-pill'

const helper = createGlazeColumnHelper<ServiceRow>()
const columns = helper.columns([
  helper.accessor('service', { header: '服务名称' }),
  helper.accessor('region', {
    header: '区域',
    cell: (info) => <HueTag hue="sky" size="sm">{info.getValue()}</HueTag>,
  }),
  helper.accessor('latency', {
    header: 'P99 延迟',
    meta: { numeric: true },
    cell: (info) => \`\${info.getValue()} ms\`,
  }),
  helper.accessor('status', {
    header: '状态',
    cell: ({ row }) => <StatusPill status={row.original.status}>{row.original.statusLabel}</StatusPill>,
  }),
])

export function Example() {
  return (
    <DataTable
      data={rows}
      columns={columns}
      enableRowSelection
      enableColumnVisibility
      enableDensityToggle
      renderSubComponent={(row) => <div>{row.original.notes}</div>}
    />
  )
}`,
    },
    examples: [
      {
        id: 'semantic-primitives',
        title: '语义化基础表格原语（Table / TableRow / TableCell）',
        description: '不需要复杂交互时，可直接组合语义化原语，自动继承密度上下文与等宽数字排版。',
        align: 'start',
        render: () => (
          <div className="w-full">
            <Table density="compact">
              <TableHeader>
                <tr>
                  <TableHead>节点</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead align="right">CPU</TableHead>
                  <TableHead align="right">内存</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">k8s-sh-01</TableCell>
                  <TableCell><HueTag hue="periwinkle" size="sm">Ingress</HueTag></TableCell>
                  <TableCell align="right" className="font-glaze-mono">38%</TableCell>
                  <TableCell align="right" className="font-glaze-mono">12.4 GB</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">k8s-sh-02</TableCell>
                  <TableCell><HueTag hue="mint" size="sm">Postgres</HueTag></TableCell>
                  <TableCell align="right" className="font-glaze-mono">64%</TableCell>
                  <TableCell align="right" className="font-glaze-mono">48.2 GB</TableCell>
                </TableRow>
                <TableRow selected>
                  <TableCell className="font-bold">k8s-sg-01</TableCell>
                  <TableCell><HueTag hue="aqua" size="sm">Worker</HueTag></TableCell>
                  <TableCell align="right" className="font-glaze-mono">72%</TableCell>
                  <TableCell align="right" className="font-glaze-mono">29.8 GB</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ),
        code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function Example() {
  return (
    <Table density="compact">
      <TableHeader>
        <tr>
          <TableHead>节点</TableHead>
          <TableHead align="right">CPU</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-bold">k8s-sh-01</TableCell>
          <TableCell align="right">38%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
      },
    ],
  },

  sidebar: {
    hero: {
      align: 'start',
      minHeight: 460,
      surface: 'canvas',
      render: () => <SidebarHeroDemo />,
      code: `import { House, Tray, ChartLineUp } from '@phosphor-icons/react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export function AppShell() {
  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>{/* Workspace Switcher */}</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>工作台</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive icon={<House size={16} weight="fill" />}>
                    总览驾驶舱
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuCollapsible icon={<ChartLineUp size={16} />} label="数据中心" defaultOpen>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>实时流量</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuCollapsible>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>{/* User Profile Menu */}</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header><SidebarTrigger /></header>
        <main>{/* Dashboard Grid */}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}`,
    },
    examples: [
      {
        id: 'variants-and-collapsible',
        title: '布局变体与收起模式（floating / sidebar / inset）',
        description: '支持悬浮釉面卡（floating）、贴边白栏（sidebar）与内嵌白画布（inset），并可切换图标栏收起或完全隐藏。',
        align: 'start',
        surface: 'canvas',
        render: () => <SidebarVariantsDemo />,
        code: `<SidebarProvider variant="inset">
  <Sidebar collapsible="offcanvas">...</Sidebar>
  <SidebarInset>...</SidebarInset>
</SidebarProvider>`,
      },
    ],
  },
}
