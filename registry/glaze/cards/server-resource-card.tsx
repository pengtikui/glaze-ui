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
    <Tile size="w" tone={tone} className="justify-between gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[14px] font-semibold" style={{ color: theme.soft }}>
          {nodeName}
        </span>
        <StatusPill status="normal" label="健康" size="sm" />
      </div>

      <div className="my-auto grid grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex min-w-0 items-center gap-3.5">
            <Progress
              variant="ring"
              value={it.val}
              size={88}
              strokeWidth={8}
              hue={it.hue}
              trackColor={theme.track}
              showValue
              className="shrink-0"
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <div className="truncate font-glaze-display text-[15px] font-extrabold">
                {it.label}
              </div>
              <div className="truncate text-[12px] font-medium" style={{ color: theme.soft }}>
                {it.val >= 80 ? '偏高' : it.val >= 55 ? '中等' : '正常'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
