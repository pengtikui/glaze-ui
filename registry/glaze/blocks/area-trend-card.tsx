import * as React from 'react'
import { AreaChart } from '@/components/ui/area-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface AreaTrendCardProps {
  title: string
  summary: string
  points?: number[]
  axisLabels: string[]
  accentColor?: string
  tone?: TileTone
}

export function AreaTrendCard({
  title,
  summary,
  points = [18, 20, 14, 22, 34, 30, 16, 26, 56, 48, 38, 58, 88, 82, 64, 70, 74, 72],
  axisLabels,
  accentColor = '#7B80EA',
  tone = 'white',
}: AreaTrendCardProps) {
  const theme = TILE_THEMES[tone]
  const chartData = React.useMemo(
    () => points.map((v, i) => ({ idx: `#${i + 1}`, value: v })),
    [points],
  )

  return (
    <Tile size="w" tone={tone} className="justify-start gap-2 pb-4.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[17px] font-bold">{title}</span>
        <span className="shrink-0 text-[13px] whitespace-nowrap" style={{ color: theme.soft }}>
          {summary}
        </span>
      </div>
      <div className="min-h-23 flex-1 w-full">
        <AreaChart
          data={chartData}
          xKey="idx"
          series={[{ dataKey: 'value', label: title, color: accentColor, strokeWidth: 2.5, fillOpacity: 0.2 }]}
          tone={tone}
          height="100%"
          showGrid
          showXAxis={false}
          showYAxis={false}
          margin={{ top: 6, right: 4, bottom: 2, left: 4 }}
          className="h-full"
        />
      </div>
      <div
        className="flex justify-between text-[12px]"
        style={{ color: theme.soft }}
      >
        {axisLabels.map((lbl, i) => (
          <span key={i}>{lbl}</span>
        ))}
      </div>
    </Tile>
  )
}
