import { WarningCircle } from '@phosphor-icons/react'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Status, TileTone } from '@/lib/tokens'

export function IncidentLogCard({
  title,
  incidents,
  tone = 'white',
}: {
  title: string
  incidents: { id: string; title: string; service: string; status: Status; statusLabel: string; time: string }[]
  tone?: TileTone
}) {
  return (
    <Tile size="l" tone={tone} className="justify-start gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WarningCircle size={20} weight="duotone" className="text-[#E5603B]" />
          <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
        </div>
        <HueTag hue="coral" size="sm">
          近 24 小时
        </HueTag>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            className="flex items-center justify-between gap-3 rounded-2xl bg-[#F6F7F9] px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="shrink-0 font-glaze-mono text-[11px] font-bold text-[#8A90A0] whitespace-nowrap">
                  {inc.id}
                </span>
                <span className="truncate text-[13px] font-bold text-[#1B1F27]">
                  {inc.title}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[11px] text-[#6B7280]">
                影响：{inc.service} · {inc.time}
              </div>
            </div>
            <StatusPill status={inc.status} label={inc.statusLabel} size="sm" />
          </div>
        ))}
      </div>
    </Tile>
  )
}
