import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function FunnelCard({
  title,
  steps,
  tone = 'periwinkle',
}: {
  title: string
  steps: { label: string; count: string; pct: number }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
      <div className="flex flex-1 flex-col justify-between gap-3">
        {steps.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="truncate font-semibold" style={{ color: theme.ink }}>
                {s.label}
              </span>
              <span className="shrink-0 font-glaze-mono font-bold whitespace-nowrap" style={{ color: theme.soft }}>
                {s.count} · {s.pct}%
              </span>
            </div>
            <div
              className="h-6 w-full overflow-hidden rounded-icon"
              style={{ backgroundColor: theme.track }}
            >
              <div
                className="h-full rounded-icon"
                style={{ width: `${s.pct}%`, backgroundColor: theme.accent }}
              />
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
