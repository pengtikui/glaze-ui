import * as React from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  Archive,
  ArrowsSplit,
  Broadcast,
  CirclesThreePlus,
  Cloud,
  Cpu,
  Cube,
  Database,
  Desktop,
  Devices,
  GitFork,
  Globe,
  HardDrives,
  Lightning,
  Network,
  Queue,
  ShieldCheck,
  WifiHigh,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { HueTag } from '@/components/ui/hue-tag'
import { IconTile } from '@/components/ui/icon-tile'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { HUE_PALETTES, SEMANTIC_TOKENS, TILE_THEMES, type Hue, type Status } from '@/lib/tokens'
import {
  TOPOLOGY_KIND_META,
  useTopologyView,
  type TopologyNodeData,
  type TopologyNodeItem,
  type TopologyNodeKind,
} from '@/lib/topology'

export function TopologyKindIcon({
  kind = 'service',
  size = 18,
}: {
  kind?: TopologyNodeKind
  size?: number
}) {
  switch (kind) {
    case 'internet':
      return <Globe size={size} weight="duotone" />
    case 'cdn':
      return <Cloud size={size} weight="duotone" />
    case 'firewall':
      return <ShieldCheck size={size} weight="duotone" />
    case 'gateway':
      return <GitFork size={size} weight="duotone" />
    case 'load-balancer':
      return <ArrowsSplit size={size} weight="duotone" />
    case 'router':
      return <Network size={size} weight="duotone" />
    case 'switch':
      return <Broadcast size={size} weight="duotone" />
    case 'ap':
      return <WifiHigh size={size} weight="duotone" />
    case 'cluster':
      return <CirclesThreePlus size={size} weight="duotone" />
    case 'database':
      return <Database size={size} weight="duotone" />
    case 'cache':
      return <Lightning size={size} weight="duotone" />
    case 'queue':
      return <Queue size={size} weight="duotone" />
    case 'storage':
      return <Archive size={size} weight="duotone" />
    case 'server':
      return <Cpu size={size} weight="duotone" />
    case 'nas':
      return <HardDrives size={size} weight="duotone" />
    case 'client':
      return <Desktop size={size} weight="duotone" />
    case 'iot':
      return <Devices size={size} weight="duotone" />
    case 'service':
    default:
      return <Cube size={size} weight="duotone" />
  }
}

export interface TopologyNodeCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Node data payload */
  data: TopologyNodeData
  /** Whether the node is actively selected */
  selected?: boolean
  /** Dim non-matching nodes when a path trace or search filter is active */
  dimmed?: boolean
  /** Override visual status (e.g. cascaded fault status) */
  effectiveStatus?: Status
  /** Density override ('compact' | 'detailed') */
  density?: 'compact' | 'detailed'
}

/**
 * Pure presentational Glaze node card usable both inside React Flow (`TopologyNode`)
 * and standalone in legends, previews, or inspector headers.
 */
