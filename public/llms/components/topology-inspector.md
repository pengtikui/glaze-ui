# TopologyInspector (节点与链路详情检查器)

> 右侧悬浮观测检查器，统一支持节点、分组与链路详情查看，集成实时指标卡、SparkChart 趋势、上下游跳转列表、最近告警事件与故障注入演练按钮。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/topology-inspector
```

- **Registry JSON**: `/r/topology-inspector.json`
- **Import Path**: `@/components/ui/topology-inspector`
- **Exports**: `TopologyInspector`
- **NPM Dependencies**: `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/button`, `@glaze/hue-tag`, `@glaze/icon-tile`, `@glaze/scroll-area`, `@glaze/spark-chart`, `@glaze/status-dot`, `@glaze/status-pill`, `@glaze/style`, `@glaze/tokens`, `@glaze/topology`, `@glaze/topology-node`

## API Reference

### TopologyInspector

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `nodes` | `TopologyFlowNode[]` | — | All nodes in the current topology graph |
| `edges` | `TopologyFlowEdge[]` | — | All edges in the current topology graph |
| `selection` | `TopologySelection \| null` | — | Currently selected node or edge |
| `onClose?` | `() => void` | — | Close inspector callback |
| `onSelect?` | `(selection: TopologySelection) => void` | — | Jump to another node or edge from upstream/downstream hops |
| `nodeStatusOverrides?` | `Map<string, Status>` | — | Optional status overrides (e.g. fault simulation) |
| `edgeStatusOverrides?` | `Map<string, Status>` | — | Optional edge status overrides |
| `isFaultInjected?` | `boolean` | `false` | Whether the selected node is currently injected as a simulated fault |
| `onToggleFault?` | `(nodeId: string) => void` | — | Optional handler to toggle fault simulation on the selected node |
| `footerActions?` | `React.ReactNode` | — | Custom footer actions |
| `className?` | `string` | — | — |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-kind` | 当前检查对象类型（edge | group | 节点类型） |
| `data-status` | 当前对象健康状态 |

### CSS Variables

