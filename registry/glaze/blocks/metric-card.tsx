import * as React from 'react'
import { TrendUp } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  tone?: TileTone
  onClick?: () => void
}

export function MetricCard({
  label,
  value,
  unit,
  icon,
  tone = 'sky',
  onClick,
}: MetricCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} onClick={onClick} interactive={Boolean(onClick)}>
      <span
        className="flex items-center justify-between gap-2 text-[14px] font-medium"
        style={{ color: theme.soft }}
      >
        <span className="truncate">{label}</span>
        <span className="shrink-0">{icon ?? <TrendUp size={18} weight="bold" />}</span>
      </span>
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="font-glaze-display text-[52px] xl:text-[56px] leading-14.5 font-extrabold tracking-[-0.03em]">
          {value}
        </span>
        {unit && (
          <span className="text-[15px] font-semibold" style={{ color: theme.soft }}>
            {unit}
          </span>
        )}
      </span>
    </Tile>
  )
}
