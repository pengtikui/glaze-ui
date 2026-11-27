import { Fire } from '@phosphor-icons/react'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export function StreakCard({
  label,
  days,
  week,
  tone = 'peach',
}: {
  label: string
  days: number
  week: boolean[]
  tone?: TileTone
}) {
  const theme = TILE_THEMES[tone]
  const dayNames = ['一', '二', '三', '四', '五', '六', '日']
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
          {label}
        </span>
        <Fire size={20} weight="fill" style={{ color: theme.accent }} />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-glaze-display text-[48px] leading-none font-extrabold">
          {days}
        </span>
        <span className="text-[14px] font-semibold" style={{ color: theme.soft }}>
          天连续
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {week.slice(0, 7).map((done, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className="h-3.5 w-3.5 rounded-full"
              style={{ backgroundColor: done ? theme.accent : theme.track }}
            />
            <span className="text-[10px]" style={{ color: theme.soft }}>
              {dayNames[i]}
            </span>
          </div>
        ))}
      </div>
    </Tile>
  )
}
