# Popover (气泡卡片)

> 点击触发的交互式浮层面板，可包含表单、筛选器与快捷操作。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/popover
```

- **Registry JSON**: `/r/popover.json`
- **Import Path**: `@/components/ui/popover`
- **Exports**: `Popover`
- **Base UI Primitive**: `@base-ui/react/popover` ([Base UI Docs](https://base-ui.com/react/components/popover))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### Popover

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | — | — |
| `title?` | `string` | — | — |
| `description?` | `string` | — | — |
| `children?` | `React.ReactNode` | — | — |
| `side?` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | — |
| `align?` | `'start' \| 'center' \| 'end'` | `'center'` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 气泡处于打开态 |
| `data-side` | 实际弹出方向（top | bottom | left | right） |
| `data-starting-style` | 进场起点 |
| `data-ending-style` | 退场终点 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import * as React from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
  PopupTriggerScope,
} from '@/lib/motion'

export interface PopoverProps {
  trigger: React.ReactElement
  title?: string
  description?: string
  children?: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function Popover({
  trigger,
  title,
  description,
  children,
  side = 'bottom',
  align = 'center',
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <PopupTriggerScope>
        <BasePopover.Trigger render={trigger} />
      </PopupTriggerScope>
      <BasePopover.Portal>
        <BasePopover.Positioner side={side} align={align} sideOffset={8} className="z-50">
          <BasePopover.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'w-75 p-5',
              className,
            )}
          >
            {title && (
              <BasePopover.Title className="font-glaze-display text-[15px] font-bold text-[#1B1F27]">
                {title}
              </BasePopover.Title>
            )}
            {description && (
              <BasePopover.Description className="mt-1 text-[13px] leading-relaxed text-[#6B7280]">
                {description}
              </BasePopover.Description>
            )}
            {children && <div className={title || description ? 'mt-3.5' : ''}>{children}</div>}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}
```
