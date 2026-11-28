# Chart (图表主题与容器)

> Glaze 图表核心基础设施，自动读取父级 Tile 深浅背景色板，提供 ChartContainer、ChartTooltip、ChartLegend 与配色解析器。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/chart
```

- **Registry JSON**: `/r/chart.json`
- **Import Path**: `@/components/ui/chart`
- **Exports**: `CHART_ANIMATION_DURATION`, `CHART_ANIMATION_EASING`, `getChartTheme`, `useChartTheme`, `resolveSeriesColor`, `useChart`, `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`
- **NPM Dependencies**: `cn`, `recharts`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tile`, `@glaze/tokens`

## API Reference

### CHART_ANIMATION_DURATION

Inherits standard Base UI / HTML element props.

### CHART_ANIMATION_EASING

Inherits standard Base UI / HTML element props.

### getChartTheme

Inherits standard Base UI / HTML element props.

### useChartTheme

Inherits standard Base UI / HTML element props.

### resolveSeriesColor

Inherits standard Base UI / HTML element props.

### useChart

Inherits standard Base UI / HTML element props.

### ChartContainer

Extends: `Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `config?` | `ChartConfig` | `{}` | — |
| `tone?` | `TileTone` | — | — |
| `height?` | `number \| string` | — | — |
| `minHeight?` | `number` | — | — |
| `responsive?` | `boolean` | `true` | — |
| `children` | `React.ReactElement \| React.ReactNode` | — | — |

### ChartTooltip

Inherits standard Base UI / HTML element props.

### ChartTooltipContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `active?` | `boolean` | — | — |
| `payload?` | `readonly TooltipPayloadEntry[]` | — | — |
| `label?` | `string \| number` | — | — |
| `indicator?` | `'dot' \| 'line' \| 'dashed'` | `'dot'` | — |
| `surface?` | `'white' \| 'ink'` | `'white'` | — |
| `compact?` | `boolean` | `false` | — |
| `hideLabel?` | `boolean` | `false` | — |
| `hideIndicator?` | `boolean` | `false` | — |
| `unit?` | `string` | — | — |
| `labelFormatter?` | `(label: React.ReactNode, payload?: readonly TooltipPayloadEntry[]) => React.ReactNode` | — | — |
| `valueFormatter?` | `(value: number \| string, name?: string, item?: unknown) => React.ReactNode` | — | — |
| `className?` | `string` | — | — |

### ChartLegend

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ChartLegendItem[]` | — | — |
| `hiddenKeys?` | `ReadonlySet<string>` | — | — |
| `onToggleKey?` | `(key: string) => void` | — | — |
| `align?` | `'left' \| 'center' \| 'right'` | `'left'` | — |
| `tone?` | `TileTone` | — | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `ChartSeriesConfig`

| Property | Type | Required |
| --- | --- | --- |
| `label` | `React.ReactNode` | No |
| `color` | `string` | No |
| `hue` | `Hue` | No |
| `unit` | `string` | No |
| `icon` | `React.ComponentType<{ className?: string }>` | No |

#### `ChartTheme`

| Property | Type | Required |
| --- | --- | --- |
| `tile` | `TileTheme` | Yes |
| `isDark` | `boolean` | Yes |
| `gridColor` | `string` | Yes |
| `axisColor` | `string` | Yes |
| `cursorFill` | `string` | Yes |
| `cursorStroke` | `string` | Yes |

#### `ChartContextValue`

| Property | Type | Required |
| --- | --- | --- |
| `config` | `ChartConfig` | Yes |
| `theme` | `ChartTheme` | Yes |
| `colors` | `Record<string, string>` | Yes |

#### `ChartLegendItem`

| Property | Type | Required |
| --- | --- | --- |
| `key` | `string` | Yes |
| `label` | `React.ReactNode` | Yes |
| `color` | `string` | Yes |
| `dashed` | `boolean` | No |

## Source Code

