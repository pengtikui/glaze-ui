import * as React from 'react'
import { TopologyCanvas } from '@/components/ui/topology-canvas'
import {
  TopologyLegend,
  TopologyMinimap,
  TopologyToolbar,
} from '@/components/ui/topology-controls'
import { TopologyGroupSurface } from '@/components/ui/topology-group'
import { TopologyInspector } from '@/components/ui/topology-inspector'
import { TopologyNodeCard } from '@/components/ui/topology-node'
import type { Status } from '@/lib/tokens'
import {
  type TopologyDirection,
  type TopologyFlowEdge,
  type TopologyFlowNode,
  type TopologySelection,
} from '@/lib/topology'
import type { ComponentDemoGroup } from '@/docs/examples/types'

const SAMPLE_NODES: TopologyFlowNode[] = [
  {
    id: 'g-prod',
    type: 'topologyGroup',
    position: { x: 290, y: 20 },
    style: { width: 516, height: 274 },
    data: {
      label: 'VPC 生产区 · AZ-A',
      subtitle: '10.20.1.0/24',
      kind: 'vpc',
      badge: 'VPC',
      hue: 'periwinkle',
      summary: '3 节点在线',
    },
  },
  {
    id: 'n-gw',
    type: 'topologyNode',
    position: { x: 20, y: 112 },
    data: {
      label: 'API Gateway',
      subtitle: '10.20.0.10 · TLS 1.3',
      kind: 'gateway',
      tone: 'sky-dark',
      hue: 'sky',
      status: 'normal',
      badge: 'HA ×2',
      metrics: [
        { label: 'QPS', value: '12.4k' },
        { label: 'P99', value: '14ms' },
      ],
      series: [11, 12, 13, 14, 15, 13, 14, 15, 14, 13, 14, 14],
      seriesLabel: '网关 P99 延迟',
      seriesUnit: 'ms',
    },
  },
  {
    id: 'n-api',
    type: 'topologyNode',
    parentId: 'g-prod',
    extent: 'parent',
    position: { x: 20, y: 92 },
    data: {
      label: 'Order Service',
      subtitle: 'k8s · 8 pods',
      kind: 'service',
      hue: 'periwinkle',
      status: 'warning',
      statusLabel: '延迟偏高',
      badge: 'v4.2',
      metrics: [
        { label: 'CPU', value: '74%', status: 'warning' },
        { label: 'P95', value: '62ms', status: 'warning' },
      ],
      series: [42, 46, 51, 54, 59, 61, 65, 62, 63, 60, 61, 62],
      seriesLabel: 'P95 延迟',
      seriesUnit: 'ms',
      events: [
        { id: 'ev1', time: '14:22:10', message: '连接池水位超过 80%，已触发自动扩容', status: 'warning' },
      ],
    },
  },
  {
    id: 'n-redis',
    type: 'topologyNode',
    parentId: 'g-prod',
    extent: 'parent',
    position: { x: 274, y: 54 },
    data: {
      label: 'Redis Cluster',
      subtitle: '6 shards · 0.4ms',
      kind: 'cache',
      hue: 'rose',
      status: 'normal',
      metrics: [
        { label: '命中率', value: '98.4%' },
        { label: '内存', value: '52%' },
      ],
    },
  },
  {
    id: 'n-pg',
    type: 'topologyNode',
    parentId: 'g-prod',
    extent: 'parent',
    position: { x: 274, y: 164 },
    data: {
      label: 'PostgreSQL Primary',
      subtitle: '16vCPU · NVMe',
      kind: 'database',
      hue: 'peach',
      status: 'normal',
      metrics: [
        { label: 'IOPS', value: '12.1k' },
        { label: '连接', value: '284/500' },
      ],
    },
  },
]

