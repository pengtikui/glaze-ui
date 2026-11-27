import { Progress } from '@/components/ui/progress'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export function ServerRackCard({
  rackName,
  blades,
  tone = 'ink',
}: {
  rackName: string
  blades: { id: string; role: string; load: number; status: Status; temp: string }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="l" tone={tone} className="justify-between gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-glaze-display text-[20px] font-extrabold">{rackName}</div>
          <div className="text-[12px]" style={{ color: theme.soft }}>
            {blades.length} 个刀片计算单元实时状态
          </div>
        </div>
        <StatusPill status="normal" label="集群在线" size="sm" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {blades.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-3 rounded-control px-3.5 py-2.5"
            style={{
              backgroundColor: theme.dark ? 'rgba(255,255,255,0.08)' : '#F6F7F9',
            }}
          >
            <StatusDot status={b.status} mode={b.status === 'normal' ? 'ripple' : 'blink'} />
            <span className="w-16 shrink-0 font-glaze-mono text-[12px] font-bold whitespace-nowrap">{b.id}</span>
            <span className="w-24 shrink-0 truncate text-[12px]" style={{ color: theme.soft }}>
              {b.role}
            </span>
            <div className="min-w-0 flex-1">
              <Progress
                value={b.load}
                barColor={b.load > 80 ? '#E5603B' : '#93DAD3'}
                trackColor={theme.dark ? 'rgba(255,255,255,0.14)' : '#E8EBF0'}
              />
            </div>
            <span className="w-10 shrink-0 text-right font-glaze-mono text-[12px] whitespace-nowrap">{b.temp}</span>
          </div>
        ))}
      </div>
    </Tile>
  )
}
