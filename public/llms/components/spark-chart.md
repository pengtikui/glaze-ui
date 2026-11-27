# SparkChart (嵌入式微图表)

> 专为小格卡片设计的零轴线超轻微趋势图，支持 area / line / bar 三种形态。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/spark-chart
```

- **Registry JSON**: `/r/spark-chart.json`
- **Import Path**: `@/components/ui/spark-chart`
- **Exports**: `SparkChart`
- **NPM Dependencies**: `recharts`
- **Registry Dependencies**: `@glaze/chart`, `@glaze/tokens`

## API Reference

### SparkChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `SparkChartDataItem[]` | — | — |
| `variant?` | `'line' \| 'area' \| 'bar'` | `'line'` | — |
| `color?` | `string` | — | — |
| `hue?` | `Hue` | — | — |
| `mutedColor?` | `string` | — | — |
| `highlightLast?` | `boolean` | `true` | — |
| `curve?` | `'monotone' \| 'natural' \| 'linear'` | `'monotone'` | — |
| `strokeWidth?` | `number` | `2.4` | — |
| `height?` | `number \| string` | `36` | — |
| `label?` | `string` | `'数值'` | — |
| `unit?` | `string` | — | — |
| `showTooltip?` | `boolean` | `true` | — |
| `valueFormatter?` | `(value: number \| string) => React.ReactNode` | — | — |
| `tone?` | `TileTone` | — | — |
| `animate?` | `boolean` | `true` | — |
| `className?` | `string` | — | — |

## Source Code

```tsx
import * as React from 'react'
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Rectangle,
  type BarShapeProps,
} from 'recharts'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'
import {
  CHART_ANIMATION_DURATION,
  CHART_ANIMATION_EASING,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  useChartTheme,
  type ChartConfig,
} from '@/components/ui/chart'

export type SparkChartDataItem = number | { label?: string; value: number }

export interface SparkChartProps {
  data: SparkChartDataItem[]
  variant?: 'line' | 'area' | 'bar'
  color?: string
  hue?: Hue
  mutedColor?: string
  highlightLast?: boolean
  curve?: 'monotone' | 'natural' | 'linear'
  strokeWidth?: number
  height?: number | string
  label?: string
  unit?: string
  showTooltip?: boolean
  valueFormatter?: (value: number | string) => React.ReactNode
  tone?: TileTone
  animate?: boolean
  className?: string
}

export function SparkChart({
  data,
  variant = 'line',
  color,
  hue,
  mutedColor,
  highlightLast = true,
  curve = 'monotone',
  strokeWidth = 2.4,
  height = 36,
  label = '数值',
  unit,
  showTooltip = true,
  valueFormatter,
  tone,
  animate = true,
  className,
}: SparkChartProps) {
  const uid = React.useId().replace(/:/g, '')
  const theme = useChartTheme(tone)
  const accent = color ?? (hue ? HUE_PALETTES[hue][500] : theme.tile.accent)
  const muted = mutedColor ?? (hue ? HUE_PALETTES[hue][100] : theme.tile.mutedBar)

  const normalized = React.useMemo(
    () =>
      data.map((d, idx) =>
        typeof d === 'number'
          ? { label: `#${idx + 1}`, value: d }
          : { label: d.label ?? `#${idx + 1}`, value: d.value },
      ),
    [data],
  )

  const config = React.useMemo<ChartConfig>(
    () => ({ value: { label, color: accent, unit } }),
    [label, accent, unit],
  )

  const tooltip = showTooltip ? (
    <ChartTooltip
      allowEscapeViewBox={{ x: false, y: true }}
      offset={8}
      cursor={
        variant === 'bar'
          ? { fill: theme.cursorFill, radius: 4 }
          : { stroke: theme.cursorStroke, strokeWidth: 1, strokeDasharray: '3 3' }
      }
      content={(tooltipProps) => (
        <ChartTooltipContent
          active={tooltipProps.active}
          payload={tooltipProps.payload}
          label={tooltipProps.label}
          surface="ink"
          compact
          hideLabel={normalized.every((d, i) => d.label === `#${i + 1}`)}
          valueFormatter={valueFormatter ? (v) => valueFormatter(v) : undefined}
        />
      )}
    />
  ) : null

  if (variant === 'bar') {
    const lastIdx = normalized.length - 1
    return (
      <ChartContainer config={config} tone={tone} height={height} className={className}>
        <RechartsBarChart
          data={normalized}
          barCategoryGap="18%"
          margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
        >
          {tooltip}
          <Bar
            dataKey="value"
            name={label}
            fill={accent}
            radius={[3, 3, 2, 2]}
            shape={(barProps: BarShapeProps) => (
              <Rectangle
                {...barProps}
                fill={!highlightLast || barProps.index === lastIdx ? accent : muted}
              />
            )}
            isAnimationActive={animate}
            animationDuration={CHART_ANIMATION_DURATION}
            animationEasing={CHART_ANIMATION_EASING}
          />
        </RechartsBarChart>
      </ChartContainer>
    )
  }

  if (variant === 'area') {
    return (
      <ChartContainer config={config} tone={tone} height={height} className={className}>
        <RechartsAreaChart
          data={normalized}
          margin={{ top: 3, right: 2, bottom: 2, left: 2 }}
        >
          <defs>
            <linearGradient id={`glaze-spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.26} />
              <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {tooltip}
          <Area
            type={curve}
            dataKey="value"
            name={label}
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill={`url(#glaze-spark-${uid})`}
            dot={false}
            activeDot={{ r: 3.5, fill: accent, stroke: theme.tile.bg, strokeWidth: 1.5 }}
            isAnimationActive={animate}
            animationDuration={CHART_ANIMATION_DURATION}
            animationEasing={CHART_ANIMATION_EASING}
          />
        </RechartsAreaChart>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer config={config} tone={tone} height={height} className={className}>
      <RechartsLineChart
        data={normalized}
        margin={{ top: 3, right: 2, bottom: 3, left: 2 }}
      >
        {tooltip}
        <Line
          type={curve}
          dataKey="value"
          name={label}
          stroke={accent}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          dot={false}
          activeDot={{ r: 3.5, fill: accent, stroke: theme.tile.bg, strokeWidth: 1.5 }}
          isAnimationActive={animate}
          animationDuration={CHART_ANIMATION_DURATION}
          animationEasing={CHART_ANIMATION_EASING}
        />
      </RechartsLineChart>
    </ChartContainer>
  )
}
```
