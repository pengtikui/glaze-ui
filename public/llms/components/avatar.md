# Avatar (头像与头像组)

> 支持图片加载降级文字缩写、9 组柔彩底色与叠放人数溢出提示的 AvatarGroup。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/avatar
```

- **Registry JSON**: `/r/avatar.json`
- **Import Path**: `@/components/ui/avatar`
- **Exports**: `Avatar`, `AvatarGroup`
- **Base UI Primitive**: `@base-ui/react/avatar` ([Base UI Docs](https://base-ui.com/react/components/avatar))
- **NPM Dependencies**: `@base-ui/react`, `cn`
- **Registry Dependencies**: `@glaze/tokens`

## API Reference

### Avatar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src?` | `string` | — | — |
| `alt?` | `string` | `''` | — |
| `fallback` | `string` | — | — |
| `hue?` | `Hue` | `'periwinkle'` | — |
| `size?` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | — |
| `ringWidth?` | `number` | `0` | — |
| `ringColor?` | `string` | `'#FFFFFF'` | — |
| `className?` | `string` | — | — |

### AvatarGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AvatarGroupItem[]` | — | — |
| `size?` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | — |
| `ringColor?` | `string` | `'#FFFFFF'` | — |
| `overflowBg?` | `string` | `'#F2F3F5'` | — |
| `overflowFg?` | `string` | `'#5B6170'` | — |
| `max?` | `number` | — | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `AvatarGroupItem`

| Property | Type | Required |
| --- | --- | --- |
| `label` | `string` | Yes |
| `hue` | `Hue` | Yes |
| `src` | `string` | No |

## Source Code

```tsx
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  hue?: Hue
  size?: 'xs' | 'sm' | 'md' | 'lg'
  ringWidth?: number
  ringColor?: string
  className?: string
}

const AVATAR_SIZES = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-[12px]',
  md: 'h-10 w-10 text-[14px]',
  lg: 'h-12 w-12 text-[16px]',
}

export function Avatar({
  src,
  alt = '',
  fallback,
  hue = 'periwinkle',
  size = 'md',
  ringWidth = 0,
  ringColor = '#FFFFFF',
  className,
}: AvatarProps) {
  const palette = HUE_PALETTES[hue]
  return (
    <BaseAvatar.Root
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold select-none',
        AVATAR_SIZES[size],
        className,
      )}
      style={{
        backgroundColor: palette[100],
        color: palette[700],
        boxShadow: ringWidth > 0 ? `0 0 0 ${ringWidth}px ${ringColor}` : undefined,
      }}
    >
      {src && (
        <BaseAvatar.Image
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      )}
      <BaseAvatar.Fallback className="flex h-full w-full items-center justify-center">
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}

export interface AvatarGroupItem {
  label: string
  hue: Hue
  src?: string
}

export function AvatarGroup({
  items,
  size = 'sm',
  ringColor = '#FFFFFF',
  overflowBg = '#F2F3F5',
  overflowFg = '#5B6170',
  max,
  className,
}: {
  items: AvatarGroupItem[]
  size?: 'xs' | 'sm' | 'md' | 'lg'
  ringColor?: string
  overflowBg?: string
  overflowFg?: string
  max?: number
  className?: string
}) {
  const visible = max ? items.slice(0, max) : items
  const extra = max && items.length > max ? items.length - max : 0

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visible.map((item, idx) => (
        <Avatar
          key={`${item.label}-${idx}`}
          src={item.src}
          fallback={item.label}
          hue={item.hue}
          size={size}
          ringWidth={2}
          ringColor={ringColor}
        />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            'relative inline-flex shrink-0 items-center justify-center rounded-full font-bold',
            AVATAR_SIZES[size],
          )}
          style={{
            backgroundColor: overflowBg,
            color: overflowFg,
            boxShadow: `0 0 0 2px ${ringColor}`,
          }}
        >
          +{extra}
        </span>
      )}
    </div>
  )
}
```
