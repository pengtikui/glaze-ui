import * as React from 'react'
import {
  ArrowCounterClockwise,
  HouseLine,
  PlugsConnected,
  Pulse,
  ShareNetwork,
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
// View 1: 家庭全屋物理布线与 VLAN 分区拓扑
// ============================================================================

const HOME_PHYSICAL_NODES: TopologyFlowNode[] = [
  // VLAN / Room Groups (ELK auto-computes exact bounds & child coordinates)
  {
    id: 'home-grp-rack',
    type: 'topologyGroup',
    position: { x: 0, y: 0 },
    data: {
      label: 'VLAN 10 · 书房万兆机柜区',
      subtitle: '192.168.10.0/24 · 10GbE Fiber',
      kind: 'vlan',
      badge: 'VLAN 10',
      hue: 'periwinkle',
      summary: '3 台万兆主机在线',
    },
  },
  {
    id: 'home-grp-media',
    type: 'topologyGroup',
    position: { x: 0, y: 0 },
    data: {
      label: 'VLAN 20 · 客厅影音与游戏区',
      subtitle: '192.168.20.0/24 · 低延迟有线',
      kind: 'vlan',
      badge: 'VLAN 20',
      hue: 'peach',
      summary: '2 台设备在线',
    },
  },
  {
    id: 'home-grp-wifi',
    type: 'topologyGroup',
    position: { x: 0, y: 0 },
    data: {
      label: 'VLAN 30 · 全屋 Wi-Fi 7 Mesh',
      subtitle: '192.168.30.0/24 · 2.5G PoE++',
      kind: 'zone',
      badge: 'Wi-Fi 7',
      hue: 'sky',
      summary: '32 终端漫游正常',
    },
  },
  {
    id: 'home-grp-iot',
    type: 'topologyGroup',
    position: { x: 0, y: 0 },
    data: {
      label: 'VLAN 40 · 智能家居 IoT 隔离网',
      subtitle: '192.168.40.0/24 · 单向 ACL 隔离',
      kind: 'vlan',
      badge: 'IoT 隔离',
      hue: 'mint',
      summary: '42 传感器在线',
    },
  },

  // Dual Broadband Modems (Weak-Current Box)
  {
    id: 'home-isp-ct',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: '电信 2000M 光猫（桥接）',
      subtitle: 'FTTR 2.5G 口 · 公网 IPv4 + IPv6',
      kind: 'internet',
      hue: 'sky',
      status: 'normal',
      badge: 'WAN1 主线',
      address: '218.82.xx.42 / /56',
      location: '入户弱电箱',
      layer: '宽带入户层',
      description: '主用电信千兆光纤桥接模式，由软路由直接 PPPoE 拨号获取动态公网 IPv4 与原生 IPv6 /56 前缀。',
      metrics: [
        { label: '下行', value: '518 Mbps' },
        { label: '上行', value: '96 Mbps' },
        { label: '光衰', value: '-18.4 dBm' },
      ],
      series: [320, 380, 410, 460, 490, 540, 512, 488, 505, 530, 510, 518],
      seriesLabel: 'WAN1 实时下行',
      seriesUnit: ' Mbps',
      events: [
        { id: 'h1', time: '04:00:12', message: 'PPPoE 重拨完成，已更新 DDNS 域名解析', status: 'normal' },
      ],
    },
  },
  {
    id: 'home-isp-cu',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: '联通 1000M 备线光猫',
      subtitle: '桥接模式 · 热备与访客分流',
      kind: 'internet',
      hue: 'aqua',
      status: 'normal',
      badge: 'WAN2 热备',
      address: '112.64.xx.18',
      location: '入户弱电箱',
      layer: '冗余宽带层',
      description: '作为主线断网自动接管的热备宽带，日常承载客卧访客 Wi-Fi 与 BT 下载分流。',
      metrics: [
        { label: '下行', value: '42 Mbps' },
        { label: 'RTT', value: '13ms' },
      ],
      series: [24, 28, 35, 31, 44, 48, 39, 36, 41, 45, 40, 42],
      seriesLabel: 'WAN2 实时下行',
      seriesUnit: ' Mbps',
    },
  },

  // Main Soft Router
  {
    id: 'home-router',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: '主软路由 · iKuai + OpenWrt',
      subtitle: '192.168.1.1 · N100 4×2.5G + 2×10G',
      kind: 'firewall',
      tone: 'sky-dark',
      hue: 'sky',
      status: 'normal',
      badge: 'Tailscale + DNS',
      address: '192.168.1.1',
      location: '弱电箱 / 机柜 U1',
      layer: '家庭核心网关',
      description: '负责双 WAN 策略路由与负载均衡、AdGuard Home 广告过滤、VLAN 间防火墙 ACL 与 WireGuard/Tailscale 远程回家。',
      metrics: [
        { label: 'CPU', value: '16%' },
        { label: '温度', value: '44°C' },
        { label: '连接数', value: '8,420' },
      ],
      series: [14, 15, 17, 16, 19, 21, 18, 16, 15, 17, 16, 16],
      seriesLabel: '软路由 CPU 占用',
      seriesUnit: '%',
      events: [
        { id: 'h2', time: '14:10:02', message: 'AdGuard Home 今日已拦截广告/追踪请求 14,280 次', status: 'normal' },
        { id: 'h3', time: '12:42:18', message: 'Tailscale 子网路由状态健康 (192.168.10.0/24)', status: 'info' },
      ],
    },
  },

  // Core 10G + 2.5G PoE Switch
  {
    id: 'home-switch',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: '核心万兆网管交换机',
      subtitle: '192.168.10.2 · 4×10G SFP+ · 8×2.5G PoE',
      kind: 'switch',
      hue: 'aqua',
      status: 'normal',
      badge: 'L2+ VLAN',
      address: '192.168.10.2',
      location: '书房机柜 U2',
      layer: '全屋汇聚交换',
      description: '承担书房万兆光口高速内网交换，并通过六类/超六类暗线向客厅、卧室 AP 提供 2.5G PoE++ 供电与回程。',
      metrics: [
        { label: '内网速率', value: '8.6 Gbps' },
        { label: 'PoE 功耗', value: '46 / 150W' },
      ],
      series: [4.2, 5.1, 6.4, 7.8, 9.2, 8.9, 7.4, 8.1, 8.8, 9.1, 8.3, 8.6],
      seriesLabel: '背板转发吞吐',
      seriesUnit: ' Gbps',
    },
  },

  // Group 1: Study 10GbE Rack (VLAN 10)
  {
    id: 'home-pve',
    type: 'topologyNode',
    parentId: 'home-grp-rack',
    position: { x: 0, y: 0 },
    data: {
      label: 'Proxmox VE 虚拟化主机',
      subtitle: '192.168.10.10 · 14 容器 / 4 VMs',
      kind: 'server',
      hue: 'periwinkle',
      status: 'normal',
      badge: '10GbE 光纤',
      address: '192.168.10.10',
      location: '书房机柜 U3',
      layer: '家庭计算节点',
      description: '运行 Home Assistant、Immich 照片库、Emby 影音转码、Vaultwarden 密码库与开发测试容器。',
      metrics: [
        { label: 'CPU', value: '34%' },
        { label: '内存', value: '48/64G' },
      ],
      series: [28, 30, 32, 35, 39, 36, 33, 31, 35, 37, 34, 34],
      seriesLabel: '宿主机 CPU',
      seriesUnit: '%',
    },
  },
  {
    id: 'home-nas',
    type: 'topologyNode',
    parentId: 'home-grp-rack',
    position: { x: 0, y: 0 },
    data: {
      label: '主存储 NAS · 64TB RAID6',
      subtitle: '192.168.10.20 · 双万兆聚合',
      kind: 'nas',
      hue: 'peach',
      status: 'warning',
      statusLabel: '3号盘偏热',
      badge: '2×10G LACP',
      address: '192.168.10.20',
      location: '书房机柜 U5',
      layer: '全屋数据中心',
      description: '家庭照片原图、4K 蓝光电影库、Mac TimeMachine 定时备份与摄像头 NVR 录像归档中心。',
      metrics: [
        { label: '已用容量', value: '72%' },
        { label: '盘温', value: '48°C', status: 'warning' },
      ],
      series: [42, 43, 44, 45, 46, 47, 47, 48, 48, 48, 47, 48],
      seriesLabel: '硬盘最高温度',
      seriesUnit: '°C',
      events: [
        { id: 'h4', time: '14:28:10', message: '正在执行每周 RAID 数据校验，3 号盘温度升至 48°C', status: 'warning' },
      ],
    },
  },
  {
    id: 'home-mac',
    type: 'topologyNode',
    parentId: 'home-grp-rack',
    position: { x: 0, y: 0 },
    data: {
      label: 'Mac Studio 书房工作站',
      subtitle: '192.168.10.35 · 10GbE 有线',
      kind: 'client',
      hue: 'sky',
      status: 'normal',
      badge: 'SMB 1.1GB/s',
      address: '192.168.10.35',
      location: '书房桌面',
      layer: '生产桌面端',
      description: '通过万兆网口直连 NAS 剪辑 4K ProRes 素材并连接 PVE 本地开发环境。',
      metrics: [
        { label: 'SMB 读', value: '980 MB/s' },
        { label: '延迟', value: '0.2ms' },
      ],
    },
  },

  // Group 2: Living Room Media & Gaming (VLAN 20)
  {
    id: 'home-atv',
    type: 'topologyNode',
    parentId: 'home-grp-media',
    position: { x: 0, y: 0 },
    data: {
      label: 'Apple TV 4K · 家庭影院',
      subtitle: '192.168.20.12 · Infuse 直连',
      kind: 'client',
      hue: 'peach',
      status: 'normal',
      badge: '4K HDR',
      address: '192.168.20.12',
      location: '客厅电视柜',
      layer: '影音播放端',
      description: '千兆有线接入客厅影音墙，挂载 NAS SMB 共享解码播放 4K Dolby Vision 原盘。',
      metrics: [
        { label: '码率', value: '82 Mbps' },
        { label: '缓冲', value: '0 次' },
      ],
    },
  },
  {
    id: 'home-ps5',
    type: 'topologyNode',
    parentId: 'home-grp-media',
    position: { x: 0, y: 0 },
    data: {
      label: 'PS5 Pro · 游戏主机',
      subtitle: '192.168.20.18 · NAT Type 1',
      kind: 'client',
      hue: 'rose',
      status: 'normal',
      badge: '2.5GbE',
      address: '192.168.20.18',
      location: '客厅电视柜',
      layer: '娱乐主机',
      description: '绑定软路由游戏低延迟策略与 Full-Cone NAT，联机延迟稳定低于 28ms。',
      metrics: [
        { label: '联机 RTT', value: '24ms' },
        { label: '丢包', value: '0%' },
      ],
    },
  },

  // Group 3: Whole-Home Wi-Fi 7 Mesh (VLAN 30)
  {
    id: 'home-ap-living',
    type: 'topologyNode',
    parentId: 'home-grp-wifi',
    position: { x: 0, y: 0 },
    data: {
      label: '客厅主吸顶 AP · Wi-Fi 7',
      subtitle: '192.168.30.2 · 6GHz MLO',
      kind: 'ap',
      hue: 'sky',
      status: 'normal',
      badge: 'PoE++ 2.5G',
      address: '192.168.30.2',
      location: '客厅吊顶',
      layer: '无线主覆盖',
      description: '覆盖客厅、餐厅与阳台区域，支持 802.11k/v/r 无缝漫游与访客 SSID 隔离。',
      metrics: [
        { label: '在线终端', value: '18 台' },
        { label: '协商速率', value: '2.8 Gbps' },
      ],
      series: [14, 15, 16, 17, 19, 18, 17, 18, 19, 18, 17, 18],
      seriesLabel: '连接终端数',
      seriesUnit: ' 台',
    },
  },
  {
    id: 'home-ap-bed',
    type: 'topologyNode',
    parentId: 'home-grp-wifi',
    position: { x: 0, y: 0 },
    data: {
      label: '主卧 / 次卧子 AP · Wi-Fi 7',
      subtitle: '192.168.30.3 · 有线 Mesh 回程',
      kind: 'ap',
      hue: 'aqua',
      status: 'normal',
      badge: 'PoE++ 2.5G',
      address: '192.168.30.3',
      location: '主卧过道面板',
      layer: '卧室无线覆盖',
      description: '通过 2.5G 有线回程接入核心交换机，保证主卧与次卧高速稳定漫游。',
      metrics: [
        { label: '在线终端', value: '14 台' },
        { label: '信道干扰', value: '4%' },
      ],
    },
  },

  // Group 4: Isolated Smart Home IoT (VLAN 40)
  {
    id: 'home-iot-hub',
    type: 'topologyNode',
    parentId: 'home-grp-iot',
    position: { x: 0, y: 0 },
    data: {
      label: 'Matter / Zigbee 中枢网关',
      subtitle: '192.168.40.5 · PoE 有线中枢',
      kind: 'iot',
      hue: 'mint',
      status: 'normal',
      badge: '42 子设备',
      address: '192.168.40.5',
      location: '全屋弱电中枢',
      layer: '智能家居控制',
      description: '全屋灯光、窗帘、温湿度传感器与人体存在雷达的本地化 Matter/Zigbee 网关，禁止主动访问 VLAN 10。',
      metrics: [
        { label: '在线率', value: '100%' },
        { label: '本地延迟', value: '11ms' },
      ],
    },
  },
  {
    id: 'home-nvr-cam',
    type: 'topologyNode',
    parentId: 'home-grp-iot',
    position: { x: 0, y: 0 },
    data: {
      label: '入户 / 阳台安防摄像头 ×4',
      subtitle: '192.168.40.21-24 · RTSP 禁外网',
      kind: 'iot',
      hue: 'lemon',
      status: 'normal',
      badge: '仅内网录像',
      address: '192.168.40.21/29',
      location: '玄关 / 阳台 / 车库',
      layer: '本地安防监控',
      description: '防火墙完全阻断公网访问，仅允许通过 RTSP 推流至 PVE Frigate AI 识别并归档至 NAS。',
      metrics: [
        { label: '总码流', value: '24 Mbps' },
        { label: '外网权限', value: '已阻断' },
      ],
    },
  },
]

