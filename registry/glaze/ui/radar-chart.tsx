import * as React from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
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

export interface RadarSeries {
  dataKey: string
  label?: string
  color?: string
  hue?: Hue
  unit?: string
  fillOpacity?: number
  strokeWidth?: number
}

export interface RadarChartProps {
  data: readonly object[]
  angleKey: string
  series: RadarSeries[]
  config?: ChartConfig
  tone?: TileTone
  height?: number | string
  domain?: [number, number]
  gridType?: 'polygon' | 'circle'
  outerRadius?: number | string
  showGrid?: boolean
  showRadiusAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  interactiveLegend?: boolean
  valueFormatter?: (value: number | string, name?: string) => React.ReactNode
  animate?: boolean
  className?: string
}

export function RadarChart({
  data,
  angleKey,
  series,
  config,
  tone,
  height = 240,
  domain = [0, 100],
  gridType = 'polygon',
  outerRadius = '74%',
  showGrid = true,
  showRadiusAxis = false,
  showTooltip = true,
  showLegend = false,
  interactiveLegend = true,
  valueFormatter,
  animate = true,
  className,
}: RadarChartProps) {
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

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-2.5', className)}>
      {showLegend && (
        <ChartLegend
          tone={tone}
          align="center"
          items={resolvedSeries.map((s) => ({
            key: s.dataKey,
            label: s.resolvedLabel,
            color: s.resolvedColor,
          }))}
          hiddenKeys={interactiveLegend ? hiddenKeys : undefined}
          onToggleKey={interactiveLegend ? toggleKey : undefined}
        />
      )}
      <ChartContainer config={mergedConfig} tone={tone} height={height}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius={outerRadius}>
          {showGrid && (
            <PolarGrid
              gridType={gridType}
              stroke={theme.gridColor}
            />
          )}
          <PolarAngleAxis
            dataKey={angleKey}
            tick={{ fill: theme.axisColor, fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={domain}
            axisLine={false}
            tick={showRadiusAxis ? { fill: theme.axisColor, fontSize: 10 } : false}
          />
          {showTooltip && (
            <ChartTooltip
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
            return (
              <Radar
                key={s.dataKey}
                name={String(s.resolvedLabel)}
                dataKey={s.dataKey}
                stroke={s.resolvedColor}
                strokeWidth={s.strokeWidth ?? 2.25}
                fill={s.resolvedColor}
                fillOpacity={s.fillOpacity ?? 0.22}
                dot={{ r: 3, fill: s.resolvedColor, strokeWidth: 0 }}
                activeDot={{ r: 4.5, fill: s.resolvedColor, stroke: theme.tile.bg, strokeWidth: 2 }}
                isAnimationActive={animate}
                animationDuration={CHART_ANIMATION_DURATION}
                animationEasing={CHART_ANIMATION_EASING}
              />
            )
          })}
        </RechartsRadarChart>
      </ChartContainer>
    </div>
  )
}
