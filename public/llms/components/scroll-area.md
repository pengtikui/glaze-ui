# ScrollArea (自定义滚动区)

> 跨平台一致的细胶囊悬浮滚动条容器，悬停或滚动时柔和显现。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/scroll-area
```

- **Registry JSON**: `/r/scroll-area.json`
- **Import Path**: `@/components/ui/scroll-area`
- **Exports**: `ScrollArea`
- **Base UI Primitive**: `@base-ui/react/scroll-area` ([Base UI Docs](https://base-ui.com/react/components/scroll-area))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### ScrollArea

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className?` | `string` | — | — |
| `viewportClassName?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-hovering` | 指针悬停在滚动区上方 |
| `data-scrolling` | 正在发生滚动 |

## Source Code

```tsx
import * as React from 'react'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cn } from 'cn'

export function ScrollArea({
  className,
  viewportClassName,
  children,
}: {
  className?: string
  viewportClassName?: string
  children: React.ReactNode
}) {
  return (
    <BaseScrollArea.Root className={cn('relative overflow-hidden', className)}>
      <BaseScrollArea.Viewport
        className={cn(
          'h-full w-full overscroll-contain rounded-[inherit] outline-none',
          viewportClassName,
        )}
      >
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        className="m-1 flex w-1.5 justify-center rounded-full bg-transparent opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-hovering:opacity-100 data-scrolling:opacity-100"
      >
        <BaseScrollArea.Thumb className="w-full rounded-full bg-[#CDD3DD]" />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  )
}
```
