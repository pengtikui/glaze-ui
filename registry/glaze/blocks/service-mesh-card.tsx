import * as React from 'react'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TopologyCanvas } from '@/components/ui/topology-canvas'
import type { Hue, Status, TileTone } from '@/lib/tokens'
import type {
  TopologyFlowEdge,
  TopologyFlowNode,
  TopologySelection,
} from '@/lib/topology'

export interface ServiceMeshCardMetric {
  label: string
  value: string
  status?: Status
}

export interface ServiceMeshCardProps {
  /** Card title */
  title: string
  /** Optional badge text */
  badge?: string
  /** Badge hue */
  badgeHue?: Hue
  /** Health status */
  status?: Status
  /** Health status text */
  statusLabel?: string
  /** Compact summary metrics shown above the mini topology */
  metrics?: ServiceMeshCardMetric[]
  /** Compact nodes list (recommended 3-6 nodes for 2×2 card) */
  nodes: TopologyFlowNode[]
  /** Links between nodes */
  edges: TopologyFlowEdge[]
  /** Card tone */
  tone?: TileTone
}

/**
 * Compact 2×2 Bento card (`size="l"`) showing a live service dependency or subnet mesh preview
 * with instant click-to-trace highlighting.
 */
export function ServiceMeshCard({
  title,
  badge = 'MESH',
  badgeHue = 'periwinkle',
  status = 'normal',
  statusLabel = '全链路正常',
  metrics,
  nodes,
  edges,
  tone = 'white',
}: ServiceMeshCardProps) {
  const [selection, setSelection] = React.useState<TopologySelection | null>(null)

  return (
    <Tile size="l" tone={tone} className="gap-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h3 className="m-0 font-glaze-display text-[19px] leading-6 font-extrabold text-[#1B1F27]">
            {title}
          </h3>
          <HueTag hue={badgeHue} size="xs">
            {badge}
          </HueTag>
        </div>
        <StatusPill status={status} size="sm">
          {statusLabel}
        </StatusPill>
      </div>

      {metrics && metrics.length > 0 && (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))` }}
        >
          {metrics.slice(0, 3).map((m, idx) => (
            <div key={idx} className="rounded-[14px] bg-[#F6F7F9] px-3 py-2">
              <span className="block text-[11px] text-[#8A90A0]">{m.label}</span>
              <span className="mt-0.5 block font-glaze-mono text-[15px] font-bold text-[#1B1F27]">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="min-h-[250px] flex-1 overflow-hidden rounded-inner">
        <TopologyCanvas
          nodes={nodes}
          edges={edges}
          density="compact"
          selection={selection}
          onSelectionChange={setSelection}
          zoomOnScroll={false}
        />
      </div>
    </Tile>
  )
}
