import { CloudSun } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function WeatherCard({
  city,
  temp,
  condition,
  feelsLike,
  tone = 'sky',
}: {
  city: string
  temp: number
  condition: string
  feelsLike: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[14px] font-medium" style={{ color: theme.soft }}>
          {city}
        </span>
        <CloudSun size={24} weight="duotone" className="shrink-0" style={{ color: theme.accent }} />
      </div>
      <div className="min-w-0">
        <div className="font-glaze-display text-[52px] leading-none font-extrabold tracking-[-0.03em]">
          {temp}°
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 text-[12px]" style={{ color: theme.soft }}>
          <span className="shrink-0 font-semibold whitespace-nowrap" style={{ color: theme.ink }}>
            {condition}
          </span>
          <span className="truncate">{feelsLike}</span>
        </div>
      </div>
    </Tile>
  )
}
