import * as React from 'react'
import { LineChart } from '@/components/ui/line-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function DualSeriesTrendCard({
  label,
  seriesA,
  seriesB,
  tone = 'white',
}: {
  label: string
  seriesA: { name: string; color: string; data: number[]; current: string }
  seriesB: { name: string; color: string; data: number[]; current: string }
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const chartData = React.useMemo(() => {
    const len = Math.max(seriesA.data.length, seriesB.data.length)
    return Array.from({ length: len }, (_, i) => ({
      idx: `P${i + 1}`,
      a: seriesA.data[i],
      b: seriesB.data[i],
    }))
  }, [seriesA.data, seriesB.data])

  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
          {label}
        </span>
        <div className="flex items-center gap-4 text-[12px]">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: seriesA.color }} />
            {seriesA.name} <strong className="font-glaze-display">{seriesA.current}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: seriesB.color }} />
            {seriesB.name} <strong className="font-glaze-display">{seriesB.current}</strong>
          </span>
        </div>
      </div>
      <div className="h-24 w-full">
        <LineChart
          data={chartData}
          xKey="idx"
          series={[
            { dataKey: 'a', label: seriesA.name, color: seriesA.color, strokeWidth: 2.5 },
            { dataKey: 'b', label: seriesB.name, color: seriesB.color, strokeWidth: 2.5, dashed: true },
          ]}
          tone={tone}
          height="100%"
          showGrid
          showXAxis={false}
          showYAxis={false}
          margin={{ top: 8, right: 6, bottom: 2, left: 6 }}
          className="h-full"
        />
      </div>
    </Tile>
  )
}
