import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import {
  CaretDown,
  CheckCircle,
  Circle,
  CircleNotch,
  Globe,
  Path,
  WarningCircle,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Hue } from '@/lib/tokens'

export type ChainStepStatus = 'complete' | 'active' | 'pending' | 'error'

export interface ChainOfThoughtProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}

export function ChainOfThought({
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  children,
}: ChainOfThoughtProps) {
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

export interface ChainOfThoughtHeaderProps {
  children?: React.ReactNode
  badge?: React.ReactNode
  className?: string
}

export function ChainOfThoughtHeader({
  children = '思维链执行轨迹',
  badge,
  className,
}: ChainOfThoughtHeaderProps) {
  return (
    <BaseCollapsible.Trigger
      className={cn(
        'group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E4E6FD] text-[#4A4FB8]">
          <Path size={14} weight="bold" />
        </span>
        <span className="truncate text-[13px] font-bold text-[#1B1F27]">{children}</span>
        {badge}
      </div>
      <CaretDown
        size={14}
        weight="bold"
        className="shrink-0 text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
      />
    </BaseCollapsible.Trigger>
  )
}

export interface ChainOfThoughtContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChainOfThoughtContent({
  className,
  children,
  ...props
}: ChainOfThoughtContentProps) {
  return (
    <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
      <div className={cn('mt-3 flex flex-col gap-3', className)} {...props}>
        {children}
      </div>
    </BaseCollapsible.Panel>
  )
}

export interface ChainOfThoughtStepProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  description?: React.ReactNode
  status?: ChainStepStatus
  icon?: React.ReactNode
  duration?: string
}

export function ChainOfThoughtStep({
  label,
  description,
  status = 'complete',
  icon,
  duration,
  className,
  children,
  ...props
}: ChainOfThoughtStepProps) {
  const statusIcon =
    icon ??
    (status === 'complete' ? (
      <CheckCircle size={15} weight="fill" style={{ color: SEMANTIC_TOKENS.normal.dot }} />
    ) : status === 'active' ? (
      <CircleNotch
        size={15}
        weight="bold"
        className="animate-spin"
        style={{ color: HUE_PALETTES.periwinkle[500] }}
      />
    ) : status === 'error' ? (
      <WarningCircle size={15} weight="fill" style={{ color: SEMANTIC_TOKENS.error.dot }} />
    ) : (
      <Circle size={14} weight="bold" className="text-[#CDD3DD]" />
    ))

  return (
    <div
      data-status={status}
      className={cn(
        'relative flex gap-2.5 pl-0.5',
        status === 'pending' && 'opacity-60',
        className,
      )}
      {...props}
    >
      <div className="relative flex flex-col items-center">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
          {statusIcon}
        </span>
        <span
          aria-hidden="true"
          className="mt-1 w-[1.5px] flex-1 rounded-full bg-[#E8EBF0] last:hidden"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 pb-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'text-[13px] font-semibold text-[#1B1F27]',
              status === 'active' && 'animate-glaze-shimmer',
            )}
          >
            {label}
          </span>
          {duration && (
            <span className="shrink-0 font-glaze-mono text-[11px] text-[#8A90A0]">{duration}</span>
          )}
        </div>
        {description && (
          <p className="m-0 text-[12px] leading-relaxed text-[#6B7280]">{description}</p>
        )}
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  )
}

export interface ChainOfThoughtSearchResultsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChainOfThoughtSearchResults({
  className,
  ...props
}: ChainOfThoughtSearchResultsProps) {
  return <div className={cn('flex flex-wrap items-center gap-1.5', className)} {...props} />
}

export interface ChainOfThoughtSearchResultProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  hue?: Hue
}

export function ChainOfThoughtSearchResult({
  hue = 'sky',
  className,
  children,
  ...props
}: ChainOfThoughtSearchResultProps) {
  const palette = HUE_PALETTES[hue]
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold no-underline transition-opacity hover:opacity-80',
        className,
      )}
      style={{ backgroundColor: palette[100], color: palette[700] }}
      {...props}
    >
      <Globe size={11} weight="bold" />
      <span>{children}</span>
    </a>
  )
}
