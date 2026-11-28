# TopologyControls (拓扑工具栏、图例与缩略图)

> 包含全圆胶囊悬浮工具栏 TopologyToolbar（搜索、状态过滤、横纵切换、流量动效、缩放居中）、状态图例 TopologyLegend 与 Glaze 配色缩略图 TopologyMinimap。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/topology-controls
```

- **Registry JSON**: `/r/topology-controls.json`
- **Import Path**: `@/components/ui/topology-controls`
- **Exports**: `TopologyToolbar`, `TopologyLegend`, `TopologyMinimap`
- **NPM Dependencies**: `@phosphor-icons/react`, `@xyflow/react`, `cn`
- **Registry Dependencies**: `@glaze/button`, `@glaze/status-dot`, `@glaze/tokens`, `@glaze/tooltip`, `@glaze/topology`

## API Reference

### TopologyToolbar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position?` | `PanelPosition` | `'bottom-center'` | Position on the topology canvas |
| `searchQuery?` | `string` | `''` | Search query value (enables inline pill search when `onSearchChange` is provided) |
| `onSearchChange?` | `(value: string) => void` | — | Search query change handler |
| `statusFilter?` | `'all' \| Status` | `'all'` | Active status filter ('all' | 'normal' | 'warning' | 'error') |
| `onStatusFilterChange?` | `(status: 'all' \| Status) => void` | — | Status filter change handler |
| `onDirectionChange?` | `(direction: TopologyDirection) => void` | — | Layout direction toggle handler ('LR' <-> 'TB') |
| `onAnimateFlowChange?` | `(animated: boolean) => void` | — | Traffic flow animation toggle handler |
| `showZoomControls?` | `boolean` | `true` | Show zoom in / zoom out / fitView controls |
| `compact?` | `boolean` | `false` | Compact mode hides button text labels to fit narrow embedded canvases |
| `actions?` | `React.ReactNode` | — | Extra action buttons rendered at the trailing end |
| `className?` | `string` | — | — |

### TopologyLegend

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position?` | `PanelPosition` | `'bottom-left'` | Position on the canvas |
| `items?` | `TopologyLegendItem[]` | `DEFAULT_LEGEND_ITEMS` | Custom legend items; defaults to Glaze semantic health states |
| `className?` | `string` | — | — |

### TopologyMinimap

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position?` | `PanelPosition` | `'bottom-right'` | Position on the canvas |
| `width?` | `number` | `168` | Minimap width in px |
| `height?` | `number` | `108` | Minimap height in px |
| `className?` | `string` | — | — |

### Supporting Types

#### `TopologyLegendItem`

| Property | Type | Required |
| --- | --- | --- |
| `label` | `string` | Yes |
| `status` | `Status` | No |
| `color` | `string` | No |
| `dashed` | `boolean` | No |

### CSS Variables

- `--glaze-shadow-overlay`

## Source Code

