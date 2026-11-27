import { Tile } from '@/components/ui/tile'
import { Tooltip } from '@/components/ui/tooltip'
import { DATAVIZ_PALETTES, type TileTone } from '@/lib/tokens'

export interface HeatmapCardProps {
  title: string
  /** 7 rows × 24 cols array of intensity levels 0..4 */
  matrix?: number[]
  axisLabels?: string[]
  tone?: TileTone
}

const DEFAULT_HEAT_MATRIX: number[] = (() => {
  const out: number[] = []
  for (let r = 0; r < 7; r++) {
    for (let h = 0; h < 24; h++) {
      const base =
        (h >= 9 && h <= 11) || (h >= 19 && h <= 22)
          ? 3
          : h >= 7 && h <= 23
            ? 1
            : 0
      const wk = r >= 5 ? (h >= 10 && h <= 22 ? 1 : -1) : 0
      const jitter = (r * 7 + h * 3) % 5 === 0 ? 1 : 0
      out.push(Math.max(0, Math.min(4, base + wk + jitter)))
    }
  }
  return out
})()

const DAY_NAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export function HeatmapCard({
  title,
  matrix = DEFAULT_HEAT_MATRIX,
  axisLabels = ['00 时', '06 时', '12 时', '18 时', '23 时'],
  tone = 'white',
}: HeatmapCardProps) {
  const levels = DATAVIZ_PALETTES.heatmapLevels

  return (
    <Tile size="w" tone={tone} className="py-5.5 justify-start gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[17px] font-bold">{title}</span>
        <span className="flex items-center gap-1 text-[12px] text-[#6B7280]">
          <span>少</span>
          {levels.map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-[3px]"
              style={{ backgroundColor: c }}
            />
          ))}
          <span>多</span>
        </span>
      </div>
      <div className="flex-1 grid grid-cols-24 grid-rows-7 gap-0.75">
        {matrix.slice(0, 168).map((lvl, idx) => {
          const day = DAY_NAMES[Math.floor(idx / 24)]
          const hour = String(idx % 24).padStart(2, '0')
          return (
            <Tooltip
              key={idx}
              content={`${day} ${hour}:00 · 活跃度 ${lvl}/4`}
            >
              <span
                className="rounded-[3px] transition-opacity hover:opacity-80"
                style={{ backgroundColor: levels[lvl] ?? levels[0] }}
              />
            </Tooltip>
          )
        })}
      </div>
      <div className="flex justify-between text-[11px] text-[#6B7280]">
        {axisLabels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </Tile>
  )
}
