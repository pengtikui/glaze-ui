import * as React from 'react'
import {
  ArrowUpRight,
  Bell,
  CalendarBlank,
  ChartBar,
  CloudCheck,
  Cpu,
  Gear,
  House,
  Lightning,
  ListBullets,
  ShieldCheck,
  Sparkle,
  SquaresFour,
  TerminalWindow,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { CountBadge } from '@/components/ui/count-badge'
import { Grid } from '@/components/ui/grid'
import { HueTag } from '@/components/ui/hue-tag'
import { IconTile } from '@/components/ui/icon-tile'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Textarea } from '@/components/ui/textarea'
import { Tile, useTileTheme } from '@/components/ui/tile'
import type { ComponentDemoGroup } from '@/docs/examples/types'

const ALL_HUES = [
  'sky',
  'mint',
  'peach',
  'lilac',
  'rose',
  'lemon',
  'aqua',
  'periwinkle',
  'coral',
] as const

function TileThemeReader() {
  const theme = useTileTheme()
  return (
    <div className="mt-2 flex items-center justify-between text-[12px]" style={{ color: theme.soft }}>
      <span>dark: {String(Boolean(theme.dark))}</span>
      <span className="font-glaze-mono" style={{ color: theme.accent }}>
        {theme.accent}
      </span>
    </div>
  )
}

function CountBadgeInteractiveDemo() {
  const [count, setCount] = React.useState(7)
  const display = count > 99 ? '99+' : count
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-[#F6F7F9] px-4 py-2">
        <Bell size={16} weight="bold" className="text-[#1B1F27]" />
        <span className="text-[13px] font-semibold">未读消息</span>
        <CountBadge count={display} hue="coral" />
      </div>
      <div className="flex items-center gap-1.5">
        <Button size="sm" variant="secondary" onClick={() => setCount((c) => Math.max(0, c - 1))}>
          -1
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>
          +1
        </Button>
        <Button size="sm" variant="soft" hue="periwinkle" onClick={() => setCount(120)}>
          设为 120
        </Button>
      </div>
    </div>
  )
}

function TextareaControlledDemo() {
  const [text, setText] = React.useState('完成 Base UI 1.9 浮层纯 CSS 动画迁移，移除所有 JS 弹簧依赖。')
  const max = 140
  const remaining = max - text.length
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Textarea
        rows={3}
        maxLength={max}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入发布变更日志..."
      />
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-[#6B7280]">支持受控模式与字数限制</span>
        <span className={remaining < 20 ? 'font-bold text-[#A6360F]' : 'font-medium text-[#6B7280]'}>
          {text.length} / {max}
        </span>
      </div>
    </div>
  )
}

function SegmentedBasicDemo() {
  const [v, setV] = React.useState<'day' | 'week' | 'month'>('week')
  return (
    <SegmentedControl
      value={v}
      onValueChange={setV}
      ariaLabel="统计时间区间"
      options={[
        { value: 'day', label: '今日' },
        { value: 'week', label: '近 7 天' },
        { value: 'month', label: '本月' },
      ]}
    />
  )
}

function SegmentedIconsDemo() {
  const [view, setView] = React.useState<'bento' | 'list' | 'chart'>('bento')
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl
        value={view}
        onValueChange={setView}
        ariaLabel="视图切换"
        options={[
          { value: 'bento', label: '网格', icon: <SquaresFour size={15} weight="bold" /> },
          { value: 'list', label: '列表', icon: <ListBullets size={15} weight="bold" />, badge: 12 },
          { value: 'chart', label: '趋势', icon: <ChartBar size={15} weight="bold" />, badge: '新' },
        ]}
      />
      <span className="text-[12px] text-[#6B7280]">当前选中视图：{view}</span>
    </div>
  )
}

function SegmentedSizesDemo() {
  const [sm, setSm] = React.useState<'all' | 'online' | 'alert'>('all')
  const [md, setMd] = React.useState<'all' | 'online' | 'alert'>('online')
  const opts = [
    { value: 'all' as const, label: '全部节点' },
    { value: 'online' as const, label: '在线' },
    { value: 'alert' as const, label: '告警' },
  ]
  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedControl size="sm" value={sm} onValueChange={setSm} options={opts} />
      <SegmentedControl size="md" value={md} onValueChange={setMd} options={opts} />
    </div>
  )
}

