import * as React from 'react'
import {
  Pie,
  PieChart as RechartsPieChart,
} from 'recharts'
import { cn } from 'cn'
import { DATAVIZ_PALETTES, HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'
import {
  CHART_ANIMATION_DURATION,
  CHART_ANIMATION_EASING,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  useChartTheme,
  type ChartConfig,
} from '@/components/ui/chart'

export interface PieChartItem {
  name: string
  value: number
  color?: string
  hue?: Hue
  display?: string
}

export interface PieChartProps {
  data: PieChartItem[]
  variant?: 'donut' | 'pie'
  tone?: TileTone
  height?: number | string
  innerRadius?: number | string
  outerRadius?: number | string
  paddingAngle?: number
  cornerRadius?: number
  centerValue?: React.ReactNode
  centerLabel?: React.ReactNode
  showTooltip?: boolean
  showLegend?: boolean
  valueFormatter?: (value: number | string, name?: string) => React.ReactNode
  animate?: boolean
  className?: string
}

export function PieChart({
  data,
  variant = 'donut',
  tone,
  height = 220,
  innerRadius,
  outerRadius = '88%',
  paddingAngle,
  cornerRadius,
  centerValue,
  centerLabel,
  showTooltip = true,
  showLegend = false,
  valueFormatter,
  animate = true,
  className,
}: PieChartProps) {
  const theme = useChartTheme(tone)
  const isDonut = variant === 'donut'

  const resolvedData = React.useMemo(
    () =>
      data.map((item, idx) => ({
        ...item,
        fill:
          item.color ??
          (item.hue ? HUE_PALETTES[item.hue][500] : undefined) ??
          DATAVIZ_PALETTES.categorical[idx % DATAVIZ_PALETTES.categorical.length],
      })),
    [data],
  )

  const config = React.useMemo<ChartConfig>(() => {
    const out: ChartConfig = {}
    resolvedData.forEach((d) => {
      out[d.name] = { label: d.name, color: d.fill }
    })
    return out
  }, [resolvedData])

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-3', className)}>
      <div className="relative w-full" style={{ height }}>
        <ChartContainer config={config} tone={tone} height="100%">
          <RechartsPieChart>
            {showTooltip && (
              <ChartTooltip
                content={(tooltipProps) => (
                  <ChartTooltipContent
                    active={tooltipProps.active}
                    payload={tooltipProps.payload}
                    label={tooltipProps.label}
                    hideLabel
                    valueFormatter={valueFormatter}
                  />
                )}
              />
            )}
            <Pie
              data={resolvedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={innerRadius ?? (isDonut ? '65%' : 0)}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle ?? (isDonut ? 3 : 1.5)}
              cornerRadius={cornerRadius ?? (isDonut ? 6 : 3)}
              stroke="none"
              isAnimationActive={animate}
              animationDuration={CHART_ANIMATION_DURATION}
              animationEasing={CHART_ANIMATION_EASING}
            />
          </RechartsPieChart>
        </ChartContainer>

        {isDonut && (centerValue !== undefined || centerLabel !== undefined) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue !== undefined && (
              <span
                className="font-glaze-display text-[28px] leading-8 font-extrabold tracking-[-0.02em]"
                style={{ color: theme.tile.ink }}
              >
                {centerValue}
              </span>
            )}
            {centerLabel !== undefined && (
              <span className="mt-0.5 text-[12px] font-medium" style={{ color: theme.axisColor }}>
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {showLegend && (
        <ChartLegend
          tone={tone}
          align="center"
          items={resolvedData.map((d) => ({
            key: d.name,
            label: d.name,
            color: d.fill,
          }))}
        />
      )}
    </div>
  )
}

export function DonutChart(props: Omit<PieChartProps, 'variant'>) {
  return <PieChart {...props} variant="donut" />
}
