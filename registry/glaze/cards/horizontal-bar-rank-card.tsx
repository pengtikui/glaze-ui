import { BarChart } from '@/components/ui/bar-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface HorizontalBarRankCardProps {
  title: string
  subtitle?: string
  data: readonly object[]
  categoryKey: string
  valueKey: string
  valueLabel?: string
  unit?: string
  color?: string
  hue?: Hue
  tone?: TileTone
}

export function HorizontalBarRankCard({
  title,
  subtitle,
  data,
  categoryKey,
  valueKey,
  valueLabel = '数值',
  unit,
  color,
  hue = 'periwinkle',
  tone = 'white',
}: HorizontalBarRankCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between gap-2 pb-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[17px] font-bold">{title}</span>
        {subtitle && (
          <span className="shrink-0 text-[12px] whitespace-nowrap" style={{ color: theme.soft }}>
            {subtitle}
          </span>
        )}
      </div>
      <div className="min-h-32 flex-1 w-full">
        <BarChart
          data={data}
          xKey={categoryKey}
          orientation="horizontal"
          series={[{ dataKey: valueKey, label: valueLabel, color, hue, unit }]}
          showGrid
          showXAxis={false}
          showYAxis
          barSize={14}
          tone={tone}
          height={132}
        />
      </div>
    </Tile>
  )
}
