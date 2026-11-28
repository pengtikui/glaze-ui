import * as React from 'react'
import { NodeHealthChainCard } from '@/components/cards/node-health-chain-card'
import { StatusCard } from '@/components/cards/status-card'
import { UptimeStripCard } from '@/components/cards/uptime-strip-card'
import { Button } from '@/components/ui/button'
import { Tile } from '@/components/ui/tile'
import { TopologyCanvas } from '@/components/ui/topology-canvas'
import { TopologyLegend, TopologyToolbar } from '@/components/ui/topology-controls'
import { useToast } from '@/components/ui/toast'
import type { Status } from '@/lib/tokens'
import type { TopologyFlowEdge, TopologyFlowNode } from '@/lib/topology'

const BASE_NODES: TopologyFlowNode[] = [
  {
    id: 'edge',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: { label: 'Edge Gateway', subtitle: '48.2k req/s', kind: 'gateway', hue: 'sky', status: 'normal' },
  },
  {
    id: 'auth',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: { label: 'Auth Service', subtitle: 'P99 8ms', kind: 'service', hue: 'periwinkle', status: 'normal' },
  },
  {
    id: 'api',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: { label: 'Core API', subtitle: 'P99 18ms', kind: 'service', hue: 'mint', status: 'normal' },
  },
  {
    id: 'pg',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: { label: 'Postgres Primary', subtitle: 'CPU 44%', kind: 'database', hue: 'aqua', status: 'normal' },
  },
  {
    id: 'redis',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: { label: 'Redis Cache', subtitle: 'Hit 99.1%', kind: 'cache', hue: 'peach', status: 'normal' },
  },
]

const BASE_EDGES: TopologyFlowEdge[] = [
  { id: 'e1', source: 'edge', target: 'auth', type: 'topologyEdge', data: { label: 'gRPC · 4ms', status: 'normal', animated: true } },
  { id: 'e2', source: 'edge', target: 'api', type: 'topologyEdge', data: { label: 'HTTP/3 · 9ms', status: 'normal', animated: true } },
  { id: 'e3', source: 'api', target: 'pg', type: 'topologyEdge', data: { label: 'SQL · 6ms', status: 'normal', animated: true } },
  { id: 'e4', source: 'api', target: 'redis', type: 'topologyEdge', data: { label: 'RESP · 1ms', status: 'normal', animated: true } },
]

const SLA_30: ('ok' | 'warn' | 'down')[] = Array.from({ length: 30 }, (_, i) =>
  i === 19 ? 'warn' : 'ok',
)

export function TopologyHealthPanelBlock() {
  const toast = useToast()
  const [faultInjected, setFaultInjected] = React.useState(false)

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <StatusCard
          tone={faultInjected ? 'coral' : 'mint'}
          label="生产拓扑状态"
          statusText={faultInjected ? '缓存降级' : '全链路健康'}
          description={faultInjected ? '已自动切换只读回源' : '5 核心服务 · 0 丢包'}
          status={faultInjected ? 'warning' : 'normal'}
        />
        <NodeHealthChainCard
          tone="white"
          title="关键交易路径"
          summaryStatus={faultInjected ? 'warning' : 'normal'}
          summaryLabel={faultInjected ? '回源 32ms' : '端到端 14ms'}
          nodes={[
            { id: 'n1', label: 'Edge', kind: 'gateway', hue: 'sky', status: 'normal', latency: '4ms' },
            { id: 'n2', label: 'Core API', kind: 'service', hue: 'mint', status: 'normal', latency: '9ms' },
            { id: 'n3', label: 'Redis', kind: 'cache', hue: 'peach', status: faultInjected ? 'warning' : 'normal', latency: faultInjected ? '18ms' : '1ms' },
          ]}
        />
        <Tile tone="sky-dark" className="justify-between gap-3">
          <span className="text-[13px] font-semibold text-white/75">混沌演练控制</span>
          <div className="font-glaze-display text-[20px] font-extrabold text-white">
            {faultInjected ? 'Redis 延迟注入中' : '就绪 · 点击演练'}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const next = !faultInjected
              setFaultInjected(next)
              toast({
                title: next ? '已注入 Redis 延迟故障' : '故障已恢复，拓扑回到健康态',
                status: next ? 'warning' : 'normal',
              })
            }}
          >
            {faultInjected ? '恢复健康态' : '注入缓存抖动'}
          </Button>
        </Tile>
      </div>

      <Tile tone="white" className="h-[380px] gap-2 p-4">
        <TopologyCanvas
          nodes={BASE_NODES}
          edges={BASE_EDGES}
          nodeStatusOverrides={
            faultInjected ? new Map<string, Status>([['redis', 'warning']]) : undefined
          }
          autoLayout
          direction="LR"
          surface="canvas"
          className="h-full w-full rounded-inner"
        >
          <TopologyToolbar />
          <TopologyLegend />
        </TopologyCanvas>
      </Tile>

      <UptimeStripCard
        tone="white"
        service="Core API & Edge Gateway · 30 日可用性"
        uptimePct="99.97%"
        days={SLA_30}
      />
    </section>
  )
}