const HOME_PHYSICAL_EDGES: TopologyFlowEdge[] = [
  {
    id: 'hpe-ct-rt',
    source: 'home-isp-ct',
    target: 'home-router',
    type: 'topologyEdge',
    data: { label: '2.5G PPPoE · 8ms', protocol: '2.5GbE WAN1', bandwidth: '518 Mbps', latency: '8.2ms', loss: '0.00%', utilization: 26, status: 'normal' },
  },
  {
    id: 'hpe-cu-rt',
    source: 'home-isp-cu',
    target: 'home-router',
    type: 'topologyEdge',
    data: { label: '1G 备线 · 13ms', protocol: '1GbE Failover', bandwidth: '42 Mbps', latency: '13.4ms', loss: '0.00%', utilization: 4, status: 'normal', dashed: true },
  },
  {
    id: 'hpe-rt-sw',
    source: 'home-router',
    target: 'home-switch',
    type: 'topologyEdge',
    data: { label: '10G SFP+ Trunk', protocol: '802.1Q VLAN Trunk', bandwidth: '1.2 Gbps', latency: '0.15ms', loss: '0.00%', utilization: 12, status: 'normal' },
  },
  {
    id: 'hpe-sw-pve',
    source: 'home-switch',
    target: 'home-pve',
    type: 'topologyEdge',
    data: { label: '10G 光纤 · 0.1ms', protocol: '10GbE SFP+', bandwidth: '2.4 Gbps', latency: '0.1ms', loss: '0.00%', utilization: 24, status: 'normal' },
  },
  {
    id: 'hpe-sw-nas',
    source: 'home-switch',
    target: 'home-nas',
    type: 'topologyEdge',
    data: { label: '20G LACP · 0.2ms', protocol: '2×10GbE LACP', bandwidth: '4.8 Gbps', latency: '0.2ms', loss: '0.00%', utilization: 24, status: 'normal' },
  },
  {
    id: 'hpe-sw-mac',
    source: 'home-switch',
    target: 'home-mac',
    type: 'topologyEdge',
    data: { label: '10GbE 桌面线', protocol: '10GBASE-T', bandwidth: '1.1 Gbps', latency: '0.2ms', loss: '0.00%', utilization: 11, status: 'normal' },
  },
  {
    id: 'hpe-sw-atv',
    source: 'home-switch',
    target: 'home-atv',
    type: 'topologyEdge',
    data: { label: '1GbE 影音口', protocol: 'VLAN 20 Access', bandwidth: '82 Mbps', latency: '0.4ms', loss: '0.00%', utilization: 8, status: 'normal' },
  },
  {
    id: 'hpe-sw-ps5',
    source: 'home-switch',
    target: 'home-ps5',
    type: 'topologyEdge',
    data: { label: '2.5GbE 游戏口', protocol: 'VLAN 20 QoS', bandwidth: '120 Mbps', latency: '0.3ms', loss: '0.00%', utilization: 5, status: 'normal' },
  },
  {
    id: 'hpe-sw-ap1',
    source: 'home-switch',
    target: 'home-ap-living',
    type: 'topologyEdge',
    data: { label: '2.5G PoE++ · 24W', protocol: '2.5GbE PoE++', bandwidth: '410 Mbps', latency: '0.5ms', loss: '0.00%', utilization: 16, status: 'normal' },
  },
  {
    id: 'hpe-sw-ap2',
    source: 'home-switch',
    target: 'home-ap-bed',
    type: 'topologyEdge',
    data: { label: '2.5G PoE++ · 22W', protocol: '2.5GbE PoE++', bandwidth: '260 Mbps', latency: '0.6ms', loss: '0.00%', utilization: 10, status: 'normal' },
  },
  {
    id: 'hpe-sw-iot',
    source: 'home-switch',
    target: 'home-iot-hub',
    type: 'topologyEdge',
    data: { label: '1G PoE · 隔离', protocol: 'VLAN 40 Isolated', bandwidth: '4 Mbps', latency: '0.9ms', loss: '0.00%', utilization: 1, status: 'normal' },
  },
  {
    id: 'hpe-sw-cam',
    source: 'home-switch',
    target: 'home-nvr-cam',
    type: 'topologyEdge',
    data: { label: 'RTSP · 24 Mbps', protocol: 'VLAN 40 -> NVR', bandwidth: '24 Mbps', latency: '1.1ms', loss: '0.00%', utilization: 3, status: 'normal' },
  },
]

