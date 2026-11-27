import { CodeDeployCard } from '@/components/blocks/code-deploy-card'
import { CommandPaletteBarCard } from '@/components/blocks/command-palette-bar-card'
import { ContactListCard } from '@/components/blocks/contact-list-card'
import { DiskPartitionsCard } from '@/components/blocks/disk-partitions-card'
import { IncidentLogCard } from '@/components/blocks/incident-log-card'
import { QuotaCard } from '@/components/blocks/quota-card'
import { RadarSkillCard } from '@/components/blocks/radar-skill-card'
import { ReleaseChangelogCard } from '@/components/blocks/release-changelog-card'
import { ResourceAllocationCard } from '@/components/blocks/resource-allocation-card'
import { ScatterBubbleCard } from '@/components/blocks/scatter-bubble-card'
import { ServerRackCard } from '@/components/blocks/server-rack-card'
import { ServerResourceCard } from '@/components/blocks/server-resource-card'
import { ServiceStatusMatrixCard } from '@/components/blocks/service-status-matrix-card'
import { SpeedCard } from '@/components/blocks/speed-card'
import { TargetLineCard } from '@/components/blocks/target-line-card'
import { UptimeStripCard } from '@/components/blocks/uptime-strip-card'
import { Button } from '@/components/ui/button'
import { Grid } from '@/components/ui/grid'
import { StatusPill } from '@/components/ui/status-pill'
import { useToast } from '@/components/ui/toast'

const OK_30: ('ok' | 'warn' | 'down')[] = Array.from({ length: 30 }, (_, i) =>
  i === 17 ? 'warn' : 'ok',
)

