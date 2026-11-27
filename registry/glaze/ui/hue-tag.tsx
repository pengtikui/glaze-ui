import * as React from 'react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface HueTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  hue?: Hue
  tone?: 'soft' | 'solid' | 'neutral'
  size?: 'xs' | 'sm' | 'md'
}

export function HueTag({
  hue = 'periwinkle',
  tone = 'soft',
  size = 'md',
  className,
  style,
  children,
  ...props
}: HueTagProps) {
  const palette = HUE_PALETTES[hue]
  const colors =
    tone === 'neutral'
      ? { backgroundColor: '#F2F3F5', color: '#5B6170' }
      : tone === 'solid'
        ? { backgroundColor: palette[500], color: '#FFFFFF' }
        : { backgroundColor: palette[100], color: palette[700] }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap select-none',
        size === 'xs' && 'px-2 py-0.5 text-[10px]',
        size === 'sm' && 'px-2.5 py-0.5 text-[11px]',
        size === 'md' && 'px-3 py-1 text-[12px]',
        className,
      )}
      style={{ ...colors, ...style }}
      {...props}
    >
      {children}
    </span>
  )
}
