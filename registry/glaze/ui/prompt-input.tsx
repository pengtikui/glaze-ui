import * as React from 'react'
import {
  ArrowUp,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Stop,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'
import { PRESS_CLASS } from '@/lib/motion'

export type PromptInputStatus = 'ready' | 'submitted' | 'streaming' | 'error'

export interface PromptAttachmentItem {
  id: string
  name: string
  size?: string
  kind?: 'file' | 'image' | 'code'
  hue?: Hue
}

export interface PromptInputProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  /** Visual surface: white (on #F2F4F8 canvas) or soft (inside a white Tile) */
  surface?: 'white' | 'soft'
}

export function PromptInput({
  onSubmit,
  surface = 'white',
  className,
  children,
  ...props
}: PromptInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(e)
      }}
      className={cn(
        'flex w-full flex-col gap-2 rounded-tile p-3 transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        surface === 'white'
          ? 'bg-white focus-within:ring-2 focus-within:ring-[#7B80EA]'
          : 'bg-[#F6F7F9] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#7B80EA]',
        className,
      )}
      {...props}
    >
      {children}
    </form>
  )
}

export interface PromptInputAttachmentsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: PromptAttachmentItem[]
  onRemove?: (id: string) => void
}

export function PromptInputAttachments({
  items,
  onRemove,
  className,
  ...props
}: PromptInputAttachmentsProps) {
  if (!items.length) return null
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5 px-1.5 pt-0.5', className)} {...props}>
      {items.map((item) => {
        const palette = HUE_PALETTES[item.hue ?? (item.kind === 'image' ? 'lilac' : 'sky')]
        return (
          <div
            key={item.id}
            className="inline-flex max-w-[220px] items-center gap-1.5 rounded-full py-1 pr-2 pl-2.5 text-[12px] font-semibold"
            style={{ backgroundColor: palette[50], color: palette[900] }}
          >
            <span style={{ color: palette[700] }} className="shrink-0">
              {item.kind === 'image' ? (
                <ImageIcon size={13} weight="duotone" />
              ) : (
                <FileText size={13} weight="duotone" />
              )}
            </span>
            <span className="truncate">{item.name}</span>
            {item.size && (
              <span className="shrink-0 text-[10.5px] opacity-65">{item.size}</span>
            )}
            {onRemove && (
              <button
                type="button"
                aria-label={`移除附件 ${item.name}`}
                onClick={() => onRemove(item.id)}
                className="ml-0.5 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-black/10"
              >
                <X size={10} weight="bold" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export interface PromptInputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Submit parent form on Enter (Shift+Enter inserts newline) */
  submitOnEnter?: boolean
  maxRows?: number
}

export const PromptInputTextarea = React.forwardRef<HTMLTextAreaElement, PromptInputTextareaProps>(
  function PromptInputTextarea(
    {
      submitOnEnter = true,
      maxRows = 6,
      rows = 1,
      className,
      onKeyDown,
      onChange,
      value,
      placeholder = '向智能体提问，Enter 发送，Shift + Enter 换行…',
      ...props
    },
    ref,
  ) {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const resize = React.useCallback(() => {
      const el = innerRef.current
      if (!el) return
      el.style.height = 'auto'
      const lineHeight = 22
      const maxHeight = maxRows * lineHeight + 16
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
    }, [maxRows])

    React.useEffect(() => {
      resize()
    }, [value, resize])

    return (
      <textarea
        ref={setRefs}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          resize()
          onChange?.(e)
        }}
        onKeyDown={(e) => {
          if (
            submitOnEnter &&
            e.key === 'Enter' &&
            !e.shiftKey &&
            !e.nativeEvent.isComposing
          ) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }
          onKeyDown?.(e)
        }}
        className={cn(
          'w-full resize-none border-0 bg-transparent px-2.5 py-1.5 text-[14px] leading-[22px] text-[#1B1F27] outline-none placeholder:text-[#8A90A0]',
          className,
        )}
        {...props}
      />
    )
  },
)

export interface PromptInputToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PromptInputToolbar({ className, ...props }: PromptInputToolbarProps) {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-between gap-2 px-1', className)}
      {...props}
    />
  )
}

export interface PromptInputToolsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PromptInputTools({ className, ...props }: PromptInputToolsProps) {
  return <div className={cn('flex flex-wrap items-center gap-1.5', className)} {...props} />
}

export interface PromptInputActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  hue?: Hue
  icon?: React.ReactNode
}

export function PromptInputAction({
  active = false,
  hue = 'periwinkle',
  icon,
  className,
  children,
  ...props
}: PromptInputActionProps) {
  const palette = HUE_PALETTES[hue]
  return (
    <button
      type="button"
      data-active={active ? '' : undefined}
      className={cn(
        'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold outline-none',
        PRESS_CLASS,
        !active && 'bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
        className,
      )}
      style={active ? { backgroundColor: palette[100], color: palette[700] } : undefined}
      {...props}
    >
      {icon ?? (children ? null : <Paperclip size={14} weight="bold" />)}
      {children}
    </button>
  )
}

export interface PromptInputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: PromptInputStatus
  onStop?: () => void
}

export function PromptInputSubmit({
  status = 'ready',
  onStop,
  disabled,
  className,
  onClick,
  ...props
}: PromptInputSubmitProps) {
  const isRunning = status === 'streaming' || status === 'submitted'
  const isError = status === 'error'

  return (
    <button
      type={isRunning ? 'button' : 'submit'}
      disabled={!isRunning && disabled}
      aria-label={isRunning ? '停止生成' : '发送消息'}
      onClick={(e) => {
        if (isRunning && onStop) {
          e.preventDefault()
          onStop()
          return
        }
        onClick?.(e)
      }}
      className={cn(
        'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none disabled:pointer-events-none disabled:opacity-40',
        PRESS_CLASS,
        isRunning && 'bg-[#123A5C] text-white hover:bg-[#194A73]',
        isError && 'bg-[#FDE5DC] text-[#A6360F] hover:bg-[#F7B39C]/70',
        !isRunning && !isError && 'bg-[#1B1F27] text-white hover:bg-[#2B313D]',
        className,
      )}
      {...props}
    >
      {isRunning ? (
        <Stop size={15} weight="fill" />
      ) : isError ? (
        <WarningCircle size={16} weight="bold" />
      ) : (
        <ArrowUp size={16} weight="bold" />
      )}
    </button>
  )
}
