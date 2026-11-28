import * as React from 'react'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'
import { Switch } from '@/components/ui/switch'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface SwitchCardProps {
  title: string
  description: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  icon?: React.ReactNode
  iconHue?: Hue
  tone?: TileTone
}

export function SwitchCard({
  title,
  description,
  checked,
  defaultChecked = true,
  onCheckedChange,
  icon,
  iconHue = 'mint',
  tone = 'white',
}: SwitchCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone}>
      <span className="flex items-start justify-between">
        <IconTile hue={iconHue} size="md">
          {icon ?? <ArrowsClockwise size={22} />}
        </IconTile>
        <Switch
          hue={iconHue}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          aria-label={title}
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[18px] font-bold">{title}</span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {description}
        </span>
      </span>
    </Tile>
  )
}
