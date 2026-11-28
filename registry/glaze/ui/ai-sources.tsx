import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { ArrowUpRight, BookOpen, CaretDown, Globe } from '@phosphor-icons/react'
import { cn } from 'cn'
import { PreviewCard } from '@/components/ui/preview-card'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export interface AiSourceEntry {
  id: string
  title: string
  url: string
  domain?: string
  snippet?: string
  score?: number
  hue?: Hue
}

export interface AiSourcesProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}

export function AiSources({
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  children,
}: AiSourcesProps) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn('w-full rounded-inner bg-[#F6F7F9] px-3.5 py-2.5', className)}
    >
      {children}
    </BaseCollapsible.Root>
  )
}

export interface AiSourcesTriggerProps {
  count: number
  label?: string
  className?: string
}

export function AiSourcesTrigger({ count, label, className }: AiSourcesTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      className={cn(
        'group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DDF0FB] text-[#24557F]">
          <BookOpen size={13} weight="duotone" />
        </span>
        <span className="text-[12.5px] font-bold text-[#1B1F27]">
          {label ?? `引用了 ${count} 个参考来源`}
        </span>
      </div>
      <CaretDown
        size={14}
        weight="bold"
        className="text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
      />
    </BaseCollapsible.Trigger>
  )
}

export interface AiSourcesContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AiSourcesContent({ className, children, ...props }: AiSourcesContentProps) {
  return (
    <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
      <div className={cn('mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2', className)} {...props}>
        {children}
      </div>
    </BaseCollapsible.Panel>
  )
}

export interface AiSourceItemProps {
  title: string
  url: string
  domain?: string
  snippet?: string
  score?: number
  hue?: Hue
  className?: string
}

export function AiSourceItem({
  title,
  url,
  domain,
  snippet,
  score,
  hue = 'sky',
  className,
}: AiSourceItemProps) {
  const palette = HUE_PALETTES[hue]
  const resolvedDomain =
    domain ??
    (() => {
      try {
        return new URL(url).hostname.replace(/^www\./, '')
      } catch {
        return url
      }
    })()

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex flex-col justify-between gap-1.5 rounded-[14px] bg-white p-3 no-underline transition-colors hover:bg-[#FAFBFD]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px]"
            style={{ backgroundColor: palette[100], color: palette[700] }}
          >
            <Globe size={11} weight="bold" />
          </span>
          <span className="truncate font-glaze-mono text-[11px] font-semibold text-[#6B7280]">
            {resolvedDomain}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {score !== undefined && (
            <span
              className="rounded-full px-1.5 py-0.5 font-glaze-mono text-[10px] font-bold"
              style={{ backgroundColor: palette[50], color: palette[700] }}
            >
              {Math.round(score * 100)}%
            </span>
          )}
          <ArrowUpRight
            size={13}
            weight="bold"
            className="text-[#8A90A0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#123A5C]"
          />
        </div>
      </div>
      <div className="line-clamp-1 text-[13px] font-bold text-[#1B1F27]">{title}</div>
      {snippet && (
        <p className="m-0 line-clamp-2 text-[11.5px] leading-relaxed text-[#6B7280]">{snippet}</p>
      )}
    </a>
  )
}

export interface InlineCitationProps {
  /** Citation index or short label, e.g. `1` or `docs` */
  index: number | string
  title: string
  url: string
  domain?: string
  snippet?: string
  hue?: Hue
  className?: string
}

export function InlineCitation({
  index,
  title,
  url,
  domain,
  snippet,
  hue = 'periwinkle',
  className,
}: InlineCitationProps) {
  const palette = HUE_PALETTES[hue]
  const resolvedDomain =
    domain ??
    (() => {
      try {
        return new URL(url).hostname.replace(/^www\./, '')
      } catch {
        return url
      }
    })()

  return (
    <PreviewCard
      className="w-72"
      trigger={
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'mx-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 align-baseline font-glaze-mono text-[10.5px] font-bold no-underline transition-opacity hover:opacity-80',
            className,
          )}
          style={{ backgroundColor: palette[100], color: palette[700] }}
        >
          {index}
        </a>
      }
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span
            className="rounded-full px-2 py-0.5 font-glaze-mono text-[10.5px] font-bold"
            style={{ backgroundColor: palette[50], color: palette[700] }}
          >
            {resolvedDomain}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#4A4FB8] no-underline hover:underline"
          >
            <span>查看</span>
            <ArrowUpRight size={11} weight="bold" />
          </a>
        </div>
        <div className="text-[13px] font-bold text-[#1B1F27]">{title}</div>
        {snippet && <p className="m-0 text-[12px] leading-relaxed text-[#6B7280]">{snippet}</p>}
      </div>
    </PreviewCard>
  )
}
