import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'

export function GanttScheduleCard({
  title,
  weeks,
  lanes,
  tone = 'white',
}: {
  title: string
  weeks: string[]
  lanes: { name: string; owner: string; startPct: number; widthPct: number; hue: Hue }[]
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex items-center justify-between gap-4">
        <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="hidden items-center gap-4 sm:flex">
          <div className="w-36 shrink-0 text-[11px] font-semibold text-[#8A90A0]">工作项</div>
          <div
            className="grid flex-1 text-[11px] font-semibold text-[#8A90A0]"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
          >
            {weeks.map((w) => (
              <span key={w} className="px-2">{w}</span>
            ))}
          </div>
        </div>
        {lanes.map((lane) => (
          <div key={lane.name} className="flex items-center gap-4">
            <div className="w-36 shrink-0">
              <div className="truncate text-[13px] font-bold text-[#1B1F27]">{lane.name}</div>
              <div className="truncate text-[11px] text-[#8A90A0]">{lane.owner}</div>
            </div>
            <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-[#F6F7F9]">
              <div
                className="absolute top-1 bottom-1 flex items-center overflow-hidden rounded-full px-3 text-[11px] font-bold"
                style={{
                  left: `${lane.startPct}%`,
                  width: `${lane.widthPct}%`,
                  backgroundColor: HUE_PALETTES[lane.hue][100],
                  color: HUE_PALETTES[lane.hue][700],
                }}
              >
                <span className="truncate">{lane.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
