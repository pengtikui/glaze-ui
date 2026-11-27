import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export interface RankListItem {
  name: string
  value: number
  display?: string
}

export interface RankListCardProps {
  title: string
  subtitle?: string
  items: RankListItem[]
  tone?: TileTone
  barColor?: string
}

export function RankListCard({
  title,
  subtitle = '本周',
  items,
  tone = 'white',
  barColor = '#7B80EA',
}: RankListCardProps) {
  const maxVal = Math.max(...items.map((x) => x.value), 1)
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[17px] font-bold">{title}</span>
        <span className="text-[12px] text-[#6B7280]">{subtitle}</span>
      </div>
      <div className="flex flex-col gap-3.5">
        {items.map((r, i) => {
          const pct = Math.round((r.value / maxVal) * 100)
          const top3 = i < 3
          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-6.5 h-6.5 shrink-0 rounded-lg font-glaze-display text-[12px] font-extrabold"
                style={{
                  backgroundColor: top3 ? '#E4E6FD' : '#F2F3F5',
                  color: top3 ? '#4A4FB8' : '#5B6170',
                }}
              >
                {i + 1}
              </span>
              <span className="flex-1 min-w-0 flex flex-col gap-1.25">
                <span className="flex justify-between text-[13px]">
                  <span className="font-semibold truncate">{r.name}</span>
                  <span className="text-[#5B6170]">
                    {r.display ?? r.value.toLocaleString('en-US')}
                  </span>
                </span>
                <span className="h-1 rounded-xs bg-[#F2F3F5] overflow-hidden">
                  <span
                    className="block h-full rounded-xs"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                  />
                </span>
              </span>
            </div>
          )
        })}
      </div>
    </Tile>
  )
}
