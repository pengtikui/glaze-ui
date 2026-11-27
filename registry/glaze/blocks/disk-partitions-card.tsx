import { Meter } from '@/components/ui/meter'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export function DiskPartitionsCard({
  title,
  volumes,
  tone = 'white',
}: {
  title: string
  volumes: { name: string; usedGb: number; totalGb: number; mount: string }[]
  tone?: TileTone
}) {
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-3">
        {volumes.map((v) => (
          <div key={v.name} className="flex flex-col gap-1">
            <Meter
              label={v.name}
              value={v.usedGb}
              max={v.totalGb}
              valueLabel={`${v.usedGb}/${v.totalGb} GB`}
            />
            <span className="font-glaze-mono text-[11px] text-[#8A90A0]">{v.mount}</span>
          </div>
        ))}
      </div>
    </Tile>
  )
}
