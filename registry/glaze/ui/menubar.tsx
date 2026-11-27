import * as React from 'react'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export function Menubar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <BaseMenubar
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-[#F2F3F5] p-1',
        className,
      )}
    >
      {children}
    </BaseMenubar>
  )
}

export const MenubarMenu = BaseMenu.Root

export function MenubarTrigger({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <BaseMenu.Trigger
      className={cn(
        'inline-flex h-8 cursor-pointer items-center rounded-full px-3.5 text-[13px] font-semibold text-[#1B1F27] select-none outline-none transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-white data-popup-open:bg-white data-popup-open:shadow-[0_1px_3px_rgba(16,24,40,0.08)]',
        className,
      )}
    >
      {children}
    </BaseMenu.Trigger>
  )
}

export function MenubarContent({ children }: { children: React.ReactNode }) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={8} align="start" className="z-50">
        <BaseMenu.Popup
          className={cn(
            POPUP_SURFACE,
            POPUP_TRANSITION_CLASS,
            'min-w-45 p-1.5',
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export function MenubarItem({
  children,
  shortcut,
  onClick,
}: {
  children: React.ReactNode
  shortcut?: string
  onClick?: () => void
}) {
  return (
    <BaseMenu.Item
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-[12px] px-3 py-2 text-[13px] font-medium text-[#1B1F27] outline-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-highlighted:bg-[#F2F3F5]"
    >
      <span>{children}</span>
      {shortcut && (
        <span className="font-glaze-mono text-[11px] text-[#8A90A0]">{shortcut}</span>
      )}
    </BaseMenu.Item>
  )
}
