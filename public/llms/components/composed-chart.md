# ComposedChart (双轴组合图表)

> 在同一画布融合柱状、面积与折线并支持左右双 Y 轴的综合分析图表。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/composed-chart
```

- **Registry JSON**: `/r/composed-chart.json`
- **Import Path**: `@/components/ui/composed-chart`
- **Exports**: `ComposedChart`
- **NPM Dependencies**: `cn`, `recharts`
- **Registry Dependencies**: `@glaze/chart`, `@glaze/tokens`

## API Reference

### ComposedChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `readonly object[]` | — | — |
| `xKey` | `string` | — | — |
| `series` | `ComposedSeries[]` | — | — |
| `config?` | `ChartConfig` | — | — |
| `tone?` | `TileTone` | — | — |
| `height?` | `number \| string` | `240` | — |
| `curve?` | `'monotone' \| 'natural' \| 'linear'` | `'monotone'` | — |
| `showGrid?` | `boolean` | `true` | — |
| `showXAxis?` | `boolean` | `true` | — |
| `showYAxis?` | `boolean` | `true` | — |
| `showTooltip?` | `boolean` | `true` | — |
| `showLegend?` | `boolean` | `true` | — |
| `interactiveLegend?` | `boolean` | `true` | — |
| `xTickFormatter?` | `(value: unknown) => string` | — | — |
| `leftYTickFormatter?` | `(value: unknown) => string` | — | — |
| `rightYTickFormatter?` | `(value: unknown) => string` | — | — |
| `valueFormatter?` | `(value: number \| string, name?: string) => React.ReactNode` | — | — |
| `leftYAxisWidth?` | `number \| 'auto'` | `'auto'` | — |
| `rightYAxisWidth?` | `number \| 'auto'` | `'auto'` | — |
| `animate?` | `boolean` | `true` | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `ComposedSeries`

| Property | Type | Required |
| --- | --- | --- |
| `type` | `'bar' \| 'line' \| 'area'` | Yes |
| `dataKey` | `string` | Yes |
| `label` | `string` | No |
| `color` | `string` | No |
| `hue` | `Hue` | No |
| `unit` | `string` | No |
| `yAxisId` | `'left' \| 'right'` | No |
| `stackId` | `string` | No |
| `dashed` | `boolean` | No |
| `barSize` | `number` | No |
| `strokeWidth` | `number` | No |
| `fillOpacity` | `number` | No |

## Source Code

```tsx
import * as React from 'react'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart as RechartsComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from 'cn'
import type { Hue, TileTone } from '@/lib/tokens'
import {
  CHART_ANIMATION_DURATION,
  CHART_ANIMATION_EASING,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  resolveSeriesColor,
  useChartTheme,
  type ChartConfig,
} from '@/components/ui/chart'

export interface ComposedSeries {
  type: 'bar' | 'line' | 'area'
  dataKey: string
  label?: string
  color?: string
  hue?: Hue
  unit?: string
  yAxisId?: 'left' | 'right'
  stackId?: string
  dashed?: boolean
  barSize?: number
  strokeWidth?: number
  fillOpacity?: number
}

export interface ComposedChartProps {
  data: readonly object[]
  xKey: string
  series: ComposedSeries[]
  config?: ChartConfig
  tone?: TileTone
  height?: number | string
  curve?: 'monotone' | 'natural' | 'linear'
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  interactiveLegend?: boolean
  xTickFormatter?: (value: unknown) => string
  leftYTickFormatter?: (value: unknown) => string
  rightYTickFormatter?: (value: unknown) => string
  valueFormatter?: (value: number | string, name?: string) => React.ReactNode
  leftYAxisWidth?: number | 'auto'
  rightYAxisWidth?: number | 'auto'
  animate?: boolean
  className?: string
}

