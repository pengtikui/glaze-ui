# Combobox (可搜索组合框)

> 支持实时过滤与自定义元信息的单选 Combobox 与多选胶囊标签 MultiCombobox。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/combobox
```

- **Registry JSON**: `/r/combobox.json`
- **Import Path**: `@/components/ui/combobox`
- **Exports**: `Combobox`, `MultiCombobox`
- **Base UI Primitive**: `@base-ui/react/combobox` ([Base UI Docs](https://base-ui.com/react/components/combobox))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### Combobox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ComboboxOption[]` | — | — |
| `value?` | `ComboboxOption \| null` | — | — |
| `onValueChange?` | `(val: ComboboxOption \| null) => void` | — | — |
| `placeholder?` | `string` | `'搜索并选择…'` | — |
| `emptyText?` | `string` | `'没有匹配的结果'` | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `className?` | `string` | — | — |

### MultiCombobox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ComboboxOption[]` | — | — |
| `value` | `ComboboxOption[]` | — | — |
| `onValueChange` | `(val: ComboboxOption[]) => void` | — | — |
| `placeholder?` | `string` | `'添加标签…'` | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `ComboboxOption`

| Property | Type | Required |
| --- | --- | --- |
| `value` | `string` | Yes |
| `label` | `string` | Yes |
| `meta` | `string` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-popup-open` | 选项面板展开态 |
| `data-highlighted` | 高亮选项 |
| `data-selected` | 已选选项 |

### CSS Variables

- `--transform-origin`
- `--anchor-width`

## Source Code

```tsx
import * as React from 'react'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { CaretDown, Check, MagnifyingGlass, X } from '@phosphor-icons/react'
import { cn } from 'cn'
import {
  CONTROL_SOFT,
  CONTROL_WHITE,
  PILL_CONTROL,
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export interface ComboboxOption {
  value: string
  label: string
  meta?: string
}

export function Combobox({
  items,
  value,
  onValueChange,
  placeholder = '搜索并选择…',
  emptyText = '没有匹配的结果',
  surface = 'soft',
  className,
}: {
  items: ComboboxOption[]
  value?: ComboboxOption | null
  onValueChange?: (val: ComboboxOption | null) => void
  placeholder?: string
  emptyText?: string
  surface?: 'soft' | 'white'
  className?: string
}) {
  return (
    <BaseCombobox.Root
      items={items}
      value={value}
      onValueChange={(v) => onValueChange?.(v ?? null)}
      itemToStringLabel={(item) => item?.label ?? ''}
      isItemEqualToValue={(a, b) => a.value === b.value}
    >
      <div
        className={cn(
          'relative flex h-11 w-full items-center gap-2 px-4',
          PILL_CONTROL,
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
          className,
        )}
      >
        <MagnifyingGlass size={15} className="shrink-0 text-[#8A90A0]" />
        <BaseCombobox.Input
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] text-[#1B1F27] outline-none placeholder:text-[#8A90A0]"
        />
        <BaseCombobox.Clear
          aria-label="清空"
          className="inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
        >
          <X size={13} weight="bold" />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger
          aria-label="展开列表"
          className="inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:text-[#1B1F27]"
        >
          <CaretDown size={14} weight="bold" />
        </BaseCombobox.Trigger>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={8} className="z-50">
          <BaseCombobox.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'w-(--anchor-width) overflow-hidden p-1.5',
            )}
          >
            <BaseCombobox.Empty className="px-3 py-5 text-center text-[13px] text-[#8A90A0] empty:hidden">
              {emptyText}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="max-h-60 overflow-y-auto">
              {(item: ComboboxOption) => (
                <BaseCombobox.Item
                  key={item.value}
                  value={item}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-2 rounded-[12px] px-3 py-2 text-[14px] text-[#1B1F27] select-none outline-none',
                    'transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
                    'data-highlighted:bg-[#F2F3F5]',
                    'data-selected:bg-[#E4E6FD]/70 data-selected:font-semibold data-selected:text-[#262B7A]',
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate">{item.label}</span>
                    {item.meta && (
                      <span className="text-[12px] font-normal text-[#8A90A0]">
                        {item.meta}
                      </span>
                    )}
                  </div>
                  <BaseCombobox.ItemIndicator className="shrink-0 text-[#4A4FB8]">
                    <Check size={15} weight="bold" />
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  )
}

export function MultiCombobox({
  items,
  value,
  onValueChange,
  placeholder = '添加标签…',
  surface = 'soft',
  className,
}: {
  items: ComboboxOption[]
  value: ComboboxOption[]
  onValueChange: (val: ComboboxOption[]) => void
  placeholder?: string
  surface?: 'soft' | 'white'
  className?: string
}) {
  const anchorRef = React.useRef<HTMLDivElement>(null)

  return (
    <BaseCombobox.Root
      multiple
      items={items}
      value={value}
      onValueChange={onValueChange}
      itemToStringLabel={(item) => item?.label ?? ''}
      isItemEqualToValue={(a, b) => a.value === b.value}
    >
      <BaseCombobox.Chips
        ref={anchorRef}
        className={cn(
          'flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-[22px] border-0 px-3 py-1.5 outline-none transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
          className,
        )}
      >
        <BaseCombobox.Value>
          {(selected: ComboboxOption[]) => (
            <>
              {selected.map((item) => (
                <BaseCombobox.Chip
                  key={item.value}
                  className="inline-flex items-center gap-1 rounded-full bg-[#E4E6FD] py-1 pr-1.5 pl-2.5 text-[12px] font-semibold text-[#262B7A]"
                >
                  {item.label}
                  <BaseCombobox.ChipRemove
                    aria-label={`移除 ${item.label}`}
                    className="inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-[#B5BAF6]/60"
                  >
                    <X size={10} weight="bold" />
                  </BaseCombobox.ChipRemove>
                </BaseCombobox.Chip>
              ))}
              <BaseCombobox.Input
                placeholder={selected.length === 0 ? placeholder : ''}
                className="min-w-20 flex-1 bg-transparent px-1 text-[14px] text-[#1B1F27] outline-none placeholder:text-[#8A90A0]"
              />
            </>
          )}
        </BaseCombobox.Value>
      </BaseCombobox.Chips>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner anchor={anchorRef} sideOffset={8} className="z-50">
          <BaseCombobox.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'w-(--anchor-width) overflow-hidden p-1.5',
            )}
          >
            <BaseCombobox.Empty className="px-3 py-4 text-center text-[13px] text-[#8A90A0] empty:hidden">
              无匹配项
            </BaseCombobox.Empty>
            <BaseCombobox.List className="max-h-55 overflow-y-auto">
              {(item: ComboboxOption) => (
                <BaseCombobox.Item
                  key={item.value}
                  value={item}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-[12px] px-3 py-2 text-[14px] text-[#1B1F27] select-none outline-none',
                    'transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
                    'data-highlighted:bg-[#F2F3F5]',
                    'data-selected:bg-[#E4E6FD]/70 data-selected:font-semibold data-selected:text-[#262B7A]',
                  )}
                >
                  <span>{item.label}</span>
                  <BaseCombobox.ItemIndicator className="text-[#4A4FB8]">
                    <Check size={15} weight="bold" />
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  )
}
```
