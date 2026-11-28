import * as React from 'react'
import { ArrowsOutSimple, Pulse } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TopologyCanvas } from '@/components/ui/topology-canvas'
import { TopologyLegend, TopologyToolbar } from '@/components/ui/topology-controls'
import type { Hue, Status, TileTone } from '@/lib/tokens'
import type {
  TopologyDirection,
  TopologyFlowEdge,
  TopologyFlowNode,
  TopologySelection,
} from '@/lib/topology'

export interface TopologyMapCardProps {
  /** Card header title */
  title: string
  /** Optional subtitle describing the architecture or subnet */
  subtitle?: string
  /** Optional category tag */
  tag?: string
  /** Tag hue */
  tagHue?: Hue
  /** Overall health status pill */
  status?: Status
  /** Overall health status label */
  statusLabel?: string
  /** Topology graph nodes */
  nodes: TopologyFlowNode[]
  /** Topology graph edges */
  edges: TopologyFlowEdge[]
  /** Initial layout orientation */
  direction?: TopologyDirection
  /** Height of the embedded interactive canvas in px */
  canvasHeight?: number
  /** Card background tone */
  tone?: TileTone
  /** Optional callback for expanding into a dedicated full-screen workbench */
  onExpand?: () => void
}

/**
 * Full-width Bento dashboard card (`size="f"`) embedding an interactive Glaze TopologyCanvas.
 * Clicking any node highlights its upstream/downstream path directly inside the dashboard.
 */
export function TopologyMapCard({
  title,
  subtitle,
  tag = 'TOPOLOGY',
  tagHue = 'sky',
  status = 'normal',
  statusLabel = '链路健康',
  nodes,
  edges,
  direction = 'LR',
  canvasHeight = 420,
  tone = 'white',
  onExpand,
}: TopologyMapCardProps) {
  const [selection, setSelection] = React.useState<TopologySelection | null>(null)
  const [animateFlow, setAnimateFlow] = React.useState(true)

  const selectedLabel = React.useMemo(() => {
    if (!selection) return null
    if (selection.type === 'node') {
      return nodes.find((n) => n.id === selection.id)?.data.label ?? null
    }
    return edges.find((e) => e.id === selection.id)?.data?.label ?? '选中链路'
  }, [selection, nodes, edges])

  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 font-glaze-display text-[20px] leading-6.5 font-extrabold text-[#1B1F27]">
              {title}
            </h3>
            <HueTag hue={tagHue} size="xs">
              {tag}
            </HueTag>
            <StatusPill status={status} size="sm">
              {statusLabel}
            </StatusPill>
          </div>
          {subtitle && <p className="m-0 text-[13px] text-[#6B7280]">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {selectedLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4FE] px-3 py-1 text-[12px] font-semibold text-[#4A4FB8]">
              <Pulse size={13} weight="bold" />
              <span>已追踪：{selectedLabel}</span>
            </span>
          )}
          {onExpand && (
            <Button size="sm" variant="secondary" onClick={onExpand}>
              <ArrowsOutSimple size={14} />
              <span>全屏观测</span>
            </Button>
          )}
        </div>
      </div>

      <div
        className="w-full overflow-hidden rounded-inner"
        style={{ height: canvasHeight }}
      >
        <TopologyCanvas
          nodes={nodes}
          edges={edges}
          direction={direction}
          animateFlow={animateFlow}
          density="compact"
          selection={selection}
          onSelectionChange={setSelection}
        >
          <TopologyLegend position="top-left" />
          <TopologyToolbar
            position="bottom-right"
            onAnimateFlowChange={setAnimateFlow}
            showZoomControls
          />
        </TopologyCanvas>
      </div>
    </Tile>
  )
}
