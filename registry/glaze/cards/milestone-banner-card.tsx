import { Avatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function MilestoneBannerCard({
  version,
  title,
  progress,
  dueDate,
  owners,
  tone = 'mint',
}: {
  version: string
  title: string
  progress: number
  dueDate: string
  owners: { initials: string; hue: Hue }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span
            className="inline-block rounded-full px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold whitespace-nowrap"
            style={{ backgroundColor: theme.track, color: theme.ink }}
          >
            {version}
          </span>
          <div className="mt-1.5 truncate font-glaze-display text-[20px] font-extrabold">{title}</div>
        </div>
        <div className="flex shrink-0 -space-x-2">
          {owners.map((o, i) => (
            <Avatar
              key={i}
              fallback={o.initials}
              hue={o.hue}
              size="sm"
              ringWidth={2}
              ringColor={theme.bg}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Progress value={progress} barColor={theme.accent} trackColor={theme.track} />
        <div className="flex justify-between text-[12px]" style={{ color: theme.soft }}>
          <span>已完成 {progress}%</span>
          <span>目标交付：{dueDate}</span>
        </div>
      </div>
    </Tile>
  )
}
