# PreviewCard (悬停预览卡)

> 悬停链接或实体标识时展示的富媒体摘要卡片，内置防误触延迟与平滑进退场。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/preview-card
```

- **Registry JSON**: `/r/preview-card.json`
- **Import Path**: `@/components/ui/preview-card`
- **Exports**: `PreviewCard`
- **Base UI Primitive**: `@base-ui/react/preview-card` ([Base UI Docs](https://base-ui.com/react/components/preview-card))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### PreviewCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `React.ReactElement` | — | — |
| `children` | `React.ReactNode` | — | — |
| `side?` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 预览卡处于展开态 |
| `data-starting-style` | 进场起点 |
| `data-ending-style` | 退场终点 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import * as React from 'react'
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
  PopupTriggerScope,
} from '@/lib/motion'

export interface PreviewCardProps {
  trigger: React.ReactElement
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export function PreviewCard({
  trigger,
  children,
  side = 'top',
  className,
}: PreviewCardProps) {
  return (
    <BasePreviewCard.Root>
      <PopupTriggerScope>
        <BasePreviewCard.Trigger delay={240} closeDelay={120} render={trigger} />
      </PopupTriggerScope>
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner side={side} sideOffset={8} className="z-50">
          <BasePreviewCard.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'w-75 p-5',
              className,
            )}
          >
            {children}
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  )
}
```
