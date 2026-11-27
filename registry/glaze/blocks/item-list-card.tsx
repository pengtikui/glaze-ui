import * as React from 'react'
import { IconTile } from '@/components/ui/icon-tile'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'

export interface ItemListRow {
  id?: string
  mark: React.ReactNode
  hue: Hue
  name: string
  subtitle: string
  value: string
  status: Status
  statusLabel?: string
  onClick?: () => void
}

export interface ItemListCardProps {
  title: string
  summary: string
  rows: ItemListRow[]
  tone?: TileTone
}

export function ItemListCard({
  title,
  summary,
  rows,
  tone = 'white',
}: ItemListCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="l" tone={tone} className="justify-start gap-2 py-6 px-7">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[17px] font-bold">{title}</span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {summary}
        </span>
      </div>
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <button
            key={row.id ?? i}
            type="button"
            onClick={row.onClick}
            className="flex items-center gap-3 min-h-11.75 w-full border-0 bg-transparent px-1 -mx-1 rounded-[12px] text-left transition-colors hover:bg-[#F6F7F9] cursor-pointer glaze-focus"
            style={{ borderTop: i === 0 ? 'none' : '1px solid #F2F3F5' }}
          >
            <IconTile hue={row.hue} size="sm" className="w-7.5 h-7.5 rounded-[9px] text-[13px]">
              {row.mark}
            </IconTile>
            <span className="flex-1 min-w-0 flex items-baseline gap-2">
              <span className="text-[14px] font-semibold text-[#1B1F27] truncate">
                {row.name}
              </span>
              <span className="text-[12px] text-[#6B7280] truncate">
                {row.subtitle}
              </span>
            </span>
            <span className="text-[13px] text-[#5B6170] shrink-0 whitespace-nowrap">{row.value}</span>
            <StatusPill status={row.status} size="sm">
              {row.statusLabel}
            </StatusPill>
          </button>
        ))}
      </div>
    </Tile>
  )
}
