import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import {
  CaretDown,
  CheckCircle,
  Circle,
  CircleNotch,
  ListChecks,
  MinusCircle,
  WarningCircle,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Progress } from '@/components/ui/progress'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Hue } from '@/lib/tokens'

export type AiPlanStepStatus = 'pending' | 'running' | 'done' | 'skipped' | 'error'

export interface AiPlanStepItem {
  id: string
  title: string
  detail?: string
  status: AiPlanStepStatus
  duration?: string
}

export interface AiPlanProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}

export function AiPlan({
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  children,
}: AiPlanProps) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn('w-full rounded-inner bg-[#F6F7F9] p-4', className)}
    >
      {children}
    </BaseCollapsible.Root>
  )
}

export interface AiPlanHeaderProps {
  title: React.ReactNode
  description?: React.ReactNode
  completed?: number
  total?: number
  hue?: Hue
  streaming?: boolean
  className?: string
}

export function AiPlanHeader({
  title,
  description,
  completed,
  total,
  hue = 'periwinkle',
  streaming = false,
  className,
}: AiPlanHeaderProps) {
  const palette = HUE_PALETTES[hue]
  const pct =
    completed !== undefined && total && total > 0 ? Math.round((completed / total) * 100) : null

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <BaseCollapsible.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-3 text-left outline-none">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: palette[100], color: palette[700] }}
          >
            <ListChecks size={15} weight="bold" />
          </span>
          <div className="min-w-0">
            <div
              className={cn(
                'truncate font-glaze-display text-[14px] font-extrabold text-[#1B1F27]',
                streaming && 'animate-glaze-shimmer',
              )}
            >
              {title}
            </div>
            {description && (
              <div className="truncate text-[12px] text-[#6B7280]">{description}</div>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {completed !== undefined && total !== undefined && (
            <span
              className="rounded-full px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold"
              style={{ backgroundColor: palette[100], color: palette[700] }}
            >
              {completed}/{total}
            </span>
          )}
          <CaretDown
            size={14}
            weight="bold"
            className="text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
          />
        </div>
      </BaseCollapsible.Trigger>
      {pct !== null && <Progress value={pct} hue={hue} height="sm" />}
    </div>
  )
}

export interface AiPlanContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AiPlanContent({ className, children, ...props }: AiPlanContentProps) {
  return (
    <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
      <div className={cn('mt-3 flex flex-col gap-1.5', className)} {...props}>
        {children}
      </div>
    </BaseCollapsible.Panel>
  )
}

export interface AiPlanStepProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  detail?: React.ReactNode
  status?: AiPlanStepStatus
  duration?: string
}

export function AiPlanStep({
  title,
  detail,
  status = 'pending',
  duration,
  className,
  ...props
}: AiPlanStepProps) {
  const icon =
    status === 'done' ? (
      <CheckCircle size={15} weight="fill" style={{ color: SEMANTIC_TOKENS.normal.dot }} />
    ) : status === 'running' ? (
      <CircleNotch
        size={15}
        weight="bold"
        className="animate-spin"
        style={{ color: HUE_PALETTES.periwinkle[500] }}
      />
    ) : status === 'error' ? (
      <WarningCircle size={15} weight="fill" style={{ color: SEMANTIC_TOKENS.error.dot }} />
    ) : status === 'skipped' ? (
      <MinusCircle size={15} weight="fill" className="text-[#CDD3DD]" />
    ) : (
      <Circle size={14} weight="bold" className="text-[#CDD3DD]" />
    )

  return (
    <div
      data-status={status}
      className={cn(
        'flex items-start gap-2.5 rounded-[12px] px-3 py-2 transition-colors',
        status === 'running' ? 'bg-white' : 'bg-transparent',
        status === 'skipped' && 'opacity-55',
        className,
      )}
      {...props}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'text-[13px] font-semibold',
              status === 'done'
                ? 'text-[#5B6170] line-through decoration-[#CDD3DD]'
                : 'text-[#1B1F27]',
              status === 'running' && 'text-[#262B7A]',
            )}
          >
            {title}
          </span>
          {duration && (
            <span className="shrink-0 font-glaze-mono text-[11px] text-[#8A90A0]">{duration}</span>
          )}
        </div>
        {detail && <div className="mt-0.5 text-[12px] text-[#6B7280]">{detail}</div>}
      </div>
    </div>
  )
}

export interface AiPlanFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AiPlanFooter({ className, ...props }: AiPlanFooterProps) {
  return (
    <div
      className={cn('mt-3 flex flex-wrap items-center justify-end gap-2 pt-2', className)}
      {...props}
    />
  )
}
