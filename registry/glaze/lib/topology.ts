import * as React from 'react'
import type { Edge, Node } from '@xyflow/react'
import ELK, { type ElkExtendedEdge, type ElkNode, type LayoutOptions } from 'elkjs/lib/elk.bundled.js'
import type { Hue, Status, TileTone } from '@/lib/tokens'

/**
 * Built-in semantic device & architecture node kinds covering both
 * Cloud/Microservice architectures and Physical/Enterprise/Homelab networks.
 */
export type TopologyNodeKind =
  | 'internet'
  | 'cdn'
  | 'firewall'
  | 'gateway'
  | 'load-balancer'
  | 'router'
  | 'switch'
  | 'ap'
  | 'service'
  | 'cluster'
  | 'database'
  | 'cache'
  | 'queue'
  | 'storage'
  | 'server'
  | 'nas'
  | 'client'
  | 'iot'

/**
 * Semantic container kinds for logical/physical grouping boundaries.
 */
export type TopologyGroupKind = 'vpc' | 'az' | 'subnet' | 'cluster' | 'vlan' | 'rack' | 'zone'

/**
 * Layout direction for automatic hierarchical/layered arrangement.
 */
export type TopologyDirection = 'LR' | 'TB'

export interface TopologyMetric {
  label: string
  value: string
  status?: Status
}

export interface TopologyTag {
  label: string
  hue: Hue
}

export interface TopologyEvent {
  id: string
  time: string
  message: string
  status: Status
}

export interface TopologyNodeData extends Record<string, unknown> {
  /** Primary display title */
  label: string
  /** Secondary subtitle (e.g. IP, CIDR, version, instance spec) */
  subtitle?: string
  /** Semantic device / architecture kind used for default icon & hue */
  kind?: TopologyNodeKind
  /** Accent hue for IconTile & highlight ring */
  hue?: Hue
  /** Optional card surface tone (defaults to 'white') */
  tone?: TileTone
  /** Live health status */
  status?: Status
  /** Custom status badge text */
  statusLabel?: string
  /** Short technical badge (e.g. '10GbE', 'v2.4', 'Primary') */
  badge?: string
  /** Network address / endpoint (e.g. '10.20.0.14', 'alb-prod-01') */
  address?: string
  /** Zone / region / rack location metadata */
  location?: string
  /** Logical layer label (e.g. '边缘接入', '核心路由', '数据层') */
  layer?: string
  /** Compact inline telemetry metrics displayed on the node and inspector */
  metrics?: TopologyMetric[]
  /** Optional sparkline time-series values shown in TopologyInspector */
  series?: number[]
  /** Label for the sparkline metric in TopologyInspector */
  seriesLabel?: string
  /** Unit suffix for the sparkline metric */
  seriesUnit?: string
  /** Small Glaze HueTag chips */
  tags?: TopologyTag[]
  /** Recent observability events / alerts */
  events?: TopologyEvent[]
  /** Human-readable description for inspector details */
  description?: string
  /** Visual density override ('compact' | 'detailed') */
  density?: 'compact' | 'detailed'
  /** Optional custom icon element overriding the built-in kind icon */
  icon?: React.ReactNode
}

export interface TopologyGroupData extends Record<string, unknown> {
  /** Group display title */
  label: string
  /** Secondary CIDR / VLAN / AZ subtitle */
  subtitle?: string
  /** Container kind */
  kind?: TopologyGroupKind
  /** Short badge (e.g. 'VPC', 'AZ-A', 'VLAN 20') */
  badge?: string
  /** Soft Glaze hue family */
  hue?: Hue
  /** Aggregate group health status */
  status?: Status
  /** Summary text (e.g. '4/4 在线') */
  summary?: string
}

