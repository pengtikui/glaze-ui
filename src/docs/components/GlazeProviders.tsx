import * as React from 'react'
import { MotionConfig } from 'motion/react'
import { IconContext } from '@phosphor-icons/react'
import { ToastProvider } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MOTION_SPRING } from '@/lib/motion'
import { RouterProvider } from '@/docs/router'

export interface GlazeProvidersProps {
  children: React.ReactNode
  pathname?: string
}

export function GlazeProviders({ children, pathname }: GlazeProvidersProps) {
  return (
    <MotionConfig reducedMotion="user" transition={MOTION_SPRING}>
      <IconContext.Provider value={{ weight: 'regular' }}>
        <TooltipProvider delay={160}>
          <ToastProvider>
            <RouterProvider pathname={pathname}>{children}</RouterProvider>
          </ToastProvider>
        </TooltipProvider>
      </IconContext.Provider>
    </MotionConfig>
  )
}
