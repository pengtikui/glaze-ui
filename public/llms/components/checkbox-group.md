# CheckboxGroup (复选框组)

> 管理多组 Checkbox 共享选中值数组，支持全选联动（parent checkbox）。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/checkbox-group
```

- **Registry JSON**: `/r/checkbox-group.json`
- **Import Path**: `@/components/ui/checkbox-group`
- **Exports**: `CheckboxGroup`
- **Base UI Primitive**: `@base-ui/react/checkbox-group` ([Base UI Docs](https://base-ui.com/react/components/checkbox-group))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### CheckboxGroup

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-disabled` | 整组禁用状态 |

## Source Code

```tsx
import * as React from 'react'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from 'cn'

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      className={cn('flex flex-col gap-2.5', className)}
      {...props}
    />
  )
}
```
