import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function QrCard({
  label,
  caption,
  tone = 'white',
}: {
  label: string
  caption: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const matrix = [
    1, 1, 1, 0, 1, 0, 1, 1, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 1, 1, 0, 1, 0, 1, 1, 1,
    0, 1, 0, 1, 1, 0, 0, 1, 0,
    1, 0, 1, 0, 1, 1, 1, 0, 1,
    0, 1, 1, 1, 0, 1, 0, 1, 0,
    1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 0, 1,
  ]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div
        className="mx-auto grid h-22 w-22 grid-cols-9 gap-0.5 rounded-[12px] p-2"
        style={{ backgroundColor: theme.dark ? '#FFFFFF' : '#F6F7F9' }}
      >
        {matrix.map((cell, i) => (
          <span
            key={i}
            className="rounded-xs"
            style={{ backgroundColor: cell ? (theme.dark ? '#1B1F27' : theme.ink) : 'transparent' }}
          />
        ))}
      </div>
      <span className="text-center text-[12px]" style={{ color: theme.soft }}>
        {caption}
      </span>
    </Tile>
  )
}
