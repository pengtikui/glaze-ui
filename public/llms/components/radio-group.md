# RadioGroup (单选框组)

> 支持方向键漫游焦点的无障碍单选组容器。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/radio-group
```

- **Registry JSON**: `/r/radio-group.json`
- **Import Path**: `@/components/ui/radio-group`
- **Exports**: `RadioGroup`
- **Base UI Primitive**: `@base-ui/react/radio-group` ([Base UI Docs](https://base-ui.com/react/components/radio-group))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### RadioGroup

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-disabled` | 整组禁用状态 |

## Source Code

```tsx
import * as React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cn } from 'cn'

export function RadioGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      className={cn('flex flex-col gap-2.5', className)}
      {...props}
    />
  )
}
```
