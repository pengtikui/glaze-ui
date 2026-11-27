import { GaugeChart } from '@/components/ui/radial-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface RingCardProps {
  label: string
  numerator: number
  denominator: number
  description: string
  tone?: TileTone
}

export function RingCard({
  label,
  numerator,
  denominator,
  description,
  tone = 'rose',
}: RingCardProps) {
  const theme = TILE_THEMES[tone]
  const pct = denominator > 0 ? Math.round((numerator / denominator) * 100) : 0

  return (
    <Tile
      size="s"
      tone={tone}
      className="flex-row items-center justify-between gap-3"
    >
      <span className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
        <span className="truncate text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="font-glaze-display text-[30px] leading-9 font-extrabold whitespace-nowrap">
            {numerator}
            <span className="text-[17px]" style={{ opacity: 0.55 }}>
              /{denominator}
            </span>
          </span>
          <span className="truncate text-[13px]" style={{ color: theme.soft }}>
            {description}
          </span>
        </span>
      </span>
      <GaugeChart
        value={pct}
        max={100}
        label={label}
        valueText={`${pct}%`}
        variant="ring"
        color={theme.accent}
        trackColor={theme.track}
        tone={tone}
        width={96}
        height={96}
        barSize={11}
      />
    </Tile>
  )
}