function SegmentedDarkDemo() {
  const [tab, setTab] = React.useState<'realtime' | 'history' | 'forecast'>('realtime')
  return (
    <SegmentedControl
      dark
      value={tab}
      onValueChange={setTab}
      options={[
        { value: 'realtime', label: '实时流量' },
        { value: 'history', label: '历史回放' },
        { value: 'forecast', label: '容量预测', badge: 'AI' },
      ]}
    />
  )
}

export const PRIMITIVES_DEMOS: Record<string, ComponentDemoGroup> = {
  grid: {
    hero: {
      align: 'start',
      surface: 'canvas',
      render: () => (
        <Grid>
          <Tile size="s" tone="sky">
            <span className="text-[13px] font-bold">S (1×1)</span>
            <span className="font-glaze-display text-[32px] font-extrabold">24</span>
          </Tile>
          <Tile size="s" tone="mint">
            <span className="text-[13px] font-bold">S (1×1)</span>
            <span className="font-glaze-display text-[32px] font-extrabold">99.9%</span>
          </Tile>
          <Tile size="w" tone="white">
            <span className="text-[13px] font-bold">W (2×1 宽格)</span>
            <span className="text-[13px] text-[#5B6170]">
              桌面默认 4 列 dense 排布，平板自动 2 列，手机单列堆叠。
            </span>
          </Tile>
        </Grid>
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
    examples: [
      {
        id: 'tile-sizes',
        title: '五种标准占格组合（s / w / t / l / f）',
        description: '搭配 Tile 的 size 属性，快速构建经典 4 列 Bento 仪表盘骨架。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <Grid>
            <Tile size="l" tone="sky-dark">
              <span className="text-[12px] font-semibold opacity-75">size=&quot;l&quot; · 2×2 英雄大卡</span>
              <span className="mt-auto font-glaze-display text-[38px] font-extrabold">42.8k</span>
              <span className="text-[13px] opacity-80">核心实时并发连接</span>
            </Tile>
            <Tile size="t" tone="white">
              <span className="text-[12px] font-semibold text-[#6B7280]">size=&quot;t&quot; · 1×2 竖格</span>
              <span className="mt-auto text-[13px] text-[#5B6170]">适合榜单、时间线与待办清单</span>
            </Tile>
            <Tile size="s" tone="mint">
              <span className="text-[12px] font-semibold">size=&quot;s&quot; · 1×1</span>
              <span className="mt-auto font-glaze-display text-[28px] font-extrabold">14/14</span>
            </Tile>
            <Tile size="s" tone="peach">
              <span className="text-[12px] font-semibold">size=&quot;s&quot; · 1×1</span>
              <span className="mt-auto font-glaze-display text-[28px] font-extrabold">18ms</span>
            </Tile>
            <Tile size="f" tone="white" padding="compact">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold">size=&quot;f&quot; · 通栏 4 列</span>
                <HueTag hue="periwinkle" size="sm">数据表格 / 甘特排期</HueTag>
              </div>
            </Tile>
          </Grid>
        ),
        code: `import { Grid } from '@/components/ui/grid'
import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Grid>
      <Tile size="l" tone="sky-dark">2×2 英雄大卡</Tile>
      <Tile size="t" tone="white">1×2 竖格</Tile>
      <Tile size="s" tone="mint">1×1 小格</Tile>
      <Tile size="s" tone="peach">1×1 小格</Tile>
      <Tile size="f" tone="white">4 列通栏卡片</Tile>
    </Grid>
  )
}`,
      },
      {
        id: 'force-cols',
        title: '固定列数（forceCols）',
        description: '通过 forceCols 强制锁定 2 列或 1 列布局，适用于侧边栏抽屉或嵌套子面板。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <Grid forceCols={2}>
            <Tile tone="white" padding="compact" className="min-h-24">
              <span className="text-[12px] text-[#6B7280]">forceCols={2} · 左栏</span>
              <span className="font-glaze-display text-[22px] font-extrabold">68%</span>
            </Tile>
            <Tile tone="lilac" padding="compact" className="min-h-24">
              <span className="text-[12px] opacity-75">forceCols={2} · 右栏</span>
              <span className="font-glaze-display text-[22px] font-extrabold">32%</span>
            </Tile>
          </Grid>
        ),
        code: `import { Grid } from '@/components/ui/grid'
import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Grid forceCols={2}>
      <Tile tone="white" padding="compact">左栏内容</Tile>
      <Tile tone="lilac" padding="compact">右栏内容</Tile>
    </Grid>
  )
}`,
      },
    ],
  },

  tile: {
    hero: {
      align: 'start',
      surface: 'canvas',
      render: () => (
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {(['white', 'sky', 'mint', 'sky-dark'] as const).map((tone) => (
            <Tile key={tone} tone={tone} interactive className="min-h-32">
              <span className="text-[12px] font-semibold opacity-75">tone=&quot;{tone}&quot;</span>
              <span className="mt-auto font-glaze-display text-[20px] font-extrabold">釉面卡片</span>
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
    examples: [
      {
        id: 'pastel-hues',
        title: '9 组柔彩色相',
        description: '所有柔彩卡片均遵循无描边、无阴影原则，依靠色块底色与画布形成柔和层次。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <div className="grid w-full grid-cols-3 gap-3">
            {ALL_HUES.map((hue) => (
              <Tile key={hue} tone={hue} padding="compact" className="min-h-24">
                <span className="font-glaze-mono text-[11px] font-bold opacity-75">{hue}</span>
                <span className="mt-auto font-glaze-display text-[16px] font-extrabold">Glaze {hue}</span>
              </Tile>
            ))}
          </div>
        ),
        code: `import { Tile } from '@/components/ui/tile'

const HUES = ['sky', 'mint', 'peach', 'lilac', 'rose', 'lemon', 'aqua', 'periwinkle', 'coral'] as const

export function Example() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {HUES.map((hue) => (
        <Tile key={hue} tone={hue} padding="compact">
          <span>{hue}</span>
        </Tile>
      ))}
    </div>
  )
}`,
      },
      {
        id: 'dark-tones',
        title: '4 组深色聚焦卡',
        description: '仪表盘中建议最多放置 1–2 张深色聚焦卡（sky-dark / lilac-dark / aqua-dark / ink）用于视觉锚点。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {(['sky-dark', 'lilac-dark', 'aqua-dark', 'ink'] as const).map((tone) => (
              <Tile key={tone} tone={tone} padding="compact" className="min-h-28">
                <span className="font-glaze-mono text-[11px] opacity-75">{tone}</span>
                <span className="mt-auto font-glaze-display text-[22px] font-extrabold">聚焦卡</span>
              </Tile>
            ))}
          </div>
        ),
        code: `import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Tile tone="sky-dark" padding="compact">sky-dark</Tile>
      <Tile tone="lilac-dark" padding="compact">lilac-dark</Tile>
      <Tile tone="aqua-dark" padding="compact">aqua-dark</Tile>
      <Tile tone="ink" padding="compact">ink</Tile>
    </div>
  )
}`,
      },
      {
        id: 'interactive-and-context',
        title: '链接卡片、内边距与 useTileTheme 上下文',
        description: '传入 href 自动渲染为可点击链接卡片；子组件可通过 useTileTheme() 自动同步当前卡片的配色与深浅状态。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <Tile
              tone="white"
              interactive
              href="#example-interactive-and-context"
              padding="default"
              className="min-h-32"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold">链接卡片</span>
                <ArrowUpRight size={16} weight="bold" />
              </div>
              <TileThemeReader />
            </Tile>
            <Tile tone="periwinkle" padding="compact" className="min-h-32">
              <span className="text-[13px] font-bold">padding=&quot;compact&quot;</span>
              <TileThemeReader />
            </Tile>
            <Tile tone="aqua-dark" padding="compact" className="min-h-32">
              <span className="text-[13px] font-bold">深色上下文自动适配</span>
              <TileThemeReader />
            </Tile>
          </div>
        ),
        code: `import { Tile, useTileTheme } from '@/components/ui/tile'

function ThemeBadge() {
  const theme = useTileTheme()
  return <span style={{ color: theme.accent }}>dark: {String(Boolean(theme.dark))}</span>
}

export function Example() {
  return (
    <Tile tone="aqua-dark" interactive href="#details">
      <span className="font-bold">深色卡片上下文</span>
      <ThemeBadge />
    </Tile>
  )
}`,
      },
    ],
  },

  'status-pill': {
    hero: {
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
      <StatusPill status="info" label="构建部署中" />
      <StatusPill status="disabled" label="已停用" />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'sizes',
        title: '紧凑与标准尺寸',
        description: '通过 size="sm" 适配表格行或密集列表，默认 size="md" 用于卡片标题与详情页。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill size="sm" status="normal" label="在线" />
              <StatusPill size="sm" status="warning" label="排队中" />
              <StatusPill size="sm" status="error" label="失败" />
              <StatusPill size="sm" status="info" label="同步中" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill size="md" status="normal" label="在线" />
              <StatusPill size="md" status="warning" label="排队中" />
              <StatusPill size="md" status="error" label="失败" />
              <StatusPill size="md" status="info" label="同步中" />
            </div>
          </div>
        ),
        code: `import { StatusPill } from '@/components/ui/status-pill'

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <StatusPill size="sm" status="normal" label="紧凑尺寸" />
      <StatusPill size="md" status="normal" label="标准尺寸" />
    </div>
  )
}`,
      },
      {
        id: 'without-dot',
        title: '纯文本模式与默认语义文案',
        description: '设置 showDot={false} 隐藏前置圆点；省略 label 时自动使用语义预设文案。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusPill status="normal" showDot={false} label="SLA 99.99%" />
            <StatusPill status="info" showDot={false} label="v2.4.0-rc1" />
            <StatusPill status="warning" showDot={false} label="仅剩 3 天" />
            <StatusPill status="normal" />
            <StatusPill status="error" />
          </div>
        ),
        code: `import { StatusPill } from '@/components/ui/status-pill'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusPill status="normal" showDot={false} label="SLA 99.99%" />
      <StatusPill status="info" showDot={false} label="v2.4.0-rc1" />
      <StatusPill status="normal" />
    </div>
  )
}`,
      },
    ],
  },

  'hue-tag': {
    hero: {
      render: () => (
        <div className="flex flex-wrap items-center gap-2">
          {ALL_HUES.map((h) => (
            <HueTag key={h} hue={h}>
              {h}
            </HueTag>
          ))}
        </div>
      ),
      code: `import { HueTag } from '@/components/ui/hue-tag'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <HueTag hue="periwinkle">Base UI 1.9</HueTag>
      <HueTag hue="mint">生产环境</HueTag>
      <HueTag hue="coral">高优先级</HueTag>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'tones',
        title: '三种填充风格（soft / solid / neutral）',
        description: 'soft 用于柔彩辅助标签，solid 用于高强调焦点标识，neutral 用于低干扰元信息。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <HueTag hue="sky" tone="soft">Soft 柔和</HueTag>
              <HueTag hue="mint" tone="soft">Soft 薄荷</HueTag>
              <HueTag hue="coral" tone="soft">Soft 珊瑚</HueTag>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <HueTag hue="sky" tone="solid">Solid 实心</HueTag>
              <HueTag hue="periwinkle" tone="solid">Solid 强调</HueTag>
              <HueTag hue="coral" tone="solid">Solid 紧急</HueTag>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <HueTag tone="neutral">Neutral 中性</HueTag>
              <HueTag tone="neutral">React 19</HueTag>
              <HueTag tone="neutral">Tailwind v4</HueTag>
            </div>
          </div>
        ),
        code: `import { HueTag } from '@/components/ui/hue-tag'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <HueTag hue="sky" tone="soft">柔和标签</HueTag>
      <HueTag hue="periwinkle" tone="solid">实心强调</HueTag>
      <HueTag tone="neutral">中性信息</HueTag>
    </div>
  )
}`,
      },
      {
        id: 'sizes',
        title: '三级尺寸（xs / sm / md）',
        description: '根据所在容器密度选择 xs、sm 或 md 尺寸。',
        minHeight: 140,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <HueTag hue="lilac" size="xs">XS 超小</HueTag>
            <HueTag hue="lilac" size="sm">SM 紧凑</HueTag>
            <HueTag hue="lilac" size="md">MD 标准</HueTag>
          </div>
        ),
        code: `import { HueTag } from '@/components/ui/hue-tag'

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <HueTag hue="lilac" size="xs">XS</HueTag>
      <HueTag hue="lilac" size="sm">SM</HueTag>
      <HueTag hue="lilac" size="md">MD</HueTag>
    </div>
  )
}`,
      },
    ],
  },

  'status-dot': {
    hero: {
      render: () => (
        <div className="flex flex-wrap items-center gap-6">
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
    examples: [
      {
        id: 'modes',
        title: '三种动效模式（static / ripple / blink）',
        description: 'static 静态展示，ripple 脉冲水波扩散，blink 柔和呼吸闪烁，适用于实时监控节点。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2.5">
              <StatusDot status="normal" mode="static" size="lg" />
              <span className="text-[13px] font-semibold">static 静态</span>
            </div>
            <div className="flex items-center gap-2.5">
              <StatusDot status="normal" mode="ripple" size="lg" />
              <span className="text-[13px] font-semibold">ripple 脉冲波纹</span>
            </div>
            <div className="flex items-center gap-2.5">
              <StatusDot status="error" mode="blink" size="lg" />
              <span className="text-[13px] font-semibold">blink 告警闪烁</span>
            </div>
          </div>
        ),
        code: `import { StatusDot } from '@/components/ui/status-dot'

