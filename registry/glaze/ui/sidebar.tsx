import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { CaretDown, CaretRight, List, SidebarSimple, X } from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { Tooltip } from '@/components/ui/tooltip'
import { PRESS_CLASS } from '@/lib/motion'

// ============================================================================
// Context & Types (shadcn/ui Sidebar architecture adapted for Glaze + Base UI)
// ============================================================================

export type SidebarState = 'expanded' | 'collapsed'
export type SidebarVariant = 'floating' | 'sidebar' | 'inset'
export type SidebarCollapsible = 'icon' | 'offcanvas' | 'none'
export type SidebarSide = 'left' | 'right'

const MOBILE_MEDIA_QUERY = '(max-width: 1023px)'

export interface SidebarContextValue {
  /** Expanded or collapsed visual state on desktop */
  state: SidebarState
  /** Whether desktop sidebar is expanded */
  open: boolean
  /** Update desktop open state */
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  /** Whether mobile drawer sidebar is open */
  openMobile: boolean
  /** Update mobile drawer open state */
  setOpenMobile: (open: boolean | ((prev: boolean) => boolean)) => void
  /** True below desktop `lg` breakpoint (<1024px) */
  isMobile: boolean
  /** True when rendered inside a contained preview box instead of full viewport */
  contained: boolean
  /** Active visual variant shared between Sidebar and SidebarInset */
  variant: SidebarVariant
  /** Toggle desktop collapse or mobile drawer depending on viewport */
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebar must be used within a <SidebarProvider>.')
  }
  return ctx
}

// ============================================================================
// SidebarProvider
// ============================================================================

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial expanded state when uncontrolled (default: true) */
  defaultOpen?: boolean
  /** Controlled expanded state */
  open?: boolean
  /** Controlled expanded state change callback */
  onOpenChange?: (open: boolean) => void
  /** Controlled mobile drawer open state */
  openMobile?: boolean
  /** Controlled mobile drawer state change callback */
  onOpenMobileChange?: (open: boolean) => void
  /** Layout variant shared with Sidebar & SidebarInset (default: 'floating') */
  variant?: SidebarVariant
  /** Keyboard shortcut letter paired with ⌘/Ctrl (default: 'b'; pass false to disable) */
  shortcut?: string | false
  /** Expanded sidebar width CSS length (default: '280px') */
  sidebarWidth?: string
  /** Collapsed icon-rail width CSS length (default: '76px') */
  sidebarWidthIcon?: string
  /** Mobile drawer width CSS length (default: '300px') */
  sidebarWidthMobile?: string
  /** Render inside a bounded container (e.g. docs preview) instead of full viewport */
  contained?: boolean
}