export function TopologyNodeCard({
  data,
  selected = false,
  dimmed = false,
  effectiveStatus,
  density: densityProp,
  className,
  style,
  ...props
}: TopologyNodeCardProps) {
  const kind = data.kind ?? 'service'
  const kindMeta = TOPOLOGY_KIND_META[kind]
  const hue: Hue = data.hue ?? kindMeta.defaultHue
  const tone = data.tone ?? 'white'
  const theme = TILE_THEMES[tone]
  const isDark = Boolean(theme.dark)
  const status: Status = effectiveStatus ?? data.status ?? 'normal'
  const density = densityProp ?? data.density ?? 'detailed'
  const isCompact = density === 'compact'
  const sem = SEMANTIC_TOKENS[status]
  const huePalette = HUE_PALETTES[hue]

  const isFault = status === 'error'
  const isWarn = status === 'warning'

  let ringColor: string | undefined
  if (selected) {
    ringColor = isFault ? '#E5603B' : isWarn ? '#E3A33B' : huePalette[500]
  } else if (isFault) {
    ringColor = '#E5603B'
  } else if (isWarn) {
    ringColor = '#E3A33B'
  }

  return (
    <div
      data-kind={kind}
      data-status={status}
      data-selected={selected ? '' : undefined}
      data-dimmed={dimmed ? '' : undefined}
      data-density={density}
      className={cn(
        'relative flex flex-col rounded-inner transition-[opacity,transform,box-shadow] duration-150 select-none',
        isCompact ? 'w-[196px] gap-2 p-3' : 'w-[228px] gap-2.5 p-3.5',
        dimmed && 'opacity-30',
        className,
      )}
      style={{
        backgroundColor: theme.bg,
        color: theme.ink,
        boxShadow: ringColor
          ? selected
            ? `0 0 0 2.5px ${ringColor}`
            : `inset 0 0 0 1.5px ${ringColor}`
          : undefined,
        ...style,
      }}
      {...props}
    >
      {/* Header Row */}
      <div className="flex items-start gap-2.5">
        <IconTile
          hue={isDark ? 'dark-glass' : hue}
          size={isCompact ? 'sm' : 'md'}
          className="shrink-0"
        >
          {data.icon ?? <TopologyKindIcon kind={kind} size={isCompact ? 16 : 18} />}
        </IconTile>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <span
              className={cn(
                'truncate font-semibold leading-tight',
                isCompact ? 'text-[13px]' : 'text-[14px]',
              )}
              style={{ color: theme.ink }}
              title={data.label}
            >
              {data.label}
            </span>
            <StatusDot
              status={status}
              size="sm"
              animated={status === 'normal' || status === 'warning' || status === 'error'}
              className="shrink-0"
            />
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            {(data.subtitle || data.address) && (
              <span
                className="truncate font-glaze-mono text-[11px] leading-4"
                style={{ color: theme.soft }}
                title={data.subtitle ?? data.address}
              >
                {data.subtitle ?? data.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Inline Telemetry Metrics */}
      {!isCompact && data.metrics && data.metrics.length > 0 && (
        <div
          className="grid gap-1.5 rounded-[12px] px-2.5 py-2"
          style={{
            gridTemplateColumns: `repeat(${Math.min(data.metrics.length, 3)}, minmax(0, 1fr))`,
            backgroundColor: isDark ? 'rgba(255,255,255,0.09)' : '#F6F7F9',
          }}
        >
          {data.metrics.slice(0, 3).map((m, idx) => {
            const metricColor = m.status
              ? SEMANTIC_TOKENS[m.status].ink
              : isDark
                ? '#FFFFFF'
                : '#1B1F27'
            return (
              <div key={idx} className="min-w-0 flex flex-col">
                <span
                  className="truncate text-[10px] leading-3.5 font-medium"
                  style={{ color: isDark ? theme.soft : '#8A90A0' }}
                >
                  {m.label}
                </span>
                <span
                  className="truncate font-glaze-mono text-[12px] leading-4.5 font-bold"
                  style={{ color: metricColor }}
                >
                  {m.value}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer Tags / Status */}
      {(data.badge || data.statusLabel || (data.tags && data.tags.length > 0) || isFault || isWarn) && (
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex flex-wrap items-center gap-1">
            {data.badge && (
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 font-glaze-mono text-[10px] font-semibold"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.14)' : '#F2F3F5',
                  color: isDark ? '#FFFFFF' : '#5B6170',
                }}
              >
                {data.badge}
              </span>
            )}
            {data.tags?.slice(0, isCompact ? 1 : 2).map((t, idx) => (
              <HueTag key={idx} hue={t.hue} size="xs" tone={isDark ? 'solid' : 'soft'}>
                {t.label}
              </HueTag>
            ))}
          </div>

          {(isFault || isWarn || data.statusLabel) && (
            <StatusPill status={status} size="sm">
              {data.statusLabel ?? (isFault ? '故障' : isWarn ? '降级' : sem.label)}
            </StatusPill>
          )}
        </div>
      )}
    </div>
  )
}

export type TopologyNodeProps = NodeProps<TopologyNodeItem>

/**
 * Interactive React Flow node component registered as `topologyNode`.
 * Connects cleanly to `TopologyViewContext` for orientation-aware ports,
 * path-trace dimming, and cascading fault impact overrides.
 */
export const TopologyNode = React.memo(function TopologyNode({
  id,
  data,
  selected,
}: TopologyNodeProps) {
  const {
    direction,
    density,
    hasActiveHighlight,
    highlightedNodeIds,
    nodeStatusOverrides,
    selection,
  } = useTopologyView()

  const effectiveStatus = nodeStatusOverrides.get(id) ?? data.status ?? 'normal'
  const isSelected = Boolean(selected || (selection?.type === 'node' && selection.id === id))
  const isHighlighted = highlightedNodeIds.has(id)
  const dimmed = hasActiveHighlight && !isHighlighted && !isSelected

  const targetPos = direction === 'LR' ? Position.Left : Position.Top
  const sourcePos = direction === 'LR' ? Position.Right : Position.Bottom
  const handleBg = SEMANTIC_TOKENS[effectiveStatus].dot

  return (
    <div className="group relative">
      <Handle
        type="target"
        position={targetPos}
        isConnectable={false}
        className="!h-2.5 !w-2.5 !rounded-full opacity-0 group-hover:opacity-100 data-[selected]:opacity-100"
        data-selected={isSelected ? '' : undefined}
        style={{ backgroundColor: handleBg }}
      />
      <TopologyNodeCard
        data={data}
        selected={isSelected}
        dimmed={dimmed}
        effectiveStatus={effectiveStatus}
        density={data.density ?? density}
        className="cursor-pointer"
      />
      <Handle
        type="source"
        position={sourcePos}
        isConnectable={false}
        className="!h-2.5 !w-2.5 !rounded-full opacity-0 group-hover:opacity-100 data-[selected]:opacity-100"
        data-selected={isSelected ? '' : undefined}
        style={{ backgroundColor: handleBg }}
      />
    </div>
  )
})
