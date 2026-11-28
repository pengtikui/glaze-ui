# AiContextMeter (上下文用量与模型选择器)

> 基于 Base UI Popover 的上下文 Token 环形仪表与分段构成面板 AiContextMeter，以及带厂商/能力标签的模型选择器 AiModelSelector。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/ai-context-meter
```

- **Registry JSON**: `/r/ai-context-meter.json`
- **Import Path**: `@/components/ui/ai-context-meter`
- **Exports**: `AiContextMeter`, `AiModelSelector`
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/progress`, `@glaze/style`, `@glaze/tokens`

## API Reference

### AiContextMeter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `usage` | `AiContextUsage` | — | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | Trigger button style |
| `className?` | `string` | — | — |

### AiModelSelector

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `models` | `AiModelOption[]` | — | — |
| `value` | `string` | — | — |
| `onValueChange` | `(modelId: string) => void` | — | — |
| `surface?` | `'soft' \| 'white'` | `'soft'` | — |
| `side?` | `'top' \| 'bottom'` | `'top'` | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `AiContextUsage`

| Property | Type | Required |
| --- | --- | --- |
| `usedTokens` | `number` | Yes |
| `maxTokens` | `number` | Yes |
| `inputTokens` | `number` | No |
| `outputTokens` | `number` | No |
| `cachedTokens` | `number` | No |
| `reasoningTokens` | `number` | No |
| `estimatedCost` | `string` | No |

#### `AiModelOption`

| Property | Type | Required |
| --- | --- | --- |
| `id` | `string` | Yes |
| `name` | `string` | Yes |
| `provider` | `string` | Yes |
| `contextWindow` | `string` | No |
| `tag` | `string` | No |
| `hue` | `Hue` | No |
| `description` | `string` | No |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-popup-open` | 用量明细或模型选择浮层处于打开态 |

### CSS Variables

- `--transform-origin`

## Source Code

```tsx
import * as React from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { CaretDown, Check, Cpu, Lightning, Sparkle } from '@phosphor-icons/react'
import { cn } from 'cn'
import { SegmentedProgress } from '@/components/ui/progress'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Hue } from '@/lib/tokens'
import { POPUP_SURFACE, POPUP_TRANSITION_CLASS, PopupTriggerScope } from '@/lib/motion'

export interface AiContextUsage {
  usedTokens: number
  maxTokens: number
  inputTokens?: number
  outputTokens?: number
  cachedTokens?: number
  reasoningTokens?: number
  estimatedCost?: string
}

function formatCompactTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export interface AiContextMeterProps {
  usage: AiContextUsage
  /** Trigger button style */
  surface?: 'soft' | 'white'
  className?: string
}

