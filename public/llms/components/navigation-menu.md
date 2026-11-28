# NavigationMenu (导航菜单)

> 带下拉图文面板的站点级水平导航菜单，支持平滑焦点移动与无障碍键盘导航。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/navigation-menu
```

- **Registry JSON**: `/r/navigation-menu.json`
- **Import Path**: `@/components/ui/navigation-menu`
- **Exports**: `NavigationMenu`
- **Base UI Primitive**: `@base-ui/react/navigation-menu` ([Base UI Docs](https://base-ui.com/react/components/navigation-menu))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### NavigationMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `menus` | `NavMenuItem[]` | — | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `NavMenuItem`

| Property | Type | Required |
| --- | --- | --- |
| `id` | `string` | Yes |
| `label` | `string` | Yes |
| `items` | `{ title: string description: string badge?: string onClick?: () => void }[]` | No |
| `onClick` | `() => void` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-popup-open` | 导航面板展开态 |
| `data-active` | 当前激活导航链接 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import { NavigationMenu as BaseNav } from '@base-ui/react/navigation-menu'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export interface NavMenuItem {
  id: string
  label: string
  items?: {
    title: string
    description: string
    badge?: string
    onClick?: () => void
  }[]
  onClick?: () => void
}

export function NavigationMenu({
  menus,
  className,
}: {
  menus: NavMenuItem[]
  className?: string
}) {
  return (
    <BaseNav.Root className={cn('relative inline-flex', className)}>
      <BaseNav.List className="flex items-center gap-1 rounded-full bg-[#F2F3F5] p-1">
        {menus.map((menu) => (
          <BaseNav.Item key={menu.id} value={menu.id}>
            {menu.items ? (
              <>
                <BaseNav.Trigger className="group inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-[#1B1F27] select-none outline-none transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white data-popup-open:bg-white data-popup-open:shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
                  {menu.label}
                  <BaseNav.Icon className="transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-popup-open:rotate-180">
                    <CaretDown size={13} weight="bold" />
                  </BaseNav.Icon>
                </BaseNav.Trigger>
                <BaseNav.Content className="w-80">
                  <div className="grid grid-cols-1 gap-0.5">
                    {menu.items.map((sub) => (
                      <BaseNav.Link
                        key={sub.title}
                        href={`#${sub.title}`}
                        onClick={(e) => {
                          e.preventDefault()
                          sub.onClick?.()
                        }}
                        className="flex flex-col gap-0.5 rounded-control px-3 py-2 text-left transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-[#F6F7F9]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-[#1B1F27]">
                            {sub.title}
                          </span>
                          {sub.badge && (
                            <span className="rounded-full bg-[#E4E6FD] px-2 py-0.5 text-[10px] font-bold text-[#4A4FB8]">
                              {sub.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-[#6B7280]">
                          {sub.description}
                        </span>
                      </BaseNav.Link>
                    ))}
                  </div>
                </BaseNav.Content>
              </>
            ) : (
              <BaseNav.Link
                href={`#${menu.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  menu.onClick?.()
                }}
                className="inline-flex h-8 cursor-pointer items-center rounded-full px-3.5 text-[13px] font-semibold text-[#5B6170] select-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white hover:text-[#1B1F27]"
              >
                {menu.label}
              </BaseNav.Link>
            )}
          </BaseNav.Item>
        ))}
      </BaseNav.List>

      <BaseNav.Portal>
        <BaseNav.Positioner sideOffset={8} className="z-50">
          <BaseNav.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'p-1.5',
            )}
          >
            <BaseNav.Viewport />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  )
}
```
