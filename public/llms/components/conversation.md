# Conversation (AI 对话流与消息)

> 支持自动贴底滚动、回到底部悬浮胶囊、角色消息气泡、多版本分支切换与一键复制/点赞操作栏的 AI 对话原语。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/conversation
```

- **Registry JSON**: `/r/conversation.json`
- **Import Path**: `@/components/ui/conversation`
- **Exports**: `useConversation`, `Conversation`, `ConversationContent`, `ConversationEmptyState`, `ConversationScrollButton`, `Message`, `MessageAvatar`, `MessageContent`, `MessageActions`, `MessageAction`, `MessageQuickToolbar`, `MessageBranch`
- **NPM Dependencies**: `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`, `@glaze/tokens`

## API Reference

### useConversation

Inherits standard Base UI / HTML element props.

### Conversation

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `autoScroll?` | `boolean` | `true` | Automatically stick to bottom when children update and user is near bottom |

### ConversationContent

Extends: `React.HTMLAttributes<HTMLDivElement>`

Inherits standard Base UI / HTML element props.

### ConversationEmptyState

Extends: `Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon?` | `React.ReactNode` | — | — |
| `title?` | `React.ReactNode` | `'开始一段新对话'` | — |
| `description?` | `React.ReactNode` | `'输入问题、粘贴代码或从下方快捷提示开始协作。'` | — |
| `hue?` | `Hue` | `'periwinkle'` | — |

### ConversationScrollButton

Extends: `React.ButtonHTMLAttributes<HTMLButtonElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `forceVisible?` | `boolean` | `false` | Force visibility regardless of scroll state (useful for previews) |

### Message

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `from` | `MessageRole` | — | — |

### MessageAvatar

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `from?` | `MessageRole` | `'assistant'` | — |
| `hue?` | `Hue` | — | — |
| `label?` | `string` | — | — |
| `icon?` | `React.ReactNode` | — | — |

### MessageContent

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `from?` | `MessageRole` | `'assistant'` | — |
| `variant?` | `'flat' \| 'bubble' \| 'tinted'` | — | Surface appearance override |
| `hue?` | `Hue` | `'periwinkle'` | — |

### MessageActions

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `alwaysVisible?` | `boolean` | `true` | Always show actions instead of fading in on hover |

### MessageAction

Extends: `React.ButtonHTMLAttributes<HTMLButtonElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | — |
| `active?` | `boolean` | `false` | — |

### MessageQuickToolbar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `textToCopy?` | `string` | — | — |
| `onRegenerate?` | `() => void` | — | — |
| `onFeedback?` | `(value: 'up' \| 'down' \| null) => void` | — | — |
| `className?` | `string` | — | — |

### MessageBranch

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `current` | `number` | — | — |
| `total` | `number` | — | — |
| `onChange` | `(nextIndex: number) => void` | — | — |
| `className?` | `string` | — | — |

### Supporting Types

#### `ConversationContextValue`

| Property | Type | Required |
| --- | --- | --- |
| `scrollRef` | `React.RefObject<HTMLDivElement \| null>` | Yes |
| `isAtBottom` | `boolean` | Yes |
| `scrollToBottom` | `(behavior?: ScrollBehavior) => void` | Yes |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-at-bottom` | 对话流滚动区当前处于底部 |
| `data-role` | 消息发送者角色（user | assistant | system） |
| `data-active` | 消息快捷操作按钮处于激活态 |

### CSS Variables

- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import {
  ArrowDown,
  ArrowsClockwise,
  CaretLeft,
  CaretRight,
  Check,
  Copy,
  Robot,
  Sparkle,
  ThumbsDown,
  ThumbsUp,
  User,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'
import { PRESS_CLASS } from '@/lib/motion'

interface ConversationContextValue {
  scrollRef: React.RefObject<HTMLDivElement | null>
  isAtBottom: boolean
  scrollToBottom: (behavior?: ScrollBehavior) => void
}

const ConversationContext = React.createContext<ConversationContextValue | null>(null)

export function useConversation() {
  return React.useContext(ConversationContext)
}

export interface ConversationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Automatically stick to bottom when children update and user is near bottom */
  autoScroll?: boolean
}

