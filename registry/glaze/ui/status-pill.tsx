import * as React from 'react'
import { cn } from 'cn'
import { SEMANTIC_TOKENS, type Status } from '@/lib/tokens'

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: Status
  label?: string
  showDot?: boolean
  size?: 'sm' | 'md'
}

export function StatusPill({
  status,
  label,
  showDot = true,
  size = 'md',
  className,
  children,
  ...props
}: StatusPillProps) {
  const token = SEMANTIC_TOKENS[status]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold whitespace-nowrap select-none',
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-[12px]',
        className,
      )}
      style={{ backgroundColor: token.pillBg, color: token.ink }}
      {...props}
    >
      {showDot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: token.dot }}
        />
      )}
      {children ?? label ?? token.label}
    </span>
  )
}
