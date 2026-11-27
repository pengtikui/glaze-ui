# Separator (分隔线)

> 语义化水平或垂直分割线（role="separator"），支持常规与柔浅色调。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/separator
```

- **Registry JSON**: `/r/separator.json`
- **Import Path**: `@/components/ui/separator`
- **Exports**: `Separator`
- **Base UI Primitive**: `@base-ui/react/separator` ([Base UI Docs](https://base-ui.com/react/components/separator))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### Separator

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-orientation` | horizontal | vertical |

## Source Code

```tsx
import * as React from 'react'
import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cn } from 'cn'

export function Separator({
  orientation = 'horizontal',
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        'shrink-0 bg-[#E8EBF0]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}
```