export function Example() {
  return (
    <div className="flex items-center gap-6">
      <StatusDot status="normal" mode="static" size="lg" />
      <StatusDot status="normal" mode="ripple" size="lg" />
      <StatusDot status="error" mode="blink" size="lg" />
    </div>
  )
}`,
      },
      {
        id: 'sizes-and-color',
        title: '尺寸规格与自定义颜色',
        description: '支持预设 sm / md / lg 或精确像素值，并可通过 color 覆盖语义色。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <StatusDot status="info" size="sm" />
              <span className="text-[12px] text-[#6B7280]">sm</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="info" size="md" />
              <span className="text-[12px] text-[#6B7280]">md</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="info" size="lg" />
              <span className="text-[12px] text-[#6B7280]">lg</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot color="#7B80EA" mode="ripple" size={14} />
              <span className="text-[12px] text-[#6B7280]">自定义 #7B80EA (14px)</span>
            </div>
          </div>
        ),
        code: `import { StatusDot } from '@/components/ui/status-dot'

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <StatusDot status="info" size="sm" />
      <StatusDot status="info" size="md" />
      <StatusDot status="info" size="lg" />
      <StatusDot color="#7B80EA" mode="ripple" size={14} />
    </div>
  )
}`,
      },
    ],
  },

  'count-badge': {
    hero: {
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <CountBadge count={3} hue="coral" />
          <CountBadge count={18} hue="periwinkle" />
          <CountBadge count={99} hue="mint" />
          <CountBadge count="99+" hue="sky" />
          <CountBadge count={12} hue="ink" />
          <CountBadge count={5} hue="neutral" />
        </div>
      ),
      code: `import { CountBadge } from '@/components/ui/count-badge'

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <CountBadge count={3} hue="coral" />
      <CountBadge count="99+" hue="sky" />
      <CountBadge count={12} hue="ink" />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'interactive-counter',
        title: '动态更新与 99+ 溢出展示',
        description: '结合 React 状态动态增减计数，超过阈值时优雅展示字符串 99+。',
        minHeight: 150,
        render: () => <CountBadgeInteractiveDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { CountBadge } from '@/components/ui/count-badge'

