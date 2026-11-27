# Radio (单选框)

> 配合 RadioGroup 使用的单项选择控件，带有清晰圆点指示与标签描述。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/radio
```

- **Registry JSON**: `/r/radio.json`
- **Import Path**: `@/components/ui/radio`
- **Exports**: `Radio`
- **Base UI Primitive**: `@base-ui/react/radio` ([Base UI Docs](https://base-ui.com/react/components/radio))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/style`

## API Reference

### Radio

Extends: `Omit<React.ComponentPropsWithoutRef<typeof BaseRadio.Root>, 'className'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label?` | `React.ReactNode` | — | — |
| `description?` | `string` | — | — |
| `card?` | `boolean` | `false` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-checked` | 选中状态 |
| `data-unchecked` | 未选中状态 |
| `data-disabled` | 禁用状态 |

## Source Code

```tsx
import * as React from 'react'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { cn } from 'cn'

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadio.Root>, 'className'> {
  label?: React.ReactNode
  description?: string
  card?: boolean
  className?: string
}

export function Radio({
  label,
  description,
  card = false,
  className,
  ...props
}: RadioProps) {
  const indicator = (
    <BaseRadio.Root
      className={cn(
        'relative box-border inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] p-0 outline-none',
        'transition-[transform,border-color,background-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)] active:[transform:scale(0.95)]',
        'border-[#CDD3DD] bg-white hover:border-[#8A90A0]',
        'data-checked:border-[#1B1F27] data-checked:bg-[#1B1F27]',
        'focus-visible:ring-2 focus-visible:ring-[#7B80EA] focus-visible:ring-offset-2',
        'data-disabled:pointer-events-none data-disabled:opacity-45',
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className="pointer-events-none h-2 w-2 rounded-full bg-white transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-ending-style:[transform:scale(0.4)] data-ending-style:opacity-0 data-starting-style:[transform:scale(0.4)] data-starting-style:opacity-0" />
    </BaseRadio.Root>
  )

  if (!label) return indicator

  return (
    <label
      className={cn(
        'inline-flex cursor-pointer gap-2.5 select-none',
        description ? 'items-start' : 'items-center',
        card &&
          'w-full rounded-inner bg-[#F6F7F9] px-4 py-3 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#EEF0F4] has-data-checked:bg-[#E4E6FD]/65 has-data-checked:ring-2 has-data-checked:ring-inset has-data-checked:ring-[#7B80EA]',
      )}
    >
      <span className="inline-flex h-5 shrink-0 items-center">{indicator}</span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[14px] leading-5 font-medium text-[#1B1F27]">
          {label}
        </span>
        {description && (
          <span className="text-[12px] leading-4 text-[#6B7280]">{description}</span>
        )}
      </span>
    </label>
  )
}
```
