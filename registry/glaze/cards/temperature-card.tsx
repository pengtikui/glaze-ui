import * as React from 'react'
import { Minus, Plus } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { PRESS_CLASS } from '@/lib/motion'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function TemperatureCard({
  room,
  initialTemp = 23,
  mode = '制冷',
  tone = 'aqua',
}: {
  room: string
  initialTemp?: number
  mode?: string
  tone?: TileTone
}) {
  const [target, setTarget] = React.useState(initialTemp)
  const theme = TILE_THEMES[tone]
  const btnStyle: React.CSSProperties = {
    backgroundColor: theme.dark
      ? 'rgba(255,255,255,0.16)'
      : theme.bg === '#FFFFFF'
        ? '#F2F3F5'
        : 'rgba(255,255,255,0.8)',
    color: theme.ink,
  }
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[14px] font-medium" style={{ color: theme.soft }}>
          {room}
        </span>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap"
          style={{ backgroundColor: theme.track, color: theme.ink }}
        >
          {mode}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setTarget((v) => Math.max(16, v - 1))}
          className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full hover:brightness-95 ${PRESS_CLASS}`}
          style={btnStyle}
          aria-label="降低温度"
        >
          <Minus size={14} weight="bold" />
        </button>
        <div className="font-glaze-display text-[44px] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap">
          {target}°
        </div>
        <button
          type="button"
          onClick={() => setTarget((v) => Math.min(30, v + 1))}
          className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full hover:brightness-95 ${PRESS_CLASS}`}
          style={btnStyle}
          aria-label="升高温度"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>
      <div className="truncate text-center text-[12px]" style={{ color: theme.soft }}>
        室内实时 {(target + 0.4).toFixed(1)}°C
      </div>
    </Tile>
  )
}
