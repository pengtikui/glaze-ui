import { GaugeChart } from '@/components/ui/radial-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface GaugeCardProps {
  label: string
  subLabel?: string
  percent: number
  description: string
  tone?: TileTone
  accentColor?: string
}

export function GaugeCard({
  label,
  subLabel,
  percent,
  description,
  tone = 'white',
  accentColor,
}: GaugeCardProps) {
  const theme = TILE_THEMES[tone]
  const clamped = Math.max(0, Math.min(100, percent))

  return (
    <Tile size="s" tone={tone}>
      <span
        className="flex items-center justify-between gap-2 text-[14px] font-medium"
        style={{ color: theme.soft }}
      >
        <span className="truncate">{label}</span>
        {subLabel && <span className="shrink-0 whitespace-nowrap">{subLabel}</span>}
      </span>
      <div className="self-center">
        <GaugeChart
          value={clamped}
          max={100}
          label={label}
          valueText={`${clamped}%`}
          variant="semicircle"
          color={accentColor ?? theme.accent}
          trackColor={theme.track}
          tone={tone}
          width={142}
          height={82}
          barSize={12}
        />
      </div>
      <span className="truncate text-center text-[13px]" style={{ color: theme.soft }}>
        {description}
      </span>
    </Tile>
  )
}