```tsx
import * as React from 'react'
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  type TooltipPayloadEntry,
} from 'recharts'
import { cn } from 'cn'
import {
  DATAVIZ_PALETTES,
  HUE_PALETTES,
  TILE_THEMES,
  type Hue,
  type TileTheme,
  type TileTone,
} from '@/lib/tokens'
import { useTileTheme } from '@/components/ui/tile'

export interface ChartSeriesConfig {
  label?: React.ReactNode
  color?: string
  hue?: Hue
  unit?: string
  icon?: React.ComponentType<{ className?: string }>
}

export type ChartConfig = Record<string, ChartSeriesConfig>

export interface ChartTheme {
  tile: TileTheme
  isDark: boolean
  gridColor: string
  axisColor: string
  cursorFill: string
  cursorStroke: string
}

export interface ChartContextValue {
  config: ChartConfig
  theme: ChartTheme
  colors: Record<string, string>
}

export const CHART_ANIMATION_DURATION = 420
export const CHART_ANIMATION_EASING = 'ease-out' as const

export function getChartTheme(tile: TileTheme): ChartTheme {
  const isDark = Boolean(tile.dark)
  return {
    tile,
    isDark,
    gridColor: isDark
      ? 'rgba(255,255,255,0.12)'
      : tile.id === 'white'
        ? '#EEF0F3'
        : tile.divider,
    axisColor: isDark ? 'rgba(255,255,255,0.68)' : tile.soft,
    cursorFill: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(27,31,39,0.045)',
    cursorStroke: isDark ? 'rgba(255,255,255,0.28)' : '#CDD3DD',
  }
}

export function useChartTheme(tone?: TileTone): ChartTheme {
  const inherited = useTileTheme()
  const tile = tone ? TILE_THEMES[tone] : inherited
  return React.useMemo(() => getChartTheme(tile), [tile])
}

export function resolveSeriesColor(
  key: string,
  index: number,
  config?: ChartConfig,
  explicitColor?: string,
  explicitHue?: Hue,
): string {
  if (explicitColor) return explicitColor
  if (explicitHue) return HUE_PALETTES[explicitHue][500]
  const entry = config?.[key]
  if (entry?.color) return entry.color
  if (entry?.hue) return HUE_PALETTES[entry.hue][500]
  return DATAVIZ_PALETTES.categorical[index % DATAVIZ_PALETTES.categorical.length]
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

export function useChart(): ChartContextValue {
  const ctx = React.useContext(ChartContext)
  if (!ctx) {
    return {
      config: {},
      theme: getChartTheme(TILE_THEMES.white),
      colors: {},
    }
  }
  return ctx
}

export interface ChartContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  config?: ChartConfig
  tone?: TileTone
  height?: number | string
  minHeight?: number
  responsive?: boolean
  children: React.ReactElement | React.ReactNode
}

export function ChartContainer({
  config = {},
  tone,
  height,
  minHeight,
  responsive = true,
  className,
  style,
  children,
  ...props
}: ChartContainerProps) {
  const theme = useChartTheme(tone)

  const { colors, cssVars } = React.useMemo(() => {
    const map: Record<string, string> = {}
    const vars: Record<string, string> = {}
    Object.keys(config).forEach((key, idx) => {
      const color = resolveSeriesColor(key, idx, config)
      map[key] = color
      vars[`--color-${key}`] = color
    })
    return { colors: map, cssVars: vars }
  }, [config])

  const contextValue = React.useMemo<ChartContextValue>(
    () => ({ config, theme, colors }),
    [config, theme, colors],
  )

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        data-glaze-chart=""
        className={cn(
          'relative w-full min-w-0 select-none font-sans tabular-nums',
          '[&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none',
          // Recharts 3 renders tick labels in a sibling `.recharts-cartesian-axis-tick-labels` layer,
          // so target the `*-tick-value` text class directly instead of `.recharts-cartesian-axis-tick text`.
          '[&_.recharts-cartesian-axis-tick-value]:text-[11px] [&_.recharts-cartesian-axis-tick-value]:font-medium',
          '[&_.recharts-polar-angle-axis-tick-value]:text-[11px] [&_.recharts-polar-angle-axis-tick-value]:font-semibold',
          className,
        )}
        style={{
          ...(height !== undefined ? { height } : {}),
          ...(minHeight !== undefined ? { minHeight } : {}),
          ...(cssVars as React.CSSProperties),
          ...style,
        }}
        {...props}
      >
        {responsive ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            {children as React.ReactElement}
          </ResponsiveContainer>
        ) : (
          children
        )}
      </div>
    </ChartContext.Provider>
  )
}

export type ChartTooltipProps = React.ComponentProps<typeof RechartsTooltip>

export function ChartTooltip({
  isAnimationActive = false,
  wrapperStyle,
  ...props
}: ChartTooltipProps) {
  return (
    <RechartsTooltip
      isAnimationActive={isAnimationActive}
      wrapperStyle={{ outline: 'none', zIndex: 30, ...wrapperStyle }}
      {...props}
    />
  )
}

export interface ChartTooltipContentProps {
  active?: boolean
  payload?: readonly TooltipPayloadEntry[]
  label?: string | number
  indicator?: 'dot' | 'line' | 'dashed'
  surface?: 'white' | 'ink'
  compact?: boolean
  hideLabel?: boolean
  hideIndicator?: boolean
  unit?: string
  labelFormatter?: (label: React.ReactNode, payload?: readonly TooltipPayloadEntry[]) => React.ReactNode
  valueFormatter?: (value: number | string, name?: string, item?: unknown) => React.ReactNode
  className?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = 'dot',
  surface = 'white',
  compact = false,
  hideLabel = false,
  hideIndicator = false,
  unit,
  labelFormatter,
  valueFormatter,
  className,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) {
    return null
  }

  const isInk = surface === 'ink'
  const formattedLabel = labelFormatter ? labelFormatter(label, payload) : label

  return (
    <div
      className={cn(
        'pointer-events-none tabular-nums',
        compact ? 'min-w-26 rounded-[12px] px-2.5 py-1.5 text-[11px]' : 'min-w-36 rounded-[16px] px-3.5 py-2.5 text-[12px]',
        isInk
          ? 'border border-white/10 bg-[#1B1F27] text-white shadow-[0_8px_24px_rgba(27,31,39,0.22)]'
          : 'border border-[#E8EBF0] bg-white text-[#1B1F27] shadow-[var(--glaze-shadow-overlay)]',
        className,
      )}
    >
      {!hideLabel && formattedLabel !== undefined && formattedLabel !== null && formattedLabel !== '' && (
        <div
          className={cn(
            'font-semibold',
            compact ? 'mb-1 text-[11px]' : 'mb-1.5 text-[12px]',
            isInk ? 'text-white/70' : 'text-[#5B6170]',
          )}
        >
          {formattedLabel}
        </div>
      )}
      <div className={cn('flex flex-col', compact ? 'gap-1' : 'gap-1.5')}>
        {payload.map((entry, idx) => {
          const dataKey = String(entry.dataKey ?? entry.name ?? idx)
          const cfg = config[dataKey] ?? config[String(entry.name ?? '')]
          const entryPayload = entry.payload as Record<string, unknown> | undefined
          const swatchColor =
            (entry.color && entry.color !== 'none' ? entry.color : undefined) ??
            (typeof entryPayload?.fill === 'string' ? entryPayload.fill : undefined) ??
            cfg?.color ??
            (cfg?.hue ? HUE_PALETTES[cfg.hue][500] : undefined) ??
            DATAVIZ_PALETTES.categorical[idx % DATAVIZ_PALETTES.categorical.length]

          const displayName = cfg?.label ?? entry.name ?? dataKey
          const rawVal = entry.value
          const itemUnit = cfg?.unit ?? unit
          const formattedVal =
            valueFormatter && rawVal !== undefined && rawVal !== null
              ? valueFormatter(rawVal as number | string, String(displayName), entry)
              : typeof rawVal === 'number'
                ? `${rawVal.toLocaleString('en-US')}${itemUnit ? ` ${itemUnit}` : ''}`
                : `${rawVal ?? ''}${itemUnit ? ` ${itemUnit}` : ''}`

          return (
            <div key={`${dataKey}-${idx}`} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-1.5">
                {!hideIndicator && (
                  <>
                    {indicator === 'dot' && (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: swatchColor }}
                      />
                    )}
                    {indicator === 'line' && (
                      <span
                        className="h-3 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: swatchColor }}
                      />
                    )}
                    {indicator === 'dashed' && (
                      <span
                        className="h-0 w-3 shrink-0 border-t-2 border-dashed"
                        style={{ borderColor: swatchColor }}
                      />
                    )}
                  </>
                )}
                <span
                  className={cn(
                    'truncate',
                    isInk ? 'text-white/80' : 'text-[#5B6170]',
                  )}
                >
                  {displayName}
                </span>
              </div>
              <span
                className={cn(
                  'shrink-0 font-glaze-display font-bold whitespace-nowrap',
                  isInk ? 'text-white' : 'text-[#1B1F27]',
                )}
              >
                {formattedVal}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export interface ChartLegendItem {
  key: string
  label: React.ReactNode
  color: string
  dashed?: boolean
}

export interface ChartLegendProps {
  items: ChartLegendItem[]
  hiddenKeys?: ReadonlySet<string>
  onToggleKey?: (key: string) => void
  align?: 'left' | 'center' | 'right'
  tone?: TileTone
  className?: string
}

export function ChartLegend({
  items,
  hiddenKeys,
  onToggleKey,
  align = 'left',
  tone,
  className,
}: ChartLegendProps) {
  const theme = useChartTheme(tone)
  const interactive = Boolean(onToggleKey)

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px]',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        className,
      )}
    >
      {items.map((item) => {
        const isHidden = Boolean(hiddenKeys?.has(item.key))
        const content = (
          <>
            {item.dashed ? (
              <span
                className="w-3.5 shrink-0 border-t-2 border-dashed"
                style={{ borderColor: item.color }}
              />
            ) : (
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </>
        )

        if (!interactive) {
          return (
            <span
              key={item.key}
              className="inline-flex items-center gap-1.5"
              style={{ color: theme.axisColor }}
            >
              {content}
            </span>
          )
        }

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onToggleKey?.(item.key)}
            aria-pressed={!isHidden}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-transparent px-2 py-0.5 transition-opacity glaze-focus',
              isHidden ? 'opacity-40 line-through' : 'opacity-100 hover:opacity-80',
            )}
            style={{ color: theme.axisColor }}
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}
```
