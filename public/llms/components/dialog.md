# Dialog (模态对话框)

> 28px 圆角模态对话框，采用 200ms 纯 CSS 进场与 150ms 退场，禁用昂贵 backdrop-blur 确保高刷流畅。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/dialog
```

- **Registry JSON**: `/r/dialog.json`
- **Import Path**: `@/components/ui/dialog`
- **Exports**: `DialogClose`, `Dialog`
- **Base UI Primitive**: `@base-ui/react/dialog` ([Base UI Docs](https://base-ui.com/react/components/dialog))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### DialogClose

Inherits standard Base UI / HTML element props.

### Dialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open?` | `boolean` | — | — |
| `onOpenChange?` | `(open: boolean) => void` | — | — |
| `trigger?` | `React.ReactElement` | — | — |
| `title` | `React.ReactNode` | — | — |
| `description?` | `React.ReactNode` | — | — |
| `children?` | `React.ReactNode` | — | — |
| `footer?` | `React.ReactNode` | — | — |
| `maxWidth?` | `string` | `'480px'` | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 对话框已打开 |
| `data-starting-style` | 进场动画起点 |
| `data-ending-style` | 退场动画终点 |

### CSS Variables

- `--glaze-dur-base`
- `--glaze-dur-modal-exit`
- `--radius-tile`

## Source Code

```tsx
import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from '@phosphor-icons/react'
import { cn } from 'cn'
import { PRESS_CLASS } from '@/lib/motion'

export const DialogClose = BaseDialog.Close

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactElement
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: string
}

export function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  maxWidth = '480px',
}: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="glaze-dialog-backdrop fixed inset-0 z-50 bg-[#1B1F27]/38" />
        <BaseDialog.Popup
          className="glaze-dialog-popup fixed top-1/2 left-1/2 z-50 w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-tile bg-white p-6 shadow-[0_24px_64px_rgba(18,58,92,0.18)] outline-none"
          style={{ maxWidth }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <BaseDialog.Title className="font-glaze-display text-[20px] font-extrabold text-[#1B1F27]">
                {title}
              </BaseDialog.Title>
              {description && (
                <BaseDialog.Description className="text-[14px] text-[#6B7280]">
                  {description}
                </BaseDialog.Description>
              )}
            </div>
            <BaseDialog.Close
              aria-label="关闭"
              className={cn(
                'inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
                PRESS_CLASS,
              )}
            >
              <X size={16} weight="bold" />
            </BaseDialog.Close>
          </div>
          {children && <div className="mt-4">{children}</div>}
          {footer && (
            <div className="mt-6 flex items-center justify-end gap-2">{footer}</div>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
```
