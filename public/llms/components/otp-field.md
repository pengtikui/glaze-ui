# OTPField (验证码输入框)

> 基于 Base UI v1.9 OTPField 构建的一次性密码/验证码分段输入框，支持自动跳格与粘贴填充。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/otp-field
```

- **Registry JSON**: `/r/otp-field.json`
- **Import Path**: `@/components/ui/otp-field`
- **Exports**: `OTPField`
- **Base UI Primitive**: `@base-ui/react/otp-field` ([Base UI Docs](https://base-ui.com/react/components/otp-field))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/style`

## API Reference

### OTPField

Extends: `Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Root>, 'className' | 'length'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length?` | `number` | `6` | — |
| `separatorAt?` | `number` | `3` | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-filled` | 该槽位已输入字符 |
| `data-focused` | 该槽位处于聚焦激活态 |

## Source Code

```tsx
import * as React from 'react'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { cn } from 'cn'

export interface OTPFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Root>, 'className' | 'length'> {
  length?: number
  separatorAt?: number
  surface?: 'soft' | 'white'
  className?: string
}

export function OTPField({
  length = 6,
  separatorAt = 3,
  surface = 'soft',
  className,
  ...props
}: OTPFieldProps) {
  return (
    <BaseOTPField.Root
      length={length}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <BaseOTPField.Input
            className={cn(
              'h-12 w-11 rounded-2xl border-0 text-center font-glaze-display text-[18px] font-extrabold text-[#1B1F27] tabular-nums outline-none',
              surface === 'white'
                ? 'bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)] hover:bg-[#FAFBFD]'
                : 'bg-[#F6F7F9] hover:bg-[#EEF0F4]',
              'transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
              'focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#7B80EA]',
              'data-filled:bg-[#E4E6FD]/60 data-filled:text-[#262B7A]',
              'data-disabled:opacity-45',
            )}
          />
          {separatorAt > 0 && index === separatorAt - 1 && index < length - 1 && (
            <BaseOTPField.Separator className="px-0.5 text-[16px] font-bold text-[#CDD3DD]">
              ·
            </BaseOTPField.Separator>
          )}
        </React.Fragment>
      ))}
    </BaseOTPField.Root>
  )
}
```
