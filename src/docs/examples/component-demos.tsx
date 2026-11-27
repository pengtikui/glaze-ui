import * as React from 'react'
import {
  Bell,
  Copy,
  DownloadSimple,
  Gear,
  House,
  MagnifyingGlass,
  Plus,
  ShareNetwork,
  Sparkle,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
  Trash,
} from '@phosphor-icons/react'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { AreaChart } from '@/components/ui/area-chart'
import { Autocomplete } from '@/components/ui/autocomplete'
import { Avatar, AvatarGroup } from '@/components/ui/avatar'
import { BarChart } from '@/components/ui/bar-chart'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartLegend } from '@/components/ui/chart'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Collapsible } from '@/components/ui/collapsible'
import { Combobox, MultiCombobox, type ComboboxOption } from '@/components/ui/combobox'
import { ComposedChart } from '@/components/ui/composed-chart'
import { ContextMenu } from '@/components/ui/context-menu'
import { CountBadge } from '@/components/ui/count-badge'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { DirectionProvider } from '@/components/ui/direction-provider'
import { Drawer } from '@/components/ui/drawer'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import { Grid } from '@/components/ui/grid'
import { HueTag } from '@/components/ui/hue-tag'
import { IconTile } from '@/components/ui/icon-tile'
import { Input } from '@/components/ui/input'
import { LineChart } from '@/components/ui/line-chart'
import { Menu } from '@/components/ui/menu'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Meter } from '@/components/ui/meter'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { NumberField } from '@/components/ui/number-field'
import { OTPField } from '@/components/ui/otp-field'
import { DonutChart, PieChart } from '@/components/ui/pie-chart'
import { Popover } from '@/components/ui/popover'
import { PreviewCard } from '@/components/ui/preview-card'
import { Progress, SegmentedProgress } from '@/components/ui/progress'
import { RadarChart } from '@/components/ui/radar-chart'
import { GaugeChart, RadialChart } from '@/components/ui/radial-chart'
import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'
import { ScatterChart } from '@/components/ui/scatter-chart'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { SparkChart } from '@/components/ui/spark-chart'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from '@/components/ui/toolbar'
import { Tooltip } from '@/components/ui/tooltip'

export interface ComponentDemoEntry {
  render: () => React.ReactNode
  code: string
  minHeight?: number
  align?: 'center' | 'start'
}

const REGION_OPTIONS = [
  { value: 'cn-sh', label: '华东 · 上海', description: '低延迟 12ms', group: '中国区' },
  { value: 'cn-bj', label: '华北 · 北京', description: '双活主节点', group: '中国区' },
  { value: 'ap-sg', label: '亚太 · 新加坡', description: '跨境专线', group: '海外节点' },
  { value: 'us-w', label: '美西 · 硅谷', description: '边缘缓存', group: '海外节点' },
]

const FRAMEWORK_ITEMS: ComboboxOption[] = [
  { value: 'base-ui', label: 'Base UI', meta: 'v1.9' },
  { value: 'react', label: 'React 19', meta: '核心框架' },
  { value: 'motion', label: 'Motion', meta: '布局动效' },
  { value: 'tailwind', label: 'Tailwind CSS', meta: 'v4' },
  { value: 'phosphor', label: 'Phosphor Icons', meta: '线性图标' },
]

const TRAFFIC_DATA = [
  { month: '1月', inbound: 420, outbound: 260, p95: 32 },
  { month: '2月', inbound: 495, outbound: 310, p95: 29 },
  { month: '3月', inbound: 468, outbound: 295, p95: 34 },
  { month: '4月', inbound: 612, outbound: 380, p95: 27 },
  { month: '5月', inbound: 735, outbound: 448, p95: 24 },
  { month: '6月', inbound: 820, outbound: 512, p95: 21 },
]

const REVENUE_DATA = [
  { quarter: 'Q1', enterprise: 240, selfServe: 120, margin: 64 },
  { quarter: 'Q2', enterprise: 285, selfServe: 148, margin: 67 },
  { quarter: 'Q3', enterprise: 332, selfServe: 176, margin: 70 },
  { quarter: 'Q4', enterprise: 396, selfServe: 214, margin: 74 },
]

function SelectDemo() {
  const [val, setVal] = React.useState('cn-sh')
  return (
    <div className="w-full max-w-xs">
      <Select value={val} onValueChange={(v) => setVal(v ?? 'cn-sh')} options={REGION_OPTIONS} placeholder="选择节点区域" />
    </div>
  )
}

function ComboboxDemo() {
  const [single, setSingle] = React.useState<ComboboxOption | null>(FRAMEWORK_ITEMS[0])
  const [multi, setMulti] = React.useState<ComboboxOption[]>([FRAMEWORK_ITEMS[0], FRAMEWORK_ITEMS[2]])
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Combobox items={FRAMEWORK_ITEMS} value={single} onValueChange={setSingle} placeholder="单选搜索技术栈..." />
      <MultiCombobox items={FRAMEWORK_ITEMS} value={multi} onValueChange={setMulti} placeholder="多选技术标签..." />
    </div>
  )
}

function AutocompleteDemo() {
  const [val, setVal] = React.useState('')
  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        value={val}
        onValueChange={setVal}
        items={[
          'deploy --env=production',
          'backup --target=nas-raid',
          'restart --service=gateway',
          'inspect --cluster=k3s-edge',
          'prune --images --force',
        ]}
        placeholder="输入命令行指令..."
      />
    </div>
  )
}

function CheckboxDemo() {
  const [checked, setChecked] = React.useState(true)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox checked={checked} onCheckedChange={setChecked} label="开启自动快照备份" description="每日凌晨 03:00 自动归档至 NAS" />
      <Checkbox indeterminate label="半选状态示例" />
      <Checkbox disabled label="禁用状态选项" />
    </div>
  )
}

function CheckboxGroupDemo() {
  const [list, setList] = React.useState<string[]>(['auto', 'alerts'])
  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup value={list} onValueChange={setList}>
        <Checkbox name="auto" label="自动安全更新" />
        <Checkbox name="alerts" label="异常指标告警推送" />
        <Checkbox name="digest" label="每周运营摘要邮件" />
      </CheckboxGroup>
      <span className="text-[12px] text-[#6B7280]">当前已选：{list.join(', ') || '无'}</span>
    </div>
  )
}