export interface TopologyEdgeData extends Record<string, unknown> {
  /** Primary edge pill label (e.g. '10GbE · 0.6ms', 'gRPC · 1.2k rps') */
  label?: string
  /** Protocol or link type (e.g. 'HTTPS', 'gRPC', 'SFP+ 10G', 'BGP') */
  protocol?: string
  /** Current throughput / bandwidth */
  bandwidth?: string
  /** Round-trip latency */
  latency?: string
  /** Packet loss or error rate */
  loss?: string
  /** Link utilization percentage (0-100) */
  utilization?: number
  /** Link health status */
  status?: Status
  /** Whether to render flowing traffic animation */
  animated?: boolean
  /** Whether traffic flows in both directions */
  bidirectional?: boolean
  /** Edge path curve style */
  curve?: 'smoothstep' | 'bezier'
  /** Render static dashed line (e.g. backup / standby / logical link) */
  dashed?: boolean
  /** Optional sparkline throughput history for inspector */
  series?: number[]
  /** Optional notes displayed in inspector */
  description?: string
}

export type TopologyNodeItem = Node<TopologyNodeData, 'topologyNode'>
export type TopologyGroupItem = Node<TopologyGroupData, 'topologyGroup'>
export type TopologyFlowNode = TopologyNodeItem | TopologyGroupItem
export type TopologyFlowEdge = Edge<TopologyEdgeData, 'topologyEdge'>

export interface TopologyTraceResult {
  /** Highlighted node IDs (includes focus node or edge endpoints + traversed hops) */
  nodeIds: Set<string>
  /** Highlighted edge IDs */
  edgeIds: Set<string>
  /** Direct and transitive upstream node IDs */
  upstreamNodeIds: string[]
  /** Direct and transitive downstream node IDs */
  downstreamNodeIds: string[]
}

export interface TopologyFaultImpact {
  /** Map of affected node ID -> effective status ('error' for outage, 'warning' for degraded) */
  nodeStatuses: Map<string, Status>
  /** Map of affected edge ID -> effective status */
  edgeStatuses: Map<string, Status>
  /** Count of impacted downstream nodes (excluding original fault sources) */
  impactedCount: number
}

export const TOPOLOGY_KIND_META: Record<
  TopologyNodeKind,
  { label: string; defaultHue: Hue }
> = {
  internet: { label: '公网入口', defaultHue: 'sky' },
  cdn: { label: '边缘 CDN / WAF', defaultHue: 'aqua' },
  firewall: { label: '防火墙', defaultHue: 'coral' },
  gateway: { label: '网关', defaultHue: 'periwinkle' },
  'load-balancer': { label: '负载均衡', defaultHue: 'sky' },
  router: { label: '路由器', defaultHue: 'sky' },
  switch: { label: '交换机', defaultHue: 'aqua' },
  ap: { label: '无线 AP', defaultHue: 'mint' },
  service: { label: '业务服务', defaultHue: 'periwinkle' },
  cluster: { label: '计算集群', defaultHue: 'lilac' },
  database: { label: '数据库', defaultHue: 'peach' },
  cache: { label: '缓存', defaultHue: 'rose' },
  queue: { label: '消息队列', defaultHue: 'lilac' },
  storage: { label: '对象存储', defaultHue: 'lemon' },
  server: { label: '物理主机', defaultHue: 'periwinkle' },
  nas: { label: '存储 NAS', defaultHue: 'peach' },
  client: { label: '终端设备', defaultHue: 'mint' },
  iot: { label: 'IoT 设备', defaultHue: 'aqua' },
}

export const TOPOLOGY_GROUP_META: Record<
  TopologyGroupKind,
  { label: string; defaultHue: Hue }
> = {
  vpc: { label: 'VPC 专有网络', defaultHue: 'sky' },
  az: { label: '可用区', defaultHue: 'periwinkle' },
  subnet: { label: '子网', defaultHue: 'aqua' },
  cluster: { label: '集群', defaultHue: 'lilac' },
  vlan: { label: 'VLAN 网段', defaultHue: 'mint' },
  rack: { label: '机柜', defaultHue: 'peach' },
  zone: { label: '安全区', defaultHue: 'sky' },
}

/**
 * Type guard to distinguish group container nodes from standard device/service nodes.
 */
export function isTopologyGroupNode(node: TopologyFlowNode): node is TopologyGroupItem {
  return node.type === 'topologyGroup'
}

