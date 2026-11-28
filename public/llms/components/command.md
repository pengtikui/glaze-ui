# Command (命令面板)

> 基于 cmdk 与 Base UI Dialog 封装的通用命令菜单与 ⌘K 搜索面板，支持模糊过滤、分组标题、快捷键提示、键盘导航与弹窗模式 CommandDialog。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/command
```

- **Registry JSON**: `/r/command.json`
- **Import Path**: `@/components/ui/command`
- **Exports**: `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandLoading`, `CommandGroup`, `CommandSeparator`, `CommandItem`, `CommandShortcut`, `CommandFooter`
- **NPM Dependencies**: `@base-ui/react`, `@phosphor-icons/react`, `cmdk`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/style`

## API Reference

### Command

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `surface?` | `'white' \| 'soft'` | `'white'` | Surface appearance for inline usage on canvas or inside cards |

### CommandDialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open?` | `boolean` | — | — |
| `onOpenChange?` | `(open: boolean) => void` | — | — |
| `title?` | `string` | `'命令面板'` | Accessible title (visually hidden for screen readers) |
| `description?` | `string` | `'输入关键字快速搜索命令、页面或操作'` | Accessible description (visually hidden for screen readers) |
| `maxWidth?` | `string` | `'600px'` | — |
| `showCloseButton?` | `boolean` | `true` | — |
| `commandProps?` | `Omit<CommandProps, 'children'>` | — | — |
| `className?` | `string` | — | — |
| `children` | `React.ReactNode` | — | — |

### CommandInput

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leadingIcon?` | `React.ReactNode` | — | — |
| `wrapperClassName?` | `string` | — | — |

### CommandList

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>`

Inherits standard Base UI / HTML element props.

### CommandEmpty

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>`

Inherits standard Base UI / HTML element props.

### CommandLoading

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>`

Inherits standard Base UI / HTML element props.

### CommandGroup

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>`

Inherits standard Base UI / HTML element props.

### CommandSeparator

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>`

Inherits standard Base UI / HTML element props.

### CommandItem

Extends: `React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>`

Inherits standard Base UI / HTML element props.

### CommandShortcut

Extends: `React.HTMLAttributes<HTMLSpanElement>`

Inherits standard Base UI / HTML element props.

### CommandFooter

Extends: `React.HTMLAttributes<HTMLDivElement>`

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-selected` | 当前键盘或鼠标高亮选中的命令项（cmdk） |
| `data-disabled` | 不可触发的禁用命令项 |
| `data-open` | CommandDialog 模态面板处于打开态 |

### CSS Variables

- `--radius-tile`
- `--glaze-dur-base`
- `--glaze-dur-modal-exit`

## Source Code

```tsx
import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { cn } from 'cn'
import { Command as CommandPrimitive } from 'cmdk'
import { PRESS_CLASS } from '@/lib/motion'

export interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /** Surface appearance for inline usage on canvas or inside cards */
  surface?: 'white' | 'soft'
}

export const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandProps
>(function Command({ surface = 'white', className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-tile text-[#1B1F27] outline-none',
        surface === 'white' ? 'bg-white' : 'bg-[#F6F7F9]',
        className,
      )}
      {...props}
    />
  )
})

export interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Accessible title (visually hidden for screen readers) */
  title?: string
  /** Accessible description (visually hidden for screen readers) */
  description?: string
  maxWidth?: string
  showCloseButton?: boolean
  commandProps?: Omit<CommandProps, 'children'>
  className?: string
  children: React.ReactNode
}

export function CommandDialog({
  open,
  onOpenChange,
  title = '命令面板',
  description = '输入关键字快速搜索命令、页面或操作',
  maxWidth = '600px',
  showCloseButton = true,
  commandProps,
  className,
  children,
}: CommandDialogProps) {
  const { className: commandClassName, ...restCommandProps } = commandProps ?? {}

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="glaze-dialog-backdrop fixed inset-0 z-50 bg-[#1B1F27]/38" />
        <BaseDialog.Viewport className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pt-[12vh] pb-6">
          <BaseDialog.Popup
            className={cn(
              'glaze-dialog-popup relative w-full overflow-hidden rounded-[24px] bg-white shadow-[0_24px_64px_rgba(18,58,92,0.20)] outline-none',
              className,
            )}
            style={{ maxWidth }}
          >
            <BaseDialog.Title className="sr-only">{title}</BaseDialog.Title>
            <BaseDialog.Description className="sr-only">{description}</BaseDialog.Description>
            {showCloseButton && (
              <BaseDialog.Close
                aria-label="关闭命令面板"
                className={cn(
                  'absolute top-3 right-3.5 z-10 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
                  PRESS_CLASS,
                )}
              >
                <X size={14} weight="bold" />
              </BaseDialog.Close>
            )}
            <Command
              loop
              className={cn('rounded-none bg-transparent', commandClassName)}
              {...restCommandProps}
            >
              {children}
            </Command>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  leadingIcon?: React.ReactNode
  wrapperClassName?: string
}

export const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(function CommandInput({ leadingIcon, wrapperClassName, className, ...props }, ref) {
  return (
    <div
      cmdk-input-wrapper=""
      className={cn(
        'flex items-center gap-3 border-b border-[#EEF0F3] px-4 py-3.5',
        wrapperClassName,
      )}
    >
      <span className="inline-flex shrink-0 items-center text-[#8A90A0]">
        {leadingIcon ?? <MagnifyingGlass size={18} weight="bold" />}
      </span>
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-6 w-full border-0 bg-transparent pr-8 text-[15px] text-[#1B1F27] outline-none placeholder:text-[#8A90A0] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  )
})

export interface CommandListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  CommandListProps
>(function CommandList({ className, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn(
        'max-h-[400px] scroll-py-2 overflow-x-hidden overflow-y-auto p-2',
        className,
      )}
      {...props}
    />
  )
})

export interface CommandEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(function CommandEmpty({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn('py-10 text-center text-[13.5px] text-[#8A90A0]', className)}
      {...props}
    />
  )
})

export interface CommandLoadingProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading> {}

export const CommandLoading = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Loading>,
  CommandLoadingProps
>(function CommandLoading({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Loading
      ref={ref}
      className={cn('py-6 text-center text-[13px] text-[#8A90A0]', className)}
      {...props}
    />
  )
})

export interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}

export const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(function CommandGroup({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'overflow-hidden text-[#1B1F27] [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-[0.04em] [&_[cmdk-group-heading]]:text-[#8A90A0] [&_[cmdk-group-heading]]:uppercase',
        className,
      )}
      {...props}
    />
  )
})

export interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('mx-2 my-1.5 h-px bg-[#EEF0F3]', className)}
      {...props}
    />
  )
})

export interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {}

export const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(function CommandItem({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-pointer items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-[13.5px] font-medium text-[#1B1F27] outline-none select-none transition-colors duration-150',
        'data-[selected=true]:bg-[#F3F4FE] data-[selected=true]:text-[#262B7A]',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-45',
        className,
      )}
      {...props}
    />
  )
})

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      className={cn(
        'ml-auto inline-flex shrink-0 items-center rounded-md bg-[#F2F3F5] px-1.5 py-0.5 font-glaze-mono text-[11px] font-semibold tracking-wider text-[#5B6170]',
        className,
      )}
      {...props}
    />
  )
}

export interface CommandFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CommandFooter({ className, ...props }: CommandFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 border-t border-[#EEF0F3] bg-[#F6F7F9] px-4 py-2 text-[11px] text-[#6B7280]',
        className,
      )}
      {...props}
    />
  )
}
```
