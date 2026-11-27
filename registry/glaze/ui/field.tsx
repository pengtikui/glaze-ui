import * as React from 'react'
import { Field as BaseField } from '@base-ui/react/field'
import { cn } from 'cn'

export function Field({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      className={cn('flex w-full flex-col gap-1.5', className)}
      {...props}
    />
  )
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={cn('text-[13px] font-semibold text-[#1B1F27]', className)}
      {...props}
    />
  )
}

export function FieldDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      className={cn('text-[12px] text-[#6B7280]', className)}
      {...props}
    />
  )
}

export function FieldError({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={cn('text-[12px] font-medium text-[#A6360F]', className)}
      {...props}
    />
  )
}

export const FieldControl = BaseField.Control
