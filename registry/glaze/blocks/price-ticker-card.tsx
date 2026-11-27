import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Status, TileTone } from '@/lib/tokens'

export function PriceTickerCard({
  title,
  tickers,
  tone = 'white',
}: {
  title: string
  tickers: { symbol: string; name: string; price: string; delta: string; status: Status }[]
  tone?: TileTone
}) {
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {tickers.map((t) => (
          <div
            key={t.symbol}
            className="flex items-center justify-between gap-2 border-b border-[#EEF0F3] pb-2.5 last:border-b-0 last:pb-0"
          >
            <div>
              <div className="font-glaze-mono text-[13px] font-bold text-[#1B1F27]">
                {t.symbol}
              </div>
              <div className="text-[11px] text-[#8A90A0]">{t.name}</div>
            </div>
            <div className="text-right">
              <div className="font-glaze-display text-[14px] font-extrabold">{t.price}</div>
              <StatusPill status={t.status} label={t.delta} showDot={false} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
