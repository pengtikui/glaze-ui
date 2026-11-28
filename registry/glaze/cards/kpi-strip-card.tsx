import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Status, TileTone } from '@/lib/tokens'

export function KpiStripCard({
  metrics,
  tone = 'white',
}: {
  metrics: { label: string; value: string; delta: string; status: Status; sub: string }[]
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.slice(0, 4).map((m, i) => (
          <div
            key={m.label}
            className={i > 0 ? 'lg:border-l lg:border-[#EEF0F3] lg:pl-6' : ''}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-medium text-[#6B7280]">{m.label}</span>
              <StatusPill status={m.status} label={m.delta} showDot={false} size="sm" />
            </div>
            <div className="mt-2 font-glaze-display text-[36px] leading-none font-extrabold tracking-[-0.03em] text-[#1B1F27]">
              {m.value}
            </div>
            <div className="mt-1.5 text-[12px] text-[#8A90A0]">{m.sub}</div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
