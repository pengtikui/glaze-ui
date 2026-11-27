import { SegmentedProgress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface DistributionSegment {
  name: string
  percent: number
  color: string
}

export interface DistributionBarCardProps {
  title: string
  summary: string
  segments: DistributionSegment[]
  tone?: TileTone
}

export function DistributionBarCard({
  title,
  summary,
  segments,
  tone = 'white',
}: DistributionBarCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[17px] font-bold">{title}</span>
        <span className="shrink-0 text-[13px] whitespace-nowrap" style={{ color: theme.soft }}>
          {summary}
        </span>
      </div>
      <SegmentedProgress
        height="lg"
        gap={3}
        segments={segments.map((s) => ({
          label: s.name,
          percent: s.percent,
          color: s.color,
        }))}
      />
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${segments.length}, minmax(0, 1fr))` }}
      >
        {segments.map((g, i) => (
          <span key={i} className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-[13px]" style={{ color: theme.soft }}>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: g.color }}
              />
              <span className="truncate">{g.name}</span>
            </span>
            <span className="font-glaze-display text-[22px] font-extrabold">
              {g.percent}%
            </span>
          </span>
        ))}
      </div>
    </Tile>
  )
}
