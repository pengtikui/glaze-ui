# Tooltip (文字提示)

> 轻量化深色浮层提示，配合 TooltipProvider 实现多提示间零延迟连续切换。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/tooltip
```

- **Registry JSON**: `/r/tooltip.json`
- **Import Path**: `@/components/ui/tooltip`
- **Exports**: `TooltipProvider`, `Tooltip`
- **Base UI Primitive**: `@base-ui/react/tooltip` ([Base UI Docs](https://base-ui.com/react/components/tooltip))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### TooltipProvider

Inherits standard Base UI / HTML element props.

### Tooltip

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `React.ReactNode` | — | — |
| `children` | `React.ReactElement` | — | — |
| `side?` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | — |
| `delay?` | `number` | `180` | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 提示可见 |
| `data-instant` | 连续悬停切换时跳过延迟 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import * as React from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cn } from 'cn'
import { POPUP_TRANSITION_CLASS, PopupTriggerScope } from '@/lib/motion'

export const TooltipProvider = BaseTooltip.Provider

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({
  content,
  children,
  side = 'top',
  delay = 180,
}: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <PopupTriggerScope>
        <BaseTooltip.Trigger delay={delay} render={children} />
      </PopupTriggerScope>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={8} className="z-50">
          <BaseTooltip.Popup
            className={cn(
              POPUP_TRANSITION_CLASS,
              'rounded-[12px] bg-[#1B1F27] px-3 py-1.5 text-[12px] font-medium text-white shadow-[0_8px_24px_rgba(27,31,39,0.2)]',
            )}
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}
```
