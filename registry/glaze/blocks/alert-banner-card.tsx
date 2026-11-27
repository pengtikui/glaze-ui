import * as React from 'react'
import { Warning } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { IconTile } from '@/components/ui/icon-tile'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface AlertBannerCardProps {
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
  icon?: React.ReactNode
  tone?: TileTone
}

export function AlertBannerCard({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  tone = 'coral',
}: AlertBannerCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile
      size="w"
      tone={tone}
      className="flex-row items-center gap-5 sm:gap-6 px-7"
    >
      <IconTile hue="coral-solid" size="xl" style={{ backgroundColor: theme.accent }}>
        {icon ?? <Warning size={30} />}
      </IconTile>
      <span className="flex-1 min-w-0 flex flex-col gap-1.5">
        <span className="font-glaze-display text-[20px] sm:text-[22px] leading-7 font-extrabold">
          {title}
        </span>
        <span className="text-[14px] leading-5.5" style={{ color: theme.soft }}>
          {description}
        </span>
      </span>
      <Button
        variant="dark-on-coral"
        onClick={onAction}
        style={{ backgroundColor: theme.ink, color: theme.dark ? theme.bg : '#FFFFFF' }}
        className="shrink-0"
      >
        {actionLabel}
      </Button>
    </Tile>
  )
}
