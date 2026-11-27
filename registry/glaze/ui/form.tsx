import * as React from 'react'
import { Form as BaseForm } from '@base-ui/react/form'
import { cn } from 'cn'

export function Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseForm>) {
  return <BaseForm className={cn('flex w-full flex-col gap-4', className)} {...props} />
}
