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
