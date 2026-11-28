import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function TagCloudCard({
  label,
  tags,
  tone = 'white',
}: {
  label: string
  tags: { text: string; hue: Hue }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-start gap-3">
      <span className="truncate text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div className="flex flex-wrap content-start gap-1.5 overflow-hidden">
        {tags.slice(0, 8).map((t) => (
          <HueTag key={t.text} hue={t.hue} size="sm">
            {t.text}
          </HueTag>
        ))}
      </div>
    </Tile>
  )
}