export function Example() {
  const [count, setCount] = React.useState(7)
  return (
    <div className="flex items-center gap-3">
      <CountBadge count={count > 99 ? '99+' : count} hue="coral" />
      <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>+1</Button>
    </div>
  )
}`,
      },
      {
        id: 'in-navigation',
        title: '附着于列表项与按钮',
        description: '常用于侧边栏导航、通知按钮及待处理工单数量标注。',
        minHeight: 160,
        render: () => (
          <div className="flex w-full max-w-xs flex-col gap-1.5">
            {[
              { label: '告警事件', count: 4, hue: 'coral' as const },
              { label: '待审批工单', count: 16, hue: 'periwinkle' as const },
              { label: '已归档快照', count: '99+', hue: 'neutral' as const },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-[14px] bg-[#F6F7F9] px-4 py-2.5 text-[13px] font-semibold"
              >
                <span>{row.label}</span>
                <CountBadge count={row.count} hue={row.hue} />
              </div>
            ))}
          </div>
        ),
        code: `import { CountBadge } from '@/components/ui/count-badge'

export function Example() {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-[#F6F7F9] px-4 py-2.5">
      <span className="text-[13px] font-semibold">待审批工单</span>
      <CountBadge count={16} hue="periwinkle" />
    </div>
  )
}`,
      },
    ],
  },

  'icon-tile': {
    hero: {
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <IconTile hue="sky" size="md"><House size={20} weight="duotone" /></IconTile>
          <IconTile hue="mint" size="md"><Sparkle size={20} weight="duotone" /></IconTile>
          <IconTile hue="peach" size="md"><Bell size={20} weight="duotone" /></IconTile>
          <IconTile hue="periwinkle" size="lg"><Gear size={24} weight="duotone" /></IconTile>
          <IconTile hue="coral-solid" size="lg"><Lightning size={24} weight="fill" /></IconTile>
        </div>
      ),
      code: `import { House } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'

