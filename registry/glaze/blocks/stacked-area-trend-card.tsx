import { AreaChart, type AreaSeries } from '@/components/ui/area-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface StackedAreaTrendCardProps {
  title: string
  totalValue?: string
  data: readonly object[]
  xKey: string
  series: AreaSeries[]
  tone?: TileTone
}

export function StackedAreaTrendCard({
  title,
  totalValue,
  data,
  xKey,
  series,
  tone = 'white',
}: StackedAreaTrendCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between gap-2 pb-4.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="truncate text-[17px] font-bold">{title}</span>
        {totalValue && (
          <span className="shrink-0 font-glaze-display text-[16px] font-extrabold whitespace-nowrap" style={{ color: theme.ink }}>
            {totalValue}
          </span>
        )}
      </div>
      <div className="min-h-30 flex-1 w-full">
        <AreaChart
          data={data}
          xKey={xKey}
          series={series}
          stacked
          showLegend
          showYAxis={false}
          tone={tone}
          height={118}
        />
      </div>
    </Tile>
  )
}
