import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import { Tooltip } from '@/components/ui/tooltip'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function UptimeStripCard({
  service,
  uptimePct = '99.98%',
  days,
  tone = 'white',
}: {
  service: string
  uptimePct?: string
  days: ('ok' | 'warn' | 'down')[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <StatusDot status="normal" mode="ripple" />
          <span className="truncate font-glaze-display text-[17px] font-extrabold">{service}</span>
        </div>
        <span
          className="shrink-0 font-glaze-display text-[20px] font-extrabold whitespace-nowrap"
          style={{ color: theme.dark ? '#93DAD3' : '#2F6B28' }}
        >
          {uptimePct}
        </span>
      </div>
      <div className="flex h-11 items-end gap-0.75">
        {days.map((d, i) => (
          <Tooltip
            key={i}
            content={`第 ${i + 1} 天 · ${d === 'ok' ? '正常运行' : d === 'warn' ? '短暂抖动' : '异常中断'}`}
          >
            <div
              className="h-full flex-1 rounded-full transition-opacity hover:opacity-80"
              style={{
                backgroundColor:
                  d === 'ok' ? '#49A851' : d === 'warn' ? '#E3A33B' : '#E5603B',
              }}
            />
          </Tooltip>
        ))}
      </div>
      <div className="flex justify-between text-[11px]" style={{ color: theme.soft }}>
        <span>30 天前</span>
        <span>最近 30 天 SLA 可用性监控</span>
        <span>今天</span>
      </div>
    </Tile>
  )
}
