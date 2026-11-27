import * as React from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, 'className'> {
  hue?: Hue | 'ink'
  label?: string
  showValue?: boolean
  unit?: string
  className?: string
}

export function Slider({
  hue = 'periwinkle',
  label,
  showValue = true,
  unit = '',
  className,
  ...props
}: SliderProps) {
  const accent = hue === 'ink' ? '#1B1F27' : HUE_PALETTES[hue][500]
  const isRange = Array.isArray(props.value ?? props.defaultValue)

  return (
    <BaseSlider.Root className={cn('flex w-full flex-col gap-2', className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-[13px]">
          {label ? (
            <span className="font-semibold text-[#1B1F27]">{label}</span>
          ) : (
            <span />
          )}
          {showValue && (
            <BaseSlider.Value className="font-glaze-display font-bold text-[#1B1F27] tabular-nums">
              {(formattedValues) =>
                formattedValues.length > 1
                  ? `${formattedValues[0]}${unit} – ${formattedValues[1]}${unit}`
                  : `${formattedValues[0]}${unit}`
              }
            </BaseSlider.Value>
          )}
        </div>
      )}
      <BaseSlider.Control className="relative flex h-6 w-full touch-none items-center select-none">
        <BaseSlider.Track className="relative h-2 w-full rounded-full bg-[#E8EBF0]">
          <BaseSlider.Indicator
            className="h-full rounded-full"
            style={{ backgroundColor: accent }}
          />
          {isRange ? (
            <>
              <BaseSlider.Thumb
                index={0}
                className="h-5 w-5 cursor-grab rounded-full border-2 border-white bg-[#1B1F27] shadow-[0_2px_6px_rgba(16,24,40,0.22)] outline-none transition-[scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-110 active:scale-95 active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#7B80EA]"
              />
              <BaseSlider.Thumb
                index={1}
                className="h-5 w-5 cursor-grab rounded-full border-2 border-white bg-[#1B1F27] shadow-[0_2px_6px_rgba(16,24,40,0.22)] outline-none transition-[scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-110 active:scale-95 active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#7B80EA]"
              />
            </>
          ) : (
            <BaseSlider.Thumb className="h-5 w-5 cursor-grab rounded-full border-2 border-white bg-[#1B1F27] shadow-[0_2px_6px_rgba(16,24,40,0.22)] outline-none transition-[scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-110 active:scale-95 active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#7B80EA]" />
          )}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
