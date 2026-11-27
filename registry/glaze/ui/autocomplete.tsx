import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { cn } from 'cn'
import {
  CONTROL_SOFT,
  CONTROL_WHITE,
  PILL_CONTROL,
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export interface AutocompleteProps {
  items: string[]
  value?: string
  onValueChange?: (val: string) => void
  placeholder?: string
  surface?: 'soft' | 'white'
  className?: string
}

export function Autocomplete({
  items,
  value,
  onValueChange,
  placeholder = '输入关键字自动补全…',
  surface = 'soft',
  className,
}: AutocompleteProps) {
  return (
    <BaseAutocomplete.Root items={items} value={value} onValueChange={onValueChange}>
      <div
        className={cn(
          'relative flex h-11 w-full items-center gap-2 px-4',
          PILL_CONTROL,
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
          className,
        )}
      >
        <MagnifyingGlass size={15} className="shrink-0 text-[#8A90A0]" />
        <BaseAutocomplete.Input
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] text-[#1B1F27] outline-none placeholder:text-[#8A90A0]"
        />
      </div>

      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner sideOffset={8} className="z-50">
          <BaseAutocomplete.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'w-(--anchor-width) overflow-hidden p-1.5',
            )}
          >
            <BaseAutocomplete.Empty className="px-3 py-4 text-center text-[13px] text-[#8A90A0] empty:hidden">
              无匹配建议
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className="max-h-55 overflow-y-auto">
              {(item: string) => (
                <BaseAutocomplete.Item
                  key={item}
                  value={item}
                  className="cursor-pointer rounded-[12px] px-3 py-2 text-[14px] text-[#1B1F27] select-none outline-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-highlighted:bg-[#F2F3F5]"
                >
                  {item}
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  )
}
