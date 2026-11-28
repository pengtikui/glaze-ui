import { SparkChart } from '@/components/ui/spark-chart'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'

export function SparkMetricRowCard({
  items,
  tone = 'white',
}: {
  items: { label: string; value: string; delta: string; bars: number[]; hue: Hue }[]
  tone?: TileTone
}) {
  return (
    <Tile size="w" tone={tone} className="justify-center">
      <div className="grid grid-cols-3 divide-x divide-[#EEF0F3]">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={it.label}
            className={idx === 0 ? 'pr-4' : idx === 1 ? 'px-4' : 'pl-4'}
          >
            <div className="text-[12px] text-[#6B7280]">{it.label}</div>
            <div className="mt-1 font-glaze-display text-[26px] leading-none font-extrabold">
              {it.value}
            </div>
            <div className="mt-1 text-[11px] font-semibold" style={{ color: HUE_PALETTES[it.hue][700] }}>
              {it.delta}
            </div>
            <div className="mt-2.5">
              <SparkChart
                data={it.bars}
                variant="bar"
                hue={it.hue}
                label={it.label}
                tone={tone}
                height={30}
              />
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}