export function AiContextMeter({
  usage,
  surface = 'soft',
  className,
}: AiContextMeterProps) {
  const pct = Math.min(100, Math.round((usage.usedTokens / Math.max(1, usage.maxTokens)) * 100))
  const ringColor =
    pct >= 85
      ? SEMANTIC_TOKENS.error.dot
      : pct >= 65
        ? SEMANTIC_TOKENS.warning.dot
        : HUE_PALETTES.periwinkle[500]

  const r = 7
  const c = 2 * Math.PI * r
  const offset = c * (1 - pct / 100)

  const segments = [
    ...(usage.inputTokens
      ? [{ label: '输入', value: usage.inputTokens, color: HUE_PALETTES.sky[500] }]
      : []),
    ...(usage.cachedTokens
      ? [{ label: '缓存命中', value: usage.cachedTokens, color: HUE_PALETTES.mint[500] }]
      : []),
    ...(usage.reasoningTokens
      ? [{ label: '推理', value: usage.reasoningTokens, color: HUE_PALETTES.lilac[500] }]
      : []),
    ...(usage.outputTokens
      ? [{ label: '输出', value: usage.outputTokens, color: HUE_PALETTES.periwinkle[500] }]
      : []),
  ]

  return (
    <BasePopover.Root>
      <PopupTriggerScope>
        <BasePopover.Trigger
          className={cn(
            'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold text-[#1B1F27] outline-none transition-colors',
            surface === 'white' ? 'bg-white hover:bg-[#FAFBFD]' : 'bg-[#F2F3F5] hover:bg-[#E8EBF0]',
            className,
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" className="-rotate-90">
            <circle cx="9" cy="9" r={r} fill="none" stroke="#E8EBF0" strokeWidth="2.5" />
            <circle
              cx="9"
              cy="9"
              r={r}
              fill="none"
              stroke={ringColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="font-glaze-mono tabular-nums">{pct}%</span>
        </BasePopover.Trigger>
      </PopupTriggerScope>

      <BasePopover.Portal>
        <BasePopover.Positioner side="top" align="end" sideOffset={8} className="z-50">
          <BasePopover.Popup
            className={cn(POPUP_SURFACE, POPUP_TRANSITION_CLASS, 'w-72 p-4')}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-glaze-display text-[14px] font-extrabold text-[#1B1F27]">
                上下文窗口用量
              </span>
              <span className="font-glaze-mono text-[12px] font-bold" style={{ color: ringColor }}>
                {pct}%
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between text-[12px] text-[#6B7280]">
              <span>
                {formatCompactTokens(usage.usedTokens)} / {formatCompactTokens(usage.maxTokens)} tokens
              </span>
              {usage.estimatedCost && (
                <span className="font-glaze-mono font-semibold text-[#1B1F27]">
                  {usage.estimatedCost}
                </span>
              )}
            </div>

            {segments.length > 0 && (
              <div className="mt-3">
                <SegmentedProgress segments={segments} />
              </div>
            )}

            <div className="mt-3 flex flex-col gap-1.5 border-t border-[#EEF0F3] pt-2.5 text-[12px]">
              {usage.inputTokens !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">输入 Tokens</span>
                  <span className="font-glaze-mono font-semibold text-[#1B1F27]">
                    {usage.inputTokens.toLocaleString()}
                  </span>
                </div>
              )}
              {usage.cachedTokens !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Prompt 缓存命中</span>
                  <span className="font-glaze-mono font-semibold text-[#2F6B28]">
                    {usage.cachedTokens.toLocaleString()}
                  </span>
                </div>
              )}
              {usage.reasoningTokens !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">深度推理 Tokens</span>
                  <span className="font-glaze-mono font-semibold text-[#6A2D70]">
                    {usage.reasoningTokens.toLocaleString()}
                  </span>
                </div>
              )}
              {usage.outputTokens !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">输出 Tokens</span>
                  <span className="font-glaze-mono font-semibold text-[#1B1F27]">
                    {usage.outputTokens.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}

export interface AiModelOption {
  id: string
  name: string
  provider: string
  contextWindow?: string
  tag?: string
  hue?: Hue
  description?: string
}

export interface AiModelSelectorProps {
  models: AiModelOption[]
  value: string
  onValueChange: (modelId: string) => void
  surface?: 'soft' | 'white'
  side?: 'top' | 'bottom'
  className?: string
}

export function AiModelSelector({
  models,
  value,
  onValueChange,
  surface = 'soft',
  side = 'top',
  className,
}: AiModelSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const current = models.find((m) => m.id === value) ?? models[0]
  const activePalette = HUE_PALETTES[current?.hue ?? 'periwinkle']

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <PopupTriggerScope>
        <BasePopover.Trigger
          className={cn(
            'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold text-[#1B1F27] outline-none transition-colors data-popup-open:ring-2 data-popup-open:ring-[#7B80EA]',
            surface === 'white' ? 'bg-white hover:bg-[#FAFBFD]' : 'bg-[#F2F3F5] hover:bg-[#E8EBF0]',
            className,
          )}
        >
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full"
            style={{ backgroundColor: activePalette[100], color: activePalette[700] }}
          >
            <Sparkle size={10} weight="fill" />
          </span>
          <span className="max-w-[140px] truncate">{current?.name}</span>
          <CaretDown size={12} weight="bold" className="text-[#8A90A0]" />
        </BasePopover.Trigger>
      </PopupTriggerScope>

      <BasePopover.Portal>
        <BasePopover.Positioner side={side} align="start" sideOffset={8} className="z-50">
          <BasePopover.Popup
            className={cn(POPUP_SURFACE, POPUP_TRANSITION_CLASS, 'w-80 p-2')}
          >
            <div className="px-2.5 pt-1 pb-1.5 text-[11px] font-bold tracking-[0.04em] text-[#8A90A0] uppercase">
              选择推理模型
            </div>
            <div className="flex flex-col gap-1">
              {models.map((m) => {
                const selected = m.id === value
                const palette = HUE_PALETTES[m.hue ?? 'periwinkle']
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onValueChange(m.id)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-start justify-between gap-2.5 rounded-[12px] px-2.5 py-2 text-left transition-colors outline-none',
                      selected ? 'bg-[#F3F4FE]' : 'hover:bg-[#F6F7F9]',
                    )}
                  >
                    <div className="flex min-w-0 items-start gap-2.5">
                      <span
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px]"
                        style={{ backgroundColor: palette[100], color: palette[700] }}
                      >
                        {m.tag === '极速' ? (
                          <Lightning size={14} weight="fill" />
                        ) : (
                          <Cpu size={14} weight="duotone" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-[13px] font-bold text-[#1B1F27]">
                            {m.name}
                          </span>
                          {m.tag && (
                            <span
                              className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                              style={{ backgroundColor: palette[100], color: palette[700] }}
                            >
                              {m.tag}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                          <span>{m.provider}</span>
                          {m.contextWindow && <span>· {m.contextWindow}</span>}
                        </div>
                        {m.description && (
                          <div className="mt-0.5 line-clamp-1 text-[11px] text-[#8A90A0]">
                            {m.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {selected && (
                      <Check size={15} weight="bold" className="mt-1 shrink-0 text-[#4A4FB8]" />
                    )}
                  </button>
                )
              })}
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}
```
