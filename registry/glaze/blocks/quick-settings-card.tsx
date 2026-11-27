import * as React from 'react'
import { Switch } from '@/components/ui/switch'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export function QuickSettingsCard({
  title,
  settings,
  tone = 'white',
}: {
  title: string
  settings: { id: string; label: string; desc: string; hue: Hue; defaultChecked: boolean }[]
  tone?: TileTone
}) {
  const [map, setMap] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(settings.map((s) => [s.id, s.defaultChecked])),
  )
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-3">
        {settings.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-[13px] font-bold text-[#1B1F27]">{s.label}</div>
              <div className="truncate text-[11px] text-[#6B7280]">{s.desc}</div>
            </div>
            <Switch
              size="sm"
              hue={s.hue}
              checked={Boolean(map[s.id])}
              onCheckedChange={(v) => setMap((prev) => ({ ...prev, [s.id]: v }))}
            />
          </div>
        ))}
      </div>
    </Tile>
  )
}
