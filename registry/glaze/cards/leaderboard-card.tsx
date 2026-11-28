import { Trophy } from '@phosphor-icons/react'
import { Avatar } from '@/components/ui/avatar'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function LeaderboardCard({
  title,
  entries,
  tone = 'white',
}: {
  title: string
  entries: { name: string; initials: string; hue: Hue; score: string; sub?: string }[]
  tone?: TileTone
}) {
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        <Trophy size={18} weight="duotone" className="text-[#E3A33B]" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {entries.map((e, idx) => (
          <div key={e.name} className="flex items-center justify-between gap-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-glaze-display text-[12px] font-extrabold"
                style={{
                  backgroundColor: idx === 0 ? '#FBF3C9' : '#F2F3F5',
                  color: idx === 0 ? '#6E5A06' : '#5B6170',
                }}
              >
                {idx + 1}
              </span>
              <Avatar fallback={e.initials} hue={e.hue} size="sm" />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-bold text-[#1B1F27]">{e.name}</div>
                {e.sub && <div className="truncate text-[11px] text-[#8A90A0]">{e.sub}</div>}
              </div>
            </div>
            <span className="shrink-0 font-glaze-display text-[14px] font-extrabold text-[#1B1F27]">
              {e.score}
            </span>
          </div>
        ))}
      </div>
    </Tile>
  )
}
