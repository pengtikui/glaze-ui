# TopologyCanvas (拓扑观测画布)

> 基于 @xyflow/react 与 elkjs (Eclipse Layout Kernel) 封装的 Glaze 拓扑可视化画布，内置无重叠分组自动布局、无描边主题、点击上下游链路追踪高亮、搜索/状态过滤与故障推演状态覆写。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/topology-canvas
```

- **Registry JSON**: `/r/topology-canvas.json`
- **Import Path**: `@/components/ui/topology-canvas`
- **Exports**: `TopologyCanvas`, `useTopology`
- **NPM Dependencies**: `@xyflow/react`, `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tokens`, `@glaze/topology`, `@glaze/topology-edge`, `@glaze/topology-group`, `@glaze/topology-node`

## API Reference

### TopologyCanvas

Extends: `Omit<
    ReactFlowProps<TopologyFlowNode, TopologyFlowEdge>,
    'nodes' | 'edges' | 'nodeTypes' | 'edgeTypes' | 'onNodeClick' | 'onEdgeClick' | 'onSelectionChange'
  >`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `nodes` | `TopologyFlowNode[]` | — | Topology nodes (including optional `topologyGroup` parent containers) |
| `edges` | `TopologyFlowEdge[]` | — | Topology links connecting nodes |
| `direction?` | `TopologyDirection` | — | Active layout direction controlling port handle placement |
| `animateFlow?` | `boolean` | — | Toggle animated directional traffic flow on edges |
| `density?` | `'compact' \| 'detailed'` | — | Default visual density for device/service nodes |
| `selection?` | `TopologySelection \| null` | — | Controlled selection (node or edge) |
| `onSelectionChange?` | `(selection: TopologySelection \| null) => void` | — | Callback fired when selection changes |
| `traceOnSelect?` | `boolean` | — | Automatically trace and highlight upstream/downstream paths on selection |
| `traceDirection?` | `'both' \| 'upstream' \| 'downstream'` | — | Direction of path tracing when an item is selected |
| `searchQuery?` | `string` | — | Optional search keyword dimming non-matching nodes |
| `statusFilter?` | `'all' \| Status` | — | Optional status filter ('all' | Status) dimming non-matching nodes |
| `nodeStatusOverrides?` | `Map<string, Status>` | — | External status overrides for nodes (e.g. fault impact simulation) |
| `edgeStatusOverrides?` | `Map<string, Status>` | — | External status overrides for edges |
| `showGrid?` | `boolean` | — | Show subtle Glaze dot grid background |
| `surface?` | `'canvas' \| 'transparent'` | — | Canvas surface mode ('canvas' uses #F2F4F8, 'transparent' blends inside a Tile) |
| `draggable?` | `boolean` | — | Allow dragging nodes to adjust layout temporarily |
| `autoLayout?` | `boolean` | — | Automatically compute collision-free compound layout with Eclipse Layout Kernel (`elkjs`) |
| `layoutOptions?` | `Omit<TopologyLayoutOptions, 'direction' \| 'density'>` | — | Fine-grained ELK layout spacing & algorithm options when `autoLayout` is enabled |
| `fitViewKey?` | `string \| number` | — | Automatically re-fit viewport when `fitViewKey` changes |
| `className?` | `string` | — | Container className (must supply explicit height or flex-1) |
| `children?` | `React.ReactNode` | — | Floating overlay children (`TopologyToolbar`, `TopologyLegend`, `TopologyMinimap`, etc.) |

### useTopology

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-surface` | 画布底面模式（canvas | transparent） |
| `data-direction` | 当前布局方向（LR | TB） |

### CSS Variables

- `--glaze-canvas`

## Source Code

