import * as React from 'react'
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { cn } from 'cn'
import { PRESS_CLASS } from '@/lib/motion'

export function Toolbar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>) {
  return (
    <BaseToolbar.Root
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-full bg-[#F2F3F5] p-1.5',
        className,
      )}
      {...props}
    />
  )
}

export function ToolbarButton({
  className,
  active,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToolbar.Button> & {
  active?: boolean
}) {
  return (
    <BaseToolbar.Button
      className={cn(
        'inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-semibold outline-none',
        PRESS_CLASS,
        active
          ? 'bg-[#1B1F27] text-white'
          : 'text-[#5B6170] hover:bg-white hover:text-[#1B1F27]',
        'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
        'data-disabled:pointer-events-none data-disabled:opacity-40',
        className,
      )}
      {...props}
    />
  )
}

export function ToolbarGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export function ToolbarSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>) {
  return (
    <BaseToolbar.Separator
      className={cn('mx-1 h-4 w-px bg-[#CDD3DD]', className)}
      {...props}
    />
  )
}

export function ToolbarLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link
      className={cn(
        'inline-flex h-8 items-center rounded-full px-3 text-[13px] font-semibold text-[#4A4FB8] transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-[#E4E6FD]',
        className,
      )}
      {...props}
    />
  )
}
