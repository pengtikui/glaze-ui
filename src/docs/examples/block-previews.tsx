import * as React from 'react'
import {
  Bell,
  Broadcast,
  Cpu,
  HardDrives,
  House,
  Lamp,
  LockKey,
  Pulse,
  ShieldCheck,
  Stack,
  Television,
  WifiHigh,
} from '@phosphor-icons/react'
import {
  ActivityFeedCard,
  AlertBannerCard,
  AppLauncherCard,
  AreaTrendCard,
  AudioNowPlayingCard,
  BarListCard,
  BatteryCard,
  BudgetMeterCard,
  CalendarCard,
  ChatPreviewCard,
  ChecklistCard,
  ClockCard,
  CodeDeployCard,
  CommandPaletteBarCard,
  CompareCard,
  ComposedOverviewCard,
  ComposedRevenueCard,
  ContactListCard,
  CountdownCard,
  CurrencyCard,
  DataTableCard,
  DeviceControlStripCard,
  DiskPartitionsCard,
  DiskTempCard,
  DistributionBarCard,
  DistributionBusCard,
  DonutChartCard,
  DotMatrixCard,
  DualSeriesTrendCard,
  EventTimelineCard,
  FileListCard,
  FlightRouteCard,
  FloorPlanSensorCard,
  FunnelCard,
  GalleryMosaicCard,
  GanttScheduleCard,
  GaugeCard,
  GraphicMetricCard,
  GroupedBarChartCard,
  HabitTrackerCard,
  HealthPulseCard,
  HeatmapCard,
  HeroMetricCard,
  HierarchyCard,
  HorizontalBarRankCard,
  IncidentLogCard,
  InteractiveAnalyticsCard,
  ItemListCard,
  KanbanMiniCard,
  KeyShortcutCard,
  KpiStripCard,
  LeaderboardCard,
  MediaPlayerCard,
  MembersCard,
  MetricBarsCard,
  MetricCard,
  MetricComparisonTableCard,
  MilestoneBannerCard,
  MiniCalendarDayCard,
  MultiMetricCard,
  MultiRadarCompareCard,
  NotificationCard,
  NotificationDigestCard,
  ObjectDetailCard,
  PhaseTimelineCard,
  PomodoroCard,
  PriceTickerCard,
  PricingPlansCard,
  ProfileSummaryCard,
  ProgressCard,
  QrCard,
  QuickActionGridCard,
  QuickEntryCard,
  QuickNoteCard,
  QuickSearchCard,
  QuickSettingsCard,
  QuotaCard,
  QuoteCard,
  RadarSkillCard,
  RadialGoalsCard,
  RadialScoreCard,
  RankListCard,
  RatingCard,
  ReleaseChangelogCard,
  ResourceAllocationCard,
  RevenueBreakdownCard,
  RingCard,
  ScatterBubbleCard,
  ScheduleAgendaCard,
  ServerRackCard,
  ServerResourceCard,
  ServiceStatusMatrixCard,
  SignalStrengthCard,
  SliderControlCard,
  SparkAreaCard,
  SparkMetricRowCard,
  SpeedCard,
  StackedAreaTrendCard,
  StackedColumnCard,
  StatusCard,
  StepsCard,
  StreakCard,
  SwitchCard,
  TagCloudCard,
  TargetLineCard,
  TemperatureCard,
  TrendCard,
  UptimeStripCard,
  VerticalBarsCard,
  WaterIntakeCard,
  WeatherCard,
  WeatherForecastCard,
  type DataTableRow,
} from '@/components/blocks'
import { useToast } from '@/components/ui/toast'

const SAMPLE_TABLE_ROWS: DataTableRow[] = [
  {
    id: '1',
    name: '季度规划',
    group: '规划',
    groupHue: 'periwinkle',
    owner: '林一',
    ownerAvatar: '林',
    ownerHue: 'rose',
    progress: 100,
    stateKey: 'done',
    stateLabel: '已完成',
    status: 'normal',
    updatedAt: '11月20日',
  },
  {
    id: '2',
    name: '设计评审',
    group: '设计',
    groupHue: 'lilac',
    owner: '周舟',
    ownerAvatar: '周',
    ownerHue: 'aqua',
    progress: 75,
    stateKey: 'doing',
    stateLabel: '进行中',
    status: 'info',
    updatedAt: '今天 11:00',
  },
  {
    id: '3',
    name: '性能回归',
    group: '工程',
    groupHue: 'sky',
    owner: '陈晨',
    ownerAvatar: '陈',
    ownerHue: 'lemon',
    progress: 40,
    stateKey: 'risk',
    stateLabel: '有风险',
    status: 'error',
    updatedAt: '今天 09:20',
  },
]

const OK_30: ('ok' | 'warn' | 'down')[] = Array.from({ length: 30 }, (_, i) =>
  i === 14 ? 'warn' : i === 22 ? 'down' : 'ok',
)

export interface BlockPreviewContext {
  toast: ReturnType<typeof useToast>
  demoSwitch: boolean
  setDemoSwitch: (v: boolean) => void
}

