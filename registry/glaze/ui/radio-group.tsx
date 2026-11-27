import * as React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cn } from 'cn'

export function RadioGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      className={cn('flex flex-col gap-2.5', className)}
      {...props}
    />
  )
}
