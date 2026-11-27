import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface DotMatrixCardProps {
  label: string
  subLabel?: string
  active: number
  total: number
  tone?: TileTone
}

export function DotMatrixCard({
  label,
  subLabel,
  active,
  total,
  tone = 'lilac',
}: DotMatrixCardProps) {
  const theme = TILE_THEMES[tone]
  const cols = total > 10 ? 10 : Math.max(total, 5)
  return (
    <Tile size="s" tone={tone}>
      <span
        className="flex items-center justify-between gap-2 text-[14px] font-medium"
        style={{ color: theme.soft }}
      >
        <span className="truncate">{label}</span>
        {subLabel && <span className="shrink-0 whitespace-nowrap">{subLabel}</span>}
      </span>
      <span className="font-glaze-display text-[44px] leading-11.5 font-extrabold tracking-[-0.02em] whitespace-nowrap">
        {active}
        <span style={{ opacity: 0.48 }}>/{total}</span>
      </span>
      <span
        aria-hidden="true"
        className="grid justify-items-center gap-1.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="h-3.5 w-3.5 rounded-full"
            style={{
              backgroundColor: i < active ? theme.accent : theme.track,
            }}
          />
        ))}
      </span>
    </Tile>
  )
}
