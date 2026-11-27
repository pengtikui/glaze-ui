import * as React from 'react'
import { AreaChart } from '@/components/ui/area-chart'
import { BarChart } from '@/components/ui/bar-chart'
import { ChartContainer, ChartLegend } from '@/components/ui/chart'
import { ComposedChart } from '@/components/ui/composed-chart'
import { LineChart } from '@/components/ui/line-chart'
import { DonutChart, PieChart } from '@/components/ui/pie-chart'
import { RadarChart } from '@/components/ui/radar-chart'
import { GaugeChart, RadialChart } from '@/components/ui/radial-chart'
import { ScatterChart } from '@/components/ui/scatter-chart'
import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'
import type { ComponentDemoGroup } from '@/docs/examples/types'

const TRAFFIC_DATA = [
  { month: '1月', inbound: 420, outbound: 260, cache: 140, p95: 32, target: 28 },
  { month: '2月', inbound: 495, outbound: 310, cache: 165, p95: 29, target: 28 },
  { month: '3月', inbound: 468, outbound: 295, cache: 158, p95: 34, target: 26 },
  { month: '4月', inbound: 612, outbound: 380, cache: 210, p95: 27, target: 26 },
  { month: '5月', inbound: 735, outbound: 448, cache: 256, p95: 24, target: 24 },
  { month: '6月', inbound: 820, outbound: 512, cache: 290, p95: 21, target: 24 },
]

const REVENUE_DATA = [
  { quarter: 'Q1', enterprise: 240, selfServe: 120, addon: 48, margin: 64, forecast: 380 },
  { quarter: 'Q2', enterprise: 285, selfServe: 148, addon: 62, margin: 67, forecast: 460 },
  { quarter: 'Q3', enterprise: 332, selfServe: 176, addon: 78, margin: 70, forecast: 550 },
  { quarter: 'Q4', enterprise: 396, selfServe: 214, addon: 96, margin: 74, forecast: 680 },
]

const RANKING_DATA = [
  { region: '华东上海', qps: 4820 },
  { region: '华北北京', qps: 3960 },
  { region: '华南深圳', qps: 3410 },
  { region: '亚太新加坡', qps: 2780 },
  { region: '美西硅谷', qps: 2150 },
]

const PIE_DATA = [
  { name: '企业订阅', value: 540, hue: 'periwinkle' as const },
  { name: '自助专业版', value: 280, hue: 'aqua' as const },
  { name: '私有化授权', value: 190, hue: 'peach' as const },
  { name: 'API 用量', value: 110, hue: 'rose' as const },
]

const RADAR_DATA = [
  { skill: '性能', current: 92, benchmark: 76 },
  { skill: '无障碍', current: 96, benchmark: 70 },
  { skill: '动效', current: 88, benchmark: 72 },
  { skill: '可维护', current: 94, benchmark: 78 },
  { skill: '响应式', current: 90, benchmark: 80 },
  { skill: '文档', current: 95, benchmark: 68 },
]

function ChartLegendInteractiveDemo() {
  const [hidden, setHidden] = React.useState<Set<string>>(() => new Set())
  const toggleKey = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }
  const activeSeries = [
    { dataKey: 'inbound', label: '入站流量', hue: 'periwinkle' as const },
    { dataKey: 'outbound', label: '出站流量', hue: 'aqua' as const },
    { dataKey: 'cache', label: '边缘缓存', hue: 'peach' as const },
  ].filter((s) => !hidden.has(s.dataKey))

  return (
    <div className="flex w-full flex-col gap-3">
      <ChartLegend
        items={[
          { key: 'inbound', label: '入站流量', color: '#7B80EA' },
          { key: 'outbound', label: '出站流量', color: '#2FA79B' },
          { key: 'cache', label: '边缘缓存', color: '#E38B4F' },
        ]}
        hiddenKeys={hidden}
        onToggleKey={toggleKey}
      />
      <AreaChart
        data={TRAFFIC_DATA}
        xKey="month"
        height={180}
        series={activeSeries.length ? activeSeries : [{ dataKey: 'inbound', label: '入站流量', hue: 'periwinkle' }]}
      />
    </div>
  )
}

