import { Avatar } from '@/components/ui/avatar'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'

export function ResourceAllocationCard({
  title,
  teams,
  tone = 'white',
}: {
  title: string
  teams: { name: string; share: number; hue: Hue; members: string[]; quota: string }[]
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
        <span className="text-[12px] text-[#6B7280]">按集群配额加权</span>
      </div>
      <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-[#F2F3F5]">
        {teams.map((t) => (
          <div
            key={t.name}
            style={{ width: `${t.share}%`, backgroundColor: HUE_PALETTES[t.hue][500] }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((t) => (
          <div
            key={t.name}
            className="flex items-center justify-between rounded-inner bg-[#F6F7F9] px-4 py-3"
          >
            <div>
              <div className="flex items-center gap-1.5 text-[13px] font-bold">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: HUE_PALETTES[t.hue][500] }}
                />
                {t.name}
              </div>
              <div className="mt-0.5 text-[12px] text-[#6B7280]">
                {t.quota} · {t.share}%
              </div>
            </div>
            <div className="flex -space-x-2">
              {t.members.map((m, idx) => (
                <Avatar key={idx} fallback={m} hue={t.hue} size="xs" className="ring-2 ring-white" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
