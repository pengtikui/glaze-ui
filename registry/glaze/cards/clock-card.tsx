import * as React from 'react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface ClockCardProps {
  weekday?: string
  time?: string
  dateText?: string
  live?: boolean
  tone?: TileTone
}

export function ClockCard({
  weekday,
  time,
  dateText,
  live = false,
  tone = 'periwinkle',
}: ClockCardProps) {
  const theme = TILE_THEMES[tone]
  const [now, setNow] = React.useState(() => new Date())

  React.useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [live])

  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const displayWeekday = weekday ?? weekdays[now.getDay()]
  const displayTime =
    time ??
    `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const displayDate =
    dateText ??
    `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`

  return (
    <Tile size="s" tone={tone}>
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {displayWeekday}
      </span>
      <span className="font-glaze-display text-[56px] xl:text-[60px] leading-15.5 font-extrabold tracking-[-0.03em]">
        {displayTime}
      </span>
      <span className="text-[13px]" style={{ color: theme.soft }}>
        {displayDate}
      </span>
    </Tile>
  )
}
