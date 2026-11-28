import { RadialChart, type RadialChartItem } from '@/components/ui/radial-chart'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface RadialGoalItem extends RadialChartItem {
  detail?: string
}

export interface RadialGoalsCardProps {
  title: string
  subtitle?: string
  centerValue: string
  centerLabel?: string
  goals: RadialGoalItem[]
  tone?: TileTone
}

export function RadialGoalsCard({
  title,
  subtitle = '季度 OKR',
  centerValue,
  centerLabel = '总达成率',
  goals,
  tone = 'white',
}: RadialGoalsCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="t" tone={tone} className="justify-between gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[17px] font-bold">{title}</span>
        <span className="shrink-0 text-[12px]" style={{ color: theme.soft }}>
          {subtitle}
        </span>
      </div>
      <RadialChart
        data={goals}
        tone={tone}
        height={196}
        innerRadius="36%"
        outerRadius="94%"
        barSize={12}
        centerValue={centerValue}
        centerLabel={centerLabel}
      />
      <div className="flex flex-col gap-2.5">
        {goals.map((g, idx) => {
          const c = g.color ?? (g.hue ? HUE_PALETTES[g.hue][500] : theme.accent)
          return (
            <div
              key={g.name}
              className="flex items-center justify-between gap-2 pt-2 text-[13px]"
              style={{ borderTop: idx === 0 ? 'none' : `1px solid ${theme.divider}` }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: c }} />
                <span className="truncate font-semibold">{g.name}</span>
              </div>
              <div className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
                {g.detail && (
                  <span className="text-[11px]" style={{ color: theme.soft }}>
                    {g.detail}
                  </span>
                )}
                <span className="font-glaze-display font-extrabold">{g.value}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </Tile>
  )
}
