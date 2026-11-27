# Glaze UI — AI Agent 集成与使用手册

本文档说明如何让 **Cursor、Claude Code、Antigravity、Windsurf、Codex** 等 AI Coding Agents 高质量地发现、安装并编写符合 Glaze 设计规范的界面代码。

---

## 1. 为 AI Agent 提供上下文的 4 种方式

### 方式 A：直接引用 `llms.txt` / `llms-full.txt`（推荐）

Glaze 遵循 [llmstxt.org](https://llmstxt.org/) 规范自动生成实时同步的纯文本 / Markdown 索引，可直接通过 GitHub Raw（或自托管文档站根路径 `/llms.txt`）访问：

- **轻量目录索引**：`https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms.txt`（列出所有文档、58 个组件、112 个卡片与 6 个 Demo 的链接）
- **单文件完整参考**：`https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms-full.txt`（包含安装配置、全部视觉/交互红线、112 卡片对照表、58 组件完整 Props & Data Attributes）
- **按需单组件文档**：`https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/components/<slug>.md`（例如 `dialog.md`，包含完整 TS Props 表格与源码）

### 方式 B：在项目中放入 `AGENTS.md` / `.cursor/rules/glaze.mdc`

直接复制本仓库根目录的 [`AGENTS.md`](../AGENTS.md) 到你的项目根目录，或将以下规则片段粘贴到你的 Agent 规则文件中：

```markdown
You are building UI with the Glaze Design System (Base UI 1.9 + Tailwind v4 + Recharts v3 + Phosphor Icons).
- Install components via shadcn CLI: `npx shadcn@latest add @glaze/<name>` (first run `npx shadcn@latest add @glaze/style`).
- Canvas background is `#F2F4F8`. Cards (`<Tile>`) MUST have NO border and NO box-shadow.
- Single-line controls (Button, Input, Select, Combobox, Switch, Tabs, SegmentedControl) are `rounded-full` with `h-11` (44px) and soft `#F6F7F9` surface.
- Base UI v1.9 uses `render={<Button />}` (NEVER Radix `asChild`).
- Import directly per file: `@/components/ui/button`, `@/components/blocks/status-card`, `@/lib/tokens`.
- Wrap app root with `<TooltipProvider>` and `<ToastProvider>`.
- Never add `backdrop-blur` to Dialog/Drawer backdrops; never apply press scaling to popup triggers or Tiles.
```

### 方式 C：配合 shadcn MCP Server 自动检索 Registry

只要在目标项目的 `components.json` 中注册了 `@glaze` 命名空间：

```json
{
  "registries": {
    "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
  }
}
```

配置了官方 `shadcn` MCP Server 的 AI Agent 即可自动调用 `search_items_in_registries`、`view_items_in_registries` 与 `get_add_command_for_items`，直接搜索 `@glaze` 中的 58 个组件、112 张卡片与 6 个 Demo 并一键安装。

### 方式 D：文档页一键「复制为 Markdown」

在文档站任意组件页面顶部点击 **「复制 Markdown」** 或 **「查看 Registry JSON」**，即可直接粘贴给任意对话框式 LLM，获得 100% 准确的最新 Props API 与安装命令。

---

## 2. 常见 AI 生成错误与修正对照表

| 常见错误（不要这样做） | 正确做法（Glaze 标准） |
| --- | --- |
| `<DialogTrigger asChild><Button>打开</Button></DialogTrigger>` | `<Dialog trigger={<Button>打开</Button>} title="标题">...</Dialog>` |
| 给卡片加 `border border-gray-200 shadow-sm rounded-xl` | 使用 `<Tile tone="white" size="s">`（28px 圆角、无描边无阴影） |
| `import { Plus } from 'lucide-react'` | `import { Plus } from '@phosphor-icons/react'` |
| `import { cn } from '@/lib/utils'` | `import { cn } from 'cn'`（Glaze 使用 `shadcn-ui/cn`） |
| `import { Button, Input } from '@/components/ui'` | `import { Button } from '@/components/ui/button'` 分文件导入 |
| 在 `Dialog` 遮罩加 `backdrop-blur-md` | 保持纯色半透明 `bg-[#1B1F27]/38`，零模糊开销 |
| 在 4 列栅格中手工写 `grid-cols-4` 与 `col-span-2` | 使用 `<Grid>` + `<Tile size="s" \| "w" \| "t" \| "l" \| "f">` |
| 忘记注册通知上下文直接调用 `useToast()` | 在应用根部包裹 `<ToastProvider>` 与 `<TooltipProvider>` |

---

## 3. 典型页面生成工作流（推荐给 Agent 的 4 步法）

1. **规划布局**：确定页面主题与所需信息密度，使用 4 列 dense `<Grid>` 规划 `S / W / T / L / F` 卡片组合（保持 60% 白卡 + 30% 柔彩 + ≤10% 深色聚焦卡）。
2. **检索现有卡片**：优先查阅 `public/llms/blocks.md`（112 种业务卡片），尽量复用现成卡片而非手写重复布局。
3. **CLI 安装依赖**：通过 `npx shadcn@latest add @glaze/<card-or-component>` 一次性拉齐所需卡片与底层 UI 原语。
4. **组合交互**：使用 `Dialog` / `Drawer` / `Select` / `Toast`（`useToast()`）为页面补充创建、筛选与反馈闭环。
