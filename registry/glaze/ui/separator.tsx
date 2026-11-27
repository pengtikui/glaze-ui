import * as React from 'react'
import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cn } from 'cn'

export function Separator({
  orientation = 'horizontal',
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        'shrink-0 bg-[#E8EBF0]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}