function RadioDemo() {
  const [val, setVal] = React.useState('balanced')
  return (
    <RadioGroup value={val} onValueChange={(v) => setVal(String(v))}>
      <Radio value="eco" label="节能模式" description="夜间自动降低后台同步频率" />
      <Radio value="balanced" label="均衡模式" description="性能与能耗自动平衡（推荐）" />
      <Radio value="turbo" label="极速模式" description="满载算力，响应延迟最低" />
    </RadioGroup>
  )
}

function SwitchDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-6">
      <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
        <Switch checked={a} onCheckedChange={setA} hue="mint" />
        <span>广告拦截</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
        <Switch checked={b} onCheckedChange={setB} hue="periwinkle" />
        <span>暗色聚焦模式</span>
      </label>
      <label className="flex items-center gap-2.5 text-[14px] text-[#8A90A0]">
        <Switch checked disabled />
        <span>系统锁定</span>
      </label>
    </div>
  )
}

function SliderDemo() {
  const [val, setVal] = React.useState(68)
  const [range, setRange] = React.useState<[number, number]>([25, 78])
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Slider value={val} onValueChange={(v) => setVal(Number(v))} label="亮度调节" unit="%" hue="periwinkle" />
      <Slider value={range} onValueChange={(v) => Array.isArray(v) && setRange([v[0], v[1]])} label="告警阈值区间" unit="%" hue="aqua" />
    </div>
  )
}

function ToggleDemo() {
  const [pressed, setPressed] = React.useState(true)
  return (
    <div className="flex items-center gap-2.5">
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="加粗">
        <TextB size={16} weight="bold" />
        <span>加粗</span>
      </Toggle>
      <Toggle aria-label="斜体">
        <TextItalic size={16} weight="bold" />
        <span>斜体</span>
      </Toggle>
    </div>
  )
}

function ToggleGroupDemo() {
  const [align, setAlign] = React.useState<string[]>(['left'])
  return (
    <ToggleGroup value={align} onValueChange={setAlign}>
      <Toggle value="left" aria-label="左对齐"><TextAlignLeft size={16} /></Toggle>
      <Toggle value="center" aria-label="居中"><TextAlignCenter size={16} /></Toggle>
      <Toggle value="right" aria-label="右对齐"><TextAlignRight size={16} /></Toggle>
    </ToggleGroup>
  )
}

function SegmentedControlDemo() {
  const [v, setV] = React.useState<'day' | 'week' | 'month'>('week')
  return (
    <SegmentedControl
      value={v}
      onValueChange={setV}
      options={[
        { value: 'day', label: '今日' },
        { value: 'week', label: '近 7 天' },
        { value: 'month', label: '本月' },
      ]}
    />
  )
}

function ToastDemo() {
  const toast = useToast()
  const [count, setCount] = React.useState(1)
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button
        variant="primary"
        onClick={() => {
          toast({ title: `构建部署成功 #${count}`, description: '边缘节点已全部热更新完成', status: 'normal' })
          setCount((c) => c + 1)
        }}
      >
        触发成功通知
      </Button>
      <Button
        variant="soft"
        hue="peach"
        onClick={() => toast({ title: '存储水位偏高', description: 'NAS 卷 2 已使用 86%', status: 'warning' })}
      >
        触发警告
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ title: '节点连接超时', description: 'ap-sg-02 心跳中断 15s', status: 'error' })}
      >
        触发异常
      </Button>
    </div>
  )
}

function DrawerDemo() {
  const [rightOpen, setRightOpen] = React.useState(false)
  const [bottomOpen, setBottomOpen] = React.useState(false)
  return (
    <div className="flex flex-wrap gap-2.5">
      <Drawer
        open={rightOpen}
        onOpenChange={setRightOpen}
        side="right"
        trigger={<Button variant="primary">打开右侧抽屉</Button>}
        title="节点配置检查"
        description="支持手势向右拖拽或点击遮罩关闭"
      >
        <div className="flex flex-col gap-3 text-[14px] text-[#5B6170]">
          <p className="m-0">采用 300ms 进场 / 220ms 退场纯 CSS GPU 合成动画。</p>
          <StatusPill status="normal" label="所有检查项已通过" />
        </div>
      </Drawer>
      <Drawer
        open={bottomOpen}
        onOpenChange={setBottomOpen}
        side="bottom"
        trigger={<Button variant="secondary">打开底部抽屉</Button>}
        title="快捷操作面板"
        description="移动端友好的底部滑出抽屉"
      >
        <p className="m-0 text-[14px] text-[#5B6170]">向下拖动把手可流畅关闭。</p>
      </Drawer>
    </div>
  )
}

function FormDemo() {
  const [msg, setMsg] = React.useState('')
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault()
        setMsg('表单已通过原生约束校验并提交！')
      }}
    >
      <Field name="project">
        <FieldLabel>项目标识</FieldLabel>
        <Input required placeholder="例如 glaze-console" />
        <FieldDescription>仅支持小写字母与连字符</FieldDescription>
        <FieldError match="valueMissing">请输入项目标识</FieldError>
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit">提交校验</Button>
        {msg && <span className="text-[12px] font-medium text-[#2F6B28]">{msg}</span>}
      </div>
    </Form>
  )
}

function DirectionDemo() {
  const [rtl, setRtl] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
        <Switch checked={rtl} onCheckedChange={setRtl} />
        <span>{rtl ? '当前方向：RTL（右向左）' : '当前方向：LTR（左向右）'}</span>
      </label>
      <DirectionProvider direction={rtl ? 'rtl' : 'ltr'}>
        <div dir={rtl ? 'rtl' : 'ltr'} className="rounded-[18px] bg-[#F6F7F9] p-4">
          <Slider defaultValue={62} label="跟随阅读方向自适应的滑块" />
        </div>
      </DirectionProvider>
    </div>
  )
}

