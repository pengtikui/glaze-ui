import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'
import { PRESS_CLASS, useIsPopupTrigger } from '@/lib/motion'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'soft'
  | 'danger'
  | 'dark-surface'
  | 'dark-on-coral'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, 'className' | 'style'> {
  variant?: ButtonVariant
  size?: ButtonSize
  hue?: Hue
  /** Enable scale(0.97) tactile press feedback. Automatically disabled when used as a popup trigger. */
  pressScale?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      hue = 'periwinkle',
      pressScale = true,
      className,
      style,
      disabled,
      ...props
    },
    ref,
  ) {
    const isPopupTrigger = useIsPopupTrigger()
    const enablePressScale = !disabled && pressScale && !isPopupTrigger

    const palette = HUE_PALETTES[hue]
    const softStyle: React.CSSProperties | undefined =
      variant === 'soft'
        ? { backgroundColor: palette[100], color: palette[700], ...style }
        : style

    return (
      <BaseButton
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none outline-none',
          enablePressScale
            ? PRESS_CLASS
            : 'transition-[background-color,color,filter,box-shadow] duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
          'focus-visible:ring-2 focus-visible:ring-[#7B80EA] focus-visible:ring-offset-2',
          'data-disabled:pointer-events-none data-disabled:opacity-45',
          size === 'sm' && 'h-8 px-3.5 text-[12px]',
          size === 'md' && 'h-11 px-5 text-[14px]',
          size === 'lg' && 'h-12 px-6 text-[15px]',
          size === 'icon' && 'h-10 w-10 p-0',
          variant === 'primary' &&
            'bg-[#1B1F27] text-white hover:bg-[#2B313D] data-popup-open:bg-[#2B313D]',
          variant === 'secondary' &&
            'bg-[#F2F3F5] text-[#1B1F27] hover:bg-[#E8EBF0] data-popup-open:bg-[#E8EBF0]',
          variant === 'ghost' &&
            'bg-transparent text-[#5B6170] hover:bg-[#F2F3F5] hover:text-[#1B1F27] data-popup-open:bg-[#F2F3F5] data-popup-open:text-[#1B1F27]',
          variant === 'soft' &&
            'hover:brightness-[0.96] data-popup-open:brightness-[0.96]',
          variant === 'danger' &&
            'bg-[#FDE5DC] text-[#A6360F] hover:bg-[#F7B39C]/70 data-popup-open:bg-[#F7B39C]/70',
          variant === 'dark-surface' &&
            'bg-white/15 text-white hover:bg-white/25 data-popup-open:bg-white/25',
          variant === 'dark-on-coral' &&
            'bg-[#5E1E0A] text-white hover:bg-[#491606] data-popup-open:bg-[#491606]',
          className,
        )}
        style={softStyle}
        {...props}
      />
    )
  },
)
