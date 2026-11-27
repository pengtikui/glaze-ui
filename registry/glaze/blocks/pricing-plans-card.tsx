import { Check } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'

export function PricingPlansCard({
  plans,
  onSelect,
  tone = 'white',
}: {
  plans: {
    id: string
    name: string
    price: string
    period: string
    badge?: string
    hue: Hue
    features: string[]
    highlighted?: boolean
  }[]
  onSelect?: (id: string) => void
  tone?: TileTone
}) {
  return (
    <Tile size="f" tone={tone}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.slice(0, 3).map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-between gap-5 rounded-[22px] p-5"
            style={{
              backgroundColor: p.highlighted ? HUE_PALETTES[p.hue][100] : '#F6F7F9',
              color: p.highlighted ? HUE_PALETTES[p.hue][900] : '#1B1F27',
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-glaze-display text-[18px] font-extrabold">{p.name}</span>
                {p.badge && (
                  <HueTag hue={p.hue} tone={p.highlighted ? 'solid' : 'soft'} size="sm">
                    {p.badge}
                  </HueTag>
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-glaze-display text-[38px] leading-none font-extrabold">
                  {p.price}
                </span>
                <span className="text-[13px] opacity-70">{p.period}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px]">
                    <Check size={14} weight="bold" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant={p.highlighted ? 'primary' : 'secondary'}
              onClick={() => onSelect?.(p.id)}
              className="w-full"
            >
              选择 {p.name}
            </Button>
          </div>
        ))}
      </div>
    </Tile>
  )
}