export function Example() {
  return <IconTile hue="sky" size="md"><House size={20} weight="duotone" /></IconTile>
}`,
    },
    examples: [
      {
        id: 'sizes-and-radius',
        title: '尺寸规格与圆角形态',
        description: '支持 sm / md / lg / xl 四级尺寸，以及 icon（微圆角）、app（应用圆角）和 full（正圆）三种形态。',
        minHeight: 170,
        render: () => (
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-end gap-3">
              <IconTile hue="sky" size="sm"><Cpu size={15} weight="duotone" /></IconTile>
              <IconTile hue="sky" size="md"><Cpu size={20} weight="duotone" /></IconTile>
              <IconTile hue="sky" size="lg"><Cpu size={24} weight="duotone" /></IconTile>
              <IconTile hue="sky" size="xl"><Cpu size={28} weight="duotone" /></IconTile>
            </div>
            <div className="flex items-center gap-3">
              <IconTile hue="periwinkle" radius="icon"><TerminalWindow size={20} weight="duotone" /></IconTile>
              <IconTile hue="periwinkle" radius="app"><TerminalWindow size={20} weight="duotone" /></IconTile>
              <IconTile hue="periwinkle" radius="full"><TerminalWindow size={20} weight="duotone" /></IconTile>
            </div>
          </div>
        ),
        code: `import { Cpu } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <IconTile hue="sky" size="sm" radius="icon"><Cpu size={15} /></IconTile>
      <IconTile hue="sky" size="md" radius="app"><Cpu size={20} /></IconTile>
      <IconTile hue="sky" size="lg" radius="full"><Cpu size={24} /></IconTile>
    </div>
  )
}`,
      },
      {
        id: 'badges-and-dark',
        title: '数字角标与深色毛玻璃变体',
        description: '传入 badge 在右上角展示数字红点；dark 与 dark-glass 专为深色釉面卡片打造。',
        surface: 'dark',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center gap-4">
            <IconTile hue="dark-glass" size="lg" badge={3} badgeRingColor="#123A5C">
              <Bell size={22} weight="duotone" />
            </IconTile>
            <IconTile hue="dark" size="lg" badge={12} badgeRingColor="#123A5C">
              <ShieldCheck size={22} weight="duotone" />
            </IconTile>
            <IconTile hue="coral-solid" size="lg" radius="full">
              <CloudCheck size={22} weight="fill" />
            </IconTile>
            <IconTile hue="neutral" size="lg">
              <CalendarBlank size={22} weight="duotone" />
            </IconTile>
          </div>
        ),
        code: `import { Bell, ShieldCheck } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <IconTile hue="dark-glass" size="lg" badge={3} badgeRingColor="#123A5C">
        <Bell size={22} />
      </IconTile>
      <IconTile hue="dark" size="lg" badge={12} badgeRingColor="#123A5C">
        <ShieldCheck size={22} />
      </IconTile>
    </div>
  )
}`,
      },
    ],
  },

  textarea: {
    hero: {
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
    examples: [
      {
        id: 'white-surface',
        title: '画布上的纯白表面（surface="white"）',
        description: '当 Textarea 直接置于 #F2F4F8 画布或柔彩背景上时，使用 surface="white" 保持清晰反差。',
        surface: 'canvas',
        minHeight: 170,
        render: () => (
          <div className="w-full max-w-md">
            <Textarea surface="white" rows={3} placeholder="在画布背景上使用纯白表面..." />
          </div>
        ),
        code: `import { Textarea } from '@/components/ui/textarea'