export const BLOCK_PREVIEW_RENDERERS: Record<string, (ctx: BlockPreviewContext) => React.ReactNode> = {
  'spark-area-card': () => (
    <SparkAreaCard
                    tone="sky"
                    label="今日活跃会话"
                    value="18.4"
                    unit="k"
                    delta="+14.2%"
                    points={[24, 32, 29, 44, 52, 48, 66, 74]}
                  />
  ),
  'radial-score-card': () => (
    <RadialScoreCard
                    tone="white"
                    label="体验健康度"
                    score="91"
                    scoreLabel="总分"
                    rings={[
                      { name: '性能', value: 94, hue: 'mint' },
                      { name: '稳定', value: 91, hue: 'periwinkle' },
                      { name: '安全', value: 88, hue: 'sky' },
                    ]}
                  />
  ),
  'radial-goals-card': () => (
    <RadialGoalsCard
                    tone="white"
                    title="季度关键目标"
                    subtitle="Q4 OKR"
                    centerValue="86%"
                    goals={[
                      { name: '营收达成', value: 94, hue: 'periwinkle', detail: '¥462万' },
                      { name: '净留存 NRR', value: 86, hue: 'aqua', detail: '124%' },
                      { name: '交付提效', value: 78, hue: 'peach', detail: '4.2 天' },
                    ]}
                  />
  ),
  'stacked-column-card': () => (
    <StackedColumnCard
                    tone="white"
                    label="本周工单处理"
                    totalValue="342"
                    unit="单"
                    xKey="day"
                    data={[
                      { day: '一', done: 42, doing: 18 },
                      { day: '二', done: 54, doing: 14 },
                      { day: '三', done: 48, doing: 22 },
                      { day: '四', done: 61, doing: 16 },
                      { day: '五', done: 52, doing: 15 },
                    ]}
                    series={[
                      { dataKey: 'done', label: '已解决', hue: 'mint' },
                      { dataKey: 'doing', label: '处理中', hue: 'peach' },
                    ]}
                  />
  ),
  'stacked-area-trend-card': () => (
    <StackedAreaTrendCard
                    tone="white"
                    title="各端访问流量构成"
                    totalValue="84.2k / 日"
                    xKey="day"
                    data={[
                      { day: '周一', web: 32, app: 24, api: 14 },
                      { day: '周二', web: 36, app: 28, api: 16 },
                      { day: '周三', web: 34, app: 31, api: 19 },
                      { day: '周四', web: 42, app: 35, api: 22 },
                      { day: '周五', web: 46, app: 38, api: 25 },
                    ]}
                    series={[
                      { dataKey: 'web', label: 'Web', hue: 'periwinkle', unit: 'k' },
                      { dataKey: 'app', label: 'App', hue: 'aqua', unit: 'k' },
                      { dataKey: 'api', label: 'API', hue: 'peach', unit: 'k' },
                    ]}
                  />
  ),
  'horizontal-bar-rank-card': () => (
    <HorizontalBarRankCard
                    tone="white"
                    title="热门模块调用量"
                    subtitle="单位：万次"
                    categoryKey="name"
                    valueKey="calls"
                    valueLabel="调用量"
                    unit="万"
                    hue="sky"
                    data={[
                      { name: '身份鉴权', calls: 148 },
                      { name: '消息推送', calls: 116 },
                      { name: '文件存储', calls: 92 },
                      { name: '全文检索', calls: 74 },
                    ]}
                  />
  ),
  'target-line-card': () => (
    <TargetLineCard
                    tone="white"
                    title="API P99 延迟监控"
                    currentValue="18 ms"
                    targetValue={25}
                    targetLabel="SLA 上限"
                    status="normal"
                    statusLabel="健康"
                    xKey="t"
                    data={[
                      { t: '08:00', ms: 16 },
                      { t: '10:00', ms: 22 },
                      { t: '12:00', ms: 24 },
                      { t: '14:00', ms: 19 },
                      { t: '16:00', ms: 18 },
                    ]}
                    series={[{ dataKey: 'ms', label: 'P99 延迟', hue: 'periwinkle', unit: 'ms' }]}
                  />
  ),
  'composed-revenue-card': () => (
    <ComposedRevenueCard
                    tone="white"
                    title="季度收入与毛利率"
                    subtitle="左轴营收（万）· 右轴毛利率（%）"
                    delta="+3.2pt"
                    xKey="q"
                    leftYTickFormatter={(v) => `¥${v}万`}
                    rightYTickFormatter={(v) => `${v}%`}
                    data={[
                      { q: 'Q1', ent: 210, pro: 100, rate: 66 },
                      { q: 'Q2', ent: 248, pro: 117, rate: 69 },
                      { q: 'Q3', ent: 282, pro: 130, rate: 71 },
                      { q: 'Q4', ent: 318, pro: 145, rate: 74 },
                    ]}
                    series={[
                      { type: 'bar', dataKey: 'ent', label: '企业版', hue: 'periwinkle', yAxisId: 'left', stackId: 's', unit: '万' },
                      { type: 'bar', dataKey: 'pro', label: '专业版', hue: 'sky', yAxisId: 'left', stackId: 's', unit: '万' },
                      { type: 'line', dataKey: 'rate', label: '毛利率', hue: 'coral', yAxisId: 'right', unit: '%' },
                    ]}
                  />
  ),
  'scatter-bubble-card': () => (
    <ScatterBubbleCard
                    tone="white"
                    title="节点延迟 vs 吞吐分布"
                    subtitle="气泡面积表示实时并发连接数"
                    badge="集群采样"
                    xKey="latency"
                    yKey="qps"
                    zKey="size"
                    xLabel="延迟"
                    yLabel="吞吐"
                    xUnit="ms"
                    yUnit=" req/s"
                    series={[
                      {
                        name: '主集群',
                        hue: 'periwinkle',
                        data: [
                          { latency: 12, qps: 1800, size: 200 },
                          { latency: 17, qps: 2700, size: 280 },
                          { latency: 23, qps: 3600, size: 350 },
                        ],
                      },
                      {
                        name: '金丝雀',
                        hue: 'aqua',
                        data: [
                          { latency: 10, qps: 2200, size: 220 },
                          { latency: 15, qps: 3400, size: 310 },
                          { latency: 19, qps: 4250, size: 380 },
                        ],
                      },
                    ]}
                  />
  ),
  'multi-radar-compare-card': () => (
    <MultiRadarCompareCard
                    tone="white"
                    title="版本能力对比雷达"
                    subtitle="Glaze v2 vs 行业基准"
                    angleKey="dim"
                    data={[
                      { dim: '性能', cur: 95, base: 76 },
                      { dim: '无障碍', cur: 96, base: 70 },
                      { dim: '动效', cur: 92, base: 74 },
                      { dim: '响应式', cur: 94, base: 80 },
                      { dim: '可定制', cur: 90, base: 72 },
                      { dim: '文档', cur: 88, base: 68 },
                    ]}
                    series={[
                      { dataKey: 'cur', label: 'Glaze v2', hue: 'periwinkle', unit: '分' },
                      { dataKey: 'base', label: '行业基准', hue: 'aqua', unit: '分', fillOpacity: 0.14 },
                    ]}
                  />
  ),
  'interactive-analytics-card': () => (
    <InteractiveAnalyticsCard
                    tone="white"
                    title="全局业务增长交互分析"
                    subtitle="自由切换图表形态，点击图例动态筛选序列"
                    summaries={[
                      { label: '累计活跃用户', value: '128.4k', delta: '+18.6%', status: 'normal' },
                      { label: '核心留存率', value: '68.4%', delta: '+2.4%', status: 'info' },
                      { label: '转化效率', value: '12.8%', delta: '+1.5%', status: 'normal' },
                    ]}
                    xKey="m"
                    referenceLine={{ y: 500, label: '目标基线' }}
                    data={[
                      { m: '1月', active: 360, paid: 180 },
                      { m: '2月', active: 420, paid: 215 },
                      { m: '3月', active: 465, paid: 248 },
                      { m: '4月', active: 530, paid: 290 },
                      { m: '5月', active: 610, paid: 342 },
                      { m: '6月', active: 685, paid: 396 },
                    ]}
                    series={[
                      { dataKey: 'active', label: '活跃团队', hue: 'periwinkle', unit: '个' },
                      { dataKey: 'paid', label: '付费团队', hue: 'aqua', unit: '个' },
                    ]}
                  />
  ),
  'composed-overview-card': () => (
    <ComposedOverviewCard
                    tone="white"
                    title="全年营收与利润率全景"
                    subtitle="1–12 月收入构成与净利率双轴联动"
                    highlights={[
                      { label: '全年总营收', value: '¥1,840万', hue: 'periwinkle' },
                      { label: '平均净利率', value: '28.4%', hue: 'mint' },
                      { label: '同比增长', value: '+34.2%', hue: 'aqua' },
                    ]}
                    xKey="m"
                    leftYTickFormatter={(v) => `¥${v}万`}
                    rightYTickFormatter={(v) => `${v}%`}
                    data={[
                      { m: '1月', rev: 112, cost: 74, profit: 22 },
                      { m: '2月', rev: 118, cost: 76, profit: 24 },
                      { m: '3月', rev: 132, cost: 82, profit: 25 },
                      { m: '4月', rev: 141, cost: 86, profit: 27 },
                      { m: '5月', rev: 148, cost: 88, profit: 28 },
                      { m: '6月', rev: 162, cost: 94, profit: 29 },
                      { m: '7月', rev: 158, cost: 92, profit: 28 },
                      { m: '8月', rev: 168, cost: 95, profit: 30 },
                      { m: '9月', rev: 174, cost: 98, profit: 31 },
                      { m: '10月', rev: 186, cost: 102, profit: 32 },
                      { m: '11月', rev: 198, cost: 108, profit: 33 },
                      { m: '12月', rev: 215, cost: 114, profit: 34 },
                    ]}
                    series={[
                      { type: 'bar', dataKey: 'rev', label: '月度营收', hue: 'periwinkle', yAxisId: 'left', unit: '万', barSize: 18 },
                      { type: 'area', dataKey: 'cost', label: '运营成本', hue: 'sky', yAxisId: 'left', unit: '万' },
                      { type: 'line', dataKey: 'profit', label: '净利率', hue: 'mint', yAxisId: 'right', unit: '%' },
                    ]}
                  />
  ),
  'status-card': () => (
    <StatusCard tone="mint" label="系统状态" statusText="全部正常" status="normal" description="14 服务在线" animated />
  ),
  'metric-card': () => (
    <MetricCard tone="sky" label="今日请求" value="48.2" unit="k" icon={<WifiHigh size={18} />} />
  ),
  'progress-card': () => (
    <ProgressCard tone="peach" label="存储已用" percent={71} description="11.4 TB / 共 16 TB" />
  ),
  'ring-card': () => (
    <RingCard tone="white" label="完成率" numerator={42} denominator={50} description="本周剩余 8 项任务" />
  ),
  'metric-bars-card': () => (
    <MetricBarsCard tone="periwinkle" label="本周活跃" value="1,284" bars={[30, 50, 42, 68, 60, 82, 95]} />
  ),
  'dot-matrix-card': () => (
    <DotMatrixCard tone="white" label="容器存活" subLabel="22 / 24 运行" total={24} active={22} />
  ),
  'gauge-card': () => (
    <GaugeCard tone="aqua" label="CPU 负载" percent={34} description="4 核心 · 42°C" />
  ),
  'quick-entry-card': ({ toast }) => (
    <QuickEntryCard
                    tone="lilac"
                    title="组件规范文档"
                    subtitle="查看 39 个 Base UI 原语"
                    icon={<Stack size={20} weight="duotone" />}
                    onClick={() => toast({ title: '触发快捷入口', status: 'info' })}
                  />
  ),
  'trend-card': () => (
    <TrendCard tone="white" label="转化率" value="6.8" unit="%" delta="+1.2%" deltaStatus="normal" points={[4, 5, 4.8, 5.6, 6.2, 6.8]} />
  ),
  'compare-card': () => (
    <CompareCard
                    tone="rose"
                    label="本周对比上周"
                    delta="+18%"
                    primary={{ label: '本周', value: 84, display: '84h' }}
                    secondary={{ label: '上周', value: 71, display: '71h' }}
                  />
  ),
  'countdown-card': () => (
    <CountdownCard tone="sky-dark" label="版本发布倒计时" remaining={6} unit="天" deadlineText="目标日：12 月 3 日" totalSteps={10} elapsedSteps={4} />
  ),
  'switch-card': ({ demoSwitch, setDemoSwitch }) => (
    <SwitchCard
                    tone="white"
                    title="夜间备份"
                    description={demoSwitch ? '已启用 · 03:00' : '已暂停'}
                    checked={demoSwitch}
                    onCheckedChange={setDemoSwitch}
                    icon={<HardDrives size={18} weight="duotone" />}
                    iconHue="mint"
                  />
  ),
  'members-card': () => (
    <MembersCard
                    tone="white"
                    label="项目成员"
                    countLabel="12 人"
                    members={[
                      { label: '林', hue: 'rose' },
                      { label: '周', hue: 'aqua' },
                      { label: '陈', hue: 'lemon' },
                      { label: '吴', hue: 'peach' },
                    ]}
                    description="今日 8 人在线"
                  />
  ),
  'clock-card': () => (
    <ClockCard tone="ink" weekday="上海 · 周五" live />
  ),
  'notification-card': ({ toast }) => (
    <NotificationCard
                    tone="coral"
                    count={3}
                    label="待处理评审"
                    latestText="PR #142 等待你的最终批准"
                    icon={<Bell size={18} weight="duotone" />}
                    iconHue="coral"
                    onClick={() => toast({ title: '打开待处理通知', status: 'warning' })}
                  />
  ),
  'graphic-metric-card': () => (
    <GraphicMetricCard tone="lemon" label="节能积分" value="940" description="超越 92% 家庭用户" />
  ),
  'weather-card': () => (
    <WeatherCard tone="sky" city="上海" temp={21} condition="晴朗" feelsLike="湿度 52%" />
  ),
  'battery-card': () => (
    <BatteryCard tone="mint" device="MacBook Pro" percent={86} charging remaining="已接入电源 · 18m 充满" />
  ),
  'temperature-card': () => (
    <TemperatureCard tone="aqua" room="客厅空调" initialTemp={23} mode="制冷" />
  ),
  'speed-card': () => (
    <SpeedCard tone="white" label="下行速率" value={842} max={1000} unit="Mbps" sub="千兆光纤满速" />
  ),
  'quota-card': () => (
    <QuotaCard tone="periwinkle" label="API 配额" used={7240} total={10000} unit="次" resetNote="每月 1 日重置" />
  ),
  'streak-card': () => (
    <StreakCard tone="peach" label="阅读打卡" days={28} week={[true, true, true, true, true, true, false]} />
  ),
  'rating-card': () => (
    <RatingCard tone="lemon" label="应用评分" score="4.9" reviews="2,184 条真实好评" />
  ),
  'quote-card': () => (
    <QuoteCard tone="lilac" quote="好的设计是尽可能少的设计。" author="Dieter Rams" />
  ),
  'qr-card': () => (
    <QrCard tone="white" label="访客 Wi-Fi" caption="扫码一键接入 5G" />
  ),
  'key-shortcut-card': () => (
    <KeyShortcutCard tone="ink" label="全局搜索" keys={['⌘', 'K']} description="任意页面快速唤起命令面板" />
  ),
  'slider-control-card': () => (
    <SliderControlCard tone="white" label="环境光亮度" defaultValue={72} unit="%" hue="periwinkle" />
  ),
  'mini-calendar-day-card': () => (
    <MiniCalendarDayCard tone="rose" month="11 月" day={27} weekday="周五" eventsCount={4} />
  ),
  'currency-card': () => (
    <CurrencyCard tone="white" pair="USD / CNY" rate="7.214" change="+0.12%" status="normal" range="24h 7.19 – 7.23" />
  ),
  'health-pulse-card': () => (
    <HealthPulseCard tone="rose" bpm={64} zone="静息区间 · 健康" />
  ),
  'water-intake-card': () => (
    <WaterIntakeCard tone="sky" initialCups={5} goal={8} />
  ),
  'audio-now-playing-card': () => (
    <AudioNowPlayingCard tone="lilac-dark" track="Rainy Coding" artist="Lo-Fi Beats" />
  ),
  'signal-strength-card': () => (
    <SignalStrengthCard tone="white" ssid="Studio-6G" bars={4} latency="1.2 ms" band="Wi-Fi 6E" />
  ),
  'disk-temp-card': () => (
    <DiskTempCard tone="coral" label="SSD 温度" tempC={48} maxC={75} device="NVMe 2TB" />
  ),
  'tag-cloud-card': () => (
    <TagCloudCard
                    tone="white"
                    label="热门技术主题"
                    tags={[
                      { text: 'Base UI', hue: 'periwinkle' },
                      { text: 'Motion', hue: 'lilac' },
                      { text: 'React 19', hue: 'sky' },
                      { text: 'Tailwind v4', hue: 'aqua' },
                      { text: 'Design Tokens', hue: 'mint' },
                    ]}
                  />
  ),
  'quick-action-grid-card': () => (
    <QuickActionGridCard
                    tone="white"
                    label="高频快捷动作"
                    actions={[
                      { id: '1', label: '灯光', icon: <Lamp size={14} />, hue: 'peach' },
                      { id: '2', label: '门锁', icon: <LockKey size={14} />, hue: 'mint' },
                      { id: '3', label: '影院', icon: <Television size={14} />, hue: 'lilac' },
                      { id: '4', label: '布防', icon: <ShieldCheck size={14} />, hue: 'sky' },
                    ]}
                  />
  ),
  'area-trend-card': () => (
    <AreaTrendCard tone="white" title="本周吞吐趋势" summary="4.2k req/s · +18%" points={[18, 26, 22, 34, 30, 42, 39, 48]} axisLabels={['周一', '周三', '周五', '周日']} />
  ),
  'app-launcher-card': () => (
    <AppLauncherCard
                    tone="white"
                    title="常用工作入口"
                    summary="8 个服务"
                    apps={[
                      { id: '1', name: '文档', mark: '文', hue: 'sky' },
                      { id: '2', name: '代码', mark: '码', hue: 'periwinkle' },
                      { id: '3', name: '看板', mark: '看', hue: 'mint' },
                      { id: '4', name: '监控', mark: '监', hue: 'peach', badge: 2 },
                      { id: '5', name: '设计', mark: '设', hue: 'lilac' },
                      { id: '6', name: '相册', mark: '相', hue: 'rose' },
                      { id: '7', name: '终端', mark: '终', hue: 'aqua' },
                      { id: '8', name: '安全', mark: '盾', hue: 'lemon' },
                    ]}
                  />
  ),
  'steps-card': () => (
    <StepsCard tone="sky" title="节点初始化流程" steps={['安装镜像', '配置网络', '挂载存储', '接入监控']} currentStep={2} />
  ),
  'object-detail-card': () => (
    <ObjectDetailCard
                    tone="white"
                    name="DS920+ 主存储"
                    subtitle="10.10.10.20 · DSM 7.2"
                    status="normal"
                    icon={<HardDrives size={20} weight="duotone" />}
                    iconHue="sky"
                    fields={[
                      { label: '阵列', value: 'RAID 5' },
                      { label: '运行', value: '48 天' },
                      { label: '温度', value: '38°C' },
                      { label: '容量', value: '12.4 / 16 TB' },
                    ]}
                  />
  ),
  'multi-metric-card': () => (
    <MultiMetricCard
                    tone="mint"
                    label="核心性能指标"
                    metrics={[
                      { label: '可用率', value: '99.98', unit: '%' },
                      { label: 'P95 延迟', value: '14', unit: 'ms' },
                      { label: '错误率', value: '0.02', unit: '%' },
                    ]}
                  />
  ),
  'heatmap-card': () => (
    <HeatmapCard tone="white" title="代码提交热力图" />
  ),
  'alert-banner-card': ({ toast }) => (
    <AlertBannerCard
                    tone="coral"
                    title="证书将于 7 天后过期"
                    description="请及时运行 ACME 自动续签任务以保障 HTTPS 正常访问。"
                    actionLabel="立即续签"
                    onAction={() => toast({ title: '已触发自动续签', status: 'normal' })}
                  />
  ),
  'distribution-bar-card': () => (
    <DistributionBarCard
                    tone="white"
                    title="磁盘空间类型分布"
                    summary="已用 11.4 TB"
                    segments={[
                      { name: '影音库', percent: 46, color: '#A970D6' },
                      { name: '照片备份', percent: 28, color: '#E0607E' },
                      { name: '容器镜像', percent: 16, color: '#4A9BD8' },
                      { name: '其他', percent: 10, color: '#E8EBF0' },
                    ]}
                  />
  ),
  'media-player-card': () => (
    <MediaPlayerCard tone="lilac-dark" title="Night Drive Synth" artist="Studio Mix · Hi-Res" progress={62} />
  ),
  'dual-series-trend-card': () => (
    <DualSeriesTrendCard
                    tone="white"
                    label="入站 vs 出站流量"
                    seriesA={{ name: '入站', color: '#7B80EA', data: [42, 55, 62, 58, 74, 88], current: '88 MB/s' }}
                    seriesB={{ name: '出站', color: '#2FA79B', data: [24, 30, 28, 36, 41, 46], current: '46 MB/s' }}
                  />
  ),
  'uptime-strip-card': () => (
    <UptimeStripCard tone="white" service="核心结算网关" uptimePct="99.94%" days={OK_30} />
  ),
  'profile-summary-card': () => (
    <ProfileSummaryCard
                    tone="white"
                    name="周舟"
                    role="首席设计系统架构师"
                    initials="周"
                    hue="aqua"
                    stats={[
                      { label: '组件数', value: '48' },
                      { label: '卡片库', value: '100' },
                      { label: 'PR 合并', value: '142' },
                    ]}
                  />
  ),
  'quick-search-card': () => (
    <QuickSearchCard
                    tone="periwinkle"
                    title="快速检索知识库"
                    suggestions={['Base UI', '动效规范', '栅格断点', '色板 Token']}
                  />
  ),
  'flight-route-card': () => (
    <FlightRouteCard
                    tone="sky-dark"
                    flightNo="CA 1502"
                    fromCode="SHA"
                    fromCity="上海虹桥"
                    toCode="PEK"
                    toCity="北京首都"
                    departTime="09:00"
                    arriveTime="11:15"
                    gate="A12"
                  />
  ),
  'weather-forecast-card': () => (
    <WeatherForecastCard
                    tone="sky"
                    location="上海"
                    days={[
                      { day: '今', high: 22, low: 14, rain: '10%' },
                      { day: '六', high: 24, low: 15, rain: '5%' },
                      { day: '日', high: 20, low: 13, rain: '40%' },
                      { day: '一', high: 19, low: 11, rain: '15%' },
                      { day: '二', high: 23, low: 14, rain: '0%' },
                    ]}
                  />
  ),
  'server-resource-card': () => (
    <ServerResourceCard tone="white" nodeName="k8s-worker-02" cpu={38} ram={64} disk={49} />
  ),
  'budget-meter-card': () => (
    <BudgetMeterCard
                    tone="white"
                    label="本月云资源预算"
                    spent={14200}
                    budget={20000}
                    categories={[
                      { name: '计算', amount: '¥7,800', hue: 'periwinkle' },
                      { name: '存储', amount: '¥3,900', hue: 'aqua' },
                      { name: '带宽', amount: '¥2,500', hue: 'peach' },
                    ]}
                  />
  ),
  'pomodoro-card': () => (
    <PomodoroCard tone="coral" task="完成 100 卡片模块验收" minutes={25} />
  ),
  'quick-note-card': () => (
    <QuickNoteCard tone="lemon" initialText="所有单行输入与选择控件统一为全圆角 44px，交互动效采用纯 CSS 分级时长规范。" />
  ),
  'device-control-strip-card': () => (
    <DeviceControlStripCard
                    tone="white"
                    title="书房设备快捷条"
                    devices={[
                      { id: '1', name: '屏幕挂灯', sub: '4500K', hue: 'peach', defaultOn: true },
                      { id: '2', name: '空气净化', sub: '静音档', hue: 'mint', defaultOn: true },
                      { id: '3', name: '桌面音箱', sub: '蓝牙待机', hue: 'periwinkle', defaultOn: false },
                    ]}
                  />
  ),
  'spark-metric-row-card': () => (
    <SparkMetricRowCard
                    tone="white"
                    items={[
                      { label: '日活', value: '8.4k', delta: '+9%', bars: [30, 40, 35, 50, 65], hue: 'sky' },
                      { label: '留存', value: '62%', delta: '+4%', bars: [48, 52, 55, 58, 62], hue: 'mint' },
                      { label: '转化', value: '5.1%', delta: '+0.6%', bars: [38, 42, 44, 48, 51], hue: 'lilac' },
                    ]}
                  />
  ),
  'milestone-banner-card': () => (
    <MilestoneBannerCard
                    tone="mint"
                    version="v2.0.0"
                    title="设计系统全面焕新交付"
                    progress={88}
                    dueDate="12 月 03 日"
                    owners={[
                      { initials: '林', hue: 'rose' },
                      { initials: '周', hue: 'aqua' },
                      { initials: '吴', hue: 'peach' },
                    ]}
                  />
  ),
  'code-deploy-card': () => (
    <CodeDeployCard
                    tone="white"
                    repo="glaze-ui"
                    branch="main"
                    commit="f48d29a"
                    duration="34s"
                    status="normal"
                  />
  ),
  'notification-digest-card': () => (
    <NotificationDigestCard
                    tone="white"
                    unreadCount={7}
                    categories={[
                      { label: '评论', count: 3, hue: 'sky' },
                      { label: 'PR 评审', count: 2, hue: 'periwinkle' },
                      { label: '告警', count: 2, hue: 'coral' },
                    ]}
                    latest="周舟 批准了你的合并请求 #142"
                  />
  ),
  'bar-list-card': () => (
    <BarListCard
                    tone="white"
                    label="容器内存占用"
                    bigValue="9.3"
                    bigUnit="GB"
                    subtitle="共 32 GB 可用内存"
                    items={[
                      { label: 'Immich', value: '3.8 GB', percent: 78 },
                      { label: 'Jellyfin', value: '2.6 GB', percent: 56 },
                      { label: 'Postgres', value: '1.8 GB', percent: 40 },
                      { label: 'Grafana', value: '1.1 GB', percent: 26 },
                    ]}
                  />
  ),
  'event-timeline-card': () => (
    <EventTimelineCard
                    tone="white"
                    title="最新系统事件"
                    events={[
                      { time: '14:20', text: '自动快照备份完成', status: 'normal' },
                      { time: '12:05', text: '发布 v2.0 候选版本', status: 'info' },
                      { time: '09:40', text: '节点 04 温度短时升高', status: 'warning' },
                      { time: '昨天', text: 'SSL 证书自动续期', status: 'normal' },
                    ]}
                  />
  ),
  'vertical-bars-card': () => (
    <VerticalBarsCard
                    tone="white"
                    label="月度活跃趋势"
                    totalValue="96.4"
                    unit="k"
                    bars={[
                      { label: '7月', value: 51 },
                      { label: '8月', value: 74 },
                      { label: '9月', value: 68 },
                      { label: '10月', value: 86 },
                      { label: '11月', value: 96, highlight: true },
                    ]}
                  />
  ),
  'rank-list-card': () => (
    <RankListCard
                    tone="white"
                    title="热门页面访问"
                    items={[
                      { name: '首页概览', value: 24800, display: '24.8k' },
                      { name: '组件文档', value: 18200, display: '18.2k' },
                      { name: '卡片画廊', value: 14500, display: '14.5k' },
                      { name: '色板规范', value: 9600, display: '9.6k' },
                      { name: '动效说明', value: 7100, display: '7.1k' },
                    ]}
                  />
  ),
  'checklist-card': () => (
    <ChecklistCard
                    tone="white"
                    title="发版检查清单"
                    items={[
                      { id: '1', label: '统一 Glaze 品牌与简洁 API', checked: true, tag: 'API', hue: 'periwinkle' },
                      { id: '2', label: '1 组件 1 文件拆分', checked: true, tag: '结构', hue: 'sky' },
                      { id: '3', label: '全量组件动效时长统一', checked: true, tag: '视觉', hue: 'mint' },
                      { id: '4', label: '核验 100 卡片响应', checked: false, tag: 'QA', hue: 'peach' },
                    ]}
                  />
  ),
  'leaderboard-card': () => (
    <LeaderboardCard
                    tone="white"
                    title="本月贡献榜"
                    entries={[
                      { name: '林一', initials: '林', hue: 'rose', score: '142 PR', sub: '组件架构' },
                      { name: '周舟', initials: '周', hue: 'aqua', score: '98 PR', sub: '视觉系统' },
                      { name: '陈晨', initials: '陈', hue: 'lemon', score: '76 PR', sub: '性能优化' },
                      { name: '吴越', initials: '吴', hue: 'peach', score: '64 PR', sub: '文档示例' },
                    ]}
                  />
  ),
  'file-list-card': () => (
    <FileListCard
                    tone="white"
                    title="最近修改文档"
                    files={[
                      { name: 'Design-Tokens-v2.pdf', type: 'pdf', size: '4.2 MB', updated: '10 分钟前' },
                      { name: 'motion.ts', type: 'code', size: '3.8 KB', updated: '1 小时前' },
                      { name: 'Glaze-Grid-Spec.png', type: 'img', size: '1.6 MB', updated: '昨天' },
                      { name: 'Release-Notes.md', type: 'doc', size: '18 KB', updated: '2 天前' },
                    ]}
                  />
  ),
  'schedule-agenda-card': () => (
    <ScheduleAgendaCard
                    tone="sky"
                    dateLabel="11月27日 · 日程"
                    events={[
                      { time: '10:00', title: '设计系统双周评审', room: '会议室 3A', hue: 'periwinkle' },
                      { time: '14:00', title: 'Base UI 性能排查', room: '线上腾讯会议', hue: 'aqua' },
                      { time: '16:30', title: 'Q4 里程碑对齐', room: '大圆桌', hue: 'peach' },
                    ]}
                  />
  ),
  'disk-partitions-card': () => (
    <DiskPartitionsCard
                    tone="white"
                    title="存储卷监控"
                    volumes={[
                      { name: 'nvme-system', usedGb: 180, totalGb: 512, mount: '/' },
                      { name: 'raid-media', usedGb: 8400, totalGb: 10000, mount: '/mnt/media' },
                      { name: 'ssd-docker', usedGb: 310, totalGb: 512, mount: '/var/lib/docker' },
                    ]}
                  />
  ),
  'contact-list-card': () => (
    <ContactListCard
                    tone="white"
                    title="核心值班成员"
                    contacts={[
                      { name: '陆远', role: 'SRE 主值班', initials: '陆', hue: 'sky', status: 'normal' },
                      { name: '沈清', role: '数据库专家', initials: '沈', hue: 'mint', status: 'normal' },
                      { name: '高翔', role: '网络架构', initials: '高', hue: 'peach', status: 'info' },
                      { name: '许诺', role: '安全响应', initials: '许', hue: 'lilac', status: 'disabled' },
                    ]}
                  />
  ),
  'habit-tracker-card': () => (
    <HabitTrackerCard
                    tone="mint"
                    title="个人习惯追踪"
                    habits={[
                      { name: '晨间阅读', hue: 'mint', days: [true, true, true, true, true, false, false] },
                      { name: '每日喝水', hue: 'sky', days: [true, true, true, true, false, false, false] },
                      { name: '晚间拉伸', hue: 'peach', days: [true, false, true, true, true, false, false] },
                    ]}
                  />
  ),
  'price-ticker-card': () => (
    <PriceTickerCard
                    tone="white"
                    title="关注指数行情"
                    tickers={[
                      { symbol: 'NDX', name: '纳斯达克 100', price: '21,420', delta: '+1.24%', status: 'normal' },
                      { symbol: 'SPX', name: '标普 500', price: '6,018', delta: '+0.68%', status: 'normal' },
                      { symbol: 'HSI', name: '恒生科技', price: '4,892', delta: '-0.42%', status: 'error' },
                      { symbol: 'GOLD', name: '现货黄金', price: '2,684', delta: '+0.35%', status: 'normal' },
                    ]}
                  />
  ),
  'quick-settings-card': () => (
    <QuickSettingsCard
                    tone="white"
                    title="系统偏好设置"
                    settings={[
                      { id: '1', label: '自动深色切换', desc: '跟随日落时间', hue: 'periwinkle', defaultChecked: true },
                      { id: '2', label: '减弱动态效果', desc: '尊重系统无障碍设置', hue: 'sky', defaultChecked: false },
                      { id: '3', label: '错误自动上报', desc: '匿名发送诊断信息', hue: 'mint', defaultChecked: true },
                      { id: '4', label: '实验性网格', desc: '启用密集自动补位', hue: 'peach', defaultChecked: true },
                    ]}
                  />
  ),
  'funnel-card': () => (
    <FunnelCard
                    tone="periwinkle"
                    title="注册转化漏斗"
                    steps={[
                      { label: '落地页访问', count: '32,000', pct: 100 },
                      { label: '点击体验', count: '14,800', pct: 68 },
                      { label: '创建项目', count: '6,120', pct: 44 },
                      { label: '付费升级', count: '1,480', pct: 22 },
                    ]}
                  />
  ),
  'hero-metric-card': () => (
    <HeroMetricCard
                    tone="sky-dark"
                    label="月度活跃用户 MAU"
                    value="128,490"
                    delta="+14.2% 环比增长"
                    subMetrics={[
                      { label: '日活 DAU', value: '42.6k' },
                      { label: '次日留存', value: '68.4%' },
                      { label: '平均时长', value: '14.2m' },
                    ]}
                  />
  ),
  'donut-chart-card': () => (
    <DonutChartCard
                    tone="white"
                    title="流量来源占比"
                    totalValue="100%"
                    totalLabel="总访问"
                    segments={[
                      { name: '自然搜索', value: 44, display: '44%', color: '#7B80EA' },
                      { name: '直接访问', value: 28, display: '28%', color: '#2FA79B' },
                      { name: '社区推荐', value: 18, display: '18%', color: '#E3A33B' },
                      { name: '其他', value: 10, display: '10%', color: '#E0607E' },
                    ]}
                  />
  ),
  'item-list-card': () => (
    <ItemListCard
                    tone="white"
                    title="核心服务清单"
                    summary="4 项核心实例"
                    rows={[
                      { mark: <Broadcast size={16} />, hue: 'sky', name: 'API 网关集群', subtitle: '12 实例运行中', value: '12 ms', status: 'normal' },
                      { mark: <HardDrives size={16} />, hue: 'mint', name: '主数据库集群', subtitle: '主从延迟极低', value: '4 ms', status: 'normal' },
                      { mark: <Cpu size={16} />, hue: 'peach', name: '图像转码队列', subtitle: '堆积 18 项任务', value: '78%', status: 'warning' },
                      { mark: <Pulse size={16} />, hue: 'lilac', name: '实时推送中心', subtitle: '长连接在线', value: '4.2k', status: 'info' },
                    ]}
                  />
  ),
  'calendar-card': () => (
    <CalendarCard tone="lilac" initialYear={2026} initialMonth={11} todayDay={27} eventDays={[4, 11, 18, 20, 27]} />
  ),
  'grouped-bar-chart-card': () => (
    <GroupedBarChartCard
                    tone="white"
                    title="季度营收对比"
                    legendA="今年"
                    legendB="去年"
                    groups={[
                      { label: 'Q1', a: 280, b: 210 },
                      { label: 'Q2', a: 340, b: 255 },
                      { label: 'Q3', a: 390, b: 295 },
                      { label: 'Q4', a: 460, b: 340 },
                    ]}
                  />
  ),
  'radar-skill-card': () => (
    <RadarSkillCard
                    tone="white"
                    title="设计系统成熟度评估"
                    subtitle="综合评分 95 / 100"
                    axes={[
                      { label: '一致性', value: 96 },
                      { label: '无障碍', value: 94 },
                      { label: '动效', value: 98 },
                      { label: '性能', value: 95 },
                      { label: '覆盖率', value: 99 },
                      { label: '文档', value: 92 },
                    ]}
                  />
  ),
  'kanban-mini-card': () => (
    <KanbanMiniCard
                    tone="white"
                    title="迭代迷你看板"
                    columns={[
                      {
                        name: '进行中',
                        hue: 'sky',
                        cards: [
                          { title: '动效 Token 文档', tag: '文档', owner: '周舟' },
                          { title: '100 卡片验收', tag: '前端', owner: '林一' },
                        ],
                      },
                      {
                        name: '已完成',
                        hue: 'mint',
                        cards: [
                          { title: '单文件组件拆分', tag: '架构', owner: '林一' },
                          { title: 'Toast 3D 堆叠', tag: '动效', owner: '陈晨' },
                        ],
                      },
                    ]}
                  />
  ),
  'activity-feed-card': () => (
    <ActivityFeedCard
                    tone="white"
                    title="团队最新动态"
                    feed={[
                      { user: '林一', initials: '林', hue: 'rose', action: '合并了', target: 'PR #142 单文件架构', time: '5 分钟前' },
                      { user: '周舟', initials: '周', hue: 'aqua', action: '更新了', target: 'Motion 220ms 规范', time: '22 分钟前' },
                      { user: '吴越', initials: '吴', hue: 'peach', action: '发布了', target: '6 套全场景 Demo', time: '1 小时前' },
                      { user: '陈晨', initials: '陈', hue: 'lemon', action: '通过了', target: 'Chrome 帧率回归测试', time: '2 小时前' },
                    ]}
                  />
  ),
  'server-rack-card': () => (
    <ServerRackCard
                    tone="ink"
                    rackName="Core Rack #01"
                    blades={[
                      { id: 'BLD-01', role: 'Ingress', load: 34, status: 'normal', temp: '42°C' },
                      { id: 'BLD-02', role: 'Database', load: 62, status: 'normal', temp: '51°C' },
                      { id: 'BLD-03', role: 'Storage', load: 48, status: 'normal', temp: '45°C' },
                      { id: 'BLD-04', role: 'AI Worker', load: 88, status: 'warning', temp: '68°C' },
                    ]}
                  />
  ),
  'floor-plan-sensor-card': () => (
    <FloorPlanSensorCard
                    tone="aqua"
                    title="全屋传感器分布"
                    rooms={[
                      { name: '客厅', temp: '23.4°', humidity: '52%', lightOn: true, hue: 'peach' },
                      { name: '主卧', temp: '22.0°', humidity: '54%', lightOn: false, hue: 'lilac' },
                      { name: '书房', temp: '24.1°', humidity: '48%', lightOn: true, hue: 'sky' },
                      { name: '厨房', temp: '25.0°', humidity: '58%', lightOn: false, hue: 'mint' },
                    ]}
                  />
  ),
  'revenue-breakdown-card': () => (
    <RevenueBreakdownCard
                    tone="white"
                    title="月度收入结构"
                    total="¥153.4万"
                    delta="+18.4%"
                    channels={[
                      { name: '企业版订阅', amount: '¥82.0万', pct: 53, hue: 'periwinkle' },
                      { name: '专业版自助', amount: '¥41.4万', pct: 27, hue: 'aqua' },
                      { name: '增值服务', amount: '¥30.0万', pct: 20, hue: 'peach' },
                    ]}
                  />
  ),
  'chat-preview-card': () => (
    <ChatPreviewCard
                    tone="white"
                    channel="设计系统协作群"
                    messages={[
                      { sender: '周舟', text: '新版浮层开关过渡顺滑多了！', time: '10:02' },
                      { sender: '林一', text: '按钮按压和弹窗都已统一为 220ms 轻柔阻尼', mine: true, time: '10:05' },
                    ]}
                  />
  ),
  'gallery-mosaic-card': () => (
    <GalleryMosaicCard
                    tone="white"
                    title="灵感视觉素材库"
                    count="486 项"
                    albums={[
                      { title: '色彩研究', items: '120 张', hue: 'sky' },
                      { title: '动效参考', items: '84 段', hue: 'lilac' },
                      { title: '空间网格', items: '152 张', hue: 'mint' },
                      { title: '排版样本', items: '130 张', hue: 'peach' },
                    ]}
                  />
  ),
  'incident-log-card': () => (
    <IncidentLogCard
                    tone="white"
                    title="近期告警日志"
                    incidents={[
                      { id: 'INC-21', title: '缓存节点短暂抖动', service: 'Edge CDN', status: 'warning', statusLabel: '已恢复', time: '20 分钟前' },
                      { id: 'INC-20', title: '弹性扩容 2 实例', service: 'API Pool', status: 'info', statusLabel: '已完成', time: '2 小时前' },
                      { id: 'INC-19', title: '例行灾备演练通过', service: 'Core DB', status: 'normal', statusLabel: '正常', time: '8 小时前' },
                    ]}
                  />
  ),
  'data-table-card': () => (
    <DataTableCard tone="white" title="项目交付物明细表" rows={SAMPLE_TABLE_ROWS} />
  ),
  'hierarchy-card': () => (
    <HierarchyCard
                    tone="white"
                    rootTitle="Platform Core"
                    rootSubtitle="4 区域多活 · 142 Pods"
                    rootIcon={<House size={18} />}
                    groups={[
                      {
                        mark: <Broadcast size={16} />,
                        hue: 'aqua',
                        name: '接入层',
                        meta: 'Edge',
                        status: 'normal',
                        statusLabel: '在线',
                        children: [{ name: 'HTTP/3 网关', tag: 'Edge', tagHue: 'aqua', meta: '18 节点', status: 'normal' }],
                      },
                      {
                        mark: <Stack size={16} />,
                        hue: 'periwinkle',
                        name: '服务层',
                        meta: 'Mesh',
                        status: 'normal',
                        statusLabel: '健康',
                        children: [{ name: '核心业务集群', tag: 'K8s', tagHue: 'periwinkle', meta: '142 Pods', status: 'normal' }],
                      },
                      {
                        mark: <HardDrives size={16} />,
                        hue: 'mint',
                        name: '存储层',
                        meta: 'Data',
                        status: 'normal',
                        statusLabel: '同步中',
                        children: [{ name: '分布式主从库', tag: 'PG', tagHue: 'mint', meta: '零延迟', status: 'normal' }],
                      },
                    ]}
                  />
  ),
  'phase-timeline-card': () => (
    <PhaseTimelineCard
                    tone="white"
                    title="产品发布里程碑"
                    subtitle="4 阶段交付节拍"
                    phases={[
                      { name: '需求冻结', date: '11/01', state: 'done' },
                      { name: '设计定稿', date: '11/12', state: 'done' },
                      { name: '工程验收', date: '11/27', state: 'cur' },
                      { name: '全量上线', date: '12/05', state: 'todo' },
                    ]}
                  />
  ),
  'distribution-bus-card': () => (
    <DistributionBusCard
                    tone="white"
                    label="节点流量分摊总线"
                    totalValue="184"
                    unit="GB"
                    subtitle="近 24 小时核心节点流量分布"
                    items={[
                      { name: '群晖 NAS', value: 76, display: '76 GB' },
                      { name: '影音转码', value: 48, display: '48 GB' },
                      { name: '相册同步', value: 36, display: '36 GB' },
                      { name: '其他设备', value: 24, display: '24 GB' },
                    ]}
                  />
  ),
  'kpi-strip-card': () => (
    <KpiStripCard
                    tone="white"
                    metrics={[
                      { label: '总营收', value: '¥462.8万', delta: '+21%', status: 'normal', sub: '超额完成目标' },
                      { label: '活跃客户', value: '1,284', delta: '+64', status: 'normal', sub: '月留存 96.4%' },
                      { label: '平均响应', value: '14 ms', delta: '-18%', status: 'info', sub: '全球边缘节点' },
                      { label: '满意度', value: '4.92', delta: '+0.1', status: 'normal', sub: '1,420 条评价' },
                    ]}
                  />
  ),
  'pricing-plans-card': () => (
    <PricingPlansCard
                    tone="white"
                    plans={[
                      { id: 's', name: '标准版', price: '¥199', period: '/月', hue: 'sky', features: ['10 名成员', '基础卡片模块', '邮件支持'] },
                      { id: 'p', name: '专业版', price: '¥699', period: '/月', badge: '推荐', hue: 'periwinkle', highlighted: true, features: ['无限成员', '全部 100 卡片', '专属动效定制'] },
                      { id: 'e', name: '企业版', price: '定制', period: '年度', hue: 'aqua', features: ['私有部署', 'SSO 单点登录', 'SLA 99.99%'] },
                    ]}
                  />
  ),
  'service-status-matrix-card': () => (
    <ServiceStatusMatrixCard
                    tone="white"
                    title="核心服务实时可用性"
                    services={[
                      { name: '身份认证', region: '全球', uptime: '100%', status: 'normal', bars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
                      { name: '消息推送', region: '亚太', uptime: '99.95%', status: 'normal', bars: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1] },
                    ]}
                  />
  ),
  'gantt-schedule-card': () => (
    <GanttScheduleCard
                    tone="white"
                    title="迭代甘特排期表"
                    weeks={['W1', 'W2', 'W3', 'W4']}
                    lanes={[
                      { name: '视觉 Token 升级', owner: '周舟', startPct: 0, widthPct: 40, hue: 'lilac' },
                      { name: '组件单文件拆分', owner: '林一', startPct: 25, widthPct: 50, hue: 'sky' },
                      { name: '100 卡片与验收', owner: '全员', startPct: 60, widthPct: 40, hue: 'mint' },
                    ]}
                  />
  ),
  'release-changelog-card': () => (
    <ReleaseChangelogCard
                    tone="white"
                    releases={[
                      { version: 'v2.0.0', date: '11-27', hue: 'mint', title: '100 卡片与统一动效', highlights: ['单文件组件架构', '220ms 轻柔阻尼'] },
                      { version: 'v1.8.0', date: '11-15', hue: 'sky', title: 'Phosphor 图标全面升级', highlights: ['全圆角表单控件', '堆叠 Toast'] },
                      { version: 'v1.5.0', date: '11-02', hue: 'periwinkle', title: 'Base UI 1.9 全量覆盖', highlights: ['39 原语模块', '键盘无障碍'] },
                    ]}
                  />
  ),
  'resource-allocation-card': () => (
    <ResourceAllocationCard
                    tone="white"
                    title="团队算力配额分布"
                    teams={[
                      { name: '核心平台', share: 40, hue: 'periwinkle', members: ['林', '陆'], quota: '128C' },
                      { name: 'AI 实验室', share: 30, hue: 'lilac', members: ['周'], quota: '8 GPU' },
                      { name: '数据工程', share: 20, hue: 'aqua', members: ['陈'], quota: '64C' },
                      { name: '测试环境', share: 10, hue: 'peach', members: ['吴'], quota: '32C' },
                    ]}
                  />
  ),
  'command-palette-bar-card': ({ toast }) => (
    <CommandPaletteBarCard
                    tone="ink"
                    quickActions={[
                      { label: '新建卡片', shortcut: '⌘N' },
                      { label: '切换主题', shortcut: '⌘T' },
                      { label: '导出规范', shortcut: '⌘E' },
                    ]}
                    onAction={(label) => toast({ title: `执行快捷指令：${label}`, status: 'info' })}
                  />
  ),
  'metric-comparison-table-card': () => (
    <MetricComparisonTableCard
                    tone="white"
                    title="边缘节点实测对比"
                    columns={['上海节点', '北京节点', '新加坡节点']}
                    rows={[
                      { metric: 'P99 响应延迟', values: ['12 ms', '16 ms', '34 ms'], bestIndex: 0 },
                      { metric: '单机峰值 QPS', values: ['18,400', '16,900', '19,200'], bestIndex: 2 },
                      { metric: '月度可用率', values: ['99.99%', '99.97%', '99.98%'], bestIndex: 0 },
                    ]}
                  />
  ),
}
