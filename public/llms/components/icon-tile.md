# IconTile (图标方砖)

> 用于应用图标与列表前置标识的柔彩圆角方砖，可自动感知父级 Tile 深浅背景。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/icon-tile
```

- **Registry JSON**: `/r/icon-tile.json`
- **Import Path**: `@/components/ui/icon-tile`
- **Exports**: `IconTile`
- **NPM Dependencies**: `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tile`, `@glaze/tokens`

## API Reference

### IconTile

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hue?` | `Hue \| 'neutral' \| 'dark' \| 'dark-glass' \| 'coral-solid'` | `'sky'` | — |
| `size?` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | — |
| `radius?` | `'icon' \| 'app' \| 'full'` | `'app'` | — |
| `badge?` | `number` | — | — |
| `badgeRingColor?` | `string` | `'#FFFFFF'` | — |

### CSS Variables

- `--radius-control`
- `--radius-item`
- `--radius-icon`

## Source Code

```tsx
import * as React from 'react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'
import { useTileTheme } from '@/components/ui/tile'

export interface IconTileProps extends React.HTMLAttributes<HTMLDivElement> {
  hue?: Hue | 'neutral' | 'dark' | 'dark-glass' | 'coral-solid'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'icon' | 'app' | 'full'
  badge?: number
  badgeRingColor?: string
}

export function IconTile({
  hue = 'sky',
  size = 'md',
  radius = 'app',
  badge,
  badgeRingColor = '#FFFFFF',
  className,
  style,
  children,
  ...props
}: IconTileProps) {
  const tileTheme = useTileTheme()

  const colors =
    hue === 'neutral'
      ? tileTheme.dark
        ? { backgroundColor: 'rgba(255,255,255,0.16)', color: '#FFFFFF' }
        : { backgroundColor: tileTheme.bg === '#FFFFFF' ? '#F2F3F5' : 'rgba(255,255,255,0.68)', color: tileTheme.ink }
      : hue === 'dark' || hue === 'dark-glass'
        ? { backgroundColor: 'rgba(255,255,255,0.16)', color: '#FFFFFF' }
        : hue === 'coral-solid'
          ? { backgroundColor: HUE_PALETTES.coral[500], color: '#FFFFFF' }
          : {
              backgroundColor:
                HUE_PALETTES[hue][100] === tileTheme.bg
                  ? 'rgba(255,255,255,0.68)'
                  : HUE_PALETTES[hue][100],
              color: HUE_PALETTES[hue][700],
            }

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        size === 'sm' && 'h-8 w-8 text-[15px]',
        size === 'md' && 'h-10 w-10 text-[18px]',
        size === 'lg' && 'h-12 w-12 text-[20px]',
        size === 'xl' && 'h-14 w-14 text-[24px]',
        radius === 'icon' && 'rounded-icon',
        radius === 'app' && 'rounded-control',
        radius === 'full' && 'rounded-full',
        className,
      )}
      style={{ ...colors, ...style }}
      {...props}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#E5603B] px-1 text-[10px] font-bold text-white tabular-nums"
          style={{ boxShadow: `0 0 0 2px ${badgeRingColor}` }}
        >
          {badge}
        </span>
      )}
    </div>
  )
}
```
