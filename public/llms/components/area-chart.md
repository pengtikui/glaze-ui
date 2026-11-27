# AreaChart (面积趋势图)

> 支持单/多序列渐变填充、堆叠模式、交互图例筛选与悬浮提示的面积图组件。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/area-chart
```

- **Registry JSON**: `/r/area-chart.json`
- **Import Path**: `@/components/ui/area-chart`
- **Exports**: `AreaChart`
- **NPM Dependencies**: `cn`, `recharts`
- **Registry Dependencies**: `@glaze/chart`, `@glaze/tokens`

## API Reference

### AreaChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `readonly object[]` | — | — |
| `xKey` | `string` | — | — |
| `series` | `AreaSeries[]` | — | — |
| `config?` | `ChartConfig` | — | — |
| `tone?` | `TileTone` | — | — |
| `height?` | `number \| string` | `220` | — |
| `curve?` | `'monotone' \| 'natural' \| 'linear' \| 'step' \| 'stepAfter'` | `'monotone'` | — |
| `stacked?` | `boolean` | `false` | — |
| `gradient?` | `boolean` | `true` | — |
| `showGrid?` | `boolean` | `true` | — |
| `showXAxis?` | `boolean` | `true` | — |
| `showYAxis?` | `boolean` | `false` | — |
| `showTooltip?` | `boolean` | `true` | — |
| `showLegend?` | `boolean` | `false` | — |
| `interactiveLegend?` | `boolean` | `true` | — |
| `showDots?` | `boolean` | `false` | — |
| `referenceLine?` | `{ y: number; label?: string; color?: string }` | — | — |
| `xAxisTicks?` | `(string \| number)[]` | — | — |
| `xTickFormatter?` | `(value: unknown) => string` | — | — |
| `yTickFormatter?` | `(value: unknown) => string` | — | — |
| `valueFormatter?` | `(value: number \| string, name?: string) => React.ReactNode` | — | — |
| `labelFormatter?` | `(label: React.ReactNode) => React.ReactNode` | — | — |
| `yDomain?` | `[number \| 'auto' \| 'dataMin' \| 'dataMax', number \| 'auto' \| 'dataMin' \| 'dataMax']` | — | — |
| `yAxisWidth?` | `number \| 'auto'` | `'auto'` | — |
| `margin?` | `{ top?: number; right?: number; bottom?: number; left?: number }` | — | — |
| `animate?` | `boolean` | `true` | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `AreaSeries`

| Property | Type | Required |
| --- | --- | --- |
| `dataKey` | `string` | Yes |
| `label` | `string` | No |
| `color` | `string` | No |
| `hue` | `Hue` | No |
| `unit` | `string` | No |
| `fillOpacity` | `number` | No |
| `strokeWidth` | `number` | No |
| `dashed` | `boolean` | No |

## Source Code

```tsx
import * as React from 'react'
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ReferenceLine,
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

export interface AreaSeries {
  dataKey: string
  label?: string
  color?: string
  hue?: Hue
  unit?: string
  fillOpacity?: number
  strokeWidth?: number
  dashed?: boolean
}

export interface AreaChartProps {
  data: readonly object[]
  xKey: string
  series: AreaSeries[]
  config?: ChartConfig
  tone?: TileTone
  height?: number | string
  curve?: 'monotone' | 'natural' | 'linear' | 'step' | 'stepAfter'
  stacked?: boolean
  gradient?: boolean
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  interactiveLegend?: boolean
  showDots?: boolean
  referenceLine?: { y: number; label?: string; color?: string }
  xAxisTicks?: (string | number)[]
  xTickFormatter?: (value: unknown) => string
  yTickFormatter?: (value: unknown) => string
  valueFormatter?: (value: number | string, name?: string) => React.ReactNode
  labelFormatter?: (label: React.ReactNode) => React.ReactNode
  yDomain?: [number | 'auto' | 'dataMin' | 'dataMax', number | 'auto' | 'dataMin' | 'dataMax']
  yAxisWidth?: number | 'auto'
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  animate?: boolean
  className?: string
}

