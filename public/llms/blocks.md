# Glaze 10 Reusable Business Blocks

Blocks are multi-component composite business sections built on top of Glaze UI primitives and Cards (inspired by shadcn Blocks). View standalone at `/view/blocks/<slug>` or install via `npx shadcn@latest add @glaze/<slug>`.

| Block | Export | Category | Registry CLI | Description |
| --- | --- | --- | --- | --- |
| 认证登录区块 | `AuthLoginBlock` | auth | `npx shadcn@latest add @glaze/auth-login-block` | 基于 TanStack Form 与 OTPField 构建的双栏认证区块，支持密码登录、6 位动态验证码切换、实时校验与 Passkey 入口。 |
| 核心指标总览区 | `DashboardKpiOverviewBlock` | dashboard | `npx shadcn@latest add @glaze/dashboard-kpi-overview-block` | 组合 StatusCard、SparkAreaCard、AreaTrendCard、MetricCard 与 Calendar 区间选择器的可复用仪表盘顶区模块。 |
| 数据管理工作区 | `DataManagementBlock` | dashboard | `npx shadcn@latest add @glaze/data-management-block` | 集成 KpiStripCard、TanStack DataTable、侧边详情 Drawer、新建表单 Dialog 与高危删除 AlertDialog 的完整 CRUD 业务块。 |
| 定价方案与账单切换区 | `PricingComparisonBlock` | commerce | `npx shadcn@latest add @glaze/pricing-comparison-block` | 支持月付/年付 8 折动态折算、NumberField 团队席位实时计价、三档方案高亮对比与 Accordion 常见计费 FAQ。 |
| 账户与偏好设置区 | `SettingsAccountBlock` | settings | `npx shadcn@latest add @glaze/settings-account-block` | 通过 Tabs 聚合个人档案表单、TOTP 2FA 验证器绑定、QuickSettingsCard 通知开关与危险区会话吊销确认。 |
| 日程预约与时段选择器 | `CalendarBookingBlock` | workspace | `npx shadcn@latest add @glaze/calendar-booking-block` | 三栏式预约业务块：左侧 Calendar 选日、中间 ScrollArea 选可用时段、右侧 TanStack Form 确认参会信息。 |
| AI 对话与产物审查区 | `AiChatWorkbenchBlock` | ai | `npx shadcn@latest add @glaze/ai-chat-workbench-block` | 结合 ResizablePanelGroup 可拖拽分栏、Conversation、Reasoning、PromptInput 与 AiArtifact 双态预览的可嵌入 AI 协作区块。 |
| 团队成员与权限管理区 | `TeamMembersBlock` | settings | `npx shadcn@latest add @glaze/team-members-block` | 组合 MembersCard、QuotaCard、语义 Table 原语、行内 Select 角色切换与邀请成员表单 Dialog 的组织管理区块。 |
| 可调分栏收件箱与工单流 | `SplitInboxBlock` | workspace | `npx shadcn@latest add @glaze/split-inbox-block` | 基于 ResizablePanelGroup 打造的轻量主从收件箱区块，支持全部/未读/星标筛选、关键字检索、标星归档与底部快捷回复。 |
| 服务拓扑与告警联查区 | `TopologyHealthPanelBlock` | ops | `npx shadcn@latest add @glaze/topology-health-panel-block` | 将 TopologyCanvas、NodeHealthChainCard、StatusCard 与 UptimeStripCard 联动封装，一键注入缓存抖动故障并观测全链路变化。 |
