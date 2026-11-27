import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export function CurrencyCard({
  pair,
  rate,
  change,
  status = 'normal',
  range,
  tone = 'white',
}: {
  pair: string
  rate: string
  change: string
  status?: Status
  range: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="font-glaze-mono text-[13px] font-bold" style={{ color: theme.soft }}>
          {pair}
        </span>
        <StatusPill status={status} label={change} showDot={false} size="sm" />
      </div>
      <div className="font-glaze-display text-[36px] leading-none font-extrabold tracking-[-0.02em]">
        {rate}
      </div>
      <span className="text-[12px]" style={{ color: theme.soft }}>
        {range}
      </span>
    </Tile>
  )
}
