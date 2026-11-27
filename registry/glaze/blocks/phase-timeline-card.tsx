import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface PhaseItem {
  name: string
  date: string
  state: 'done' | 'cur' | 'todo'
}

export interface PhaseTimelineCardProps {
  title: string
  subtitle: string
  phases: PhaseItem[]
  tone?: TileTone
}

export function PhaseTimelineCard({
  title,
  subtitle,
  phases,
  tone = 'mint',
}: PhaseTimelineCardProps) {
  const theme = TILE_THEMES[tone]
  const curIdx = phases.findIndex((p) => p.state === 'cur')
  const doneCount = phases.filter((p) => p.state === 'done').length
  const progressSteps = curIdx >= 0 ? curIdx : Math.max(0, doneCount - 1)
  const totalGaps = Math.max(phases.length - 1, 1)
  const edgePct = 100 / (phases.length * 2)
  const fillPct = ((100 - edgePct * 2) * progressSteps) / totalGaps

  return (
    <Tile size="f" tone={tone} className="justify-start gap-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-glaze-display text-[22px] font-extrabold">
          {title}
        </span>
        <span className="text-[14px]" style={{ color: theme.soft }}>
          {subtitle}
        </span>
      </div>

      <div
        className="relative grid"
        style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
      >
        {/* Background track */}
        <span
          aria-hidden="true"
          className="absolute top-2.25 h-1 rounded-xs"
          style={{
            left: `${edgePct}%`,
            right: `${edgePct}%`,
            backgroundColor: theme.track,
          }}
        />
        {/* Active progress track */}
        <span
          aria-hidden="true"
          className="absolute top-2.25 h-1 rounded-xs transition-all duration-300"
          style={{
            left: `${edgePct}%`,
            width: `${fillPct}%`,
            backgroundColor: theme.accent,
          }}
        />
        {phases.map((p, i) => {
          const isCur = p.state === 'cur'
          const isTodo = p.state === 'todo'
          return (
            <span
              key={i}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <span
                className="w-5.5 h-5.5 rounded-full border-[3px]"
                style={{
                  backgroundColor: isTodo
                    ? theme.bg
                    : isCur
                      ? '#FFFFFF'
                      : theme.accent,
                  borderColor: isTodo ? `${theme.ink}40` : theme.accent,
                  boxShadow: isCur ? `0 0 0 6px ${theme.accent}40` : 'none',
                }}
              />
              <span className="flex flex-col gap-0.5">
                <span
                  className="text-[14px]"
                  style={{ fontWeight: isCur ? 700 : 500 }}
                >
                  {p.name}
                </span>
                <span className="text-[12px]" style={{ color: theme.soft }}>
                  {p.date}
                </span>
              </span>
            </span>
          )
        })}
      </div>
    </Tile>
  )
}