const SAMPLE_EDGES: TopologyFlowEdge[] = [
  {
    id: 'e-gw-api',
    source: 'n-gw',
    target: 'n-api',
    type: 'topologyEdge',
    data: { label: 'gRPC · 62ms', protocol: 'gRPC mTLS', bandwidth: '4.8k rps', latency: '62ms', status: 'warning' },
  },
  {
    id: 'e-api-redis',
    source: 'n-api',
    target: 'n-redis',
    type: 'topologyEdge',
    data: { label: '0.4ms', protocol: 'RESP TLS', bandwidth: '16k ops/s', latency: '0.4ms', status: 'normal' },
  },
  {
    id: 'e-api-pg',
    source: 'n-api',
    target: 'n-pg',
    type: 'topologyEdge',
    data: { label: 'SQL · 11ms', protocol: 'PG SSL', bandwidth: '2.4k qps', latency: '11ms', status: 'normal' },
  },
]

function CanvasInteractiveDemo() {
  const [selection, setSelection] = React.useState<TopologySelection | null>({
    type: 'node',
    id: 'n-api',
  })
  return (
    <div className="h-[340px] w-full overflow-hidden rounded-inner">
      <TopologyCanvas
        nodes={SAMPLE_NODES}
        edges={SAMPLE_EDGES}
        density="compact"
        selection={selection}
        onSelectionChange={setSelection}
      >
        <TopologyLegend position="top-left" />
      </TopologyCanvas>
    </div>
  )
}

function ControlsInteractiveDemo() {
  const [direction, setDirection] = React.useState<TopologyDirection>('LR')
  const [animateFlow, setAnimateFlow] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'all' | Status>('all')

  return (
    <div className="h-[460px] w-full overflow-hidden rounded-inner">
      <TopologyCanvas
        nodes={SAMPLE_NODES}
        edges={SAMPLE_EDGES}
        direction={direction}
        animateFlow={animateFlow}
        density="compact"
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        fitViewKey={direction}
      >
        <TopologyLegend position="top-left" />
        <TopologyToolbar
          position="bottom-center"
          compact
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onDirectionChange={setDirection}
          onAnimateFlowChange={setAnimateFlow}
        />
        <TopologyMinimap position="top-right" width={128} height={78} className="hidden sm:block" />
      </TopologyCanvas>
    </div>
  )
}

function EdgeStatesDemo() {
  const nodes: TopologyFlowNode[] = [
    {
      id: 's1',
      type: 'topologyNode',
      position: { x: 20, y: 20 },
      data: { label: '核心路由器', subtitle: '192.168.1.1', kind: 'router', hue: 'sky', density: 'compact' },
    },
    {
      id: 't1',
      type: 'topologyNode',
      position: { x: 330, y: 20 },
      data: { label: '10G 万兆主链路', subtitle: 'SFP+ 正常', kind: 'switch', hue: 'aqua', density: 'compact' },
    },
    {
      id: 's2',
      type: 'topologyNode',
      position: { x: 20, y: 120 },
      data: { label: '订单服务', subtitle: 'AZ-A', kind: 'service', hue: 'periwinkle', density: 'compact' },
    },
    {
      id: 't2',
      type: 'topologyNode',
      position: { x: 330, y: 120 },
      data: { label: '主数据库', subtitle: '写延迟偏高', kind: 'database', hue: 'peach', status: 'warning', density: 'compact' },
    },
    {
      id: 's3',
      type: 'topologyNode',
      position: { x: 20, y: 220 },
      data: { label: '电信备线 WAN2', subtitle: '热备通道', kind: 'internet', hue: 'mint', density: 'compact' },
    },
    {
      id: 't3',
      type: 'topologyNode',
      position: { x: 330, y: 220 },
      data: { label: '边界防火墙', subtitle: '故障中断', kind: 'firewall', hue: 'coral', status: 'error', density: 'compact' },
    },
  ]

  const edges: TopologyFlowEdge[] = [
    { id: 'ed-1', source: 's1', target: 't1', type: 'topologyEdge', data: { label: '10GbE · 0.2ms', status: 'normal', animated: true } },
    { id: 'ed-2', source: 's2', target: 't2', type: 'topologyEdge', data: { label: 'SQL · 68ms', status: 'warning', curve: 'bezier', animated: true } },
    { id: 'ed-3', source: 's3', target: 't3', type: 'topologyEdge', data: { label: '丢包 100%', status: 'error', dashed: true, animated: true } },
  ]

  return (
    <div className="h-[320px] w-full overflow-hidden rounded-inner">
      <TopologyCanvas nodes={nodes} edges={edges} density="compact" />
    </div>
  )
}

