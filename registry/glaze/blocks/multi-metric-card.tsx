import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface MultiMetricItem {
  label: string
  value: string | number
  unit?: string
}

export interface MultiMetricCardProps {
  label: string
  metrics: MultiMetricItem[]
  tone?: TileTone
}

export function MultiMetricCard({
  label,
  metrics,
  tone = 'sky',
}: MultiMetricCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone}>
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}
      >
        {metrics.map((m, i) => (
          <span
            key={i}
            className="flex flex-col gap-1"
            style={{
              paddingLeft: i === 0 ? 0 : 20,
              paddingRight: i === metrics.length - 1 ? 0 : 20,
              borderLeft: i === 0 ? 'none' : `1px solid ${theme.divider}`,
            }}
          >
            <span className="text-[13px]" style={{ color: theme.soft }}>
              {m.label}
            </span>
            <span className="flex items-baseline gap-0.5">
              <span className="font-glaze-display text-[36px] sm:text-[40px] leading-10.5 font-extrabold tracking-[-0.03em]">
                {m.value}
              </span>
              {m.unit && (
                <span className="text-[16px] font-bold">{m.unit}</span>
              )}
            </span>
          </span>
        ))}
      </div>
    </Tile>
  )
}
