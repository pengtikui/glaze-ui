import { RadarChart } from '@/components/ui/radar-chart'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function RadarSkillCard({
  title,
  subtitle,
  axes,
  color = '#7B80EA',
  tone = 'white',
}: {
  title: string
  subtitle: string
  axes: { label: string; value: number }[]
  color?: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="l" tone={tone} className="justify-between gap-2">
      <div>
        <div className="font-glaze-display text-[20px] font-extrabold">{title}</div>
        <div className="text-[13px]" style={{ color: theme.soft }}>{subtitle}</div>
      </div>
      <div className="min-h-62.5 flex-1 w-full">
        <RadarChart
          data={axes}
          angleKey="label"
          series={[{ dataKey: 'value', label: title, color }]}
          tone={tone}
          height="100%"
          outerRadius="74%"
          className="h-full"
        />
      </div>
    </Tile>
  )
}
