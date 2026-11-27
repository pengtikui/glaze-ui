import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'
import { SEMANTIC_TOKENS, TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export interface TrendCardProps {
  label: string
  value: string | number
  unit?: string
  delta: string
  deltaStatus?: Status
  points?: number[]
  tone?: TileTone
  strokeColor?: string
}

export function TrendCard({
  label,
  value,
  unit,
  delta,
  deltaStatus = 'normal',
  points = [75, 70, 78, 60, 48, 55, 36, 42, 22, 26],
  tone = 'white',
  strokeColor,
}: TrendCardProps) {
  const theme = TILE_THEMES[tone]
  const pill = SEMANTIC_TOKENS[deltaStatus]

  return (
    <Tile size="s" tone={tone}>
      <span
        className="flex items-center justify-between text-[14px] font-medium"
        style={{ color: theme.soft }}
      >
        <span>{label}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[12px] font-semibold"
          style={{ backgroundColor: pill.pillBg, color: pill.ink }}
        >
          {delta}
        </span>
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
        data={points}
        variant="line"
        color={strokeColor ?? theme.accent}
        label={label}
        unit={unit}
        tone={tone}
        height={36}
      />
    </Tile>
  )
}
