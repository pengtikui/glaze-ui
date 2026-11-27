import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface CountdownCardProps {
  label: string
  remaining: number | string
  unit: string
  deadlineText: string
  totalSteps?: number
  elapsedSteps?: number
  tone?: TileTone
}

export function CountdownCard({
  label,
  remaining,
  unit,
  deadlineText,
  totalSteps = 7,
  elapsedSteps = 4,
  tone = 'coral',
}: CountdownCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone}>
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-glaze-display text-[52px] leading-13.5 font-extrabold tracking-[-0.03em]">
          {remaining}
        </span>
        <span className="text-[18px] font-bold">{unit}</span>
      </span>
      <span className="flex flex-col gap-2">
        <span
          aria-hidden="true"
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className="h-2 rounded-sm"
              style={{
                backgroundColor: i < elapsedSteps ? theme.accent : theme.track,
              }}
            />
          ))}
        </span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {deadlineText}
        </span>
      </span>
    </Tile>
  )
}