export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  function SidebarProvider(
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      openMobile: openMobileProp,
      onOpenMobileChange: setOpenMobileProp,
      variant = 'floating',
      shortcut = 'b',
      sidebarWidth = '280px',
      sidebarWidthIcon = '76px',
      sidebarWidthMobile = '300px',
      contained = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) {
    const [isMobile, setIsMobile] = React.useState(false)
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const [internalOpenMobile, setInternalOpenMobile] = React.useState(false)

    React.useEffect(() => {
      if (contained || typeof window === 'undefined') return
      const mql = window.matchMedia(MOBILE_MEDIA_QUERY)
      const update = () => setIsMobile(mql.matches)
      update()
      mql.addEventListener('change', update)
      return () => mql.removeEventListener('change', update)
    }, [contained])

    const open = openProp ?? internalOpen
    const setOpen = React.useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const next = typeof value === 'function' ? value(open) : value
        if (setOpenProp) {
          setOpenProp(next)
        } else {
          setInternalOpen(next)
        }
      },
      [open, setOpenProp],
    )

    const openMobile = openMobileProp ?? internalOpenMobile
    const setOpenMobile = React.useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const next = typeof value === 'function' ? value(openMobile) : value
        if (setOpenMobileProp) {
          setOpenMobileProp(next)
        } else {
          setInternalOpenMobile(next)
        }
      },
      [openMobile, setOpenMobileProp],
    )

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev)
      } else {
        setOpen((prev) => !prev)
      }
    }, [isMobile, setOpen, setOpenMobile])

    // Keyboard shortcut: ⌘B / Ctrl+B (disabled when contained to avoid multi-demo collisions)
    React.useEffect(() => {
      if (contained || !shortcut) return
      const onKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === shortcut.toLowerCase()) {
          e.preventDefault()
          toggleSidebar()
        }
      }
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }, [contained, shortcut, toggleSidebar])

    const state: SidebarState = open ? 'expanded' : 'collapsed'

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        contained,
        variant,
        toggleSidebar,
      }),
      [state, open, setOpen, openMobile, setOpenMobile, isMobile, contained, variant, toggleSidebar],
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-sidebar-wrapper=""
          data-variant={variant}
          data-state={state}
          style={
            {
              '--sidebar-width': sidebarWidth,
              '--sidebar-width-icon': sidebarWidthIcon,
              '--sidebar-width-mobile': sidebarWidthMobile,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex w-full bg-[#F2F4F8] text-[#1B1F27]',
            contained ? 'h-full overflow-hidden rounded-tile' : 'min-h-screen',
            variant === 'floating' && (contained ? 'gap-3 p-3' : 'gap-4 p-3 sm:p-4'),
            variant === 'inset' && (contained ? 'gap-2 p-2.5' : 'gap-3 p-3 sm:p-4'),
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  },
)

// ============================================================================
// Sidebar Container (Desktop Rail / Floating / Inset + Mobile Base UI Drawer)
// ============================================================================

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Which side the sidebar docks to (default: 'left') */
  side?: SidebarSide
  /** Visual surface style (inherits from SidebarProvider if omitted) */
  variant?: SidebarVariant
  /** Collapse behavior on desktop (default: 'icon') */
  collapsible?: SidebarCollapsible
  /** Header title displayed inside the mobile navigation Drawer */
  mobileTitle?: React.ReactNode
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    side = 'left',
    variant: variantProp,
    collapsible = 'icon',
    mobileTitle = '导航菜单',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const { isMobile, state, openMobile, setOpenMobile, contained, variant: ctxVariant } =
    useSidebar()
  const variant = variantProp ?? ctxVariant

  // Effective collapsed state (only applies when collapsible !== 'none')
  const isCollapsed = collapsible !== 'none' && state === 'collapsed'
  const isOffcanvasCollapsed = collapsible === 'offcanvas' && state === 'collapsed'

  // Mobile Drawer Mode (Base UI Drawer, zero backdrop-blur)
  if (isMobile && !contained) {
    return (
      <BaseDrawer.Root
        open={openMobile}
        onOpenChange={setOpenMobile}
        swipeDirection={side}
      >
        <BaseDrawer.Portal>
          <BaseDrawer.Backdrop className="glaze-drawer-backdrop fixed inset-0 z-50 bg-[#1B1F27]/36" />
          <BaseDrawer.Viewport className="fixed inset-0 z-50 flex">
            <BaseDrawer.Popup
              data-sidebar="sidebar"
              data-mobile="true"
              data-side={side}
              style={{ width: 'min(var(--sidebar-width-mobile, 300px), calc(100vw - 24px))' }}
              className={cn(
                'fixed top-3 bottom-3 flex flex-col overflow-hidden rounded-tile bg-white shadow-[0_24px_64px_rgba(18,58,92,0.18)] outline-none',
                side === 'left' ? 'left-3' : 'right-3',
                className,
              )}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[#F2F3F5] px-4 py-3">
                <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
                  {mobileTitle}
                </span>
                <BaseDrawer.Close
                  aria-label="关闭侧边栏"
                  className={cn(
                    'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
                    PRESS_CLASS,
                  )}
                >
                  <X size={15} weight="bold" />
                </BaseDrawer.Close>
              </div>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
            </BaseDrawer.Popup>
          </BaseDrawer.Viewport>
        </BaseDrawer.Portal>
      </BaseDrawer.Root>
    )
  }

  const widthStyle: React.CSSProperties = {
    width: isOffcanvasCollapsed
      ? 0
      : isCollapsed && collapsible === 'icon'
        ? 'var(--sidebar-width-icon, 76px)'
        : 'var(--sidebar-width, 280px)',
    ...style,
  }

  return (
    <aside
      ref={ref}
      data-sidebar="sidebar"
      data-state={collapsible === 'none' ? 'expanded' : state}
      data-collapsible={isCollapsed ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      style={widthStyle}
      className={cn(
        'group/sidebar relative shrink-0 flex-col overflow-hidden transition-[width,opacity,margin] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        contained ? 'flex h-full' : 'hidden lg:flex',
        !contained &&
          (variant === 'floating' || variant === 'inset'
            ? 'sticky top-4 h-[calc(100vh-32px)]'
            : 'sticky top-0 h-screen'),
        variant === 'floating' && 'rounded-tile bg-white',
        variant === 'sidebar' && 'bg-white',
        variant === 'inset' && 'bg-transparent',
        side === 'right' && 'order-last',
        isOffcanvasCollapsed &&
          cn(
            'pointer-events-none opacity-0',
            variant === 'floating' && (contained ? '-mr-3' : '-mr-4'),
            variant === 'inset' && (contained ? '-mr-2' : '-mr-3'),
          ),
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  )
})

// ============================================================================
// SidebarInset (Main Content Region Paired with Sidebar)
// ============================================================================

export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function SidebarInset({ className, ...props }, ref) {
    const { variant, contained } = useSidebar()
    return (
      <div
        ref={ref}
        data-sidebar="inset"
        className={cn(
          'relative flex min-w-0 flex-1 flex-col',
          variant === 'floating' && 'gap-4',
          variant === 'sidebar' && 'bg-[#F2F4F8]',
          variant === 'inset' &&
            cn('overflow-hidden rounded-tile bg-white', contained ? 'h-full' : 'min-h-[calc(100vh-32px)]'),
          className,
        )}
        {...props}
      />
    )
  },
)

// ============================================================================
// SidebarTrigger & SidebarRail
// ============================================================================

export interface SidebarTriggerProps extends Omit<ButtonProps, 'children'> {
  /** Custom icon override */
  icon?: React.ReactNode
  /** Tooltip text when expanded */
  collapseLabel?: string
  /** Tooltip text when collapsed */
  expandLabel?: string
}

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  function SidebarTrigger(
    {
      icon,
      collapseLabel = '收起侧边栏 (⌘B)',
      expandLabel = '展开侧边栏 (⌘B)',
      variant,
      size = 'icon',
      className,
      onClick,
      ...props
    },
    ref,
  ) {
    const { isMobile, state, toggleSidebar } = useSidebar()
    const isCollapsed = state === 'collapsed'
    const label = isMobile ? '打开导航菜单' : isCollapsed ? expandLabel : collapseLabel

    const btn = (
      <Button
        ref={ref}
        type="button"
        data-sidebar="trigger"
        variant={variant ?? (isMobile ? 'secondary' : 'ghost')}
        size={size}
        aria-label={label}
        onClick={(e) => {
          onClick?.(e)
          toggleSidebar()
        }}
        className={cn('h-9.5 w-9.5', className)}
        {...props}
      >
        {icon ??
          (isMobile ? (
            <List size={18} weight="bold" />
          ) : (
            <SidebarSimple size={18} weight={isCollapsed ? 'fill' : 'duotone'} />
          ))}
      </Button>
    )

    if (isMobile) return btn

    return (
      <Tooltip content={label} side="bottom">
        {btn}
      </Tooltip>
    )
  },
)

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SidebarRail({ className, ...props }, ref) {
  const { toggleSidebar, state } = useSidebar()
  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="rail"
      aria-label={state === 'collapsed' ? '展开侧边栏' : '收起侧边栏'}
      title={state === 'collapsed' ? '展开侧边栏 (⌘B)' : '收起侧边栏 (⌘B)'}
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        'group/rail absolute inset-y-4 right-0 z-20 hidden w-3 cursor-ew-resize items-center justify-center outline-none lg:flex',
        'group-data-[side=right]/sidebar:right-auto group-data-[side=right]/sidebar:left-0',
        className,
      )}
      {...props}
    >
      <span className="h-12 w-1 rounded-full bg-transparent transition-colors duration-150 group-hover/rail:bg-[#CDD3DD]" />
    </button>
  )
})

