# Form (表单容器)

> 原生约束验证与服务端错误信息统一分发容器，与 Field 无缝协作。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/form
```

- **Registry JSON**: `/r/form.json`
- **Import Path**: `@/components/ui/form`
- **Exports**: `Form`
- **Base UI Primitive**: `@base-ui/react/form` ([Base UI Docs](https://base-ui.com/react/components/form))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### Form

Inherits standard Base UI / HTML element props.

## Source Code

```tsx
import * as React from 'react'
import { Form as BaseForm } from '@base-ui/react/form'
import { cn } from 'cn'

export function Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseForm>) {
  return <BaseForm className={cn('flex w-full flex-col gap-4', className)} {...props} />
}
```
