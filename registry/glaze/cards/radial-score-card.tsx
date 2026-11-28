import { RadialChart, type RadialChartItem } from '@/components/ui/radial-chart'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface RadialScoreCardProps {
  label: string
  score: string | number
  scoreLabel?: string
  rings: RadialChartItem[]
  tone?: TileTone
}

export function RadialScoreCard({
  label,
  score,
  scoreLabel = '综合',
  rings,
  tone = 'white',
}: RadialScoreCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: theme.soft }}>
          {rings.length} 维度
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="w-28 shrink-0">
          <RadialChart
            data={rings}
            tone={tone}
            height={112}
            innerRadius="38%"
            outerRadius="96%"
            barSize={8}
            centerValue={score}
            centerLabel={scoreLabel}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {rings.slice(0, 3).map((r, i) => {
            const c = r.color ?? (r.hue ? HUE_PALETTES[r.hue][500] : theme.accent)
            return (
              <div key={i} className="flex items-center justify-between gap-1.5 text-[12px]">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c }} />
                  <span className="truncate" style={{ color: theme.soft }}>
                    {r.name}
                  </span>
                </span>
                <span className="shrink-0 font-glaze-display font-bold">{r.value}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </Tile>
  )
}
