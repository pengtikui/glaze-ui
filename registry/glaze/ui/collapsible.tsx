import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from 'cn'

export function Collapsible({
  title,
  badge,
  defaultOpen = false,
  children,
  className,
}: {
  title: React.ReactNode
  badge?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      className={cn('rounded-inner bg-[#F6F7F9] p-4', className)}
    >
      <BaseCollapsible.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-2 text-left outline-none">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-[#1B1F27]">{title}</span>
          {badge}
        </div>
        <CaretDown
          size={16}
          weight="bold"
          className="text-[#8A90A0] transition-[rotate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-180"
        />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
        <div className="pt-3 text-[13px] leading-relaxed text-[#5B6170]">
          {children}
        </div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  )
}