/**
 * Trace upstream and/or downstream connected paths from a selected node or edge.
 */
export function traceTopologyPath(
  nodes: TopologyFlowNode[],
  edges: TopologyFlowEdge[],
  focus: { type: 'node' | 'edge'; id: string } | null,
  direction: 'both' | 'upstream' | 'downstream' = 'both',
): TopologyTraceResult {
  const nodeIds = new Set<string>()
  const edgeIds = new Set<string>()
  const upstreamSet = new Set<string>()
  const downstreamSet = new Set<string>()

  if (!focus) {
    return { nodeIds, edgeIds, upstreamNodeIds: [], downstreamNodeIds: [] }
  }

  const incoming = new Map<string, TopologyFlowEdge[]>()
  const outgoing = new Map<string, TopologyFlowEdge[]>()
  const nodeMap = new Map<string, TopologyFlowNode>()

  for (const n of nodes) {
    nodeMap.set(n.id, n)
  }
  for (const e of edges) {
    const outList = outgoing.get(e.source) ?? []
    outList.push(e)
    outgoing.set(e.source, outList)

    const inList = incoming.get(e.target) ?? []
    inList.push(e)
    incoming.set(e.target, inList)
  }

  const walkUpstream = (startId: string) => {
    const queue = [startId]
    const visited = new Set<string>([startId])
    while (queue.length > 0) {
      const curr = queue.shift()!
      for (const edge of incoming.get(curr) ?? []) {
        edgeIds.add(edge.id)
        nodeIds.add(edge.source)
        upstreamSet.add(edge.source)
        if (!visited.has(edge.source)) {
          visited.add(edge.source)
          queue.push(edge.source)
        }
      }
    }
  }

  const walkDownstream = (startId: string) => {
    const queue = [startId]
    const visited = new Set<string>([startId])
    while (queue.length > 0) {
      const curr = queue.shift()!
      for (const edge of outgoing.get(curr) ?? []) {
        edgeIds.add(edge.id)
        nodeIds.add(edge.target)
        downstreamSet.add(edge.target)
        if (!visited.has(edge.target)) {
          visited.add(edge.target)
          queue.push(edge.target)
        }
      }
    }
  }

  if (focus.type === 'edge') {
    const edge = edges.find((e) => e.id === focus.id)
    if (edge) {
      edgeIds.add(edge.id)
      nodeIds.add(edge.source)
      nodeIds.add(edge.target)
      upstreamSet.add(edge.source)
      downstreamSet.add(edge.target)
      if (direction === 'both' || direction === 'upstream') walkUpstream(edge.source)
      if (direction === 'both' || direction === 'downstream') walkDownstream(edge.target)
    }
  } else {
    const targetNode = nodeMap.get(focus.id)
    if (targetNode) {
      nodeIds.add(targetNode.id)
      // If a group node is focused, include its direct child nodes and internal/boundary edges
      if (isTopologyGroupNode(targetNode)) {
        const children = nodes.filter((n) => n.parentId === targetNode.id)
        for (const child of children) {
          nodeIds.add(child.id)
          if (direction === 'both' || direction === 'upstream') walkUpstream(child.id)
          if (direction === 'both' || direction === 'downstream') walkDownstream(child.id)
        }
      } else {
        if (direction === 'both' || direction === 'upstream') walkUpstream(targetNode.id)
        if (direction === 'both' || direction === 'downstream') walkDownstream(targetNode.id)
      }
    }
  }

  // Keep parent group containers visible when any of their children are highlighted
  for (const id of [...nodeIds]) {
    const n = nodeMap.get(id)
    if (n?.parentId) nodeIds.add(n.parentId)
  }

  return {
    nodeIds,
    edgeIds,
    upstreamNodeIds: [...upstreamSet],
    downstreamNodeIds: [...downstreamSet],
  }
}

/**
 * Simulate cascading fault impact from one or more failed nodes.
 * - Direct fault sources become 'error'.
 * - Downstream nodes with ALL upstream links failed become 'error';
 *   nodes that still have an alternate healthy upstream link degrade to 'warning'.
 */