function ContextMenuDemo() {
  const toast = useToast()
  return (
    <ContextMenu
      items={[
        { id: 'copy', label: '复制链接', icon: <Copy size={15} />, shortcut: '⌘C', onSelect: () => toast({ title: '已复制链接', status: 'info' }) },
        { id: 'share', label: '分享节点', icon: <ShareNetwork size={15} />, shortcut: '⌘S', onSelect: () => toast({ title: '已生成分享口令', status: 'normal' }) },
        { id: 'delete', label: '删除项目', icon: <Trash size={15} />, danger: true, separatorBefore: true, onSelect: () => toast({ title: '已移入回收站', status: 'warning' }) },
      ]}
    >
      <div className="flex h-32 w-full max-w-sm cursor-context-menu items-center justify-center rounded-[20px] border border-dashed border-[#CDD3DD] bg-[#F6F7F9] text-[13px] font-medium text-[#5B6170]">
        在此区域点击鼠标右键打开 ContextMenu
      </div>
    </ContextMenu>
  )
}

export const COMPONENT_DEMOS: Record<string, ComponentDemoEntry> = {
  grid: {
    align: 'start',
    render: () => (
      <div className="w-full rounded-[20px] bg-[#F2F4F8] p-4">
        <Grid>
          <Tile size="s" tone="sky"><span className="text-[13px] font-bold">S (1×1)</span><span className="font-glaze-display text-[32px] font-extrabold">24</span></Tile>
          <Tile size="s" tone="mint"><span className="text-[13px] font-bold">S (1×1)</span><span className="font-glaze-display text-[32px] font-extrabold">99.9%</span></Tile>
          <Tile size="w" tone="white"><span className="text-[13px] font-bold">W (2×1 宽格)</span><span className="text-[13px] text-[#5B6170]">自动 4 列 dense 排布，平板 2 列，手机 1 列</span></Tile>
        </Grid>
      </div>
    ),
    code: `import { Grid } from '@/components/ui/grid'
import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Grid>
      <Tile size="s" tone="sky">1×1 小格</Tile>
      <Tile size="s" tone="mint">1×1 小格</Tile>
      <Tile size="w" tone="white">2×1 宽格</Tile>
    </Grid>
  )
}`,
  },
  tile: {
    align: 'start',
    render: () => (
      <div className="grid w-full grid-cols-2 gap-3 rounded-[20px] bg-[#F2F4F8] p-4 sm:grid-cols-4">
        {(['white', 'sky', 'mint', 'sky-dark'] as const).map((tone) => (
          <Tile key={tone} tone={tone} interactive className="min-h-32">
            <span className="text-[12px] font-semibold opacity-75">tone=&quot;{tone}&quot;</span>
            <span className="font-glaze-display text-[22px] font-extrabold">釉面卡片</span>
          </Tile>
        ))}
      </div>
    ),
    code: `import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Tile tone="sky" size="s" interactive>
      <span>活跃节点</span>
      <strong className="font-glaze-display text-[44px] font-extrabold">14</strong>
    </Tile>
  )
}`,
  },
  'status-pill': {
    render: () => (
      <div className="flex flex-wrap items-center gap-2.5">
        <StatusPill status="normal" label="运行正常" />
        <StatusPill status="warning" label="容量偏高" />
        <StatusPill status="error" label="节点离线" />
        <StatusPill status="info" label="构建部署中" />
        <StatusPill status="disabled" label="已停用" />
      </div>
    ),
    code: `import { StatusPill } from '@/components/ui/status-pill'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusPill status="normal" label="运行正常" />
      <StatusPill status="warning" label="容量偏高" />
      <StatusPill status="error" label="节点离线" />
    </div>
  )
}`,
  },
  'hue-tag': {
    render: () => (
      <div className="flex flex-wrap items-center gap-2">
        {(['sky', 'mint', 'peach', 'lilac', 'rose', 'lemon', 'aqua', 'periwinkle', 'coral'] as const).map((h) => (
          <HueTag key={h} hue={h}>{h}</HueTag>
        ))}
      </div>
    ),
    code: `import { HueTag } from '@/components/ui/hue-tag'

export function Example() {
  return (
    <div className="flex gap-2">
      <HueTag hue="periwinkle">Base UI 1.9</HueTag>
      <HueTag hue="mint">生产环境</HueTag>
      <HueTag hue="coral">高优先级</HueTag>
    </div>
  )
}`,
  },
  'status-dot': {
    render: () => (
      <div className="flex items-center gap-6">
        {(['normal', 'warning', 'error', 'info', 'disabled'] as const).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <StatusDot status={s} animated size="lg" />
            <span className="text-[13px] font-medium text-[#5B6170]">{s}</span>
          </div>
        ))}
      </div>
    ),
    code: `import { StatusDot } from '@/components/ui/status-dot'

export function Example() {
  return <StatusDot status="normal" animated size="lg" />
}`,
  },
  'count-badge': {
    render: () => (
      <div className="flex items-center gap-3">
        <CountBadge count={3} hue="coral" />
        <CountBadge count={18} hue="periwinkle" />
        <CountBadge count={99} hue="mint" />
        <CountBadge count="99+" hue="sky" />
      </div>
    ),
    code: `import { CountBadge } from '@/components/ui/count-badge'

export function Example() {
  return <CountBadge count="99+" hue="coral" />
}`,
  },
  'icon-tile': {
    render: () => (
      <div className="flex flex-wrap items-center gap-3">
        <IconTile hue="sky" size="md"><House size={20} weight="duotone" /></IconTile>
        <IconTile hue="mint" size="md"><Sparkle size={20} weight="duotone" /></IconTile>
        <IconTile hue="peach" size="md"><Bell size={20} weight="duotone" /></IconTile>
        <IconTile hue="periwinkle" size="lg"><Gear size={24} weight="duotone" /></IconTile>
      </div>
    ),
    code: `import { House } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'

export function Example() {
  return <IconTile hue="sky" size="md"><House size={20} /></IconTile>
}`,
  },
  textarea: {
    render: () => (
      <div className="w-full max-w-md">
        <Textarea rows={4} placeholder="输入发布变更说明或工单备注（18px 圆角柔灰底）..." />
      </div>
    ),
    code: `import { Textarea } from '@/components/ui/textarea'

export function Example() {
  return <Textarea rows={4} placeholder="输入多行备注..." />
}`,
  },
  'segmented-control': {
    render: () => <SegmentedControlDemo />,
    code: `import * as React from 'react'
import { SegmentedControl } from '@/components/ui/segmented-control'

export function Example() {
  const [range, setRange] = React.useState<'day' | 'week' | 'month'>('week')
  return (
    <SegmentedControl
      value={range}
      onValueChange={setRange}
      options={[
        { value: 'day', label: '今日' },
        { value: 'week', label: '近 7 天' },
        { value: 'month', label: '本月' },
      ]}
    />
  )
}`,
  },
  button: {
    render: () => (
      <div className="flex flex-wrap items-center gap-2.5">
        <Button variant="primary">主按钮</Button>
        <Button variant="secondary">次级按钮</Button>
        <Button variant="soft" hue="periwinkle">柔和色</Button>
        <Button variant="soft" hue="mint">薄荷色</Button>
        <Button variant="danger">危险操作</Button>
        <Button variant="ghost">幽灵按钮</Button>
        <Button variant="primary" size="icon" aria-label="新增"><Plus size={18} weight="bold" /></Button>
      </div>
    ),
    code: `import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">主按钮</Button>
      <Button variant="secondary">次级按钮</Button>
      <Button variant="soft" hue="periwinkle">柔和色</Button>
      <Button variant="danger">危险操作</Button>
    </div>
  )
}`,
  },
  input: {
    render: () => (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Input placeholder="搜索组件或节点名称..." leadingIcon={<MagnifyingGlass size={16} />} />
        <Input defaultValue="glaze-prod-01" surface="soft" />
      </div>
    ),
    code: `import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'

export function Example() {
  return <Input placeholder="搜索组件..." leadingIcon={<MagnifyingGlass size={16} />} />
}`,
  },
  'number-field': {
    render: () => (
      <div className="w-full max-w-xs">
        <NumberField defaultValue={24} min={16} max={32} unit="°C" />
      </div>
    ),
    code: `import { NumberField } from '@/components/ui/number-field'

export function Example() {
  return <NumberField defaultValue={24} min={16} max={32} unit="°C" />
}`,
  },
  'otp-field': {
    render: () => <OTPField length={6} defaultValue="482" />,
    code: `import { OTPField } from '@/components/ui/otp-field'

export function Example() {
  return <OTPField length={6} />
}`,
  },
  checkbox: {
    render: () => <CheckboxDemo />,
    code: `import { Checkbox } from '@/components/ui/checkbox'

export function Example() {
  return <Checkbox defaultChecked label="开启自动快照备份" description="每日 03:00 执行" />
}`,
  },
  'checkbox-group': {
    render: () => <CheckboxGroupDemo />,
    code: `import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'

export function Example() {
  const [value, setValue] = React.useState(['auto'])
  return (
    <CheckboxGroup value={value} onValueChange={setValue}>
      <Checkbox name="auto" label="自动更新" />
      <Checkbox name="alerts" label="告警推送" />
    </CheckboxGroup>
  )
}`,
  },
  radio: {
    render: () => <RadioDemo />,
    code: `import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  return (
    <RadioGroup defaultValue="balanced">
      <Radio value="eco" label="节能模式" />
      <Radio value="balanced" label="均衡模式" />
    </RadioGroup>
  )
}`,
  },
  'radio-group': {
    render: () => <RadioDemo />,
    code: `import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  return (
    <RadioGroup defaultValue="balanced">
      <Radio value="eco" label="节能模式" description="降低同步频率" />
      <Radio value="balanced" label="均衡模式" description="性能与能耗平衡" />
      <Radio value="turbo" label="极速模式" description="满载算力输出" />
    </RadioGroup>
  )
}`,
  },
  switch: {
    render: () => <SwitchDemo />,
    code: `import { Switch } from '@/components/ui/switch'

export function Example() {
  return <Switch defaultChecked label="启用广告拦截" hue="mint" />
}`,
  },
  slider: {
    render: () => <SliderDemo />,
    code: `import { Slider } from '@/components/ui/slider'

export function Example() {
  return <Slider defaultValue={68} label="亮度调节" formatValue={(v) => \`\${v}%\`} />
}`,
  },
  toggle: {
    render: () => <ToggleDemo />,
    code: `import { TextB } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'

export function Example() {
  return <Toggle defaultPressed><TextB size={16} /> 加粗</Toggle>
}`,
  },
  'toggle-group': {
    render: () => <ToggleGroupDemo />,
    code: `import { TextAlignCenter, TextAlignLeft, TextAlignRight } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'

export function Example() {
  return (
    <ToggleGroup defaultValue={['left']}>
      <Toggle value="left"><TextAlignLeft size={16} /></Toggle>
      <Toggle value="center"><TextAlignCenter size={16} /></Toggle>
      <Toggle value="right"><TextAlignRight size={16} /></Toggle>
    </ToggleGroup>
  )
}`,
  },
  field: {
    render: () => (
      <div className="w-full max-w-sm">
        <Field name="domain">
          <FieldLabel>自定义 Registry 域名</FieldLabel>
          <Input defaultValue="https://example.com" />
          <FieldDescription>用于生成 shadcn CLI 安装地址</FieldDescription>
        </Field>
      </div>
    ),
    code: `import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Field name="domain">
      <FieldLabel>自定义域名</FieldLabel>
      <Input placeholder="https://example.com" />
      <FieldDescription>用于生成 Registry 地址</FieldDescription>
    </Field>
  )
}`,
  },
  fieldset: {
    render: () => (
      <Fieldset className="w-full max-w-md">
        <FieldsetLegend>通知通道设置</FieldsetLegend>
        <label className="flex cursor-pointer items-center justify-between text-[14px]">
          <span>Webhook 告警</span>
          <Switch defaultChecked hue="sky" />
        </label>
        <label className="flex cursor-pointer items-center justify-between text-[14px]">
          <span>邮件日报汇总</span>
          <Switch hue="periwinkle" />
        </label>
      </Fieldset>
    ),
    code: `import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Switch } from '@/components/ui/switch'

export function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>通知通道设置</FieldsetLegend>
      <label className="flex items-center justify-between">
        <span>Webhook 告警</span>
        <Switch defaultChecked hue="sky" />
      </label>
    </Fieldset>
  )
}`,
  },
  form: {
    render: () => <FormDemo />,
    code: `import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Field name="project">
        <FieldLabel>项目标识</FieldLabel>
        <Input required placeholder="glaze-console" />
        <FieldError match="valueMissing">请输入项目标识</FieldError>
      </Field>
      <Button type="submit">提交校验</Button>
    </Form>
  )
}`,
  },
  select: {
    render: () => <SelectDemo />,
    code: `import * as React from 'react'
import { Select } from '@/components/ui/select'

export function Example() {
  const [region, setRegion] = React.useState('cn-sh')
  return (
    <Select
      value={region}
      onValueChange={(v) => setRegion(v ?? 'cn-sh')}
      options={[
        { value: 'cn-sh', label: '华东 · 上海', description: '低延迟 12ms', group: '中国区' },
        { value: 'ap-sg', label: '亚太 · 新加坡', description: '跨境专线', group: '海外节点' },
      ]}
    />
  )
}`,
  },
  combobox: {
    render: () => <ComboboxDemo />,
    code: `import { Combobox, MultiCombobox } from '@/components/ui/combobox'

const ITEMS = [
  { value: 'base-ui', label: 'Base UI', meta: 'v1.9' },
  { value: 'tailwind', label: 'Tailwind CSS', meta: 'v4' },
]

export function Example() {
  return <Combobox items={ITEMS} placeholder="搜索技术栈..." />
}`,
  },
  autocomplete: {
    render: () => <AutocompleteDemo />,
    code: `import { Autocomplete } from '@/components/ui/autocomplete'

export function Example() {
  return (
    <Autocomplete
      items={['deploy --env=production', 'backup --target=nas-raid']}
      placeholder="输入命令..."
    />
  )
}`,
  },
  menu: {
    render: () => (
      <Menu
        trigger={<Button variant="secondary">更多操作</Button>}
        items={[
          { id: 'copy', label: '复制配置', icon: <Copy size={15} />, shortcut: '⌘C' },
          { id: 'export', label: '导出 JSON', icon: <DownloadSimple size={15} />, shortcut: '⌘E' },
          { id: 'destroy', label: '销毁实例', icon: <Trash size={15} />, danger: true, separatorBefore: true },
        ]}
      />
    ),
    code: `import { Copy, Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/ui/menu'

export function Example() {
  return (
    <Menu
      trigger={<Button variant="secondary">更多操作</Button>}
      items={[
        { id: 'copy', label: '复制配置', icon: <Copy size={15} />, shortcut: '⌘C' },
        { id: 'del', label: '删除', icon: <Trash size={15} />, danger: true, separatorBefore: true },
      ]}
    />
  )
}`,
  },
  'context-menu': {
    render: () => <ContextMenuDemo />,
    code: `import { Copy, Trash } from '@phosphor-icons/react'
import { ContextMenu } from '@/components/ui/context-menu'

export function Example() {
  return (
    <ContextMenu
      items={[
        { label: '复制链接', icon: <Copy size={15} /> },
        { label: '删除', icon: <Trash size={15} />, danger: true },
      ]}
    >
      <div className="rounded-[20px] bg-[#F6F7F9] p-8">右键点击这里</div>
    </ContextMenu>
  )
}`,
  },
  menubar: {
    render: () => (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>文件</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>新建画板</MenubarItem>
            <MenubarItem>导出 Registry</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>视图</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>4 列桌面栅格</MenubarItem>
            <MenubarItem>2 列平板栅格</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    code: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>新建画板</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
  },
  'navigation-menu': {
    render: () => (
      <NavigationMenu
        menus={[
          {
            id: 'product',
            label: '产品能力',
            items: [
              { title: 'shadcn Registry', description: '按需 CLI 安装单文件源码', badge: 'v2' },
              { title: 'Base UI 1.9', description: '原生无障碍与纯 CSS 过渡' },
            ],
          },
          {
            id: 'resources',
            label: '资源',
            items: [
              { title: 'llms.txt', description: '面向 AI Agent 的标准文档索引' },
              { title: '112 卡片库', description: '开箱即用的多业务仪表盘模块' },
            ],
          },
        ]}
      />
    ),
    code: `import { NavigationMenu } from '@/components/ui/navigation-menu'

export function Example() {
  return (
    <NavigationMenu
      menus={[
        {
          id: 'product',
          label: '产品能力',
          items: [{ title: 'Registry', description: '通过 shadcn CLI 安装' }],
        },
      ]}
    />
  )
}`,
  },
  dialog: {
    render: () => (
      <Dialog
        trigger={<Button variant="primary">打开对话框</Button>}
        title="新增内网服务入口"
        description="采用 28px 圆角与纯 CSS 200ms 进场动画"
        footer={
          <>
            <DialogClose render={<Button variant="secondary">取消</Button>} />
            <DialogClose render={<Button variant="primary">确认保存</Button>} />
          </>
        }
      >
        <Input placeholder="输入服务名称，例如 Grafana" />
      </Dialog>
    ),
    code: `import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Dialog
      trigger={<Button>打开对话框</Button>}
      title="新增服务入口"
      description="配置后将同步到应用发射台"
      footer={<DialogClose render={<Button>确认</Button>} />}
    >
      <Input placeholder="输入服务名称" />
    </Dialog>
  )
}`,
  },
  'alert-dialog': {
    render: () => (
      <AlertDialog
        trigger={<Button variant="danger">销毁集群节点</Button>}
        title="确认销毁该节点？"
        description="此操作不可撤销，该节点上的临时缓存卷将被永久清除。"
        confirmLabel="确认销毁"
        danger
      />
    ),
    code: `import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <AlertDialog
      trigger={<Button variant="danger">销毁节点</Button>}
      title="确认销毁该节点？"
      description="此操作不可撤销。"
      confirmLabel="确认销毁"
      danger
    />
  )
}`,
  },
  drawer: {
    render: () => <DrawerDemo />,
    code: `import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'

export function Example() {
  return (
    <Drawer
      side="right"
      trigger={<Button>打开右侧抽屉</Button>}
      title="节点配置检查"
      description="支持手势拖拽关闭"
    >
      <p>抽屉内容区</p>
    </Drawer>
  )
}`,
  },
  popover: {
    render: () => (
      <Popover
        trigger={<Button variant="secondary">筛选条件</Button>}
        title="按区域筛选"
        description="实时过滤当前画布指标"
      >
        <div className="flex flex-col gap-2 pt-2">
          <Checkbox defaultChecked label="华东集群" />
          <Checkbox defaultChecked label="亚太边缘" />
        </div>
      </Popover>
    ),
    code: `import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

export function Example() {
  return (
    <Popover trigger={<Button variant="secondary">打开气泡</Button>} title="筛选条件">
      <p className="text-[13px]">气泡面板内容</p>
    </Popover>
  )
}`,
  },
  'preview-card': {
    render: () => (
      <PreviewCard
        trigger={
          <a href="#preview" onClick={(e) => e.preventDefault()} className="font-semibold text-[#4A4FB8] underline">
            悬停预览 @glaze/tile
          </a>
        }
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">Glaze Tile</span>
          <p className="m-0 text-[13px] text-[#5B6170]">无描边无阴影核心容器，内置 14 种主题并通过 Context 同步图表配色。</p>
        </div>
      </PreviewCard>
    ),
    code: `import { PreviewCard } from '@/components/ui/preview-card'

export function Example() {
  return (
    <PreviewCard trigger={<a href="#">悬停预览</a>}>
      <p>富媒体摘要卡片内容</p>
    </PreviewCard>
  )
}`,
  },
  tooltip: {
    render: () => (
      <div className="flex items-center gap-3">
        <Tooltip content="复制到剪贴板 (⌘C)">
          <Button variant="secondary" size="icon" aria-label="复制"><Copy size={16} /></Button>
        </Tooltip>
        <Tooltip content="打开系统设置" side="bottom">
          <Button variant="secondary" size="icon" aria-label="设置"><Gear size={16} /></Button>
        </Tooltip>
      </div>
    ),
    code: `import { Copy } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export function Example() {
  return (
    <Tooltip content="复制到剪贴板">
      <Button variant="secondary" size="icon"><Copy size={16} /></Button>
    </Tooltip>
  )
}`,
  },
  toast: {
    render: () => <ToastDemo />,
    code: `import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

export function Example() {
  const toast = useToast()
  return (
    <Button onClick={() => toast({ title: '部署成功', description: '全部节点已生效', status: 'normal' })}>
      发送通知
    </Button>
  )
}`,
  },
  progress: {
    render: () => (
      <div className="flex w-full max-w-md flex-col gap-5">
        <Progress value={72} label="镜像同步进度" showValue hue="periwinkle" />
        <SegmentedProgress
          segments={[
            { value: 42, color: '#7B80EA', label: '计算' },
            { value: 26, color: '#2FA79B', label: '存储' },
            { value: 18, color: '#E3A33B', label: '缓存' },
          ]}
        />
      </div>
    ),
    code: `import { Progress } from '@/components/ui/progress'

export function Example() {
  return <Progress value={72} label="镜像同步进度" showValue hue="periwinkle" />
}`,
  },
  meter: {
    render: () => (
      <div className="flex w-full max-w-md flex-col gap-4">
        <Meter value={42} label="正常负载" valueLabel="42%" />
        <Meter value={78} label="警戒水位" valueLabel="78%" />
        <Meter value={94} label="临界告警" valueLabel="94%" />
      </div>
    ),
    code: `import { Meter } from '@/components/ui/meter'

export function Example() {
  return <Meter value={78} label="月度预算消耗" valueLabel="78%" />
}`,
  },
  avatar: {
    render: () => (
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2.5">
          <Avatar fallback="林" hue="rose" size="sm" />
          <Avatar fallback="周" hue="aqua" size="md" />
          <Avatar fallback="陈" hue="periwinkle" size="lg" />
        </div>
        <AvatarGroup
          items={[
            { label: '林', hue: 'rose' },
            { label: '周', hue: 'aqua' },
            { label: '陈', hue: 'sky' },
            { label: '顾', hue: 'peach' },
            { label: '许', hue: 'mint' },
          ]}
          max={4}
        />
      </div>
    ),
    code: `import { AvatarGroup } from '@/components/ui/avatar'

export function Example() {
  return (
    <AvatarGroup
      items={[
        { label: '林', hue: 'rose' },
        { label: '周', hue: 'aqua' },
        { label: '陈', hue: 'sky' },
      ]}
    />
  )
}`,
  },
  tabs: {
    render: () => (
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="metrics">指标</TabsTrigger>
          <TabsTrigger value="logs">日志</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-3 rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
          纯 CSS 200ms 水平滑块指示器，零 JS 动画开销。
        </TabsContent>
        <TabsContent value="metrics" className="mt-3 rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
          当前 P95 延迟 18ms，吞吐量 42.6k req/s。
        </TabsContent>
        <TabsContent value="logs" className="mt-3 rounded-[18px] bg-[#F6F7F9] p-4 text-[13px] text-[#5B6170]">
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
      </TabsList>
      <TabsContent value="overview">概览内容</TabsContent>
      <TabsContent value="metrics">指标内容</TabsContent>
    </Tabs>
  )
}`,
  },
  accordion: {
    render: () => (
      <div className="w-full max-w-md">
        <Accordion defaultValue={['a']}>
          <AccordionItem value="a" title="如何通过 shadcn CLI 安装 Glaze？">
            在 components.json 注册 @glaze 命名空间后，执行 npx shadcn@latest add @glaze/style 与任意组件名即可。
          </AccordionItem>
          <AccordionItem value="b" title="为什么使用 Base UI 1.9？">
            Base UI 提供完整无障碍键盘行为与原生 data-starting-style / data-ending-style 纯 CSS 动画钩子。
          </AccordionItem>
        </Accordion>
      </div>
    ),
    code: `import { Accordion, AccordionItem } from '@/components/ui/accordion'

export function Example() {
  return (
    <Accordion defaultValue={['a']}>
      <AccordionItem value="a" title="安装方式">
        使用 shadcn CLI 按需安装单文件组件源码。
      </AccordionItem>
    </Accordion>
  )
}`,
  },
  collapsible: {
    render: () => (
      <div className="w-full max-w-md">
        <Collapsible title="查看高级路由规则" badge="3 条生效规则" defaultOpen>
          <p className="m-0 text-[13px] text-[#5B6170]">
            静态资产 /r/*.json 启用长期缓存，/view/demos/* 独立渲染完整画布。
          </p>
        </Collapsible>
      </div>
    ),
    code: `import { Collapsible } from '@/components/ui/collapsible'

export function Example() {
  return (
    <Collapsible title="高级选项" badge="3 条规则">
      <p>可折叠展开的明细区域</p>
    </Collapsible>
  )
}`,
  },
  toolbar: {
    render: () => (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButton aria-label="加粗"><TextB size={16} weight="bold" /></ToolbarButton>
          <ToolbarButton aria-label="斜体"><TextItalic size={16} weight="bold" /></ToolbarButton>
          <ToolbarButton aria-label="下划线"><TextUnderline size={16} weight="bold" /></ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarLink href="#docs" onClick={(e) => e.preventDefault()}>排版规范</ToolbarLink>
      </Toolbar>
    ),
    code: `import { TextB, TextItalic } from '@phosphor-icons/react'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@/components/ui/toolbar'

export function Example() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton><TextB size={16} /></ToolbarButton>
        <ToolbarButton><TextItalic size={16} /></ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
    </Toolbar>
  )
}`,
  },
  'scroll-area': {
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
      {/* 长列表内容 */}
    </ScrollArea>
  )
}`,
  },
  separator: {
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
  return <Separator />
}`,
  },
  'direction-provider': {
    render: () => <DirectionDemo />,
    code: `import { DirectionProvider } from '@/components/ui/direction-provider'
