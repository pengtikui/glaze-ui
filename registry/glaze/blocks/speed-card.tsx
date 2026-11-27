import { GaugeChart } from '@/components/ui/radial-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function SpeedCard({
  label,
  value,
  max,
  unit,
  sub,
  tone = 'white',
}: {
  label: string
  value: number
  max: number
  unit: string
  sub?: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div className="flex flex-col items-center">
        <GaugeChart
          value={value}
          max={max}
          label={label}
          valueText={value}
          unit={unit}
          variant="semicircle"
          color={theme.accent}
          trackColor={theme.track}
          tone={tone}
          width={136}
          height={78}
          barSize={10}
        />
      </div>
      {sub && (
        <span className="text-center text-[12px]" style={{ color: theme.soft }}>
          {sub}
        </span>
      )}
    </Tile>
  )
}
