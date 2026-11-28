import * as React from 'react'
import { Cube } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'

export interface ObjectDetailCardProps {
  name: string
  subtitle: string
  status: Status
  statusLabel?: string
  icon?: React.ReactNode
  iconHue?: Hue
  fields: { label: string; value: string }[]
  tone?: TileTone
}

export function ObjectDetailCard({
  name,
  subtitle,
  status,
  statusLabel,
  icon,
  iconHue = 'aqua',
  fields,
  tone = 'white',
}: ObjectDetailCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone}>
      <div className="flex items-center gap-3">
        <IconTile hue={iconHue} size="md" className="w-10 h-10 rounded-[12px]">
          {icon ?? <Cube size={20} />}
        </IconTile>
        <span className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="text-[16px] font-bold truncate">{name}</span>
          <span className="text-[12px] truncate" style={{ color: theme.soft }}>
            {subtitle}
          </span>
        </span>
        <StatusPill status={status}>{statusLabel}</StatusPill>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[13px]">
        {fields.map((f, i) => (
          <span key={i} className="flex min-w-0 justify-between gap-2">
            <span className="shrink-0 whitespace-nowrap" style={{ color: theme.soft }}>
              {f.label}
            </span>
            <span className="font-medium truncate">{f.value}</span>
          </span>
        ))}
      </div>
    </Tile>
  )
}