import { Slider } from '@/components/ui/slider'

export function Example() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl"><Slider defaultValue={60} /></div>
    </DirectionProvider>
  )
}`,
  },
  chart: {
    align: 'start',
    render: () => (
      <div className="flex w-full flex-col gap-3">
        <ChartLegend
          items={[
            { key: 'inbound', label: '入站流量', color: '#7B80EA' },
            { key: 'outbound', label: '出站流量', color: '#2FA79B' },
          ]}
        />
        <ChartContainer
          config={{
            inbound: { label: '入站流量', hue: 'periwinkle', unit: 'MB/s' },
            outbound: { label: '出站流量', hue: 'aqua', unit: 'MB/s' },
          }}
          height={180}
        >
          <AreaChart
            data={TRAFFIC_DATA}
            xKey="month"
            height={180}
            series={[
              { dataKey: 'inbound', label: '入站流量', hue: 'periwinkle' },
              { dataKey: 'outbound', label: '出站流量', hue: 'aqua' },
            ]}
          />
        </ChartContainer>
      </div>
    ),
    code: `import { ChartContainer, ChartLegend } from '@/components/ui/chart'

export function Example() {
  return (
    <ChartContainer config={{ sales: { label: '销售额', hue: 'periwinkle' } }} height={220}>
      {/* Recharts 图表内容 */}
    </ChartContainer>
  )
}`,
  },
  'area-chart': {
    align: 'start',
    render: () => (
      <AreaChart
        data={TRAFFIC_DATA}
        xKey="month"
        height={220}
        showLegend
        series={[
          { dataKey: 'inbound', label: '入站流量', hue: 'periwinkle', unit: 'MB/s' },
          { dataKey: 'outbound', label: '出站流量', hue: 'aqua', unit: 'MB/s' },
        ]}
      />
    ),
    code: `import { AreaChart } from '@/components/ui/area-chart'