export function Conversation({
  autoScroll = true,
  className,
  children,
  ...props
}: ConversationProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = React.useState(true)

  const checkBottom = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const threshold = 48
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
    setIsAtBottom(atBottom)
  }, [])

  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
    setIsAtBottom(true)
  }, [])

  React.useEffect(() => {
    if (!autoScroll || !isAtBottom) return
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [children, autoScroll, isAtBottom])

  const value = React.useMemo(
    () => ({ scrollRef, isAtBottom, scrollToBottom }),
    [isAtBottom, scrollToBottom],
  )

  return (
    <ConversationContext.Provider value={value}>
      <div
        data-at-bottom={isAtBottom ? '' : undefined}
        className={cn('relative flex min-h-0 flex-1 flex-col overflow-hidden', className)}
        {...props}
      >
        <div
          ref={scrollRef}
          onScroll={checkBottom}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto scroll-smooth"
        >
          {children}
        </div>
      </div>
    </ConversationContext.Provider>
  )
}

export interface ConversationContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ConversationContent({ className, ...props }: ConversationContentProps) {
  return (
    <div
      className={cn('mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5 sm:px-6', className)}
      {...props}
    />
  )
}

export interface ConversationEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  hue?: Hue
}

export function ConversationEmptyState({
  icon,
  title = '开始一段新对话',
  description = '输入问题、粘贴代码或从下方快捷提示开始协作。',
  hue = 'periwinkle',
  className,
  children,
  ...props
}: ConversationEmptyStateProps) {
  const palette = HUE_PALETTES[hue]
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-3 px-6 py-12 text-center',
        className,
      )}
      {...props}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[18px]"
        style={{ backgroundColor: palette[100], color: palette[700] }}
      >
        {icon ?? <Sparkle size={26} weight="duotone" />}
      </div>
      <div className="flex max-w-md flex-col gap-1">
        <h3 className="m-0 font-glaze-display text-[19px] font-extrabold text-[#123A5C]">
          {title}
        </h3>
        {description && (
          <p className="m-0 text-[13.5px] leading-relaxed text-[#6B7280]">{description}</p>
        )}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  )
}

export interface ConversationScrollButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Force visibility regardless of scroll state (useful for previews) */
  forceVisible?: boolean
}

export function ConversationScrollButton({
  forceVisible = false,
  className,
  onClick,
  ...props
}: ConversationScrollButtonProps) {
  const ctx = useConversation()
  const visible = forceVisible || (ctx ? !ctx.isAtBottom : false)
  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="滚动至最新消息"
      onClick={(e) => {
        ctx?.scrollToBottom('smooth')
        onClick?.(e)
      }}
      className={cn(
        'absolute bottom-4 left-1/2 z-20 inline-flex h-9 -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-full border border-[#E8EBF0] bg-white px-3.5 text-[12px] font-semibold text-[#1B1F27] shadow-[0_8px_20px_rgba(18,58,92,0.10)] outline-none hover:bg-[#F6F7F9]',
        PRESS_CLASS,
        className,
      )}
      {...props}
    >
      <ArrowDown size={14} weight="bold" />
      <span>回到底部</span>
    </button>
  )
}

export type MessageRole = 'user' | 'assistant' | 'system'

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: MessageRole
}

export function Message({ from, className, children, ...props }: MessageProps) {
  return (
    <div
      data-role={from}
      className={cn(
        'group/message flex w-full gap-3',
        from === 'user' && 'flex-row-reverse',
        from === 'system' && 'justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface MessageAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: MessageRole
  hue?: Hue
  label?: string
  icon?: React.ReactNode
}

export function MessageAvatar({
  from = 'assistant',
  hue,
  label,
  icon,
  className,
  ...props
}: MessageAvatarProps) {
  const resolvedHue: Hue = hue ?? (from === 'user' ? 'sky' : 'periwinkle')
  const palette = HUE_PALETTES[resolvedHue]

  return (
    <div
      aria-label={label ?? (from === 'user' ? '用户' : 'AI 助手')}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold select-none',
        className,
      )}
      style={{
        backgroundColor: from === 'user' ? '#123A5C' : palette[100],
        color: from === 'user' ? '#FFFFFF' : palette[700],
      }}
      {...props}
    >
      {icon ??
        (label ? (
          <span>{label.slice(0, 2)}</span>
        ) : from === 'user' ? (
          <User size={15} weight="bold" />
        ) : (
          <Robot size={16} weight="duotone" />
        ))}
    </div>
  )
}

export interface MessageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: MessageRole
  /** Surface appearance override */
  variant?: 'flat' | 'bubble' | 'tinted'
  hue?: Hue
}