function InspectorInteractiveDemo() {
  const [selection, setSelection] = React.useState<TopologySelection>({ type: 'node', id: 'n-api' })
  return (
    <div className="flex w-full justify-center">
      <TopologyInspector
        nodes={SAMPLE_NODES}
        edges={SAMPLE_EDGES}
        selection={selection}
        onSelect={setSelection}
      />
    </div>
  )
}

export const TOPOLOGY_DEMOS: Record<string, ComponentDemoGroup> = {
  'topology-canvas': {
    hero: {
      surface: 'canvas',
      align: 'start',
      minHeight: 360,
      code: `<TopologyCanvas
  nodes={nodes}
  edges={edges}
  density="compact"
  selection={selection}
  onSelectionChange={setSelection}
>
  <TopologyLegend position="top-left" />
</TopologyCanvas>`,
      render: () => <CanvasInteractiveDemo />,
    },
    examples: [],
  },
  'topology-node': {
    hero: {
      surface: 'canvas',
      align: 'center',
      minHeight: 220,
      code: `<div className="flex flex-wrap gap-4">
  <TopologyNodeCard
    data={{
      label: 'API Gateway',
      subtitle: '10.20.0.10 · TLS 1.3',
      kind: 'gateway',
      tone: 'sky-dark',
      badge: 'HA ×2',
      metrics: [{ label: 'QPS', value: '12.4k' }, { label: 'P99', value: '14ms' }],
    }}
  />
  <TopologyNodeCard
    selected
    data={{
      label: 'Order Service',
      subtitle: 'k8s · 12 pods',
      kind: 'service',
      status: 'warning',
      statusLabel: '延迟偏高',
      metrics: [{ label: 'CPU', value: '76%', status: 'warning' }, { label: 'P95', value: '68ms' }],
    }}
  />
  <TopologyNodeCard
    data={{
      label: '核心万兆交换机',
      subtitle: '192.168.10.2 · 8×SFP+',
      kind: 'switch',
      hue: 'aqua',
      badge: 'LACP 20G',
      metrics: [{ label: '吞吐', value: '11.8G' }, { label: '温度', value: '43°C' }],
    }}
  />
</div>`,
      render: () => (
        <div className="flex flex-wrap items-start justify-center gap-4">
          <TopologyNodeCard
            data={{
              label: 'API Gateway',
              subtitle: '10.20.0.10 · TLS 1.3',
              kind: 'gateway',
              tone: 'sky-dark',
              hue: 'sky',
              badge: 'HA ×2',
              metrics: [
                { label: 'QPS', value: '12.4k' },
                { label: 'P99', value: '14ms' },
              ],
            }}
          />
          <TopologyNodeCard
            selected
            data={{
              label: 'Order Service',
              subtitle: 'k8s · 12 pods',
              kind: 'service',
              hue: 'periwinkle',
              status: 'warning',
              statusLabel: '延迟偏高',
              metrics: [
                { label: 'CPU', value: '76%', status: 'warning' },
                { label: 'P95', value: '68ms', status: 'warning' },
              ],
            }}
          />
          <TopologyNodeCard
            data={{
              label: '核心万兆交换机',
              subtitle: '192.168.10.2 · 8×SFP+',
              kind: 'switch',
              hue: 'aqua',
              badge: 'LACP 20G',
              metrics: [
                { label: '吞吐', value: '11.8G' },
                { label: '温度', value: '43°C' },
              ],
            }}
          />
        </div>
      ),
    },
    examples: [],
  },
  'topology-group': {
    hero: {
      surface: 'canvas',
      align: 'center',
      minHeight: 240,
      code: `<div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
  <TopologyGroupSurface
    className="min-h-[168px]"
    data={{
      label: '可用区 AZ-A · 核心区',
      subtitle: '10.20.1.0/24',
      kind: 'az',
      badge: 'AZ-A',
      hue: 'periwinkle',
      summary: '4 节点在线',
    }}
  />
  <TopologyGroupSurface
    className="min-h-[168px]"
    data={{
      label: 'VLAN 20 · 服务器网',
      subtitle: '192.168.20.0/24',
      kind: 'vlan',
      badge: 'VLAN 20',
      hue: 'peach',
      status: 'warning',
      summary: '1 节点告警',
    }}
  />
</div>`,
      render: () => (
        <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <TopologyGroupSurface
            className="min-h-[168px]"
            data={{
              label: '可用区 AZ-A · 核心区',
              subtitle: '10.20.1.0/24',
              kind: 'az',
              badge: 'AZ-A',
              hue: 'periwinkle',
              summary: '4 节点在线',
            }}
          >
            <div className="px-4 pb-4">
              <TopologyNodeCard
                density="compact"
                className="w-full"
                data={{
                  label: 'Auth Service',
                  subtitle: 'k8s · 6 pods',
                  kind: 'service',
                  hue: 'periwinkle',
                }}
              />
            </div>
          </TopologyGroupSurface>
          <TopologyGroupSurface
            className="min-h-[168px]"
            data={{
              label: 'VLAN 20 · 服务器网',
              subtitle: '192.168.20.0/24',
              kind: 'vlan',
              badge: 'VLAN 20',
              hue: 'peach',
              status: 'warning',
              summary: '1 节点告警',
            }}
          >
            <div className="px-4 pb-4">
              <TopologyNodeCard
                density="compact"
                className="w-full"
                data={{
                  label: '主存储 NAS',
                  subtitle: '192.168.20.20 · 49°C',
                  kind: 'nas',
                  hue: 'peach',
                  status: 'warning',
                }}
              />
            </div>
          </TopologyGroupSurface>
        </div>
      ),
    },
    examples: [],
  },
  'topology-edge': {
    hero: {
      surface: 'canvas',
      align: 'start',
      minHeight: 340,
      code: `<TopologyCanvas nodes={nodes} edges={[
  { id: 'e1', source: 's1', target: 't1', type: 'topologyEdge', data: { label: '10GbE · 0.2ms', status: 'normal', animated: true } },
  { id: 'e2', source: 's2', target: 't2', type: 'topologyEdge', data: { label: 'SQL · 68ms', status: 'warning', curve: 'bezier' } },
  { id: 'e3', source: 's3', target: 't3', type: 'topologyEdge', data: { label: '丢包 100%', status: 'error', dashed: true } },
]} />`,
      render: () => <EdgeStatesDemo />,
    },
    examples: [],
  },
  'topology-controls': {
    hero: {
      surface: 'canvas',
      align: 'start',
      minHeight: 460,
      code: `<TopologyCanvas nodes={nodes} edges={edges} direction={direction} animateFlow={animateFlow}>
  <TopologyLegend position="top-left" />
  <TopologyToolbar
    position="bottom-center"
    searchQuery={searchQuery}
    onSearchChange={setSearchQuery}
    statusFilter={statusFilter}
    onStatusFilterChange={setStatusFilter}
    onDirectionChange={setDirection}
    onAnimateFlowChange={setAnimateFlow}
  />
  <TopologyMinimap position="top-right" />
</TopologyCanvas>`,
      render: () => <ControlsInteractiveDemo />,
    },
    examples: [],
  },
  'topology-inspector': {
    hero: {
      surface: 'canvas',
      align: 'center',
      minHeight: 460,
      code: `<TopologyInspector
  nodes={nodes}
  edges={edges}
  selection={selection}
  onSelect={setSelection}
/>`,
      render: () => <InspectorInteractiveDemo />,
    },
    examples: [],
  },
}
