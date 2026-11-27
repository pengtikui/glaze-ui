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