export function computeFaultImpact(
  nodes: TopologyFlowNode[],
  edges: TopologyFlowEdge[],
  failedNodeIds: string[],
): TopologyFaultImpact {
  const nodeStatuses = new Map<string, Status>()
  const edgeStatuses = new Map<string, Status>()

  if (failedNodeIds.length === 0) {
    return { nodeStatuses, edgeStatuses, impactedCount: 0 }
  }

  const incoming = new Map<string, TopologyFlowEdge[]>()
  const outgoing = new Map<string, TopologyFlowEdge[]>()

  for (const e of edges) {
    const outList = outgoing.get(e.source) ?? []
    outList.push(e)
    outgoing.set(e.source, outList)

    const inList = incoming.get(e.target) ?? []
    inList.push(e)
    incoming.set(e.target, inList)
  }

  const failedSet = new Set(failedNodeIds)
  for (const id of failedSet) {
    nodeStatuses.set(id, 'error')
  }

  // Propagate iteratively until steady state (handles multi-hop DAG & redundant paths)
  let changed = true
  let guard = 0
  while (changed && guard < nodes.length + 4) {
    changed = false
    guard += 1

    for (const edge of edges) {
      const srcStatus = nodeStatuses.get(edge.source)
      const tgtStatus = nodeStatuses.get(edge.target)
      const nextEdgeStatus: Status | undefined =
        srcStatus === 'error' || tgtStatus === 'error'
          ? 'error'
          : srcStatus === 'warning' || tgtStatus === 'warning'
            ? 'warning'
            : undefined

      if (nextEdgeStatus && edgeStatuses.get(edge.id) !== nextEdgeStatus) {
        edgeStatuses.set(edge.id, nextEdgeStatus)
        changed = true
      }
    }

    for (const node of nodes) {
      if (isTopologyGroupNode(node) || failedSet.has(node.id)) continue
      const inEdges = incoming.get(node.id) ?? []
      if (inEdges.length === 0) continue

      const errorCount = inEdges.filter((e) => nodeStatuses.get(e.source) === 'error').length
      const warnCount = inEdges.filter((e) => nodeStatuses.get(e.source) === 'warning').length

      let nextStatus: Status | undefined
      if (errorCount === inEdges.length) {
        nextStatus = 'error'
      } else if (errorCount > 0 || warnCount > 0) {
        nextStatus = 'warning'
      }

      if (nextStatus && nodeStatuses.get(node.id) !== nextStatus) {
        nodeStatuses.set(node.id, nextStatus)
        changed = true
      }
    }
  }

  // Update group statuses based on child nodes
  for (const node of nodes) {
    if (!isTopologyGroupNode(node)) continue
    const children = nodes.filter((n) => n.parentId === node.id)
    if (children.some((c) => nodeStatuses.get(c.id) === 'error')) {
      nodeStatuses.set(node.id, 'error')
    } else if (children.some((c) => nodeStatuses.get(c.id) === 'warning')) {
      nodeStatuses.set(node.id, 'warning')
    }
  }

  let impactedCount = 0
  for (const [id, st] of nodeStatuses.entries()) {
    if (!failedSet.has(id) && (st === 'error' || st === 'warning')) {
      const n = nodes.find((item) => item.id === id)
      if (n && !isTopologyGroupNode(n)) impactedCount += 1
    }
  }

  return { nodeStatuses, edgeStatuses, impactedCount }
}

export interface TopologyLayoutOptions {
  /** Layout flow orientation ('LR' left-to-right or 'TB' top-to-bottom) */
  direction?: TopologyDirection
  /** Node card density used to estimate unmeasured node dimensions */
  density?: 'compact' | 'detailed'
  /** ELK algorithm (defaults to 'layered', ideal for architecture & network hierarchies) */
  algorithm?: 'layered' | 'mrtree' | 'stress' | 'force'
  /** Gap between consecutive layers / ranks in px */
  rankGap?: number
  /** Gap between sibling nodes in the same layer in px */
  siblingGap?: number
  /** Edge-to-node separation in px */
  edgeNodeGap?: number
  /** Group container internal padding [top, right, bottom, left] */
  groupPadding?: [number, number, number, number]
  /** Optional raw ELK layout options merged into the root graph */
  elkOptions?: LayoutOptions
}

