import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from 'cn'

export function Tabs({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Root>) {
  return (
    <BaseTabs.Root
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  )
}

export function TabsList({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn(
        'relative isolate inline-flex w-fit items-center gap-1 rounded-full bg-[#F2F3F5] p-1',
        className,
      )}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-0 rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)]',
          'h-(--active-tab-height) w-(--active-tab-width)',
          '[transform:translate3d(var(--active-tab-left),var(--active-tab-top),0)]',
          'will-change-[transform,width] transition-[transform,width,height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        )}
      />
    </BaseTabs.List>
  )
}

export function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        'relative z-10 inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-semibold whitespace-nowrap select-none outline-none',
        'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'text-[#5B6170] hover:text-[#1B1F27] data-active:text-[#1B1F27]',
        'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
        className,
      )}
      {...props}
    >
      {children}
    </BaseTabs.Tab>
  )
}

export function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn('outline-none', className)} {...props} />
}
