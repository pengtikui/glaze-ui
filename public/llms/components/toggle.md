# Toggle (切换按钮)

> 带有按下（pressed）状态的双态胶囊按钮，适用于工具栏格式化、收藏、置顶等操作。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/toggle
```

- **Registry JSON**: `/r/toggle.json`
- **Import Path**: `@/components/ui/toggle`
- **Exports**: `Toggle`
- **Base UI Primitive**: `@base-ui/react/toggle` ([Base UI Docs](https://base-ui.com/react/components/toggle))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`

## API Reference

### Toggle

Extends: `Omit<React.ComponentPropsWithoutRef<typeof BaseToggle>, 'className'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size?` | `'sm' \| 'md'` | `'md'` | — |
| `pressScale?` | `boolean` | `true` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-pressed` | 按钮处于激活按下态 |
| `data-disabled` | 禁用状态 |

## Source Code

```tsx
import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { cn } from 'cn'
import { PRESS_CLASS, useIsPopupTrigger } from '@/lib/motion'

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseToggle>, 'className'> {
  size?: 'sm' | 'md'
  pressScale?: boolean
  className?: string
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle({ size = 'md', pressScale = true, className, disabled, ...props }, ref) {
    const isPopupTrigger = useIsPopupTrigger()
    const enablePressScale = !disabled && pressScale && !isPopupTrigger

    return (
      <BaseToggle
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-semibold whitespace-nowrap select-none outline-none',
          enablePressScale
            ? PRESS_CLASS
            : 'transition-[background-color,color] duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
          'bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
          'data-pressed:bg-[#1B1F27] data-pressed:text-white',
          'focus-visible:ring-2 focus-visible:ring-[#7B80EA] focus-visible:ring-offset-2',
          'data-disabled:pointer-events-none data-disabled:opacity-45',
          size === 'sm' ? 'h-8 px-3 text-[12px]' : 'h-10 px-4 text-[13px]',
          className,
        )}
        {...props}
      />
    )
  },
)
```
