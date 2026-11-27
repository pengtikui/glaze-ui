# Progress (进度条)

> 支持常规线性进度条（Progress）与多段彩色占比进度条（SegmentedProgress）。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/progress
```

- **Registry JSON**: `/r/progress.json`
- **Import Path**: `@/components/ui/progress`
- **Exports**: `Progress`, `SegmentedProgress`
- **Base UI Primitive**: `@base-ui/react/progress` ([Base UI Docs](https://base-ui.com/react/components/progress))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tokens`

## API Reference

### Progress

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| null` | — | — |
| `max?` | `number` | `100` | — |
| `hue?` | `Hue \| 'ink'` | `'periwinkle'` | — |
| `variant?` | `'linear' \| 'ring'` | `'linear'` | — |
| `height?` | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| `size?` | `number` | `64` | — |
| `strokeWidth?` | `number` | `7` | — |
| `label?` | `string` | — | — |
| `showValue?` | `boolean` | `false` | — |
| `trackColor?` | `string` | — | — |
| `barColor?` | `string` | — | — |
| `className?` | `string` | — | — |

### SegmentedProgress

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `segments` | `{ value?: number; percent?: number; color: string; label?: string }[]` | — | — |
| `height?` | `number \| 'sm' \| 'md' \| 'lg'` | `10` | — |
| `gap?` | `number` | `4` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-complete` | 进度达到 100% |
| `data-indeterminate` | 不确定进度态 |

## Source Code

```tsx
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface ProgressProps {
  value: number | null
  max?: number
  hue?: Hue | 'ink'
  variant?: 'linear' | 'ring'
  height?: 'sm' | 'md' | 'lg'
  size?: number
  strokeWidth?: number
  label?: string
  showValue?: boolean
  trackColor?: string
  barColor?: string
  className?: string
}

export function Progress({
  value,
  max = 100,
  hue = 'periwinkle',
  variant = 'linear',
  height = 'md',
  size = 64,
  strokeWidth = 7,
  label,
  showValue = false,
  trackColor,
  barColor,
  className,
}: ProgressProps) {
  const accent =
    barColor ?? (hue === 'ink' ? '#1B1F27' : HUE_PALETTES[hue][500])
  const pct = value === null ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  if (variant === 'ring') {
    const r = (size - strokeWidth) / 2
    const circ = 2 * Math.PI * r
    const offset = circ - (pct / 100) * circ

    return (
      <BaseProgress.Root
        value={value}
        max={max}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={trackColor ?? 'rgba(27,31,39,0.1)'}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        </svg>
        {showValue && (
          <BaseProgress.Value className="absolute font-glaze-display text-[13px] font-extrabold tabular-nums">
            {() => `${Math.round(pct)}%`}
          </BaseProgress.Value>
        )}
      </BaseProgress.Root>
    )
  }

  return (
    <BaseProgress.Root
      value={value}
      max={max}
      className={cn('flex w-full flex-col gap-1.5', className)}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between text-[13px]">
          {label ? (
            <BaseProgress.Label className="font-semibold text-[#1B1F27]">
              {label}
            </BaseProgress.Label>
          ) : (
            <span />
          )}
          {showValue && (
            <BaseProgress.Value className="font-glaze-display font-bold text-[#1B1F27] tabular-nums">
              {() => (value === null ? '进行中' : `${Math.round(pct)}%`)}
            </BaseProgress.Value>
          )}
        </div>
      )}
      <BaseProgress.Track
        className={cn(
          'w-full overflow-hidden rounded-full',
          height === 'sm' && 'h-1.5',
          height === 'md' && 'h-2.5',
          height === 'lg' && 'h-3.5',
        )}
        style={{ backgroundColor: trackColor ?? '#ECECF4' }}
      >
        <BaseProgress.Indicator
          className="h-full rounded-full transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ backgroundColor: accent }}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}

export function SegmentedProgress({
  segments,
  height = 10,
  gap = 4,
  className,
}: {
  segments: { value?: number; percent?: number; color: string; label?: string }[]
  height?: number | 'sm' | 'md' | 'lg'
  gap?: number
  className?: string
}) {
  const total = segments.reduce((sum, s) => sum + (s.percent ?? s.value ?? 0), 0) || 100
  const px = height === 'sm' ? 6 : height === 'md' ? 10 : height === 'lg' ? 14 : height
  return (
    <div
      className={cn('flex w-full overflow-hidden rounded-full', className)}
      style={{ height: px, gap }}
    >
      {segments.map((seg, i) => {
        const w = ((seg.percent ?? seg.value ?? 0) / total) * 100
        return (
          <div
            key={i}
            title={seg.label}
            className="h-full rounded-full transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${w}%`, backgroundColor: seg.color }}
          />
        )
      })}
    </div>
  )
}
```
