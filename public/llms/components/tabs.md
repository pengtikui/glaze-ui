# Tabs (标签页)

> 全圆胶囊标签页容器，内置纯 CSS 200ms 水平滑动背景指示器与完整键盘焦点管理。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/tabs
```

- **Registry JSON**: `/r/tabs.json`
- **Import Path**: `@/components/ui/tabs`
- **Exports**: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- **Base UI Primitive**: `@base-ui/react/tabs` ([Base UI Docs](https://base-ui.com/react/components/tabs))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### Tabs

Inherits standard Base UI / HTML element props.

### TabsList

Inherits standard Base UI / HTML element props.

### TabsTrigger

Inherits standard Base UI / HTML element props.

### TabsContent

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-active` | 当前激活的标签触发器 |
| `data-orientation` | 排列方向（horizontal | vertical） |

### CSS Variables

- `--active-tab-left`
- `--active-tab-width`
- `--glaze-dur-base`

## Source Code

```tsx
import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from 'cn'

export function Tabs({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Root>) {
  return (
    <BaseTabs.Root
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  )
}

export function TabsList({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn(
        'relative isolate inline-flex w-fit items-center gap-1 rounded-full bg-[#F2F3F5] p-1',
        className,
      )}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-0 rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)]',
          'h-(--active-tab-height) w-(--active-tab-width)',
          '[transform:translate3d(var(--active-tab-left),var(--active-tab-top),0)]',
          'will-change-[transform,width] transition-[transform,width,height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        )}
      />
    </BaseTabs.List>
  )
}

export function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        'relative z-10 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-semibold whitespace-nowrap select-none outline-none',
        'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'text-[#5B6170] hover:text-[#1B1F27] data-active:text-[#1B1F27]',
        'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
        className,
      )}
      {...props}
    >
      {children}
    </BaseTabs.Tab>
  )
}

export function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn('outline-none', className)} {...props} />
}
```
