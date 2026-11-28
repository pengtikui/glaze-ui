# NumberField (数字步进框)

> 支持键盘微调、拖动增减（Scrub）、范围限制与单位后缀的无障碍数值输入控件。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/number-field
```

- **Registry JSON**: `/r/number-field.json`
- **Import Path**: `@/components/ui/number-field`
- **Exports**: `NumberField`
- **Base UI Primitive**: `@base-ui/react/number-field` ([Base UI Docs](https://base-ui.com/react/components/number-field))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### NumberField

Extends: `Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>, 'className'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label?` | `string` | — | — |
| `unit?` | `string` | — | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-disabled` | 禁用态 |
| `data-scrubbing` | 正在通过指针拖动调节数值 |

## Source Code

```tsx
import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { Minus, Plus } from '@phosphor-icons/react'
import { cn } from 'cn'
import { CONTROL_SOFT, CONTROL_WHITE, PILL_CONTROL, PRESS_CLASS } from '@/lib/motion'

export interface NumberFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>, 'className'> {
  label?: string
  unit?: string
  surface?: 'soft' | 'white'
  className?: string
}

export function NumberField({
  label,
  unit,
  surface = 'soft',
  className,
  ...props
}: NumberFieldProps) {
  const id = React.useId()
  return (
    <BaseNumberField.Root id={id} className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <BaseNumberField.ScrubArea className="cursor-ew-resize select-none">
          <label
            htmlFor={id}
            className="text-[13px] font-semibold text-[#1B1F27]"
          >
            {label}
          </label>
        </BaseNumberField.ScrubArea>
      )}
      <BaseNumberField.Group
        className={cn(
          'inline-flex h-11 items-center p-1',
          PILL_CONTROL,
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
        )}
      >
        <BaseNumberField.Decrement
          className={cn(
            'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.06)] hover:bg-[#F2F3F5] disabled:opacity-40',
            PRESS_CLASS,
          )}
        >
          <Minus size={14} weight="bold" />
        </BaseNumberField.Decrement>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 px-2.5">
          <BaseNumberField.Input className="w-full min-w-10 max-w-20 bg-transparent text-center font-glaze-display text-[15px] font-bold text-[#1B1F27] tabular-nums outline-none" />
          {unit && (
            <span className="shrink-0 text-[12px] font-medium text-[#6B7280]">{unit}</span>
          )}
        </div>
        <BaseNumberField.Increment
          className={cn(
            'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.06)] hover:bg-[#F2F3F5] disabled:opacity-40',
            PRESS_CLASS,
          )}
        >
          <Plus size={14} weight="bold" />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}
```
