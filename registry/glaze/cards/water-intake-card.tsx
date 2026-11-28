import * as React from 'react'
import { Drop } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function WaterIntakeCard({
  initialCups = 5,
  goal = 8,
  tone = 'sky',
}: {
  initialCups?: number
  goal?: number
  tone?: TileTone
}) {
  const [cups, setCups] = React.useState(initialCups)
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          今日饮水
        </span>
        <Drop size={18} weight="fill" style={{ color: theme.accent }} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-glaze-display text-[44px] leading-none font-extrabold">
          {cups}
        </span>
        <span className="text-[15px] font-semibold" style={{ color: theme.soft }}>
          / {goal} 杯
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] whitespace-nowrap" style={{ color: theme.soft }}>
          {cups * 250} ml
        </span>
        <Button
          size="sm"
          variant={theme.dark ? 'dark-surface' : 'primary'}
          onClick={() => setCups((c) => (c >= goal ? 0 : c + 1))}
        >
          {cups >= goal ? '重置' : '+1 杯'}
        </Button>
      </div>
    </Tile>
  )
}
