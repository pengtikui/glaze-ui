# ToggleGroup (切换按钮组)

> 协调一组 Toggle 的单选或多选状态，内置柔灰胶囊轨道容器。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/toggle-group
```

- **Registry JSON**: `/r/toggle-group.json`
- **Import Path**: `@/components/ui/toggle-group`
- **Exports**: `ToggleGroup`
- **Base UI Primitive**: `@base-ui/react/toggle-group` ([Base UI Docs](https://base-ui.com/react/components/toggle-group))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### ToggleGroup

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-multiple` | 允许同时选中多项 |

## Source Code

```tsx
import * as React from 'react'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from 'cn'

export function ToggleGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-[#F2F3F5] p-1',
        className,
      )}
      {...props}
    />
  )
}
```
