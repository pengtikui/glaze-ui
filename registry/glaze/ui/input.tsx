import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cn } from 'cn'
import { CONTROL_SOFT, CONTROL_WHITE, PILL_CONTROL } from '@/lib/motion'

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, 'className' | 'size'> {
  leadingIcon?: React.ReactNode
  trailingElement?: React.ReactNode
  surface?: 'soft' | 'white'
  inputSize?: 'sm' | 'md'
  className?: string
  wrapperClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      leadingIcon,
      trailingElement,
      surface = 'soft',
      inputSize = 'md',
      className,
      wrapperClassName,
      ...props
    },
    ref,
  ) {
    const heightClass = inputSize === 'sm' ? 'h-9 text-[13px]' : 'h-11 text-[14px]'
    const surfaceClass = surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT

    if (leadingIcon || trailingElement) {
      return (
        <div
          className={cn(
            'relative flex w-full items-center gap-2 px-4',
            heightClass,
            PILL_CONTROL,
            surfaceClass,
            wrapperClassName,
          )}
        >
          {leadingIcon && (
            <span className="shrink-0 text-[#8A90A0]">{leadingIcon}</span>
          )}
          <BaseInput
            ref={ref}
            className={cn(
              'h-full w-full bg-transparent text-[#1B1F27] outline-none placeholder:text-[#8A90A0] disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            {...props}
          />
          {trailingElement && <div className="shrink-0">{trailingElement}</div>}
        </div>
      )
    }

    return (
      <BaseInput
        ref={ref}
        className={cn(
          'w-full px-4 text-[#1B1F27] placeholder:text-[#8A90A0]',
          heightClass,
          PILL_CONTROL,
          surfaceClass,
          'data-invalid:ring-2 data-invalid:ring-inset data-invalid:ring-[#E5603B]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
