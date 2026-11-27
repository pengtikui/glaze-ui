import { HueTag } from '@/components/ui/hue-tag'
import { ScatterChart, type ScatterSeries } from '@/components/ui/scatter-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface ScatterBubbleCardProps {
  title: string
  subtitle?: string
  badge?: string
  badgeHue?: Hue
  series: ScatterSeries[]
  xKey: string
  yKey: string
  zKey?: string
  xLabel?: string
  yLabel?: string
  xUnit?: string
  yUnit?: string
  tone?: TileTone
}

export function ScatterBubbleCard({
  title,
  subtitle,
  badge,
  badgeHue = 'aqua',
  series,
  xKey,
  yKey,
  zKey,
  xLabel,
  yLabel,
  xUnit,
  yUnit,
  tone = 'white',
}: ScatterBubbleCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="l" tone={tone} className="justify-between gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-glaze-display text-[20px] font-extrabold">{title}</div>
          {subtitle && (
            <div className="mt-0.5 truncate text-[13px]" style={{ color: theme.soft }}>
              {subtitle}
            </div>
          )}
        </div>
        {badge && (
          <HueTag hue={badgeHue} size="sm" className="shrink-0">
            {badge}
          </HueTag>
        )}
      </div>
      <div className="min-h-68 flex-1 w-full">
        <ScatterChart
          series={series}
          xKey={xKey}
          yKey={yKey}
          zKey={zKey}
          xLabel={xLabel}
          yLabel={yLabel}
          xUnit={xUnit}
          yUnit={yUnit}
          tone={tone}
          height={270}
        />
      </div>
    </Tile>
  )
}