const elkInstance = new ELK()

/**
 * Accurately estimate a Glaze TopologyNode's rendered bounding box from its content
 * (or use React Flow's `node.measured` dimensions when already rendered).
 */
export function estimateTopologyNodeSize(
  node: TopologyNodeItem,
  defaultDensity: 'compact' | 'detailed' = 'detailed',
): { width: number; height: number } {
  if (
    node.measured?.width &&
    node.measured?.height &&
    node.measured.width > 0 &&
    node.measured.height > 0
  ) {
    return {
      width: Math.ceil(node.measured.width),
      height: Math.ceil(node.measured.height),
    }
  }

  const density = node.data.density ?? defaultDensity
  const isCompact = density === 'compact'
  const width =
    typeof node.style?.width === 'number'
      ? node.style.width
      : isCompact
        ? 200
        : 232

  if (typeof node.style?.height === 'number') {
    return { width, height: node.style.height }
  }

  const hasMetrics = !isCompact && Boolean(node.data.metrics && node.data.metrics.length > 0)
  const hasFooter = Boolean(
    node.data.badge ||
      node.data.statusLabel ||
      (node.data.tags && node.data.tags.length > 0) ||
      node.data.status === 'error' ||
      node.data.status === 'warning',
  )

  if (isCompact) {
    return {
      width,
      height: 72 + (hasFooter ? 32 : 0),
    }
  }

  return {
    width,
    height: 80 + (hasMetrics ? 68 : 0) + (hasFooter ? 36 : 0),
  }
}

/**
 * Industry-standard compound graph auto-layout powered by Eclipse Layout Kernel (`elkjs`).
 * - Natively handles nested group containers (`VPC` / `AZ` / `Subnet` / `VLAN`) with zero overlap
 * - Minimizes edge crossings and enforces orthogonal edge separation
 * - Supports seamless `'LR'` (left-to-right) and `'TB'` (top-to-bottom) orientation switching
 */