export function MessageContent({
  from = 'assistant',
  variant,
  hue = 'periwinkle',
  className,
  children,
  ...props
}: MessageContentProps) {
  const resolvedVariant = variant ?? (from === 'user' ? 'bubble' : 'flat')
  const palette = HUE_PALETTES[hue]

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-2.5 text-[14px] leading-relaxed',
        from === 'user' ? 'max-w-[82%] items-end' : 'max-w-full flex-1 items-start',
        resolvedVariant === 'bubble' &&
          'rounded-inner bg-[#1B1F27] px-4 py-3 text-white',
        resolvedVariant === 'tinted' && 'rounded-inner px-4 py-3',
        resolvedVariant === 'flat' && 'text-[#1B1F27]',
        className,
      )}
      style={
        resolvedVariant === 'tinted'
          ? { backgroundColor: palette[50], color: palette[900] }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  )
}

export interface MessageActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Always show actions instead of fading in on hover */
  alwaysVisible?: boolean
}

export function MessageActions({
  alwaysVisible = true,
  className,
  ...props
}: MessageActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1 pt-0.5 transition-opacity duration-150',
        !alwaysVisible && 'opacity-0 group-hover/message:opacity-100 focus-within:opacity-100',
        className,
      )}
      {...props}
    />
  )
}

export interface MessageActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
}

export function MessageAction({
  label,
  active = false,
  className,
  children,
  ...props
}: MessageActionProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      data-active={active ? '' : undefined}
      className={cn(
        'inline-flex h-7 cursor-pointer items-center gap-1 rounded-full px-2 text-[12px] font-medium outline-none',
        PRESS_CLASS,
        active
          ? 'bg-[#E4E6FD] text-[#262B7A]'
          : 'bg-transparent text-[#6B7280] hover:bg-[#F2F3F5] hover:text-[#1B1F27]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export interface MessageQuickToolbarProps {
  textToCopy?: string
  onRegenerate?: () => void
  onFeedback?: (value: 'up' | 'down' | null) => void
  className?: string
}

export function MessageQuickToolbar({
  textToCopy,
  onRegenerate,
  onFeedback,
  className,
}: MessageQuickToolbarProps) {
  const [copied, setCopied] = React.useState(false)
  const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null)

  const handleCopy = () => {
    if (textToCopy) {
      navigator.clipboard?.writeText(textToCopy).catch(() => {})
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const toggleFeedback = (next: 'up' | 'down') => {
    const value = feedback === next ? null : next
    setFeedback(value)
    onFeedback?.(value)
  }

  return (
    <MessageActions className={className}>
      {textToCopy !== undefined && (
        <MessageAction label={copied ? '已复制' : '复制回复'} active={copied} onClick={handleCopy}>
          {copied ? <Check size={13} weight="bold" /> : <Copy size={13} />}
          <span>{copied ? '已复制' : '复制'}</span>
        </MessageAction>
      )}
      {onRegenerate && (
        <MessageAction label="重新生成" onClick={onRegenerate}>
          <ArrowsClockwise size={13} />
          <span>重试</span>
        </MessageAction>
      )}
      <MessageAction
        label="有帮助"
        active={feedback === 'up'}
        onClick={() => toggleFeedback('up')}
      >
        <ThumbsUp size={13} weight={feedback === 'up' ? 'fill' : 'regular'} />
      </MessageAction>
      <MessageAction
        label="需改进"
        active={feedback === 'down'}
        onClick={() => toggleFeedback('down')}
      >
        <ThumbsDown size={13} weight={feedback === 'down' ? 'fill' : 'regular'} />
      </MessageAction>
    </MessageActions>
  )
}

export interface MessageBranchProps {
  current: number
  total: number
  onChange: (nextIndex: number) => void
  className?: string
}

export function MessageBranch({ current, total, onChange, className }: MessageBranchProps) {
  if (total <= 1) return null
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full bg-[#F6F7F9] px-1 py-0.5 text-[11px] font-semibold text-[#5B6170]',
        className,
      )}
    >
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onChange(Math.max(1, current - 1))}
        aria-label="上一版本"
        className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-white disabled:pointer-events-none disabled:opacity-40"
      >
        <CaretLeft size={11} weight="bold" />
      </button>
      <span className="px-1 font-glaze-mono tabular-nums">
        {current} / {total}
      </span>
      <button
        type="button"
        disabled={current >= total}
        onClick={() => onChange(Math.min(total, current + 1))}
        aria-label="下一版本"
        className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-white disabled:pointer-events-none disabled:opacity-40"
      >
        <CaretRight size={11} weight="bold" />
      </button>
    </div>
  )
}
```
