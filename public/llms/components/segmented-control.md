# SegmentedControl (分段控制器)

> 基于 Base UI Tabs 封装的胶囊分段切换器，内置平滑纯 CSS 滑动指示块。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/segmented-control
```

- **Registry JSON**: `/r/segmented-control.json`
- **Import Path**: `@/components/ui/segmented-control`
- **Exports**: `SegmentedControl`
- **Base UI Primitive**: `@base-ui/react/tabs` ([Base UI Docs](https://base-ui.com/react/components/tabs))
- **NPM Dependencies**: `@base-ui/react`, `cn`

## API Reference

### SegmentedControl

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SegmentedOption<T>[]` | — | — |
| `value` | `T` | — | — |
| `onValueChange` | `(val: T) => void` | — | — |
| `size?` | `'sm' \| 'md'` | `'md'` | — |
| `dark?` | `boolean` | `false` | — |
| `ariaLabel?` | `string` | — | — |
| `listClassName?` | `string` | — | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `SegmentedOption`

| Property | Type | Required |
| --- | --- | --- |
| `value` | `T` | Yes |
| `label` | `string` | Yes |
| `icon` | `React.ReactNode` | No |
| `badge` | `string \| number` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-active` | 当前选中的分段项 |
| `data-disabled` | 禁用状态的分段项 |

### CSS Variables

- `--active-tab-left`
- `--active-tab-width`

## Source Code

```tsx
import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from 'cn'

export interface SegmentedOption<T extends string = string> {
  value: T
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onValueChange,
  size = 'md',
  dark = false,
  ariaLabel,
  listClassName,
  className,
}: {
  options: SegmentedOption<T>[]
  value: T
  onValueChange: (val: T) => void
  size?: 'sm' | 'md'
  dark?: boolean
  ariaLabel?: string
  listClassName?: string
  className?: string
}) {
  return (
    <BaseTabs.Root
      value={value}
      onValueChange={(v) => onValueChange(v as T)}
      className={cn('inline-flex', className)}
    >
      <BaseTabs.List
        aria-label={ariaLabel}
        className={cn(
          'relative isolate inline-flex items-center rounded-full p-1',
          dark ? 'bg-white/12' : 'bg-[#F2F3F5]',
          listClassName,
        )}
      >
        {options.map((opt) => (
          <BaseTabs.Tab
            key={opt.value}
            value={opt.value}
            className={cn(
              'relative z-10 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-semibold whitespace-nowrap select-none outline-none',
              'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
              size === 'sm'
                ? 'h-7 px-3 text-[12px]'
                : 'h-8 px-4 text-[13px]',
              dark
                ? 'text-white/75 hover:text-white data-active:text-[#1B1F27]'
                : 'text-[#5B6170] hover:text-[#1B1F27] data-active:text-[#1B1F27]',
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span className="rounded-full bg-[#F2F3F5] px-1.5 py-0.5 text-[10px] font-bold text-[#5B6170]">
                {opt.badge}
              </span>
            )}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator
          className={cn(
            'pointer-events-none absolute top-0 left-0 z-0 rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)]',
            'h-(--active-tab-height) w-(--active-tab-width)',
            '[transform:translate3d(var(--active-tab-left),var(--active-tab-top),0)]',
            'will-change-[transform,width] transition-[transform,width,height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
          )}
        />
      </BaseTabs.List>
    </BaseTabs.Root>
  )
}
```