export async function layoutTopologyGraph(
  nodes: TopologyFlowNode[],
  edges: TopologyFlowEdge[],
  options: TopologyLayoutOptions = {},
): Promise<TopologyFlowNode[]> {
  if (nodes.length === 0) return []

  const {
    direction = 'LR',
    density = 'detailed',
    algorithm = 'layered',
    rankGap = direction === 'LR' ? 124 : 92,
    siblingGap = direction === 'LR' ? 44 : 48,
    edgeNodeGap = 32,
    groupPadding = [66, 28, 28, 28],
    elkOptions,
  } = options

  const [padTop, padRight, padBottom, padLeft] = groupPadding
  const groupPaddingStr = `[top=${padTop},left=${padLeft},bottom=${padBottom},right=${padRight}]`

  const elkDirection = direction === 'LR' ? 'RIGHT' : 'DOWN'
  const nodeMap = new Map<string, TopologyFlowNode>(nodes.map((n) => [n.id, n]))
  const childrenByParent = new Map<string, TopologyFlowNode[]>()

  for (const n of nodes) {
    const parentKey = n.parentId && nodeMap.has(n.parentId) ? n.parentId : '__root__'
    const list = childrenByParent.get(parentKey) ?? []
    list.push(n)
    childrenByParent.set(parentKey, list)
  }

  const buildElkNode = (node: TopologyFlowNode): ElkNode => {
    if (isTopologyGroupNode(node)) {
      const childNodes = childrenByParent.get(node.id) ?? []
      return {
        id: node.id,
        layoutOptions: {
          'elk.algorithm': algorithm,
          'elk.direction': elkDirection,
          'elk.padding': groupPaddingStr,
          'elk.spacing.nodeNode': String(Math.max(32, siblingGap - 4)),
          'elk.layered.spacing.nodeNodeBetweenLayers': String(Math.max(76, rankGap - 16)),
          'elk.spacing.edgeNode': String(edgeNodeGap),
          'elk.spacing.edgeEdge': '20',
          'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
          'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
        },
        children: childNodes.map(buildElkNode),
        ...(childNodes.length === 0 ? { width: 280, height: 180 } : {}),
      }
    }

    const { width, height } = estimateTopologyNodeSize(node, density)
    return {
      id: node.id,
      width,
      height,
    }
  }

  const elkEdges: ElkExtendedEdge[] = edges
    .filter((e) => nodeMap.has(e.source) && nodeMap.has(e.target) && e.source !== e.target)
    .map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    }))

  const elkGraph: ElkNode = {
    id: 'glaze-topology-root',
    layoutOptions: {
      'elk.algorithm': algorithm,
      'elk.direction': elkDirection,
      'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.layered.spacing.nodeNodeBetweenLayers': String(rankGap),
      'elk.spacing.nodeNode': String(siblingGap),
      'elk.spacing.edgeNode': String(edgeNodeGap),
      'elk.spacing.edgeEdge': '20',
      'elk.layered.spacing.edgeNodeBetweenLayers': '36',
      'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
      'elk.padding': '[top=24,left=24,bottom=24,right=24]',
      ...elkOptions,
    },
    children: (childrenByParent.get('__root__') ?? []).map(buildElkNode),
    edges: elkEdges,
  }

  const laidOutRoot = await elkInstance.layout(elkGraph)

  // Pre-order flatten ensures parent group nodes always precede their children (required by React Flow)
  const result: TopologyFlowNode[] = []
  const walk = (elkNode: ElkNode) => {
    for (const child of elkNode.children ?? []) {
      const orig = nodeMap.get(child.id)
      if (!orig) continue

      if (isTopologyGroupNode(orig)) {
        result.push({
          ...orig,
          position: {
            x: Math.round(child.x ?? 0),
            y: Math.round(child.y ?? 0),
          },
          style: {
            ...orig.style,
            width: Math.round(child.width ?? 280),
            height: Math.round(child.height ?? 180),
          },
        })
        walk(child)
      } else {
        result.push({
          ...orig,
          position: {
            x: Math.round(child.x ?? 0),
            y: Math.round(child.y ?? 0),
          },
        })
      }
    }
  }

  walk(laidOutRoot)
  return result
}

/**
 * Compute a stable structural key for a topology graph so React hooks only re-run ELK
 * when nodes, parent hierarchy, edges, direction, or density actually change.
 */
export function getTopologyStructureKey(
  nodes: TopologyFlowNode[],
  edges: TopologyFlowEdge[],
  direction: TopologyDirection,
  density: 'compact' | 'detailed',
): string {
  const nKey = nodes
    .map((n) => {
      if (isTopologyGroupNode(n)) return `g:${n.id}:${n.parentId ?? ''}`
      const mCount = n.data.metrics?.length ?? 0
      const hasFooter =
        n.data.badge || n.data.statusLabel || n.data.tags?.length || n.data.status === 'error' || n.data.status === 'warning'
          ? 1
          : 0
      return `n:${n.id}:${n.parentId ?? ''}:${n.data.density ?? density}:${mCount}:${hasFooter}`
    })
    .join('|')
  const eKey = edges.map((e) => `${e.id}:${e.source}>${e.target}`).join('|')
  return `${direction}::${density}::${nKey}::${eKey}`
}

/**
 * React hook that runs `layoutTopologyGraph` (ELK) asynchronously whenever the graph
 * structure, layout direction, or node density changes, while preserving fresh node data updates.
 */