export function AreaChart({
  data,
  xKey,
  series,
  config,
  tone,
  height = 220,
  curve = 'monotone',
  stacked = false,
  gradient = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  showLegend = false,
  interactiveLegend = true,
  showDots = false,
  referenceLine,
  xAxisTicks,
  xTickFormatter,
  yTickFormatter,
  valueFormatter,
  labelFormatter,
  yDomain,
  yAxisWidth = 'auto',
  margin,
  animate = true,
  className,
}: AreaChartProps) {
  const uid = React.useId().replace(/:/g, '')
  const theme = useChartTheme(tone)
  const [hiddenKeys, setHiddenKeys] = React.useState<Set<string>>(() => new Set())

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

  const chartMargin = {
    top: margin?.top ?? 8,
    right: margin?.right ?? 12,
    bottom: margin?.bottom ?? (showXAxis ? 0 : 4),
    left: margin?.left ?? (showYAxis ? 4 : showXAxis ? 12 : 4),
  }

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
      <ChartContainer
        config={mergedConfig}
        tone={tone}
        height={height}
        className="w-full"
      >
        <RechartsAreaChart data={data} margin={chartMargin}>
          {gradient && (
            <defs>
              {resolvedSeries.map((s) => {
                const topOpacity = s.fillOpacity ?? (stacked ? 0.36 : 0.24)
                return (
                  <linearGradient
                    key={s.dataKey}
                    id={`glaze-area-${uid}-${s.dataKey}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={s.resolvedColor} stopOpacity={topOpacity} />
                    <stop offset="96%" stopColor={s.resolvedColor} stopOpacity={0.01} />
                  </linearGradient>
                )
              })}
            </defs>
          )}

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
              ticks={xAxisTicks}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              padding={{ left: 6, right: 6 }}
              tick={{ fill: theme.axisColor }}
              tickFormatter={xTickFormatter ? (v) => xTickFormatter(v) : undefined}
            />
          )}

          {(showYAxis || Boolean(referenceLine)) && (
            <YAxis
              hide={!showYAxis}
              width={yAxisWidth}
              domain={
                yDomain ??
                (referenceLine
                  ? [0, (dataMax: number) => Math.max(dataMax, Math.ceil(referenceLine.y * 1.12))]
                  : undefined)
              }
              axisLine={false}
              tickLine={false}
              tickMargin={6}
              tick={{ fill: theme.axisColor }}
              tickFormatter={yTickFormatter ? (v) => yTickFormatter(v) : undefined}
            />
          )}

          {referenceLine && (
            <ReferenceLine
              y={referenceLine.y}
              ifOverflow="extendDomain"
              stroke={referenceLine.color ?? theme.cursorStroke}
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={
                referenceLine.label
                  ? {
                      value: referenceLine.label,
                      position: 'insideTopRight',
                      fill: referenceLine.color ?? theme.axisColor,
                      fontSize: 11,
                      fontWeight: 600,
                    }
                  : undefined
              }
            />
          )}

          {showTooltip && (
            <ChartTooltip
              cursor={{
                stroke: theme.cursorStroke,
                strokeWidth: 1.25,
                strokeDasharray: '4 4',
              }}
              content={(tooltipProps) => (
                <ChartTooltipContent
                  active={tooltipProps.active}
                  payload={tooltipProps.payload}
                  label={tooltipProps.label}
                  valueFormatter={valueFormatter}
                  labelFormatter={labelFormatter}
                />
              )}
            />
          )}

          {resolvedSeries.map((s) => {
            if (hiddenKeys.has(s.dataKey)) return null
            return (
              <Area
                key={s.dataKey}
                type={curve}
                dataKey={s.dataKey}
                name={String(s.resolvedLabel)}
                stackId={stacked ? 'glaze-stack' : undefined}
                stroke={s.resolvedColor}
                strokeWidth={s.strokeWidth ?? 2.5}
                strokeDasharray={s.dashed ? '5 4' : undefined}
                strokeLinecap="round"
                fill={
                  gradient
                    ? `url(#glaze-area-${uid}-${s.dataKey})`
                    : s.resolvedColor
                }
                fillOpacity={gradient ? 1 : (s.fillOpacity ?? 0.16)}
                dot={
                  showDots
                    ? { r: 3.5, fill: theme.tile.bg, stroke: s.resolvedColor, strokeWidth: 2 }
                    : false
                }
                activeDot={{
                  r: 4.5,
                  fill: s.resolvedColor,
                  stroke: theme.tile.bg,
                  strokeWidth: 2,
                }}
                isAnimationActive={animate}
                animationDuration={CHART_ANIMATION_DURATION}
                animationEasing={CHART_ANIMATION_EASING}
              />
            )
          })}
        </RechartsAreaChart>
      </ChartContainer>
    </div>
  )
}
```
