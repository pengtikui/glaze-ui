# Input (输入框)

> 基于 Base UI Input 的 44px 全圆胶囊单行输入框，支持前后缀图标与柔灰/纯白两种表面。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/input
```

- **Registry JSON**: `/r/input.json`
- **Import Path**: `@/components/ui/input`
- **Exports**: `Input`
- **Base UI Primitive**: `@base-ui/react/input` ([Base UI Docs](https://base-ui.com/react/components/input))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### Input

Extends: `Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, 'className' | 'size'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leadingIcon?` | `React.ReactNode` | — | — |
| `trailingElement?` | `React.ReactNode` | — | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `inputSize?` | `'sm' \| 'md'` | `'md'` | — |
| `className?` | `string` | — | — |
| `wrapperClassName?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-disabled` | 输入框禁用态 |
| `data-focused` | 获得焦点时添加 |
| `data-invalid` | 在 Field 校验失败时添加 |

## Source Code

```tsx
import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cn } from 'cn'
import { CONTROL_SOFT, CONTROL_WHITE, PILL_CONTROL } from '@/lib/motion'

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, 'className' | 'size'> {
  leadingIcon?: React.ReactNode
  trailingElement?: React.ReactNode
  surface?: 'soft' | 'white'
  inputSize?: 'sm' | 'md'
  className?: string
  wrapperClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      leadingIcon,
      trailingElement,
      surface = 'soft',
      inputSize = 'md',
      className,
      wrapperClassName,
      ...props
    },
    ref,
  ) {
    const heightClass = inputSize === 'sm' ? 'h-9 text-[13px]' : 'h-11 text-[14px]'
    const surfaceClass = surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT

    if (leadingIcon || trailingElement) {
      return (
        <div
          className={cn(
            'relative flex w-full items-center gap-2 px-4',
            heightClass,
            PILL_CONTROL,
            surfaceClass,
            wrapperClassName,
          )}
        >
          {leadingIcon && (
            <span className="shrink-0 text-[#8A90A0]">{leadingIcon}</span>
          )}
          <BaseInput
            ref={ref}
            className={cn(
              'h-full w-full bg-transparent text-[#1B1F27] outline-none placeholder:text-[#8A90A0] disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            {...props}
          />
          {trailingElement && <div className="shrink-0">{trailingElement}</div>}
        </div>
      )
    }

    return (
      <BaseInput
        ref={ref}
        className={cn(
          'w-full px-4 text-[#1B1F27] placeholder:text-[#8A90A0]',
          heightClass,
          PILL_CONTROL,
          surfaceClass,
          'data-invalid:ring-2 data-invalid:ring-inset data-invalid:ring-[#E5603B]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
```
