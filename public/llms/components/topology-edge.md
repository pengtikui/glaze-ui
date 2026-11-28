# TopologyEdge (流量动效拓扑连线)

> 支持正交折线与贝塞尔曲线的观测连线，内置状态着色、CSS 实时流量脉冲动画、冗余备线虚线及可点击的中点指标胶囊。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/topology-edge
```

- **Registry JSON**: `/r/topology-edge.json`
- **Import Path**: `@/components/ui/topology-edge`
- **Exports**: `TopologyEdge`
- **NPM Dependencies**: `@xyflow/react`, `cn`
- **Registry Dependencies**: `@glaze/style`, `@glaze/tokens`, `@glaze/topology`

## API Reference

### TopologyEdge

Inherits standard Base UI / HTML element props.

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-status` | 链路健康状态（normal | warning | error | disabled） |
| `data-selected` | 链路被选中高亮 |

## Source Code

```tsx
import * as React from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  type EdgeProps,
} from '@xyflow/react'
import { cn } from 'cn'
import { SEMANTIC_TOKENS, type Status } from '@/lib/tokens'
import { useTopologyView, type TopologyFlowEdge } from '@/lib/topology'

const EDGE_STROKE_BY_STATUS: Record<Status, string> = {
  normal: '#94A3B8',
  info: '#4A9BD8',
  warning: '#E3A33B',
  error: '#E5603B',
  disabled: '#CDD3DD',
}

const EDGE_ACTIVE_STROKE_BY_STATUS: Record<Status, string> = {
  normal: '#7B80EA',
  info: '#4A9BD8',
  warning: '#E3A33B',
  error: '#E5603B',
  disabled: '#8A90A0',
}

export type TopologyEdgeProps = EdgeProps<TopologyFlowEdge>

/**
 * Glaze observability topology edge supporting smooth orthogonal or bezier paths,
 * animated directional traffic flow, semantic health coloring, and floating pill labels.
 */
export const TopologyEdge = React.memo(function TopologyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: TopologyEdgeProps) {
  const {
    animateFlow,
    hasActiveHighlight,
    highlightedEdgeIds,
    edgeStatusOverrides,
    selection,
    selectItem,
  } = useTopologyView()

  const effectiveStatus: Status = edgeStatusOverrides.get(id) ?? data?.status ?? 'normal'
  const isSelected = Boolean(selected || (selection?.type === 'edge' && selection.id === id))
  const isHighlighted = highlightedEdgeIds.has(id)
  const dimmed = hasActiveHighlight && !isHighlighted && !isSelected

  const curve = data?.curve ?? 'smoothstep'
  const [edgePath, labelX, labelY] =
    curve === 'bezier'
      ? getBezierPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourcePosition,
          targetPosition,
          curvature: 0.28,
        })
      : getSmoothStepPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourcePosition,
          targetPosition,
          borderRadius: 16,
        })

  const strokeColor =
    isSelected || isHighlighted
      ? EDGE_ACTIVE_STROKE_BY_STATUS[effectiveStatus]
      : EDGE_STROKE_BY_STATUS[effectiveStatus]

  const isFault = effectiveStatus === 'error'
  const isWarn = effectiveStatus === 'warning'
  const isDisabled = effectiveStatus === 'disabled'
  const showAnimatedOverlay =
    animateFlow && (data?.animated ?? true) && !isDisabled && !dimmed

  const strokeWidth = isSelected
    ? 2.75
    : isHighlighted || isFault || isWarn
      ? 2.25
      : 1.75

  const pillText =
    data?.label ??
    [data?.bandwidth, data?.latency].filter(Boolean).join(' · ') ??
    data?.protocol

  const sem = SEMANTIC_TOKENS[effectiveStatus]

  return (
    <>
      {/* Base solid or dashed track */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray: data?.dashed || isDisabled ? '5 5' : undefined,
          opacity: dimmed ? 0.2 : 1,
        }}
      />

      {/* Animated directional traffic pulse overlay */}
      {showAnimatedOverlay && (
        <path
          d={edgePath}
          fill="none"
          stroke={isFault ? '#E5603B' : isWarn ? '#E3A33B' : isSelected || isHighlighted ? '#7B80EA' : '#4A9BD8'}
          strokeWidth={strokeWidth}
          strokeDasharray="6 18"
          strokeLinecap="round"
          className={cn(
            'pointer-events-none',
            isFault ? 'animate-glaze-flow-slow' : 'animate-glaze-flow',
          )}
          style={{
            opacity: isSelected || isHighlighted || isFault || isWarn ? 0.95 : 0.65,
          }}
        />
      )}

      {/* Floating Glaze Pill Label */}
      {pillText && (
        <EdgeLabelRenderer>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              selectItem({ type: 'edge', id })
            }}
            data-status={effectiveStatus}
            data-selected={isSelected ? '' : undefined}
            className={cn(
              'nodrag nopan pointer-events-auto absolute inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-0.5 font-glaze-mono text-[11px] font-semibold transition-[opacity,transform,box-shadow] duration-150',
              dimmed ? 'opacity-20' : 'opacity-100',
            )}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              backgroundColor: isFault
                ? '#FDE5DC'
                : isWarn
                  ? '#FBEBD4'
                  : isSelected
                    ? '#E4E6FD'
                    : '#FFFFFF',
              color: isFault
                ? '#A6360F'
                : isWarn
                  ? '#8A4B12'
                  : isSelected
                    ? '#262B7A'
                    : '#5B6170',
              boxShadow: isSelected
                ? `0 0 0 1.5px ${EDGE_ACTIVE_STROKE_BY_STATUS[effectiveStatus]}`
                : '0 1px 3px rgba(18, 58, 92, 0.08)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: sem.dot }}
            />
            <span>{pillText}</span>
          </button>
        </EdgeLabelRenderer>
      )}
    </>
  )
})
```
