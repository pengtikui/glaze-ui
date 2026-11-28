import { AvatarGroup, type AvatarGroupItem } from '@/components/ui/avatar'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface MembersCardProps {
  label: string
  members: AvatarGroupItem[]
  countLabel: string
  description: string
  tone?: TileTone
}

export function MembersCard({
  label,
  members,
  countLabel,
  description,
  tone = 'lemon',
}: MembersCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone}>
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <AvatarGroup
        items={members}
        max={3}
        size="lg"
        ringColor={theme.bg}
        overflowBg={theme.ink}
        overflowFg={theme.bg}
      />
      <span className="flex min-w-0 items-baseline gap-1.5">
        <span className="shrink-0 font-glaze-display text-[26px] leading-7.5 font-extrabold whitespace-nowrap">
          {countLabel}
        </span>
        <span className="truncate text-[13px]" style={{ color: theme.soft }}>
          {description}
        </span>
      </span>
    </Tile>
  )
}
