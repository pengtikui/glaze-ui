# Switch (开关)

> 即时生效的胶囊开关控件，采用 200ms 纯 CSS 滑块过渡，支持 9 组色相自定义激活色。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/switch
```

- **Registry JSON**: `/r/switch.json`
- **Import Path**: `@/components/ui/switch`
- **Exports**: `Switch`
- **Base UI Primitive**: `@base-ui/react/switch` ([Base UI Docs](https://base-ui.com/react/components/switch))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/tokens`

## API Reference

### Switch

Extends: `Omit<React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>, 'className'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hue?` | `Hue \| 'ink'` | `'mint'` | — |
| `size?` | `'sm' \| 'md'` | `'md'` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-checked` | 开启状态 |
| `data-unchecked` | 关闭状态 |
| `data-disabled` | 禁用状态 |

### CSS Variables

- `--glaze-dur-base`

## Source Code

```tsx
import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>, 'className'> {
  hue?: Hue | 'ink'
  size?: 'sm' | 'md'
  className?: string
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch({ hue = 'mint', size = 'md', className, ...props }, ref) {
    const activeBg = hue === 'ink' ? '#1B1F27' : HUE_PALETTES[hue][500]

    return (
      <BaseSwitch.Root
        ref={ref}
        className={cn(
          'group relative inline-flex shrink-0 cursor-pointer items-center justify-start rounded-full bg-[#E8EBF0] p-0.75 outline-none',
          'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'focus-visible:ring-2 focus-visible:ring-[#7B80EA] focus-visible:ring-offset-2',
          'data-disabled:cursor-not-allowed data-disabled:opacity-45',
          size === 'sm' ? 'h-6 w-10' : 'h-7 w-12',
          className,
        )}
        style={{
          ['--switch-active-bg' as string]: activeBg,
        }}
        render={(renderProps, state) => (
          <span
            {...renderProps}
            style={{
              ...renderProps.style,
              backgroundColor: state.checked ? activeBg : undefined,
            }}
          />
        )}
        {...props}
      >
        <BaseSwitch.Thumb
          className={cn(
            'block rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.2)]',
            'will-change-transform transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            size === 'sm'
              ? 'h-4.5 w-4.5 group-data-checked:[transform:translate3d(16px,0,0)]'
              : 'h-5.5 w-5.5 group-data-checked:[transform:translate3d(20px,0,0)]',
          )}
        />
      </BaseSwitch.Root>
    )
  },
)
```