export function Example() {
  return (
    <AreaChart
      data={[{ month: '1月', inbound: 420 }, { month: '2月', inbound: 495 }]}
      xKey="month"
      height={220}
      series={[{ dataKey: 'inbound', label: '入站流量', hue: 'periwinkle' }]}
    />
  )
}`,
  },
  'line-chart': {
    align: 'start',
    render: () => (
      <LineChart
        data={TRAFFIC_DATA}
        xKey="month"
        height={220}
        showLegend
        referenceLine={{ y: 30, label: 'SLA 基线', color: '#E5603B' }}
        series={[{ dataKey: 'p95', label: 'P95 延迟', hue: 'sky', unit: 'ms' }]}
      />
    ),
    code: `import { LineChart } from '@/components/ui/line-chart'

export function Example() {
  return (
    <LineChart
      data={[{ month: '1月', p95: 32 }, { month: '2月', p95: 29 }]}
      xKey="month"
      referenceLine={{ y: 30, label: 'SLA 基线', color: '#E5603B' }}
      series={[{ dataKey: 'p95', label: 'P95 延迟', hue: 'sky', unit: 'ms' }]}
    />
  )
}`,
  },
  'bar-chart': {
    align: 'start',
    render: () => (
      <BarChart
        data={REVENUE_DATA}
        xKey="quarter"
        height={220}
        showLegend
        series={[
          { dataKey: 'enterprise', label: '企业订阅', hue: 'periwinkle', unit: '万' },
          { dataKey: 'selfServe', label: '自助专业版', hue: 'mint', unit: '万' },
        ]}
      />
    ),
    code: `import { BarChart } from '@/components/ui/bar-chart'

