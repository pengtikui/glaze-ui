import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function DeviceControlStripCard({
  title,
  devices,
  tone = 'white',
}: {
  title: string
  devices: { id: string; name: string; sub: string; hue: Hue; defaultOn: boolean }[]
  tone?: TileTone
}) {
  const [state, setState] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(devices.map((d) => [d.id, d.defaultOn])),
  )
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
        {title}
      </span>
      <div className="grid grid-cols-3 gap-2.5">
        {devices.slice(0, 3).map((d) => {
          const on = Boolean(state[d.id])
          return (
            <div
              key={d.id}
              className="flex flex-col justify-between gap-3 rounded-inner p-3 transition-colors duration-200"
              style={{
                backgroundColor: on ? HUE_PALETTES[d.hue][50] : '#F6F7F9',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-bold text-[#1B1F27]">{d.name}</span>
                <Switch
                  size="sm"
                  hue={d.hue}
                  checked={on}
                  onCheckedChange={(v) => setState((prev) => ({ ...prev, [d.id]: v }))}
                />
              </div>
              <span className="truncate text-[11px] text-[#6B7280]">{on ? d.sub : '已关闭'}</span>
            </div>
          )
        })}
      </div>
    </Tile>
  )
}
