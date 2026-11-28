import { Heart } from '@phosphor-icons/react'
import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

const ECG_PULSE_DATA = [58, 58, 60, 74, 48, 62, 60, 60, 78, 50, 61, 59, 59]

export function HealthPulseCard({
  label = '静息心率',
  bpm,
  zone,
  tone = 'rose',
}: {
  label?: string
  bpm: number
  zone: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <Heart size={18} weight="fill" style={{ color: theme.accent }} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-glaze-display text-[44px] leading-none font-extrabold">
          {bpm}
        </span>
        <span className="text-[13px] font-semibold" style={{ color: theme.soft }}>
          bpm
        </span>
      </div>
      <SparkChart
        data={ECG_PULSE_DATA}
        variant="line"
        curve="linear"
        color={theme.accent}
        label={label}
        unit="bpm"
        tone={tone}
        height={30}
        strokeWidth={2.2}
      />
      <span className="truncate text-[11px]" style={{ color: theme.soft }}>
        {zone}
      </span>
    </Tile>
  )
}
