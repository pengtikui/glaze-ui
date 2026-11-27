# CountBadge (数字角标)

> 紧凑的等宽数字计数徽章，支持 9 组色相自动配色。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/count-badge
```

- **Registry JSON**: `/r/count-badge.json`
- **Import Path**: `@/components/ui/count-badge`
- **Exports**: `CountBadge`
- **NPM Dependencies**: `cn`
- **Registry Dependencies**: `@glaze/tokens`

## API Reference

### CountBadge

Extends: `React.HTMLAttributes<HTMLSpanElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number \| string` | — | — |
| `hue?` | `Hue \| 'ink' \| 'neutral'` | `'coral'` | — |

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface CountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number | string
  hue?: Hue | 'ink' | 'neutral'
}

export function CountBadge({
  count,
  hue = 'coral',
  className,
  style,
  ...props
}: CountBadgeProps) {
  const colors =
    hue === 'ink'
      ? { backgroundColor: '#1B1F27', color: '#FFFFFF' }
      : hue === 'neutral'
        ? { backgroundColor: '#F2F3F5', color: '#5B6170' }
        : { backgroundColor: HUE_PALETTES[hue][500], color: '#FFFFFF' }

  return (
    <span
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums',
        className,
      )}
      style={{ ...colors, ...style }}
      {...props}
    >
      {count}
    </span>
  )
}
```