// ============================================================================
// Structural Slots: Header, Footer, Content, Separator
// ============================================================================

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function SidebarHeader({ className, ...props }, ref) {
    const { state, isMobile } = useSidebar()
    const collapsed = !isMobile && state === 'collapsed'
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn(
          'flex shrink-0 flex-col gap-2',
          collapsed ? 'px-2 pt-3 pb-2' : 'px-3 pt-3.5 pb-2',
          className,
        )}
        {...props}
      />
    )
  },
)

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function SidebarFooter({ className, ...props }, ref) {
    const { state, isMobile } = useSidebar()
    const collapsed = !isMobile && state === 'collapsed'
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn(
          'flex shrink-0 flex-col gap-2 border-t border-[#F2F3F5]',
          collapsed ? 'p-2' : 'p-3',
          className,
        )}
        {...props}
      />
    )
  },
)

export const SidebarContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function SidebarContent({ className, ...props }, ref) {
    const { state, isMobile } = useSidebar()
    const collapsed = !isMobile && state === 'collapsed'
    return (
      <nav
        ref={ref}
        data-sidebar="content"
        aria-label="主侧边栏导航"
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-3',
          collapsed ? 'px-2' : 'px-2.5',
          className,
        )}
        {...props}
      />
    )
  },
)

export const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarSeparator({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="separator"
      data-sidebar="separator"
      className={cn('mx-2 my-1.5 h-px bg-[#EEF0F3]', className)}
      {...props}
    />
  )
})