- `--radius-tile`
- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import {
  ArrowLeft,
  ArrowRight,
  FlowArrow,
  Pulse,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { IconTile } from '@/components/ui/icon-tile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SparkChart } from '@/components/ui/spark-chart'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { TopologyKindIcon } from '@/components/ui/topology-node'
import { SEMANTIC_TOKENS, type Hue, type Status } from '@/lib/tokens'
import {
  TOPOLOGY_GROUP_META,
  TOPOLOGY_KIND_META,
  isTopologyGroupNode,
  type TopologyFlowEdge,
  type TopologyFlowNode,
  type TopologyNodeItem,
  type TopologySelection,
} from '@/lib/topology'

export interface TopologyInspectorProps {
  /** All nodes in the current topology graph */
  nodes: TopologyFlowNode[]
  /** All edges in the current topology graph */
  edges: TopologyFlowEdge[]
  /** Currently selected node or edge */
  selection: TopologySelection | null
  /** Close inspector callback */
  onClose?: () => void
  /** Jump to another node or edge from upstream/downstream hops */
  onSelect?: (selection: TopologySelection) => void
  /** Optional status overrides (e.g. fault simulation) */
  nodeStatusOverrides?: Map<string, Status>
  /** Optional edge status overrides */
  edgeStatusOverrides?: Map<string, Status>
  /** Whether the selected node is currently injected as a simulated fault */
  isFaultInjected?: boolean
  /** Optional handler to toggle fault simulation on the selected node */
  onToggleFault?: (nodeId: string) => void
  /** Custom footer actions */
  footerActions?: React.ReactNode
  className?: string
}

/**
 * Glaze observability detail panel for inspecting a selected topology node, group, or link.
 * Displays live status, telemetry metrics, SparkChart trend, upstream/downstream hops, and recent events.
 */
export function TopologyInspector({
  nodes,
  edges,
  selection,
  onClose,
  onSelect,
  nodeStatusOverrides,
  edgeStatusOverrides,
  isFaultInjected = false,
  onToggleFault,
  footerActions,
  className,
}: TopologyInspectorProps) {
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    onClose?.()
  }

  const stopBubble = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  if (!selection) return null

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  // ── Edge Inspection View ──────────────────────────────────────────────────
  if (selection.type === 'edge') {
    const edge = edges.find((e) => e.id === selection.id)
    if (!edge) return null

    const src = nodeMap.get(edge.source)
    const tgt = nodeMap.get(edge.target)
    const status: Status = edgeStatusOverrides?.get(edge.id) ?? edge.data?.status ?? 'normal'
    const sem = SEMANTIC_TOKENS[status]
    const hue: Hue = status === 'error' ? 'coral' : status === 'warning' ? 'peach' : 'sky'

    return (
      <aside
        data-kind="edge"
        data-status={status}
        onClick={stopBubble}
        onPointerDown={stopBubble}
        onTouchStart={stopBubble}
        className={cn(
          'flex w-full max-w-[356px] touch-manipulation flex-col overflow-hidden rounded-tile border border-[#E8EBF0] bg-white',
          className,
        )}
        style={{
          boxShadow: '0 10px 28px rgba(18, 58, 92, 0.1), 0 1px 4px rgba(18, 58, 92, 0.05)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div className="flex min-w-0 items-center gap-3">
            <IconTile hue={hue} size="md">
              <FlowArrow size={18} weight="duotone" />
            </IconTile>
            <div className="min-w-0">
              <h3 className="m-0 truncate font-glaze-display text-[16px] font-extrabold text-[#1B1F27]">
                {edge.data?.label ?? '网络链路'}
              </h3>
              <p className="m-0 mt-0.5 truncate font-glaze-mono text-[12px] text-[#6B7280]">
                {edge.data?.protocol ?? 'TCP / IP'}
              </p>
            </div>
          </div>

          {onClose && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0 touch-manipulation"
              onClick={handleCloseClick}
              aria-label="关闭检查器"
            >
              <X size={15} />
            </Button>
          )}
        </div>

        <ScrollArea className="max-h-[calc(100vh-220px)] flex-1">
          <div className="flex flex-col gap-4 px-5 pb-5">
            <div className="flex items-center justify-between">
              <StatusPill status={status}>
                {status === 'error' ? '链路异常' : status === 'warning' ? '高延迟 / 降级' : sem.label}
              </StatusPill>
              {edge.data?.utilization !== undefined && (
                <span className="font-glaze-mono text-[12px] font-semibold text-[#5B6170]">
                  负载 {edge.data.utilization}%
                </span>
              )}
            </div>

            {/* Endpoints */}
            <div className="flex flex-col gap-2 rounded-inner bg-[#F6F7F9] p-3">
              <span className="text-[11px] font-semibold text-[#8A90A0]">链路端点</span>
              <div className="flex flex-col gap-1.5">
                {src && (
                  <button
                    type="button"
                    onClick={() => onSelect?.({ type: 'node', id: src.id })}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-[12px] bg-white px-3 py-2 text-left transition-colors hover:bg-[#EEF7FD]"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2 text-[13px] font-semibold text-[#1B1F27]">
                      <ArrowRight size={13} className="shrink-0 text-[#4A9BD8]" />
                      <span className="truncate">{src.data.label}</span>
                    </span>
                    <span className="shrink-0 text-[11px] text-[#8A90A0]">源端</span>
                  </button>
                )}
                {tgt && (
                  <button
                    type="button"
                    onClick={() => onSelect?.({ type: 'node', id: tgt.id })}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-[12px] bg-white px-3 py-2 text-left transition-colors hover:bg-[#EEF7FD]"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2 text-[13px] font-semibold text-[#1B1F27]">
                      <ArrowLeft size={13} className="shrink-0 text-[#7B80EA]" />
                      <span className="truncate">{tgt.data.label}</span>
                    </span>
                    <span className="shrink-0 text-[11px] text-[#8A90A0]">目标</span>
                  </button>
                )}
              </div>
            </div>

            {/* Key Link Metrics */}
            <div className="grid grid-cols-2 gap-2">
              {edge.data?.bandwidth && (
                <div className="rounded-[14px] bg-[#F6F7F9] p-3">
                  <span className="block text-[11px] text-[#8A90A0]">实时带宽 / 速率</span>
                  <span className="mt-0.5 block font-glaze-mono text-[15px] font-bold text-[#1B1F27]">
                    {edge.data.bandwidth}
                  </span>
                </div>
              )}
              {edge.data?.latency && (
                <div className="rounded-[14px] bg-[#F6F7F9] p-3">
                  <span className="block text-[11px] text-[#8A90A0]">往返延迟 RTT</span>
                  <span className="mt-0.5 block font-glaze-mono text-[15px] font-bold text-[#1B1F27]">
                    {edge.data.latency}
                  </span>
                </div>
              )}
              {edge.data?.loss && (
                <div className="rounded-[14px] bg-[#F6F7F9] p-3">
                  <span className="block text-[11px] text-[#8A90A0]">丢包 / 错误率</span>
                  <span
                    className="mt-0.5 block font-glaze-mono text-[15px] font-bold"
                    style={{ color: status === 'error' ? '#A6360F' : '#1B1F27' }}
                  >
                    {edge.data.loss}
                  </span>
                </div>
              )}
              {edge.data?.protocol && (
                <div className="rounded-[14px] bg-[#F6F7F9] p-3">
                  <span className="block text-[11px] text-[#8A90A0]">传输协议</span>
                  <span className="mt-0.5 block font-glaze-mono text-[15px] font-bold text-[#1B1F27]">
                    {edge.data.protocol}
                  </span>
                </div>
              )}
            </div>

            {/* Sparkline Trend */}
            {edge.data?.series && edge.data.series.length > 1 && (
              <div className="rounded-inner bg-[#F6F7F9] p-3.5">
                <div className="mb-2 flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-[#5B6170]">近 12 采样周期吞吐趋势</span>
                  <Pulse size={14} className="text-[#4A9BD8]" />
                </div>
                <SparkChart data={edge.data.series} variant="area" hue={hue} height={64} label="吞吐" />
              </div>
            )}

            {edge.data?.description && (
              <p className="m-0 text-[13px] leading-5 text-[#5B6170]">{edge.data.description}</p>
            )}
          </div>
        </ScrollArea>
      </aside>
    )
  }

  // ── Node or Group Inspection View ─────────────────────────────────────────
  const node = nodeMap.get(selection.id)
  if (!node) return null

  if (isTopologyGroupNode(node)) {
    const children = nodes.filter(
      (n): n is TopologyNodeItem => !isTopologyGroupNode(n) && n.parentId === node.id,
    )
    const status: Status = nodeStatusOverrides?.get(node.id) ?? node.data.status ?? 'normal'
    const meta = TOPOLOGY_GROUP_META[node.data.kind ?? 'zone']
    const hue: Hue = node.data.hue ?? meta.defaultHue

    return (
      <aside
        data-kind="group"
        data-status={status}
        onClick={stopBubble}
        onPointerDown={stopBubble}
        onTouchStart={stopBubble}
        className={cn(
          'flex w-full max-w-[356px] touch-manipulation flex-col overflow-hidden rounded-tile border border-[#E8EBF0] bg-white',
          className,
        )}
        style={{
          boxShadow: '0 10px 28px rgba(18, 58, 92, 0.1), 0 1px 4px rgba(18, 58, 92, 0.05)',
        }}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <HueTag hue={hue} size="xs" tone="solid">
                {node.data.badge ?? meta.label}
              </HueTag>
              <StatusPill status={status} size="sm">
                {node.data.summary ?? SEMANTIC_TOKENS[status].label}
              </StatusPill>
            </div>
            <h3 className="m-0 mt-2 truncate font-glaze-display text-[17px] font-extrabold text-[#1B1F27]">
              {node.data.label}
            </h3>
            {node.data.subtitle && (
              <p className="m-0 mt-0.5 font-glaze-mono text-[12px] text-[#6B7280]">
                {node.data.subtitle}
              </p>
            )}
          </div>
          {onClose && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0 touch-manipulation"
              onClick={handleCloseClick}
              aria-label="关闭检查器"
            >
              <X size={15} />
            </Button>
          )}
        </div>

        <ScrollArea className="max-h-[calc(100vh-220px)] flex-1">
          <div className="flex flex-col gap-3 px-5 pb-5">
            <span className="text-[12px] font-semibold text-[#5B6170]">
              区域内节点（{children.length}）
            </span>
            <div className="flex flex-col gap-1.5">
              {children.map((child) => {
                const cStatus = nodeStatusOverrides?.get(child.id) ?? child.data.status ?? 'normal'
                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => onSelect?.({ type: 'node', id: child.id })}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-[14px] bg-[#F6F7F9] px-3 py-2.5 text-left transition-colors hover:bg-[#EEF7FD]"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-semibold text-[#1B1F27]">
                        {child.data.label}
                      </div>
                      {(child.data.subtitle || child.data.address) && (
                        <div className="truncate font-glaze-mono text-[11px] text-[#6B7280]">
                          {child.data.subtitle ?? child.data.address}
                        </div>
                      )}
                    </div>
                    <StatusDot status={cStatus} size="sm" animated={cStatus !== 'normal'} />
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollArea>
      </aside>
    )
  }

  // Standard TopologyNodeItem
  const kind = node.data.kind ?? 'service'
  const kindMeta = TOPOLOGY_KIND_META[kind]
  const hue: Hue = node.data.hue ?? kindMeta.defaultHue
  const status: Status = nodeStatusOverrides?.get(node.id) ?? node.data.status ?? 'normal'
  const sem = SEMANTIC_TOKENS[status]

  const upstreamEdges = edges.filter((e) => e.target === node.id)
  const downstreamEdges = edges.filter((e) => e.source === node.id)

  return (
    <aside
      data-kind={kind}
      data-status={status}
      onClick={stopBubble}
      onPointerDown={stopBubble}
      onTouchStart={stopBubble}
      className={cn(
        'flex w-full max-w-[356px] touch-manipulation flex-col overflow-hidden rounded-tile border border-[#E8EBF0] bg-white',
        className,
      )}
      style={{
        boxShadow: '0 10px 28px rgba(18, 58, 92, 0.1), 0 1px 4px rgba(18, 58, 92, 0.05)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <IconTile hue={hue} size="md">
            {node.data.icon ?? <TopologyKindIcon kind={kind} size={18} />}
          </IconTile>
          <div className="min-w-0">
            <h3 className="m-0 truncate font-glaze-display text-[16px] font-extrabold text-[#1B1F27]">
              {node.data.label}
            </h3>
            <p className="m-0 mt-0.5 truncate font-glaze-mono text-[12px] text-[#6B7280]">
              {node.data.address ?? node.data.subtitle ?? kindMeta.label}
            </p>
          </div>
        </div>
        {onClose && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 touch-manipulation"
            onClick={handleCloseClick}
            aria-label="关闭检查器"
          >
            <X size={15} />
          </Button>
        )}
      </div>

      <ScrollArea className="max-h-[calc(100vh-230px)] flex-1">
        <div className="flex flex-col gap-4 px-5 pb-5">
          {/* Status + Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusPill status={status}>
              {isFaultInjected
                ? '模拟故障源'
                : status === 'error'
                  ? '受影响 / 故障'
                  : status === 'warning'
                    ? '降级告警'
                    : node.data.statusLabel ?? sem.label}
            </StatusPill>
            <HueTag hue={hue} size="xs">
              {node.data.layer ?? kindMeta.label}
            </HueTag>
            {node.data.location && (
              <span className="rounded-full bg-[#F2F3F5] px-2 py-0.5 font-glaze-mono text-[11px] font-medium text-[#5B6170]">
                {node.data.location}
              </span>
            )}
          </div>

          {node.data.description && (
            <p className="m-0 text-[13px] leading-5 text-[#5B6170]">{node.data.description}</p>
          )}

          {/* Metrics Grid */}
          {node.data.metrics && node.data.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {node.data.metrics.map((m, idx) => (
                <div key={idx} className="rounded-[14px] bg-[#F6F7F9] p-3">
                  <span className="block text-[11px] font-medium text-[#8A90A0]">{m.label}</span>
                  <span
                    className="mt-0.5 block font-glaze-mono text-[15px] font-bold"
                    style={{
                      color: m.status ? SEMANTIC_TOKENS[m.status].ink : '#1B1F27',
                    }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Live Telemetry SparkChart */}
          {node.data.series && node.data.series.length > 1 && (
            <div className="rounded-inner bg-[#F6F7F9] p-3.5">
              <div className="mb-2 flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#5B6170]">
                  {node.data.seriesLabel ?? '近 12 周期负载趋势'}
                </span>
                <span className="font-glaze-mono text-[11px] text-[#8A90A0]">
                  {node.data.series[node.data.series.length - 1]}
                  {node.data.seriesUnit ?? ''}
                </span>
              </div>
              <SparkChart
                data={node.data.series}
                variant="area"
                hue={status === 'error' ? 'coral' : status === 'warning' ? 'peach' : hue}
                height={62}
                label={node.data.seriesLabel ?? '指标'}
                unit={node.data.seriesUnit}
              />
            </div>
          )}

          {/* Connected Upstream & Downstream Hops */}
          {(upstreamEdges.length > 0 || downstreamEdges.length > 0) && (
            <div className="flex flex-col gap-2.5">
              {upstreamEdges.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-[#8A90A0]">
                    上游入口（{upstreamEdges.length}）
                  </span>
                  {upstreamEdges.map((edge) => {
                    const peer = nodeMap.get(edge.source)
                    if (!peer) return null
                    const eStatus = edgeStatusOverrides?.get(edge.id) ?? edge.data?.status ?? 'normal'
                    return (
                      <button
                        key={edge.id}
                        type="button"
                        onClick={() => onSelect?.({ type: 'node', id: peer.id })}
                        className="flex cursor-pointer items-center justify-between gap-2 rounded-[12px] bg-[#F6F7F9] px-3 py-2 text-left transition-colors hover:bg-[#EEF7FD]"
                      >
                        <span className="inline-flex min-w-0 items-center gap-2 text-[12.5px] font-semibold text-[#1B1F27]">
                          <ArrowRight size={12} className="shrink-0 text-[#4A9BD8]" />
                          <span className="truncate">{peer.data.label}</span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 font-glaze-mono text-[11px] text-[#6B7280]">
                          {edge.data?.latency ?? edge.data?.bandwidth ?? edge.data?.protocol}
                          <StatusDot status={eStatus} size="sm" animated={false} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {downstreamEdges.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-[#8A90A0]">
                    下游依赖（{downstreamEdges.length}）
                  </span>
                  {downstreamEdges.map((edge) => {
                    const peer = nodeMap.get(edge.target)
                    if (!peer) return null
                    const eStatus = edgeStatusOverrides?.get(edge.id) ?? edge.data?.status ?? 'normal'
                    return (
                      <button
                        key={edge.id}
                        type="button"
                        onClick={() => onSelect?.({ type: 'node', id: peer.id })}
                        className="flex cursor-pointer items-center justify-between gap-2 rounded-[12px] bg-[#F6F7F9] px-3 py-2 text-left transition-colors hover:bg-[#F3F4FE]"
                      >
                        <span className="inline-flex min-w-0 items-center gap-2 text-[12.5px] font-semibold text-[#1B1F27]">
                          <ArrowRight size={12} className="shrink-0 text-[#7B80EA]" />
                          <span className="truncate">{peer.data.label}</span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 font-glaze-mono text-[11px] text-[#6B7280]">
                          {edge.data?.latency ?? edge.data?.bandwidth ?? edge.data?.protocol}
                          <StatusDot status={eStatus} size="sm" animated={false} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Recent Alerts / Events */}
          {node.data.events && node.data.events.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#8A90A0]">最近可观测事件</span>
              <div className="flex flex-col gap-1.5 rounded-inner bg-[#F6F7F9] p-3">
                {node.data.events.map((ev) => (
                  <div key={ev.id} className="flex items-start gap-2 text-[12px]">
                    <StatusDot status={ev.status} size="sm" animated={false} className="mt-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="block text-[#1B1F27]">{ev.message}</span>
                      <span className="font-glaze-mono text-[11px] text-[#8A90A0]">{ev.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fault Simulation & Footer Actions */}
          {(onToggleFault || footerActions) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {onToggleFault && (
                <Button
                  size="sm"
                  variant={isFaultInjected ? 'secondary' : 'danger'}
                  onClick={() => onToggleFault(node.id)}
                  className="flex-1"
                >
                  <WarningCircle size={15} weight="bold" />
                  <span>{isFaultInjected ? '恢复该节点正常' : '模拟该节点故障'}</span>
                </Button>
              )}
              {footerActions}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  )
}
```
