---
title: AI Agent 使用指南
navLabel: AI Agent
description: 面向 Cursor、Claude Code、Antigravity 与 Codex 的机器可读索引、规则片段与 shadcn MCP 集成。
order: 4
interactiveWidget: ai-endpoints
---

## 文档端点

Glaze 遵循 [llmstxt.org](https://llmstxt.org/) 规范自动生成纯文本与 Markdown 索引，既可通过本地/自托管站点根路径访问，也可直接通过 GitHub Raw 拉取：

| 资源 | GitHub Raw URL | 说明 |
| --- | --- | --- |
| 轻量目录索引 | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms.txt` | 列出核心文档、58 组件、112 卡片与 6 Demo |
| 单文件完整参考 | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms-full.txt` | 包含安装、视觉红线、112 卡片表与 58 组件 API |
| Registry 清单 | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/registry.json` | 全部 179 项 shadcn Registry 元数据 |
| 按需单组件 MD | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/components/<slug>.md` | 单个组件的完整 Props 表格与源码 |

## AGENTS.md 规则片段

可将仓库根目录的 `AGENTS.md` 直接复制到目标项目，或粘贴以下精简规则到 `.cursor/rules/glaze.mdc` / `CLAUDE.md`：

```markdown
# Glaze Design System (Base UI 1.9 + Tailwind v4 + Recharts v3)
- Repo: https://github.com/pengtikui/glaze-ui
- Registry: "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json" in components.json
- Init: npx shadcn@latest add @glaze/style
- Add: npx shadcn@latest add @glaze/<slug>
- Docs:
  - https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms.txt
  - https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms-full.txt
  - https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/components/<slug>.md
- Visual:
  1. Canvas #F2F4F8. <Tile> cards: NO border, NO shadow.
  2. Single-line controls: rounded-full, h-11 (44px), bg #F6F7F9.
  3. Radii: Tile/Dialog/Drawer 28px, Popups 20px, Multiline/Accordion 18px.
  4. Tokens from @/lib/tokens (9 hues + 4 dark tones).
- Code:
  1. Base UI 1.9: use `render={<Button />}` or `trigger` prop. NEVER Radix `asChild`.
  2. Direct file imports: `@/components/ui/<slug>`, `@/components/blocks/<slug>`, `@/lib/tokens`.
  3. Icons: `@phosphor-icons/react`. Class merge: `import { cn } from 'cn'`.
  4. No `backdrop-blur` on backdrops. No press scale on popup triggers/Select/Tabs/Switch/Tile.
  5. Root providers: `<TooltipProvider>` + `<ToastProvider>`.
```

## shadcn MCP 配置

在目标项目配置好 `components.json` 的 `@glaze` 命名空间后，启用官方 `shadcn` MCP Server 即可让 AI Agent 直接检索并安装 Glaze 组件与卡片：

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

## 常见误区对照

| 避免（不要这样做） | 正确（Glaze 标准） |
| --- | --- |
| `<DialogTrigger asChild><Button /></DialogTrigger>` | `<Dialog trigger={<Button />} title="..." />` |
| `className="rounded-xl border shadow-sm bg-white"` | `<Tile tone="white" size="s">` |
| `import { Plus } from 'lucide-react'` | `import { Plus } from '@phosphor-icons/react'` |
| `import { cn } from '@/lib/utils'` | `import { cn } from 'cn'` |
| `import { Button } from '@/components/ui'` | `import { Button } from '@/components/ui/button'` |
| `bg-black/40 backdrop-blur-md` | `bg-[#1B1F27]/38` |