// ============================================================================
// Grouping: SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent
// ============================================================================

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function SidebarGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn('relative flex w-full min-w-0 flex-col pt-3 first:pt-1', className)}
        {...props}
      />
    )
  },
)

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Allow clicking the section label to collapse/expand the group */
  collapsible?: boolean
  /** Current open state when collapsible=true */
  open?: boolean
  /** Toggle handler when collapsible=true */
  onToggle?: () => void
  /** Optional inline action slot (e.g. SidebarGroupAction '+' button) */
  action?: React.ReactNode
}

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  function SidebarGroupLabel(
    { collapsible = false, open = true, onToggle, action, className, children, ...props },
    ref,
  ) {
    const { state, isMobile } = useSidebar()
    const collapsed = !isMobile && state === 'collapsed'

    if (collapsed) {
      return (
        <div
          ref={ref}
          data-sidebar="group-label"
          aria-hidden="true"
          className="mx-auto my-1.5 h-px w-6 bg-[#EEF0F3]"
        />
      )
    }

    return (
      <div
        ref={ref}
        data-sidebar="group-label"
        className={cn('mb-1 flex items-center justify-between gap-1 px-3', className)}
        {...props}
      >
        {collapsible ? (
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold tracking-[0.06em] text-[#8A90A0] uppercase transition-colors outline-none hover:text-[#1B1F27]"
          >
            <CaretRight
              size={11}
              weight="bold"
              className={cn(
                'transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
                open && 'rotate-90',
              )}
            />
            <span>{children}</span>
          </button>
        ) : (
          <span className="text-[11px] font-bold tracking-[0.06em] text-[#8A90A0] uppercase">
            {children}
          </span>
        )}
        {action}
      </div>
    )
  },
)

export interface SidebarGroupActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string
}

export const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
  function SidebarGroupAction({ tooltip, className, ...props }, ref) {
    const btn = (
      <button
        ref={ref}
        type="button"
        data-sidebar="group-action"
        className={cn(
          'inline-flex h-5.5 w-5.5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] hover:bg-[#F2F3F5] hover:text-[#1B1F27] outline-none focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
          PRESS_CLASS,
          className,
        )}
        {...props}
      />
    )
    if (tooltip) {
      return (
        <Tooltip content={tooltip} side="top">
          {btn}
        </Tooltip>
      )
    }
    return btn
  },
)

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarGroupContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn('flex w-full flex-col gap-0.5', className)}
      {...props}
    />
  )
})

