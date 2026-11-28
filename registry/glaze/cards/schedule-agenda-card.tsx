import { CalendarBlank } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function ScheduleAgendaCard({
  dateLabel,
  events,
  tone = 'sky',
}: {
  dateLabel: string
  events: { time: string; title: string; room: string; hue: Hue }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const cardBg = theme.dark
    ? 'rgba(255,255,255,0.1)'
    : theme.bg === '#FFFFFF'
      ? '#F6F7F9'
      : 'rgba(255,255,255,0.75)'
  return (
    <Tile size="t" tone={tone} padding="compact" className="justify-start gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-glaze-display text-[17px] font-extrabold">{dateLabel}</span>
        <CalendarBlank size={18} weight="duotone" className="shrink-0" style={{ color: theme.accent }} />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        {events.map((ev) => (
          <div
            key={`${ev.time}-${ev.title}`}
            className="flex gap-2.5 rounded-2xl px-3 py-2"
            style={{ backgroundColor: cardBg }}
          >
            <span
              className="w-1 shrink-0 rounded-full"
              style={{ backgroundColor: HUE_PALETTES[ev.hue][500] }}
            />
            <div className="min-w-0 flex-1">
              <div className="font-glaze-mono text-[11px] font-bold" style={{ color: theme.soft }}>
                {ev.time}
              </div>
              <div className="truncate text-[13px] font-bold" style={{ color: theme.ink }}>
                {ev.title}
              </div>
              <div className="truncate text-[11px]" style={{ color: theme.soft }}>
                {ev.room}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
