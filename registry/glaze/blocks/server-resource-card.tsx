import { Progress } from '@/components/ui/progress'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function ServerResourceCard({
  nodeName,
  cpu,
  ram,
  disk,
  tone = 'white',
}: {
  nodeName: string
  cpu: number
  ram: number
  disk: number
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const items: { label: string; val: number; hue: Hue }[] = [
    { label: 'CPU', val: cpu, hue: 'periwinkle' },
    { label: '内存', val: ram, hue: 'aqua' },
    { label: '磁盘', val: disk, hue: 'peach' },
  ]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
          {nodeName}
        </span>
        <StatusPill status="normal" label="健康" size="sm" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.label} className="flex min-w-0 items-center gap-2.5">
            <Progress
              variant="ring"
              value={it.val}
              size={56}
              strokeWidth={6}
              hue={it.hue}
              trackColor={theme.track}
              showValue
              className="shrink-0"
            />
            <div className="min-w-0">
              <div className="truncate font-glaze-display text-[14px] font-extrabold">
                {it.label}
              </div>
              <div className="truncate text-[11px]" style={{ color: theme.soft }}>
                {it.val >= 80 ? '偏高' : it.val >= 55 ? '中等' : '正常'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