export function Example() {
  return <Textarea surface="white" rows={3} placeholder="在画布背景上使用纯白表面..." />
}`,
      },
      {
        id: 'controlled-counter',
        title: '受控输入与字数统计',
        description: '结合 value 与 onChange 实时统计剩余字数并在临近上限时给出提示。',
        render: () => <TextareaControlledDemo />,
        code: `import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'

export function Example() {
  const [text, setText] = React.useState('')
  return (
    <div className="flex flex-col gap-2">
      <Textarea rows={3} maxLength={140} value={text} onChange={(e) => setText(e.target.value)} />
      <span className="text-right text-[12px] text-[#6B7280]">{text.length} / 140</span>
    </div>
  )
}`,
      },
      {
        id: 'disabled-readonly',
        title: '禁用与只读状态',
        description: '原生支持 disabled 与 readOnly 属性，保持可访问焦点与柔和视觉降权。',
        minHeight: 170,
        render: () => (
          <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            <Textarea rows={3} disabled defaultValue="已归档的部署记录，禁止编辑。" />
            <Textarea rows={3} readOnly defaultValue="只读配置摘要：cn-sh-edge-01 / 4C8G / TLS 1.3" />
          </div>
        ),
        code: `import { Textarea } from '@/components/ui/textarea'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Textarea rows={3} disabled defaultValue="禁用状态" />
      <Textarea rows={3} readOnly defaultValue="只读内容" />
    </div>
  )
}`,
      },
    ],
  },

  'segmented-control': {
    hero: {
      render: () => <SegmentedBasicDemo />,
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
    examples: [
      {
        id: 'icons-and-badges',
        title: '带图标与数量徽标',
        description: '选项支持 icon 与 badge 字段，适用于视图切换或状态过滤栏。',
        minHeight: 160,
        render: () => <SegmentedIconsDemo />,
        code: `import * as React from 'react'