// ============================================================================
// View 2: 家庭自托管服务与异地安全访问架构
// ============================================================================

const HOME_SERVICES_NODES: TopologyFlowNode[] = [
  {
    id: 'svc-grp-media',
    type: 'topologyGroup',
    position: { x: 0, y: 0 },
    data: {
      label: '家庭影音与相册服务',
      subtitle: 'PVE Docker · 依赖 NAS 存储池',
      kind: 'cluster',
      badge: 'MEDIA',
      hue: 'peach',
      summary: '2 服务在线',
    },
  },
  {
    id: 'svc-grp-life',
    type: 'topologyGroup',
    position: { x: 0, y: 0 },
    data: {
      label: '智能家居与个人效率',
      subtitle: 'PVE 本地 SSD · 高可用常驻',
      kind: 'cluster',
      badge: 'SELF-HOSTED',
      hue: 'mint',
      summary: '2 服务在线',
    },
  },

  {
    id: 'svc-remote-client',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: '外部终端 · 手机 / 笔记本',
      subtitle: '5G / 咖啡馆远程回家',
      kind: 'client',
      hue: 'sky',
      status: 'normal',
      badge: 'iOS / macOS',
      address: 'Remote Roaming',
      layer: '外部访问端',
      description: '外出时通过 HTTPS 反代或 Tailscale P2P 加密隧道无感访问家中相册、影库与智能家居。',
      metrics: [
        { label: '隧道模式', value: 'P2P 直连' },
        { label: '延迟', value: '22ms' },
      ],
    },
  },
  {
    id: 'svc-tunnel',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: 'Tailscale + Lucky 反代网关',
      subtitle: 'HTTPS 自动证书 · 零端口暴露',
      kind: 'gateway',
      tone: 'sky-dark',
      hue: 'periwinkle',
      status: 'normal',
      badge: 'TLS 1.3 + ACL',
      address: 'home.example.me',
      layer: '安全接入网关',
      description: '统一签发通配符 Let’s Encrypt SSL 证书，对外零暴露 SSH/管理口，所有内部服务经反代鉴权分发。',
      metrics: [
        { label: '日访问', value: '1,840 次' },
        { label: '拦截扫描', value: '64 次' },
      ],
      series: [120, 145, 160, 190, 210, 175, 165, 180, 195, 205, 188, 192],
      seriesLabel: '每小时反代请求',
      seriesUnit: ' req',
    },
  },
  {
    id: 'svc-nas-pool',
    type: 'topologyNode',
    position: { x: 0, y: 0 },
    data: {
      label: 'NAS 媒体与备份存储池',
      subtitle: 'NFSv4 / SMB3 · 64TB RAID6',
      kind: 'nas',
      hue: 'peach',
      status: 'normal',
      badge: '共享数据底座',
      address: '192.168.10.20:/volume1',
      layer: '底层持久化存储',
      description: '以万兆 NFS 只读/读写挂载提供给影音与相册容器，并每日凌晨向云端对象存储增量加密异地备份。',
      metrics: [
        { label: 'NFS IOPS', value: '3.4k' },
        { label: '可用空间', value: '17.8 TB' },
      ],
    },
  },

  // Media Group
  {
    id: 'svc-emby',
    type: 'topologyNode',
    parentId: 'svc-grp-media',
    position: { x: 0, y: 0 },
    data: {
      label: 'Emby / Jellyfin 影库',
      subtitle: 'Intel QSV 4K 硬件转码',
      kind: 'service',
      hue: 'peach',
      status: 'normal',
      badge: '2,480 部影片',
      address: 'media.home.me',
      layer: '家庭媒体服务',
      description: '自动刮削海报墙与字幕，外网播放支持 QSV 实时转码降码率。',
      metrics: [
        { label: '并发流', value: '2 路' },
        { label: 'GPU 转码', value: '28%' },
      ],
    },
  },
  {
    id: 'svc-immich',
    type: 'topologyNode',
    parentId: 'svc-grp-media',
    position: { x: 0, y: 0 },
    data: {
      label: 'Immich 家庭智能相册',
      subtitle: 'CLIP 语义搜图 · 自动同步',
      kind: 'service',
      hue: 'rose',
      status: 'normal',
      badge: '84,200 张',
      address: 'photos.home.me',
      layer: '家庭媒体服务',
      description: '替代云相册的私有照片备份方案，自动按人物、地点与场景建立本地 AI 向量索引。',
      metrics: [
        { label: '同步状态', value: '已最新' },
        { label: '索引库', value: '1.8 TB' },
      ],
    },
  },

  // Smart Home & Productivity Group
  {
    id: 'svc-ha',
    type: 'topologyNode',
    parentId: 'svc-grp-life',
    position: { x: 0, y: 0 },
    data: {
      label: 'Home Assistant 智能中枢',
      subtitle: '42 设备 · 18 条本地自动化',
      kind: 'service',
      hue: 'mint',
      status: 'normal',
      badge: 'HomeKit Bridge',
      address: 'ha.home.me',
      layer: '全屋自动化',
      description: '接入米家、Matter 与 Apple HomeKit，断外网仍可 100% 本地执行灯光与恒温自动化。',
      metrics: [
        { label: '自动化', value: '18 条' },
        { label: '响应', value: '14ms' },
      ],
    },
  },
  {
    id: 'svc-vault',
    type: 'topologyNode',
    parentId: 'svc-grp-life',
    position: { x: 0, y: 0 },
    data: {
      label: 'Vaultwarden + 个人知识库',
      subtitle: '端到端加密 · 每日快照',
      kind: 'database',
      hue: 'periwinkle',
      status: 'normal',
      badge: 'E2EE',
      address: 'vault.home.me',
      layer: '个人数字资产',
      description: '全平台 Bitwarden 密码同步与私有笔记知识库，运行于本地 NVMe 并定时异地加密归档。',
      metrics: [
        { label: '条目', value: '612 项' },
        { label: '备份', value: '今日 03:00' },
      ],
    },
  },
]

