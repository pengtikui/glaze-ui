import * as React from 'react'
import {
  ArrowsClockwise,
  Broadcast,
  HardDrives,
  House,
  Plus,
  ShieldCheck,
  TerminalWindow,
  TreeStructure,
  WifiHigh,
} from '@phosphor-icons/react'
import { AppLauncherCard } from '@/components/cards/app-launcher-card'
import { AreaTrendCard } from '@/components/cards/area-trend-card'
import { BarListCard } from '@/components/cards/bar-list-card'
import { DiskTempCard } from '@/components/cards/disk-temp-card'
import { DistributionBusCard } from '@/components/cards/distribution-bus-card'
import { DotMatrixCard } from '@/components/cards/dot-matrix-card'
import { GaugeCard } from '@/components/cards/gauge-card'
import { HierarchyCard } from '@/components/cards/hierarchy-card'
import { MetricCard } from '@/components/cards/metric-card'
import { ProgressCard } from '@/components/cards/progress-card'
import { QuickEntryCard } from '@/components/cards/quick-entry-card'
import { ServerRackCard } from '@/components/cards/server-rack-card'
import { SignalStrengthCard } from '@/components/cards/signal-strength-card'
import { StatusCard } from '@/components/cards/status-card'
import { SwitchCard } from '@/components/cards/switch-card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Grid } from '@/components/ui/grid'
import { Input } from '@/components/ui/input'
import { Menu } from '@/components/ui/menu'
import { Select } from '@/components/ui/select'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { useToast } from '@/components/ui/toast'
import type { Hue } from '@/lib/tokens'

