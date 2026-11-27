import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function KanbanMiniCard({
  title,
  columns,
  tone = 'white',
}: {
  title: string
  columns: {
    name: string
    hue: Hue
    cards: { title: string; tag: string; owner: string }[]
  }[]
  tone?: TileTone
}) {
  return (
    <Tile size="l" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
      <div className="grid flex-1 grid-cols-2 gap-3">
        {columns.slice(0, 2).map((col) => (
          <div key={col.name} className="flex flex-col gap-2.5 rounded-overlay bg-[#F6F7F9] p-3.5">
            <div className="flex items-center justify-between">
              <HueTag hue={col.hue} size="sm">
                {col.name}
              </HueTag>
              <span className="font-glaze-mono text-[11px] font-bold text-[#8A90A0]">
                {col.cards.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {col.cards.map((c) => (
                <div key={c.title} className="rounded-control bg-white p-3">
                  <div className="text-[13px] font-bold text-[#1B1F27]">{c.title}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>{c.tag}</span>
                    <span className="font-semibold text-[#1B1F27]">{c.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
