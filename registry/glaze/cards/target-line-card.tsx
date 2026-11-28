import { LineChart, type LineSeries } from '@/components/ui/line-chart'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export interface TargetLineCardProps {
  title: string
  currentValue: string
  targetValue: number
  targetLabel?: string
  status?: Status
  statusLabel?: string
  data: readonly object[]
  xKey: string
  series: LineSeries[]
  tone?: TileTone
}

export function TargetLineCard({
  title,
  currentValue,
  targetValue,
  targetLabel = '目标线',
  status = 'normal',
  statusLabel = '达标',
  data,
  xKey,
  series,
  tone = 'white',
}: TargetLineCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between gap-2 pb-4.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span className="truncate text-[17px] font-bold">{title}</span>
          <span className="shrink-0 font-glaze-display text-[16px] font-extrabold" style={{ color: theme.accent }}>
            {currentValue}
          </span>
        </div>
        <StatusPill status={status} label={statusLabel} size="sm" />
      </div>
      <div className="min-h-28 flex-1 w-full">
        <LineChart
          data={data}
          xKey={xKey}
          series={series}
          showDots
          showYAxis
          referenceLine={{ y: targetValue, label: targetLabel, color: '#E5603B' }}
          tone={tone}
          height={122}
        />
      </div>
    </Tile>
  )
}
