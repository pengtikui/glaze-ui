import { Avatar } from '@/components/ui/avatar'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function ActivityFeedCard({
  title,
  feed,
  tone = 'white',
}: {
  title: string
  feed: { user: string; initials: string; hue: Hue; action: string; target: string; time: string }[]
  tone?: TileTone
}) {
  return (
    <Tile size="l" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {feed.map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border-b border-[#EEF0F3] pb-2.5 last:border-b-0 last:pb-0"
          >
            <Avatar fallback={f.initials} hue={f.hue} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] leading-snug text-[#1B1F27]">
                <strong className="font-bold">{f.user}</strong>{' '}
                <span className="text-[#5B6170]">{f.action}</span>{' '}
                <span className="font-semibold text-[#4A4FB8]">{f.target}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-[#8A90A0]">{f.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
