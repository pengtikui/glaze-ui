import * as React from 'react'
import { Bell } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface NotificationCardProps {
  count: number
  label: string
  latestText: string
  icon?: React.ReactNode
  iconHue?: Hue
  tone?: TileTone
  onClick?: () => void
}

export function NotificationCard({
  count,
  label,
  latestText,
  icon,
  iconHue = 'periwinkle',
  tone = 'white',
  onClick,
}: NotificationCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} onClick={onClick} interactive={Boolean(onClick)}>
      <IconTile hue={iconHue} size="md" badge={count} badgeRingColor={theme.bg}>
        {icon ?? <Bell size={22} />}
      </IconTile>
      <span className="flex flex-col gap-1">
        <span className="flex items-baseline gap-1.5">
          <span className="font-glaze-display text-[32px] leading-8.5 font-extrabold">
            {count}
          </span>
          <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
            {label}
          </span>
        </span>
        <span className="truncate text-[13px]" style={{ color: theme.soft }}>
          {latestText}
        </span>
      </span>
    </Tile>
  )
}
