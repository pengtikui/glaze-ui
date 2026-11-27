import * as React from 'react'
import {
  Copy,
  DownloadSimple,
  Eye,
  FolderPlus,
  Gear,
  GridFour,
  PencilSimple,
  ShareNetwork,
  Sparkle,
  Trash,
} from '@phosphor-icons/react'
import { Autocomplete } from '@/components/ui/autocomplete'
import { Button } from '@/components/ui/button'
import { Combobox, MultiCombobox, type ComboboxOption } from '@/components/ui/combobox'
import { ContextMenu } from '@/components/ui/context-menu'
import { HueTag } from '@/components/ui/hue-tag'
import { Menu } from '@/components/ui/menu'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Select } from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import type { ComponentDemoGroup } from '@/docs/examples/types'

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
  { value: 'recharts', label: 'Recharts', meta: 'v3 图表' },
]

function SelectHeroDemo() {
  const [val, setVal] = React.useState('cn-sh')
  return (
    <div className="w-full max-w-xs">
      <Select
        value={val}
        onValueChange={(v) => setVal(v ?? 'cn-sh')}
        options={REGION_OPTIONS}
        placeholder="选择节点区域"
      />
    </div>
  )
}

function SelectControlledDemo() {
  const [env, setEnv] = React.useState('prod')
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Select
        value={env}
        onValueChange={setEnv}
        options={[
          { value: 'dev', label: '开发环境 (dev)', description: '自动热更新，无缓存' },
          { value: 'staging', label: '预发环境 (staging)', description: '与生产镜像一致' },
          { value: 'prod', label: '生产环境 (prod)', description: '多活边缘分发' },
        ]}
      />
      <div className="flex items-center justify-between text-[12px] text-[#6B7280]">
        <span>当前环境：{env}</span>
        <div className="flex gap-1.5">
          <Button size="sm" variant="secondary" onClick={() => setEnv('dev')}>
            切到 dev
          </Button>
          <Button size="sm" variant="soft" hue="mint" onClick={() => setEnv('prod')}>
            切到 prod
          </Button>
        </div>
      </div>
    </div>
  )
}

function ComboboxHeroDemo() {
  const [single, setSingle] = React.useState<ComboboxOption | null>(FRAMEWORK_ITEMS[0])
  const [multi, setMulti] = React.useState<ComboboxOption[]>([FRAMEWORK_ITEMS[0], FRAMEWORK_ITEMS[2]])
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Combobox items={FRAMEWORK_ITEMS} value={single} onValueChange={setSingle} placeholder="单选搜索技术栈..." />
      <MultiCombobox items={FRAMEWORK_ITEMS} value={multi} onValueChange={setMulti} placeholder="多选技术标签..." />
    </div>
  )
}

function MultiComboboxPresetsDemo() {
  const [tags, setTags] = React.useState<ComboboxOption[]>([FRAMEWORK_ITEMS[0], FRAMEWORK_ITEMS[3]])
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <MultiCombobox
        items={FRAMEWORK_ITEMS}
        value={tags}
        onValueChange={setTags}
        placeholder="搜索并添加技术标签..."
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="soft"
          hue="periwinkle"
          onClick={() => setTags([FRAMEWORK_ITEMS[0], FRAMEWORK_ITEMS[1], FRAMEWORK_ITEMS[3]])}
        >
          一键填入推荐栈
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setTags([])}>
          清空已选 ({tags.length})
        </Button>
      </div>
    </div>
  )
}

function ComboboxWhiteSurfaceDemo() {
  const [selected, setSelected] = React.useState<ComboboxOption | null>(null)
  return (
    <div className="w-full max-w-sm">
      <Combobox
        surface="white"
        items={FRAMEWORK_ITEMS}
        value={selected}
        onValueChange={setSelected}
        placeholder="输入不存在的词查看自定义空态..."
        emptyText="未找到匹配技术栈，请换个关键字"
      />
    </div>
  )
}

