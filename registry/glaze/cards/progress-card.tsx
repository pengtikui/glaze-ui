import { Progress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface ProgressCardProps {
  label: string
  percent: number
  description: string
  tone?: TileTone
}

export function ProgressCard({
  label,
  percent,
  description,
  tone = 'peach',
}: ProgressCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone}>
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex items-baseline gap-1">
        <span className="font-glaze-display text-[44px] leading-11.5 font-extrabold tracking-[-0.03em]">
          {percent}
        </span>
        <span className="text-[18px] font-bold">%</span>
      </span>
      <span className="flex flex-col gap-2">
        <Progress
          value={percent}
          trackColor={theme.track}
          barColor={theme.accent}
          height="md"
        />
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {description}
        </span>
      </span>
    </Tile>
  )
}
