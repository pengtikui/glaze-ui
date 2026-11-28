# Glaze（釉）Design System · shadcn Registry & Docs

**Glaze** 是一套基于 `@base-ui/react`（v1.9）、`tailwindcss`（v4）、`recharts`（v3）、`@phosphor-icons/react` 与 `shadcn-ui/cn` 构建的无障碍设计系统，采用 **组件 / 卡片 / Blocks / 页面** 四层架构与 **shadcn Custom Registry** 分发体系：

- **230 项 shadcn Registry 产物**：包含基础样式与工具库（4 项）、**82 个单文件基础 UI / 图表 / AI / 拓扑组件**、**119 张专用 Bento 业务卡片（`/cards`）**、**10 个复合通用业务 Blocks（`/blocks`）**以及 **15 个完整业务页面（`/pages`）**，均支持 `npx shadcn@latest add @glaze/<name>` 一键安装。
- **Astro 静态文档站 + Markdown 内容维护 + Shiki 代码高亮**：内置三栏布局、全局 `⌘K` 搜索、Preview / Code 切换与 Base UI API 参考表。
- **独立无框架预览路由**：单卡片（`/view/cards/:slug`）、复合 Blocks（`/view/blocks/:slug`）与完整页面（`/view/pages/:slug`）均脱离文档站外框独立渲染，支持桌面/平板/手机响应式视口预览。
- **AI Agent 专属文档套件**：内置根目录 [`AGENTS.md`](./AGENTS.md)、[`CLAUDE.md`](./CLAUDE.md)，构建时自动生成 `public/llms.txt`、`public/llms-full.txt` 与 87 份 Markdown 索引。

---

## 通过 shadcn CLI 安装

```bash
# 1. 安装 Glaze 样式表、Tailwind v4 主题变量、色板 Token 与动效预设
npx shadcn@latest add @glaze/style

# 2. 安装基础组件与图表
npx shadcn@latest add @glaze/button @glaze/calendar @glaze/data-table @glaze/resizable

# 3. 安装专用业务卡片（components/cards/）
npx shadcn@latest add @glaze/status-card @glaze/date-range-card @glaze/split-compare-card

# 4. 安装复合业务 Blocks（components/blocks/）
npx shadcn@latest add @glaze/auth-login-block @glaze/data-management-block @glaze/calendar-booking-block

# 5. 安装完整业务页面（components/pages/）
npx shadcn@latest add @glaze/page-mail-desk
```

---

## 本地开发与构建

```bash
pnpm install
pnpm run build:registry   # 编译 registry.json、public/r/*.json、API 元数据与 llms*.txt
pnpm dev                  # 启动 Astro 文档站点（默认 http://localhost:4321）
pnpm run typecheck        # TypeScript 与 Astro 严格类型检查
pnpm run build            # 完整构建（自动先执行 build:registry）
```

### 常用路由

- `/` — 首页
- `/docs`、`/docs/installation`、`/docs/foundations`、`/docs/ai-agent` — 核心文档与 AI Agent 指南
- `/docs/components`、`/docs/components/:slug` — 82 个基础组件与 Base UI 风格 API 文档
- `/cards` — 119 张专用业务卡片画廊（独立预览 `/view/cards/:slug`）
- `/blocks` — 10 个通用复合业务 Blocks（独立预览 `/view/blocks/:slug`）
- `/pages` — 15 个完整业务页面与响应式视口预览（独立预览 `/view/pages/:slug`）
