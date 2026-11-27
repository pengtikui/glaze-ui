import { WifiHigh } from '@phosphor-icons/react'
import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function SignalStrengthCard({
  ssid,
  bars = 4,
  latency,
  band,
  tone = 'white',
}: {
  ssid: string
  bars?: number
  latency: string
  band: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          无线网络
        </span>
        <WifiHigh size={18} weight="bold" style={{ color: theme.accent }} />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate font-glaze-display text-[20px] font-extrabold">{ssid}</div>
          <div className="truncate text-[12px]" style={{ color: theme.soft }}>
            {band}
          </div>
        </div>
        <div className="flex shrink-0 items-end gap-1">
          {[10, 16, 22, 28].map((h, i) => (
            <span
              key={i}
              className="w-2 rounded-full"
              style={{
                height: h,
                backgroundColor: i < bars ? '#49A851' : theme.track,
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[12px]" style={{ color: theme.soft }}>
        <StatusDot status="normal" size={7} />
        <span>延迟 {latency}</span>
      </div>
    </Tile>
  )
}
