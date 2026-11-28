import * as React from 'react'
import { addDays, differenceInCalendarDays, format } from 'date-fns'
import { CalendarBlank } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Calendar, type DateRange } from '@/components/ui/calendar'
import { Popover } from '@/components/ui/popover'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface DateRangeCardProps {
  title?: string
  initialFrom?: Date
  initialTo?: Date
  presets?: { label: string; days: number }[]
  tone?: TileTone
  accent?: Hue | 'ink'
  onChange?: (range: DateRange | undefined) => void
}

const DEFAULT_FROM = new Date(2026, 10, 12)
const DEFAULT_TO = new Date(2026, 10, 26)

export function DateRangeCard({
  title = '统计周期',
  initialFrom = DEFAULT_FROM,
  initialTo = DEFAULT_TO,
  presets = [
    { label: '近 7 天', days: 6 },
    { label: '近 14 天', days: 13 },
    { label: '近 30 天', days: 29 },
  ],
  tone = 'white',
  accent = 'periwinkle',
  onChange,
}: DateRangeCardProps) {
  const theme = TILE_THEMES[tone]
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: initialFrom,
    to: initialTo,
  })

  const dayCount = React.useMemo(() => {
    if (!range?.from) return 0
    const end = range.to ?? range.from
    return Math.max(1, differenceInCalendarDays(end, range.from) + 1)
  }, [range])

  const applyRange = (next: DateRange | undefined) => {
    setRange(next)
    onChange?.(next)
  }

  const applyPreset = (days: number) => {
    const end = new Date(2026, 10, 29)
    applyRange({ from: addDays(end, -days), to: end })
  }

  return (
    <Tile size="w" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
          {title}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold tabular-nums"
          style={{ backgroundColor: theme.track, color: theme.ink }}
        >
          共 {dayCount} 天
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-glaze-display text-[22px] leading-tight font-extrabold tabular-nums">
            {range?.from ? format(range.from, 'yyyy/MM/dd') : '选择起始日期'}
            {' — '}
            {range?.to ? format(range.to, 'MM/dd') : '待定'}
          </span>
          <span className="text-[12px]" style={{ color: theme.soft }}>
            支持跨月区间选择与快捷周期切换
          </span>
        </div>

        <Popover
          trigger={
            <Button variant="secondary" size="sm">
              <CalendarBlank size={15} weight="bold" />
              <span>修改区间</span>
            </Button>
          }
          side="bottom"
          align="end"
          className="w-auto p-3"
        >
          <Calendar
            mode="range"
            surface="embedded"
            size="sm"
            accent={accent}
            selected={range}
            onSelect={applyRange}
            defaultMonth={range?.from ?? DEFAULT_FROM}
          />
        </Popover>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.days)}
            className={`cursor-pointer rounded-full px-3 py-1 text-[12px] font-semibold transition-colors hover:brightness-95 ${PRESS_CLASS}`}
            style={{ backgroundColor: theme.track, color: theme.ink }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </Tile>
  )
}
