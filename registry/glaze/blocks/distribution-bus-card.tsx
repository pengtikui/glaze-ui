import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface DistributionBusItem {
  name: string
  value: number
  display?: string
}

export interface DistributionBusCardProps {
  label: string
  totalValue: string | number
  unit: string
  subtitle: string
  items: DistributionBusItem[]
  footnote?: string
  tone?: TileTone
}

export function DistributionBusCard({
  label,
  totalValue,
  unit,
  subtitle,
  items,
  footnote,
  tone = 'peach',
}: DistributionBusCardProps) {
  const theme = TILE_THEMES[tone]
  const maxVal = Math.max(...items.map((x) => x.value), 1)
  return (
    <Tile
      size="f"
      tone={tone}
      className="flex-row flex-wrap gap-8 items-start"
    >
      <div className="flex-[0_1_240px] flex flex-col gap-1.5">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <span className="flex items-baseline gap-1.5">
          <span className="font-glaze-display text-[56px] leading-14.5 font-extrabold tracking-[-0.03em]">
            {totalValue}
          </span>
          <span className="text-[16px] font-bold">{unit}</span>
        </span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {subtitle}
        </span>
      </div>

      <div className="flex-[1_1_560px] min-w-0 flex flex-col gap-4">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(110px,100%),1fr))] gap-x-4 gap-y-3"
          style={{ borderTop: `3px solid ${theme.accent}` }}
        >
          {items.map((item, i) => {
            const pct = Math.round((item.value / maxVal) * 100)
            return (
              <div key={i} className="flex flex-col gap-1.5">
                <span
                  aria-hidden="true"
                  className="w-0.5 h-3 ml-0.5"
                  style={{ backgroundColor: theme.accent }}
                />
                <span className="text-[13px]" style={{ color: theme.soft }}>
                  {item.name}
                </span>
                <span className="font-glaze-display text-[22px] leading-6 font-extrabold">
                  {item.display ?? item.value}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1 rounded-xs overflow-hidden"
                  style={{ backgroundColor: theme.track }}
                >
                  <span
                    className="block h-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: theme.accent,
                    }}
                  />
                </span>
              </div>
            )
          })}
        </div>
        {footnote && (
          <span
            className="text-[13px] leading-5"
            style={{ color: theme.soft }}
          >
            {footnote}
          </span>
        )}
      </div>
    </Tile>
  )
}
