import * as React from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface CalendarCardProps {
  initialYear?: number
  initialMonth?: number // 1..12
  todayDay?: number
  eventDays?: number[]
  tone?: TileTone
  onSelectDate?: (year: number, month: number, day: number) => void
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
  const [year, setYear] = React.useState(initialYear)
  const [month, setMonth] = React.useState(initialMonth)
  const [selectedDay, setSelectedDay] = React.useState<number | null>(todayDay)

  const prevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1)
      setMonth(12)
    } else {
      setMonth((m) => m - 1)
    }
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1)
      setMonth(1)
    } else {
      setMonth((m) => m + 1)
    }
    setSelectedDay(null)
  }

  const cells = React.useMemo(() => {
    const firstDow = (new Date(year, month - 1, 1).getDay() + 6) % 7 // Mon = 0
    const daysInMonth = new Date(year, month, 0).getDate()
    const prevMonthDays = new Date(year, month - 1, 0).getDate()
    const list: { n: number; inMonth: boolean }[] = []
    for (let i = 0; i < 42; i++) {
      const day = i - firstDow + 1
      if (day < 1) {
        list.push({ n: prevMonthDays + day, inMonth: false })
      } else if (day > daysInMonth) {
        list.push({ n: day - daysInMonth, inMonth: false })
      } else {
        list.push({ n: day, inMonth: true })
      }
    }
    return list
  }, [year, month])

  return (
    <Tile size="l" tone={tone} className="justify-start gap-3.5 py-6 px-7">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[22px] font-extrabold">
          {year} 年 {month} 月
        </span>
        <span className="flex gap-1.5">
          <button
            type="button"
            aria-label="上个月"
            onClick={prevMonth}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border-0 cursor-pointer transition-[opacity,transform] duration-150 hover:opacity-80 active:scale-95 glaze-focus"
            style={{ backgroundColor: theme.track, color: theme.ink }}
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="下个月"
            onClick={nextMonth}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border-0 cursor-pointer transition-[opacity,transform] duration-150 hover:opacity-80 active:scale-95 glaze-focus"
            style={{ backgroundColor: theme.track, color: theme.ink }}
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </span>
      </div>

      <div
        className="grid grid-cols-7 text-center text-[12px] font-semibold"
        style={{ color: theme.soft }}
      >
        {['一', '二', '三', '四', '五', '六', '日'].map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {cells.map((cell, idx) => {
          const isSelected = cell.inMonth && selectedDay === cell.n
          const hasEvent = cell.inMonth && eventDays.includes(cell.n)
          return (
            <button
              key={idx}
              type="button"
              disabled={!cell.inMonth}
              onClick={() => {
                if (!cell.inMonth) return
                setSelectedDay(cell.n)
                onSelectDate?.(year, month, cell.n)
              }}
              className="flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent p-0 cursor-pointer disabled:cursor-default glaze-focus rounded-[12px]"
            >
              <span
                className="flex items-center justify-center w-8.5 h-8.5 rounded-full text-[14px] transition-colors"
                style={{
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? theme.ink : 'transparent',
                  color: isSelected
                    ? theme.bg
                    : cell.inMonth
                      ? theme.ink
                      : `${theme.ink}59`,
                }}
              >
                {cell.n}
              </span>
              <span
                className="w-1.25 h-1.25 rounded-full"
                style={{
                  backgroundColor: hasEvent ? theme.accent : 'transparent',
                }}
              />
            </button>
          )
        })}
      </div>
    </Tile>
  )
}
