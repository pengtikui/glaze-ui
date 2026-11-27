import { Thermometer } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function DiskTempCard({
  label,
  tempC,
  maxC = 75,
  device,
  tone = 'coral',
}: {
  label: string
  tempC: number
  maxC?: number
  device: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const pct = Math.min(100, Math.round((tempC / maxC) * 100))
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <Thermometer size={18} weight="bold" style={{ color: theme.accent }} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-glaze-display text-[44px] leading-none font-extrabold">
            {tempC}°
          </div>
          <div className="mt-1 text-[12px]" style={{ color: theme.soft }}>
            {device}
          </div>
        </div>
        <div
          className="flex h-20 w-4 items-end overflow-hidden rounded-full p-0.5"
          style={{ backgroundColor: theme.track }}
        >
          <div
            className="w-full rounded-full"
            style={{ height: `${pct}%`, backgroundColor: theme.accent }}
          />
        </div>
      </div>
    </Tile>
  )
}
