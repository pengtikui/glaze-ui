# Reasoning (深度推理折叠块)

> 基于 Base UI Collapsible 的流式思维过程组件，支持流式扫光标题、耗时统计、流式自动展开与完成后平滑折叠。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/reasoning
```

- **Registry JSON**: `/r/reasoning.json`
- **Import Path**: `@/components/ui/reasoning`
- **Exports**: `Reasoning`, `ReasoningTrigger`, `ReasoningContent`
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tokens`

## API Reference

### Reasoning

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isStreaming?` | `boolean` | `false` | Whether the model is actively streaming thoughts |
| `duration?` | `number` | — | Elapsed thinking time in seconds |
| `open?` | `boolean` | — | Controlled open state |
| `defaultOpen?` | `boolean` | `false` | Initial open state |
| `onOpenChange?` | `(open: boolean) => void` | — | — |
| `autoCollapse?` | `boolean` | `false` | Automatically open while streaming and collapse when complete |
| `hue?` | `Hue` | `'lilac'` | — |
| `className?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |

### ReasoningTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title?` | `React.ReactNode` | — | — |
| `className?` | `string` | — | — |

### ReasoningContent

Extends: `React.HTMLAttributes<HTMLDivElement>`

Inherits standard Base UI / HTML element props.

### Supporting Types

#### `ReasoningContextValue`

| Property | Type | Required |
| --- | --- | --- |
| `isStreaming` | `boolean` | Yes |
| `duration` | `number` | No |
| `hue` | `Hue` | Yes |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-streaming` | 推理内容正在流式输出 |
| `data-panel-open` | 推理明细面板已展开 |

### CSS Variables

- `--collapsible-panel-height`
- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { Brain, CaretDown } from '@phosphor-icons/react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

interface ReasoningContextValue {
  isStreaming: boolean
  duration?: number
  hue: Hue
}

const ReasoningContext = React.createContext<ReasoningContextValue>({
  isStreaming: false,
  hue: 'lilac',
})

export interface ReasoningProps {
  /** Whether the model is actively streaming thoughts */
  isStreaming?: boolean
  /** Elapsed thinking time in seconds */
  duration?: number
  /** Controlled open state */
  open?: boolean
  /** Initial open state */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Automatically open while streaming and collapse when complete */
  autoCollapse?: boolean
  hue?: Hue
  className?: string
  children: React.ReactNode
}

export function Reasoning({
  isStreaming = false,
  duration,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  autoCollapse = false,
  hue = 'lilac',
  className,
  children,
}: ReasoningProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen || isStreaming)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const prevStreaming = React.useRef(isStreaming)
  React.useEffect(() => {
    if (isStreaming && !prevStreaming.current) {
      handleOpenChange(true)
    } else if (!isStreaming && prevStreaming.current && autoCollapse) {
      handleOpenChange(false)
    }
    prevStreaming.current = isStreaming
  }, [isStreaming, autoCollapse, handleOpenChange])

  const palette = HUE_PALETTES[hue]

  return (
    <ReasoningContext.Provider value={{ isStreaming, duration, hue }}>
      <BaseCollapsible.Root
        open={open}
        onOpenChange={handleOpenChange}
        data-streaming={isStreaming ? '' : undefined}
        className={cn('w-full rounded-inner px-3.5 py-2.5', className)}
        style={{ backgroundColor: palette[50] }}
      >
        {children}
      </BaseCollapsible.Root>
    </ReasoningContext.Provider>
  )
}

export interface ReasoningTriggerProps {
  title?: React.ReactNode
  className?: string
}

export function ReasoningTrigger({ title, className }: ReasoningTriggerProps) {
  const { isStreaming, duration, hue } = React.useContext(ReasoningContext)
  const palette = HUE_PALETTES[hue]

  const defaultLabel = isStreaming
    ? '正在深度思考…'
    : duration !== undefined
      ? `已思考 ${duration.toFixed(duration % 1 === 0 ? 0 : 1)} 秒`
      : '查看推理过程'

  return (
    <BaseCollapsible.Trigger
      className={cn(
        'group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={cn(
            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
            isStreaming && 'animate-glaze-blink',
          )}
          style={{ backgroundColor: palette[100], color: palette[700] }}
        >
          <Brain size={14} weight="duotone" />
        </span>
        <span
          className={cn(
            'truncate text-[13px] font-bold',
            isStreaming ? 'animate-glaze-shimmer' : '',
          )}
          style={isStreaming ? undefined : { color: palette[900] }}
        >
          {title ?? defaultLabel}
        </span>
      </div>
      <CaretDown
        size={14}
        weight="bold"
        className="shrink-0 transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
        style={{ color: palette[700] }}
      />
    </BaseCollapsible.Trigger>
  )
}

export interface ReasoningContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ReasoningContent({ className, children, ...props }: ReasoningContentProps) {
  const { isStreaming, hue } = React.useContext(ReasoningContext)
  const palette = HUE_PALETTES[hue]

  return (
    <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
      <div
        className={cn(
          'mt-2.5 border-l-2 pl-3 text-[12.5px] leading-relaxed whitespace-pre-line',
          className,
        )}
        style={{ borderColor: palette[300], color: palette[700] }}
        {...props}
      >
        {children}
        {isStreaming && (
          <span
            aria-hidden="true"
            className="animate-glaze-caret ml-1 inline-block h-3.5 w-1.5 rounded-full align-middle"
            style={{ backgroundColor: palette[500] }}
          />
        )}
      </div>
    </BaseCollapsible.Panel>
  )
}
```
