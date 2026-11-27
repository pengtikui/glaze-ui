import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface StepsCardProps {
  title: string
  steps: string[]
  /** 0-based index of the current active step */
  currentStep: number
  tone?: TileTone
}

export function StepsCard({
  title,
  steps,
  currentStep,
  tone = 'aqua',
}: StepsCardProps) {
  const theme = TILE_THEMES[tone]
  const activeHex =
    tone in HUE_PALETTES ? HUE_PALETTES[tone as Hue][500] : theme.accent
  const doneHex =
    tone in HUE_PALETTES ? HUE_PALETTES[tone as Hue][700] : theme.soft

  return (
    <Tile size="w" tone={tone}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[17px] font-bold">{title}</span>
        <span className="text-[13px]" style={{ color: theme.soft }}>
          第 {currentStep + 1} 步 / 共 {steps.length} 步
        </span>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((name, i) => {
          const done = i < currentStep
          const cur = i === currentStep
          const isLast = i === steps.length - 1
          return (
            <span
              key={i}
              className="relative flex flex-col items-center gap-2.5"
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 -right-1/2 top-3.25 h-0.75"
                  style={{
                    backgroundColor: done ? doneHex : theme.divider,
                  }}
                />
              )}
              <span
                className="relative flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold"
                style={{
                  backgroundColor: done
                    ? doneHex
                    : cur
                      ? activeHex
                      : theme.bg === '#FFFFFF'
                        ? '#F2F3F5'
                        : '#FFFFFF',
                  color: done || cur ? '#FFFFFF' : doneHex,
                  boxShadow: cur ? `0 0 0 5px ${activeHex}40` : 'none',
                }}
              >
                {done ? '✓' : i + 1}
              </span>
              <span
                className="max-w-full truncate text-center text-[13px]"
                style={{
                  fontWeight: cur ? 700 : 500,
                  color: i <= currentStep ? theme.ink : theme.soft,
                }}
              >
                {name}
              </span>
            </span>
          )
        })}
      </div>
    </Tile>
  )
}
