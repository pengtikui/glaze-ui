import * as React from 'react'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { cn } from 'cn'

export interface OTPFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Root>, 'className' | 'length'> {
  length?: number
  separatorAt?: number
  className?: string
}

export function OTPField({
  length = 6,
  separatorAt = 3,
  className,
  ...props
}: OTPFieldProps) {
  return (
    <BaseOTPField.Root
      length={length}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <BaseOTPField.Input
            className={cn(
              'h-12 w-11 rounded-2xl border-0 bg-[#F6F7F9] text-center font-glaze-display text-[18px] font-extrabold text-[#1B1F27] tabular-nums outline-none',
              'transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
              'hover:bg-[#EEF0F4] focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#7B80EA]',
              'data-filled:bg-[#E4E6FD]/60 data-filled:text-[#262B7A]',
              'data-disabled:opacity-45',
            )}
          />
          {separatorAt > 0 && index === separatorAt - 1 && index < length - 1 && (
            <BaseOTPField.Separator className="px-0.5 text-[16px] font-bold text-[#CDD3DD]">
              ·
            </BaseOTPField.Separator>
          )}
        </React.Fragment>
      ))}
    </BaseOTPField.Root>
  )
}
