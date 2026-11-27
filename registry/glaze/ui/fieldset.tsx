import * as React from 'react'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { cn } from 'cn'

export function Fieldset({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      className={cn(
        'flex w-full flex-col gap-4 rounded-inner bg-[#F6F7F9] p-5',
        className,
      )}
      {...props}
    />
  )
}

export function FieldsetLegend({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      className={cn('text-[15px] font-bold text-[#1B1F27]', className)}
      {...props}
    />
  )
}
