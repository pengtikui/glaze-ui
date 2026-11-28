import * as React from 'react'
import { CheckCircle, Circle, CircleNotch, Sparkle } from '@phosphor-icons/react'
import { cn } from 'cn'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Hue } from '@/lib/tokens'
import { PRESS_CLASS } from '@/lib/motion'

export interface AiSuggestionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Wrap chips across lines or scroll horizontally */
  layout?: 'wrap' | 'scroll'
}

export function AiSuggestions({
  layout = 'wrap',
  className,
  ...props
}: AiSuggestionsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        layout === 'wrap' ? 'flex-wrap' : 'flex-nowrap overflow-x-auto pb-1',
        className,
      )}
      {...props}
    />
  )
}

export interface AiSuggestionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onSelect'> {
  suggestion: string
  onSelect?: (suggestion: string) => void
  icon?: React.ReactNode
  hue?: Hue
  /** Soft neutral or tinted pastel chip */
  variant?: 'neutral' | 'tinted'
}

export function AiSuggestion({
  suggestion,
  onSelect,
  icon,
  hue = 'periwinkle',
  variant = 'neutral',
  className,
  children,
  ...props
}: AiSuggestionProps) {
  const palette = HUE_PALETTES[hue]
  return (
    <button
      type="button"
      onClick={() => onSelect?.(suggestion)}
      className={cn(
        'inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold outline-none',
        PRESS_CLASS,
        variant === 'neutral' &&
          'bg-[#F6F7F9] text-[#1B1F27] hover:bg-[#E8EBF0]',
        variant === 'tinted' && 'hover:brightness-[0.96]',
        className,
      )}
      style={
        variant === 'tinted'
          ? { backgroundColor: palette[100], color: palette[700] }
          : undefined
      }
      {...props}
    >
      <span
        className="shrink-0"
        style={{ color: variant === 'tinted' ? palette[700] : palette[500] }}
      >
        {icon ?? <Sparkle size={13} weight="duotone" />}
      </span>
      <span>{children ?? suggestion}</span>
    </button>
  )
}

export interface AiQueueTask {
  id: string
  title: string
  meta?: string
  status: 'pending' | 'running' | 'completed'
}

export interface AiQueueProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AiQueueTask[]
  title?: string
  showCompleted?: boolean
}

export function AiQueue({
  items,
  title = 'Agent 任务队列',
  showCompleted = true,
  className,
  ...props
}: AiQueueProps) {
  const remaining = items.filter((i) => i.status !== 'completed')
  const completed = items.filter((i) => i.status === 'completed')

  return (
    <div
      className={cn('flex w-full flex-col gap-3 rounded-inner bg-[#F6F7F9] p-3.5', className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-glaze-display text-[13.5px] font-extrabold text-[#1B1F27]">
          {title}
        </span>
        <span className="rounded-full bg-white px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold text-[#4A4FB8]">
          {completed.length}/{items.length}
        </span>
      </div>

      {remaining.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="px-1 text-[10.5px] font-bold tracking-[0.04em] text-[#8A90A0] uppercase">
            待执行 ({remaining.length})
          </span>
          {remaining.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center justify-between gap-2 rounded-[10px] px-2.5 py-1.5 text-[12.5px]',
                item.status === 'running' ? 'bg-white font-semibold text-[#262B7A]' : 'text-[#1B1F27]',
              )}
            >
              <div className="flex min-w-0 items-center gap-2">
                {item.status === 'running' ? (
                  <CircleNotch
                    size={14}
                    weight="bold"
                    className="shrink-0 animate-spin text-[#7B80EA]"
                  />
                ) : (
                  <Circle size={13} weight="bold" className="shrink-0 text-[#CDD3DD]" />
                )}
                <span className="truncate">{item.title}</span>
              </div>
              {item.meta && (
                <span className="shrink-0 font-glaze-mono text-[11px] text-[#8A90A0]">
                  {item.meta}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {showCompleted && completed.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="px-1 text-[10.5px] font-bold tracking-[0.04em] text-[#8A90A0] uppercase">
            已完成 ({completed.length})
          </span>
          {completed.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 rounded-[10px] px-2.5 py-1 text-[12px] text-[#6B7280]"
            >
              <div className="flex min-w-0 items-center gap-2">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="shrink-0"
                  style={{ color: SEMANTIC_TOKENS.normal.dot }}
                />
                <span className="truncate line-through decoration-[#CDD3DD]">{item.title}</span>
              </div>
              {item.meta && (
                <span className="shrink-0 font-glaze-mono text-[10.5px] text-[#8A90A0]">
                  {item.meta}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