function AutocompleteHeroDemo() {
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

function AutocompleteEmailDemo() {
  const [val, setVal] = React.useState('glaze@')
  const suggestions = [
    'glaze@design.dev',
    'ops@glaze.dev',
    'security@glaze.dev',
    'release@glaze.dev',
    'billing@glaze.dev',
  ]
  return (
    <div className="flex w-full max-w-sm flex-col gap-2.5">
      <Autocomplete
        value={val}
        onValueChange={setVal}
        items={suggestions}
        placeholder="输入收件人邮箱..."
      />
      <div className="flex items-center justify-between text-[12px] text-[#6B7280]">
        <span>当前输入：{val || '空'}</span>
        {val && (
          <Button size="sm" variant="ghost" onClick={() => setVal('')}>
            清空
          </Button>
        )}
      </div>
    </div>
  )
}

function MenuToastDemo() {
  const toast = useToast()
  return (
    <Menu
      trigger={<Button variant="primary">部署操作</Button>}
      items={[
        {
          id: 'edit',
          label: '编辑环境变量',
          icon: <PencilSimple size={15} />,
          shortcut: '⌘E',
          onSelect: () => toast({ title: '已打开环境变量面板', status: 'info' }),
        },
        {
          id: 'copy',
          label: '复制 Registry 地址',
          icon: <Copy size={15} />,
          shortcut: '⌘C',
          onSelect: () => toast({ title: '地址已复制到剪贴板', status: 'normal' }),
        },
        {
          id: 'rollback',
          label: '回滚至上一版本',
          icon: <Sparkle size={15} />,
          disabled: true,
        },
        {
          id: 'destroy',
          label: '销毁实例',
          icon: <Trash size={15} />,
          danger: true,
          separatorBefore: true,
          onSelect: () => toast({ title: '已提交销毁确认请求', status: 'error' }),
        },
      ]}
    />
  )
}

function ContextMenuHeroDemo() {
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

function ContextMenuCheckedDemo() {
  const [showGrid, setShowGrid] = React.useState(true)
  const [showLabels, setShowLabels] = React.useState(false)
  return (
    <ContextMenu
      items={[
        {
          id: 'grid',
          label: '显示 4 列参考网格',
          icon: <GridFour size={15} />,
          checked: showGrid,
          onSelect: () => setShowGrid((v) => !v),
        },
        {
          id: 'labels',
          label: '显示节点延迟标签',
          icon: <Eye size={15} />,
          checked: showLabels,
          onSelect: () => setShowLabels((v) => !v),
        },
        {
          id: 'reset',
          label: '恢复默认画布视图',
          icon: <Gear size={15} />,
          separatorBefore: true,
          onSelect: () => {
            setShowGrid(true)
            setShowLabels(false)
          },
        },
      ]}
    >
      <div className="flex h-36 w-full max-w-md cursor-context-menu flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-[#CDD3DD] bg-[#F6F7F9] p-4 text-center">
        <span className="text-[13px] font-semibold text-[#1B1F27]">右键切换画布显示选项</span>
        <div className="flex gap-2">
          <HueTag hue={showGrid ? 'mint' : 'periwinkle'} tone={showGrid ? 'soft' : 'neutral'} size="xs">
            参考网格：{showGrid ? '开' : '关'}
          </HueTag>
          <HueTag hue={showLabels ? 'sky' : 'periwinkle'} tone={showLabels ? 'soft' : 'neutral'} size="xs">
            延迟标签：{showLabels ? '开' : '关'}
          </HueTag>
        </div>
      </div>
    </ContextMenu>
  )
}

function MenubarInteractiveDemo() {
  const toast = useToast()
  const [cols, setCols] = React.useState('4 列桌面栅格')
  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>文件</MenubarTrigger>
          <MenubarContent>
            <MenubarItem shortcut="⌘N" onClick={() => toast({ title: '已新建空白画板', status: 'normal' })}>
              新建画板
            </MenubarItem>
            <MenubarItem shortcut="⌘E" onClick={() => toast({ title: '正在导出 Registry JSON', status: 'info' })}>
              导出 Registry
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>编辑</MenubarTrigger>
          <MenubarContent>
            <MenubarItem shortcut="⌘Z" onClick={() => toast({ title: '已撤销上一步操作', status: 'info' })}>
              撤销
            </MenubarItem>
            <MenubarItem shortcut="⇧⌘Z" onClick={() => toast({ title: '已重做操作', status: 'info' })}>
              重做
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>视图</MenubarTrigger>
          <MenubarContent>
            <MenubarItem shortcut="⌘4" onClick={() => setCols('4 列桌面栅格')}>
              4 列桌面栅格
            </MenubarItem>
            <MenubarItem shortcut="⌘2" onClick={() => setCols('2 列平板栅格')}>
              2 列平板栅格
            </MenubarItem>
            <MenubarItem shortcut="⌘1" onClick={() => setCols('1 列移动栅格')}>
              1 列移动栅格
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <span className="text-[12px] text-[#6B7280]">当前布局视图：{cols}</span>
    </div>
  )
}

function NavigationMenuInteractiveDemo() {
  const toast = useToast()
  return (
    <NavigationMenu
      menus={[
        {
          id: 'components',
          label: '组件体系',
          items: [
            {
              title: 'Base UI 原语',
              description: '39 个完整封装的无障碍交互组件',
              badge: '39',
              onClick: () => toast({ title: '导航至 Base UI 原语', status: 'info' }),
            },
            {
              title: 'Recharts v3 图表',
              description: '10 种自适应主题数据可视化组件',
              badge: '10',
              onClick: () => toast({ title: '导航至图表体系', status: 'info' }),
            },
          ],
        },
        {
          id: 'blocks',
          label: '业务卡片',
          items: [
            {
              title: '监控与智能硬件',
              description: '节点拓扑、温湿度与能源仪表盘',
              onClick: () => toast({ title: '导航至监控卡片分类', status: 'normal' }),
            },
            {
              title: 'KPI 与运营分析',
              description: '漏斗、热力图与多维营收对比',
              badge: '热门',
              onClick: () => toast({ title: '导航至运营分析分类', status: 'normal' }),
            },
          ],
        },
        {
          id: 'changelog',
          label: '更新日志',
          onClick: () => toast({ title: '已打开 v2.0 更新日志', status: 'normal' }),
        },
      ]}
    />
  )
}

export const SELECTION_DEMOS: Record<string, ComponentDemoGroup> = {
  select: {
    hero: {
      render: () => <SelectHeroDemo />,
      code: `import * as React from 'react'
import { Select } from '@/components/ui/select'

export function Example() {
  const [region, setRegion] = React.useState('cn-sh')
  return (
    <Select
      value={region}
      onValueChange={setRegion}
      options={[
        { value: 'cn-sh', label: '华东 · 上海', description: '低延迟 12ms', group: '中国区' },
        { value: 'cn-bj', label: '华北 · 北京', description: '双活主节点', group: '中国区' },
        { value: 'ap-sg', label: '亚太 · 新加坡', description: '跨境专线', group: '海外节点' },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'sizes-and-surface',
        title: '紧凑尺寸与纯白画布表面',
        description: '支持 size="sm" / "md" 与 surface="white"，适配画布顶部筛选条。',
        surface: 'canvas',
        minHeight: 160,
        render: () => (
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Select
              size="sm"
              surface="white"
              defaultValue="cn-sh"
              options={REGION_OPTIONS}
            />
            <Select
              size="md"
              surface="white"
              defaultValue="ap-sg"
              options={REGION_OPTIONS}
            />
          </div>
        ),
        code: `import { Select } from '@/components/ui/select'

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Select size="sm" surface="white" defaultValue="cn-sh" options={[{ value: 'cn-sh', label: '华东 · 上海' }]} />
      <Select size="md" surface="white" defaultValue="ap-sg" options={[{ value: 'ap-sg', label: '亚太 · 新加坡' }]} />
    </div>
  )
}`,
      },
      {
        id: 'disabled-options',
        title: '单项禁用与整项禁用',
        description: '单个选项可通过 disabled: true 置灰，整项禁用时自动阻止浮层弹出。',
        minHeight: 160,
        render: () => (
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Select
              defaultValue="standard"
              options={[
                { value: 'standard', label: '标准 NVMe 存储' },
                { value: 'ultra', label: '极速 RAID-10（售罄）', disabled: true },
                { value: 'archive', label: '冷归档对象存储' },
              ]}
            />
            <Select
              disabled
              defaultValue="locked"
              options={[{ value: 'locked', label: '已锁定默认集群' }]}
            />
          </div>
        ),
        code: `import { Select } from '@/components/ui/select'

export function Example() {
  return (
    <Select
      defaultValue="standard"
      options={[
        { value: 'standard', label: '标准 NVMe 存储' },
        { value: 'ultra', label: '极速 RAID-10（售罄）', disabled: true },
      ]}
    />
  )
}`,
      },
      {
        id: 'controlled',
        title: '受控模式与外部切换',
        description: '通过 value 与 onValueChange 实现编程式环境切换。',
        render: () => <SelectControlledDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

export function Example() {
  const [env, setEnv] = React.useState('prod')
  return (
    <div className="flex flex-col gap-3">
      <Select
        value={env}
        onValueChange={setEnv}
        options={[
          { value: 'dev', label: '开发环境' },
          { value: 'prod', label: '生产环境' },
        ]}
      />
      <Button size="sm" onClick={() => setEnv('dev')}>切到开发环境</Button>
    </div>
  )
}`,
      },
    ],
  },

  combobox: {
    hero: {
      render: () => <ComboboxHeroDemo />,
      code: `import * as React from 'react'
import { Combobox, MultiCombobox, type ComboboxOption } from '@/components/ui/combobox'

const ITEMS: ComboboxOption[] = [
  { value: 'base-ui', label: 'Base UI', meta: 'v1.9' },
  { value: 'react', label: 'React 19', meta: '核心框架' },
  { value: 'tailwind', label: 'Tailwind CSS', meta: 'v4' },
]

export function Example() {
  const [single, setSingle] = React.useState<ComboboxOption | null>(ITEMS[0])
  const [multi, setMulti] = React.useState<ComboboxOption[]>([ITEMS[0]])
  return (
    <div className="flex flex-col gap-3">
      <Combobox items={ITEMS} value={single} onValueChange={setSingle} placeholder="单选搜索..." />
      <MultiCombobox items={ITEMS} value={multi} onValueChange={setMulti} placeholder="多选标签..." />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'multi-presets',
        title: '多选标签管理与一键预设（MultiCombobox）',
        description: '结合 MultiCombobox 实现可搜索多选芯片列表，并支持外部快捷填入或清空。',
        render: () => <MultiComboboxPresetsDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { MultiCombobox, type ComboboxOption } from '@/components/ui/combobox'

const ITEMS: ComboboxOption[] = [
  { value: 'base-ui', label: 'Base UI', meta: 'v1.9' },
  { value: 'tailwind', label: 'Tailwind CSS', meta: 'v4' },
]

export function Example() {
  const [tags, setTags] = React.useState<ComboboxOption[]>([ITEMS[0]])
  return (
    <div className="flex flex-col gap-3">
      <MultiCombobox items={ITEMS} value={tags} onValueChange={setTags} />
      <Button size="sm" variant="ghost" onClick={() => setTags([])}>清空已选</Button>
    </div>
  )
}`,
      },
      {
        id: 'empty-and-surface',
        title: '自定义空态文案与纯白表面',
        description: '通过 emptyText 定制无匹配结果时的友好提示，surface="white" 适配浅灰画布。',
        surface: 'canvas',
        minHeight: 160,
        render: () => <ComboboxWhiteSurfaceDemo />,
        code: `import { Combobox } from '@/components/ui/combobox'

export function Example() {
  return (
    <Combobox
      surface="white"
      items={[{ value: 'base-ui', label: 'Base UI', meta: 'v1.9' }]}
      placeholder="输入不存在的词查看空态..."
      emptyText="未找到匹配技术栈，请换个关键字"
    />
  )
}`,
      },
    ],
  },

  autocomplete: {
    hero: {
      render: () => <AutocompleteHeroDemo />,
      code: `import { Autocomplete } from '@/components/ui/autocomplete'

export function Example() {
  return (
    <Autocomplete
      items={['deploy --env=production', 'backup --target=nas-raid', 'restart --service=gateway']}
      placeholder="输入命令行指令..."
    />
  )
}`,
    },
    examples: [
      {
        id: 'controlled-email',
        title: '受控输入与常用邮箱补全',
        description: '与 Combobox 不同，Autocomplete 允许保留任意自由输入文本，同时提供即时候选补全。',
        render: () => <AutocompleteEmailDemo />,
        code: `import * as React from 'react'
import { Autocomplete } from '@/components/ui/autocomplete'

export function Example() {
  const [val, setVal] = React.useState('glaze@')
  return (
    <Autocomplete
      value={val}
      onValueChange={setVal}
      items={['glaze@design.dev', 'ops@glaze.dev', 'security@glaze.dev']}
      placeholder="输入收件人邮箱..."
    />
  )
}`,
      },
      {
        id: 'white-surface',
        title: '画布背景纯白表面（surface="white"）',
        description: '在 #F2F4F8 画布工具栏中保持高辨识度。',
        surface: 'canvas',
        minHeight: 150,
        render: () => (
          <div className="w-full max-w-sm">
            <Autocomplete
              surface="white"
              items={['cn-shanghai-edge', 'cn-beijing-core', 'ap-singapore-01', 'us-silicon-valley']}
              placeholder="快速定位集群节点..."
            />
          </div>
        ),
        code: `import { Autocomplete } from '@/components/ui/autocomplete'

export function Example() {
  return (
    <Autocomplete
      surface="white"
      items={['cn-shanghai-edge', 'ap-singapore-01']}
      placeholder="快速定位集群节点..."
    />
  )
}`,
      },
    ],
  },

  menu: {
    hero: {
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
      code: `import { Copy, DownloadSimple, Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/ui/menu'

export function Example() {
  return (
    <Menu
      trigger={<Button variant="secondary">更多操作</Button>}
      items={[
        { id: 'copy', label: '复制配置', icon: <Copy size={15} />, shortcut: '⌘C' },
        { id: 'export', label: '导出 JSON', icon: <DownloadSimple size={15} />, shortcut: '⌘E' },
        { id: 'del', label: '销毁实例', icon: <Trash size={15} />, danger: true, separatorBefore: true },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'interactive-disabled',
        title: '点击回调、禁用项与分组分隔',
        description: '结合 onSelect 触发 Toast 反馈，支持 disabled 禁用项与 separatorBefore 视觉分组。',
        minHeight: 160,
        render: () => <MenuToastDemo />,
        code: `import { Copy, Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/ui/menu'
import { useToast } from '@/components/ui/toast'

export function Example() {
  const toast = useToast()
  return (
    <Menu
      trigger={<Button>部署操作</Button>}
      items={[
        { id: 'copy', label: '复制地址', icon: <Copy size={15} />, onSelect: () => toast({ title: '已复制' }) },
        { id: 'rollback', label: '回滚版本', disabled: true },
        { id: 'destroy', label: '销毁实例', icon: <Trash size={15} />, danger: true, separatorBefore: true },
      ]}
    />
  )
}`,
      },
      {
        id: 'placement',
        title: '弹出方向与对齐方式（side / align）',
        description: '灵活控制浮层相对于触发按钮的弹出方位与对齐边缘。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <Menu
              side="bottom"
              align="start"
              trigger={<Button variant="secondary" size="sm">下方左对齐</Button>}
              items={[
                { id: 'a', label: '新建目录', icon: <FolderPlus size={15} /> },
                { id: 'b', label: '重命名', icon: <PencilSimple size={15} /> },
              ]}
            />
            <Menu
              side="top"
              align="center"
              trigger={<Button variant="secondary" size="sm">上方居中</Button>}
              items={[
                { id: 'a', label: '复制配置', icon: <Copy size={15} /> },
                { id: 'b', label: '分享链接', icon: <ShareNetwork size={15} /> },
              ]}
            />
            <Menu
              side="right"
              align="start"
              trigger={<Button variant="secondary" size="sm">右侧展开</Button>}
              items={[
                { id: 'a', label: '查看详情', icon: <Eye size={15} /> },
                { id: 'b', label: '系统设置', icon: <Gear size={15} /> },
              ]}
            />
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Menu } from '@/components/ui/menu'

export function Example() {
  return (
    <div className="flex gap-3">
      <Menu side="bottom" align="start" trigger={<Button size="sm">下方左对齐</Button>} items={[{ id: 'a', label: '新建' }]} />
      <Menu side="top" align="center" trigger={<Button size="sm">上方居中</Button>} items={[{ id: 'a', label: '复制' }]} />
      <Menu side="right" align="start" trigger={<Button size="sm">右侧展开</Button>} items={[{ id: 'a', label: '详情' }]} />
    </div>
  )
}`,
      },
    ],
  },

  'context-menu': {
    hero: {
      render: () => <ContextMenuHeroDemo />,
      code: `import { Copy, ShareNetwork, Trash } from '@phosphor-icons/react'
import { ContextMenu } from '@/components/ui/context-menu'

export function Example() {
  return (
    <ContextMenu
      items={[
        { id: 'copy', label: '复制链接', icon: <Copy size={15} />, shortcut: '⌘C' },
        { id: 'share', label: '分享节点', icon: <ShareNetwork size={15} />, shortcut: '⌘S' },
        { id: 'delete', label: '删除项目', icon: <Trash size={15} />, danger: true, separatorBefore: true },
      ]}
    >
      <div className="rounded-[20px] bg-[#F6F7F9] p-8 text-center">右键点击这里</div>
    </ContextMenu>
  )
}`,
    },
    examples: [
      {
        id: 'checked-options',
        title: '带勾选状态的画布右键菜单（checked）',
        description: '为菜单项传入 checked 布尔值即可渲染可切换勾选状态，常用于画布视图开关。',
        render: () => <ContextMenuCheckedDemo />,
        code: `import * as React from 'react'
import { GridFour } from '@phosphor-icons/react'
import { ContextMenu } from '@/components/ui/context-menu'

export function Example() {
  const [showGrid, setShowGrid] = React.useState(true)
  return (
    <ContextMenu
      items={[
        { id: 'grid', label: '显示参考网格', icon: <GridFour size={15} />, checked: showGrid, onSelect: () => setShowGrid((v) => !v) },
      ]}
    >
      <div className="rounded-[20px] bg-[#F6F7F9] p-8 text-center">右键切换参考网格</div>
    </ContextMenu>
  )
}`,
      },
      {
        id: 'per-card-actions',
        title: '多卡片独立右键操作',
        description: '为列表或网格中的每张卡片包裹 ContextMenu，针对各自节点上下文执行独立操作。',
        surface: 'canvas',
        render: () => (
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            {[
              { id: 'cn-sh-01', name: '华东边缘 #1', latency: '11ms' },
              { id: 'ap-sg-02', name: '新加坡节点 #2', latency: '38ms' },
            ].map((node) => (
              <ContextMenu
                key={node.id}
                items={[
                  { id: 'inspect', label: `查看 ${node.id} 日志`, icon: <Eye size={15} /> },
                  { id: 'copy', label: '复制节点 ID', icon: <Copy size={15} />, shortcut: '⌘C' },
                  { id: 'restart', label: '重启该节点', icon: <Trash size={15} />, danger: true, separatorBefore: true },
                ]}
              >
                <div className="flex cursor-context-menu flex-col gap-1 rounded-[20px] bg-white p-4">
                  <span className="text-[13px] font-bold text-[#123A5C]">{node.name}</span>
                  <span className="text-[12px] text-[#6B7280]">延迟 {node.latency} · 右键操作</span>
                </div>
              </ContextMenu>
            ))}
          </div>
        ),
        code: `import { Copy, Eye, Trash } from '@phosphor-icons/react'
import { ContextMenu } from '@/components/ui/context-menu'

export function Example() {
  return (
    <ContextMenu
      items={[
        { id: 'inspect', label: '查看节点日志', icon: <Eye size={15} /> },
        { id: 'copy', label: '复制节点 ID', icon: <Copy size={15} />, shortcut: '⌘C' },
        { id: 'restart', label: '重启节点', icon: <Trash size={15} />, danger: true, separatorBefore: true },
      ]}
    >
      <div className="rounded-[20px] bg-white p-4">华东边缘 #1（右键操作）</div>
    </ContextMenu>
  )
}`,
      },
    ],
  },

  menubar: {
    hero: {
      render: () => (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>文件</MenubarTrigger>
            <MenubarContent>
              <MenubarItem shortcut="⌘N">新建画板</MenubarItem>
              <MenubarItem shortcut="⌘E">导出 Registry</MenubarItem>
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
          <MenubarItem shortcut="⌘N">新建画板</MenubarItem>
          <MenubarItem shortcut="⌘E">导出 Registry</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>4 列桌面栅格</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
    },
    examples: [
      {
        id: 'shortcuts-and-actions',
        title: '多菜单快捷键与状态联动',
        description: '打开任意菜单后左右移动指针或方向键可无缝在菜单项间滑移切换。',
        render: () => <MenubarInteractiveDemo />,
        code: `import * as React from 'react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

export function Example() {
  const [cols, setCols] = React.useState('4 列桌面栅格')
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘4" onClick={() => setCols('4 列桌面栅格')}>4 列桌面栅格</MenubarItem>
          <MenubarItem shortcut="⌘2" onClick={() => setCols('2 列平板栅格')}>2 列平板栅格</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
      },
      {
        id: 'workspace-header',
        title: '工作台顶栏组合布局',
        description: '将 Menubar 嵌入浅灰画布顶部工具栏，与状态标签及主操作按钮协同排布。',
        surface: 'canvas',
        minHeight: 150,
        render: () => (
          <div className="flex w-full max-w-lg flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white px-4 py-2.5">
            <Menubar className="bg-transparent p-0">
              <MenubarMenu>
                <MenubarTrigger>项目</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem shortcut="⌘O">切换工作区</MenubarItem>
                  <MenubarItem shortcut="⌘,">偏好设置</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>部署</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem shortcut="⌘D">发布预发环境</MenubarItem>
                  <MenubarItem shortcut="⇧⌘D">发布生产环境</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <div className="flex items-center gap-2">
              <HueTag hue="mint" size="xs">已同步</HueTag>
              <Button size="sm" variant="primary">发布</Button>
            </div>
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

export function Example() {
  return (
    <div className="flex items-center justify-between rounded-[20px] bg-white px-4 py-2.5">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>项目</MenubarTrigger>
          <MenubarContent>
            <MenubarItem shortcut="⌘O">切换工作区</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Button size="sm">发布</Button>
    </div>
  )
}`,
      },
    ],
  },

  'navigation-menu': {
    hero: {
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
          items: [
            { title: 'shadcn Registry', description: '通过 CLI 按需安装', badge: 'v2' },
            { title: 'Base UI 1.9', description: '原生无障碍与纯 CSS 过渡' },
          ],
        },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'mixed-links-and-callbacks',
        title: '下拉面板与直达链接混排',
        description: '省略 items 并传入 onClick 即可作为顶级直达入口；子项支持 badge 与点击回调。',
        render: () => <NavigationMenuInteractiveDemo />,
        code: `import { NavigationMenu } from '@/components/ui/navigation-menu'

export function Example() {
  return (
    <NavigationMenu
      menus={[
        {
          id: 'components',
          label: '组件体系',
          items: [{ title: 'Base UI 原语', description: '39 个交互组件', badge: '39' }],
        },
        {
          id: 'changelog',
          label: '更新日志',
          onClick: () => console.log('open changelog'),
        },
      ]}
    />
  )
}`,
      },
      {
        id: 'canvas-navbar',
        title: '顶栏导航条集成',
        description: '置于站点 Header 中与品牌标识和 CTA 按钮组合，提供平滑的浮层视口过渡。',
        surface: 'canvas',
        minHeight: 160,
        render: () => (
          <div className="flex w-full max-w-xl flex-wrap items-center justify-between gap-3 rounded-[22px] bg-white px-5 py-3">
            <span className="font-glaze-display text-[17px] font-extrabold text-[#123A5C]">Glaze</span>
            <NavigationMenu
              menus={[
                {
                  id: 'guides',
                  label: '指南',
                  items: [
                    { title: '快速安装', description: '3 分钟配置 @glaze Registry', badge: '推荐' },
                    { title: '色彩与动效', description: '9 组柔彩与 CSS 优先动效红线' },
                  ],
                },
                { id: 'demos', label: 'Demo 展厅', onClick: () => {} },
              ]}
            />
            <Button size="sm" variant="primary">开始使用</Button>
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'
import { NavigationMenu } from '@/components/ui/navigation-menu'

export function Example() {
  return (
    <header className="flex items-center justify-between rounded-[22px] bg-white px-5 py-3">
      <span className="font-bold">Glaze</span>
      <NavigationMenu
        menus={[
          { id: 'guides', label: '指南', items: [{ title: '快速安装', description: '配置 @glaze Registry' }] },
          { id: 'demos', label: 'Demo 展厅', onClick: () => {} },
        ]}
      />
      <Button size="sm">开始使用</Button>
    </header>
  )
}`,
      },
    ],
  },
}
