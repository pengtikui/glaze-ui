import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { Status, TileTone } from '@/lib/tokens'

export function ServiceStatusMatrixCard({
  title,
  services,
  tone = 'white',
}: {
  title: string
  services: { name: string; region: string; uptime: string; status: Status; bars: number[] }[]
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[20px] font-extrabold">{title}</span>
        <StatusPill status="normal" label="所有核心服务运行中" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.name}
            className="flex flex-col gap-2 rounded-inner bg-[#F6F7F9] px-4 py-3.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[14px] font-bold text-[#1B1F27]">{s.name}</span>
                <span className="ml-2 text-[12px] text-[#8A90A0]">{s.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-glaze-mono text-[12px] font-bold text-[#2F6B28]">
                  {s.uptime}
                </span>
                <StatusPill status={s.status} size="sm" />
              </div>
            </div>
            <div className="flex h-3 gap-0.75">
              {s.bars.map((b, idx) => (
                <span
                  key={idx}
                  className="flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      b === 1 ? '#49A851' : b === 0 ? '#E3A33B' : '#E5603B',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
