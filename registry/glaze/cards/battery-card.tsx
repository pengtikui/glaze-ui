import { BatteryCharging } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function BatteryCard({
  device,
  percent,
  charging = false,
  remaining,
  tone = 'mint',
}: {
  device: string
  percent: number
  charging?: boolean
  remaining: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const filled = Math.round((percent / 100) * 5)
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          {device}
        </span>
        {charging && (
          <BatteryCharging size={18} weight="fill" style={{ color: theme.accent }} />
        )}
      </div>
      <div className="font-glaze-display text-[44px] leading-none font-extrabold tracking-[-0.03em]">
        {percent}%
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 rounded-full"
              style={{
                backgroundColor: i < filled ? theme.accent : theme.track,
              }}
            />
          ))}
        </div>
        <span className="text-[12px]" style={{ color: theme.soft }}>
          {remaining}
        </span>
      </div>
    </Tile>
  )
}
