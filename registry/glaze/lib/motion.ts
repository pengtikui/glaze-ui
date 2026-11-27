import * as React from 'react'
import type { Transition, Variants } from 'motion/react'

/**
 * Unified Design System Motion Tokens
 *
 * Philosophy: 「CSS 优先 · 分级节拍 · 性能与手感兼顾」
 * All UI primitives run on pure CSS GPU-composited transitions (`transform`, `opacity`)
 * with zero JS animation loop overhead. `motion/react` is reserved strictly for
 * multi-element layout FLIP / AnimatePresence orchestration where JS adds real value.
 *
 * Duration tiers match visual mass and travel distance:
 * - Fast (150ms in / 120ms out): floating popups (Menu, ContextMenu, Menubar, Popover,
 *   PreviewCard, Tooltip, Select, Combobox, Autocomplete, NavigationMenu), tactile press,
 *   micro hover/highlight states.
 * - Base (200ms in / 150ms modal out): Tabs/SegmentedControl indicator, Switch thumb,
 *   Accordion/Collapsible, Progress/Meter, Dialog & AlertDialog, ScrollArea, Tile hover.
 * - Emphasized (300ms/220ms Drawer · 360ms Toast): large travel surfaces (Drawer slide,
 *   3D stacked Toast enter/expand/exit).
 */
export const EASE_CRISP = [0.2, 0, 0, 1] as const
export const EASE_STANDARD = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  /** Fast popup exit (120ms) */
  exit: 0.12,
  /** Fast popup enter, press, micro interactions (150ms) */
  fast: 0.15,
  /** Standard controls, tabs, switch, accordion, dialog enter (200ms) */
  base: 0.2,
  /** Drawer slide in / out (300ms / 220ms) */
  drawerIn: 0.3,
  drawerOut: 0.22,
  /** 3D stacked Toast travel & stack expansion (360ms) */
  toast: 0.36,
} as const

/** Reserved for multi-element JS layout FLIP transitions (e.g., Grid viewport preview) */
export const MOTION_SPRING: Transition = {
  type: 'spring',
  visualDuration: 0.24,
  bounce: 0.06,
}

/** Smooth easing transition for page/section mount transitions */
export const MOTION_EASE: Transition = {
  duration: DURATION.base,
  ease: EASE_STANDARD,
}

/**
 * Tactile press depth ONLY for standalone, compact, non-anchored action controls
 * (Button, Toggle, Checkbox, Radio, ToolbarButton, steppers, close buttons).
 * Pure CSS GPU-composited `transform` — zero JS overhead.
 * Never apply to form inputs/selects, tabs, switches, large tiles, or popup triggers.
 */
export const PRESS_SCALE = 0.97
export const PRESS_CLASS =
  'transition-[transform,background-color,color,filter,box-shadow] duration-150 ease-[cubic-bezier(0.2,0,0,1)] active:[transform:scale(0.97)]'

/**
 * Context for floating overlay triggers (Menu, Popover, Tooltip, PreviewCard).
 * Any nested Button/Toggle reads this context and automatically disables press scaling
 * so the Floating UI anchor bounding box remains completely stable during open/close.
 */
const PopupTriggerContext = React.createContext(false)

export function PopupTriggerScope({ children }: { children: React.ReactNode }) {
  return React.createElement(PopupTriggerContext.Provider, { value: true }, children)
}

export function useIsPopupTrigger(): boolean {
  return React.useContext(PopupTriggerContext)
}

/**
 * Unified pure-CSS GPU-composited transition class for ALL floating popups
 * (Menu, ContextMenu, Menubar, Popover, PreviewCard, Tooltip, Select, Combobox,
 * Autocomplete, NavigationMenu). Defined in `glaze.css` using `transform` + `opacity`
 * at 150ms enter / 120ms exit with `data-instant` zero-delay switching.
 */
export const POPUP_TRANSITION_CLASS = 'glaze-popup'

export const PAGE_VARIANTS: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: MOTION_EASE,
  },
  exit: {
    opacity: 0,
    y: -3,
    transition: { duration: DURATION.exit, ease: EASE_CRISP },
  },
}

export const MOTION_TOKENS = [
  {
    name: 'Fast · 轻快浮层与微交互',
    token: '150ms / 120ms',
    spec: 'cubic-bezier(0.2, 0, 0, 1) · 纯 CSS 合成',
    use: 'Menu、ContextMenu、Menubar、Popover、PreviewCard、Tooltip、Select、Combobox、列表高亮与独立按钮按压',
  },
  {
    name: 'Base · 常规控件与对话框',
    token: '200ms / 150ms',
    spec: 'cubic-bezier(0.22, 1, 0.36, 1) · 纯 CSS 合成',
    use: 'Tabs / SegmentedControl 水平滑块、Switch 滑块、Accordion / Collapsible 展开、Dialog / AlertDialog 开关',
  },
  {
    name: 'Emphasized · 抽屉与堆叠通知',
    token: '300ms · 360ms',
    spec: 'cubic-bezier(0.22, 1, 0.36, 1) · 纯 CSS 合成',
    use: 'Drawer 侧边/底部抽屉滑入滑出 (300ms/220ms)、Toast 3D 堆叠进退场与展开 (360ms)',
  },
  {
    name: 'Scoped Tactile Press',
    token: 'PRESS_SCALE',
    spec: 'transform: scale(0.97) · 150ms · 仅限独立紧凑操作',
    use: '仅用于独立 Button、Toggle、Checkbox、Radio、ToolbarButton 与步进/关闭按钮；Select、Tabs、Switch、Tile 及所有浮层触发器严禁缩放',
  },
] as const

/** Unified Surface & Control Classes */
export const POPUP_SURFACE =
  'rounded-overlay border border-[#E8EBF0] bg-white shadow-[0_10px_28px_rgba(18,58,92,0.10),0_1px_4px_rgba(18,58,92,0.05)] outline-none'

export const PILL_CONTROL =
  'rounded-full border-0 outline-none transition-[background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]'

export const BOX_CONTROL =
  'rounded-inner border-0 outline-none transition-[background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]'

export const CONTROL_SOFT =
  'bg-[#F6F7F9] hover:bg-[#EEF0F4] focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#7B80EA] focus-within:bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#7B80EA] data-popup-open:bg-white data-popup-open:ring-2 data-popup-open:ring-inset data-popup-open:ring-[#7B80EA]'

export const CONTROL_WHITE =
  'bg-white hover:bg-[#FAFBFC] focus:ring-2 focus:ring-inset focus:ring-[#7B80EA] focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#7B80EA] data-popup-open:ring-2 data-popup-open:ring-inset data-popup-open:ring-[#7B80EA]'