```tsx
import * as React from 'react'
import { MiniMap, Panel, useReactFlow, type PanelPosition } from '@xyflow/react'
import {
  ArrowsDownUp,
  ArrowsLeftRight,
  CornersOut,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Pulse,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { StatusDot } from '@/components/ui/status-dot'
import { Tooltip } from '@/components/ui/tooltip'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Status } from '@/lib/tokens'
import {
  TOPOLOGY_GROUP_META,
  TOPOLOGY_KIND_META,
  isTopologyGroupNode,
  useTopologyView,
  type TopologyDirection,
  type TopologyFlowNode,
} from '@/lib/topology'

export interface TopologyToolbarProps {
  /** Position on the topology canvas */
  position?: PanelPosition
  /** Search query value (enables inline pill search when `onSearchChange` is provided) */
  searchQuery?: string
  /** Search query change handler */
  onSearchChange?: (value: string) => void
  /** Active status filter ('all' | 'normal' | 'warning' | 'error') */
  statusFilter?: 'all' | Status
  /** Status filter change handler */
  onStatusFilterChange?: (status: 'all' | Status) => void
  /** Layout direction toggle handler ('LR' <-> 'TB') */
  onDirectionChange?: (direction: TopologyDirection) => void
  /** Traffic flow animation toggle handler */
  onAnimateFlowChange?: (animated: boolean) => void
  /** Show zoom in / zoom out / fitView controls */
  showZoomControls?: boolean
  /** Compact mode hides button text labels to fit narrow embedded canvases */
  compact?: boolean
  /** Extra action buttons rendered at the trailing end */
  actions?: React.ReactNode
  className?: string
}

const STATUS_FILTER_OPTIONS: Array<{ value: 'all' | Status; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'normal', label: '正常' },
  { value: 'warning', label: '降级' },
  { value: 'error', label: '异常' },
]

/**
 * Glaze floating pill toolbar positioned inside `TopologyCanvas`.
 * Provides zoom, fitView, search, status filter, layout direction, and flow animation controls.
 */
export function TopologyToolbar({
  position = 'bottom-center',
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
  onDirectionChange,
  onAnimateFlowChange,
  showZoomControls = true,
  compact = false,
  actions,
  className,
}: TopologyToolbarProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const { direction, animateFlow } = useTopologyView()

  return (
    <Panel position={position} className={cn('!m-3 max-w-[calc(100%-24px)]', className)}>
      <div
        className="flex max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto rounded-full border border-[#E8EBF0] bg-white px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          boxShadow: '0 10px 28px rgba(18, 58, 92, 0.1), 0 1px 4px rgba(18, 58, 92, 0.05)',
        }}
      >
        {/* Inline Search Pill */}
        {onSearchChange && (
          <div className="relative flex h-8 shrink-0 items-center rounded-full bg-[#F6F7F9] pl-2.5 pr-1.5">
            <MagnifyingGlass size={14} className="shrink-0 text-[#8A90A0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索节点或 IP..."
              aria-label="搜索拓扑节点"
              className={cn(
                'bg-transparent px-1.5 text-[12.5px] text-[#1B1F27] placeholder:text-[#8A90A0] focus:outline-none',
                compact ? 'w-26' : 'w-28 sm:w-36',
              )}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="清空搜索"
                className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
              >
                <X size={11} weight="bold" />
              </button>
            )}
          </div>
        )}

        {/* Status Filter Pills */}
        {onStatusFilterChange && (
          <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-[#F6F7F9] p-0.5">
            {STATUS_FILTER_OPTIONS.map((opt) => {
              const active = statusFilter === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onStatusFilterChange(opt.value)}
                  className={cn(
                    'inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold whitespace-nowrap transition-colors',
                    active
                      ? 'bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.08)]'
                      : 'text-[#5B6170] hover:text-[#1B1F27]',
                  )}
                >
                  {opt.value !== 'all' && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: SEMANTIC_TOKENS[opt.value].dot }}
                    />
                  )}
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Layout Direction & Traffic Animation */}
        {(onDirectionChange || onAnimateFlowChange) && (
          <div className="flex shrink-0 items-center gap-1">
            {onDirectionChange && (
              <Tooltip content={direction === 'LR' ? '切换为纵向排布 (TB)' : '切换为横向排布 (LR)'}>
                <Button
                  size={compact ? 'icon' : 'sm'}
                  variant="ghost"
                  className={cn('shrink-0 whitespace-nowrap', compact ? 'h-8 w-8' : 'h-8 px-2.5')}
                  onClick={() => onDirectionChange(direction === 'LR' ? 'TB' : 'LR')}
                  aria-label="切换布局方向"
                >
                  {direction === 'LR' ? <ArrowsLeftRight size={15} /> : <ArrowsDownUp size={15} />}
                  {!compact && (
                    <span className="hidden md:inline">{direction === 'LR' ? '横向' : '纵向'}</span>
                  )}
                </Button>
              </Tooltip>
            )}

            {onAnimateFlowChange && (
              <Tooltip content={animateFlow ? '暂停流量动效' : '开启实时流量动效'}>
                <Button
                  size={compact ? 'icon' : 'sm'}
                  variant={animateFlow ? 'soft' : 'ghost'}
                  className={cn('shrink-0 whitespace-nowrap', compact ? 'h-8 w-8' : 'h-8 px-2.5')}
                  onClick={() => onAnimateFlowChange(!animateFlow)}
                  aria-label="切换流量动效"
                >
                  <Pulse size={15} weight={animateFlow ? 'bold' : 'regular'} />
                  {!compact && <span className="hidden md:inline">流量</span>}
                </Button>
              </Tooltip>
            )}
          </div>
        )}

        {/* Zoom & Fit Controls */}
        {showZoomControls && (
          <div className="flex shrink-0 items-center gap-0.5 border-l border-[#EEF0F3] pl-1.5">
            <Tooltip content="缩小">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => void zoomOut({ duration: 180 })}
                aria-label="缩小画布"
              >
                <MagnifyingGlassMinus size={15} />
              </Button>
            </Tooltip>
            <Tooltip content="放大">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => void zoomIn({ duration: 180 })}
                aria-label="放大画布"
              >
                <MagnifyingGlassPlus size={15} />
              </Button>
            </Tooltip>
            <Tooltip content="自适应画布">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => void fitView({ padding: 0.14, duration: 240 })}
                aria-label="自适应视图"
              >
                <CornersOut size={15} />
              </Button>
            </Tooltip>
          </div>
        )}

        {actions && (
          <div className="flex shrink-0 items-center gap-1 border-l border-[#EEF0F3] pl-1.5">
            {actions}
          </div>
        )}
      </div>
    </Panel>
  )
}

export interface TopologyLegendItem {
  label: string
  status?: Status
  color?: string
  dashed?: boolean
}

export interface TopologyLegendProps {
  /** Position on the canvas */
  position?: PanelPosition
  /** Custom legend items; defaults to Glaze semantic health states */
  items?: TopologyLegendItem[]
  className?: string
}

const DEFAULT_LEGEND_ITEMS: TopologyLegendItem[] = [
  { label: '运行正常', status: 'normal' },
  { label: '延迟/降级', status: 'warning' },
  { label: '链路/节点故障', status: 'error' },
  { label: '冗余备线', color: '#94A3B8', dashed: true },
]

/**
 * Compact floating legend pill for topology health and link semantics.
 */
export function TopologyLegend({
  position = 'bottom-left',
  items = DEFAULT_LEGEND_ITEMS,
  className,
}: TopologyLegendProps) {
  return (
    <Panel position={position} className={cn('!m-3 max-w-[calc(100%-24px)]', className)}>
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[18px] border border-[#E8EBF0] bg-white/95 px-3 py-1.5 text-[11.5px] font-medium text-[#5B6170] sm:rounded-full sm:px-3.5 sm:py-2 sm:text-[12px]"
        style={{
          boxShadow: '0 8px 24px rgba(18, 58, 92, 0.08), 0 1px 3px rgba(18, 58, 92, 0.04)',
        }}
      >
        {items.map((item, idx) => (
          <span key={idx} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            {item.dashed ? (
              <span
                className="inline-block w-3.5 shrink-0 border-t-2 border-dashed"
                style={{ borderColor: item.color ?? '#94A3B8' }}
              />
            ) : item.status ? (
              <StatusDot status={item.status} size="sm" animated={false} />
            ) : (
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color ?? '#7B80EA' }}
              />
            )}
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    </Panel>
  )
}

export interface TopologyMinimapProps {
  /** Position on the canvas */
  position?: PanelPosition
  /** Minimap width in px */
  width?: number
  /** Minimap height in px */
  height?: number
  className?: string
}

/**
 * Glaze-themed interactive MiniMap colored by node health and hue family.
 */
export function TopologyMinimap({
  position = 'bottom-right',
  width = 168,
  height = 108,
  className,
}: TopologyMinimapProps) {
  const { nodeStatusOverrides } = useTopologyView()

  return (
    <MiniMap<TopologyFlowNode>
      position={position}
      pannable
      zoomable
      style={{ width, height }}
      className={cn('!m-3', className)}
      nodeColor={(node) => {
        const override = nodeStatusOverrides.get(node.id)
        if (override === 'error') return '#E5603B'
        if (override === 'warning') return '#E3A33B'

        if (isTopologyGroupNode(node)) {
          const hue = node.data.hue ?? TOPOLOGY_GROUP_META[node.data.kind ?? 'zone'].defaultHue
          return HUE_PALETTES[hue][100]
        }

        const st = node.data.status ?? 'normal'
        if (st === 'error') return '#E5603B'
        if (st === 'warning') return '#E3A33B'
        const hue = node.data.hue ?? TOPOLOGY_KIND_META[node.data.kind ?? 'service'].defaultHue
        return HUE_PALETTES[hue][500]
      }}
      nodeStrokeWidth={0}
      nodeBorderRadius={6}
      maskColor="rgba(242, 244, 248, 0.72)"
    />
  )
}
```
