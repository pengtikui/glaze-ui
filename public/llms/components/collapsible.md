# Collapsible (单块折叠区)

> 独立可控的展开/收起内容区域，内置平滑高度过渡与标题副文插槽。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/collapsible
```

- **Registry JSON**: `/r/collapsible.json`
- **Import Path**: `@/components/ui/collapsible`
- **Exports**: `Collapsible`
- **Base UI Primitive**: `@base-ui/react/collapsible` ([Base UI Docs](https://base-ui.com/react/components/collapsible))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/style`

## API Reference

### Collapsible

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | — | — |
| `badge?` | `React.ReactNode` | — | — |
| `defaultOpen?` | `boolean` | `false` | — |
| `children` | `React.ReactNode` | — | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 处于展开态 |
| `data-panel-open` | 触发器关联面板已展开 |

### CSS Variables

- `--collapsible-panel-height`

## Source Code

```tsx
import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from 'cn'

export function Collapsible({
  title,
  badge,
  defaultOpen = false,
  children,
  className,
}: {
  title: React.ReactNode
  badge?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      className={cn('rounded-inner bg-[#F6F7F9] p-4', className)}
    >
      <BaseCollapsible.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-[#1B1F27]">{title}</span>
          {badge}
        </div>
        <CaretDown
          size={16}
          weight="bold"
          className="text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
        />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
        <div className="pt-3 text-[13px] leading-relaxed text-[#5B6170]">
          {children}
        </div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  )
}
```
