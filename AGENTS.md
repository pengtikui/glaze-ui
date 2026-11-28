# AGENTS.md — Glaze（釉）Design System AI Agent 使用指南

> 本文档面向 AI Coding Agents（Antigravity、Claude Code、Cursor、Codex、GitHub Copilot 等）。当你在任何项目中使用或开发 **Glaze UI** 组件、卡片、Blocks 与页面时，请严格遵循以下规范。

---

## 1. 快速索引（机器可读端点）

如果当前环境可以读取项目文件或通过 HTTP 访问 GitHub 仓库（`https://github.com/pengtikui/glaze-ui`）或自托管文档站，优先使用以下结构化入口：

| 资源 | 路径 / URL | 用途 |
| --- | --- | --- |
| Registry 索引 | `registry.json` / `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/registry.json` | 全部 230 个可安装条目清单（style、lib、82 UI、119 cards、10 blocks、15 pages） |
| 单条目 Registry | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/<slug>.json` | 包含源码、NPM 依赖与 `registryDependencies` 的 shadcn item JSON |
| LLM 站点索引 | `public/llms.txt` / `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms.txt` | 遵循 llmstxt.org 标准的文档与组件全目录 |
| LLM 完整上下文 | `public/llms-full.txt` / `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms-full.txt` | 单文件完整 API、设计规范、卡片/Blocks/页面索引 |
| 单组件 Markdown | `public/llms/components/<slug>.md` / `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/components/<slug>.md` | 单个组件的完整 Props API、Data Attributes、CSS Variables 与源码 |

---

## 2. 通过 shadcn CLI 安装

### 2.1 在目标项目配置 `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "glaze",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles/glaze.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "iconLibrary": "phosphor",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
  }
}
```

### 2.2 常用安装命令

```bash
# 1. 初始化基础样式、色板 Token 与动效预设（首次必装）
npx shadcn@latest add @glaze/style

# 2. 按需安装基础 UI 组件（自动拉取依赖）
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/calendar @glaze/data-table @glaze/resizable

# 3. 安装专用业务卡片（components/cards/）
npx shadcn@latest add @glaze/status-card @glaze/metric-card @glaze/data-table-card @glaze/split-compare-card

# 4. 安装复合业务 Blocks（components/blocks/）
npx shadcn@latest add @glaze/auth-login-block @glaze/data-management-block @glaze/calendar-booking-block

# 5. 安装完整业务页面（components/pages/）
npx shadcn@latest add @glaze/page-mail-desk
```

---

## 3. 核心设计硬规则（严禁违背）

AI Agent 生成任何 Glaze 页面或组件时，**必须**遵守以下视觉与交互红线：

1. **画布与卡片对比（无描边、无阴影）**：
   - 页面画布背景固定为 `#F2F4F8`（`--glaze-canvas`）。
   - `<Tile>` 卡片（纯白 `#FFFFFF`、9 组柔彩或 4 组深色）**严禁**添加 `border` 或 `shadow-*`；层级仅靠卡片与画布的底色反差建立。
   - 仅浮层（`Menu`、`Popover`、`Select`、`Dialog`、`Drawer`、`Toast`）使用轻微描边和阴影。
2. **圆角体系严格分层**：
   - **全圆胶囊 (`rounded-full`)** + 标准高度 `44px` (`h-11`)：所有单行控件（`Button`、`Input`、`Select`、`Combobox`、`Autocomplete`、`NumberField`、`Switch`、`Toggle`、`Tabs`、`SegmentedControl`、`Menubar`、`Toolbar`），默认柔灰底色 `#F6F7F9`、无描边。
   - `rounded-inner` (`18px`)：`Textarea`、`Fieldset`、`Accordion`、`Collapsible`。
   - `rounded-overlay` (`20px`)：所有弹出浮层与 `Toast`。
   - `rounded-tile` (`28px`)：`Tile`、`Dialog`、`Drawer`。
3. **色彩系统（禁止凭空编造 Hex）**：
   - 从 `@/lib/tokens` 导入 `HUE_PALETTES`、`TILE_THEMES`、`SEMANTIC_TOKENS`、`DATAVIZ_PALETTES`。
   - **9 组柔彩色相 (`Hue`)**：`'sky' | 'mint' | 'peach' | 'lilac' | 'rose' | 'lemon' | 'aqua' | 'periwinkle' | 'coral'`。
   - **14 种卡片色调 (`TileTone`)**：`'white' | Hue | 'sky-dark' | 'lilac-dark' | 'aqua-dark' | 'ink'`。
   - **5 种语义状态 (`Status`)**：`'normal' | 'warning' | 'error' | 'info' | 'disabled'`。
   - 仪表盘中避免满屏高饱和色块：推荐 **60% 纯白卡 + 30% 柔彩卡 + 10% 深色聚焦卡（最多 1-2 张）**。