export function Example() {
  return (
    <BarChart
      data={[{ quarter: 'Q1', enterprise: 240, selfServe: 120 }]}
      xKey="quarter"
      series={[
        { dataKey: 'enterprise', label: '企业订阅', hue: 'periwinkle' },
        { dataKey: 'selfServe', label: '自助版', hue: 'mint' },
      ]}
    />
  )
}`,
  },
  'pie-chart': {
    align: 'start',
    render: () => (
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <DonutChart
          height={210}
          centerValue="1,120万"
          centerLabel="总营收"
          data={[
            { name: '企业订阅', value: 540, hue: 'periwinkle' },
            { name: '自助专业版', value: 280, hue: 'aqua' },
            { name: '私有化授权', value: 190, hue: 'peach' },
            { name: 'API 用量', value: 110, hue: 'rose' },
          ]}
        />
        <PieChart
          height={210}
          data={[
            { name: '企业订阅', value: 540, hue: 'periwinkle' },
            { name: '自助专业版', value: 280, hue: 'aqua' },
            { name: '私有化授权', value: 190, hue: 'peach' },
            { name: 'API 用量', value: 110, hue: 'rose' },
          ]}
        />
      </div>
    ),
    code: `import { DonutChart } from '@/components/ui/pie-chart'

export function Example() {
  return (
    <DonutChart
      centerValue="1,120万"
      centerLabel="总营收"
      data={[
        { name: '企业订阅', value: 540, hue: 'periwinkle' },
        { name: '自助版', value: 280, hue: 'aqua' },
      ]}
    />
  )
}`,
  },
  'radar-chart': {
    align: 'start',
    render: () => (
      <RadarChart
        height={240}
        angleKey="skill"
        showLegend
        data={[
          { skill: '性能', current: 92, benchmark: 76 },
          { skill: '无障碍', current: 96, benchmark: 70 },
          { skill: '动效', current: 88, benchmark: 72 },
          { skill: '可维护', current: 94, benchmark: 78 },
          { skill: '响应式', current: 90, benchmark: 80 },
          { skill: '文档', current: 95, benchmark: 68 },
        ]}
        series={[
          { dataKey: 'current', label: 'Glaze v2', hue: 'periwinkle' },
          { dataKey: 'benchmark', label: '行业基线', hue: 'aqua' },
        ]}
      />
    ),
    code: `import { RadarChart } from '@/components/ui/radar-chart'

