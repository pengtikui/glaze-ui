import { Command } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function KeyShortcutCard({
  label,
  keys,
  description,
  tone = 'ink',
}: {
  label: string
  keys: string[]
  description: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <Command size={16} style={{ color: theme.soft }} />
      </div>
      <div className="flex items-center justify-center gap-2">
        {keys.map((k) => (
          <kbd
            key={k}
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-[12px] px-3 font-glaze-mono text-[16px] font-bold whitespace-nowrap"
            style={{
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,0.14)'
                : theme.bg === '#FFFFFF'
                  ? '#F2F3F5'
                  : theme.track,
              color: theme.ink,
            }}
          >
            {k}
          </kbd>
        ))}
      </div>
      <span className="text-[12px]" style={{ color: theme.soft }}>
        {description}
      </span>
    </Tile>
  )
}
