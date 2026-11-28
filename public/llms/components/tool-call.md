# ToolCall (工具调用追踪器)

> 展示智能体工具调用全生命周期（参数流式生成、执行中、待审批、成功返回、异常报错），支持展开审查入参与输出。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/tool-call
```

- **Registry JSON**: `/r/tool-call.json`
- **Import Path**: `@/components/ui/tool-call`
- **Exports**: `ToolCall`, `ToolCallHeader`, `ToolCallContent`, `ToolCallInput`, `ToolCallOutput`
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/status-pill`, `@glaze/style`, `@glaze/tokens`

## API Reference

### ToolCall

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultOpen?` | `boolean` | `false` | — |
| `open?` | `boolean` | — | — |
| `onOpenChange?` | `(open: boolean) => void` | — | — |
| `className?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |

### ToolCallHeader

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Tool function name, e.g. `query_metrics` |
| `title?` | `string` | — | Optional friendly Chinese title |
| `state` | `ToolCallState` | — | — |
| `duration?` | `string` | — | — |
| `icon?` | `React.ReactNode` | — | — |
| `className?` | `string` | — | — |

### ToolCallContent

Extends: `React.HTMLAttributes<HTMLDivElement>`

Inherits standard Base UI / HTML element props.

### ToolCallInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `input` | `unknown` | — | — |
| `label?` | `string` | `'调用参数'` | — |
| `className?` | `string` | — | — |

### ToolCallOutput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `output?` | `unknown` | — | — |
| `errorText?` | `string` | — | — |
| `label?` | `string` | `'返回结果'` | — |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-panel-open` | 工具入参/输出详情已展开 |

### CSS Variables

- `--collapsible-panel-height`
- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { CaretDown, Wrench } from '@phosphor-icons/react'
import { cn } from 'cn'
import { StatusPill } from '@/components/ui/status-pill'
import type { Status } from '@/lib/tokens'

export type ToolCallState =
  | 'input-streaming'
  | 'input-available'
  | 'approval-requested'
  | 'output-available'
  | 'output-error'

const TOOL_STATE_MAP: Record<ToolCallState, { status: Status; label: string }> = {
  'input-streaming': { status: 'info', label: '生成参数' },
  'input-available': { status: 'info', label: '执行中' },
  'approval-requested': { status: 'warning', label: '待审批' },
  'output-available': { status: 'normal', label: '已完成' },
  'output-error': { status: 'error', label: '执行失败' },
}

export interface ToolCallProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}

export function ToolCall({
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
}: ToolCallProps) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn('w-full rounded-inner bg-[#F6F7F9] px-4 py-3', className)}
    >
      {children}
    </BaseCollapsible.Root>
  )
}

export interface ToolCallHeaderProps {
  /** Tool function name, e.g. `query_metrics` */
  name: string
  /** Optional friendly Chinese title */
  title?: string
  state: ToolCallState
  duration?: string
  icon?: React.ReactNode
  className?: string
}

export function ToolCallHeader({
  name,
  title,
  state,
  duration,
  icon,
  className,
}: ToolCallHeaderProps) {
  const mapped = TOOL_STATE_MAP[state]
  return (
    <BaseCollapsible.Trigger
      className={cn(
        'group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-white text-[#123A5C]">
          {icon ?? <Wrench size={13} weight="duotone" />}
        </span>
        <span className="truncate font-glaze-mono text-[12.5px] font-bold text-[#1B1F27]">
          {name}
        </span>
        {title && (
          <span className="hidden truncate text-[12px] text-[#6B7280] sm:inline">{title}</span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {duration && (
          <span className="font-glaze-mono text-[11px] text-[#8A90A0]">{duration}</span>
        )}
        <StatusPill status={mapped.status} label={mapped.label} size="sm" />
        <CaretDown
          size={14}
          weight="bold"
          className="text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
        />
      </div>
    </BaseCollapsible.Trigger>
  )
}

export interface ToolCallContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ToolCallContent({ className, children, ...props }: ToolCallContentProps) {
  return (
    <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
      <div className={cn('mt-3 flex flex-col gap-2.5', className)} {...props}>
        {children}
      </div>
    </BaseCollapsible.Panel>
  )
}

export interface ToolCallInputProps {
  input: unknown
  label?: string
  className?: string
}

export function ToolCallInput({ input, label = '调用参数', className }: ToolCallInputProps) {
  const formatted = typeof input === 'string' ? input : JSON.stringify(input, null, 2)
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-[11px] font-bold tracking-[0.04em] text-[#8A90A0] uppercase">
        {label}
      </span>
      <pre className="m-0 overflow-x-auto rounded-[12px] bg-white p-3 font-glaze-mono text-[12px] leading-relaxed text-[#1B1F27]">
        <code>{formatted}</code>
      </pre>
    </div>
  )
}

export interface ToolCallOutputProps {
  output?: unknown
  errorText?: string
  label?: string
  className?: string
}

export function ToolCallOutput({
  output,
  errorText,
  label = '返回结果',
  className,
}: ToolCallOutputProps) {
  if (!output && !errorText) return null
  const formatted =
    errorText ?? (typeof output === 'string' ? output : JSON.stringify(output, null, 2))
  const isError = Boolean(errorText)

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'text-[11px] font-bold tracking-[0.04em] uppercase',
          isError ? 'text-[#A6360F]' : 'text-[#8A90A0]',
        )}
      >
        {isError ? '错误信息' : label}
      </span>
      <pre
        className={cn(
          'm-0 overflow-x-auto rounded-[12px] p-3 font-glaze-mono text-[12px] leading-relaxed',
          isError ? 'bg-[#FEF2EE] text-[#A6360F]' : 'bg-white text-[#1B1F27]',
        )}
      >
        <code>{formatted}</code>
      </pre>
    </div>
  )
}
```