export function Example() {
  return (
    <RadarChart
      angleKey="skill"
      data={[{ skill: '性能', score: 92 }, { skill: '无障碍', score: 96 }]}
      series={[{ dataKey: 'score', label: '评分', hue: 'periwinkle' }]}
    />
  )
}`,
  },
  'radial-chart': {
    align: 'start',
    render: () => (
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <RadialChart
          height={210}
          centerValue="86%"
          centerLabel="总达成率"
          data={[
            { name: '可用性', value: 94, hue: 'mint' },
            { name: '吞吐达成', value: 82, hue: 'periwinkle' },
            { name: '缓存命中', value: 76, hue: 'sky' },
          ]}
        />
        <GaugeChart value={78} height={210} hue="sky" label="带宽利用率" />
      </div>
    ),
    code: `import { GaugeChart, RadialChart } from '@/components/ui/radial-chart'

export function Example() {
  return <GaugeChart value={78} hue="sky" label="带宽利用率" />
}`,
  },
  'scatter-chart': {
    align: 'start',
    render: () => (
      <ScatterChart
        height={220}
        xKey="latency"
        yKey="qps"
        zKey="size"
        xUnit="ms"
        yUnit="QPS"
        showLegend
        series={[
          {
            name: '主集群',
            hue: 'periwinkle',
            data: [
              { latency: 14, qps: 1200, size: 180 },
              { latency: 22, qps: 2900, size: 310 },
              { latency: 31, qps: 4200, size: 360 },
            ],
          },
          {
            name: '灰度节点',
            hue: 'aqua',
            data: [
              { latency: 11, qps: 1650, size: 190 },
              { latency: 19, qps: 3420, size: 320 },
            ],
          },
        ]}
      />
    ),
    code: `import { ScatterChart } from '@/components/ui/scatter-chart'