4. **Base UI 1.9 规范（绝不使用 Radix API）**：
   - 底层是 `@base-ui/react` v1.9，**禁止使用 Radix 的 `asChild` 属性**。
   - Base UI 组合触发器使用 `render={<Button>...</Button>}`，或直接使用 Glaze 封装好的 `trigger={<Button>...</Button>}`。
   - 工具函数为 `import { cn } from 'cn'`（`shadcn-ui/cn`）。
   - 图标统一从 `@phosphor-icons/react` 导入，禁止混用 `lucide-react` 除非项目明确要求。
5. **CSS 优先动效与性能红线**：
   - **禁止**在 `Dialog` / `Drawer` 遮罩上添加 `backdrop-blur`。
   - `PRESS_SCALE` (`scale(0.97)`) **仅限**独立紧凑操作（`Button`、`Toggle`、`Checkbox`、`Radio`、`ToolbarButton`），严禁用于 `Select`、`Tabs`、`SegmentedControl`、`Switch`、`Tile` 及任何浮层触发器。
   - 应用根部必须包裹 `<TooltipProvider>` 与 `<ToastProvider>`。

---

## 4. 四层目录与导入路径规范（Direct File Imports）

所有 Registry 条目均使用单文件直接导入，不依赖 barrel `index.ts`：

```tsx
// ✅ 正确：单文件直接导入（与 shadcn CLI 安装目录 1-to-1 对应）
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DataTable } from '@/components/ui/data-table'
import { StatusCard } from '@/components/cards/status-card'
import { AuthLoginBlock } from '@/components/blocks/auth-login-block'
import { HUE_PALETTES, type Hue, type TileTone } from '@/lib/tokens'
```

### 卡片尺寸速查（`TileSize`）

| 尺寸 | 占格（桌面 4 列） | 最小高度 | 适用场景 |
| --- | --- | --- | --- |
| `s` | 1 列 × 1 行 | `200px` | 单指标、状态、仪表盘、微趋势、开关、快捷入口（32 种） |
| `w` | 2 列 × 1 行 | `200px` | 面积/折线趋势、日期区间、2FA 校验、命令检索、健康链路（32 种） |
| `t` | 1 列 × 2 行 | `416px` | 排行榜、时间线、待办清单、议程、漏斗、堆叠竖柱（17 种） |
| `l` | 2 列 × 2 行 | `416px` | 英雄大卡、环形图、日历、雷达图、快捷表单、双轴组合、看板（20 种） |
| `f` | 通栏 4 列 × 自适应 | auto | TanStack 数据表格、可调分栏对比、拓扑图、甘特排期、定价方案（18 种） |

---

## 5. 本仓库开发与构建命令

在 `glaze-ui` 源码仓库中修改 `registry/glaze/` 下的任意组件、卡片、Block 或页面后，请务必重新生成 Registry 产物与 AI 文档：

```bash
# 重新生成 registry.json、public/r/*.json、src/docs/generated/*.json 与 public/llms*.txt
pnpm run build:registry

# TypeScript 类型检查
pnpm run typecheck

# 完整生产构建（自动先执行 build:registry）
pnpm run build

# 启动文档站点本地开发服务器
pnpm dev
```

### 仓库目录结构

- `registry/glaze/styles/glaze.css` — 核心样式与 Tailwind v4 主题变量
- `registry/glaze/lib/{tokens,motion,topology}.ts` — 设计 Token、动效预设与 ELK 拓扑工具
- `registry/glaze/ui/*.tsx` — 82 个单文件基础组件、图表、AI Elements 与拓扑组件
- `registry/glaze/cards/*.tsx` — 119 个单文件专用业务卡片（路由 `/cards`、`/view/cards/:slug`）
- `registry/glaze/blocks/*.tsx` — 10 个复合通用业务 Blocks（路由 `/blocks`、`/view/blocks/:slug`）
- `registry/glaze/pages/*.tsx` — 15 个完整业务页面（路由 `/pages`、`/view/pages/:slug`）
- `scripts/build-registry.mjs` — Registry 编译器、TS AST API 提取器与 `llms*.txt` 生成器
- `public/r/*.json` — 静态托管的 shadcn Registry JSON 产物
- `public/llms.txt`, `public/llms-full.txt`, `public/llms/**` — AI Agent 可直接检索的 Markdown 文档
- `src/content/docs/*.md` — Astro Content Collections 维护的 Markdown 文档页面
- `src/pages/` & `src/docs/` — Astro 静态文档站
