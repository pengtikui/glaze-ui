import { Progress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function QuotaCard({
  label,
  used,
  total,
  unit,
  resetNote,
  tone = 'periwinkle',
}: {
  label: string
  used: number
  total: number
  unit: string
  resetNote: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const pct = Math.round((used / total) * 100)
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <span className="text-[12px] font-bold" style={{ color: theme.accent }}>
          {pct}%
        </span>
      </div>
      <div>
        <div className="font-glaze-display text-[32px] leading-none font-extrabold">
          {used.toLocaleString()}
        </div>
        <div className="mt-1 text-[12px]" style={{ color: theme.soft }}>
          / {total.toLocaleString()} {unit}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Progress value={pct} barColor={theme.accent} trackColor={theme.track} />
        <span className="text-[11px]" style={{ color: theme.soft }}>
          {resetNote}
        </span>
      </div>
    </Tile>
  )
}
