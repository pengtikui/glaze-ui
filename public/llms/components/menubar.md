# Menubar (应用菜单栏)

> 桌面应用风格的顶部水平菜单栏，支持悬停无缝切换相邻下拉菜单。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/menubar
```

- **Registry JSON**: `/r/menubar.json`
- **Import Path**: `@/components/ui/menubar`
- **Exports**: `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`
- **Base UI Primitive**: `@base-ui/react/menubar` ([Base UI Docs](https://base-ui.com/react/components/menubar))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### Menubar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |

### MenubarMenu

Inherits standard Base UI / HTML element props.

### MenubarTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |

### MenubarContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | — |

### MenubarItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | — |
| `shortcut?` | `string` | — | — |
| `onClick?` | `() => void` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-popup-open` | 当前激活菜单触发器 |
| `data-instant` | 菜单之间快速切换时消除过渡延迟 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import * as React from 'react'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export function Menubar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <BaseMenubar
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-[#F2F3F5] p-1',
        className,
      )}
    >
      {children}
    </BaseMenubar>
  )
}

export const MenubarMenu = BaseMenu.Root

export function MenubarTrigger({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <BaseMenu.Trigger
      className={cn(
        'inline-flex h-8 cursor-pointer items-center rounded-full px-3.5 text-[13px] font-semibold text-[#1B1F27] select-none outline-none transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white data-popup-open:bg-white data-popup-open:shadow-[0_1px_3px_rgba(16,24,40,0.08)]',
        className,
      )}
    >
      {children}
    </BaseMenu.Trigger>
  )
}

export function MenubarContent({ children }: { children: React.ReactNode }) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={8} align="start" className="z-50">
        <BaseMenu.Popup
          className={cn(
            POPUP_SURFACE,
            POPUP_TRANSITION_CLASS,
            'min-w-45 p-1.5',
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export function MenubarItem({
  children,
  shortcut,
  onClick,
}: {
  children: React.ReactNode
  shortcut?: string
  onClick?: () => void
}) {
  return (
    <BaseMenu.Item
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-[12px] px-3 py-2 text-[13px] font-medium text-[#1B1F27] outline-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-highlighted:bg-[#F2F3F5]"
    >
      <span>{children}</span>
      {shortcut && (
        <span className="font-glaze-mono text-[11px] text-[#8A90A0]">{shortcut}</span>
      )}
    </BaseMenu.Item>
  )
}
```
