import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function QuoteCard({
  quote,
  author,
  tag = '每日一句',
  tone = 'lilac',
}: {
  quote: string
  author: string
  tag?: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <span className="text-[12px] font-bold tracking-wide" style={{ color: theme.soft }}>
        {tag}
      </span>
      <p className="m-0 line-clamp-3 text-[15px] leading-snug font-bold" style={{ color: theme.ink }}>
        “{quote}”
      </p>
      <span className="truncate text-[12px]" style={{ color: theme.soft }}>
        — {author}
      </span>
    </Tile>
  )
}
