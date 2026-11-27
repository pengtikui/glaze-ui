import * as React from 'react'
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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

export interface ScatterSeries {
  id?: string
  name: string
  data: readonly object[]
  color?: string
  hue?: Hue
}

export interface ScatterChartProps {
  series: ScatterSeries[]
  xKey: string
  yKey: string
  zKey?: string
  xLabel?: string
  yLabel?: string
  xUnit?: string
  yUnit?: string
  zRange?: [number, number]
  tone?: TileTone
  height?: number | string
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  interactiveLegend?: boolean
  xTickFormatter?: (value: unknown) => string
  yTickFormatter?: (value: unknown) => string
  yAxisWidth?: number | 'auto'
  animate?: boolean
  className?: string
}

export function ScatterChart({
  series,
  xKey,
  yKey,
  zKey,
  xLabel,
  yLabel,
  xUnit,
  yUnit,
  zRange = [48, 280],
  tone,
  height = 220,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  interactiveLegend = true,
  xTickFormatter,
  yTickFormatter,
  yAxisWidth = 'auto',
  animate = true,
  className,
}: ScatterChartProps) {
  const theme = useChartTheme(tone)
  const [hiddenKeys, setHiddenKeys] = React.useState<Set<string>>(() => new Set())

  const resolvedSeries = React.useMemo(
    () =>
      series.map((s, idx) => {
        const key = s.id ?? s.name
        return {
          ...s,
          key,
          resolvedColor: resolveSeriesColor(key, idx, undefined, s.color, s.hue),
        }
      }),
    [series],
  )

  const config = React.useMemo<ChartConfig>(() => {
    const out: ChartConfig = {
      [xKey]: { label: xLabel ?? xKey, unit: xUnit },
      [yKey]: { label: yLabel ?? yKey, unit: yUnit },
    }
    resolvedSeries.forEach((s) => {
      out[s.key] = { label: s.name, color: s.resolvedColor }
    })
    return out
  }, [resolvedSeries, xKey, yKey, xLabel, yLabel, xUnit, yUnit])

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
            key: s.key,
            label: s.name,
            color: s.resolvedColor,
          }))}
          hiddenKeys={interactiveLegend ? hiddenKeys : undefined}
          onToggleKey={interactiveLegend ? toggleKey : undefined}
        />
      )}
      <ChartContainer config={config} tone={tone} height={height}>
        <RechartsScatterChart margin={{ top: 10, right: 16, bottom: 4, left: 6 }}>
          {showGrid && (
            <CartesianGrid stroke={theme.gridColor} strokeDasharray="3 4" />
          )}
          {showXAxis && (
            <XAxis
              type="number"
              dataKey={xKey}
              name={xLabel ?? xKey}
              unit={xUnit}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fill: theme.axisColor }}
              tickFormatter={xTickFormatter ? (v) => xTickFormatter(v) : undefined}
            />
          )}
          {showYAxis && (
            <YAxis
              type="number"
              dataKey={yKey}
              name={yLabel ?? yKey}
              unit={yUnit}
              width={yAxisWidth}
              axisLine={false}
              tickLine={false}
              tickMargin={6}
              tick={{ fill: theme.axisColor }}
              tickFormatter={yTickFormatter ? (v) => yTickFormatter(v) : undefined}
            />
          )}
          {zKey && <ZAxis type="number" dataKey={zKey} range={zRange} />}
          {showTooltip && (
            <ChartTooltip
              cursor={{ strokeDasharray: '3 3', stroke: theme.cursorStroke }}
              content={(tooltipProps) => (
                <ChartTooltipContent
                  active={tooltipProps.active}
                  payload={tooltipProps.payload}
                  label={tooltipProps.label}
                  hideLabel
                />
              )}
            />
          )}
          {resolvedSeries.map((s) => {
            if (hiddenKeys.has(s.key)) return null
            return (
              <Scatter
                key={s.key}
                name={s.name}
                data={s.data}
                fill={s.resolvedColor}
                fillOpacity={0.78}
                stroke={s.resolvedColor}
                strokeWidth={1.5}
                isAnimationActive={animate}
                animationDuration={CHART_ANIMATION_DURATION}
                animationEasing={CHART_ANIMATION_EASING}
              />
            )
          })}
        </RechartsScatterChart>
      </ChartContainer>
    </div>
  )
}
