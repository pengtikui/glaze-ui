import * as React from 'react'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { X } from '@phosphor-icons/react'
import { cn } from 'cn'
import { PRESS_CLASS } from '@/lib/motion'

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactElement
  title: React.ReactNode
  description?: React.ReactNode
  side?: 'right' | 'bottom'
  children?: React.ReactNode
  footer?: React.ReactNode
}

export function Drawer({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  side = 'right',
  children,
  footer,
}: DrawerProps) {
  const isRight = side === 'right'
  return (
    <BaseDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection={isRight ? 'right' : 'down'}
    >
      {trigger && <BaseDrawer.Trigger render={trigger} />}
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="glaze-drawer-backdrop fixed inset-0 z-50 bg-[#1B1F27]/36" />
        <BaseDrawer.Viewport className="fixed inset-0 z-50 flex">
          <BaseDrawer.Popup
            data-side={side}
            className={cn(
              'glaze-drawer-popup fixed flex flex-col bg-white shadow-[0_24px_64px_rgba(18,58,92,0.18)] outline-none',
              isRight
                ? 'top-3 right-3 bottom-3 w-[min(420px,calc(100vw-24px))] rounded-tile'
                : 'right-3 bottom-3 left-3 mx-auto max-h-[82vh] max-w-160 rounded-tile',
            )}
          >
            {!isRight && (
              <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-[#E8EBF0]" />
            )}
            <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-4">
              <div className="flex flex-col gap-1">
                <BaseDrawer.Title className="font-glaze-display text-[20px] font-extrabold text-[#1B1F27]">
                  {title}
                </BaseDrawer.Title>
                {description && (
                  <BaseDrawer.Description className="text-[13px] text-[#6B7280]">
                    {description}
                  </BaseDrawer.Description>
                )}
              </div>
              <BaseDrawer.Close
                aria-label="关闭抽屉"
                className={cn(
                  'inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
                  PRESS_CLASS,
                )}
              >
                <X size={16} weight="bold" />
              </BaseDrawer.Close>
            </div>
            <BaseDrawer.Content className="flex-1 overflow-y-auto px-6 pb-6">
              {children}
            </BaseDrawer.Content>
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-[#EEF0F3] px-6 py-4">
                {footer}
              </div>
            )}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  )
}
