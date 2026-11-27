import * as React from 'react'
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { Check } from '@phosphor-icons/react'
import { cn } from 'cn'
import {
  POPUP_SURFACE,
  POPUP_TRANSITION_CLASS,
} from '@/lib/motion'

export interface ContextMenuItemConfig {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  danger?: boolean
  checked?: boolean
  separatorBefore?: boolean
  onSelect?: () => void
}

export interface ContextMenuProps {
  items: ContextMenuItemConfig[]
  children: React.ReactNode
  className?: string
}

export function ContextMenu({
  items,
  children,
  className,
}: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className={cn('outline-none', className)}>
        {children}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="z-50">
          <BaseContextMenu.Popup
            className={cn(
              POPUP_SURFACE,
              POPUP_TRANSITION_CLASS,
              'min-w-52 p-1.5',
            )}
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.separatorBefore && (
                  <BaseContextMenu.Separator className="my-1 h-px bg-[#EEF0F3]" />
                )}
                {item.checked !== undefined ? (
                  <BaseContextMenu.CheckboxItem
                    checked={item.checked}
                    onCheckedChange={() => item.onSelect?.()}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-[13px] font-medium text-[#1B1F27] select-none outline-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-highlighted:bg-[#F2F3F5]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center text-[#4A4FB8]">
                        <BaseContextMenu.CheckboxItemIndicator>
                          <Check size={14} weight="bold" />
                        </BaseContextMenu.CheckboxItemIndicator>
                      </span>
                      {item.label}
                    </span>
                    {item.shortcut && (
                      <span className="font-glaze-mono text-[11px] text-[#8A90A0]">
                        {item.shortcut}
                      </span>
                    )}
                  </BaseContextMenu.CheckboxItem>
                ) : (
                  <BaseContextMenu.Item
                    onClick={item.onSelect}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-[13px] font-medium select-none outline-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
                      item.danger
                        ? 'text-[#A6360F] data-highlighted:bg-[#FDE5DC]'
                        : 'text-[#1B1F27] data-highlighted:bg-[#F2F3F5]',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span className="opacity-75">{item.icon}</span>}
                      {item.label}
                    </span>
                    {item.shortcut && (
                      <span className="font-glaze-mono text-[11px] text-[#8A90A0]">
                        {item.shortcut}
                      </span>
                    )}
                  </BaseContextMenu.Item>
                )}
              </React.Fragment>
            ))}
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  )
}
