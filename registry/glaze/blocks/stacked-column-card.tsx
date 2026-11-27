import { BarChart, type BarSeries } from '@/components/ui/bar-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface StackedColumnCardProps {
  label: string
  totalValue: string | number
  unit?: string
  data: readonly object[]
  xKey: string
  series: BarSeries[]
  tone?: TileTone
}

export function StackedColumnCard({
  label,
  totalValue,
  unit,
  data,
  xKey,
  series,
  tone = 'white',
}: StackedColumnCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="t" tone={tone} className="justify-start gap-3">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-glaze-display text-[44px] leading-11.5 font-extrabold tracking-[-0.03em]">
          {totalValue}
        </span>
        {unit && (
          <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
            {unit}
          </span>
        )}
      </span>
      <div className="min-h-56 flex-1 w-full">
        <BarChart
          data={data}
          xKey={xKey}
          series={series}
          stacked
          showLegend
          showGrid
          showYAxis={false}
          barSize={18}
          tone={tone}
          height={230}
        />
      </div>
    </Tile>
  )
}
