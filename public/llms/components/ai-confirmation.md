# AiConfirmation (人工审批确认面板)

> Human-in-the-loop 敏感操作审批面板，支持低/中/高风险色板映射、待执行命令预览与批准/拒绝状态流转。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/ai-confirmation
```

- **Registry JSON**: `/r/ai-confirmation.json`
- **Import Path**: `@/components/ui/ai-confirmation`
- **Exports**: `AiConfirmation`
- **NPM Dependencies**: `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/button`, `@glaze/status-pill`, `@glaze/style`, `@glaze/tokens`

## API Reference

### AiConfirmation

Extends: `Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state?` | `AiConfirmationState` | `'requested'` | — |
| `risk?` | `AiConfirmationRisk` | `'medium'` | — |
| `title` | `React.ReactNode` | — | — |
| `description?` | `React.ReactNode` | — | — |
| `command?` | `string` | — | Optional tool name or command preview |
| `approveLabel?` | `string` | `'批准执行'` | — |
| `rejectLabel?` | `string` | `'拒绝'` | — |
| `onApprove?` | `() => void` | — | — |
| `onReject?` | `() => void` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-state` | 审批状态（requested | approved | rejected） |
| `data-risk` | 操作风险等级（low | medium | high） |

### CSS Variables

- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import { Check, ShieldCheck, ShieldWarning, X } from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/ui/status-pill'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export type AiConfirmationState = 'requested' | 'approved' | 'rejected'
export type AiConfirmationRisk = 'low' | 'medium' | 'high'

const RISK_HUE: Record<AiConfirmationRisk, Hue> = {
  low: 'sky',
  medium: 'peach',
  high: 'coral',
}

const RISK_LABEL: Record<AiConfirmationRisk, string> = {
  low: '常规操作',
  medium: '敏感操作',
  high: '高风险操作',
}

export interface AiConfirmationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  state?: AiConfirmationState
  risk?: AiConfirmationRisk
  title: React.ReactNode
  description?: React.ReactNode
  /** Optional tool name or command preview */
  command?: string
  approveLabel?: string
  rejectLabel?: string
  onApprove?: () => void
  onReject?: () => void
}

export function AiConfirmation({
  state = 'requested',
  risk = 'medium',
  title,
  description,
  command,
  approveLabel = '批准执行',
  rejectLabel = '拒绝',
  onApprove,
  onReject,
  className,
  children,
  ...props
}: AiConfirmationProps) {
  const hue: Hue =
    state === 'approved' ? 'mint' : state === 'rejected' ? 'rose' : RISK_HUE[risk]
  const palette = HUE_PALETTES[hue]

  return (
    <div
      data-state={state}
      data-risk={risk}
      className={cn('flex w-full flex-col gap-3 rounded-inner p-4', className)}
      style={{ backgroundColor: palette[50], color: palette[900] }}
      {...props}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <span
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: palette[100], color: palette[700] }}
          >
            {state === 'approved' ? (
              <ShieldCheck size={17} weight="duotone" />
            ) : (
              <ShieldWarning size={17} weight="duotone" />
            )}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-glaze-display text-[14px] font-extrabold">{title}</span>
              <span
                className="rounded-full px-2 py-0.5 text-[10.5px] font-bold"
                style={{ backgroundColor: palette[100], color: palette[700] }}
              >
                {RISK_LABEL[risk]}
              </span>
            </div>
            {description && (
              <p className="m-0 mt-0.5 text-[12.5px] leading-relaxed" style={{ color: palette[700] }}>
                {description}
              </p>
            )}
          </div>
        </div>

        {state === 'approved' && <StatusPill status="normal" label="已批准" size="sm" />}
        {state === 'rejected' && <StatusPill status="error" label="已拒绝" size="sm" />}
        {state === 'requested' && <StatusPill status="warning" label="等待确认" size="sm" />}
      </div>

      {command && (
        <pre className="m-0 overflow-x-auto rounded-[12px] bg-white/85 px-3 py-2 font-glaze-mono text-[12px] text-[#1B1F27]">
          <code>{command}</code>
        </pre>
      )}

      {children}

      {state === 'requested' && (onApprove || onReject) && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {onReject && (
            <Button size="sm" variant="secondary" onClick={onReject}>
              <X size={13} weight="bold" />
              <span>{rejectLabel}</span>
            </Button>
          )}
          {onApprove && (
            <Button
              size="sm"
              variant={risk === 'high' ? 'dark-on-coral' : 'primary'}
              onClick={onApprove}
            >
              <Check size={13} weight="bold" />
              <span>{approveLabel}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
```
