import { BarChart } from '@/components/ui/bar-chart'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export function GroupedBarChartCard({
  title,
  legendA,
  legendB,
  colorA = '#7B80EA',
  colorB = '#2FA79B',
  groups,
  tone = 'white',
}: {
  title: string
  legendA: string
  legendB: string
  colorA?: string
  colorB?: string
  groups: { label: string; a: number; b: number }[]
  tone?: TileTone
}) {
  return (
    <Tile size="l" tone={tone} className="justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
        <div className="flex items-center gap-4 text-[12px] text-[#5B6170]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colorA }} />
            {legendA}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colorB }} />
            {legendB}
          </span>
        </div>
      </div>
      <div className="min-h-60 flex-1 w-full pt-2">
        <BarChart
          data={groups}
          xKey="label"
          series={[
            { dataKey: 'a', label: legendA, color: colorA },
            { dataKey: 'b', label: legendB, color: colorB },
          ]}
          tone={tone}
          height="100%"
          barSize={20}
          barGap={6}
          showYAxis
          className="h-full"
        />
      </div>
    </Tile>
  )
}