// ============================================================================
// Menu & Items: SidebarMenu, SidebarMenuItem, SidebarMenuButton, Action, Badge
// ============================================================================

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  function SidebarMenu({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-sidebar="menu"
        className={cn('m-0 flex w-full min-w-0 list-none flex-col gap-0.5 p-0', className)}
        {...props}
      />
    )
  },
)

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  function SidebarMenuItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        data-sidebar="menu-item"
        className={cn('group/menu-item relative', className)}
        {...props}
      />
    )
  },
)

export interface SidebarMenuButtonProps {
  /** Highlights the item in Glaze soft periwinkle pill state */
  isActive?: boolean
  /** Height size preset */
  size?: 'sm' | 'default' | 'lg'
  /** Leading icon element */
  icon?: React.ReactNode
  /** Trailing badge, shortcut, or status pill (auto-hidden in collapsed icon-rail) */
  trailing?: React.ReactNode
  /** Tooltip shown in collapsed icon-rail mode or always when provided */
  tooltip?: React.ReactNode
  /** Disable interaction & show muted locked styling */
  disabled?: boolean
  /** Render as external or internal <a> link when provided */
  href?: string
  /** Link target when href is set */
  target?: string
  /** Link rel when href is set */
  rel?: string
  /** Force expanded rendering (e.g. inside a collapsed rail flyout Popover) */
  forceExpanded?: boolean
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLElement>
  /** Accessible label */
  'aria-label'?: string
  className?: string
  children?: React.ReactNode
}

export const SidebarMenuButton = React.forwardRef<HTMLElement, SidebarMenuButtonProps>(
  function SidebarMenuButton(
    {
      isActive = false,
      size = 'default',
      icon,
      trailing,
      tooltip,
      disabled = false,
      href,
      target,
      rel,
      forceExpanded = false,
      onClick,
      'aria-label': ariaLabel,
      className,
      children,
    },
    ref,
  ) {
    const { state, isMobile } = useSidebar()
    const collapsed = !forceExpanded && !isMobile && state === 'collapsed'

    const baseClass = cn(
      'group/menu-btn relative flex w-full items-center rounded-full font-semibold transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)] select-none outline-none',
      'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
      collapsed
        ? 'mx-auto h-10 w-10 justify-center p-0'
        : cn(
            'gap-2.5 px-3',
            size === 'sm' && 'h-8.5 text-[12.5px]',
            size === 'default' && 'h-9.5 text-[13px]',
            size === 'lg' && 'h-11 text-[13.5px]',
          ),
      disabled
        ? 'cursor-not-allowed text-[#8A90A0] opacity-60'
        : isActive
          ? 'cursor-pointer bg-[#F3F4FE] text-[#262B7A]'
          : 'cursor-pointer text-[#5B6170] hover:bg-[#F6F7F9] hover:text-[#1B1F27]',
      className,
    )

    const inner = (
      <>
        {icon && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center transition-colors',
              isActive
                ? 'text-[#4A4FB8]'
                : disabled
                  ? 'text-[#8A90A0]'
                  : 'text-[#6B7280] group-hover/menu-btn:text-[#1B1F27]',
            )}
          >
            {icon}
          </span>
        )}
        {!collapsed && <span className="min-w-0 flex-1 truncate text-left">{children}</span>}
        {!collapsed && trailing && (
          <span className="flex shrink-0 items-center gap-1.5">{trailing}</span>
        )}
      </>
    )

    const fallbackLabel =
      ariaLabel ?? (typeof children === 'string' ? children : undefined)

    const element = href ? (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        data-sidebar="menu-button"
        data-active={isActive ? 'true' : undefined}
        aria-label={collapsed ? fallbackLabel : ariaLabel}
        onClick={onClick}
        className={cn(baseClass, 'no-underline')}
      >
        {inner}
      </a>
    ) : (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        data-sidebar="menu-button"
        data-active={isActive ? 'true' : undefined}
        aria-current={isActive ? 'page' : undefined}
        aria-label={collapsed ? fallbackLabel : ariaLabel}
        onClick={disabled ? undefined : onClick}
        className={baseClass}
      >
        {inner}
      </button>
    )

    const resolvedTooltip = tooltip ?? (collapsed ? children : undefined)

    if (resolvedTooltip && (collapsed || tooltip)) {
      return (
        <Tooltip content={resolvedTooltip} side="right" delay={140}>
          {disabled ? <span className="block w-full">{element}</span> : element}
        </Tooltip>
      )
    }

    return element
  },
)

export interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Only reveal on parent SidebarMenuItem hover (or when popup is open) */
  showOnHover?: boolean
}

export const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  function SidebarMenuAction({ showOnHover = false, className, ...props }, ref) {
    const { state, isMobile } = useSidebar()
    if (!isMobile && state === 'collapsed') return null

    return (
      <button
        ref={ref}
        type="button"
        data-sidebar="menu-action"
        className={cn(
          'inline-flex h-6.5 w-6.5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] transition-opacity outline-none',
          'hover:bg-[#E8EBF0] hover:text-[#1B1F27] data-popup-open:bg-[#E8EBF0] data-popup-open:text-[#1B1F27] data-popup-open:opacity-100',
          showOnHover && 'opacity-0 group-hover/menu-item:opacity-100 focus-visible:opacity-100',
          className,
        )}
        {...props}
      />
    )
  },
)

export const SidebarMenuBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function SidebarMenuBadge({ className, ...props }, ref) {
  const { state, isMobile } = useSidebar()
  if (!isMobile && state === 'collapsed') return null

  return (
    <span
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-glaze-mono text-[11px] font-semibold text-[#8A90A0] select-none',
        className,
      )}
      {...props}
    />
  )
})

// ============================================================================
// Nested Submenus: SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, Collapsible
// ============================================================================

export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function SidebarMenuSub({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        'm-0 mt-0.5 ml-4.5 flex list-none flex-col gap-0.5 border-l border-[#E8EBF0] p-0 pl-2.5',
        className,
      )}
      {...props}
    />
  )
})

export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function SidebarMenuSubItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-sidebar="menu-sub-item"
      className={cn('relative', className)}
      {...props}
    />
  )
})

export interface SidebarMenuSubButtonProps {
  isActive?: boolean
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  trailing?: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
  children?: React.ReactNode
}

export const SidebarMenuSubButton = React.forwardRef<HTMLElement, SidebarMenuSubButtonProps>(
  function SidebarMenuSubButton(
    { isActive = false, size = 'md', icon, trailing, href, onClick, className, children },
    ref,
  ) {
    const baseClass = cn(
      'group/sub-btn flex w-full cursor-pointer items-center gap-2.5 rounded-full pr-2.5 pl-3 font-semibold transition-colors duration-150 select-none outline-none',
      'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
      size === 'sm' ? 'h-8 text-[12px]' : 'h-8.5 text-[12.5px]',
      isActive
        ? 'bg-[#F3F4FE] text-[#262B7A]'
        : 'text-[#5B6170] hover:bg-[#F6F7F9] hover:text-[#1B1F27]',
      className,
    )

    const leading = icon ?? (
      <span
        className={cn(
          'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
          isActive ? 'bg-[#4A4FB8]' : 'bg-[#CDD3DD] group-hover/sub-btn:bg-[#8A90A0]',
        )}
      />
    )

    const inner = (
      <>
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center',
            isActive ? 'text-[#4A4FB8]' : 'text-[#6B7280] group-hover/sub-btn:text-[#1B1F27]',
          )}
        >
          {leading}
        </span>
        <span className="min-w-0 flex-1 truncate text-left">{children}</span>
        {trailing && <span className="flex shrink-0 items-center gap-1.5">{trailing}</span>}
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          data-sidebar="menu-sub-button"
          data-active={isActive ? 'true' : undefined}
          onClick={onClick}
          className={cn(baseClass, 'no-underline')}
        >
          {inner}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        data-sidebar="menu-sub-button"
        data-active={isActive ? 'true' : undefined}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick}
        className={baseClass}
      >
        {inner}
      </button>
    )
  },
)

