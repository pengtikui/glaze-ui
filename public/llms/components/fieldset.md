# Fieldset (表单分组)

> 将相关表单字段归类到带标题（FieldsetLegend）的 18px 圆角区块内。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/fieldset
```

- **Registry JSON**: `/r/fieldset.json`
- **Import Path**: `@/components/ui/fieldset`
- **Exports**: `Fieldset`, `FieldsetLegend`
- **Base UI Primitive**: `@base-ui/react/fieldset` ([Base UI Docs](https://base-ui.com/react/components/fieldset))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/style`

## API Reference

### Fieldset

Inherits standard Base UI / HTML element props.

### FieldsetLegend

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-disabled` | 整组禁用态 |

### CSS Variables

- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { cn } from 'cn'

export function Fieldset({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      className={cn(
        'flex w-full flex-col gap-4 rounded-inner bg-[#F6F7F9] p-5',
        className,
      )}
      {...props}
    />
  )
}

export function FieldsetLegend({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      className={cn('text-[15px] font-bold text-[#1B1F27]', className)}
      {...props}
    />
  )
}
```
