import { PieChart } from '@/components/ui/pie-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface DonutSegment {
  name: string
  value: number
  color: string
  display?: string
}

export interface DonutChartCardProps {
  title: string
  subtitle?: string
  totalLabel?: string
  totalValue?: string
  segments: DonutSegment[]
  tone?: TileTone
}

export function DonutChartCard({
  title,
  subtitle,
  totalLabel = '合计',
  totalValue,
  segments,
  tone = 'white',
}: DonutChartCardProps) {
  const theme = TILE_THEMES[tone]
  const total = segments.reduce((s, x) => s + x.value, 0)
  const arcs = segments.map((seg) => {
    const frac = total > 0 ? seg.value / total : 0
    return {
      ...seg,
      pct: Math.round(frac * 100),
    }
  })

  return (
    <Tile size="l" tone={tone} className="justify-start gap-5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[17px] font-bold">{title}</span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {subtitle ?? `${segments.length} 类`}
        </span>
      </div>
      <div className="flex-1 flex flex-col sm:flex-row items-center gap-7 sm:gap-9">
        <div className="w-45 shrink-0">
          <PieChart
            variant="donut"
            data={segments}
            tone={tone}
            height={180}
            innerRadius="64%"
            outerRadius="92%"
            paddingAngle={3}
            cornerRadius={6}
            centerValue={totalValue ?? total.toLocaleString('en-US')}
            centerLabel={totalLabel}
            valueFormatter={(val, name) => {
              const found = arcs.find((a) => a.name === name)
              return found ? `${found.display ?? val} (${found.pct}%)` : val
            }}
          />
        </div>

        <div className="min-w-0 flex-1 w-full flex flex-col">
          {arcs.map((g, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 min-h-11 text-[14px]"
              style={{ borderTop: i === 0 ? 'none' : `1px solid ${theme.divider}` }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: g.color }}
              />
              <span className="min-w-0 flex-1 truncate">{g.name}</span>
              <span className="shrink-0 font-semibold whitespace-nowrap">
                {g.display ?? g.value.toLocaleString('en-US')}
              </span>
              <span className="w-11 shrink-0 text-right whitespace-nowrap" style={{ color: theme.soft }}>
                {g.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Tile>
  )
}
