import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Check, Minus } from '@phosphor-icons/react'
import { cn } from 'cn'

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, 'className'> {
  label?: React.ReactNode
  description?: string
  className?: string
}

export function Checkbox({
  label,
  description,
  indeterminate,
  className,
  ...props
}: CheckboxProps) {
  const control = (
    <BaseCheckbox.Root
      indeterminate={indeterminate}
      className={cn(
        'relative box-border inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border-[1.5px] p-0 outline-none',
        'transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.2,0,0,1)] active:[transform:scale(0.95)]',
        'border-[#CDD3DD] bg-white hover:border-[#8A90A0]',
        'data-checked:border-[#1B1F27] data-checked:bg-[#1B1F27] data-checked:text-white',
        'data-indeterminate:border-[#7B80EA] data-indeterminate:bg-[#7B80EA] data-indeterminate:text-white',
        'focus-visible:ring-2 focus-visible:ring-[#7B80EA] focus-visible:ring-offset-2',
        'data-disabled:pointer-events-none data-disabled:opacity-45',
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        render={(indicatorProps, state) => (
          <span
            {...indicatorProps}
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-ending-style:[transform:scale(0.65)] data-ending-style:opacity-0 data-starting-style:[transform:scale(0.65)] data-starting-style:opacity-0"
          >
            {state.indeterminate ? (
              <Minus size={12} weight="bold" />
            ) : (
              <Check size={12} weight="bold" />
            )}
          </span>
        )}
      />
    </BaseCheckbox.Root>
  )

  if (!label) return control

  return (
    <label
      className={cn(
        'inline-flex cursor-pointer gap-2.5 select-none',
        description ? 'items-start' : 'items-center',
      )}
    >
      <span className="inline-flex h-5 shrink-0 items-center">{control}</span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[14px] leading-5 font-medium text-[#1B1F27]">
          {label}
        </span>
        {description && (
          <span className="text-[12px] leading-4 text-[#6B7280]">{description}</span>
        )}
      </span>
    </label>
  )
}
