import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export function SliderControlCard({
  label,
  defaultValue = 68,
  unit = '%',
  hue = 'periwinkle',
  tone = 'white',
}: {
  label: string
  defaultValue?: number
  unit?: string
  hue?: Hue
  tone?: TileTone
}) {
  const [val, setVal] = React.useState(defaultValue)
  React.useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])
  const theme = TILE_THEMES[tone]
  return (
    <Tile size="s" tone={tone} className="justify-between">
      <span className="text-[14px] font-medium" style={{ color: theme.soft }}>
        {label}
      </span>
      <div className="font-glaze-display text-[40px] leading-none font-extrabold">
        {val}
        <span className="ml-0.5 text-[18px] font-bold" style={{ color: theme.soft }}>
          {unit}
        </span>
      </div>
      <Slider
        value={val}
        onValueChange={(v) => setVal(typeof v === 'number' ? v : v[0])}
        hue={hue}
        showValue={false}
      />
    </Tile>
  )
}
