# StatusPill (语义状态胶囊)

> 用于展示正常 / 注意 / 异常 / 信息 / 停用 5 种语义状态的胶囊徽章，可选呼吸状态点。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/status-pill
```

- **Registry JSON**: `/r/status-pill.json`
- **Import Path**: `@/components/ui/status-pill`
- **Exports**: `StatusPill`
- **NPM Dependencies**: `cn`
- **Registry Dependencies**: `@glaze/tokens`

## API Reference

### StatusPill

Extends: `React.HTMLAttributes<HTMLSpanElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `Status` | — | — |
| `label?` | `string` | — | — |
| `showDot?` | `boolean` | `true` | — |
| `size?` | `'sm' \| 'md'` | `'md'` | — |

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'
import { SEMANTIC_TOKENS, type Status } from '@/lib/tokens'

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: Status
  label?: string
  showDot?: boolean
  size?: 'sm' | 'md'
}

export function StatusPill({
  status,
  label,
  showDot = true,
  size = 'md',
  className,
  children,
  ...props
}: StatusPillProps) {
  const token = SEMANTIC_TOKENS[status]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold whitespace-nowrap select-none',
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-[12px]',
        className,
      )}
      style={{ backgroundColor: token.pillBg, color: token.ink }}
      {...props}
    >
      {showDot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: token.dot }}
        />
      )}
      {children ?? label ?? token.label}
    </span>
  )
}
```
