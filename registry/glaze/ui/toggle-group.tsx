import * as React from 'react'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from 'cn'

export function ToggleGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-[#F2F3F5] p-1',
        className,
      )}
      {...props}
    />
  )
}
