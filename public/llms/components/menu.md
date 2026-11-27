# Menu (下拉菜单)

> 支持图标、快捷键提示、分组分隔线与危险操作高亮的命令菜单。通过 PopupTriggerScope 自动稳定触发按钮。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/menu
```

- **Registry JSON**: `/r/menu.json`
- **Import Path**: `@/components/ui/menu`
- **Exports**: `Menu`
- **Base UI Primitive**: `@base-ui/react/menu` ([Base UI Docs](https://base-ui.com/react/components/menu))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### Menu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | — | — |
| `items` | `MenuItemConfig[]` | — | — |
| `align?` | `'start' \| 'center' \| 'end'` | `'end'` | — |
| `side?` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | — |

### Supporting Types

#### `MenuItemConfig`

| Property | Type | Required |
| --- | --- | --- |
| `id` | `string` | Yes |
| `label` | `string` | Yes |
| `icon` | `React.ReactNode` | No |
| `shortcut` | `string` | No |
| `danger` | `boolean` | No |
| `disabled` | `boolean` | No |
| `separatorBefore` | `boolean` | No |
| `onSelect` | `() => void` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-popup-open` | 菜单展开态 |
| `data-highlighted` | 当前焦点菜单项 |
| `data-starting-style` | 浮层进场帧 |
| `data-ending-style` | 浮层退场帧 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import * as React from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
  PopupTriggerScope,
} from '@/lib/motion'

export interface MenuItemConfig {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  danger?: boolean
  disabled?: boolean
  separatorBefore?: boolean
  onSelect?: () => void
}

export interface MenuProps {
  trigger: React.ReactElement
  items: MenuItemConfig[]
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function Menu({
  trigger,
  items,
  align = 'end',
  side = 'bottom',
}: MenuProps) {
  return (
    <BaseMenu.Root>
      <PopupTriggerScope>
        <BaseMenu.Trigger render={trigger} />
      </PopupTriggerScope>
      <BaseMenu.Portal>
        <BaseMenu.Positioner align={align} side={side} sideOffset={8} className="z-50">
          <BaseMenu.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'min-w-50 p-1.5',
            )}
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.separatorBefore && (
                  <BaseMenu.Separator className="my-1 h-px bg-[#EEF0F3]" />
                )}
                <BaseMenu.Item
                  disabled={item.disabled}
                  onClick={item.onSelect}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-[13px] font-medium select-none outline-none',
                    'transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
                    item.danger
                      ? 'text-[#A6360F] data-highlighted:bg-[#FDE5DC]'
                      : 'text-[#1B1F27] data-highlighted:bg-[#F2F3F5]',
                    'data-disabled:pointer-events-none data-disabled:opacity-40',
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span className="opacity-75">{item.icon}</span>}
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span className="font-glaze-mono text-[11px] text-[#8A90A0]">
                      {item.shortcut}
                    </span>
                  )}
                </BaseMenu.Item>
              </React.Fragment>
            ))}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  )
}
```
