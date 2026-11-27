import * as React from 'react'
import { AreaChart } from '@/components/ui/area-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface HeroSubMetric {
  label: string
  value: string | number
}

export interface HeroMetricCardProps {
  label: string
  value: string | number
  delta?: string
  points?: number[]
  subMetrics: HeroSubMetric[]
  tone?: TileTone
}

export function HeroMetricCard({
  label,
  value,
  delta,
  points = [18, 22, 16, 28, 46, 38, 24, 48, 82, 74, 96, 102],
  subMetrics,
  tone = 'sky',
}: HeroMetricCardProps) {
  const theme = TILE_THEMES[tone]
  const chartData = React.useMemo(
    () => points.map((v, i) => ({ idx: `#${i + 1}`, value: v })),
    [points],
  )

  return (
    <Tile size="l" tone={tone} className="justify-start gap-2.5">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex flex-wrap items-center gap-3.5">
        <span className="font-glaze-display text-[56px] sm:text-[72px] leading-18.5 font-extrabold tracking-[-0.04em]">
          {value}
        </span>
        {delta && (
          <span
            className="rounded-full px-2.5 py-1 text-[13px] font-semibold"
            style={{ backgroundColor: theme.track, color: theme.ink }}
          >
            {delta}
          </span>
        )}
      </span>
      <div className="min-h-30 flex-1 w-full">
        <AreaChart
          data={chartData}
          xKey="idx"
          series={[{ dataKey: 'value', label, color: theme.accent, strokeWidth: 3, fillOpacity: 0.24 }]}
          tone={tone}
          height="100%"
          showGrid={false}
          showXAxis={false}
          showYAxis={false}
          margin={{ top: 8, right: 4, bottom: 2, left: 4 }}
          className="h-full"
        />
      </div>
      <div
        className="grid pt-3.5"
        style={{
          gridTemplateColumns: `repeat(${subMetrics.length}, minmax(0, 1fr))`,
          borderTop: `1px solid ${theme.divider}`,
        }}
      >
        {subMetrics.map((m, i) => (
          <span key={i} className="flex flex-col gap-0.5">
            <span className="text-[13px]" style={{ color: theme.soft }}>
              {m.label}
            </span>
            <span className="font-glaze-display text-[24px] font-extrabold">
              {m.value}
            </span>
          </span>
        ))}
      </div>
    </Tile>
  )
}
