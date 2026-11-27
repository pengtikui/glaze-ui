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
