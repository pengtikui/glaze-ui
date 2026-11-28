import * as React from 'react'
import {
  Group,
  Panel,
  Separator,
  SeparatorOverlay,
  useDefaultLayout,
  useGroupRef,
  usePanelRef,
  useParentGroup,
  useParentPanel,
  type GroupImperativeHandle,
  type GroupProps,
  type Layout,
  type Orientation,
  type PanelImperativeHandle,
  type PanelProps,
  type PanelSize,
  type SeparatorOverlayProps,
  type SeparatorProps,
} from 'react-resizable-panels'
import { DotsSix, DotsSixVertical } from '@phosphor-icons/react'
import { cn } from 'cn'
import { HUE_PALETTES, type Hue } from '@/lib/tokens'

export type ResizableOrientation = Orientation
export type ResizableHandleVariant = 'line' | 'pill' | 'gap'

export interface ResizablePanelGroupProps extends GroupProps {
  /** 面板排列方向：horizontal（左右分栏）或 vertical（上下分栏） */
  orientation?: ResizableOrientation
  /** 自定义外层容器类名 */
  className?: string
}

/**
 * 可拖拽调整尺寸的面板分组容器（基于 react-resizable-panels v4 Group）。
 * 支持水平/垂直嵌套布局、键盘无障碍调节、持久化布局与双模式拖拽预览。
 */
export function ResizablePanelGroup({
  orientation = 'horizontal',
  className,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <Group
      data-slot="resizable-panel-group"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'flex h-full w-full',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
      {...props}
    />
  )
}

export interface ResizablePanelProps extends PanelProps {
  /** 面板内容区类名（react-resizable-panels v4 会将其应用到内部 Flex 子节点） */
  className?: string
}

/**
 * 面板分组内的独立可调面板。
 * 在 react-resizable-panels v4 中：数字按 px 解析，带 "%" 的字符串按百分比解析（如 defaultSize="30%"、minSize="15%"）。
 */
export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn('min-h-0 min-w-0', className)}
      {...props}
    />
  )
}

export interface ResizableHandleProps extends SeparatorProps {
  /** 是否在分隔条中央显示带抓手图标的胶囊把手 */
  withHandle?: boolean
  /** 分隔条视觉形态：line（细线）、pill（柔和胶囊轨道）、gap（透明画布槽，适合分割 Glaze Tile 卡片） */
  variant?: ResizableHandleVariant
  /** 悬停、聚焦与拖拽激活时的 Glaze 色相强调色 */
  hue?: Hue
  /** 自定义分隔条容器类名 */
  className?: string
}

/**
 * 面板间的可拖拽分隔把手，自动感知父级 ResizablePanelGroup 的水平/垂直方向。
 * 支持鼠标/触控拖拽、方向键步进调整、Home/End 极值跳转与双击复位默认尺寸。
 */
