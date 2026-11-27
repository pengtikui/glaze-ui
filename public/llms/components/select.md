# Select (下拉选择器)

> 全圆胶囊触发器 + 20px 圆角浮层，支持选项分组、副标题说明与快速键盘检索。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/select
```

- **Registry JSON**: `/r/select.json`
- **Import Path**: `@/components/ui/select`
- **Exports**: `Select`
- **Base UI Primitive**: `@base-ui/react/select` ([Base UI Docs](https://base-ui.com/react/components/select))
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### Select

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | — | — |
| `value?` | `string` | — | — |
| `defaultValue?` | `string` | — | — |
| `onValueChange?` | `(value: string) => void` | — | — |
| `placeholder?` | `string` | `'请选择'` | — |
| `disabled?` | `boolean` | `false` | — |
| `size?` | `'sm' \| 'md'` | `'md'` | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `SelectOption`

| Property | Type | Required |
| --- | --- | --- |
| `value` | `string` | Yes |
| `label` | `string` | Yes |
| `description` | `string` | No |
| `group` | `string` | No |
| `disabled` | `boolean` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-popup-open` | 下拉列表处于展开状态 |
| `data-highlighted` | 当前键盘/悬停高亮选项 |
| `data-selected` | 当前已选中选项 |
| `data-starting-style` | 浮层进场初始帧 |
| `data-ending-style` | 浮层退场结束帧 |

### CSS Variables

- `--transform-origin`
- `--anchor-width`

## Source Code

```tsx
import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { CaretUpDown, Check } from '@phosphor-icons/react'
import { cn } from 'cn'
import {
  CONTROL_SOFT,
  CONTROL_WHITE,
  PILL_CONTROL,
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export interface SelectOption {
  value: string
  label: string
  description?: string
  group?: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  surface?: 'soft' | 'white'
  className?: string
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = '请选择',
  disabled = false,
  size = 'md',
  surface = 'soft',
  className,
}: SelectProps) {
  const hasGroups = options.some((o) => o.group)
  const grouped = React.useMemo(() => {
    if (!hasGroups) return null
    const map = new Map<string, SelectOption[]>()
    for (const opt of options) {
      const key = opt.group ?? '其他'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(opt)
    }
    return Array.from(map.entries())
  }, [options, hasGroups])

  const labelByValue = React.useMemo(() => {
    const m = new Map<string, string>()
    for (const o of options) m.set(o.value, o.label)
    return m
  }, [options])

  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(v) => {
        if (v !== null && onValueChange) onValueChange(v)
      }}
    >
      <BaseSelect.Trigger
        className={cn(
          'inline-flex w-full cursor-pointer items-center justify-between gap-2 px-4 text-[#1B1F27]',
          PILL_CONTROL,
          surface === 'white' ? CONTROL_WHITE : CONTROL_SOFT,
          size === 'sm' ? 'h-9 text-[13px]' : 'h-11 text-[14px]',
          'data-disabled:cursor-not-allowed data-disabled:opacity-45',
          className,
        )}
      >
        <BaseSelect.Value className="truncate font-medium">
          {(val) =>
            val ? (
              labelByValue.get(val) ?? val
            ) : (
              <span className="text-[#8A90A0]">{placeholder}</span>
            )
          }
        </BaseSelect.Value>
        <BaseSelect.Icon className="shrink-0 text-[#8A90A0]">
          <CaretUpDown size={15} weight="bold" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8} alignItemWithTrigger={false} className="z-50">
          <BaseSelect.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'min-w-(--anchor-width) overflow-hidden p-1.5',
            )}
          >
            <BaseSelect.List className="max-h-70 overflow-y-auto">
              {grouped
                ? grouped.map(([groupName, groupItems], idx) => (
                    <React.Fragment key={groupName}>
                      {idx > 0 && <div className="my-1 h-px bg-[#EEF0F3]" />}
                      <BaseSelect.Group>
                        <BaseSelect.GroupLabel className="px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#8A90A0] uppercase">
                          {groupName}
                        </BaseSelect.GroupLabel>
                        {groupItems.map((opt) => (
                          <SelectOptionItem key={opt.value} option={opt} />
                        ))}
                      </BaseSelect.Group>
                    </React.Fragment>
                  ))
                : options.map((opt) => (
                    <SelectOptionItem key={opt.value} option={opt} />
                  ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

function SelectOptionItem({ option }: { option: SelectOption }) {
  return (
    <BaseSelect.Item
      value={option.value}
      disabled={option.disabled}
      className={cn(
        'flex cursor-pointer items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-[14px] text-[#1B1F27] select-none outline-none',
        'transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
        'data-highlighted:bg-[#F2F3F5]',
        'data-selected:bg-[#E4E6FD]/70 data-selected:font-semibold data-selected:text-[#262B7A]',
        'data-disabled:pointer-events-none data-disabled:opacity-40',
      )}
    >
      <div className="flex min-w-0 flex-col">
        <BaseSelect.ItemText className="truncate">{option.label}</BaseSelect.ItemText>
        {option.description && (
          <span className="truncate text-[12px] font-normal text-[#6B7280]">
            {option.description}
          </span>
        )}
      </div>
      <BaseSelect.ItemIndicator className="shrink-0 text-[#4A4FB8]">
        <Check size={15} weight="bold" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}
```
