import * as React from 'react'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cn } from 'cn'

export function ScrollArea({
  className,
  viewportClassName,
  children,
}: {
  className?: string
  viewportClassName?: string
  children: React.ReactNode
}) {
  return (
    <BaseScrollArea.Root className={cn('relative overflow-hidden', className)}>
      <BaseScrollArea.Viewport
        className={cn(
          'h-full w-full overscroll-contain rounded-[inherit] outline-none',
          viewportClassName,
        )}
      >
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        className="m-1 flex w-1.5 justify-center rounded-full bg-transparent opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-hovering:opacity-100 data-scrolling:opacity-100"
      >
        <BaseScrollArea.Thumb className="w-full rounded-full bg-[#CDD3DD]" />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  )
}