```tsx
import * as React from 'react'
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useReactFlow,
  type FitViewOptions,
  type NodeMouseHandler,
  type EdgeMouseHandler,
  type ReactFlowProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { cn } from 'cn'
import { TopologyEdge } from '@/components/ui/topology-edge'
import { TopologyGroup } from '@/components/ui/topology-group'
import { TopologyNode } from '@/components/ui/topology-node'
import type { Status } from '@/lib/tokens'
import {
  TopologyViewContext,
  isTopologyGroupNode,
  traceTopologyPath,
  useTopologyLayout,
  useTopologyView,
  type TopologyDirection,
  type TopologyFlowEdge,
  type TopologyFlowNode,
  type TopologyLayoutOptions,
  type TopologySelection,
} from '@/lib/topology'

const GLAZE_NODE_TYPES = {
  topologyNode: TopologyNode,
  topologyGroup: TopologyGroup,
} as const

const GLAZE_EDGE_TYPES = {
  topologyEdge: TopologyEdge,
} as const

const DEFAULT_FIT_VIEW_OPTIONS: FitViewOptions = {
  padding: 0.14,
  duration: 280,
}

export interface TopologyCanvasProps
  extends Omit<
    ReactFlowProps<TopologyFlowNode, TopologyFlowEdge>,
    'nodes' | 'edges' | 'nodeTypes' | 'edgeTypes' | 'onNodeClick' | 'onEdgeClick' | 'onSelectionChange'
  > {
  /** Topology nodes (including optional `topologyGroup` parent containers) */
  nodes: TopologyFlowNode[]
  /** Topology links connecting nodes */
  edges: TopologyFlowEdge[]
  /** Active layout direction controlling port handle placement */
  direction?: TopologyDirection
  /** Toggle animated directional traffic flow on edges */
  animateFlow?: boolean
  /** Default visual density for device/service nodes */
  density?: 'compact' | 'detailed'
  /** Controlled selection (node or edge) */
  selection?: TopologySelection | null
  /** Callback fired when selection changes */
  onSelectionChange?: (selection: TopologySelection | null) => void
  /** Automatically trace and highlight upstream/downstream paths on selection */
  traceOnSelect?: boolean
  /** Direction of path tracing when an item is selected */
  traceDirection?: 'both' | 'upstream' | 'downstream'
  /** Optional search keyword dimming non-matching nodes */
  searchQuery?: string
  /** Optional status filter ('all' | Status) dimming non-matching nodes */
  statusFilter?: 'all' | Status
  /** External status overrides for nodes (e.g. fault impact simulation) */
  nodeStatusOverrides?: Map<string, Status>
  /** External status overrides for edges */
  edgeStatusOverrides?: Map<string, Status>
  /** Show subtle Glaze dot grid background */
  showGrid?: boolean
  /** Canvas surface mode ('canvas' uses #F2F4F8, 'transparent' blends inside a Tile) */
  surface?: 'canvas' | 'transparent'
  /** Allow dragging nodes to adjust layout temporarily */
  draggable?: boolean
  /** Automatically compute collision-free compound layout with Eclipse Layout Kernel (`elkjs`) */
  autoLayout?: boolean
  /** Fine-grained ELK layout spacing & algorithm options when `autoLayout` is enabled */
  layoutOptions?: Omit<TopologyLayoutOptions, 'direction' | 'density'>
  /** Automatically re-fit viewport when `fitViewKey` changes */
  fitViewKey?: string | number
  /** Container className (must supply explicit height or flex-1) */
  className?: string
  /** Floating overlay children (`TopologyToolbar`, `TopologyLegend`, `TopologyMinimap`, etc.) */
  children?: React.ReactNode
}

function TopologyCanvasInner({
  nodes,
  edges,
  direction = 'LR',
  animateFlow = true,
  density = 'detailed',
  selection: controlledSelection,
  onSelectionChange,
  traceOnSelect = true,
  traceDirection = 'both',
  searchQuery = '',
  statusFilter = 'all',
  nodeStatusOverrides,
  edgeStatusOverrides,
  showGrid = true,
  surface = 'canvas',
  draggable = false,
  autoLayout = true,
  layoutOptions,
  fitViewKey,
  className,
  children,
  ...rest
}: TopologyCanvasProps) {
  const { fitView } = useReactFlow()
  const {
    nodes: resolvedNodes,
    isLayouting,
    layoutVersion,
  } = useTopologyLayout(nodes, edges, {
    enabled: autoLayout,
    direction,
    density,
    ...layoutOptions,
  })
  const [interactiveNodes, setInteractiveNodes, handleNodesChange] =
    useNodesState<TopologyFlowNode>(resolvedNodes)
  React.useEffect(() => {
    setInteractiveNodes(resolvedNodes)
  }, [resolvedNodes, setInteractiveNodes])

  const [uncontrolledSelection, setUncontrolledSelection] =
    React.useState<TopologySelection | null>(null)

  const selection =
    controlledSelection !== undefined ? controlledSelection : uncontrolledSelection

  // Guard against mobile WebKit/Chrome delayed ghost-clicks landing on a node
  // directly behind a floating TopologyInspector right after it unmounts.
  const prevSelectionRef = React.useRef<TopologySelection | null>(selection)
  const lastDismissedAtRef = React.useRef(0)
  React.useEffect(() => {
    if (prevSelectionRef.current !== null && selection === null) {
      lastDismissedAtRef.current = performance.now()
    }
    prevSelectionRef.current = selection
  }, [selection])

  const selectItem = React.useCallback(
    (next: TopologySelection | null) => {
      if (next === null && selection !== null) {
        lastDismissedAtRef.current = performance.now()
      }
      if (controlledSelection === undefined) {
        setUncontrolledSelection(next)
      }
      onSelectionChange?.(next)
    },
    [controlledSelection, onSelectionChange, selection],
  )

  const effectiveNodeOverrides = React.useMemo(
    () => nodeStatusOverrides ?? new Map<string, Status>(),
    [nodeStatusOverrides],
  )
  const effectiveEdgeOverrides = React.useMemo(
    () => edgeStatusOverrides ?? new Map<string, Status>(),
    [edgeStatusOverrides],
  )

  // Compute highlighted node & edge sets from selection trace + search + status filter
  const { hasActiveHighlight, highlightedNodeIds, highlightedEdgeIds } = React.useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase()
    const hasFilter = trimmed.length > 0 || statusFilter !== 'all'

    if (selection && traceOnSelect) {
      const traced = traceTopologyPath(nodes, edges, selection, traceDirection)
      return {
        hasActiveHighlight: traced.nodeIds.size > 0 || traced.edgeIds.size > 0,
        highlightedNodeIds: traced.nodeIds,
        highlightedEdgeIds: traced.edgeIds,
      }
    }

    if (hasFilter) {
      const matchedNodes = new Set<string>()
      const matchedEdges = new Set<string>()

      for (const n of nodes) {
        if (isTopologyGroupNode(n)) continue
        const st = effectiveNodeOverrides.get(n.id) ?? n.data.status ?? 'normal'
        const statusOk = statusFilter === 'all' || st === statusFilter
        const text = `${n.data.label} ${n.data.subtitle ?? ''} ${n.data.address ?? ''} ${n.data.badge ?? ''} ${n.data.layer ?? ''}`.toLowerCase()
        const queryOk = !trimmed || text.includes(trimmed)

        if (statusOk && queryOk) {
          matchedNodes.add(n.id)
          if (n.parentId) matchedNodes.add(n.parentId)
        }
      }

      for (const e of edges) {
        if (matchedNodes.has(e.source) && matchedNodes.has(e.target)) {
          matchedEdges.add(e.id)
        }
      }

      return {
        hasActiveHighlight: true,
        highlightedNodeIds: matchedNodes,
        highlightedEdgeIds: matchedEdges,
      }
    }

    return {
      hasActiveHighlight: false,
      highlightedNodeIds: new Set<string>(),
      highlightedEdgeIds: new Set<string>(),
    }
  }, [
    nodes,
    edges,
    selection,
    traceOnSelect,
    traceDirection,
    searchQuery,
    statusFilter,
    effectiveNodeOverrides,
  ])

  // Re-fit view smoothly whenever ELK layout finishes or preset/direction changes
  React.useEffect(() => {
    if (autoLayout && isLayouting) return
    const timer = window.setTimeout(() => {
      void fitView(DEFAULT_FIT_VIEW_OPTIONS)
    }, 50)
    return () => window.clearTimeout(timer)
  }, [fitViewKey, direction, layoutVersion, autoLayout, isLayouting, fitView])

  const handleNodeClick: NodeMouseHandler<TopologyFlowNode> = React.useCallback(
    (_event, node) => {
      if (performance.now() - lastDismissedAtRef.current < 360) return
      selectItem(
        selection?.type === 'node' && selection.id === node.id
          ? null
          : { type: 'node', id: node.id },
      )
    },
    [selectItem, selection],
  )

  const handleEdgeClick: EdgeMouseHandler<TopologyFlowEdge> = React.useCallback(
    (_event, edge) => {
      if (performance.now() - lastDismissedAtRef.current < 360) return
      selectItem(
        selection?.type === 'edge' && selection.id === edge.id
          ? null
          : { type: 'edge', id: edge.id },
      )
    },
    [selectItem, selection],
  )

  const handlePaneClick = React.useCallback(() => {
    if (selection) selectItem(null)
  }, [selection, selectItem])

  const ctxValue = React.useMemo(
    () => ({
      direction,
      animateFlow,
      density,
      selection,
      hasActiveHighlight,
      highlightedNodeIds,
      highlightedEdgeIds,
      nodeStatusOverrides: effectiveNodeOverrides,
      edgeStatusOverrides: effectiveEdgeOverrides,
      selectItem,
    }),
    [
      direction,
      animateFlow,
      density,
      selection,
      hasActiveHighlight,
      highlightedNodeIds,
      highlightedEdgeIds,
      effectiveNodeOverrides,
      effectiveEdgeOverrides,
      selectItem,
    ],
  )

  return (
    <TopologyViewContext.Provider value={ctxValue}>
      <div
        data-surface={surface}
        data-direction={direction}
        className={cn(
          'glaze-topology relative h-full w-full overflow-hidden',
          surface === 'canvas' ? 'bg-[#F2F4F8]' : 'bg-transparent',
          className,
        )}
      >
        <ReactFlow<TopologyFlowNode, TopologyFlowEdge>
          nodes={interactiveNodes}
          edges={edges}
          nodeTypes={GLAZE_NODE_TYPES}
          edgeTypes={GLAZE_EDGE_TYPES}
          onNodesChange={draggable ? handleNodesChange : undefined}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          onPaneClick={handlePaneClick}
          nodesDraggable={draggable}
          nodesConnectable={false}
          elementsSelectable
          fitView
          fitViewOptions={DEFAULT_FIT_VIEW_OPTIONS}
          minZoom={0.3}
          maxZoom={1.75}
          proOptions={{ hideAttribution: true }}
          className={cn(
            'transition-opacity duration-150',
            autoLayout && layoutVersion === 0 && isLayouting ? 'opacity-0' : 'opacity-100',
          )}
          {...rest}
        >
          {showGrid && (
            <Background
              variant={BackgroundVariant.Dots}
              gap={22}
              size={1.4}
              color="#CBD2DF"
            />
          )}
          {children}
        </ReactFlow>
      </div>
    </TopologyViewContext.Provider>
  )
}

/**
 * Glaze Topology & Architecture Canvas powered by `@xyflow/react`.
 * Wraps `ReactFlowProvider`, Glaze custom node/group/edge types, path-trace highlighting,
 * search/status filtering, and fault-impact overrides.
 */
export function TopologyCanvas(props: TopologyCanvasProps) {
  return (
    <ReactFlowProvider>
      <TopologyCanvasInner {...props} />
    </ReactFlowProvider>
  )
}

export { useTopologyView as useTopology }
```