const HOME_SERVICES_EDGES: TopologyFlowEdge[] = [
  {
    id: 'hse-client-gw',
    source: 'svc-remote-client',
    target: 'svc-tunnel',
    type: 'topologyEdge',
    data: { label: 'WireGuard · 22ms', protocol: 'Tailscale / HTTPS', bandwidth: '68 Mbps', latency: '22ms', loss: '0.00%', status: 'normal' },
  },
  {
    id: 'hse-gw-emby',
    source: 'svc-tunnel',
    target: 'svc-emby',
    type: 'topologyEdge',
    data: { label: 'HTTPS · 24 Mbps', protocol: 'Reverse Proxy', bandwidth: '24 Mbps', latency: '2.4ms', status: 'normal' },
  },
  {
    id: 'hse-gw-immich',
    source: 'svc-tunnel',
    target: 'svc-immich',
    type: 'topologyEdge',
    data: { label: 'HTTPS · 同步中', protocol: 'Reverse Proxy', bandwidth: '38 Mbps', latency: '3.1ms', status: 'normal' },
  },
  {
    id: 'hse-gw-ha',
    source: 'svc-tunnel',
    target: 'svc-ha',
    type: 'topologyEdge',
    data: { label: 'WSS · 实时状态', protocol: 'WebSocket TLS', bandwidth: '0.4 Mbps', latency: '1.8ms', status: 'normal' },
  },
  {
    id: 'hse-gw-vault',
    source: 'svc-tunnel',
    target: 'svc-vault',
    type: 'topologyEdge',
    data: { label: 'TLS 1.3 · E2EE', protocol: 'HTTPS', bandwidth: '0.2 Mbps', latency: '1.4ms', status: 'normal' },
  },
  {
    id: 'hse-nas-emby',
    source: 'svc-nas-pool',
    target: 'svc-emby',
    type: 'topologyEdge',
    data: { label: 'NFS 10G · 媒体库', protocol: 'NFSv4 RO', bandwidth: '180 MB/s', latency: '0.3ms', status: 'normal', dashed: true },
  },
  {
    id: 'hse-nas-immich',
    source: 'svc-nas-pool',
    target: 'svc-immich',
    type: 'topologyEdge',
    data: { label: 'NFS 10G · 原图盘', protocol: 'NFSv4 RW', bandwidth: '92 MB/s', latency: '0.3ms', status: 'normal', dashed: true },
  },
]

