import { BarChart } from '@/components/ui/bar-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface VerticalBarItem {
  label: string
  value: number
  highlight?: boolean
}

export interface VerticalBarsCardProps {
  label: string
  totalValue: string | number
  unit?: string
  bars: VerticalBarItem[]
  tone?: TileTone
}

export function VerticalBarsCard({
  label,
  totalValue,
  unit,
  bars,
  tone = 'peach',
}: VerticalBarsCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-glaze-display text-[48px] leading-12.5 font-extrabold tracking-[-0.03em]">
          {totalValue}
        </span>
        {unit && (
          <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
            {unit}
          </span>
        )}
      </span>
      <div className="min-h-48 flex-1 w-full">
        <BarChart
          data={bars}
          xKey="label"
          series={[
            {
              dataKey: 'value',
              label,
              color: theme.accent,
              mutedColor: theme.track,
              unit,
            },
          ]}
          highlightKey="highlight"
          tone={tone}
          height="100%"
          showGrid={false}
          showXAxis
          showYAxis={false}
          barCategoryGap="18%"
          radius={[8, 8, 4, 4]}
          margin={{ top: 6, right: 2, bottom: 0, left: 2 }}
          className="h-full"
        />
      </div>
    </Tile>
  )
}
