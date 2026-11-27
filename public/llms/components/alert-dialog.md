# AlertDialog (高风险确认框)

> 用于删除、重置等不可逆操作的强制确认对话框，禁用点击遮罩意外关闭。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/alert-dialog
```

- **Registry JSON**: `/r/alert-dialog.json`
- **Import Path**: `@/components/ui/alert-dialog`
- **Exports**: `AlertDialog`
- **Base UI Primitive**: `@base-ui/react/alert-dialog` ([Base UI Docs](https://base-ui.com/react/components/alert-dialog))
- **NPM Dependencies**: `@base-ui/react`
- **Registry Dependencies**: `@glaze/button`, `@glaze/style`

## API Reference

### AlertDialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger?` | `React.ReactElement` | — | — |
| `open?` | `boolean` | — | — |
| `onOpenChange?` | `(open: boolean) => void` | — | — |
| `title` | `string` | — | — |
| `description` | `string` | — | — |
| `confirmLabel?` | `string` | `'确认执行'` | — |
| `cancelLabel?` | `string` | `'取消'` | — |
| `danger?` | `boolean` | `true` | — |
| `onConfirm?` | `() => void` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-open` | 确认框已打开 |
| `data-starting-style` | 进场动画起点 |
| `data-ending-style` | 退场动画终点 |

### CSS Variables

- `--glaze-dur-base`
- `--glaze-dur-modal-exit`

## Source Code

```tsx
import * as React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { Button } from '@/components/ui/button'

export interface AlertDialogProps {
  trigger?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm?: () => void
}

export function AlertDialog({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = '确认执行',
  cancelLabel = '取消',
  danger = true,
  onConfirm,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <BaseAlertDialog.Trigger render={trigger} />}
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="glaze-dialog-backdrop fixed inset-0 z-50 bg-[#1B1F27]/38" />
        <BaseAlertDialog.Popup className="glaze-dialog-popup fixed top-1/2 left-1/2 z-50 w-[calc(100vw-32px)] max-w-105 -translate-x-1/2 -translate-y-1/2 rounded-tile bg-white p-6 shadow-[0_24px_64px_rgba(18,58,92,0.18)] outline-none">
          <BaseAlertDialog.Title className="font-glaze-display text-[19px] font-extrabold text-[#1B1F27]">
            {title}
          </BaseAlertDialog.Title>
          <BaseAlertDialog.Description className="mt-2 text-[14px] leading-relaxed text-[#5B6170]">
            {description}
          </BaseAlertDialog.Description>
          <div className="mt-6 flex items-center justify-end gap-2">
            <BaseAlertDialog.Close
              render={<Button variant="secondary">{cancelLabel}</Button>}
            />
            <BaseAlertDialog.Close
              render={
                <Button
                  variant={danger ? 'danger' : 'primary'}
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
              }
            />
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  )
}
```