export function HomelabDemoPage() {
  const toast = useToast()
  const [autoBackup, setAutoBackup] = React.useState(true)
  const [dnsGuard, setDnsGuard] = React.useState(true)
  const [addOpen, setAddOpen] = React.useState(false)
  const [newName, setNewName] = React.useState('')
  const [newUrl, setNewUrl] = React.useState('http://10.10.10.')
  const [newHue, setNewHue] = React.useState<Hue>('sky')

  const [services, setServices] = React.useState<
    { id: string; name: string; mark: string; hue: Hue; badge?: number; url: string }[]
  >([
    { id: 'dsm', name: '群晖 NAS', mark: '群', hue: 'sky', url: '10.10.10.20:5000' },
    { id: 'owrt', name: 'OpenWrt', mark: '路', hue: 'aqua', url: '10.10.10.1' },
    { id: 'graf', name: 'Grafana', mark: '监', hue: 'peach', badge: 1, url: '10.10.10.32:3000' },
    { id: 'ha', name: '智能家居', mark: '家', hue: 'mint', url: '10.10.10.35:8123' },
    { id: 'immich', name: '家庭相册', mark: '相', hue: 'rose', url: '10.10.10.20:2283' },
    { id: 'jelly', name: '影音库', mark: '影', hue: 'lilac', url: '10.10.10.20:8096' },
    { id: 'pve', name: 'Proxmox', mark: '虚', hue: 'periwinkle', url: '10.10.10.10:8006' },
    { id: 'adg', name: 'AdGuard', mark: '盾', hue: 'lemon', url: '10.10.10.1:3001' },
  ])

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    const item = {
      id: String(Date.now()),
      name: newName.trim(),
      mark: newName.trim().slice(0, 1),
      hue: newHue,
      url: newUrl.trim() || '10.10.10.50',
    }
    setServices((prev) => [item, ...prev.slice(0, 7)])
    setNewName('')
    setAddOpen(false)
    toast({
      title: `已添加 ${item.name}`,
      description: `入口地址 ${item.url}`,
      status: 'normal',
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <StatusDot status="normal" animated size="sm" />
            <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
              DEMO 01 · HOME.LOCAL · 家庭内网总控中心
            </span>
          </div>
          <h1 className="m-0 font-glaze-display text-[36px] sm:text-[40px] leading-11 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            晚上好，内网一切安稳
          </h1>
          <p className="m-0 text-[15px] text-[#5B6170]">
            3 台物理主机 · 14 个在线容器 · 今日广告拦截 12,480 次
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <StatusPill status="normal" label="WAN 1000M 已连通" />
          <Dialog
            open={addOpen}
            onOpenChange={setAddOpen}
            trigger={
              <Button variant="primary">
                <Plus size={16} weight="bold" />
                新增服务入口
              </Button>
            }
            title="新增内网服务入口"
            description="添加到应用发射台，方便一键直达"
            footer={
              <>
                <DialogClose render={<Button variant="secondary">取消</Button>} />
                <Button variant="primary" type="submit" form="add-service-form">
                  确认添加
                </Button>
              </>
            }
          >
            <form id="add-service-form" onSubmit={handleAddService} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>服务名称</FieldLabel>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="例如：青龙面板 / Alist"
                  required
                />
              </Field>
              <Field>
                <FieldLabel>内网地址</FieldLabel>
                <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel>图标色相</FieldLabel>
                <Select
                  value={newHue}
                  onValueChange={(v) => setNewHue(v as Hue)}
                  options={[
                    { value: 'sky', label: '天蓝 Sky' },
                    { value: 'mint', label: '薄荷 Mint' },
                    { value: 'peach', label: '杏桃 Peach' },
                    { value: 'lilac', label: '丁香 Lilac' },
                    { value: 'aqua', label: '湖水 Aqua' },
                    { value: 'periwinkle', label: '长春花 Periwinkle' },
                  ]}
                />
              </Field>
            </form>
          </Dialog>

          <Menu
            trigger={<Button variant="secondary">快捷操作</Button>}
            items={[
              {
                id: 'ping',
                label: '刷新全网延迟',
                icon: <ArrowsClockwise size={14} />,
                onSelect: () => toast({ title: '测速完成', description: '平均内网延迟 1.2ms', status: 'normal' }),
              },
              {
                id: 'ssh',
                label: '打开 Web Terminal',
                icon: <TerminalWindow size={14} />,
                onSelect: () => toast({ title: '已就绪', description: 'root@pve-node-01', status: 'info' }),
              },
            ]}
          />
        </div>
      </header>

      <Grid>
        <StatusCard
          tone="mint"
          label="全网健康状态"
          statusText="全部在线"
          status="normal"
          description="14 / 14 服务正常 · 零告警"
          animated
        />
        <MetricCard
          tone="sky"
          label="当前下行带宽"
          value="312"
          unit="Mbps"
          icon={<WifiHigh size={18} weight="bold" />}
        />
        <GaugeCard
          tone="white"
          label="PVE 宿主 CPU"
          percent={28}
          description="Intel N100 · 44°C"
        />
        <ProgressCard
          tone="peach"
          label="群晖 RAID 空间"
          percent={71}
          description="已用 11.4 TB / 共 16 TB"
        />

        <AppLauncherCard
          tone="white"
          title="常用内网服务"
          summary="点击直达"
          apps={services.map((s) => ({
            ...s,
            onClick: () =>
              toast({ title: `正在打开 ${s.name}`, description: s.url, status: 'info' }),
          }))}
        />
        <AreaTrendCard
          tone="white"
          title="24 小时流量趋势"
          summary="峰值 340 Mbps · +14%"
          points={[120, 145, 190, 160, 220, 280, 240, 310, 290, 340, 295, 312]}
          axisLabels={['00:00', '06:00', '12:00', '18:00', '24:00']}
        />

        <ServerRackCard
          tone="ink"
          rackName="核心机柜 · 节点刀片"
          blades={[
            { id: 'NODE-01', role: 'Proxmox 主宿', load: 32, status: 'normal', temp: '44°C' },
            { id: 'NODE-02', role: 'DS920+ NAS', load: 58, status: 'normal', temp: '39°C' },
            { id: 'NODE-03', role: 'OpenWrt 软路由', load: 18, status: 'normal', temp: '36°C' },
            { id: 'NODE-04', role: 'AI 推理节点', load: 86, status: 'warning', temp: '67°C' },
          ]}
        />

        <BarListCard
          tone="white"
          label="容器内存排行"
          bigValue="10.3"
          bigUnit="GB"
          subtitle="共 32 GB 物理内存"
          items={[
            { label: 'Immich 相册', value: '3.8 GB', percent: 76 },
            { label: 'Jellyfin 转码', value: '2.9 GB', percent: 58 },
            { label: 'Home Assistant', value: '1.6 GB', percent: 34 },
            { label: 'Grafana + Prom', value: '1.4 GB', percent: 28 },
            { label: 'AdGuard Home', value: '0.6 GB', percent: 14 },
          ]}
        />

        <SwitchCard
          tone="white"
          title="夜间快照备份"
          description={autoBackup ? '每日 03:00 自动执行' : '已暂停'}
          checked={autoBackup}
          onCheckedChange={setAutoBackup}
          icon={<HardDrives size={18} weight="duotone" />}
          iconHue="aqua"
        />
        <SwitchCard
          tone="white"
          title="DNS 广告过滤"
          description={dnsGuard ? '拦截率 24.6%' : '已关闭'}
          checked={dnsGuard}
          onCheckedChange={setDnsGuard}
          icon={<ShieldCheck size={18} weight="duotone" />}
          iconHue="mint"
        />

        <SignalStrengthCard
          tone="white"
          ssid="Home-6G-Mesh"
          bars={4}
          latency="1.1 ms"
          band="Wi-Fi 6E · 160MHz"
        />
        <DiskTempCard
          tone="coral"
          label="NVMe 缓存温度"
          tempC={46}
          maxC={75}
          device="Samsung 990 Pro"
        />

        <DotMatrixCard
          tone="periwinkle"
          label="容器存活矩阵"
          subLabel="23 / 24 运行"
          total={24}
          active={23}
        />
        <QuickEntryCard
          tone="lilac"
          title="查看 VLAN 拓扑"
          subtitle="4 个子网路由表巡检"
          icon={<TreeStructure size={20} weight="duotone" />}
          onClick={() => toast({ title: 'VLAN 拓扑正常', description: '4 个子网路由表无冲突', status: 'normal' })}
        />

        <DistributionBusCard
          tone="white"
          label="内网节点今日流量分摊"
          totalValue="184.2"
          unit="GB"
          subtitle="近 24 小时各物理主机外网吞吐"
          items={[
            { name: '群晖 NAS', value: 76, display: '76 GB' },
            { name: 'Jellyfin', value: 48, display: '48 GB' },
            { name: 'Immich', value: 32, display: '32 GB' },
            { name: 'AI 节点', value: 18, display: '18 GB' },
            { name: '其他设备', value: 10, display: '10 GB' },
          ]}
          footnote="通过 OpenWrt NetFlow 实时统计"
        />

        <HierarchyCard
          tone="white"
          rootTitle="HomeLab Core"
          rootSubtitle="10.10.0.0/16 · 3 物理宿主机"
          rootIcon={<House size={18} />}
          groups={[
            {
              mark: <Broadcast size={16} />,
              hue: 'aqua',
              name: '基础设施层',
              meta: 'VLAN 10',
              status: 'normal',
              statusLabel: '在线',
              children: [
                { name: 'OpenWrt 主路由', tag: 'GW', tagHue: 'aqua', meta: '10.10.10.1', status: 'normal' },
                { name: 'AdGuard DNS', tag: 'DNS', tagHue: 'mint', meta: '拦截 1.2w/日', status: 'normal' },
              ],
            },
            {
              mark: <HardDrives size={16} />,
              hue: 'lilac',
              name: '存储与影音',
              meta: 'VLAN 20',
              status: 'normal',
              statusLabel: '运行中',
              children: [
                { name: '群晖 DS920+', tag: 'NAS', tagHue: 'sky', meta: '71% 已用', status: 'normal' },
                { name: 'Jellyfin 4K', tag: 'Media', tagHue: 'lilac', meta: '2 路硬解中', status: 'normal' },
              ],
            },
            {
              mark: <House size={16} />,
              hue: 'peach',
              name: '物联网专网',
              meta: 'VLAN 30',
              status: 'normal',
              statusLabel: '62 台',
              children: [
                { name: 'Home Assistant', tag: 'IoT', tagHue: 'mint', meta: '延迟 8ms', status: 'normal' },
                { name: 'Zigbee2MQTT', tag: 'Mesh', tagHue: 'peach', meta: '网关在线', status: 'normal' },
              ],
            },
          ]}
        />
      </Grid>
    </div>
  )
}
