import * as React from 'react'
import type { NodeProps } from '@xyflow/react'
import { cn } from 'cn'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusDot } from '@/components/ui/status-dot'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Hue, type Status } from '@/lib/tokens'
import {
  TOPOLOGY_GROUP_META,
  useTopologyView,
  type TopologyGroupData,
  type TopologyGroupItem,
} from '@/lib/topology'

export interface TopologyGroupSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group container metadata */
  data: TopologyGroupData
  /** Whether the group container is currently selected */
  selected?: boolean
  /** Dim when outside an active trace */
  dimmed?: boolean
  /** Status override (e.g. from cascading fault impact) */
  effectiveStatus?: Status
}

/**
 * Pure presentational Glaze topology group container (VPC, AZ, Subnet, VLAN, Rack).
 * Uses soft pastel background tint and subtle inner hairline rather than heavy borders.
 */
export function TopologyGroupSurface({
  data,
  selected = false,
  dimmed = false,
  effectiveStatus,
  className,
  style,
  children,
  ...props
}: TopologyGroupSurfaceProps) {
  const kind = data.kind ?? 'zone'
  const meta = TOPOLOGY_GROUP_META[kind]
  const hue: Hue = data.hue ?? meta.defaultHue
  const palette = HUE_PALETTES[hue]
  const status: Status = effectiveStatus ?? data.status ?? 'normal'
  const sem = SEMANTIC_TOKENS[status]

  const isFault = status === 'error'
  const isWarn = status === 'warning'

  const surfaceBg = isFault
    ? 'rgba(254, 242, 238, 0.78)'
    : isWarn
      ? 'rgba(254, 246, 234, 0.78)'
      : `${palette[50]}CC`

  const ringColor = selected
    ? palette[500]
    : isFault
      ? '#F7B39C'
      : isWarn
        ? '#F5C995'
        : palette[300]

  return (
    <div
      data-kind={kind}
      data-status={status}
      data-selected={selected ? '' : undefined}
      data-dimmed={dimmed ? '' : undefined}
      className={cn(
        'relative h-full w-full rounded-tile transition-[opacity,box-shadow,background-color] duration-150 select-none',
        dimmed && 'opacity-35',
        className,
      )}
      style={{
        backgroundColor: surfaceBg,
        boxShadow: selected
          ? `0 0 0 2px ${ringColor}`
          : `inset 0 0 0 1.5px ${ringColor}`,
        ...style,
      }}
      {...props}
    >
      {/* Top Group Header Strip */}
      <div className="flex items-center justify-between gap-2 px-4 pt-3.5 pb-2">
        <div className="flex min-w-0 items-center gap-2">
          <HueTag hue={isFault ? 'coral' : isWarn ? 'peach' : hue} size="xs" tone="solid">
            {data.badge ?? meta.label}
          </HueTag>
          <span
            className="truncate font-glaze-display text-[13px] font-bold"
            style={{ color: isFault ? '#5E1E0A' : isWarn ? '#4D2306' : palette[900] }}
          >
            {data.label}
          </span>
          {data.subtitle && (
            <span
              className="hidden truncate font-glaze-mono text-[11px] sm:inline"
              style={{ color: isFault ? '#A6360F' : isWarn ? '#8A4B12' : palette[700] }}
            >
              {data.subtitle}
            </span>
          )}
        </div>

        {(data.summary || isFault || isWarn) && (
          <div
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
            style={{
              backgroundColor: '#FFFFFF',
              color: sem.ink,
            }}
          >
            <StatusDot status={status} size="sm" animated={isFault || isWarn} />
            <span>{data.summary ?? (isFault ? '区域异常' : isWarn ? '部分降级' : '正常')}</span>
          </div>
        )}
      </div>

      {children}
    </div>
  )
}

export type TopologyGroupProps = NodeProps<TopologyGroupItem>

/**
 * Interactive React Flow group node registered as `topologyGroup`.
 */
export const TopologyGroup = React.memo(function TopologyGroup({
  id,
  data,
  selected,
}: TopologyGroupProps) {
  const {
    hasActiveHighlight,
    highlightedNodeIds,
    nodeStatusOverrides,
    selection,
  } = useTopologyView()

  const effectiveStatus = nodeStatusOverrides.get(id) ?? data.status ?? 'normal'
  const isSelected = Boolean(selected || (selection?.type === 'node' && selection.id === id))
  const dimmed = hasActiveHighlight && !highlightedNodeIds.has(id) && !isSelected

  return (
    <TopologyGroupSurface
      data={data}
      selected={isSelected}
      dimmed={dimmed}
      effectiveStatus={effectiveStatus}
      className="cursor-pointer"
    />
  )
})
