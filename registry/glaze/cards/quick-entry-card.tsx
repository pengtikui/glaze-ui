import * as React from 'react'
import { ArrowUpRight, TerminalWindow } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface QuickEntryCardProps {
  title: string
  subtitle: string
  icon?: React.ReactNode
  tone?: TileTone
  href?: string
  onClick?: () => void
}

export function QuickEntryCard({
  title,
  subtitle,
  icon,
  tone = 'sky-dark',
  href,
  onClick,
}: QuickEntryCardProps) {
  const theme = TILE_THEMES[tone]
  const iconHue =
    tone in HUE_PALETTES
      ? (tone as Hue)
      : theme.dark
        ? 'dark-glass'
        : 'sky'
  return (
    <Tile size="s" tone={tone} href={href} onClick={onClick} interactive>
      <span className="flex items-start justify-between gap-2">
        <IconTile hue={iconHue} size="md">
          {icon ?? <TerminalWindow size={22} />}
        </IconTile>
        <ArrowUpRight size={20} weight="bold" className="shrink-0" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[20px] font-bold">{title}</span>
        <span className="truncate text-[13px]" style={{ color: theme.soft }}>
          {subtitle}
        </span>
      </span>
    </Tile>
  )
}
