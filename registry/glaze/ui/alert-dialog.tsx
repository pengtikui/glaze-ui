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
