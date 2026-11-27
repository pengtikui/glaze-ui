import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface GraphicMetricCardProps {
  label: string
  value: string | number
  description: string
  tone?: TileTone
}

export function GraphicMetricCard({
  label,
  value,
  description,
  tone = 'aqua',
}: GraphicMetricCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone}>
      <svg
        aria-hidden="true"
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="pointer-events-none absolute -right-15 -bottom-17.5 fill-none"
      >
        <circle cx="110" cy="110" r="28" stroke={theme.accent} strokeOpacity="0.8" strokeWidth="10" />
        <circle cx="110" cy="110" r="52" stroke={theme.accent} strokeOpacity="0.45" strokeWidth="10" />
        <circle cx="110" cy="110" r="76" stroke={theme.accent} strokeOpacity="0.22" strokeWidth="10" />
        <circle cx="110" cy="110" r="100" stroke={theme.accent} strokeOpacity="0.1" strokeWidth="10" />
      </svg>
      <span className="relative text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="relative flex flex-col gap-0.5">
        <span className="font-glaze-display text-[44px] leading-11.5 font-extrabold tracking-[-0.03em]">
          {value}
        </span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {description}
        </span>
      </span>
    </Tile>
  )
}
