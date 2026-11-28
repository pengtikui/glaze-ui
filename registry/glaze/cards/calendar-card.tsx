import * as React from 'react'
import { Calendar, CalendarDayButton } from '@/components/ui/calendar'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface CalendarCardProps {
  initialYear?: number
  initialMonth?: number // 1..12
  todayDay?: number
  eventDays?: number[]
  tone?: TileTone
  onSelectDate?: (year: number, month: number, day: number) => void
}

const TONE_TO_ACCENT: Partial<Record<TileTone, Hue | 'ink'>> = {
  white: 'periwinkle',
  sky: 'sky',
  mint: 'mint',
  peach: 'peach',
  lilac: 'lilac',
  rose: 'rose',
  lemon: 'lemon',
  aqua: 'aqua',
  periwinkle: 'periwinkle',
  coral: 'coral',
  'sky-dark': 'sky',
  'lilac-dark': 'lilac',
  'aqua-dark': 'aqua',
  ink: 'ink',
}

export function CalendarCard({
  initialYear = 2026,
  initialMonth = 11,
  todayDay = 24,
  eventDays = [5, 12, 18, 27],
  tone = 'lilac',
  onSelectDate,
}: CalendarCardProps) {
  const theme = TILE_THEMES[tone]
  const [month, setMonth] = React.useState(() => new Date(initialYear, initialMonth - 1, 1))
  const [selected, setSelected] = React.useState<Date | undefined>(
    () => new Date(initialYear, initialMonth - 1, todayDay),
  )

  const eventDaySet = React.useMemo(() => new Set(eventDays), [eventDays])
  const accent = TONE_TO_ACCENT[tone] ?? 'periwinkle'

  return (
    <Tile size="l" tone={tone} className="justify-between gap-2 py-5 px-6">
      <div className="flex items-center justify-between gap-2">
        <span className="font-glaze-display text-[18px] font-extrabold">
          日程日历
        </span>
        <span className="text-[12px] font-semibold" style={{ color: theme.soft }}>
          {selected
            ? `${selected.getFullYear()} 年 ${selected.getMonth() + 1} 月 ${selected.getDate()} 日`
            : `${month.getFullYear()} 年 ${month.getMonth() + 1} 月`}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Calendar
          mode="single"
          surface="embedded"
          size="sm"
          accent={accent}
          month={month}
          onMonthChange={setMonth}
          selected={selected}
          onSelect={(date) => {
            setSelected(date)
            if (date) {
              onSelectDate?.(date.getFullYear(), date.getMonth() + 1, date.getDate())
            }
          }}
          components={{
            DayButton: (props) => {
              const isInDisplayedMonth =
                props.day.date.getMonth() === month.getMonth() &&
                props.day.date.getFullYear() === month.getFullYear()
              const hasEvent = isInDisplayedMonth && eventDaySet.has(props.day.date.getDate())
              return (
                <CalendarDayButton {...props} showTodayDot={false}>
                  <span>{props.day.date.getDate()}</span>
                  {hasEvent && !props.modifiers.selected && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                  )}
                </CalendarDayButton>
              )
            },
          }}
          className="w-full"
        />
      </div>
    </Tile>
  )
}
