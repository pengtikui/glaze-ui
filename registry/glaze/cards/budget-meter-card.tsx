import { HueTag } from '@/components/ui/hue-tag'
import { Meter } from '@/components/ui/meter'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function BudgetMeterCard({
  label,
  spent,
  budget,
  categories,
  tone = 'white',
}: {
  label: string
  spent: number
  budget: number
  categories: { name: string; amount: string; hue: Hue }[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="w" tone={tone} className="justify-between">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
          {label}
        </span>
        <div className="font-glaze-display text-[22px] font-extrabold">
          ¥{spent.toLocaleString()}{' '}
          <span className="text-[13px] font-medium text-[#8A90A0]">
            / ¥{budget.toLocaleString()}
          </span>
        </div>
      </div>
      <Meter value={spent} max={budget} valueLabel={`${Math.round((spent / budget) * 100)}% 已用`} />
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <HueTag key={c.name} hue={c.hue} size="sm">
            {c.name} {c.amount}
          </HueTag>
        ))}
      </div>
    </Tile>
  )
}