type HomeViewKey = 'physical' | 'services'

const HOME_VIEWS: Record<
  HomeViewKey,
  {
    badge: string
    subtitle: string
    nodes: TopologyFlowNode[]
    edges: TopologyFlowEdge[]
    defaultSelectedId: string
    quickFaultNodeId: string
    quickFaultLabel: string
  }
> = {
  physical: {
    badge: 'HOME.LAN · 10GbE + Wi-Fi 7',
    subtitle: '双宽带光猫桥接 → 软路由 → 万兆核心交换机 → 书房机柜 / 客厅影音 / Wi-Fi 7 / IoT 隔离四区拓扑。',
    nodes: HOME_PHYSICAL_NODES,
    edges: HOME_PHYSICAL_EDGES,
    defaultSelectedId: 'home-nas',
    quickFaultNodeId: 'home-isp-ct',
    quickFaultLabel: '模拟电信主线断网',
  },
  services: {
    badge: 'HOMELAB · SELF-HOSTED',
    subtitle: '展示外部设备经 Tailscale / 反代安全回家访问 Emby、Immich、Home Assistant 与 NAS 存储池的依赖关系。',
    nodes: HOME_SERVICES_NODES,
    edges: HOME_SERVICES_EDGES,
    defaultSelectedId: 'svc-tunnel',
    quickFaultNodeId: 'svc-nas-pool',
    quickFaultLabel: '模拟 NAS 存储离线',
  },
}