export interface SidebarMenuCollapsibleProps {
  /** Leading icon */
  icon: React.ReactNode
  /** Group trigger label */
  label: string
  /** Optional badge shown before the caret (e.g. '3级') */
  badge?: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void
  /** Highlight trigger text & icon when a child route is active */
  hasActiveChild?: boolean
  /** Nesting depth (0 = top-level group, 1 = 2nd-level nested group for 3-level trees) */
  level?: 0 | 1
  /** Popover flyout content displayed when sidebar is collapsed to icon-rail mode */
  flyoutContent?: React.ReactNode
  /** Child menu items rendered inside SidebarMenuSub */
  children: React.ReactNode
}

export function SidebarMenuCollapsible({
  icon,
  label,
  badge,
  open,
  defaultOpen = false,
  onOpenChange,
  hasActiveChild = false,
  level = 0,
  flyoutContent,
  children,
}: SidebarMenuCollapsibleProps) {
  const { state, isMobile } = useSidebar()
  const collapsed = !isMobile && state === 'collapsed'

  // In icon-rail collapsed mode, top-level collapsible groups automatically open a right-side Popover flyout
  if (collapsed && level === 0) {
    return (
      <Popover
        side="right"
        align="start"
        title={label}
        className="w-60 p-3"
        trigger={
          <button
            type="button"
            aria-label={label}
            data-sidebar="menu-button"
            data-active={hasActiveChild ? 'true' : undefined}
            className={cn(
              'mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 outline-none',
              'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
              hasActiveChild
                ? 'bg-[#F3F4FE] text-[#4A4FB8]'
                : 'text-[#6B7280] hover:bg-[#F6F7F9] hover:text-[#1B1F27] data-popup-open:bg-[#F2F3F5] data-popup-open:text-[#1B1F27]',
            )}
          >
            {icon}
          </button>
        }
      >
        <div className="flex flex-col gap-1">{flyoutContent ?? children}</div>
      </Popover>
    )
  }

  return (
    <BaseCollapsible.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <BaseCollapsible.Trigger
        data-sidebar="menu-collapsible-trigger"
        className={cn(
          'group/collapsible flex w-full cursor-pointer items-center gap-2.5 rounded-full font-semibold transition-colors duration-150 select-none outline-none',
          'focus-visible:ring-2 focus-visible:ring-[#7B80EA]',
          level === 0 ? 'h-9.5 px-3 text-[13px]' : 'h-8.5 px-3 text-[12.5px]',
          hasActiveChild
            ? 'text-[#262B7A] hover:bg-[#F3F4FE]/70'
            : 'text-[#5B6170] hover:bg-[#F6F7F9] hover:text-[#1B1F27]',
        )}
      >
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center',
            hasActiveChild
              ? 'text-[#4A4FB8]'
              : 'text-[#6B7280] group-hover/collapsible:text-[#1B1F27]',
          )}
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {badge}
        <CaretDown
          size={13}
          weight="bold"
          className="shrink-0 text-[#8A90A0] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open/collapsible:rotate-180"
        />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0">
        <SidebarMenuSub>{children}</SidebarMenuSub>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  )
}

// ============================================================================
// SidebarMenuSkeleton
// ============================================================================

export function SidebarMenuSkeleton({
  showIcon = true,
  className,
}: {
  showIcon?: boolean
  className?: string
}) {
  return (
    <div
      data-sidebar="menu-skeleton"
      className={cn('flex h-9.5 items-center gap-2.5 px-3', className)}
    >
      {showIcon && <span className="h-4.5 w-4.5 shrink-0 animate-pulse rounded-full bg-[#EEF0F3]" />}
      <span className="h-3.5 w-3/4 animate-pulse rounded-full bg-[#EEF0F3]" />
    </div>
  )
}
