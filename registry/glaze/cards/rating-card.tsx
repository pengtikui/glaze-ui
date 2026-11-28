import { Star } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function RatingCard({
  label,
  score,
  reviews,
  tone = 'lemon',
}: {
  label: string
  score: string
  reviews: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div className="font-glaze-display text-[48px] leading-none font-extrabold tracking-[-0.03em]">
        {score}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={15} weight="fill" style={{ color: theme.accent }} />
          ))}
        </div>
        <span className="text-[12px]" style={{ color: theme.soft }}>
          {reviews}
        </span>
      </div>
    </Tile>
  )
}
