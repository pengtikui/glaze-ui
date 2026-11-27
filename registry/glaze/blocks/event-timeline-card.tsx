import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import { SEMANTIC_TOKENS, type Status, type TileTone } from '@/lib/tokens'

export interface TimelineEvent {
  id?: string
  text: string
  time: string
  status?: Status
  color?: string
}

export interface EventTimelineCardProps {
  title: string
  subtitle?: string
  events: TimelineEvent[]
  tone?: TileTone
}

export function EventTimelineCard({
  title,
  subtitle = '今天',
  events,
  tone = 'white',
}: EventTimelineCardProps) {
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[17px] font-bold">{title}</span>
        <span className="text-[12px] text-[#6B7280]">{subtitle}</span>
      </div>
      <div className="flex flex-col">
        {events.map((ev, i) => {
          const isLast = i === events.length - 1
          const dotColor =
            ev.color ?? SEMANTIC_TOKENS[ev.status ?? 'normal'].dot
          return (
            <div
              key={ev.id ?? i}
              className="relative flex gap-3 pb-4 last:pb-0"
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-3 bottom-0 w-0.5 bg-[#EEF0F3]"
                />
              )}
              <StatusDot
                color={dotColor}
                size="md"
                className="relative mt-1"
              />
              <span className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[13px] font-semibold leading-5 truncate">
                  {ev.text}
                </span>
                <span className="text-[12px] text-[#6B7280]">{ev.time}</span>
              </span>
            </div>
          )
        })}
      </div>
    </Tile>
  )
}
