import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'

export function RevenueBreakdownCard({
  title,
  total,
  delta,
  channels,
  tone = 'white',
}: {
  title: string
  total: string
  delta: string
  channels: { name: string; amount: string; pct: number; hue: Hue }[]
  tone?: TileTone
}) {
  return (
    <Tile size="l" tone={tone} className="justify-between gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[13px] font-semibold text-[#6B7280]">{title}</div>
          <div className="mt-1 font-glaze-display text-[40px] leading-none font-extrabold tracking-[-0.03em]">
            {total}
          </div>
        </div>
        <StatusPill status="normal" label={delta} showDot={false} />
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#F2F3F5]">
        {channels.map((c) => (
          <div
            key={c.name}
            style={{ width: `${c.pct}%`, backgroundColor: HUE_PALETTES[c.hue][500] }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {channels.map((c) => (
          <div key={c.name} className="flex items-center justify-between gap-2 text-[13px]">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: HUE_PALETTES[c.hue][500] }}
              />
              <span className="truncate font-semibold text-[#1B1F27]">{c.name}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
              <span className="font-glaze-display font-extrabold">{c.amount}</span>
              <span className="w-10 text-right font-glaze-mono text-[12px] text-[#6B7280]">
                {c.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
