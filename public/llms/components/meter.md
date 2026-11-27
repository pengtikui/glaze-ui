# Meter (语义计量条)

> 用于展示容量/配额/预算等区间占比，可按阈值自动切换正常/注意/异常语义颜色。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/meter
```

- **Registry JSON**: `/r/meter.json`
- **Import Path**: `@/components/ui/meter`
- **Exports**: `Meter`
- **Base UI Primitive**: `@base-ui/react/meter` ([Base UI Docs](https://base-ui.com/react/components/meter))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tokens`

## API Reference

### Meter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | — |
| `min?` | `number` | `0` | — |
| `max?` | `number` | `100` | — |
| `label?` | `string` | — | — |
| `valueLabel?` | `string` | — | — |
| `hue?` | `Hue \| 'auto'` | `'auto'` | — |
| `className?` | `string` | — | — |

## Source Code

```tsx
import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface MeterProps {
  value: number
  min?: number
  max?: number
  label?: string
  valueLabel?: string
  hue?: Hue | 'auto'
  className?: string
}

export function Meter({
  value,
  min = 0,
  max = 100,
  label,
  valueLabel,
  hue = 'auto',
  className,
}: MeterProps) {
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)))
  const barColor =
    hue !== 'auto'
      ? HUE_PALETTES[hue][500]
      : ratio >= 0.85
        ? HUE_PALETTES.coral[500]
        : ratio >= 0.65
          ? HUE_PALETTES.peach[500]
          : HUE_PALETTES.mint[500]

  return (
    <BaseMeter.Root
      value={value}
      min={min}
      max={max}
      className={cn('flex w-full flex-col gap-1.5', className)}
    >
      <div className="flex items-center justify-between text-[13px]">
        {label ? (
          <BaseMeter.Label className="font-semibold text-[#1B1F27]">
            {label}
          </BaseMeter.Label>
        ) : (
          <span />
        )}
        <BaseMeter.Value className="font-glaze-display font-bold text-[#1B1F27] tabular-nums">
          {() => valueLabel ?? `${Math.round(ratio * 100)}%`}
        </BaseMeter.Value>
      </div>
      <BaseMeter.Track className="h-2.5 w-full overflow-hidden rounded-full bg-[#ECECF4]">
        <BaseMeter.Indicator
          className="h-full rounded-full transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ backgroundColor: barColor }}
        />
      </BaseMeter.Track>
    </BaseMeter.Root>
  )
}
```
