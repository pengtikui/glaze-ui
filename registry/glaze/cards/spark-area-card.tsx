import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'
import { SEMANTIC_TOKENS, TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export interface SparkAreaCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: string
  deltaStatus?: Status
  points: number[]
  color?: string
  tone?: TileTone
}

export function SparkAreaCard({
  label,
  value,
  unit,
  delta,
  deltaStatus = 'normal',
  points,
  color,
  tone = 'white',
}: SparkAreaCardProps) {
  const theme = TILE_THEMES[tone]
  const pill = SEMANTIC_TOKENS[deltaStatus]

  return (
    <Tile size="s" tone={tone}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        {delta && (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
            style={{
              backgroundColor: theme.dark ? 'rgba(255,255,255,0.14)' : pill.pillBg,
              color: theme.dark ? theme.ink : pill.ink,
            }}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-glaze-display text-[42px] leading-11 font-extrabold tracking-[-0.03em]">
          {value}
        </span>
        {unit && (
          <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
            {unit}
          </span>
        )}
      </div>
      <SparkChart
        data={points}
        variant="area"
        color={color ?? theme.accent}
        label={label}
        unit={unit}
        tone={tone}
        height={40}
      />
    </Tile>
  )
}
