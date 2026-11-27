import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface CompareCardProps {
  label: string
  delta: string
  primary: { label: string; value: number; display?: string }
  secondary: { label: string; value: number; display?: string }
  tone?: TileTone
}

export function CompareCard({
  label,
  delta,
  primary,
  secondary,
  tone = 'mint',
}: CompareCardProps) {
  const theme = TILE_THEMES[tone]
  const maxVal = Math.max(primary.value, secondary.value, 1)
  const pPct = Math.round((primary.value / maxVal) * 100)
  const sPct = Math.round((secondary.value / maxVal) * 100)
  const mutedFill =
    tone === 'white'
      ? '#CDD3DD'
      : tone in HUE_PALETTES
        ? HUE_PALETTES[tone as Hue][300]
        : theme.mutedBar

  return (
    <Tile size="s" tone={tone}>
      <span
        className="flex items-center justify-between gap-2 text-[14px] font-medium"
        style={{ color: theme.soft }}
      >
        <span className="truncate">{label}</span>
        <span className="shrink-0 whitespace-nowrap">{delta}</span>
      </span>
      <span className="flex flex-col gap-3">
        <span className="flex flex-col gap-1.5">
          <span className="flex justify-between gap-2 text-[13px]">
            <span className="truncate" style={{ color: theme.soft }}>{primary.label}</span>
            <span className="shrink-0 font-bold whitespace-nowrap">
              {primary.display ?? primary.value.toLocaleString('en-US')}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="h-2.5 rounded-[5px] overflow-hidden"
            style={{ backgroundColor: theme.track }}
          >
            <span
              className="block h-full rounded-[5px]"
              style={{ width: `${pPct}%`, backgroundColor: theme.accent }}
            />
          </span>
        </span>
        <span className="flex flex-col gap-1.5">
          <span className="flex justify-between gap-2 text-[13px]">
            <span className="truncate" style={{ color: theme.soft }}>{secondary.label}</span>
            <span className="shrink-0 font-bold whitespace-nowrap">
              {secondary.display ?? secondary.value.toLocaleString('en-US')}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="h-2.5 rounded-[5px] overflow-hidden"
            style={{ backgroundColor: theme.track }}
          >
            <span
              className="block h-full rounded-[5px]"
              style={{ width: `${sPct}%`, backgroundColor: mutedFill }}
            />
          </span>
        </span>
      </span>
    </Tile>
  )
}
