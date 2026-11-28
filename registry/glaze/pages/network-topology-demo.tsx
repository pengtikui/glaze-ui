import * as React from 'react'
import {
  ArrowCounterClockwise,
  Cloud,
  Graph,
  HardDrives,
  Pulse,
  WarningCircle,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { useToast } from '@/components/ui/toast'
import { TopologyCanvas } from '@/components/ui/topology-canvas'
import {
  TopologyLegend,
  TopologyMinimap,
  TopologyToolbar,
} from '@/components/ui/topology-controls'
import { TopologyInspector } from '@/components/ui/topology-inspector'
import type { Status } from '@/lib/tokens'
import {
  computeFaultImpact,
  isTopologyGroupNode,
  type TopologyDirection,
  type TopologyFlowEdge,
  type TopologyFlowNode,
  type TopologySelection,
} from '@/lib/topology'

// ============================================================================
// Preset 1: Cloud Native Microservices & Multi-AZ VPC Architecture
// ============================================================================

const CLOUD_NODES: TopologyFlowNode[] = [
  // Parent Groups (must precede child nodes for React Flow)
  {
    id: 'grp-az-a',
    type: 'topologyGroup',
    position: { x: 560, y: 20 },
    style: { width: 576, height: 336 },
    data: {
      label: '可用区 AZ-A · 核心业务区',
      subtitle: '10.20.1.0/24',
      kind: 'az',
      badge: 'AZ-A',
      hue: 'periwinkle',
      summary: '4 节点在线',
    },
  },
  {
    id: 'grp-az-b',
    type: 'topologyGroup',
    position: { x: 560, y: 382 },
    style: { width: 576, height: 224 },
    data: {
      label: '可用区 AZ-B · 异步与容灾区',
      subtitle: '10.20.2.0/24',
      kind: 'az',
      badge: 'AZ-B',
      hue: 'aqua',
      summary: '2 节点在线',
    },
  },

  // Edge / Ingress Layer
  {
    id: 'cloud-cdn',
    type: 'topologyNode',
    position: { x: 20, y: 230 },
    data: {
      label: 'Edge CDN / WAF',
      subtitle: 'anycast · 42 PoPs',
      kind: 'cdn',
      tone: 'sky-dark',
      hue: 'sky',
      status: 'normal',
      badge: 'HTTP/3',
      address: 'edge.glaze.cloud',
      location: 'Global Anycast',
      layer: '边缘安全接入',
      description: '全球边缘内容分发与 L7 WAF 防护层，拦截异常爬虫与 DDoS 峰值流量。',
      metrics: [
        { label: 'QPS', value: '24.8k' },
        { label: '缓存命中', value: '94.2%', status: 'normal' },
        { label: 'WAF 拦截', value: '182/m' },
      ],
      series: [18.4, 19.2, 21.0, 22.8, 24.1, 23.5, 25.2, 24.4, 24.9, 25.6, 24.5, 24.8],
      seriesLabel: '边缘请求吞吐',
      seriesUnit: 'k rps',
      events: [
        { id: 'e1', time: '14:22:08', message: '边缘规则集 v4.18 全量热更新完成', status: 'normal' },
        { id: 'e2', time: '13:51:12', message: '香港 PoP 拦截异常 CC 突发流量 1.4k rps', status: 'info' },
      ],
    },
  },
  {
    id: 'cloud-alb',
    type: 'topologyNode',
    position: { x: 288, y: 230 },
    data: {
      label: 'API Gateway / ALB',
      subtitle: '10.20.0.10 · TLS 1.3',
      kind: 'load-balancer',
      hue: 'sky',
      status: 'normal',
      badge: 'HA ×2',
      address: '10.20.0.10:443',
      location: 'VPC Ingress',
      layer: '流量调度层',
      description: '双活应用型负载均衡与 API 网关，负责 JWT 鉴权、限流熔断与灰度权重分发。',
      metrics: [
        { label: 'P99 延迟', value: '14ms' },
        { label: '活跃连接', value: '6.4k' },
        { label: '5xx 比例', value: '0.01%', status: 'normal' },
      ],
      series: [12, 13, 12, 15, 16, 14, 13, 14, 15, 14, 13, 14],
      seriesLabel: '网关 P99 延迟',
      seriesUnit: 'ms',
      events: [
        { id: 'e3', time: '14:15:30', message: '上游健康检查全部通过 (4/4)', status: 'normal' },
      ],
    },
  },

  // AZ-A Children
  {
    id: 'cloud-auth',
    type: 'topologyNode',
    parentId: 'grp-az-a',
    extent: 'parent',
    position: { x: 24, y: 66 },
    data: {
      label: 'Auth & Identity',
      subtitle: 'k8s · 6 pods',
      kind: 'service',
      hue: 'periwinkle',
      status: 'normal',
      badge: 'v3.2',
      address: 'svc-auth.prod.svc',
      location: 'AZ-A · K8s',
      layer: '核心微服务',
      description: '统一身份认证、OAuth2 签发与 RBAC 细粒度鉴权服务。',
      metrics: [
        { label: 'CPU', value: '38%' },
        { label: 'P95', value: '8.4ms' },
      ],
      series: [32, 35, 34, 39, 41, 37, 36, 38, 40, 39, 37, 38],
      seriesLabel: 'Pod CPU 平均负载',
      seriesUnit: '%',
    },
  },
  {
    id: 'cloud-order',
    type: 'topologyNode',
    parentId: 'grp-az-a',
    extent: 'parent',
    position: { x: 24, y: 204 },
    data: {
      label: 'Order & Billing',
      subtitle: 'k8s · 12 pods',
      kind: 'service',
      hue: 'periwinkle',
      status: 'warning',
      statusLabel: '延迟偏高',
      badge: 'v5.8',
      address: 'svc-order.prod.svc',
      location: 'AZ-A · K8s',
      layer: '核心微服务',
      description: '交易订单编排、计费扣款与异步事件发件箱核心服务。',
      metrics: [
        { label: 'CPU', value: '76%', status: 'warning' },
        { label: 'P95', value: '68ms', status: 'warning' },
      ],
      series: [42, 46, 51, 58, 63, 70, 74, 72, 78, 81, 77, 76],
      seriesLabel: '订单服务 P95 延迟',
      seriesUnit: 'ms',
      events: [
        { id: 'e4', time: '14:26:41', message: '写库连接池利用率达 82%，已触发 HPA 扩容', status: 'warning' },
      ],
    },
  },
  {
    id: 'cloud-redis',
    type: 'topologyNode',
    parentId: 'grp-az-a',
    extent: 'parent',
    position: { x: 320, y: 66 },
    data: {
      label: 'Redis Cluster',
      subtitle: '6 shards · 64GB',
      kind: 'cache',
      hue: 'rose',
      status: 'normal',
      badge: '0.4ms',
      address: 'redis-prod:6379',
      location: 'AZ-A · Managed',
      layer: '高速缓存层',
      description: '会话令牌、限流计数器与热点商品元数据分布式缓存集群。',
      metrics: [
        { label: '命中率', value: '98.6%' },
        { label: '内存', value: '54%' },
      ],
      series: [51, 52, 52, 53, 53, 54, 54, 53, 54, 55, 54, 54],
      seriesLabel: '内存水位',
      seriesUnit: '%',
    },
  },
  {
    id: 'cloud-pg-primary',
    type: 'topologyNode',
    parentId: 'grp-az-a',
    extent: 'parent',
    position: { x: 320, y: 204 },
    data: {
      label: 'PostgreSQL Primary',
      subtitle: '16vCPU · NVMe',
      kind: 'database',
      hue: 'peach',
      status: 'normal',
      badge: 'RW Primary',
      address: 'pg-primary.db.internal',
      location: 'AZ-A · Stateful',
      layer: '关系型主库',
      description: '核心交易与账户账本主数据库，实时流复制同步至 AZ-B 只读副本。',
      metrics: [
        { label: 'IOPS', value: '14.2k' },
        { label: '连接数', value: '312/500' },
      ],
      series: [11.2, 11.8, 12.4, 13.0, 13.8, 14.5, 14.1, 13.9, 14.6, 14.8, 14.0, 14.2],
      seriesLabel: '磁盘 IOPS',
      seriesUnit: 'k',
      events: [
        { id: 'e5', time: '14:00:00', message: 'WAL 增量备份至对象存储成功 (1.8GB)', status: 'normal' },
      ],
    },
  },

  // AZ-B Children
  {
    id: 'cloud-kafka',
    type: 'topologyNode',
    parentId: 'grp-az-b',
    extent: 'parent',
    position: { x: 24, y: 74 },
    data: {
      label: 'Kafka Event Bus',
      subtitle: '3 brokers · 24 parts',
      kind: 'queue',
      hue: 'lilac',
      status: 'normal',
      badge: 'Lag 12',
      address: 'kafka-bus.prod.svc',
      location: 'AZ-B · Streaming',
      layer: '异步事件总线',
      description: '解耦订单支付、风控审计与数仓同步的高吞吐消息队列。',
      metrics: [
        { label: '入站', value: '4.6k/s' },
        { label: '积压', value: '12 msg' },
      ],
      series: [3.8, 4.1, 4.3, 4.0, 4.5, 4.9, 4.7, 4.4, 4.6, 4.8, 4.5, 4.6],
      seriesLabel: '消息写入速率',
      seriesUnit: 'k/s',
    },
  },
  {
    id: 'cloud-pg-replica',
    type: 'topologyNode',
    parentId: 'grp-az-b',
    extent: 'parent',
    position: { x: 320, y: 74 },
    data: {
      label: 'PostgreSQL Replica',
      subtitle: 'Read Standby · 4ms lag',
      kind: 'database',
      hue: 'aqua',
      status: 'normal',
      badge: 'RO Standby',
      address: 'pg-replica.db.internal',
      location: 'AZ-B · Failover',
      layer: '异地容灾副本',
      description: '跨可用区同步只读副本，承接报表查询并在主库异常时自动切换提升。',
      metrics: [
        { label: '复制延迟', value: '4ms' },
        { label: '只读 QPS', value: '5.1k' },
      ],
      series: [3, 4, 3, 5, 4, 4, 6, 4, 3, 4, 5, 4],
      seriesLabel: 'WAL 复制延迟',
      seriesUnit: 'ms',
    },
  },
]

const CLOUD_EDGES: TopologyFlowEdge[] = [
  {
    id: 'ce-cdn-alb',
    source: 'cloud-cdn',
    target: 'cloud-alb',
    type: 'topologyEdge',
    data: {
      label: 'HTTPS · 2.1 Gbps',
      protocol: 'HTTP/3 · TLS 1.3',
      bandwidth: '2.1 Gbps',
      latency: '4.2ms',
      loss: '0.00%',
      utilization: 42,
      status: 'normal',
      series: [1.6, 1.7, 1.9, 2.0, 2.1, 2.0, 2.2, 2.1, 2.0, 2.2, 2.1, 2.1],
    },
  },
  {
    id: 'ce-alb-auth',
    source: 'cloud-alb',
    target: 'cloud-auth',
    type: 'topologyEdge',
    data: {
      label: 'gRPC · 8.4k rps',
      protocol: 'gRPC mTLS',
      bandwidth: '8.4k rps',
      latency: '2.1ms',
      loss: '0.00%',
      utilization: 34,
      status: 'normal',
      series: [7.1, 7.5, 7.8, 8.0, 8.2, 8.1, 8.4, 8.5, 8.3, 8.4, 8.2, 8.4],
    },
  },
  {
    id: 'ce-alb-order',
    source: 'cloud-alb',
    target: 'cloud-order',
    type: 'topologyEdge',
    data: {
      label: 'gRPC · 68ms',
      protocol: 'gRPC mTLS',
      bandwidth: '5.2k rps',
      latency: '68ms',
      loss: '0.18%',
      utilization: 78,
      status: 'warning',
      series: [38, 41, 45, 50, 56, 61, 64, 66, 70, 69, 67, 68],
      description: '大促波峰期间订单服务上游请求延迟接近 SLA 阈值（80ms）。',
    },
  },
  {
    id: 'ce-auth-redis',
    source: 'cloud-auth',
    target: 'cloud-redis',
    type: 'topologyEdge',
    data: {
      label: 'RESP · 0.4ms',
      protocol: 'Redis TLS',
      bandwidth: '18.2k ops/s',
      latency: '0.4ms',
      loss: '0.00%',
      utilization: 28,
      status: 'normal',
    },
  },
  {
    id: 'ce-order-redis',
    source: 'cloud-order',
    target: 'cloud-redis',
    type: 'topologyEdge',
    data: {
      label: '缓存锁 · 0.6ms',
      protocol: 'Redis TLS',
      bandwidth: '6.4k ops/s',
      latency: '0.6ms',
      loss: '0.00%',
      utilization: 31,
      status: 'normal',
    },
  },
  {
    id: 'ce-order-pg',
    source: 'cloud-order',
    target: 'cloud-pg-primary',
    type: 'topologyEdge',
    data: {
      label: 'SQL RW · 12ms',
      protocol: 'PostgreSQL SSL',
      bandwidth: '3.1k qps',
      latency: '12.4ms',
      loss: '0.02%',
      utilization: 74,
      status: 'warning',
    },
  },
  {
    id: 'ce-order-kafka',
    source: 'cloud-order',
    target: 'cloud-kafka',
    type: 'topologyEdge',
    data: {
      label: 'Async · 4.6k/s',
      protocol: 'Kafka SASL',
      bandwidth: '4.6k msg/s',
      latency: '3.2ms',
      loss: '0.00%',
      utilization: 36,
      status: 'normal',
    },
  },
  {
    id: 'ce-pg-replica',
    source: 'cloud-pg-primary',
    target: 'cloud-pg-replica',
    type: 'topologyEdge',
    data: {
      label: 'WAL Sync · 4ms',
      protocol: 'PG Streaming Replication',
      bandwidth: '140 MB/s',
      latency: '4.0ms',
      loss: '0.00%',
      utilization: 22,
      status: 'normal',
      dashed: true,
    },
  },
]

// ============================================================================
// Preset 2: Physical Enterprise / Homelab Network & VLAN Topology
// ============================================================================

const PHYSICAL_NODES: TopologyFlowNode[] = [
  // VLAN Container Groups
  {
    id: 'grp-vlan-20',
    type: 'topologyGroup',
    position: { x: 840, y: 20 },
    style: { width: 280, height: 344 },
    data: {
      label: 'VLAN 20 · 服务器与存储网',
      subtitle: '192.168.20.0/24',
      kind: 'vlan',
      badge: 'VLAN 20',
      hue: 'peach',
      summary: '2 台 10GbE 在线',
    },
  },
  {
    id: 'grp-vlan-30',
    type: 'topologyGroup',
    position: { x: 840, y: 390 },
    style: { width: 280, height: 224 },
    data: {
      label: 'VLAN 30 · 无线与办公接入',
      subtitle: '192.168.30.0/24',
      kind: 'vlan',
      badge: 'VLAN 30',
      hue: 'mint',
      summary: '46 终端在线',
    },
  },

  // Dual WAN ISPs
  {
    id: 'net-isp-a',
    type: 'topologyNode',
    position: { x: 20, y: 120 },
    data: {
      label: '电信千兆专线 (WAN1)',
      subtitle: '2000M / 200M · 主线',
      kind: 'internet',
      hue: 'sky',
      status: 'normal',
      badge: 'Primary WAN',
      address: '218.82.xx.14',
      location: '机房弱电井 A',
      layer: '外网出口',
      description: '主用 FTTR 专线拨号，承载核心生产出站与 WireGuard 回连流量。',
      metrics: [
        { label: '下行', value: '642 Mbps' },
        { label: '上行', value: '88 Mbps' },
        { label: 'RTT', value: '9ms' },
      ],
      series: [420, 480, 510, 590, 620, 680, 640, 610, 650, 660, 635, 642],
      seriesLabel: 'WAN1 下行速率',
      seriesUnit: ' Mbps',
    },
  },
  {
    id: 'net-isp-b',
    type: 'topologyNode',
    position: { x: 20, y: 340 },
    data: {
      label: '联通宽带备线 (WAN2)',
      subtitle: '1000M / 100M · 备线',
      kind: 'internet',
      hue: 'aqua',
      status: 'normal',
      badge: 'Failover',
      address: '112.64.xx.91',
      location: '机房弱电井 B',
      layer: '冗余出口',
      description: '热备宽带线路，主线连续 3 次探活超时自动无缝切换，日常承载访客流量。',
      metrics: [
        { label: '下行', value: '48 Mbps' },
        { label: 'RTT', value: '14ms' },
      ],
      series: [32, 35, 40, 44, 52, 49, 46, 42, 45, 50, 47, 48],
      seriesLabel: 'WAN2 下行速率',
      seriesUnit: ' Mbps',
    },
  },

  // Boundary Firewall / Router
  {
    id: 'net-fw',
    type: 'topologyNode',
    position: { x: 300, y: 230 },
    data: {
      label: 'OPNsense 边界防火墙',
      subtitle: '192.168.1.1 · 2×10G SFP+',
      kind: 'firewall',
      tone: 'ink',
      hue: 'coral',
      status: 'normal',
      badge: 'WireGuard',
      address: '192.168.1.1',
      location: '机柜 U1',
      layer: '边界路由与安全',
      description: '双 WAN 策略路由、Suricata IDS 入侵检测、VLAN 间 ACL 防火墙与内网 DNS 过滤。',
      metrics: [
        { label: 'CPU', value: '19%' },
        { label: '吞吐', value: '690 Mbps' },
        { label: '会话', value: '12.4k' },
      ],
      series: [16, 18, 17, 21, 22, 20, 19, 18, 21, 20, 18, 19],
      seriesLabel: '防火墙 CPU 负载',
      seriesUnit: '%',
      events: [
        { id: 'ne1', time: '14:18:05', message: 'WireGuard 远程隧道已连接 (MacBook-Pro)', status: 'normal' },
      ],
    },
  },

  // Core 10G Switch
  {
    id: 'net-core-sw',
    type: 'topologyNode',
    position: { x: 568, y: 230 },
    data: {
      label: '核心万兆交换机 L3',
      subtitle: '192.168.10.2 · 8×SFP+ 10G',
      kind: 'switch',
      hue: 'sky',
      status: 'normal',
      badge: 'LACP 20G',
      address: '192.168.10.2',
      location: '机柜 U2',
      layer: '核心汇聚层',
      description: '三层万兆光口核心交换机，负责 VLAN 间线速转发与 PoE++ 下行汇聚。',
      metrics: [
        { label: '背板速率', value: '11.8 Gbps' },
        { label: '温度', value: '43°C' },
        { label: '活跃口', value: '14/16' },
      ],
      series: [8.4, 9.1, 10.2, 11.4, 12.1, 11.6, 10.8, 11.2, 12.4, 12.0, 11.5, 11.8],
      seriesLabel: '交换机总吞吐',
      seriesUnit: ' Gbps',
    },
  },

  // VLAN 20 Children
  {
    id: 'net-pve',
    type: 'topologyNode',
    parentId: 'grp-vlan-20',
    extent: 'parent',
    position: { x: 26, y: 68 },
    data: {
      label: 'Proxmox VE 虚拟化节点',
      subtitle: '192.168.20.10 · 18 VMs',
      kind: 'server',
      hue: 'periwinkle',
      status: 'normal',
      badge: '10GbE Fiber',
      address: '192.168.20.10',
      location: '机柜 U4',
      layer: '计算主机',
      description: '运行 K3s、GitLab、Home Assistant、Immich 与内部 CI Runner 的虚拟化宿主机。',
      metrics: [
        { label: 'CPU', value: '44%' },
        { label: '内存', value: '82/128G' },
      ],
      series: [38, 41, 45, 42, 47, 46, 44, 43, 45, 46, 43, 44],
      seriesLabel: '宿主机 CPU 使用率',
      seriesUnit: '%',
    },
  },
  {
    id: 'net-nas',
    type: 'topologyNode',
    parentId: 'grp-vlan-20',
    extent: 'parent',
    position: { x: 26, y: 206 },
    data: {
      label: '主存储群晖 NAS',
      subtitle: '192.168.20.20 · RAID 6',
      kind: 'nas',
      hue: 'peach',
      status: 'warning',
      statusLabel: '磁盘偏热',
      badge: '2×10G Bond',
      address: '192.168.20.20',
      location: '机柜 U6',
      layer: '集中存储',
      description: '64TB 全闪缓存 + 机械阵列的 SMB / NFS / iSCSI 核心存储，承接剪辑素材与快照备份。',
      metrics: [
        { label: '容量', value: '74%' },
        { label: '盘温', value: '49°C', status: 'warning' },
      ],
      series: [43, 44, 45, 46, 47, 48, 48, 49, 49, 49, 48, 49],
      seriesLabel: '最高硬盘温度',
      seriesUnit: '°C',
      events: [
        { id: 'ne2', time: '14:25:19', message: 'Bay 3 硬盘温度达 49°C，已自动拉高风扇转速', status: 'warning' },
      ],
    },
  },

  // VLAN 30 Children
  {
    id: 'net-ap',
    type: 'topologyNode',
    parentId: 'grp-vlan-30',
    extent: 'parent',
    position: { x: 26, y: 74 },
    data: {
      label: 'Wi-Fi 7 吸顶 AP 集群',
      subtitle: '192.168.30.5 · 6GHz MLO',
      kind: 'ap',
      hue: 'mint',
      status: 'normal',
      badge: 'PoE++ 2.5G',
      address: '192.168.30.5',
      location: '客厅 / 书房 / 会议室',
      layer: '无线接入层',
      description: '3 台三频 Wi-Fi 7 吸顶 AP，支持 802.11k/v/r 无缝漫游与访客 SSID 隔离。',
      metrics: [
        { label: '在线终端', value: '46 台' },
        { label: '信道干扰', value: '6%' },
      ],
      series: [38, 40, 41, 43, 45, 47, 46, 44, 45, 46, 47, 46],
      seriesLabel: '在线无线客户端',
      seriesUnit: ' 台',
    },
  },
]

const PHYSICAL_EDGES: TopologyFlowEdge[] = [
  {
    id: 'pe-isp1-fw',
    source: 'net-isp-a',
    target: 'net-fw',
    type: 'topologyEdge',
    data: {
      label: '2.5G PPPoE · 9ms',
      protocol: '2.5GbE WAN',
      bandwidth: '642 Mbps',
      latency: '9.1ms',
      loss: '0.00%',
      utilization: 32,
      status: 'normal',
    },
  },
  {
    id: 'pe-isp2-fw',
    source: 'net-isp-b',
    target: 'net-fw',
    type: 'topologyEdge',
    data: {
      label: '备线 · 14ms',
      protocol: '1GbE Failover',
      bandwidth: '48 Mbps',
      latency: '14.2ms',
      loss: '0.00%',
      utilization: 5,
      status: 'normal',
      dashed: true,
    },
  },
  {
    id: 'pe-fw-sw',
    source: 'net-fw',
    target: 'net-core-sw',
    type: 'topologyEdge',
    data: {
      label: '10G SFP+ Trunk',
      protocol: '802.1Q Trunk',
      bandwidth: '1.4 Gbps',
      latency: '0.2ms',
      loss: '0.00%',
      utilization: 14,
      status: 'normal',
    },
  },
  {
    id: 'pe-sw-pve',
    source: 'net-core-sw',
    target: 'net-pve',
    type: 'topologyEdge',
    data: {
      label: '10GbE DAC · 0.1ms',
      protocol: 'SFP+ 10G',
      bandwidth: '4.2 Gbps',
      latency: '0.1ms',
      loss: '0.00%',
      utilization: 42,
      status: 'normal',
    },
  },
  {
    id: 'pe-sw-nas',
    source: 'net-core-sw',
    target: 'net-nas',
    type: 'topologyEdge',
    data: {
      label: '20G LACP · 0.2ms',
      protocol: 'LACP Bond 2×10G',
      bandwidth: '6.8 Gbps',
      latency: '0.2ms',
      loss: '0.00%',
      utilization: 34,
      status: 'normal',
    },
  },
  {
    id: 'pe-sw-ap',
    source: 'net-core-sw',
    target: 'net-ap',
    type: 'topologyEdge',
    data: {
      label: '2.5G PoE++ · 34W',
      protocol: '2.5GbE PoE++',
      bandwidth: '820 Mbps',
      latency: '0.8ms',
      loss: '0.00%',
      utilization: 33,
      status: 'normal',
    },
  },
]

type PresetKey = 'cloud' | 'physical'

const PRESETS: Record<
  PresetKey,
  {
    title: string
    badge: string
    subtitle: string
    nodes: TopologyFlowNode[]
    edges: TopologyFlowEdge[]
    quickFaultNodeId: string
    quickFaultLabel: string
  }
> = {
  cloud: {
    title: '云原生微服务架构',
    badge: 'VPC-PROD · AP-EAST',
    subtitle: '点击任意节点或连线追踪上下游依赖链路，或开启故障演练观察级联影响。',
    nodes: CLOUD_NODES,
    edges: CLOUD_EDGES,
    quickFaultNodeId: 'cloud-alb',
    quickFaultLabel: '模拟网关故障',
  },
  physical: {
    title: '物理与 VLAN 网络拓扑',
    badge: 'HOME.LAB · 10GbE',
    subtitle: '双线 ISP 冗余接入、边界防火墙与万兆核心交换机实时端口遥测视图。',
    nodes: PHYSICAL_NODES,
    edges: PHYSICAL_EDGES,
    quickFaultNodeId: 'net-isp-a',
    quickFaultLabel: '模拟电信主线中断',
  },
}

export function NetworkTopologyDemoPage() {
  const toast = useToast()
  const [preset, setPreset] = React.useState<PresetKey>('cloud')
  const [direction, setDirection] = React.useState<TopologyDirection>('LR')
  const [animateFlow, setAnimateFlow] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'all' | Status>('all')
  const [selection, setSelection] = React.useState<TopologySelection | null>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024
      ? { type: 'node', id: 'cloud-order' }
      : null,
  )
  const [faultNodeIds, setFaultNodeIds] = React.useState<string[]>([])

  const currentPreset = PRESETS[preset]
  const layoutNodes = currentPreset.nodes

  const faultImpact = React.useMemo(
    () => computeFaultImpact(layoutNodes, currentPreset.edges, faultNodeIds),
    [layoutNodes, currentPreset.edges, faultNodeIds],
  )

  // Summary KPI stats
  const summary = React.useMemo(() => {
    let total = 0
    let normal = 0
    let warn = 0
    let error = 0
    for (const n of layoutNodes) {
      if (isTopologyGroupNode(n)) continue
      total += 1
      const st = faultImpact.nodeStatuses.get(n.id) ?? n.data.status ?? 'normal'
      if (st === 'error') error += 1
      else if (st === 'warning') warn += 1
      else normal += 1
    }
    return { total, normal, warn, error }
  }, [layoutNodes, faultImpact])

  const handlePresetChange = (next: string) => {
    const key = next as PresetKey
    setPreset(key)
    setFaultNodeIds([])
    setSearchQuery('')
    setStatusFilter('all')
    setSelection(
      typeof window !== 'undefined' && window.innerWidth >= 1024
        ? { type: 'node', id: key === 'cloud' ? 'cloud-order' : 'net-core-sw' }
        : null,
    )
  }

  const handleToggleFault = (nodeId: string) => {
    const targetLabel =
      layoutNodes.find((n) => n.id === nodeId)?.data.label ?? nodeId
    setFaultNodeIds((prev) => {
      const exists = prev.includes(nodeId)
      if (exists) {
        toast({ title: `已恢复节点：${targetLabel}`, status: 'normal' })
        return prev.filter((id) => id !== nodeId)
      }
      toast({
        title: `已注入故障演练：${targetLabel}`,
        description: '下游受影响链路与冗余降级节点已自动高亮',
        status: 'error',
      })
      return [...prev, nodeId]
    })
  }

  const hasQuickFault = faultNodeIds.includes(currentPreset.quickFaultNodeId)

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-[#F2F4F8] text-[#1B1F27]">
      {/* Top Floating Workbench Header */}
      <header className="z-20 flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 pt-4 pb-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#123A5C] text-white">
            <Graph size={22} weight="duotone" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="m-0 font-glaze-display text-[20px] leading-6 font-extrabold tracking-[-0.02em] text-[#123A5C]">
                网络与架构拓扑观测台
              </h1>
              <HueTag hue={preset === 'cloud' ? 'periwinkle' : 'sky'} size="xs">
                {currentPreset.badge}
              </HueTag>
            </div>
            <p className="m-0 mt-0.5 hidden truncate text-[12.5px] text-[#6B7280] md:block">
              {currentPreset.subtitle}
            </p>
          </div>
        </div>

        {/* Center Preset Switcher */}
        <SegmentedControl
          value={preset}
          onValueChange={handlePresetChange}
          options={[
            {
              value: 'cloud',
              label: '云原生架构',
              icon: <Cloud size={15} weight="duotone" />,
            },
            {
              value: 'physical',
              label: '物理 / VLAN 网络',
              icon: <HardDrives size={15} weight="duotone" />,
            },
          ]}
        />

        {/* Right Live Health Summary + Quick Fault Simulation */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 rounded-full bg-white px-3.5 py-2 text-[12px] font-semibold lg:flex">
            <span className="inline-flex items-center gap-1.5 text-[#2F6B28]">
              <StatusDot status="normal" size="sm" animated={false} />
              <span>{summary.normal} 正常</span>
            </span>
            {summary.warn > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[#8A4B12]">
                <StatusDot status="warning" size="sm" animated={false} />
                <span>{summary.warn} 降级</span>
              </span>
            )}
            {summary.error > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[#A6360F]">
                <StatusDot status="error" size="sm" />
                <span>{summary.error} 异常</span>
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={hasQuickFault ? 'danger' : 'secondary'}
            onClick={() => handleToggleFault(currentPreset.quickFaultNodeId)}
          >
            <WarningCircle size={15} weight="bold" />
            <span>{hasQuickFault ? '恢复故障演练' : currentPreset.quickFaultLabel}</span>
          </Button>

          {faultNodeIds.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setFaultNodeIds([])
                toast({ title: '已清除所有模拟故障', status: 'normal' })
              }}
            >
              <ArrowCounterClockwise size={14} />
              <span>全部重置</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main Interactive Topology Viewport */}
      <main className="relative flex-1 overflow-hidden">
        <TopologyCanvas
          nodes={layoutNodes}
          edges={currentPreset.edges}
          direction={direction}
          animateFlow={animateFlow}
          selection={selection}
          onSelectionChange={setSelection}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          nodeStatusOverrides={faultImpact.nodeStatuses}
          edgeStatusOverrides={faultImpact.edgeStatuses}
          fitViewKey={`${preset}-${direction}`}
          draggable
        >
          <TopologyLegend position="top-left" />

          {faultImpact.impactedCount > 0 && (
            <div className="pointer-events-none absolute top-4 left-1/2 z-10 -translate-x-1/2">
              <StatusPill status="error">
                <Pulse size={13} weight="bold" />
                <span>
                  故障演练生效中：{faultNodeIds.length} 个故障源影响 {faultImpact.impactedCount} 个下游节点
                </span>
              </StatusPill>
            </div>
          )}

          <TopologyToolbar
            position="bottom-center"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onDirectionChange={setDirection}
            onAnimateFlowChange={setAnimateFlow}
          />

          <TopologyMinimap position="bottom-right" className="hidden md:block" />
        </TopologyCanvas>

        {/* Floating Right-Side Observability Inspector (sheet overlay on mobile) */}
        {selection && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                e.stopPropagation()
                setSelection(null)
              }
            }}
            className="fixed inset-0 z-30 flex items-end justify-center bg-[#123A5C]/18 p-3 md:pointer-events-none md:absolute md:inset-auto md:top-3 md:right-4 md:bottom-20 md:z-20 md:w-[356px] md:items-start md:justify-end md:bg-transparent md:p-0"
          >
            <TopologyInspector
              nodes={layoutNodes}
              edges={currentPreset.edges}
              selection={selection}
              onClose={() => setSelection(null)}
              onSelect={(next) => setSelection(next)}
              nodeStatusOverrides={faultImpact.nodeStatuses}
              edgeStatusOverrides={faultImpact.edgeStatuses}
              isFaultInjected={
                selection.type === 'node' && faultNodeIds.includes(selection.id)
              }
              onToggleFault={handleToggleFault}
              className="pointer-events-auto max-h-[82dvh] w-full max-w-[440px] md:max-h-full md:max-w-[356px]"
            />
          </div>
        )}
      </main>
    </div>
  )
}
