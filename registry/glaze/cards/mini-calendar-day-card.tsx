import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function MiniCalendarDayCard({
  month,
  day,
  weekday,
  eventsCount,
  tone = 'rose',
}: {
  month: string
  day: number
  weekday: string
  eventsCount: number
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
          style={{ backgroundColor: theme.accent, color: '#FFFFFF' }}
        >
          {month}
        </span>
        <span className="text-[12px] font-semibold" style={{ color: theme.soft }}>
          {weekday}
        </span>
      </div>
      <div className="font-glaze-display text-[60px] leading-none font-extrabold tracking-[-0.04em]">
        {day}
      </div>
      <span className="text-[12px] font-medium" style={{ color: theme.soft }}>
        今日 {eventsCount} 场日程安排
      </span>
    </Tile>
  )
}
