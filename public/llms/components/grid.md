# Grid (四列密集栅格)

> Glaze 4 列 dense 自动排布栅格容器，桌面 4 列 / 平板 2 列 / 手机 1 列，支持预览列数覆盖。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/grid
```

- **Registry JSON**: `/r/grid.json`
- **Import Path**: `@/components/ui/grid`
- **Exports**: `Grid`
- **NPM Dependencies**: `cn`
- **Registry Dependencies**: `@glaze/style`

## API Reference

### Grid

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `forceCols?` | `4 \| 2 \| 1` | — | Force preview column count (used by responsive grid demos) |

### CSS Variables

- `--glaze-canvas`

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Force preview column count (used by responsive grid demos) */
  forceCols?: 4 | 2 | 1
}

export function Grid({
  forceCols,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'glaze-grid',
        forceCols === 2 && 'glaze-grid-cols-2',
        forceCols === 1 && 'glaze-grid-cols-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```
