import * as React from 'react'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from 'cn'

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      className={cn('flex flex-col gap-2.5', className)}
      {...props}
    />
  )
}
