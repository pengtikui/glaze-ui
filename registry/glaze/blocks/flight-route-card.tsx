import { AirplaneTilt } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function FlightRouteCard({
  flightNo,
  fromCode,
  fromCity,
  toCode,
  toCity,
  departTime,
  arriveTime,
  gate,
  tone = 'sky-dark',
}: {
  flightNo: string
  fromCode: string
  fromCity: string
  toCode: string
  toCity: string
  departTime: string
  arriveTime: string
  gate: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between text-[12px]" style={{ color: theme.soft }}>
        <span className="font-glaze-mono font-bold" style={{ color: theme.ink }}>
          {flightNo}
        </span>
        <span>登机口 {gate}</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="shrink-0">
          <div className="font-glaze-display text-[30px] leading-none font-extrabold">
            {fromCode}
          </div>
          <div className="mt-1 text-[12px] whitespace-nowrap" style={{ color: theme.soft }}>
            {fromCity} · {departTime}
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: theme.divider }} />
          <AirplaneTilt size={20} weight="fill" className="shrink-0" style={{ color: theme.accent }} />
          <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: theme.divider }} />
        </div>
        <div className="shrink-0 text-right">
          <div className="font-glaze-display text-[30px] leading-none font-extrabold">
            {toCode}
          </div>
          <div className="mt-1 text-[12px] whitespace-nowrap" style={{ color: theme.soft }}>
            {toCity} · {arriveTime}
          </div>
        </div>
      </div>
    </Tile>
  )
}
