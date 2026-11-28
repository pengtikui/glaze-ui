import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function HabitTrackerCard({
  title,
  habits,
  tone = 'mint',
}: {
  title: string
  habits: { name: string; hue: Hue; days: boolean[] }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        <span className="text-[11px] font-semibold" style={{ color: theme.soft }}>
          本周 7 天
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3">
        {habits.map((h) => (
          <div
            key={h.name}
            className="flex flex-col gap-1.5 rounded-2xl p-3"
            style={{
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,0.1)'
                : theme.bg === '#FFFFFF'
                  ? '#F6F7F9'
                  : 'rgba(255,255,255,0.65)',
            }}
          >
            <div className="flex items-center justify-between gap-2 text-[13px] font-bold" style={{ color: theme.ink }}>
              <span className="truncate">{h.name}</span>
              <span className="shrink-0 text-[11px] whitespace-nowrap" style={{ color: theme.soft }}>
                {h.days.filter(Boolean).length}/7
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {h.days.slice(0, 7).map((done, i) => (
                <span
                  key={i}
                  className="h-3 rounded-full"
                  style={{
                    backgroundColor: done ? HUE_PALETTES[h.hue][500] : theme.track,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