import { ChartBar, ListBullets, SquaresFour } from '@phosphor-icons/react'
import { SegmentedControl } from '@/components/ui/segmented-control'

export function Example() {
  const [view, setView] = React.useState<'bento' | 'list' | 'chart'>('bento')
  return (
    <SegmentedControl
      value={view}
      onValueChange={setView}
      options={[
        { value: 'bento', label: '网格', icon: <SquaresFour size={15} weight="bold" /> },
        { value: 'list', label: '列表', icon: <ListBullets size={15} weight="bold" />, badge: 12 },
        { value: 'chart', label: '趋势', icon: <ChartBar size={15} weight="bold" />, badge: '新' },
      ]}
    />
  )
}`,
      },
      {
        id: 'sizes',
        title: '紧凑与标准尺寸',
        description: '卡片标题栏中推荐使用 size="sm"，页面顶部筛选栏推荐使用默认 size="md"。',
        minHeight: 170,
        render: () => <SegmentedSizesDemo />,
        code: `import * as React from 'react'
import { SegmentedControl } from '@/components/ui/segmented-control'

export function Example() {
  const [v, setV] = React.useState('all')
  const options = [
    { value: 'all', label: '全部节点' },
    { value: 'online', label: '在线' },
    { value: 'alert', label: '告警' },
  ]
  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl size="sm" value={v} onValueChange={setV} options={options} />
      <SegmentedControl size="md" value={v} onValueChange={setV} options={options} />
    </div>
  )
}`,
      },
      {
        id: 'dark-mode',
        title: '深色卡片适配（dark）',
        description: '在 sky-dark、lilac-dark、ink 等深色釉面卡片中传入 dark 自动切换半透明毛玻璃轨道。',
        surface: 'dark',
        minHeight: 150,
        render: () => <SegmentedDarkDemo />,
        code: `import * as React from 'react'
import { SegmentedControl } from '@/components/ui/segmented-control'

export function Example() {
  const [tab, setTab] = React.useState<'realtime' | 'history' | 'forecast'>('realtime')
  return (
    <SegmentedControl
      dark
      value={tab}
      onValueChange={setTab}
      options={[
        { value: 'realtime', label: '实时流量' },
        { value: 'history', label: '历史回放' },
        { value: 'forecast', label: '容量预测', badge: 'AI' },
      ]}
    />
  )
}`,
      },
    ],
  },
}