export function ComposedChart({
  data,
  xKey,
  series,
  config,
  tone,
  height = 240,
  curve = 'monotone',
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  interactiveLegend = true,
  xTickFormatter,
  leftYTickFormatter,
  rightYTickFormatter,
  valueFormatter,
  leftYAxisWidth = 'auto',
  rightYAxisWidth = 'auto',
  animate = true,
  className,
}: ComposedChartProps) {
  const uid = React.useId().replace(/:/g, '')
  const theme = useChartTheme(tone)
  const [hiddenKeys, setHiddenKeys] = React.useState<Set<string>>(() => new Set())

  const hasRightAxis = series.some((s) => s.yAxisId === 'right')

  const resolvedSeries = React.useMemo(
    () =>
      series.map((s, idx) => ({
        ...s,
        resolvedColor: resolveSeriesColor(s.dataKey, idx, config, s.color, s.hue),
        resolvedLabel: s.label ?? config?.[s.dataKey]?.label ?? s.dataKey,
      })),
    [series, config],
  )

  const mergedConfig = React.useMemo<ChartConfig>(() => {
    const out: ChartConfig = { ...config }
    resolvedSeries.forEach((s) => {
      out[s.dataKey] = {
        ...out[s.dataKey],
        label: s.resolvedLabel,
        color: s.resolvedColor,
        unit: s.unit ?? out[s.dataKey]?.unit,
      }
    })
    return out
  }, [config, resolvedSeries])

  const toggleKey = React.useCallback((key: string) => {
    setHiddenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-2.5', className)}>
      {showLegend && (
        <ChartLegend
          tone={tone}
          items={resolvedSeries.map((s) => ({
            key: s.dataKey,
            label: s.resolvedLabel,
            color: s.resolvedColor,
            dashed: s.dashed,
          }))}
          hiddenKeys={interactiveLegend ? hiddenKeys : undefined}
          onToggleKey={interactiveLegend ? toggleKey : undefined}
        />
      )}
      <ChartContainer config={mergedConfig} tone={tone} height={height}>
        <RechartsComposedChart
          data={data}
          margin={{ top: 8, right: hasRightAxis ? 8 : 10, bottom: 0, left: 6 }}
        >
          <defs>
            {resolvedSeries
              .filter((s) => s.type === 'area')
              .map((s) => (
                <linearGradient
                  key={s.dataKey}
                  id={`glaze-composed-${uid}-${s.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.resolvedColor} stopOpacity={s.fillOpacity ?? 0.24} />
                  <stop offset="96%" stopColor={s.resolvedColor} stopOpacity={0.01} />
                </linearGradient>
              ))}
          </defs>

          {showGrid && (
            <CartesianGrid
              vertical={false}
              stroke={theme.gridColor}
              strokeDasharray="3 4"
            />
          )}

          {showXAxis && (
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fill: theme.axisColor }}
              tickFormatter={xTickFormatter ? (v) => xTickFormatter(v) : undefined}
            />
          )}

          {showYAxis && (
            <YAxis
              yAxisId="left"
              width={leftYAxisWidth}
              axisLine={false}
              tickLine={false}
              tickMargin={6}
              tick={{ fill: theme.axisColor }}
              tickFormatter={leftYTickFormatter ? (v) => leftYTickFormatter(v) : undefined}
            />
          )}

          {showYAxis && hasRightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              width={rightYAxisWidth}
              axisLine={false}
              tickLine={false}
              tickMargin={6}
              tick={{ fill: theme.axisColor }}
              tickFormatter={rightYTickFormatter ? (v) => rightYTickFormatter(v) : undefined}
            />
          )}

          {showTooltip && (
            <ChartTooltip
              cursor={{ fill: theme.cursorFill, radius: 8 }}
              content={(tooltipProps) => (
                <ChartTooltipContent
                  active={tooltipProps.active}
                  payload={tooltipProps.payload}
                  label={tooltipProps.label}
                  valueFormatter={valueFormatter}
                />
              )}
            />
          )}

          {resolvedSeries.map((s) => {
            if (hiddenKeys.has(s.dataKey)) return null
            const yAxisId = s.yAxisId ?? 'left'
            if (s.type === 'bar') {
              return (
                <Bar
                  key={s.dataKey}
                  yAxisId={yAxisId}
                  dataKey={s.dataKey}
                  name={String(s.resolvedLabel)}
                  stackId={s.stackId}
                  fill={s.resolvedColor}
                  barSize={s.barSize ?? 20}
                  radius={[7, 7, 3, 3]}
                  isAnimationActive={animate}
                  animationDuration={CHART_ANIMATION_DURATION}
                  animationEasing={CHART_ANIMATION_EASING}
                />
              )
            }
            if (s.type === 'area') {
              return (
                <Area
                  key={s.dataKey}
                  yAxisId={yAxisId}
                  type={curve}
                  dataKey={s.dataKey}
                  name={String(s.resolvedLabel)}
                  stackId={s.stackId}
                  stroke={s.resolvedColor}
                  strokeWidth={s.strokeWidth ?? 2.25}
                  strokeDasharray={s.dashed ? '5 4' : undefined}
                  fill={`url(#glaze-composed-${uid}-${s.dataKey})`}
                  dot={false}
                  activeDot={{ r: 4, fill: s.resolvedColor, stroke: theme.tile.bg, strokeWidth: 2 }}
                  isAnimationActive={animate}
                  animationDuration={CHART_ANIMATION_DURATION}
                  animationEasing={CHART_ANIMATION_EASING}
                />
              )
            }
            return (
              <Line
                key={s.dataKey}
                yAxisId={yAxisId}
                type={curve}
                dataKey={s.dataKey}
                name={String(s.resolvedLabel)}
                stroke={s.resolvedColor}
                strokeWidth={s.strokeWidth ?? 2.5}
                strokeDasharray={s.dashed ? '5 4' : undefined}
                strokeLinecap="round"
                dot={{ r: 3.5, fill: theme.tile.bg, stroke: s.resolvedColor, strokeWidth: 2 }}
                activeDot={{ r: 4.5, fill: s.resolvedColor, stroke: theme.tile.bg, strokeWidth: 2 }}
                isAnimationActive={animate}
                animationDuration={CHART_ANIMATION_DURATION}
                animationEasing={CHART_ANIMATION_EASING}
              />
            )
          })}
        </RechartsComposedChart>
      </ChartContainer>
    </div>
  )
}
```
