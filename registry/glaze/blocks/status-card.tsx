import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export interface StatusCardProps {
  label: string
  statusText: string
  description: string
  status?: Status
  tone?: TileTone
  animated?: boolean
  onClick?: () => void
}

export function StatusCard({
  label,
  statusText,
  description,
  status = 'normal',
  tone = 'mint',
  animated = true,
  onClick,
}: StatusCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} onClick={onClick} interactive={Boolean(onClick)}>
      <StatusDot
        status={status}
        animated={animated}
        size="lg"
        className="absolute right-6.5 top-7"
      />
      <span className="truncate pr-6 text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-glaze-display text-[44px] leading-12 font-extrabold">
          {statusText}
        </span>
        <span className="truncate text-[13px]" style={{ color: theme.soft }}>
          {description}
        </span>
      </span>
    </Tile>
  )
}
