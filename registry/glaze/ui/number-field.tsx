import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { Minus, Plus } from '@phosphor-icons/react'
import { cn } from 'cn'
import { CONTROL_SOFT, CONTROL_WHITE, PILL_CONTROL, PRESS_CLASS } from '@/lib/motion'

export interface NumberFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>, 'className'> {
  label?: string
  unit?: string
  surface?: 'soft' | 'white'
  className?: string
}

export function NumberField({
  label,
  unit,
  surface = 'soft',
  className,
  ...props
}: NumberFieldProps) {
  const id = React.useId()
  return (
    <BaseNumberField.Root id={id} className={cn('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <BaseNumberField.ScrubArea className="cursor-ew-resize select-none">
          <label
            htmlFor={id}
            className="text-[13px] font-semibold text-[#1B1F27]"
          >
            {label}
          </label>
        </BaseNumberField.ScrubArea>
      )}
      <BaseNumberField.Group
        className={cn(
          'inline-flex h-11 items-center p-1',
          PILL_CONTROL,
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
        )}
      >
        <BaseNumberField.Decrement
          className={cn(
            'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.06)] hover:bg-[#F2F3F5] disabled:opacity-40',
            PRESS_CLASS,
          )}
        >
          <Minus size={14} weight="bold" />
        </BaseNumberField.Decrement>
        <div className="flex flex-1 items-center justify-center gap-1 px-3">
          <BaseNumberField.Input className="w-16 bg-transparent text-center font-glaze-display text-[15px] font-bold text-[#1B1F27] tabular-nums outline-none" />
          {unit && (
            <span className="text-[12px] font-medium text-[#6B7280]">{unit}</span>
          )}
        </div>
        <BaseNumberField.Increment
          className={cn(
            'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.06)] hover:bg-[#F2F3F5] disabled:opacity-40',
            PRESS_CLASS,
          )}
        >
          <Plus size={14} weight="bold" />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}
