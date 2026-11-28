import { Progress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface BarListItem {
  label: string
  value: string
  percent: number
}

export interface BarListCardProps {
  label: string
  bigValue: string | number
  bigUnit?: string
  subtitle: string
  items: BarListItem[]
  tone?: TileTone
}

export function BarListCard({
  label,
  bigValue,
  bigUnit,
  subtitle,
  items,
  tone = 'lilac',
}: BarListCardProps) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="t" tone={tone} className="justify-start gap-4">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-glaze-display text-[56px] leading-14.5 font-extrabold tracking-[-0.03em]">
          {bigValue}
          {bigUnit && <span className="text-[26px]">{bigUnit}</span>}
        </span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          {subtitle}
        </span>
      </span>
      <div className="flex-1 flex flex-col justify-end gap-3.5">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1.5 text-[12px]">
            <span className="flex justify-between gap-2">
              <span className="truncate font-semibold">{item.label}</span>
              <span className="shrink-0 whitespace-nowrap" style={{ color: theme.soft }}>{item.value}</span>
            </span>
            <Progress
              value={item.percent}
              trackColor={theme.track}
              barColor={theme.accent}
              height="md"
            />
          </div>
        ))}
      </div>
    </Tile>
  )
}