export function CloudOpsDemoPage() {
  const toast = useToast()

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
            DEMO 06 · CLOUD OPS · 云原生运维与可观测性中心
          </span>
          <h1 className="m-0 font-glaze-display text-[36px] sm:text-[40px] leading-11 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            Production 集群监控总台
          </h1>
          <p className="m-0 text-[15px] text-[#5B6170]">
            华东 / 华北 / 新加坡三地多活 · 142 Pods 运行正常 · P99 延迟 18ms
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <StatusPill status="normal" label="SLA 99.98%" />
          <Button
            variant="primary"
            onClick={() => toast({ title: '全链路拨测已启动', description: '正在探测 18 个边缘接入点', status: 'info' })}
          >
            立即触发巡检
          </Button>
        </div>
      </header>

      <Grid>
        <UptimeStripCard
          tone="white"
          service="API Gateway · 全球边缘接入"
          uptimePct="99.98%"
          days={OK_30}
        />
        <ServerResourceCard
          tone="white"
          nodeName="k8s-prod-sh-01 (主控节点)"
          cpu={41}
          ram={66}
          disk={52}
        />

        <SpeedCard
          tone="white"
          label="边缘网关吞吐"
          value={4.8}
          max={10}
          unit="Gbps"
          sub="峰值上限 10 Gbps"
        />
        <QuotaCard
          tone="periwinkle"
          label="对象存储流量包"
          used={6420}
          total={10000}
          unit="GB"
          resetNote="距下月重置还有 3 天"
        />
        <CodeDeployCard
          tone="white"
          repo="core-gateway-rs"
          branch="main"
          commit="9c41f0b"
          duration="38s"
          status="normal"
          statusLabel="灰度 100%"
        />

        <ServerRackCard
          tone="ink"
          rackName="上海可用区 A · 物理宿主机"
          blades={[
            { id: 'SH-A-01', role: 'Ingress 网关', load: 42, status: 'normal', temp: '46°C' },
            { id: 'SH-A-02', role: 'Postgres 主库', load: 68, status: 'normal', temp: '54°C' },
            { id: 'SH-A-03', role: 'Redis 集群', load: 35, status: 'normal', temp: '41°C' },
            { id: 'SH-A-04', role: 'Worker 计算池', load: 84, status: 'warning', temp: '65°C' },
          ]}
        />

        <IncidentLogCard
          tone="white"
          title="告警与事件响应记录"
          incidents={[
            { id: 'INC-409', title: '亚太边缘缓存命中率短暂下降', service: 'CDN Edge', status: 'warning', statusLabel: '已自愈', time: '28 分钟前' },
            { id: 'INC-408', title: 'Worker-04 CPU 触发弹性扩容', service: 'Queue Pool', status: 'info', statusLabel: '扩容完成', time: '2 小时前' },
            { id: 'INC-407', title: '定时全量备份校验通过', service: 'PG Primary', status: 'normal', statusLabel: '健康', time: '6 小时前' },
            { id: 'INC-406', title: '证书自动续签完成 (365 天)', service: 'TLS Ingress', status: 'normal', statusLabel: '健康', time: '14 小时前' },
          ]}
        />

        <DiskPartitionsCard
          tone="white"
          title="持久化卷容量监控"
          volumes={[
            { name: 'pg-data-primary', usedGb: 780, totalGb: 1024, mount: '/var/lib/pg' },
            { name: 'clickhouse-logs', usedGb: 1620, totalGb: 2048, mount: '/data/ch' },
            { name: 'minio-artifacts', usedGb: 410, totalGb: 1024, mount: '/data/s3' },
            { name: 'prometheus-tsdb', usedGb: 185, totalGb: 512, mount: '/data/tsdb' },
          ]}
        />

        <ContactListCard
          tone="white"
          title="今日 On-Call 值班表"
          contacts={[
            { name: '陆远', role: '主值班 · SRE', initials: '陆', hue: 'sky', status: 'normal' },
            { name: '沈清', role: '备值班 · DBA', initials: '沈', hue: 'mint', status: 'normal' },
            { name: '高翔', role: '网络与安全', initials: '高', hue: 'peach', status: 'info' },
            { name: '许诺', role: '发布协调人', initials: '许', hue: 'lilac', status: 'disabled' },
          ]}
        />

        <RadarSkillCard
          tone="white"
          title="集群六维稳定性评分"
          subtitle="综合得分 94.2 / 100 · 满足金融级容灾标准"
          color="#2FA79B"
          axes={[
            { label: '可用性', value: 98 },
            { label: '低延迟', value: 92 },
            { label: '弹性伸缩', value: 88 },
            { label: '安全合规', value: 96 },
            { label: '成本效率', value: 85 },
            { label: '可观测性', value: 95 },
          ]}
        />

        <ScatterBubbleCard
          tone="white"
          title="边缘节点延迟与吞吐分布"
          subtitle="X 轴 P95 延迟 · Y 轴吞吐量 · 气泡映射并发连接数"
          badge="实时采样"
          badgeHue="aqua"
          xKey="latency"
          yKey="qps"
          zKey="conns"
          xLabel="延迟"
          yLabel="吞吐"
          xUnit="ms"
          yUnit=" req/s"
          series={[
            {
              name: '生产节点',
              hue: 'periwinkle',
              data: [
                { latency: 12, qps: 1850, conns: 210 },
                { latency: 16, qps: 2620, conns: 290 },
                { latency: 21, qps: 3340, conns: 340 },
                { latency: 25, qps: 4100, conns: 390 },
              ],
            },
            {
              name: '金丝雀节点',
              hue: 'aqua',
              data: [
                { latency: 10, qps: 2100, conns: 240 },
                { latency: 14, qps: 3050, conns: 320 },
                { latency: 18, qps: 4320, conns: 410 },
              ],
            },
          ]}
        />

        <TargetLineCard
          tone="white"
          title="网关 P99 响应耗时"
          currentValue="18 ms"
          targetValue={25}
          targetLabel="SLA 红线 25ms"
          status="normal"
          statusLabel="低于阈值"
          xKey="t"
          data={[
            { t: '08:00', p99: 16 },
            { t: '10:00', p99: 21 },
            { t: '12:00', p99: 23 },
            { t: '14:00', p99: 19 },
            { t: '16:00', p99: 17 },
            { t: '18:00', p99: 18 },
          ]}
          series={[{ dataKey: 'p99', label: 'P99 延迟', hue: 'sky', unit: 'ms' }]}
        />

        <ServiceStatusMatrixCard
          tone="white"
          title="全站微服务状态矩阵"
          services={[
            { name: '认证鉴权 Auth', region: '多活', uptime: '100.0%', status: 'normal', bars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
            { name: '实时推送 WS', region: '华东/华北', uptime: '99.96%', status: 'normal', bars: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
            { name: '异步任务队列', region: '华东', uptime: '99.99%', status: 'normal', bars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
            { name: '检索服务 Search', region: '新加坡', uptime: '99.92%', status: 'normal', bars: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1] },
          ]}
        />

        <ResourceAllocationCard
          tone="white"
          title="集群算力成本按业务线分摊"
          teams={[
            { name: '核心交易', share: 38, hue: 'periwinkle', members: ['陆', '陈'], quota: '128 vCPU' },
            { name: 'AI 推理', share: 28, hue: 'lilac', members: ['周', '林'], quota: '8 × H100' },
            { name: '数据平台', share: 22, hue: 'aqua', members: ['吴', '沈'], quota: '96 vCPU' },
            { name: '基础运维', share: 12, hue: 'peach', members: ['高'], quota: '48 vCPU' },
          ]}
        />

        <ReleaseChangelogCard
          tone="white"
          releases={[
            {
              version: 'v4.12.0',
              date: '2026-11-26',
              hue: 'mint',
              title: '边缘网关零停机热重载',
              highlights: ['HTTP/3 QUIC 握手延迟降低 22%', '新增自动金丝雀回滚守护'],
            },
            {
              version: 'v4.11.4',
              date: '2026-11-18',
              hue: 'sky',
              title: '日志压缩与冷热分层',
              highlights: ['ClickHouse 存储占用下降 31%', '支持秒级 Trace 关联检索'],
            },
            {
              version: 'v4.11.0',
              date: '2026-11-09',
              hue: 'periwinkle',
              title: '多区域故障演练自动化',
              highlights: ['一键注入延迟与丢包混沌实验', '自动生成 SLO 影响报告'],
            },
          ]}
        />

        <CommandPaletteBarCard
          tone="ink"
          placeholder="输入 kubectl / 节点名 / 告警 ID 快速跳转…"
          quickActions={[
            { label: '查看 Pod 日志', shortcut: '⌘L' },
            { label: '切换只读模式', shortcut: '⌘R' },
            { label: '回滚上一版', shortcut: '⌘Z' },
          ]}
          onAction={(label) => toast({ title: `运维指令：${label}`, status: 'info' })}
        />
      </Grid>
    </div>
  )
}
