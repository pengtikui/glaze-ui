import * as React from 'react'
import { RadarChart, type RadarSeries } from '@/components/ui/radar-chart'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface MultiRadarCompareCardProps {
  title: string
  subtitle?: string
  data: readonly object[]
  angleKey: string
  series: RadarSeries[]
  tone?: TileTone
}

export function MultiRadarCompareCard({
  title,
  subtitle,
  data,
  angleKey,
  series,
  tone = 'white',
}: MultiRadarCompareCardProps) {
  const theme = TILE_THEMES[tone]
  const [gridType, setGridType] = React.useState<'polygon' | 'circle'>('polygon')

  return (
    <Tile size="l" tone={tone} className="justify-between gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="font-glaze-display text-[20px] font-extrabold">{title}</div>
          {subtitle && (
            <div className="mt-0.5 text-[13px]" style={{ color: theme.soft }}>
              {subtitle}
            </div>
          )}
        </div>
        <SegmentedControl
          size="sm"
          value={gridType}
          onValueChange={setGridType}
          options={[
            { value: 'polygon', label: '多边形' },
            { value: 'circle', label: '同心圆' },
          ]}
        />
      </div>
      <div className="min-h-68 flex-1 w-full">
        <RadarChart
          data={data}
          angleKey={angleKey}
          series={series}
          gridType={gridType}
          showLegend
          tone={tone}
          height={275}
        />
      </div>
    </Tile>
  )
}