export function useTopologyLayout(
  nodes: TopologyFlowNode[],
  edges: TopologyFlowEdge[],
  options: TopologyLayoutOptions & { enabled?: boolean } = {},
): { nodes: TopologyFlowNode[]; isLayouting: boolean; layoutVersion: number } {
  const { enabled = true, direction = 'LR', density = 'detailed', ...restOpts } = options
  const structureKey = React.useMemo(
    () => getTopologyStructureKey(nodes, edges, direction, density),
    [nodes, edges, direction, density],
  )

  const [positions, setPositions] = React.useState<
    Map<string, { position: { x: number; y: number }; width?: number; height?: number }>
  >(() => new Map())
  const [layoutVersion, setLayoutVersion] = React.useState(0)
  const [isLayouting, setIsLayouting] = React.useState(enabled)

  const latestNodesRef = React.useRef(nodes)
  const latestEdgesRef = React.useRef(edges)
  const latestOptsRef = React.useRef(restOpts)
  latestNodesRef.current = nodes
  latestEdgesRef.current = edges
  latestOptsRef.current = restOpts

  React.useEffect(() => {
    if (!enabled) {
      setIsLayouting(false)
      return
    }

    let cancelled = false
    setIsLayouting(true)

    layoutTopologyGraph(latestNodesRef.current, latestEdgesRef.current, {
      direction,
      density,
      ...latestOptsRef.current,
    })
      .then((laidOut) => {
        if (cancelled) return
        const nextMap = new Map<
          string,
          { position: { x: number; y: number }; width?: number; height?: number }
        >()
        for (const item of laidOut) {
          nextMap.set(item.id, {
            position: item.position,
            width: typeof item.style?.width === 'number' ? item.style.width : undefined,
            height: typeof item.style?.height === 'number' ? item.style.height : undefined,
          })
        }
        setPositions(nextMap)
        setLayoutVersion((v) => v + 1)
        setIsLayouting(false)
      })
      .catch(() => {
        if (!cancelled) setIsLayouting(false)
      })

    return () => {
      cancelled = true
    }
  }, [enabled, structureKey, direction, density])

  const mergedNodes = React.useMemo(() => {
    if (!enabled || positions.size === 0) return nodes

    // Ensure groups always precede leaf nodes
    const groups: TopologyFlowNode[] = []
    const leaves: TopologyFlowNode[] = []

    for (const n of nodes) {
      const box = positions.get(n.id)
      const updated: TopologyFlowNode = box
        ? isTopologyGroupNode(n)
          ? {
              ...n,
              position: box.position,
              style: {
                ...n.style,
                ...(box.width !== undefined ? { width: box.width } : {}),
                ...(box.height !== undefined ? { height: box.height } : {}),
              },
            }
          : { ...n, position: box.position }
        : n

      if (isTopologyGroupNode(updated)) groups.push(updated)
      else leaves.push(updated)
    }

    return [...groups, ...leaves]
  }, [enabled, nodes, positions])

  return { nodes: mergedNodes, isLayouting, layoutVersion }
}

export interface TopologySelection {
  type: 'node' | 'edge'
  id: string
}

export interface TopologyViewContextValue {
  /** Current layout orientation ('LR' | 'TB') controlling handle positions */
  direction: TopologyDirection
  /** Global toggle for animated flow dashes on edges */
  animateFlow: boolean
  /** Default visual density for topology nodes */
  density: 'compact' | 'detailed'
  /** Active node or edge selection */
  selection: TopologySelection | null
  /** Whether a path trace or search filter is currently dimming unrelated elements */
  hasActiveHighlight: boolean
  /** Highlighted node IDs (active trace / search match) */
  highlightedNodeIds: Set<string>
  /** Highlighted edge IDs (active trace) */
  highlightedEdgeIds: Set<string>
  /** Effective status overrides (e.g. from fault impact simulation) */
  nodeStatusOverrides: Map<string, Status>
  /** Effective edge status overrides (e.g. from fault impact simulation) */
  edgeStatusOverrides: Map<string, Status>
  /** Select a node or edge programmatically */
  selectItem: (selection: TopologySelection | null) => void
}

export const TopologyViewContext = React.createContext<TopologyViewContextValue>({
  direction: 'LR',
  animateFlow: true,
  density: 'detailed',
  selection: null,
  hasActiveHighlight: false,
  highlightedNodeIds: new Set<string>(),
  highlightedEdgeIds: new Set<string>(),
  nodeStatusOverrides: new Map<string, Status>(),
  edgeStatusOverrides: new Map<string, Status>(),
  selectItem: () => {},
})

export function useTopologyView() {
  return React.useContext(TopologyViewContext)
}

