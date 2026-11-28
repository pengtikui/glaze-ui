# Glaze 119 Specialized Cards Catalog

Cards are specialized Bento components on the same dimension as UI components. Install any card via `npx shadcn@latest add @glaze/<slug>` and import from `@/components/cards/<slug>`.

| Code | Component | Registry Name | Size | Domain | Slots / Structure |
| --- | --- | --- | --- | --- | --- |
| S1 | `StatusCard` | `@glaze/status-card` | S | ops | 状态卡 — 标签 · 状态大字 · 呼吸点 |
| S2 | `MetricCard` | `@glaze/metric-card` | S | metrics | 单一指标卡 — 标签 · 主数字 · 单位 · 图标 |
| S3 | `ProgressCard` | `@glaze/progress-card` | S | metrics | 进度条卡 — 标签 · 数值 · 线性进度条 |
| S4 | `RingCard` | `@glaze/ring-card` | S | metrics | 环形进度卡 — 标签 · 环形图 · 说明 |
| S5 | `MetricBarsCard` | `@glaze/metric-bars-card` | S | metrics | 微柱指标卡 — 标签 · 数值 · 7 天迷你柱 |
| S6 | `DotMatrixCard` | `@glaze/dot-matrix-card` | S | metrics | 点阵占比卡 — 标签 · 24 点阵 · 统计 |
| S7 | `GaugeCard` | `@glaze/gauge-card` | S | ops | 仪表盘卡 — 标签 · 弧形表盘 · 百分比 |
| S8 | `QuickEntryCard` | `@glaze/quick-entry-card` | S | controls | 快捷入口卡 — 图标底 · 标题 · 跳转箭头 |
| S9 | `CompareCard` | `@glaze/compare-card` | S | metrics | 对比进度小卡 — 两项数值对比条 · 差值 |
| S10 | `CountdownCard` | `@glaze/countdown-card` | S | collaboration | 倒计时卡 — 事件名 · 剩余天数 · 进度格 |
| S11 | `SwitchCard` | `@glaze/switch-card` | S | controls | 开关控制卡 — 图标 · 实时 Switch 开关 |
| S12 | `MembersCard` | `@glaze/members-card` | S | collaboration | 成员叠放卡 — 人数 · 头像组 · 活跃说明 |
| S13 | `ClockCard` | `@glaze/clock-card` | S | collaboration | 实时时钟卡 — 城市 · 实时时间 · 日期 |
| S14 | `WeatherCard` | `@glaze/weather-card` | S | ops | 天气实况卡 — 城市 · 温度 · 体感湿度 |
| S15 | `BatteryCard` | `@glaze/battery-card` | S | ops | 电量分段卡 — 设备 · 5 段电芯 · 剩余时长 |
| S16 | `TemperatureCard` | `@glaze/temperature-card` | S | controls | 温控调节卡 — 房间 · 可交互 ± 调温 |
| S17 | `QuotaCard` | `@glaze/quota-card` | S | metrics | 配额消耗卡 — 已用/总量 · 进度 · 重置日 |
| S18 | `StreakCard` | `@glaze/streak-card` | S | collaboration | 连续打卡卡 — 天数 · 7 天完成点阵 |
| S19 | `RatingCard` | `@glaze/rating-card` | S | metrics | 星级评分卡 — 大数字评分 · 五星 · 评价数 |
| S20 | `SliderControlCard` | `@glaze/slider-control-card` | S | controls | 滑块控制卡 — 实时数值 · 嵌入式 Slider |
| S21 | `MiniCalendarDayCard` | `@glaze/mini-calendar-day-card` | S | collaboration | 撕页日历卡 — 月份胶囊 · 超大日期 · 日程数 |
| S22 | `CurrencyCard` | `@glaze/currency-card` | S | metrics | 汇率行情卡 — 币种对 · 现价 · 涨跌胶囊 |
| S23 | `HealthPulseCard` | `@glaze/health-pulse-card` | S | ops | 心率脉搏卡 — BPM 大数字 · 心电折线 |
| S24 | `WaterIntakeCard` | `@glaze/water-intake-card` | S | collaboration | 饮水记录卡 — 杯数统计 · 点击 +1 交互 |
| S25 | `SignalStrengthCard` | `@glaze/signal-strength-card` | S | ops | 信号强度卡 — SSID · 4 格信号柱 · 延迟 |
| S26 | `DiskTempCard` | `@glaze/disk-temp-card` | S | ops | 硬件温度计卡 — 温度 · 竖条温度计 · 设备 |
| S27 | `TagCloudCard` | `@glaze/tag-cloud-card` | S | collaboration | 标签云小卡 — 标题 · 多色 HueTag 集合 |
| S28 | `QuickActionGridCard` | `@glaze/quick-action-grid-card` | S | controls | 2×2 快捷网格卡 — 4 个高密度快捷按钮 |
| S29 | `SparkAreaCard` | `@glaze/spark-area-card` | S | charts | 面积微趋势小卡 — KPI · 环比胶囊 · 渐变面积微图 |
| S30 | `RadialScoreCard` | `@glaze/radial-score-card` | S | charts | 径向评分小卡 — 多环径向进度 · 中心得分 |
| S31 | `AiTokenBudgetCard` | `@glaze/ai-token-budget-card` | S | ai | AI 上下文预算小卡 — Token 环形用量 · 缓存命中 · 费用 |
| S32 | `AiAgentStatusCard` | `@glaze/ai-agent-status-card` | S | ai | 智能体运行状态小卡 — 模型标识 · 呼吸状态点 · 子智能体数 |
| W1 | `AreaTrendCard` | `@glaze/area-trend-card` | W | charts | 面积趋势卡 — 标题 · 现值 · 面积折线 |
| W2 | `AppLauncherCard` | `@glaze/app-launcher-card` | W | controls | 应用发射台卡 — 8 宫格彩色应用入口 |
| W3 | `StepsCard` | `@glaze/steps-card` | W | collaboration | 步骤流程横卡 — 编号进度 · 当前激活步骤 |
| W4 | `ObjectDetailCard` | `@glaze/object-detail-card` | W | ops | 对象详情卡 — 图标 · 标题 · 属性键值 |
| W5 | `MultiMetricCard` | `@glaze/multi-metric-card` | W | metrics | 多指标横排卡 — 3 列并排大指标 |
| W6 | `HeatmapCard` | `@glaze/heatmap-card` | W | charts | 贡献热力图卡 — 7×24 活跃色阶方块矩阵 |
| W7 | `AlertBannerCard` | `@glaze/alert-banner-card` | W | ops | 告警横幅卡 — 标题 · 说明 · 动作按钮 |
| W8 | `DistributionBarCard` | `@glaze/distribution-bar-card` | W | metrics | 分段分布条卡 — 堆叠彩色比例条 · 图例 |
| W9 | `MediaPlayerCard` | `@glaze/media-player-card` | W | controls | 宽格媒体播放器 — 封面 · 播停切歌 · 进度条 |
| W10 | `DualSeriesTrendCard` | `@glaze/dual-series-trend-card` | W | charts | 双曲线对比卡 — 实线/虚线双序列对比 |
| W11 | `UptimeStripCard` | `@glaze/uptime-strip-card` | W | ops | 30 日 SLA 状态条 — 30 根可用性绿条 · Tooltip |
| W12 | `ProfileSummaryCard` | `@glaze/profile-summary-card` | W | collaboration | 人物名片摘要卡 — 头像 · 职位 · 状态 · 3 指标 |
| W13 | `CommandLauncherCard` | `@glaze/command-launcher-card` | W | controls | 嵌入式命令检索卡 — 基于 cmdk 的卡片内模糊命令筛选与触发 |
| W14 | `FlightRouteCard` | `@glaze/flight-route-card` | W | collaboration | 航班行程卡 — 三字码 · 虚线航迹 · 登机口 |
| W15 | `WeatherForecastCard` | `@glaze/weather-forecast-card` | W | ops | 5 日天气预报卡 — 5 天最高/最低温与降水率 |
| W16 | `ServerResourceCard` | `@glaze/server-resource-card` | W | ops | 三环资源监控卡 — CPU / RAM / Disk 并排环图 |
| W17 | `BudgetMeterCard` | `@glaze/budget-meter-card` | W | metrics | 月度预算计量卡 — 自动语义 Meter · 分类标签 |
| W18 | `PomodoroCard` | `@glaze/pomodoro-card` | W | collaboration | 番茄专注钟卡 — 可运行倒计时 · 开始/重置 |
| W19 | `QuickNoteCard` | `@glaze/quick-note-card` | W | collaboration | 灵感速记便签卡 — 可编辑文本区 · 字数统计 |
| W20 | `DeviceControlStripCard` | `@glaze/device-control-strip-card` | W | controls | 三设备联动控制条 — 3 组可切换智能设备开关 |
| W21 | `SparkMetricRowCard` | `@glaze/spark-metric-row-card` | W | metrics | 三列微柱 KPI 带 — 3 组紧凑 KPI + 迷你柱图 |
| W22 | `MilestoneBannerCard` | `@glaze/milestone-banner-card` | W | collaboration | 里程碑进度横幅 — 版本号 · 进度条 · 负责人头像 |
| W23 | `CodeDeployCard` | `@glaze/code-deploy-card` | W | ops | CI/CD 部署状态卡 — 仓库 · 分支 · SHA · 构建耗时 |
| W24 | `NotificationDigestCard` | `@glaze/notification-digest-card` | W | collaboration | 消息摘要通知卡 — 未读数 · 分类标签 · 最新预览 |
| W25 | `StackedAreaTrendCard` | `@glaze/stacked-area-trend-card` | W | charts | 堆叠面积趋势宽卡 — 多端流量堆叠面积 · 可点击图例 |
| W26 | `HorizontalBarRankCard` | `@glaze/horizontal-bar-rank-card` | W | charts | 横向条形排行宽卡 — 横向圆角条形图 · 悬停提示 |
| W27 | `TargetLineCard` | `@glaze/target-line-card` | W | charts | 目标基线折线宽卡 — 带参考红线折线 · 状态徽章 |
| W28 | `AiPromptBarCard` | `@glaze/ai-prompt-bar-card` | W | ai | AI 提示词发射宽卡 — 模型选择 · 思考联网开关 · 快捷建议 |
| W29 | `AiApprovalCard` | `@glaze/ai-approval-card` | W | ai | 智能体人工审批宽卡 — 风险等级 · 命令预览 · 批准/拒绝 |
| W30 | `DateRangeCard` | `@glaze/date-range-card` | W | collaboration | 日期区间快选卡 — 基于 Calendar + Popover 的跨月区间选择与预设切换 |
| W31 | `OtpVerifyCard` | `@glaze/otp-verify-card` | W | controls | 2FA 动态口令校验卡 — 基于 OTPField 的 6 位安全验证码实时校验 |
| W32 | `NodeHealthChainCard` | `@glaze/node-health-chain-card` | W | ops | 服务链路健康宽卡 — 基于 TopologyKindIcon 的上游依赖延迟链条 |
| T1 | `BarListCard` | `@glaze/bar-list-card` | T | collaboration | 条形排行卡 — 总指标 · 进度条排行列表 |
| T2 | `EventTimelineCard` | `@glaze/event-timeline-card` | T | collaboration | 事件时间线卡 — 时间戳 · 状态点 · 事件描述 |
| T3 | `VerticalBarsCard` | `@glaze/vertical-bars-card` | T | charts | 竖柱趋势竖卡 — 大数字 · 多月竖柱 |
| T4 | `ChecklistCard` | `@glaze/checklist-card` | T | collaboration | 交互待办清单 — 真实 Checkbox · 完成统计 |
| T5 | `LeaderboardCard` | `@glaze/leaderboard-card` | T | collaboration | 贡献排行榜 — 名次徽章 · 头像 · 得分 |
| T6 | `FileListCard` | `@glaze/file-list-card` | T | collaboration | 最近文件列表 — 文件类型图标 · 体积时间 |
| T7 | `ScheduleAgendaCard` | `@glaze/schedule-agenda-card` | T | collaboration | 今日议程日程 — 色条 · 时间 · 会议地点 |
| T8 | `DiskPartitionsCard` | `@glaze/disk-partitions-card` | T | ops | 磁盘分区容量 — 多卷 Meter · 挂载路径 |
| T9 | `ContactListCard` | `@glaze/contact-list-card` | T | collaboration | 值班联系人卡 — 头像 · 角色 · 在线呼吸点 |
| T10 | `HabitTrackerCard` | `@glaze/habit-tracker-card` | T | collaboration | 习惯打卡矩阵 — 多习惯 × 7 日胶囊点阵 |
| T11 | `PriceTickerCard` | `@glaze/price-ticker-card` | T | metrics | 自选行情列表 — 代码 · 现价 · 涨跌胶囊 |
| T12 | `QuickSettingsCard` | `@glaze/quick-settings-card` | T | controls | 偏好开关面板 — 多项真实 Switch 偏好项 |
| T13 | `FunnelCard` | `@glaze/funnel-card` | T | charts | 转化漏斗竖卡 — 4 阶段递减宽条 · 转化率 |
| T14 | `RadialGoalsCard` | `@glaze/radial-goals-card` | T | charts | 多环目标达成竖卡 — 3 环径向进度 · 目标明细行 |
| T15 | `StackedColumnCard` | `@glaze/stacked-column-card` | T | charts | 堆叠柱状分布竖卡 — 总指标 · 多状态堆叠竖柱 |
| T16 | `AiPlanQueueCard` | `@glaze/ai-plan-queue-card` | T | ai | Agent 规划与队列竖卡 — 阶段进度条 · 执行步骤 · 待办队列 |
| T17 | `AiSourcesCard` | `@glaze/ai-sources-card` | T | ai | RAG 溯源参考竖卡 — 语义命中文档 · 相关度 · 摘要跳转 |
| L1 | `HeroMetricCard` | `@glaze/hero-metric-card` | L | metrics | 主指标英雄大卡 — 深色聚焦 · 趋势线 · 3 副指标 |
| L2 | `DonutChartCard` | `@glaze/donut-chart-card` | L | charts | 环形占比图 — 多段圆环 · 中心汇总 · 图例 |
| L3 | `ItemListCard` | `@glaze/item-list-card` | L | collaboration | 明细列表大卡 — 图标 · 标题 · 状态胶囊列表 |
| L4 | `CalendarCard` | `@glaze/calendar-card` | L | collaboration | 交互日历大卡 — 基于 Calendar 原语的月份切换、事件圆点与日期选择 |
| L5 | `GroupedBarChartCard` | `@glaze/grouped-bar-chart-card` | L | charts | 分组对比柱图 — 双色并排分组柱状图 |
| L6 | `KanbanMiniCard` | `@glaze/kanban-mini-card` | L | collaboration | 双列迷你看板 — 泳道计数 · 任务卡片组 |
| L7 | `ActivityFeedCard` | `@glaze/activity-feed-card` | L | collaboration | 实时动态信息流 — 头像 · 动作目标 · 时间 |
| L8 | `ServerRackCard` | `@glaze/server-rack-card` | L | ops | 机架刀片监控卡 — 深色机柜 · 状态灯 · 负载条 |
| L9 | `FloorPlanSensorCard` | `@glaze/floor-plan-sensor-card` | L | ops | 房间传感器矩阵 — 4 房间温湿度与灯光状态 |
| L10 | `RevenueBreakdownCard` | `@glaze/revenue-breakdown-card` | L | metrics | 收入构成大卡 — 总营收 · 堆叠条 · 分渠道 |
| L11 | `ChatPreviewCard` | `@glaze/chat-preview-card` | L | collaboration | 实时会话预览卡 — 基于 Conversation 原语的团队会话与快捷回复 |
| L12 | `GalleryMosaicCard` | `@glaze/gallery-mosaic-card` | L | collaboration | 相册拼图大卡 — 2×2 柔彩色块相册封面 |
| L13 | `IncidentLogCard` | `@glaze/incident-log-card` | L | ops | 告警事件日志大卡 — 事件编号 · 影响服务 · 状态 |
| L14 | `ComposedRevenueCard` | `@glaze/composed-revenue-card` | L | charts | 双轴组合分析大卡 — 堆叠柱状 + 折线双 Y 轴 |
| L15 | `ScatterBubbleCard` | `@glaze/scatter-bubble-card` | L | charts | 散点气泡分布大卡 — 多组 X/Y 散点 · Z 轴气泡映射 |
| L16 | `MultiRadarCompareCard` | `@glaze/multi-radar-compare-card` | L | charts | 多维雷达对比大卡 — 单/双序列对比 · 多边形/同心圆切换 |
| L17 | `AiAssistantCard` | `@glaze/ai-assistant-card` | L | ai | AI 交互对话大卡 — 流式推理折叠 · 对话流 · 实时发送 |
| L18 | `AiTraceInspectorCard` | `@glaze/ai-trace-inspector-card` | L | ai | 智能体执行链路大卡 — 思维链步骤 · 检索胶囊 · 工具入参输出 |
| L19 | `ServiceMeshCard` | `@glaze/service-mesh-card` | L | ops | 服务依赖网格大卡 — 核心指标带 · 紧凑交互拓扑预览 |
| L20 | `QuickFormCard` | `@glaze/quick-form-card` | L | controls | 快捷表单提交大卡 — 基于 TanStack Form 的轻量工单提交与实时校验 |
| F1 | `DataTableCard` | `@glaze/data-table-card` | F | data-views | 数据表格通栏卡 — 基于 TanStack DataTable 的排序、搜索、筛选与列显隐通栏卡 |
| F2 | `HierarchyCard` | `@glaze/hierarchy-card` | F | data-views | 层级架构通栏卡 — 根节点 · 多分支节点树 |
| F3 | `PhaseTimelineCard` | `@glaze/phase-timeline-card` | F | data-views | 阶段时间轴通栏卡 — 横向里程碑节点连线 |
| F4 | `DistributionBusCard` | `@glaze/distribution-bus-card` | F | data-views | 分布总线通栏卡 — 横向占比分布与节点明细 |
| F5 | `KpiStripCard` | `@glaze/kpi-strip-card` | F | metrics | 4 列核心 KPI 指标带 — 4 列通栏大数字与环比 |
| F6 | `PricingPlansCard` | `@glaze/pricing-plans-card` | F | data-views | 三档定价方案卡 — 3 栏方案对比 · 推荐高亮 |
| F7 | `ServiceStatusMatrixCard` | `@glaze/service-status-matrix-card` | F | ops | 全站服务状态矩阵 — 多服务可用性条与状态胶囊 |
| F8 | `GanttScheduleCard` | `@glaze/gantt-schedule-card` | F | data-views | 甘特排期通栏卡 — 多泳道时间条 · 负责人 |
| F9 | `ReleaseChangelogCard` | `@glaze/release-changelog-card` | F | data-views | 版本发布记录卡 — 3 列版本卡片 · 亮点列表 |
| F10 | `ResourceAllocationCard` | `@glaze/resource-allocation-card` | F | data-views | 资源分摊通栏卡 — 堆叠占比条 · 4 部门配额与头像 |
| F11 | `CommandPaletteBarCard` | `@glaze/command-palette-bar-card` | F | controls | 全局命令栏通栏卡 — 深色命令输入 · ⌘K CommandDialog 弹窗 |
| F12 | `MetricComparisonTableCard` | `@glaze/metric-comparison-table-card` | F | data-views | 多维指标对比表 — 横向指标矩阵 · 最优值高亮 |
| F13 | `InteractiveAnalyticsCard` | `@glaze/interactive-analytics-card` | F | charts | 交互式多视图趋势通栏卡 — 面积/折线/柱状即时切换 · 3 KPI 摘要带 |
| F14 | `ComposedOverviewCard` | `@glaze/composed-overview-card` | F | charts | 全年经营组合双轴通栏卡 — 12 月柱状 + 面积 + 折线双轴全景 |
| F15 | `AiWorkspaceConsoleCard` | `@glaze/ai-workspace-console-card` | F | ai | AI 代码产物工作区通栏卡 — 变更文件树 · 代码/Diff 审查 · 终端输出 |
| F16 | `AiModelEvalCard` | `@glaze/ai-model-eval-card` | F | ai | 多模型评测路由矩阵通栏卡 — 延迟/吞吐/推理得分对比 · 一键切换主路由 |
| F17 | `TopologyMapCard` | `@glaze/topology-map-card` | F | ops | 交互网络拓扑通栏卡 — 实时流量连线 · 上下游路径追踪 · 缩放工具栏 |
| F18 | `SplitCompareCard` | `@glaze/split-compare-card` | F | data-views | 可调分栏对比通栏卡 — 基于 Resizable 的双版本灰度配置与指标拖拽对照 |
