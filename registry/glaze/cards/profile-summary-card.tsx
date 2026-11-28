import { Avatar } from '@/components/ui/avatar'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'

export function ProfileSummaryCard({
  name,
  role,
  initials,
  hue = 'periwinkle',
  status = 'normal',
  statusLabel = '在线办公',
  stats,
  tone = 'white',
}: {
  name: string
  role: string
  initials: string
  hue?: Hue
  status?: Status
  statusLabel?: string
  stats: { label: string; value: string }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar fallback={initials} hue={hue} size="lg" />
          <div className="min-w-0">
            <div className="truncate font-glaze-display text-[18px] font-extrabold">{name}</div>
            <div className="truncate text-[12px]" style={{ color: theme.soft }}>
              {role}
            </div>
          </div>
        </div>
        <StatusPill status={status} label={statusLabel} size="sm" />
      </div>
      <div
        className="grid grid-cols-3 gap-3 rounded-inner px-4 py-2.5"
        style={{
          backgroundColor: theme.dark
            ? 'rgba(255,255,255,0.1)'
            : theme.bg === '#FFFFFF'
              ? '#F6F7F9'
              : 'rgba(255,255,255,0.65)',
        }}
      >
        {stats.map((s) => (
          <div key={s.label} className="min-w-0">
            <div className="truncate text-[11px]" style={{ color: theme.soft }}>
              {s.label}
            </div>
            <div className="truncate font-glaze-display text-[18px] font-extrabold" style={{ color: theme.ink }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
