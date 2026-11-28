import { GitBranch } from '@phosphor-icons/react'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Status, type TileTone } from '@/lib/tokens'

export function CodeDeployCard({
  repo,
  branch,
  commit,
  duration,
  status = 'normal',
  statusLabel = '部署成功',
  tone = 'white',
}: {
  repo: string
  branch: string
  commit: string
  duration: string
  status?: Status
  statusLabel?: string
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <GitBranch size={18} weight="bold" className="shrink-0" style={{ color: theme.accent }} />
          <span className="truncate font-glaze-display text-[17px] font-extrabold">{repo}</span>
        </div>
        <StatusPill status={status} label={statusLabel} size="sm" />
      </div>
      <div
        className="flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-[12px]"
        style={{
          backgroundColor: theme.dark
            ? 'rgba(255,255,255,0.1)'
            : theme.bg === '#FFFFFF'
              ? '#F6F7F9'
              : 'rgba(255,255,255,0.65)',
        }}
      >
        <div className="flex min-w-0 items-center gap-2 font-glaze-mono">
          <HueTag hue="periwinkle" size="sm" className="shrink-0">{branch}</HueTag>
          <span className="truncate font-semibold" style={{ color: theme.ink }}>
            {commit}
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap" style={{ color: theme.soft }}>
          构建耗时 {duration}
        </span>
      </div>
    </Tile>
  )
}