export function HomeNetworkDemoPage() {
  const toast = useToast()
  const [view, setView] = React.useState<HomeViewKey>('physical')
  const [direction, setDirection] = React.useState<TopologyDirection>('LR')
  const [animateFlow, setAnimateFlow] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'all' | Status>('all')
  const [selection, setSelection] = React.useState<TopologySelection | null>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024
      ? { type: 'node', id: 'home-nas' }
      : null,
  )
  const [faultNodeIds, setFaultNodeIds] = React.useState<string[]>([])

  const currentView = HOME_VIEWS[view]

  const faultImpact = React.useMemo(
    () => computeFaultImpact(currentView.nodes, currentView.edges, faultNodeIds),
    [currentView, faultNodeIds],
  )

  const summary = React.useMemo(() => {
    let normal = 0
    let warn = 0
    let error = 0
    for (const n of currentView.nodes) {
      if (isTopologyGroupNode(n)) continue
      const st = faultImpact.nodeStatuses.get(n.id) ?? n.data.status ?? 'normal'
      if (st === 'error') error += 1
      else if (st === 'warning') warn += 1
      else normal += 1
    }
    return { normal, warn, error }
  }, [currentView, faultImpact])

  const handleViewChange = (next: string) => {
    const key = next as HomeViewKey
    setView(key)
    setFaultNodeIds([])
    setSearchQuery('')
    setStatusFilter('all')
    setSelection(
      typeof window !== 'undefined' && window.innerWidth >= 1024
        ? { type: 'node', id: HOME_VIEWS[key].defaultSelectedId }
        : null,
    )
  }

  const handleToggleFault = (nodeId: string) => {
    const targetLabel =
      currentView.nodes.find((n) => n.id === nodeId)?.data.label ?? nodeId
    setFaultNodeIds((prev) => {
      const exists = prev.includes(nodeId)
      if (exists) {
        toast({ title: `已恢复正常：${targetLabel}`, status: 'normal' })
        return prev.filter((id) => id !== nodeId)
      }
      toast({
        title: `排障演练：${targetLabel} 已断连`,
        description: '已自动标出主备切换降级与受影响的下游设备/服务',
        status: 'error',
      })
      return [...prev, nodeId]
    })
  }

  const hasQuickFault = faultNodeIds.includes(currentView.quickFaultNodeId)

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-[#F2F4F8] text-[#1B1F27]">
      {/* Workbench Header */}
      <header className="z-20 flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 pt-4 pb-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#0B3D38] text-white">
            <HouseLine size={22} weight="duotone" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="m-0 font-glaze-display text-[20px] leading-6 font-extrabold tracking-[-0.02em] text-[#123A5C]">
                家庭内网与 Homelab 架构图
              </h1>
              <HueTag hue={view === 'physical' ? 'aqua' : 'peach'} size="xs">
                {currentView.badge}
              </HueTag>
            </div>
            <p className="m-0 mt-0.5 hidden truncate text-[12.5px] text-[#6B7280] md:block">
              {currentView.subtitle}
            </p>
          </div>
        </div>

        {/* Dual View Switcher */}
        <SegmentedControl
          value={view}
          onValueChange={handleViewChange}
          options={[
            {
              value: 'physical',
              label: '全屋物理与 VLAN',
              icon: <PlugsConnected size={15} weight="duotone" />,
            },
            {
              value: 'services',
              label: '自托管与远程回家',
              icon: <ShareNetwork size={15} weight="duotone" />,
            },
          ]}
        />

        {/* Health Summary & Fault Drill */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 rounded-full bg-white px-3.5 py-2 text-[12px] font-semibold lg:flex">
            <span className="inline-flex items-center gap-1.5 text-[#2F6B28]">
              <StatusDot status="normal" size="sm" animated={false} />
              <span>{summary.normal} 在线</span>
            </span>
            {summary.warn > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[#8A4B12]">
                <StatusDot status="warning" size="sm" animated={false} />
                <span>{summary.warn} 注意</span>
              </span>
            )}
            {summary.error > 0 && (
              <span className="inline-flex items-center gap-1.5 text-[#A6360F]">
                <StatusDot status="error" size="sm" />
                <span>{summary.error} 离线</span>
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={hasQuickFault ? 'danger' : 'secondary'}
            onClick={() => handleToggleFault(currentView.quickFaultNodeId)}
          >
            <WarningCircle size={15} weight="bold" />
            <span>{hasQuickFault ? '恢复排障演练' : currentView.quickFaultLabel}</span>
          </Button>

          {faultNodeIds.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setFaultNodeIds([])
                toast({ title: '已恢复全部设备正常状态', status: 'normal' })
              }}
            >
              <ArrowCounterClockwise size={14} />
              <span>重置</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main ELK-Powered Interactive Topology Viewport */}
      <main className="relative flex-1 overflow-hidden">
        <TopologyCanvas
          nodes={currentView.nodes}
          edges={currentView.edges}
          direction={direction}
          animateFlow={animateFlow}
          selection={selection}
          onSelectionChange={setSelection}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          nodeStatusOverrides={faultImpact.nodeStatuses}
          edgeStatusOverrides={faultImpact.edgeStatuses}
          fitViewKey={`${view}-${direction}`}
          draggable
        >
          <TopologyLegend position="top-left" />

          {faultImpact.impactedCount > 0 && (
            <div className="pointer-events-none absolute top-4 left-1/2 z-10 -translate-x-1/2">
              <StatusPill status="error">
                <Pulse size={13} weight="bold" />
                <span>
                  排障演练中：{faultNodeIds.length} 处故障导致 {faultImpact.impactedCount} 个下游设备/服务受影响
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

        {/* Right Floating Device / Link Telemetry Inspector (sheet overlay on mobile) */}
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
              nodes={currentView.nodes}
              edges={currentView.edges}
              selection={selection}
              onClose={() => setSelection(null)}
              onSelect={setSelection}
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
