import { CloudSun } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function WeatherForecastCard({
  location,
  days,
  tone = 'sky',
}: {
  location: string
  days: { day: string; low: number; high: number; rain: string }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
          {location} · 5 日预报
        </span>
        <CloudSun size={18} weight="duotone" style={{ color: theme.accent }} />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {days.slice(0, 5).map((d) => (
          <div
            key={d.day}
            className="flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1.5 py-2.5"
            style={{
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,0.1)'
                : theme.bg === '#FFFFFF'
                  ? '#F6F7F9'
                  : 'rgba(255,255,255,0.6)',
            }}
          >
            <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: theme.soft }}>
              {d.day}
            </span>
            <span className="font-glaze-display text-[17px] font-extrabold whitespace-nowrap">
              {d.high}°
            </span>
            <span className="text-[11px] whitespace-nowrap" style={{ color: theme.soft }}>
              {d.low}° · {d.rain}
            </span>
          </div>
        ))}
      </div>
    </Tile>
  )
}
