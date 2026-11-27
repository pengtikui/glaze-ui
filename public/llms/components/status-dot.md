# StatusDot (语义状态点)

> 展示实时在线/告警状态的圆点指示器，支持 CSS 涟漪扩散（normal）与呼吸闪烁（warning/error）动画。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/status-dot
```

- **Registry JSON**: `/r/status-dot.json`
- **Import Path**: `@/components/ui/status-dot`
- **Exports**: `StatusDot`
- **NPM Dependencies**: `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tokens`

## API Reference

### StatusDot

Extends: `React.HTMLAttributes<HTMLSpanElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status?` | `Status` | `'normal'` | — |
| `color?` | `string` | — | — |
| `mode?` | `'static' \| 'ripple' \| 'blink'` | — | — |
| `animated?` | `boolean` | `false` | — |
| `size?` | `number \| 'sm' \| 'md' \| 'lg'` | `8` | — |

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'
import { SEMANTIC_TOKENS, type Status } from '@/lib/tokens'

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: Status
  color?: string
  mode?: 'static' | 'ripple' | 'blink'
  animated?: boolean
  size?: number | 'sm' | 'md' | 'lg'
}

export function StatusDot({
  status = 'normal',
  color,
  mode,
  animated = false,
  size = 8,
  className,
  ...props
}: StatusDotProps) {
  const dotColor = color ?? SEMANTIC_TOKENS[status].dot
  const effectiveMode = mode ?? (animated ? 'ripple' : 'static')
  const px = size === 'sm' ? 7 : size === 'md' ? 9 : size === 'lg' ? 12 : size
  return (
    <span
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: px, height: px }}
      {...props}
    >
      {effectiveMode === 'ripple' && (
        <span
          className="animate-glaze-ripple absolute inset-0 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      )}
      <span
        className={cn(
          'relative rounded-full',
          effectiveMode === 'blink' && 'animate-glaze-blink',
        )}
        style={{ width: px, height: px, backgroundColor: dotColor }}
      />
    </span>
  )
}
```
