import * as React from 'react'
import { AreaChart } from '@/components/ui/area-chart'
import { BarChart } from '@/components/ui/bar-chart'
import { LineChart } from '@/components/ui/line-chart'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'

export interface AnalyticsSummaryItem {
  label: string
  value: string
  delta: string
  status?: Status
}

export interface InteractiveAnalyticsCardProps {
  title: string
  subtitle?: string
  summaries: AnalyticsSummaryItem[]
  data: readonly object[]
  xKey: string
  series: { dataKey: string; label: string; hue?: Hue; color?: string; unit?: string }[]
  referenceLine?: { y: number; label?: string }
  tone?: TileTone
}

export function InteractiveAnalyticsCard({
  title,
  subtitle,
  summaries,
  data,
  xKey,
  series,
  referenceLine,
  tone = 'white',
}: InteractiveAnalyticsCardProps) {
  const theme = TILE_THEMES[tone]
  const [chartType, setChartType] = React.useState<'area' | 'line' | 'bar'>('area')

  return (
    <Tile size="f" tone={tone} className="gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-glaze-display text-[22px] font-extrabold">{title}</div>
          {subtitle && (
            <div className="mt-0.5 text-[13px]" style={{ color: theme.soft }}>
              {subtitle}
            </div>
          )}
        </div>
        <SegmentedControl
          size="sm"
          value={chartType}
          onValueChange={setChartType}
          options={[
            { value: 'area', label: '面积图' },
            { value: 'line', label: '折线图' },
            { value: 'bar', label: '柱状图' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {summaries.slice(0, 3).map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-2 rounded-inner px-4 py-3"
            style={{
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,0.08)'
                : theme.bg === '#FFFFFF'
                  ? '#F6F7F9'
                  : 'rgba(255,255,255,0.68)',
            }}
          >
            <div>
              <div className="text-[12px]" style={{ color: theme.soft }}>
                {s.label}
              </div>
              <div className="mt-0.5 font-glaze-display text-[24px] leading-7 font-extrabold">
                {s.value}
              </div>
            </div>
            <StatusPill status={s.status ?? 'normal'} label={s.delta} showDot={false} size="sm" />
          </div>
        ))}
      </div>

      <div className="w-full">
        {chartType === 'area' && (
          <AreaChart
            data={data}
            xKey={xKey}
            series={series}
            showYAxis
            showLegend
            referenceLine={referenceLine}
            tone={tone}
            height={260}
          />
        )}
        {chartType === 'line' && (
          <LineChart
            data={data}
            xKey={xKey}
            series={series}
            showYAxis
            showLegend
            showDots
            referenceLine={referenceLine}
            tone={tone}
            height={260}
          />
        )}
        {chartType === 'bar' && (
          <BarChart
            data={data}
            xKey={xKey}
            series={series}
            showYAxis
            showLegend
            referenceLine={referenceLine ? { value: referenceLine.y, label: referenceLine.label } : undefined}
            tone={tone}
            height={260}
          />
        )}
      </div>
    </Tile>
  )
}