export const CHARTS_DEMOS: Record<string, ComponentDemoGroup> = {
  chart: {
    hero: {
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
      code: `import { AreaChart } from '@/components/ui/area-chart'
import { ChartContainer, ChartLegend } from '@/components/ui/chart'

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <ChartLegend
        items={[
          { key: 'inbound', label: '入站流量', color: '#7B80EA' },
          { key: 'outbound', label: '出站流量', color: '#2FA79B' },
        ]}
      />
      <ChartContainer config={{ inbound: { label: '入站流量', hue: 'periwinkle' } }} height={180}>
        <AreaChart data={data} xKey="month" height={180} series={[{ dataKey: 'inbound', hue: 'periwinkle' }]} />
      </ChartContainer>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'interactive-legend',
        title: '交互式图例显隐切换（ChartLegend）',
        description: '传入 hiddenKeys 与 onToggleKey，点击图例胶囊即可动态切换对应数据序列的可见性。',
        align: 'start',
        render: () => <ChartLegendInteractiveDemo />,
        code: `import * as React from 'react'
import { AreaChart } from '@/components/ui/area-chart'
import { ChartLegend } from '@/components/ui/chart'

export function Example() {
  const [hidden, setHidden] = React.useState<Set<string>>(() => new Set())
  const toggle = (key: string) =>
    setHidden((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  return (
    <ChartLegend
      items={[
        { key: 'inbound', label: '入站流量', color: '#7B80EA' },
        { key: 'outbound', label: '出站流量', color: '#2FA79B' },
      ]}
      hiddenKeys={hidden}
      onToggleKey={toggle}
    />
  )
}`,
      },
      {
        id: 'dark-tile-context',
        title: '深色 Tile 上下文自动主题适配',
        description: '图表置于深色 Tile 内时，ChartContainer 会通过 useTileTheme 自动将网格线、坐标轴与图例切换为高对比度浅色。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <Tile tone="sky-dark" className="w-full">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="font-glaze-display text-[17px] font-extrabold">深色卡片自适应图表</span>
              <span className="text-[12px] opacity-75">tone=&quot;sky-dark&quot;</span>
            </div>
            <AreaChart
              data={TRAFFIC_DATA}
              xKey="month"
              height={180}
              showLegend
              series={[
                { dataKey: 'inbound', label: '入站流量', hue: 'sky', unit: 'MB/s' },
                { dataKey: 'outbound', label: '出站流量', hue: 'mint', unit: 'MB/s' },
              ]}
            />
          </Tile>
        ),
        code: `import { AreaChart } from '@/components/ui/area-chart'
import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Tile tone="sky-dark">
      <AreaChart
        data={data}
        xKey="month"
        height={180}
        showLegend
        series={[{ dataKey: 'inbound', label: '入站流量', hue: 'sky' }]}
      />
    </Tile>
  )
}`,
      },
    ],
  },

  'area-chart': {
    hero: {
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
      data={[
        { month: '1月', inbound: 420, outbound: 260 },
        { month: '2月', inbound: 495, outbound: 310 },
        { month: '3月', inbound: 612, outbound: 380 },
      ]}
      xKey="month"
      height={220}
      showLegend
      series={[
        { dataKey: 'inbound', label: '入站流量', hue: 'periwinkle', unit: 'MB/s' },
        { dataKey: 'outbound', label: '出站流量', hue: 'aqua', unit: 'MB/s' },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'stacked-area',
        title: '堆叠面积图与 Y 轴刻度（stacked + showYAxis）',
        description: '开启 stacked 展示多来源流量总量构成，配合 showYAxis 显示左侧刻度。',
        align: 'start',
        render: () => (
          <AreaChart
            data={TRAFFIC_DATA}
            xKey="month"
            height={220}
            stacked
            showYAxis
            showLegend
            series={[
              { dataKey: 'inbound', label: '公网入站', hue: 'periwinkle', unit: 'MB/s' },
              { dataKey: 'outbound', label: '专线回源', hue: 'aqua', unit: 'MB/s' },
              { dataKey: 'cache', label: '边缘缓存', hue: 'mint', unit: 'MB/s' },
            ]}
          />
        ),
        code: `import { AreaChart } from '@/components/ui/area-chart'

export function Example() {
  return (
    <AreaChart
      data={data}
      xKey="month"
      stacked
      showYAxis
      showLegend
      series={[
        { dataKey: 'inbound', label: '公网入站', hue: 'periwinkle' },
        { dataKey: 'outbound', label: '专线回源', hue: 'aqua' },
        { dataKey: 'cache', label: '边缘缓存', hue: 'mint' },
      ]}
    />
  )
}`,
      },
      {
        id: 'curve-and-reference',
        title: '折线风格、数据点与警戒基线',
        description: '通过 curve="linear"、showDots 与 referenceLine 清晰标注容量警戒阈值。',
        align: 'start',
        render: () => (
          <AreaChart
            data={TRAFFIC_DATA}
            xKey="month"
            height={210}
            curve="linear"
            showDots
            showYAxis
            referenceLine={{ y: 700, label: '扩容基线 700', color: '#E5603B' }}
            series={[{ dataKey: 'inbound', label: '峰值带宽', hue: 'sky', unit: 'MB/s' }]}
          />
        ),
        code: `import { AreaChart } from '@/components/ui/area-chart'

export function Example() {
  return (
    <AreaChart
      data={data}
      xKey="month"
      curve="linear"
      showDots
      showYAxis
      referenceLine={{ y: 700, label: '扩容基线 700', color: '#E5603B' }}
      series={[{ dataKey: 'inbound', label: '峰值带宽', hue: 'sky', unit: 'MB/s' }]}
    />
  )
}`,
      },
    ],
  },

  'line-chart': {
    hero: {
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
      data={[{ month: '1月', p95: 32 }, { month: '2月', p95: 29 }, { month: '3月', p95: 21 }]}
      xKey="month"
      referenceLine={{ y: 30, label: 'SLA 基线', color: '#E5603B' }}
      series={[{ dataKey: 'p95', label: 'P95 延迟', hue: 'sky', unit: 'ms' }]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'multi-dashed',
        title: '实线实测 vs 虚线目标对比',
        description: '在 series 项中设置 dashed: true 与 showDots，区分真实观测值与目标基线。',
        align: 'start',
        render: () => (
          <LineChart
            data={TRAFFIC_DATA}
            xKey="month"
            height={220}
            showYAxis
            showLegend
            series={[
              { dataKey: 'p95', label: '实际 P95 延迟', hue: 'periwinkle', unit: 'ms', showDots: true },
              { dataKey: 'target', label: 'SLA 目标值', hue: 'coral', unit: 'ms', dashed: true },
            ]}
          />
        ),
        code: `import { LineChart } from '@/components/ui/line-chart'

export function Example() {
  return (
    <LineChart
      data={data}
      xKey="month"
      showYAxis
      showLegend
      series={[
        { dataKey: 'p95', label: '实际延迟', hue: 'periwinkle', unit: 'ms', showDots: true },
        { dataKey: 'target', label: '目标基线', hue: 'coral', unit: 'ms', dashed: true },
      ]}
    />
  )
}`,
      },
      {
        id: 'step-curve-dark',
        title: '阶梯折线与深色主题（stepAfter + tone）',
        description: '使用 curve="stepAfter" 表现离散配额/版本切换变化，并通过 tone="lilac-dark" 适配深色画布。',
        align: 'start',
        surface: 'dark',
        render: () => (
          <LineChart
            data={TRAFFIC_DATA}
            xKey="month"
            height={200}
            tone="sky-dark"
            curve="stepAfter"
            showYAxis
            series={[{ dataKey: 'inbound', label: '网关吞吐', hue: 'mint', unit: 'MB/s', strokeWidth: 2.5 }]}
          />
        ),
        code: `import { LineChart } from '@/components/ui/line-chart'

export function Example() {
  return (
    <LineChart
      data={data}
      xKey="month"
      tone="sky-dark"
      curve="stepAfter"
      showYAxis
      series={[{ dataKey: 'inbound', label: '网关吞吐', hue: 'mint' }]}
    />
  )
}`,
      },
    ],
  },

  'bar-chart': {
    hero: {
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
      data={[{ quarter: 'Q1', enterprise: 240, selfServe: 120 }, { quarter: 'Q2', enterprise: 285, selfServe: 148 }]}
      xKey="quarter"
      showLegend
      series={[
        { dataKey: 'enterprise', label: '企业订阅', hue: 'periwinkle', unit: '万' },
        { dataKey: 'selfServe', label: '自助版', hue: 'mint', unit: '万' },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'stacked-bars',
        title: '堆叠柱状图（stacked）',
        description: '开启 stacked 合并多产品线营收，清晰观察季度总盘增长。',
        align: 'start',
        render: () => (
          <BarChart
            data={REVENUE_DATA}
            xKey="quarter"
            height={220}
            stacked
            showYAxis
            showLegend
            series={[
              { dataKey: 'enterprise', label: '企业订阅', hue: 'periwinkle', unit: '万' },
              { dataKey: 'selfServe', label: '自助版', hue: 'aqua', unit: '万' },
              { dataKey: 'addon', label: '增值包', hue: 'peach', unit: '万' },
            ]}
          />
        ),
        code: `import { BarChart } from '@/components/ui/bar-chart'

export function Example() {
  return (
    <BarChart
      data={data}
      xKey="quarter"
      stacked
      showYAxis
      showLegend
      series={[
        { dataKey: 'enterprise', label: '企业订阅', hue: 'periwinkle' },
        { dataKey: 'selfServe', label: '自助版', hue: 'aqua' },
        { dataKey: 'addon', label: '增值包', hue: 'peach' },
      ]}
    />
  )
}`,
      },
      {
        id: 'horizontal-highlight',
        title: '水平条形排行与高亮首项（orientation="horizontal"）',
        description: '通过 orientation="horizontal" 与 highlightIndex={0} 打造区域 QPS 排行榜。',
        align: 'start',
        render: () => (
          <BarChart
            data={RANKING_DATA}
            xKey="region"
            height={220}
            orientation="horizontal"
            highlightIndex={0}
            showYAxis
            series={[{ dataKey: 'qps', label: '实时 QPS', hue: 'sky', unit: 'req/s' }]}
          />
        ),
        code: `import { BarChart } from '@/components/ui/bar-chart'

export function Example() {
  return (
    <BarChart
      data={[
        { region: '华东上海', qps: 4820 },
        { region: '华北北京', qps: 3960 },
        { region: '华南深圳', qps: 3410 },
      ]}
      xKey="region"
      orientation="horizontal"
      highlightIndex={0}
      showYAxis
      series={[{ dataKey: 'qps', label: '实时 QPS', hue: 'sky', unit: 'req/s' }]}
    />
  )
}`,
      },
    ],
  },

  'pie-chart': {
    hero: {
      align: 'start',
      render: () => (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          <DonutChart height={210} centerValue="1,120万" centerLabel="总营收" data={PIE_DATA} />
          <PieChart height={210} variant="pie" data={PIE_DATA} />
        </div>
      ),
      code: `import { DonutChart, PieChart } from '@/components/ui/pie-chart'

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
    examples: [
      {
        id: 'legend-and-format',
        title: '带图例与自定义数值格式（showLegend）',
        description: '开启 showLegend 显示分类占比说明，并自定义 valueFormatter 与圆角间隙。',
        align: 'start',
        render: () => (
          <DonutChart
            height={230}
            centerValue="100%"
            centerLabel="资源分配"
            paddingAngle={4}
            cornerRadius={8}
            showLegend
            valueFormatter={(v) => `¥${v} 万`}
            data={PIE_DATA}
          />
        ),
        code: `import { DonutChart } from '@/components/ui/pie-chart'

export function Example() {
  return (
    <DonutChart
      centerValue="100%"
      centerLabel="资源分配"
      paddingAngle={4}
      cornerRadius={8}
      showLegend
      valueFormatter={(v) => \`¥\${v} 万\`}
      data={data}
    />
  )
}`,
      },
      {
        id: 'dark-donut',
        title: '深色聚焦卡环形图（tone="ink"）',
        description: '在深色背景下自动提升中心数字与图例的明度对比。',
        align: 'start',
        surface: 'dark',
        render: () => (
          <DonutChart
            height={210}
            tone="sky-dark"
            centerValue="1,120万"
            centerLabel="年度 ARR"
            showLegend
            data={PIE_DATA}
          />
        ),
        code: `import { DonutChart } from '@/components/ui/pie-chart'

export function Example() {
  return <DonutChart tone="sky-dark" centerValue="1,120万" centerLabel="年度 ARR" showLegend data={data} />
}`,
      },
    ],
  },

  'radar-chart': {
    hero: {
      align: 'start',
      render: () => (
        <RadarChart
          height={240}
          angleKey="skill"
          showLegend
          data={RADAR_DATA}
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
      showLegend
      data={[{ skill: '性能', current: 92, benchmark: 76 }]}
      series={[
        { dataKey: 'current', label: 'Glaze v2', hue: 'periwinkle' },
        { dataKey: 'benchmark', label: '行业基线', hue: 'aqua' },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'circle-grid',
        title: '圆形网格与刻度轴（gridType="circle"）',
        description: '切换为同心圆极坐标网格并开启 showRadiusAxis 显示分值标尺。',
        align: 'start',
        render: () => (
          <RadarChart
            height={240}
            angleKey="skill"
            gridType="circle"
            showRadiusAxis
            data={RADAR_DATA}
            series={[{ dataKey: 'current', label: '综合评分', hue: 'sky', fillOpacity: 0.28 }]}
          />
        ),
        code: `import { RadarChart } from '@/components/ui/radar-chart'

export function Example() {
  return (
    <RadarChart
      angleKey="skill"
      gridType="circle"
      showRadiusAxis
      data={data}
      series={[{ dataKey: 'current', label: '综合评分', hue: 'sky', fillOpacity: 0.28 }]}
    />
  )
}`,
      },
      {
        id: 'dark-radar',
        title: '深色聚焦卡雷达图（tone="sky-dark"）',
        description: '在深色卡片中自动调整网格线透明度与维度标签对比度。',
        align: 'start',
        surface: 'dark',
        render: () => (
          <RadarChart
            height={230}
            tone="sky-dark"
            angleKey="skill"
            showLegend
            data={RADAR_DATA}
            series={[
              { dataKey: 'current', label: 'Glaze v2', hue: 'mint' },
              { dataKey: 'benchmark', label: '行业基线', hue: 'sky' },
            ]}
          />
        ),
        code: `import { RadarChart } from '@/components/ui/radar-chart'

export function Example() {
  return (
    <RadarChart
      tone="sky-dark"
      angleKey="skill"
      showLegend
      data={data}
      series={[{ dataKey: 'current', label: 'Glaze v2', hue: 'mint' }]}
    />
  )
}`,
      },
    ],
  },

  'radial-chart': {
    hero: {
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
    examples: [
      {
        id: 'gauge-variants',
        title: '多指标仪表盘组合（semicircle 与 ring）',
        description: 'GaugeChart 同时提供半圆仪表盘（semicircle）与整圆进度环（ring）两种视觉形态。',
        align: 'start',
        render: () => (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <GaugeChart value={92} variant="ring" hue="mint" label="健康度" unit="%" subLabel="极佳" height={170} />
            <GaugeChart value={68} variant="ring" hue="periwinkle" label="CPU 负载" unit="%" subLabel="平稳" height={170} />
            <GaugeChart value={88} variant="semicircle" hue="coral" label="存储水位" unit="%" subLabel="建议扩容" height={170} />
          </div>
        ),
        code: `import { GaugeChart } from '@/components/ui/radial-chart'

export function Example() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <GaugeChart value={92} variant="ring" hue="mint" label="健康度" unit="%" subLabel="极佳" />
      <GaugeChart value={68} variant="ring" hue="periwinkle" label="CPU 负载" unit="%" />
      <GaugeChart value={88} variant="semicircle" hue="coral" label="存储水位" unit="%" />
    </div>
  )
}`,
      },
      {
        id: 'dark-radial',
        title: '深色背景同心圆环与图例',
        description: '结合 tone="sky-dark" 与 showLegend，适合作为深色英雄大卡的核心 KPI 展示。',
        align: 'start',
        surface: 'dark',
        render: () => (
          <RadialChart
            height={220}
            tone="sky-dark"
            centerValue="91%"
            centerLabel="季度 OKR"
            showLegend
            data={[
              { name: '性能达标', value: 96, hue: 'mint' },
              { name: '文档覆盖', value: 92, hue: 'sky' },
              { name: '组件验收', value: 85, hue: 'peach' },
            ]}
          />
        ),
        code: `import { RadialChart } from '@/components/ui/radial-chart'

export function Example() {
  return (
    <RadialChart
      tone="sky-dark"
      centerValue="91%"
      centerLabel="季度 OKR"
      showLegend
      data={[
        { name: '性能达标', value: 96, hue: 'mint' },
        { name: '文档覆盖', value: 92, hue: 'sky' },
      ]}
    />
  )
}`,
      },
    ],
  },

  'scatter-chart': {
    hero: {
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
      zKey="size"
      xUnit="ms"
      yUnit="QPS"
      series={[{ name: '主集群', hue: 'periwinkle', data: [{ latency: 14, qps: 1200, size: 180 }] }]}
    />
  )
}`,
    },
    examples: [
      {
        id: '2d-correlation',
        title: '纯二维散点分布（省略 zKey）',
        description: '不传 zKey 时以统一大小散点展示双变量相关性，适合性能压测与异常离群点分析。',
        align: 'start',
        render: () => (
          <ScatterChart
            height={210}
            xKey="cpu"
            yKey="temp"
            xUnit="%"
            yUnit="°C"
            showLegend
            series={[
              {
                name: '液冷机柜',
                hue: 'sky',
                data: [
                  { cpu: 25, temp: 34 },
                  { cpu: 45, temp: 41 },
                  { cpu: 65, temp: 48 },
                  { cpu: 85, temp: 54 },
                ],
              },
              {
                name: '风冷机柜',
                hue: 'coral',
                data: [
                  { cpu: 25, temp: 42 },
                  { cpu: 45, temp: 53 },
                  { cpu: 65, temp: 66 },
                  { cpu: 85, temp: 78 },
                ],
              },
            ]}
          />
        ),
        code: `import { ScatterChart } from '@/components/ui/scatter-chart'

export function Example() {
  return (
    <ScatterChart
      xKey="cpu"
      yKey="temp"
      xUnit="%"
      yUnit="°C"
      series={[
        { name: '液冷机柜', hue: 'sky', data: [{ cpu: 25, temp: 34 }, { cpu: 85, temp: 54 }] },
        { name: '风冷机柜', hue: 'coral', data: [{ cpu: 25, temp: 42 }, { cpu: 85, temp: 78 }] },
      ]}
    />
  )
}`,
      },
      {
        id: 'dark-scatter',
        title: '深色主题散点监控（tone="sky-dark"）',
        description: '在深色监控面板上以高明度点群呈现延迟与吞吐分布。',
        align: 'start',
        surface: 'dark',
        render: () => (
          <ScatterChart
            height={210}
            tone="sky-dark"
            xKey="latency"
            yKey="qps"
            xUnit="ms"
            yUnit="QPS"
            showLegend
            series={[
              {
                name: '华东边缘',
                hue: 'mint',
                data: [
                  { latency: 10, qps: 2400 },
                  { latency: 15, qps: 3600 },
                  { latency: 21, qps: 4500 },
                ],
              },
              {
                name: '海外节点',
                hue: 'peach',
                data: [
                  { latency: 28, qps: 1800 },
                  { latency: 36, qps: 2600 },
                ],
              },
            ]}
          />
        ),
        code: `import { ScatterChart } from '@/components/ui/scatter-chart'

export function Example() {
  return (
    <ScatterChart
      tone="sky-dark"
      xKey="latency"
      yKey="qps"
      xUnit="ms"
      yUnit="QPS"
      series={[{ name: '华东边缘', hue: 'mint', data: [{ latency: 10, qps: 2400 }] }]}
    />
  )
}`,
      },
    ],
  },

  'composed-chart': {
    hero: {
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
      data={[{ quarter: 'Q1', enterprise: 240, selfServe: 120, margin: 64 }]}
      xKey="quarter"
      series={[
        { dataKey: 'enterprise', type: 'bar', label: '企业订阅', hue: 'periwinkle', unit: '万' },
        { dataKey: 'selfServe', type: 'bar', label: '自助版', hue: 'aqua', unit: '万' },
        { dataKey: 'margin', type: 'line', label: '毛利率', hue: 'coral', yAxisId: 'right', unit: '%' },
      ]}
    />
  )
}`,
    },
    examples: [
      {
        id: 'stacked-bar-area-line',
        title: '堆叠柱 + 面积 + 虚线预测三合一',
        description: '使用 stackId 堆叠多条柱状序列，同时叠加平滑预测面积与虚线目标曲线。',
        align: 'start',
        render: () => (
          <ComposedChart
            data={REVENUE_DATA}
            xKey="quarter"
            height={230}
            showLegend
            series={[
              { dataKey: 'enterprise', type: 'bar', stackId: 'rev', label: '企业订阅', hue: 'periwinkle', unit: '万' },
              { dataKey: 'selfServe', type: 'bar', stackId: 'rev', label: '自助版', hue: 'mint', unit: '万' },
              { dataKey: 'forecast', type: 'line', label: '营收目标', hue: 'peach', dashed: true, unit: '万' },
              { dataKey: 'margin', type: 'area', label: '毛利率', hue: 'sky', yAxisId: 'right', unit: '%', fillOpacity: 0.14 },
            ]}
          />
        ),
        code: `import { ComposedChart } from '@/components/ui/composed-chart'

export function Example() {
  return (
    <ComposedChart
      data={data}
      xKey="quarter"
      series={[
        { dataKey: 'enterprise', type: 'bar', stackId: 'rev', label: '企业订阅', hue: 'periwinkle' },
        { dataKey: 'selfServe', type: 'bar', stackId: 'rev', label: '自助版', hue: 'mint' },
        { dataKey: 'forecast', type: 'line', label: '营收目标', hue: 'peach', dashed: true },
        { dataKey: 'margin', type: 'area', label: '毛利率', hue: 'sky', yAxisId: 'right' },
      ]}
    />
  )
}`,
      },
      {
        id: 'dark-composed',
        title: '深色主题双轴组合分析（tone="sky-dark"）',
        description: '左右双 Y 轴与交互图例均自动适配深色釉面背景。',
        align: 'start',
        surface: 'dark',
        render: () => (
          <ComposedChart
            data={REVENUE_DATA}
            xKey="quarter"
            height={220}
            tone="sky-dark"
            showLegend
            series={[
              { dataKey: 'enterprise', type: 'bar', label: '企业营收', hue: 'sky', unit: '万' },
              { dataKey: 'margin', type: 'line', label: '毛利率', hue: 'mint', yAxisId: 'right', unit: '%' },
            ]}
          />
        ),
        code: `import { ComposedChart } from '@/components/ui/composed-chart'

export function Example() {
  return (
    <ComposedChart
      data={data}
      xKey="quarter"
      tone="sky-dark"
      series={[
        { dataKey: 'enterprise', type: 'bar', label: '企业营收', hue: 'sky' },
        { dataKey: 'margin', type: 'line', label: '毛利率', hue: 'mint', yAxisId: 'right' },
      ]}
    />
  )
}`,
      },
    ],
  },

  'spark-chart': {
    hero: {
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
  return (
    <div className="grid grid-cols-3 gap-4">
      <SparkChart data={[24, 32, 29, 44, 52, 66]} variant="area" hue="sky" height={48} />
      <SparkChart data={[18, 22, 19, 30, 28, 42]} variant="line" hue="mint" height={48} />
      <SparkChart data={[12, 28, 19, 36, 24, 44]} variant="bar" hue="periwinkle" height={48} />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'inside-metric-tiles',
        title: '嵌入多色调指标卡片实战',
        description: 'SparkChart 在白卡、柔彩卡与深色聚焦卡内均自动协调颜色，默认高亮最新一根柱子或末点。',
        align: 'start',
        surface: 'canvas',
        render: () => (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <Tile tone="white" padding="compact" className="min-h-32">
              <span className="text-[12px] font-semibold text-[#6B7280]">活跃用户</span>
              <span className="font-glaze-display text-[26px] font-extrabold">12,480</span>
              <SparkChart data={[82, 91, 88, 102, 114, 124]} variant="area" hue="periwinkle" height={38} unit="k" />
            </Tile>
            <Tile tone="mint" padding="compact" className="min-h-32">
              <span className="text-[12px] font-semibold opacity-75">缓存命中率</span>
              <span className="font-glaze-display text-[26px] font-extrabold">96.4%</span>
              <SparkChart data={[91, 93, 92, 95, 94, 96.4]} variant="line" curve="linear" hue="mint" height={38} unit="%" />
            </Tile>
            <Tile tone="sky-dark" padding="compact" className="min-h-32">
              <span className="text-[12px] font-semibold opacity-75">每秒请求</span>
              <span className="font-glaze-display text-[26px] font-extrabold">48.2k</span>
              <SparkChart data={[22, 31, 28, 39, 35, 48]} variant="bar" hue="sky" height={38} unit="k/s" />
            </Tile>
          </div>
        ),
        code: `import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'

export function Example() {
  return (
    <Tile tone="sky-dark" padding="compact">
      <span className="text-[12px] opacity-75">每秒请求</span>
      <span className="font-glaze-display text-[26px] font-extrabold">48.2k</span>
      <SparkChart data={[22, 31, 28, 39, 35, 48]} variant="bar" hue="sky" height={38} unit="k/s" />
    </Tile>
  )
}`,
      },
      {
        id: 'curve-and-highlight',
        title: '折线平滑度与末点高亮控制（curve / highlightLast）',
        description: '对比平滑曲线与折线风格，并支持关闭 highlightLast 以等权呈现所有柱条。',
        render: () => (
          <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1 rounded-[16px] bg-[#F6F7F9] p-3.5">
              <span className="text-[12px] font-semibold text-[#5B6170]">highlightLast=true（默认）</span>
              <SparkChart data={[14, 22, 18, 29, 25, 42]} variant="bar" hue="coral" highlightLast height={48} />
            </div>
            <div className="flex flex-col gap-1 rounded-[16px] bg-[#F6F7F9] p-3.5">
              <span className="text-[12px] font-semibold text-[#5B6170]">highlightLast=false 等权柱条</span>
              <SparkChart data={[14, 22, 18, 29, 25, 42]} variant="bar" hue="aqua" highlightLast={false} height={48} />
            </div>
          </div>
        ),
        code: `import { SparkChart } from '@/components/ui/spark-chart'

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SparkChart data={[14, 22, 18, 29, 25, 42]} variant="bar" hue="coral" highlightLast height={48} />
      <SparkChart data={[14, 22, 18, 29, 25, 42]} variant="bar" hue="aqua" highlightLast={false} height={48} />
    </div>
  )
}`,
      },
    ],
  },
}
