import * as React from 'react'
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
  type BarShapeProps,
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

export interface BarSeries {
  dataKey: string
  label?: string
  color?: string
  hue?: Hue
  unit?: string
  /** Optional muted color for non-highlighted bars when using highlightKey or highlightIndex */
  mutedColor?: string
}

export interface BarChartProps {
  data: readonly object[]
  xKey: string
  series: BarSeries[]
  config?: ChartConfig
  tone?: TileTone
  height?: number | string
  /** 'vertical' renders upright columns; 'horizontal' renders left-to-right bars */
  orientation?: 'vertical' | 'horizontal'
  stacked?: boolean
  barSize?: number
  barGap?: number
  barCategoryGap?: number | string
  radius?: number | [number, number, number, number]
  /** Boolean property on each data item to highlight that bar (other bars use mutedColor) */
  highlightKey?: string
  /** Index of a single bar to highlight (other bars use mutedColor) */
  highlightIndex?: number
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  interactiveLegend?: boolean
  referenceLine?: { value: number; label?: string; color?: string }
  xTickFormatter?: (value: unknown) => string
  yTickFormatter?: (value: unknown) => string
  valueFormatter?: (value: number | string, name?: string) => React.ReactNode
  labelFormatter?: (label: React.ReactNode) => React.ReactNode
  yAxisWidth?: number | 'auto'
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  animate?: boolean
  className?: string
}

export function BarChart({
  data,
  xKey,
  series,
  config,
  tone,
  height = 220,
  orientation = 'vertical',
  stacked = false,
  barSize,
  barGap = 6,
  barCategoryGap = '22%',
  radius,
  highlightKey,
  highlightIndex,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showTooltip = true,
  showLegend = false,
  interactiveLegend = true,
  referenceLine,
  xTickFormatter,
  yTickFormatter,
  valueFormatter,
  labelFormatter,
  yAxisWidth = 'auto',
  margin,
  animate = true,
  className,
}: BarChartProps) {
  const theme = useChartTheme(tone)
  const [hiddenKeys, setHiddenKeys] = React.useState<Set<string>>(() => new Set())
  const isHorizontal = orientation === 'horizontal'

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

  const visibleSeries = resolvedSeries.filter((s) => !hiddenKeys.has(s.dataKey))

  const chartMargin = {
    top: margin?.top ?? 8,
    right: margin?.right ?? 10,
    bottom: margin?.bottom ?? (showXAxis ? 0 : 4),
    left: margin?.left ?? 4,
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
        <RechartsBarChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          barGap={barGap}
          barCategoryGap={barCategoryGap}
          margin={chartMargin}
        >
          {showGrid && (
            <CartesianGrid
              vertical={isHorizontal}
              horizontal={!isHorizontal}
              stroke={theme.gridColor}
              strokeDasharray="3 4"
            />
          )}

          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                hide={!showXAxis}
                domain={[0, 'auto']}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tick={{ fill: theme.axisColor }}
                tickFormatter={xTickFormatter ? (v) => xTickFormatter(v) : undefined}
              />
              {showYAxis && (
                <YAxis
                  type="category"
                  dataKey={xKey}
                  width={yAxisWidth}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={6}
                  tick={{ fill: theme.axisColor }}
                  tickFormatter={yTickFormatter ? (v) => yTickFormatter(v) : undefined}
                />
              )}
            </>
          ) : (
            <>
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
                  width={yAxisWidth}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={6}
                  tick={{ fill: theme.axisColor }}
                  tickFormatter={yTickFormatter ? (v) => yTickFormatter(v) : undefined}
                />
              )}
            </>
          )}

          {referenceLine && (
            <ReferenceLine
              x={isHorizontal ? referenceLine.value : undefined}
              y={!isHorizontal ? referenceLine.value : undefined}
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
              cursor={{ fill: theme.cursorFill, radius: 8 }}
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

          {visibleSeries.map((s, visIdx) => {
            const isTopOfStack = stacked && visIdx === visibleSeries.length - 1
            const isBottomOfStack = stacked && visIdx === 0
            const computedRadius: number | [number, number, number, number] =
              radius !== undefined
                ? radius
                : stacked
                  ? isHorizontal
                    ? isTopOfStack
                      ? [0, 7, 7, 0]
                      : isBottomOfStack
                        ? [7, 0, 0, 7]
                        : [0, 0, 0, 0]
                    : isTopOfStack
                      ? [7, 7, 0, 0]
                      : isBottomOfStack
                        ? [0, 0, 4, 4]
                        : [0, 0, 0, 0]
                  : isHorizontal
                    ? [4, 8, 8, 4]
                    : [8, 8, 3, 3]

            const usePerBarFill =
              highlightKey !== undefined ||
              highlightIndex !== undefined ||
              data.some((d) => typeof (d as Record<string, unknown>).fill === 'string')

            return (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={String(s.resolvedLabel)}
                stackId={stacked ? 'glaze-bar-stack' : undefined}
                fill={s.resolvedColor}
                barSize={barSize}
                radius={computedRadius}
                shape={
                  usePerBarFill
                    ? (barProps: BarShapeProps) => {
                        const payload = barProps.payload as Record<string, unknown> | undefined
                        const idx = barProps.index
                        let fillColor = s.resolvedColor
                        if (typeof payload?.fill === 'string') {
                          fillColor = payload.fill
                        } else if (highlightKey !== undefined) {
                          fillColor = payload?.[highlightKey]
                            ? s.resolvedColor
                            : (s.mutedColor ?? theme.tile.mutedBar)
                        } else if (highlightIndex !== undefined) {
                          fillColor =
                            idx === highlightIndex
                              ? s.resolvedColor
                              : (s.mutedColor ?? theme.tile.mutedBar)
                        }
                        return <Rectangle {...barProps} fill={fillColor} />
                      }
                    : undefined
                }
                isAnimationActive={animate}
                animationDuration={CHART_ANIMATION_DURATION}
                animationEasing={CHART_ANIMATION_EASING}
              />
            )
          })}
        </RechartsBarChart>
      </ChartContainer>
    </div>
  )
}
