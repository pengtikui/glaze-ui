# Glaze（釉）Design System · shadcn Registry & Docs

**Glaze** 是一套基于 `@base-ui/react`（v1.9）、`tailwindcss`（v4）、`recharts`（v3）、`@phosphor-icons/react` 与 `shadcn-ui/cn` 构建的无障碍设计系统，现已全面重构为 **shadcn Custom Registry + 仿 shadcn/ui 架构的交互式文档站 + AI Agent 专属文档体系**：

- **179 项 shadcn Registry 产物**：包含基础样式主题（`@glaze/style`）、Token 与动效库、**58 个单文件 UI 与图表组件**、**112 个独立可安装的业务卡片（Blocks）**以及 **6 个完整业务 Demo 页面**，支持 `npx shadcn@latest add @glaze/<name>` 一键安装。
- **Astro 静态文档站 + Markdown 内容维护 + Shiki 代码高亮**：文档正文以纯 Markdown（`src/content/docs/*.md`，Astro Content Collections）维护，内置 Shiki（`one-dark-pro`）构建时与客户端代码高亮、三栏布局、全局 `⌘K` 搜索、Preview / Code 切换与 Base UI API 参考表。
- **完全独立的 Demo 预览路由**：6 个真实业务 Demo 注册在 `/view/demos/:slug`（单卡片预览在 `/view/blocks/:slug`），不嵌入文档站框架，支持新窗口全屏打开及桌面/平板/手机响应式视口预览。
- **AI Agent 专属文档套件**：内置根目录 [`AGENTS.md`](./AGENTS.md)、[`CLAUDE.md`](./CLAUDE.md)、[`docs/ai-agent-guide.md`](./docs/ai-agent-guide.md)，并在构建时自动生成符合 llmstxt.org 标准的 `public/llms.txt`、`public/llms-full.txt` 与 62 份单组件/专题 Markdown 文件。

---

## 通过 shadcn CLI 安装

### 1. 在项目 `components.json` 中注册 `@glaze`

默认直接通过 GitHub Raw 分发 Registry JSON（无需额外域名即可使用）：

```json
{
  "registries": {
    "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
  }
}
```

### 2. 安装基础样式与任意组件 / 卡片 / Demo

```bash
# 安装 Glaze 样式表、Tailwind v4 主题变量、色板 Token 与动效预设
npx shadcn@latest add @glaze/style

# 安装 UI 组件与 Recharts 图表
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/select @glaze/area-chart

# 按需安装单张业务卡片（全部 112 张均独立分发）
npx shadcn@latest add @glaze/status-card @glaze/spark-area-card @glaze/data-table-card

# 安装完整业务 Demo 页面
npx shadcn@latest add @glaze/demo-homelab
```

更多部署与自托管配置详见 [`docs/registry-publishing.md`](./docs/registry-publishing.md)。

---

## 目录结构

```text
.
├── AGENTS.md                       # AI Coding Agent 核心使用手册
├── CLAUDE.md                       # Claude Code 入口说明
├── components.json                 # shadcn CLI 配置
├── registry.json                   # shadcn Registry 根清单（179 items）
├── docs/
│   ├── ai-agent-guide.md           # AI Agent 集成、MCP 与常见误区对照指南
│   └── registry-publishing.md      # 静态 Registry 构建与自托管发布指南
├── registry/glaze/                 # 单一事实来源 (Source of Truth)
│   ├── styles/glaze.css            # Glaze CSS 变量、4 列 dense 栅格与纯 CSS 动效
│   ├── lib/{tokens,motion}.ts      # 色板、语义状态、动效与表面预设
│   ├── ui/*.tsx                    # 58 个单文件组件（39 Base UI + 9 原语 + 10 Recharts）
│   ├── blocks/*.tsx                # 112 个单文件业务卡片
│   └── demos/*.tsx                 # 6 个完整业务 Demo 页面
├── scripts/
│   ├── catalog-meta.mjs            # 分类元数据、Base UI 映射、Data Attributes 定义
│   └── build-registry.mjs          # Registry 编译器、TS AST API 提取器与 llms*.txt 生成器
├── public/
│   ├── r/*.json                    # 180 个静态 shadcn Registry JSON 产物
│   ├── llms.txt                    # AI Agent 标准目录索引
│   ├── llms-full.txt               # AI Agent 单文件完整上下文
│   └── llms/components/*.md        # 58 份组件 Markdown 文档
└── src/
    ├── content.config.ts           # Astro Content Collections 配置
    ├── content/docs/*.md           # Markdown 文档源文件（自动生成路由与目录）
    ├── layouts/                    # Astro 基础布局与三栏文档布局
    ├── pages/                      # Astro 静态路由（文档、组件、/view/* 独立画布）
    ├── styles/docs.css             # 文档站与 Markdown Prose / Shiki 样式
    └── docs/                       # 交互式预览岛、组件示例与目录数据
```

---

## 本地开发与构建

```bash
pnpm install
pnpm run build:registry   # 编译 registry.json、public/r/*.json、API 元数据与 llms*.txt
pnpm dev                  # 启动 Astro 文档站点（默认 http://localhost:4321）
pnpm run typecheck        # TypeScript 严格类型检查
pnpm run build            # 完整构建（自动先执行 build:registry）
```

### 常用路由

- `/` — 首页
- `/docs`、`/docs/installation`、`/docs/foundations`、`/docs/ai-agent` — 核心文档与 AI Agent 指南
- `/docs/components`、`/docs/components/:slug` — 分类组件目录与 Base UI 风格 API 文档
- `/blocks` — 112 张业务卡片分类展示（支持按域/尺寸筛选、查看源码、复制 CLI 与独立预览）
- `/demos` — 6 个业务 Demo 画廊与响应式视口预览
- `/view/demos/:slug` — **独立全屏 Demo 页面**（`homelab`、`workspace`、`smart-home`、`analytics`、`personal-os`、`cloud-ops`）
- `/view/blocks/:slug` — **独立单卡片预览画布**
