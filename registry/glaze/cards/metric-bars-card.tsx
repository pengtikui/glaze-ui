import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface MetricBarsCardProps {
  label: string
  value: string | number
  unit?: string
  bars: number[]
  tone?: TileTone
  highlightColor?: string
}

export function MetricBarsCard({
  label,
  value,
  unit,
  bars,
  tone = 'white',
  highlightColor,
}: MetricBarsCardProps) {
  const theme = TILE_THEMES[tone]
  const hi = highlightColor ?? theme.accent
  return (
    <Tile size="s" tone={tone}>
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-glaze-display text-[44px] leading-11.5 font-extrabold tracking-[-0.03em]">
          {value}
        </span>
        {unit && (
          <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
            {unit}
          </span>
        )}
      </span>
      <SparkChart
        data={bars}
        variant="bar"
        color={hi}
        mutedColor={theme.mutedBar}
        label={label}
        unit={unit}
        tone={tone}
        height={34}
      />
    </Tile>
  )
}
