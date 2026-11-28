# Glaze 15 Full Application Pages

Each page can be viewed standalone at `/view/pages/<slug>` (outside the docs frame) or installed via shadcn CLI.

| # | Title | Category | Standalone Route | Registry CLI | Description |
| --- | --- | --- | --- | --- | --- |
| 01 | 邮件与工单分栏工作台 (`MailDeskPage`) | app | `/view/pages/mail-desk` | `npx shadcn@latest add @glaze/page-mail-desk` | 三栏桌面级邮件与工单协作页面：左侧可折叠 Sidebar 文件夹与标签导航，右侧基于 ResizablePanelGroup 可自由拖拽的会话列表与正文阅读回复区。 |
| 02 | 团队日程与会议预约中心 (`CalendarPlannerPage`) | workspace | `/view/pages/calendar-planner` | `npx shadcn@latest add @glaze/page-calendar-planner` | 融合迷你日历、多日历图层显隐、五日周视图排期看板、新建日程侧边 Drawer，以及一键切换的对外公开预约页模式。 |
| 03 | CRM 客户关系与商机管线 (`CrmPipelinePage`) | app | `/view/pages/crm-pipeline` | `npx shadcn@latest add @glaze/page-crm-pipeline` | 支持「订单台账（TanStack DataTable CRUD）」「四阶段商机看板」「转化漏斗与回款预测」三视图切换的企业级 CRM 工作台。 |
| 04 | 工作空间与账单设置中心 (`SettingsPortalPage`) | app | `/view/pages/settings-portal` | `npx shadcn@latest add @glaze/page-settings-portal` | 完整的 SaaS 设置门户页面，左侧导航切换账户偏好、团队成员 RBAC 权限、月/年付订阅账单升级以及 CI/CD API 密钥签发与吊销。 |
| 05 | 认证登录与多步入驻引导 (`AuthOnboardingPage`) | app | `/view/pages/auth-onboarding` | `npx shadcn@latest add @glaze/page-auth-onboarding` | 面向 SaaS 产品入口的全屏认证与入驻流页面，包含双栏登录（密码/2FA/Passkey）与 3 步式工作空间创建、模板选择和成员邀请向导。 |
| 06 | 企业级控制台壳层 (`AdminShellDemoPage`) | app | `/view/pages/admin-shell` | `npx shadcn@latest add @glaze/page-admin-shell` | 带完整侧边栏与顶部栏的 App Shell 控制台，支持全宽/居中画布与悬浮/贴边侧栏切换，涵盖 15 种常见菜单类型与 ⌘K 命令面板。 |
| 07 | AI 智能体工作台 (`AiStudioDemoPage`) | workspace | `/view/pages/ai-studio` | `npx shadcn@latest add @glaze/page-ai-studio` | 集成 12 个 Glaze AI Elements 与 10 张 AI 业务卡片的全景工作台，支持「分栏对话与产物审查」与「AI Ops 四列看板」双模式切换。 |
| 08 | 网络与架构拓扑观测台 (`NetworkTopologyDemoPage`) | ops | `/view/pages/network-topology` | `npx shadcn@latest add @glaze/page-network-topology` | 基于 @xyflow/react 与 elkjs 构建的拓扑监控观测工作台，内置云原生多可用区与物理 VLAN 万兆网络双场景、上下游追踪与故障演练。 |
| 09 | 家庭内网与 Homelab 架构图 (`HomeNetworkDemoPage`) | ops | `/view/pages/home-network` | `npx shadcn@latest add @glaze/page-home-network` | 面向极客家庭与 Homelab 的全屋网络拓扑观测台，支持全屋物理布线四区 VLAN 与自托管服务 Tailscale 远程回家双视角切换。 |
| 10 | 家庭内网总控中心 (`HomelabDemoPage`) | dashboard | `/view/pages/homelab` | `npx shadcn@latest add @glaze/page-homelab` | 管理物理主机、群晖 NAS、Docker 容器、应用发射台、硬件温度与家庭网络拓扑的内网总控仪表盘。 |
| 11 | 研发协作工作台 (`WorkspaceDemoPage`) | workspace | `/view/pages/workspace` | `npx shadcn@latest add @glaze/page-workspace` | 覆盖迭代里程碑、CI/CD 部署状态、双列迷你看板、甘特排期、团队贡献榜与代码热力图的研发协作中心。 |
| 12 | 全屋智能家居中控 (`SmartHomeDemoPage`) | dashboard | `/view/pages/smart-home` | `npx shadcn@latest add @glaze/page-smart-home` | 面向大屏平板与桌面的智能家居控制中心，集成房间传感器矩阵、空调温控、灯光滑块与全屋场景一键联动。 |
| 13 | SaaS 营收与财务驾驶舱 (`AnalyticsDemoPage`) | dashboard | `/view/pages/analytics` | `npx shadcn@latest add @glaze/page-analytics` | 融合 Recharts v3 交互式多视图趋势、全年双轴组合分析、转化漏斗、收入构成与多维指标对比的经营分析大屏。 |
| 14 | 个人效率与数字生活 OS (`PersonalOsDemoPage`) | workspace | `/view/pages/personal-os` | `npx shadcn@latest add @glaze/page-personal-os` | 整合番茄钟、交互待办清单、习惯打卡矩阵、日历议程、心率饮水与灵感速记的个人数字生活仪表盘。 |
| 15 | 云原生运维与可观测性中心 (`CloudOpsDemoPage`) | ops | `/view/pages/cloud-ops` | `npx shadcn@latest add @glaze/page-cloud-ops` | 展示全站 30 日 SLA 状态、集群资源三环监控、告警事件日志、散点延迟分布与全局命令栏的 SRE 运维中心。 |
