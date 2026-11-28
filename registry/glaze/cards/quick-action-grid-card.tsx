import * as React from 'react'
import { IconTile } from '@/components/ui/icon-tile'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function QuickActionGridCard({
  label,
  actions,
  tone = 'white',
}: {
  label: string
  actions: { id: string; label: string; icon: React.ReactNode; hue: Hue; onClick?: () => void }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} padding="compact" className="justify-between gap-2">
      <span className="truncate text-[13px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-1.5">
        {actions.slice(0, 4).map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={a.onClick}
            className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[14px] px-2 py-1.5 text-[11px] font-semibold outline-none hover:brightness-95 ${PRESS_CLASS}`}
            style={{
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,0.12)'
                : HUE_PALETTES[a.hue][50],
              color: theme.dark ? '#FFFFFF' : HUE_PALETTES[a.hue][700],
            }}
          >
            <IconTile
              hue={theme.dark ? 'dark-glass' : a.hue}
              size="sm"
              radius="icon"
              className="h-6 w-6 text-[13px]"
            >
              {a.icon}
            </IconTile>
            <span className="w-full truncate text-center">{a.label}</span>
          </button>
        ))}
      </div>
    </Tile>
  )
}
