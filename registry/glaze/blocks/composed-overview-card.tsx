import { ComposedChart, type ComposedSeries } from '@/components/ui/composed-chart'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface ComposedOverviewCardProps {
  title: string
  subtitle?: string
  highlights: { label: string; value: string; hue?: Hue }[]
  data: readonly object[]
  xKey: string
  series: ComposedSeries[]
  leftYTickFormatter?: (value: unknown) => string
  rightYTickFormatter?: (value: unknown) => string
  tone?: TileTone
}

export function ComposedOverviewCard({
  title,
  subtitle,
  highlights,
  data,
  xKey,
  series,
  leftYTickFormatter,
  rightYTickFormatter,
  tone = 'white',
}: ComposedOverviewCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="f" tone={tone} className="gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-glaze-display text-[22px] font-extrabold">{title}</div>
          {subtitle && (
            <div className="mt-0.5 text-[13px]" style={{ color: theme.soft }}>
              {subtitle}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col">
              <span className="text-[11px] font-medium" style={{ color: theme.soft }}>
                {h.label}
              </span>
              <span
                className="font-glaze-display text-[20px] leading-6 font-extrabold"
                style={{ color: h.hue ? HUE_PALETTES[h.hue][700] : theme.ink }}
              >
                {h.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ComposedChart
        data={data}
        xKey={xKey}
        series={series}
        leftYTickFormatter={leftYTickFormatter}
        rightYTickFormatter={rightYTickFormatter}
        tone={tone}
        height={265}
      />
    </Tile>
  )
}
