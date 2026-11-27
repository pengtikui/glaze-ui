import * as React from 'react'
import { IconTile } from '@/components/ui/icon-tile'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface AppLauncherItem {
  id: string
  name: string
  mark: React.ReactNode
  hue: Hue
  badge?: number
  href?: string
  onClick?: () => void
}

export interface AppLauncherCardProps {
  title: string
  summary: string
  apps: AppLauncherItem[]
  tone?: TileTone
}

export function AppLauncherCard({
  title,
  summary,
  apps,
  tone = 'white',
}: AppLauncherCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[17px] font-bold">{title}</span>
        <span className="shrink-0 text-[13px] whitespace-nowrap" style={{ color: theme.soft }}>
          {summary}
        </span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
        {apps.slice(0, 8).map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={app.onClick}
            className="group flex flex-col items-center gap-2 border-0 bg-transparent p-0 cursor-pointer glaze-focus rounded-2xl"
          >
            <IconTile
              hue={app.hue}
              size="lg"
              badge={app.badge}
              badgeRingColor={theme.bg}
              className="text-[20px] transition-transform duration-150 group-hover:scale-105 group-active:scale-95"
            >
              {app.mark}
            </IconTile>
            <span
              className="max-w-full truncate text-[11px] font-medium whitespace-nowrap"
              style={{ color: theme.soft }}
            >
              {app.name}
            </span>
          </button>
        ))}
      </div>
    </Tile>
  )
}