export function ResizableHandle({
  withHandle = false,
  variant = 'line',
  hue = 'periwinkle',
  className,
  style,
  children,
  ...props
}: ResizableHandleProps) {
  const parentGroup = useParentGroup()
  const orientation = parentGroup?.orientation ?? 'horizontal'
  const isVerticalGroup = orientation === 'vertical'
  const palette = HUE_PALETTES[hue]

  const cssVars = {
    '--glaze-resize-soft': palette[100],
    '--glaze-resize-hover': palette[300],
    '--glaze-resize-active': palette[500],
    '--glaze-resize-ink': palette[700],
    ...style,
  } as React.CSSProperties

  return (
    <Separator
      data-slot="resizable-handle"
      data-orientation={orientation}
      data-variant={variant}
      style={cssVars}
      className={cn(
        'group relative flex shrink-0 items-center justify-center select-none outline-none transition-colors duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
        'focus-visible:z-10',
        'data-[separator=disabled]:cursor-not-allowed data-[separator=disabled]:opacity-45',
        // Line variant: 1px hairline with expanded hit area
        variant === 'line' && [
          'bg-[#E8EBF0]',
          'data-[separator=hover]:bg-[var(--glaze-resize-hover)]',
          'data-[separator=focus]:bg-[var(--glaze-resize-active)]',
          'data-[separator=active]:bg-[var(--glaze-resize-active)]',
          isVerticalGroup
            ? 'h-px w-full after:absolute after:inset-x-0 after:-top-1.5 after:-bottom-1.5 after:content-[""]'
            : 'h-full w-px after:absolute after:inset-y-0 after:-left-1.5 after:-right-1.5 after:content-[""]',
        ],
        // Pill variant: visible soft gutter with centered capsule bar
        variant === 'pill' && [
          'bg-transparent',
          isVerticalGroup ? 'h-3.5 w-full' : 'h-full w-3.5',
        ],
        // Gap variant: invisible gutter between Glaze Tiles on #F2F4F8 canvas
        variant === 'gap' && [
          'bg-transparent',
          isVerticalGroup ? 'h-4 w-full' : 'h-full w-4',
        ],
        className,
      )}
      {...props}
    >
      {children ? (
        children
      ) : withHandle ? (
        <div
          aria-hidden="true"
          className={cn(
            'z-10 flex items-center justify-center rounded-full border border-[#E8EBF0] bg-white text-[#8A90A0] shadow-[0_1px_2px_rgba(16,24,40,0.08)] transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
            'group-data-[separator=hover]:border-[var(--glaze-resize-hover)] group-data-[separator=hover]:text-[var(--glaze-resize-ink)]',
            'group-data-[separator=focus]:border-[var(--glaze-resize-active)] group-data-[separator=focus]:bg-[var(--glaze-resize-soft)] group-data-[separator=focus]:text-[var(--glaze-resize-ink)] group-data-[separator=focus]:ring-2 group-data-[separator=focus]:ring-[var(--glaze-resize-active)]/35',
            'group-data-[separator=active]:scale-105 group-data-[separator=active]:border-[var(--glaze-resize-active)] group-data-[separator=active]:bg-[var(--glaze-resize-active)] group-data-[separator=active]:text-white',
            isVerticalGroup ? 'h-4 w-8' : 'h-8 w-4',
          )}
        >
          {isVerticalGroup ? (
            <DotsSix size={12} weight="bold" />
          ) : (
            <DotsSixVertical size={12} weight="bold" />
          )}
        </div>
      ) : variant === 'pill' || variant === 'gap' ? (
        <span
          aria-hidden="true"
          className={cn(
            'rounded-full transition-[background-color,transform,opacity] duration-150 ease-[cubic-bezier(0.2,0,0,1)]',
            variant === 'pill'
              ? 'bg-[#CDD3DD] opacity-85'
              : 'bg-[#CDD3DD]/70 opacity-0 group-data-[separator=hover]:opacity-100 group-data-[separator=focus]:opacity-100 group-data-[separator=active]:opacity-100',
            'group-data-[separator=hover]:bg-[var(--glaze-resize-hover)]',
            'group-data-[separator=focus]:bg-[var(--glaze-resize-active)] group-data-[separator=focus]:ring-2 group-data-[separator=focus]:ring-[var(--glaze-resize-active)]/35',
            'group-data-[separator=active]:bg-[var(--glaze-resize-active)]',
            isVerticalGroup
              ? 'h-1 w-9 group-data-[separator=active]:scale-x-125'
              : 'h-9 w-1 group-data-[separator=active]:scale-y-125',
          )}
        />
      ) : null}
    </Separator>
  )
}

export interface ResizableSeparatorOverlayProps extends SeparatorOverlayProps {
  /** 延迟预览线的 Glaze 色相强调色 */
  hue?: Hue
  /** 自定义预览线类名 */
  className?: string
}

/**
 * 搭配 ResizablePanelGroup 的 resizePreviewMode="separator" 使用的延迟拖拽预览线，
 * 拖拽过程中仅渲染轻量化预览指示线，松手后一次性提交布局变更（适合复杂图表/大表格面板）。
 */
export function ResizableSeparatorOverlay({
  hue = 'periwinkle',
  className,
  style,
  ...props
}: ResizableSeparatorOverlayProps) {
  const palette = HUE_PALETTES[hue]
  return (
    <SeparatorOverlay
      data-slot="resizable-separator-overlay"
      style={{
        backgroundColor: palette[500],
        ...style,
      }}
      className={cn(
        'rounded-full opacity-90 data-[separator-overlay=inactive]:opacity-40',
        className,
      )}
      {...props}
    />
  )
}

export {
  useDefaultLayout,
  useGroupRef,
  usePanelRef,
  useParentGroup,
  useParentPanel,
  type GroupImperativeHandle,
  type Layout,
  type PanelImperativeHandle,
  type PanelSize,
}
