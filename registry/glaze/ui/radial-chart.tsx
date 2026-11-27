import * as React from 'react'
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
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

export interface RadialChartItem {
  name: string
  value: number
  color?: string
  hue?: Hue
}

export interface RadialChartProps {
  data: RadialChartItem[]
  max?: number
  tone?: TileTone
  height?: number | string
  startAngle?: number
  endAngle?: number
  innerRadius?: number | string
  outerRadius?: number | string
  barSize?: number
  centerValue?: React.ReactNode
  centerLabel?: React.ReactNode
  showTooltip?: boolean
  showLegend?: boolean
  valueFormatter?: (value: number | string, name?: string) => React.ReactNode
  animate?: boolean
  className?: string
}

export function RadialChart({
  data,
  max = 100,
  tone,
  height = 220,
  startAngle = 90,
  endAngle = -270,
  innerRadius = '36%',
  outerRadius = '92%',
  barSize = 12,
  centerValue,
  centerLabel,
  showTooltip = true,
  showLegend = false,
  valueFormatter,
  animate = true,
  className,
}: RadialChartProps) {
  const theme = useChartTheme(tone)

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
          <RechartsRadialBarChart
            data={resolvedData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            barSize={barSize}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
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
            <RadialBar
              dataKey="value"
              cornerRadius={999}
              background={{ fill: theme.tile.track }}
              isAnimationActive={animate}
              animationDuration={CHART_ANIMATION_DURATION}
              animationEasing={CHART_ANIMATION_EASING}
            />
          </RechartsRadialBarChart>
        </ChartContainer>

        {(centerValue !== undefined || centerLabel !== undefined) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue !== undefined && (
              <span
                className="font-glaze-display text-[24px] leading-7 font-extrabold"
                style={{ color: theme.tile.ink }}
              >
                {centerValue}
              </span>
            )}
            {centerLabel !== undefined && (
              <span className="mt-0.5 text-[11px] font-medium" style={{ color: theme.axisColor }}>
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

export interface GaugeChartProps {
  value: number
  max?: number
  label?: string
  valueText?: React.ReactNode
  unit?: string
  subLabel?: React.ReactNode
  variant?: 'semicircle' | 'ring'
  color?: string
  hue?: Hue
  trackColor?: string
  tone?: TileTone
  width?: number
  height?: number
  barSize?: number
  showTooltip?: boolean
  animate?: boolean
  className?: string
}

export function GaugeChart({
  value,
  max = 100,
  label = '数值',
  valueText,
  unit,
  subLabel,
  variant = 'semicircle',
  color,
  hue,
  trackColor,
  tone,
  width,
  height,
  barSize,
  showTooltip = false,
  animate = true,
  className,
}: GaugeChartProps) {
  const theme = useChartTheme(tone)
  const clamped = Math.max(0, Math.min(max, value))
  const accent = color ?? (hue ? HUE_PALETTES[hue][500] : theme.tile.accent)
  const track = trackColor ?? theme.tile.track
  const isSemi = variant === 'semicircle'

  const w = width ?? (isSemi ? 148 : 96)
  const h = height ?? (isSemi ? 86 : 96)
  const thickness = barSize ?? (isSemi ? 12 : 10)

  const data = React.useMemo(
    () => [{ name: label, value: clamped, fill: accent }],
    [label, clamped, accent],
  )

  const config = React.useMemo<ChartConfig>(
    () => ({ [label]: { label, color: accent, unit } }),
    [label, accent, unit],
  )

  return (
    <div
      role="img"
      aria-label={`${label} ${valueText ?? `${clamped}${unit ?? '%'}`}`}
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: w, height: h }}
    >
      <ChartContainer config={config} tone={tone} height="100%">
        <RechartsRadialBarChart
          data={data}
          cx="50%"
          cy={isSemi ? '88%' : '50%'}
          innerRadius={isSemi ? '128%' : '76%'}
          outerRadius={isSemi ? '160%' : '100%'}
          barSize={thickness}
          startAngle={isSemi ? 180 : 90}
          endAngle={isSemi ? 0 : -270}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
          {showTooltip && (
            <ChartTooltip
              content={(tooltipProps) => (
                <ChartTooltipContent
                  active={tooltipProps.active}
                  payload={tooltipProps.payload}
                  label={tooltipProps.label}
                  surface="ink"
                  compact
                  hideLabel
                />
              )}
            />
          )}
          <RadialBar
            dataKey="value"
            cornerRadius={999}
            background={{ fill: track }}
            isAnimationActive={animate}
            animationDuration={CHART_ANIMATION_DURATION}
            animationEasing={CHART_ANIMATION_EASING}
          />
        </RechartsRadialBarChart>
      </ChartContainer>

      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 flex flex-col items-center justify-center text-center',
          isSemi ? 'bottom-0' : 'inset-y-0',
        )}
      >
        <span
          className="inline-flex items-baseline gap-0.5 whitespace-nowrap font-glaze-display font-extrabold"
          style={{
            color: theme.tile.ink,
            fontSize: isSemi ? 24 : 19,
            lineHeight: isSemi ? '26px' : '22px',
          }}
        >
          <span>{valueText ?? `${Math.round((clamped / max) * 100)}%`}</span>
          {unit && (
            <span className="text-[11px] font-semibold" style={{ color: theme.axisColor }}>
              {unit}
            </span>
          )}
        </span>
        {subLabel && (
          <span className="mt-0.5 text-[11px] font-medium" style={{ color: theme.axisColor }}>
            {subLabel}
          </span>
        )}
      </div>
    </div>
  )
}