export function Example() {
  return (
    <ScatterChart
      xKey="latency"
      yKey="qps"
      series={[{ name: '主集群', hue: 'periwinkle', data: [{ latency: 14, qps: 1200 }] }]}
    />
  )
}`,
  },
  'composed-chart': {
    align: 'start',
    render: () => (
      <ComposedChart
        data={REVENUE_DATA}
        xKey="quarter"
        height={230}
        showLegend
        series={[
          { dataKey: 'enterprise', type: 'bar', label: '企业订阅', hue: 'periwinkle', unit: '万' },
          { dataKey: 'selfServe', type: 'bar', label: '自助版', hue: 'aqua', unit: '万' },
          { dataKey: 'margin', type: 'line', label: '毛利率', hue: 'coral', yAxisId: 'right', unit: '%' },
        ]}
      />
    ),
    code: `import { ComposedChart } from '@/components/ui/composed-chart'

export function Example() {
  return (
    <ComposedChart
      data={[{ quarter: 'Q1', revenue: 240, margin: 64 }]}
      xKey="quarter"
      series={[
        { dataKey: 'revenue', type: 'bar', label: '营收', hue: 'periwinkle' },
        { dataKey: 'margin', type: 'line', label: '毛利率', hue: 'coral', yAxisId: 'right' },
      ]}
    />
  )
}`,
  },
  'spark-chart': {
    render: () => (
      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        <div className="rounded-[16px] bg-[#EEF7FD] p-3">
          <span className="text-[11px] font-semibold text-[#24557F]">Area</span>
          <SparkChart data={[24, 32, 29, 44, 52, 66]} variant="area" hue="sky" height={48} />
        </div>
        <div className="rounded-[16px] bg-[#F1FAEC] p-3">
          <span className="text-[11px] font-semibold text-[#2F6B28]">Line</span>
          <SparkChart data={[18, 22, 19, 30, 28, 42]} variant="line" hue="mint" height={48} />
        </div>
        <div className="rounded-[16px] bg-[#F3F4FE] p-3">
          <span className="text-[11px] font-semibold text-[#4A4FB8]">Bar</span>
          <SparkChart data={[12, 28, 19, 36, 24, 44]} variant="bar" hue="periwinkle" height={48} />
        </div>
      </div>
    ),
    code: `import { SparkChart } from '@/components/ui/spark-chart'

export function Example() {
  return <SparkChart data={[24, 32, 29, 44, 52, 66]} variant="area" hue="sky" height={48} />
}`,
  },
}
