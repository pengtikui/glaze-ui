import { ArrowRight } from '@phosphor-icons/react'
import { IconTile } from '@/components/ui/icon-tile'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { TopologyKindIcon } from '@/components/ui/topology-node'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'
import type { TopologyNodeKind } from '@/lib/topology'

export interface HealthChainNode {
  id: string
  label: string
  kind: TopologyNodeKind
  hue: Hue
  status: Status
  latency: string
}

export interface NodeHealthChainCardProps {
  title?: string
  summaryStatus?: Status
  summaryLabel?: string
  nodes: HealthChainNode[]
  tone?: TileTone
}

export function NodeHealthChainCard({
  title = '核心调用链路健康',
  summaryStatus = 'normal',
  summaryLabel = '端到端 14ms',
  nodes,
  tone = 'white',
}: NodeHealthChainCardProps) {
  const theme = TILE_THEMES[tone]

  return (
    <Tile size="w" tone={tone} className="justify-between gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        <StatusPill status={summaryStatus} label={summaryLabel} size="sm" />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
        {nodes.map((node, idx) => (
          <div key={node.id} className="flex shrink-0 items-center gap-1.5">
            <div
              className="flex items-center gap-2.5 rounded-inner px-3 py-2.5"
              style={{
                backgroundColor: theme.dark
                  ? 'rgba(255,255,255,0.08)'
                  : theme.bg === '#FFFFFF'
                    ? '#F6F7F9'
                    : 'rgba(255,255,255,0.68)',
              }}
            >
              <IconTile hue={node.hue} size="sm">
                <TopologyKindIcon kind={node.kind} size={16} />
              </IconTile>
              <div className="flex flex-col">
                <span className="flex items-center gap-1.5 text-[12px] font-bold whitespace-nowrap">
                  <span>{node.label}</span>
                  <StatusDot status={node.status} size={6} />
                </span>
                <span
                  className="font-glaze-mono text-[11px] tabular-nums"
                  style={{ color: theme.soft }}
                >
                  {node.latency}
                </span>
              </div>
            </div>
            {idx < nodes.length - 1 && (
              <ArrowRight size={14} weight="bold" style={{ color: theme.soft }} />
            )}
          </div>
        ))}
      </div>
    </Tile>
  )
}
