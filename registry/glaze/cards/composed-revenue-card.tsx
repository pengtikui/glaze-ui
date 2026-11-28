import { ComposedChart, type ComposedSeries } from '@/components/ui/composed-chart'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface ComposedRevenueCardProps {
  title: string
  subtitle?: string
  delta?: string
  data: readonly object[]
  xKey: string
  series: ComposedSeries[]
  leftYTickFormatter?: (value: unknown) => string
  rightYTickFormatter?: (value: unknown) => string
  tone?: TileTone
}

export function ComposedRevenueCard({
  title,
  subtitle,
  delta,
  data,
  xKey,
  series,
  leftYTickFormatter,
  rightYTickFormatter,
  tone = 'white',
}: ComposedRevenueCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="l" tone={tone} className="justify-between gap-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-glaze-display text-[20px] font-extrabold">{title}</div>
          {subtitle && (
            <div className="mt-0.5 text-[13px]" style={{ color: theme.soft }}>
              {subtitle}
            </div>
          )}
        </div>
        {delta && <StatusPill status="normal" label={delta} showDot={false} size="sm" />}
      </div>
      <div className="min-h-68 flex-1 w-full">
        <ComposedChart
          data={data}
          xKey={xKey}
          series={series}
          leftYTickFormatter={leftYTickFormatter}
          rightYTickFormatter={rightYTickFormatter}
          tone={tone}
          height={275}
        />
      </div>
    </Tile>
  )
}
