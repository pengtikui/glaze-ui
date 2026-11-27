# Field (表单字段)

> 自动关联 Label、Control、Description 与 Error 的无障碍表单字段容器。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/field
```

- **Registry JSON**: `/r/field.json`
- **Import Path**: `@/components/ui/field`
- **Exports**: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldControl`
- **Base UI Primitive**: `@base-ui/react/field` ([Base UI Docs](https://base-ui.com/react/components/field))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### Field

Inherits standard Base UI / HTML element props.

### FieldLabel

Inherits standard Base UI / HTML element props.

### FieldDescription

Inherits standard Base UI / HTML element props.

### FieldError

Inherits standard Base UI / HTML element props.

### FieldControl

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-invalid` | 字段校验未通过 |
| `data-valid` | 字段校验通过 |
| `data-dirty` | 字段值已变更 |
| `data-touched` | 字段已失焦触碰 |

## Source Code

```tsx
import * as React from 'react'
import { Field as BaseField } from '@base-ui/react/field'
import { cn } from 'cn'

export function Field({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      className={cn('flex w-full flex-col gap-1.5', className)}
      {...props}
    />
  )
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={cn('text-[13px] font-semibold text-[#1B1F27]', className)}
      {...props}
    />
  )
}

export function FieldDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      className={cn('text-[12px] text-[#6B7280]', className)}
      {...props}
    />
  )
}

export function FieldError({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={cn('text-[12px] font-medium text-[#A6360F]', className)}
      {...props}
    />
  )
}

export const FieldControl = BaseField.Control
```
