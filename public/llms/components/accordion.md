# Accordion (手风琴折叠面板)

> 18px 圆角折叠面板组，使用 Base UI --accordion-panel-height 变量驱动平滑高度展开。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/accordion
```

- **Registry JSON**: `/r/accordion.json`
- **Import Path**: `@/components/ui/accordion`
- **Exports**: `Accordion`, `AccordionItem`
- **Base UI Primitive**: `@base-ui/react/accordion` ([Base UI Docs](https://base-ui.com/react/components/accordion))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/style`

## API Reference

### Accordion

Inherits standard Base UI / HTML element props.

### AccordionItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | — |
| `title` | `React.ReactNode` | — | — |
| `subtitle?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 面板处于展开态 |
| `data-panel-open` | 触发器对应面板已展开 |
| `data-disabled` | 面板项被禁用 |

### CSS Variables

- `--accordion-panel-height`

## Source Code

```tsx
import * as React from 'react'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from 'cn'

export function Accordion({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root
      className={cn('flex w-full flex-col gap-2', className)}
      {...props}
    />
  )
}

export interface AccordionItemProps {
  value: string
  title: React.ReactNode
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem({
  value,
  title,
  subtitle,
  children,
  className,
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      value={value}
      className={cn(
        'overflow-hidden rounded-inner bg-[#F6F7F9] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-open:bg-[#EEF0F5]',
        className,
      )}
    >
      <BaseAccordion.Header>
        <BaseAccordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7B80EA]">
          <div className="flex min-w-0 flex-col">
            <span className="text-[14px] font-bold text-[#1B1F27]">{title}</span>
            {subtitle && (
              <span className="text-[12px] text-[#6B7280]">{subtitle}</span>
            )}
          </div>
          <CaretDown
            size={16}
            weight="bold"
            className="shrink-0 text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
          />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="h-(--accordion-panel-height) overflow-hidden text-[13px] leading-relaxed text-[#5B6170] transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
        <div className="px-4 pb-4">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  )
}
```
