# Glaze 112 Business Blocks Catalog

Every block is independently installable via `npx shadcn@latest add @glaze/<slug>` and imports cleanly from `@/components/blocks/<slug>`.

| Code | Component | Registry Name | Size | Domain | Slots / Structure |
| --- | --- | --- | --- | --- | --- |
| S1 | `StatusCard` | `@glaze/status-card` | S | monitoring | 状态卡 — 标签 · 状态大字 · 呼吸点 |
| S2 | `MetricCard` | `@glaze/metric-card` | S | metrics | 单一指标卡 — 标签 · 主数字 · 单位 · 图标 |
| S3 | `ProgressCard` | `@glaze/progress-card` | S | metrics | 进度条卡 — 标签 · 数值 · 线性进度条 |
| S4 | `RingCard` | `@glaze/ring-card` | S | metrics | 环形进度卡 — 标签 · 环形图 · 说明 |
| S5 | `MetricBarsCard` | `@glaze/metric-bars-card` | S | metrics | 微柱指标卡 — 标签 · 数值 · 7 天迷你柱 |
| S6 | `DotMatrixCard` | `@glaze/dot-matrix-card` | S | metrics | 点阵占比卡 — 标签 · 24 点阵 · 统计 |
| S7 | `GaugeCard` | `@glaze/gauge-card` | S | monitoring | 仪表盘卡 — 标签 · 弧形表盘 · 百分比 |
| S8 | `QuickEntryCard` | `@glaze/quick-entry-card` | S | controls | 快捷入口卡 — 图标底 · 标题 · 跳转箭头 |
| S9 | `TrendCard` | `@glaze/trend-card` | S | metrics | 趋势折线卡 — 数值 · 环比胶囊 · 迷你曲线 |
| S10 | `CompareCard` | `@glaze/compare-card` | S | metrics | 对比进度小卡 — 两项数值对比条 · 差值 |
| S11 | `CountdownCard` | `@glaze/countdown-card` | S | productivity | 倒计时卡 — 事件名 · 剩余天数 · 进度格 |
| S12 | `SwitchCard` | `@glaze/switch-card` | S | controls | 开关控制卡 — 图标 · 实时 Switch 开关 |
| S13 | `MembersCard` | `@glaze/members-card` | S | lists | 成员叠放卡 — 人数 · 头像组 · 活跃说明 |
| S14 | `ClockCard` | `@glaze/clock-card` | S | productivity | 实时时钟卡 — 城市 · 实时时间 · 日期 |
| S15 | `NotificationCard` | `@glaze/notification-card` | S | lists | 通知提醒卡 — 图标 · 未读角标 · 最新预览 |
| S16 | `GraphicMetricCard` | `@glaze/graphic-metric-card` | S | metrics | 图形化指标卡 — 背景几何装饰 · 数值 |
| S17 | `WeatherCard` | `@glaze/weather-card` | S | monitoring | 天气实况卡 — 城市 · 温度 · 体感湿度 |
| S18 | `BatteryCard` | `@glaze/battery-card` | S | monitoring | 电量分段卡 — 设备 · 5 段电芯 · 剩余时长 |
| S19 | `TemperatureCard` | `@glaze/temperature-card` | S | controls | 温控调节卡 — 房间 · 可交互 ± 调温 |
| S20 | `SpeedCard` | `@glaze/speed-card` | S | monitoring | 半圆速度表卡 — 弧形速度盘 · 数值单位 |
| S21 | `QuotaCard` | `@glaze/quota-card` | S | metrics | 配额消耗卡 — 已用/总量 · 进度 · 重置日 |
| S22 | `StreakCard` | `@glaze/streak-card` | S | productivity | 连续打卡卡 — 天数 · 7 天完成点阵 |
| S23 | `RatingCard` | `@glaze/rating-card` | S | metrics | 星级评分卡 — 大数字评分 · 五星 · 评价数 |
| S24 | `QuoteCard` | `@glaze/quote-card` | S | productivity | 每日金句卡 — 标签 · 引语 · 署名 |
| S25 | `QrCard` | `@glaze/qr-card` | S | controls | 二维码名片卡 — 标题 · 矢量 QR · 扫码说明 |
| S26 | `KeyShortcutCard` | `@glaze/key-shortcut-card` | S | controls | 快捷键指南卡 — 按键组合键帽 · 功能说明 |
| S27 | `SliderControlCard` | `@glaze/slider-control-card` | S | controls | 滑块控制卡 — 实时数值 · 嵌入式 Slider |
| S28 | `MiniCalendarDayCard` | `@glaze/mini-calendar-day-card` | S | productivity | 撕页日历卡 — 月份胶囊 · 超大日期 · 日程数 |
| S29 | `CurrencyCard` | `@glaze/currency-card` | S | metrics | 汇率行情卡 — 币种对 · 现价 · 涨跌胶囊 |
| S30 | `HealthPulseCard` | `@glaze/health-pulse-card` | S | monitoring | 心率脉搏卡 — BPM 大数字 · 心电折线 |
| S31 | `WaterIntakeCard` | `@glaze/water-intake-card` | S | productivity | 饮水记录卡 — 杯数统计 · 点击 +1 交互 |
| S32 | `AudioNowPlayingCard` | `@glaze/audio-now-playing-card` | S | controls | 迷你播放器卡 — 均衡器 · 曲目 · 播停按钮 |
| S33 | `SignalStrengthCard` | `@glaze/signal-strength-card` | S | monitoring | 信号强度卡 — SSID · 4 格信号柱 · 延迟 |
| S34 | `DiskTempCard` | `@glaze/disk-temp-card` | S | monitoring | 硬件温度计卡 — 温度 · 竖条温度计 · 设备 |
| S35 | `TagCloudCard` | `@glaze/tag-cloud-card` | S | lists | 标签云小卡 — 标题 · 多色 HueTag 集合 |
| S36 | `QuickActionGridCard` | `@glaze/quick-action-grid-card` | S | controls | 2×2 快捷网格卡 — 4 个高密度快捷按钮 |
| S37 | `SparkAreaCard` | `@glaze/spark-area-card` | S | charts | 面积微趋势小卡 — KPI · 环比胶囊 · 渐变面积微图 |
| S38 | `RadialScoreCard` | `@glaze/radial-score-card` | S | charts | 径向评分小卡 — 多环径向进度 · 中心得分 |
| W1 | `AreaTrendCard` | `@glaze/area-trend-card` | W | charts | 面积趋势卡 — 标题 · 现值 · 面积折线 |
| W2 | `AppLauncherCard` | `@glaze/app-launcher-card` | W | controls | 应用发射台卡 — 8 宫格彩色应用入口 |
| W3 | `StepsCard` | `@glaze/steps-card` | W | productivity | 步骤流程横卡 — 编号进度 · 当前激活步骤 |
| W4 | `ObjectDetailCard` | `@glaze/object-detail-card` | W | monitoring | 对象详情卡 — 图标 · 标题 · 属性键值 |
| W5 | `MultiMetricCard` | `@glaze/multi-metric-card` | W | metrics | 多指标横排卡 — 3 列并排大指标 |
| W6 | `HeatmapCard` | `@glaze/heatmap-card` | W | charts | 贡献热力图卡 — 7×24 活跃色阶方块矩阵 |
| W7 | `AlertBannerCard` | `@glaze/alert-banner-card` | W | monitoring | 告警横幅卡 — 标题 · 说明 · 动作按钮 |
| W8 | `DistributionBarCard` | `@glaze/distribution-bar-card` | W | metrics | 分段分布条卡 — 堆叠彩色比例条 · 图例 |
| W9 | `MediaPlayerCard` | `@glaze/media-player-card` | W | controls | 宽格媒体播放器 — 封面 · 播停切歌 · 进度条 |
| W10 | `DualSeriesTrendCard` | `@glaze/dual-series-trend-card` | W | charts | 双曲线对比卡 — 实线/虚线双序列对比 |
| W11 | `UptimeStripCard` | `@glaze/uptime-strip-card` | W | monitoring | 30 日 SLA 状态条 — 30 根可用性绿条 · Tooltip |
| W12 | `ProfileSummaryCard` | `@glaze/profile-summary-card` | W | lists | 人物名片摘要卡 — 头像 · 职位 · 状态 · 3 指标 |
| W13 | `QuickSearchCard` | `@glaze/quick-search-card` | W | controls | 嵌入式搜索卡 — 全圆搜索框 · 热门关键词胶囊 |
| W14 | `FlightRouteCard` | `@glaze/flight-route-card` | W | productivity | 航班行程卡 — 三字码 · 虚线航迹 · 登机口 |
| W15 | `WeatherForecastCard` | `@glaze/weather-forecast-card` | W | monitoring | 5 日天气预报卡 — 5 天最高/最低温与降水率 |
| W16 | `ServerResourceCard` | `@glaze/server-resource-card` | W | monitoring | 三环资源监控卡 — CPU / RAM / Disk 并排环图 |
| W17 | `BudgetMeterCard` | `@glaze/budget-meter-card` | W | metrics | 月度预算计量卡 — 自动语义 Meter · 分类标签 |
| W18 | `PomodoroCard` | `@glaze/pomodoro-card` | W | productivity | 番茄专注钟卡 — 可运行倒计时 · 开始/重置 |
| W19 | `QuickNoteCard` | `@glaze/quick-note-card` | W | productivity | 灵感速记便签卡 — 可编辑文本区 · 字数统计 |
| W20 | `DeviceControlStripCard` | `@glaze/device-control-strip-card` | W | controls | 三设备联动控制条 — 3 组可切换智能设备开关 |
| W21 | `SparkMetricRowCard` | `@glaze/spark-metric-row-card` | W | metrics | 三列微柱 KPI 带 — 3 组紧凑 KPI + 迷你柱图 |
| W22 | `MilestoneBannerCard` | `@glaze/milestone-banner-card` | W | productivity | 里程碑进度横幅 — 版本号 · 进度条 · 负责人头像 |
| W23 | `CodeDeployCard` | `@glaze/code-deploy-card` | W | monitoring | CI/CD 部署状态卡 — 仓库 · 分支 · SHA · 构建耗时 |
| W24 | `NotificationDigestCard` | `@glaze/notification-digest-card` | W | lists | 消息摘要通知卡 — 未读数 · 分类标签 · 最新预览 |
| W25 | `StackedAreaTrendCard` | `@glaze/stacked-area-trend-card` | W | charts | 堆叠面积趋势宽卡 — 多端流量堆叠面积 · 可点击图例 |
| W26 | `HorizontalBarRankCard` | `@glaze/horizontal-bar-rank-card` | W | charts | 横向条形排行宽卡 — 横向圆角条形图 · 悬停提示 |
| W27 | `TargetLineCard` | `@glaze/target-line-card` | W | charts | 目标基线折线宽卡 — 带参考红线折线 · 状态徽章 |
| T1 | `BarListCard` | `@glaze/bar-list-card` | T | lists | 条形排行卡 — 总指标 · 进度条排行列表 |
| T2 | `EventTimelineCard` | `@glaze/event-timeline-card` | T | lists | 事件时间线卡 — 时间戳 · 状态点 · 事件描述 |
| T3 | `VerticalBarsCard` | `@glaze/vertical-bars-card` | T | charts | 竖柱趋势竖卡 — 大数字 · 多月竖柱 |
| T4 | `RankListCard` | `@glaze/rank-list-card` | T | lists | 数值榜单卡 — 名次 · 名称 · 比例条 |
| T5 | `ChecklistCard` | `@glaze/checklist-card` | T | productivity | 交互待办清单 — 真实 Checkbox · 完成统计 |
| T6 | `LeaderboardCard` | `@glaze/leaderboard-card` | T | lists | 贡献排行榜 — 名次徽章 · 头像 · 得分 |
| T7 | `FileListCard` | `@glaze/file-list-card` | T | lists | 最近文件列表 — 文件类型图标 · 体积时间 |
| T8 | `ScheduleAgendaCard` | `@glaze/schedule-agenda-card` | T | productivity | 今日议程日程 — 色条 · 时间 · 会议地点 |
| T9 | `DiskPartitionsCard` | `@glaze/disk-partitions-card` | T | monitoring | 磁盘分区容量 — 多卷 Meter · 挂载路径 |
| T10 | `ContactListCard` | `@glaze/contact-list-card` | T | lists | 值班联系人卡 — 头像 · 角色 · 在线呼吸点 |
| T11 | `HabitTrackerCard` | `@glaze/habit-tracker-card` | T | productivity | 习惯打卡矩阵 — 多习惯 × 7 日胶囊点阵 |
| T12 | `PriceTickerCard` | `@glaze/price-ticker-card` | T | metrics | 自选行情列表 — 代码 · 现价 · 涨跌胶囊 |
| T13 | `QuickSettingsCard` | `@glaze/quick-settings-card` | T | controls | 偏好开关面板 — 多项真实 Switch 偏好项 |
| T14 | `FunnelCard` | `@glaze/funnel-card` | T | charts | 转化漏斗竖卡 — 4 阶段递减宽条 · 转化率 |
| T15 | `RadialGoalsCard` | `@glaze/radial-goals-card` | T | charts | 多环目标达成竖卡 — 3 环径向进度 · 目标明细行 |
| T16 | `StackedColumnCard` | `@glaze/stacked-column-card` | T | charts | 堆叠柱状分布竖卡 — 总指标 · 多状态堆叠竖柱 |
| L1 | `HeroMetricCard` | `@glaze/hero-metric-card` | L | metrics | 主指标英雄大卡 — 深色聚焦 · 趋势线 · 3 副指标 |
| L2 | `DonutChartCard` | `@glaze/donut-chart-card` | L | charts | 环形占比图 — 多段圆环 · 中心汇总 · 图例 |
| L3 | `ItemListCard` | `@glaze/item-list-card` | L | lists | 明细列表大卡 — 图标 · 标题 · 状态胶囊列表 |
| L4 | `CalendarCard` | `@glaze/calendar-card` | L | productivity | 交互日历大卡 — 月份切换 · 事件标记 · 日期选择 |
| L5 | `GroupedBarChartCard` | `@glaze/grouped-bar-chart-card` | L | charts | 分组对比柱图 — 双色并排分组柱状图 |
| L6 | `RadarSkillCard` | `@glaze/radar-skill-card` | L | charts | 六维雷达评分卡 — 多边形网格 · 6 维能力评估 |
| L7 | `KanbanMiniCard` | `@glaze/kanban-mini-card` | L | productivity | 双列迷你看板 — 泳道计数 · 任务卡片组 |
| L8 | `ActivityFeedCard` | `@glaze/activity-feed-card` | L | lists | 实时动态信息流 — 头像 · 动作目标 · 时间 |
| L9 | `ServerRackCard` | `@glaze/server-rack-card` | L | monitoring | 机架刀片监控卡 — 深色机柜 · 状态灯 · 负载条 |
| L10 | `FloorPlanSensorCard` | `@glaze/floor-plan-sensor-card` | L | monitoring | 房间传感器矩阵 — 4 房间温湿度与灯光状态 |
| L11 | `RevenueBreakdownCard` | `@glaze/revenue-breakdown-card` | L | metrics | 收入构成大卡 — 总营收 · 堆叠条 · 分渠道 |
| L12 | `ChatPreviewCard` | `@glaze/chat-preview-card` | L | controls | 实时会话预览卡 — 气泡对话 · 可直接发送回复 |
| L13 | `GalleryMosaicCard` | `@glaze/gallery-mosaic-card` | L | lists | 相册拼图大卡 — 2×2 柔彩色块相册封面 |
| L14 | `IncidentLogCard` | `@glaze/incident-log-card` | L | monitoring | 告警事件日志大卡 — 事件编号 · 影响服务 · 状态 |
| L15 | `ComposedRevenueCard` | `@glaze/composed-revenue-card` | L | charts | 双轴组合分析大卡 — 堆叠柱状 + 折线双 Y 轴 |
| L16 | `ScatterBubbleCard` | `@glaze/scatter-bubble-card` | L | charts | 散点气泡分布大卡 — 多组 X/Y 散点 · Z 轴气泡映射 |
| L17 | `MultiRadarCompareCard` | `@glaze/multi-radar-compare-card` | L | charts | 双方案雷达对比大卡 — 双序列对比 · 多边形/同心圆切换 |
| F1 | `DataTableCard` | `@glaze/data-table-card` | F | layout | 数据表格通栏卡 — 分组标签 · 头像 · 进度条 · 状态 |
| F2 | `HierarchyCard` | `@glaze/hierarchy-card` | F | layout | 层级架构通栏卡 — 根节点 · 多分支节点树 |
| F3 | `PhaseTimelineCard` | `@glaze/phase-timeline-card` | F | layout | 阶段时间轴通栏卡 — 横向里程碑节点连线 |
| F4 | `DistributionBusCard` | `@glaze/distribution-bus-card` | F | layout | 分布总线通栏卡 — 横向占比分布与节点明细 |
| F5 | `KpiStripCard` | `@glaze/kpi-strip-card` | F | metrics | 4 列核心 KPI 指标带 — 4 列通栏大数字与环比 |
| F6 | `PricingPlansCard` | `@glaze/pricing-plans-card` | F | layout | 三档定价方案卡 — 3 栏方案对比 · 推荐高亮 |
| F7 | `ServiceStatusMatrixCard` | `@glaze/service-status-matrix-card` | F | monitoring | 全站服务状态矩阵 — 多服务可用性条与状态胶囊 |
| F8 | `GanttScheduleCard` | `@glaze/gantt-schedule-card` | F | layout | 甘特排期通栏卡 — 多泳道时间条 · 负责人 |
| F9 | `ReleaseChangelogCard` | `@glaze/release-changelog-card` | F | layout | 版本发布记录卡 — 3 列版本卡片 · 亮点列表 |
| F10 | `ResourceAllocationCard` | `@glaze/resource-allocation-card` | F | layout | 资源分摊通栏卡 — 堆叠占比条 · 4 部门配额与头像 |
| F11 | `CommandPaletteBarCard` | `@glaze/command-palette-bar-card` | F | controls | 全局命令栏通栏卡 — 深色命令输入 · 快捷指令胶囊 |
| F12 | `MetricComparisonTableCard` | `@glaze/metric-comparison-table-card` | F | layout | 多维指标对比表 — 横向指标矩阵 · 最优值高亮 |
| F13 | `InteractiveAnalyticsCard` | `@glaze/interactive-analytics-card` | F | charts | 交互式多视图趋势通栏卡 — 面积/折线/柱状即时切换 · 3 KPI 摘要带 |
| F14 | `ComposedOverviewCard` | `@glaze/composed-overview-card` | F | charts | 全年经营组合双轴通栏卡 — 12 月柱状 + 面积 + 折线双轴全景 |
