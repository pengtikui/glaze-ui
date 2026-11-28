---
title: AI Agent 指南
navLabel: AI Agent
description: 机器可读索引、规则片段与 shadcn MCP 配置。
order: 4
interactiveWidget: ai-endpoints
---

## 索引端点

| 文件 | URL（GitHub Raw） | 内容 |
| --- | --- | --- |
| `llms.txt` | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms.txt` | 目录索引 |
| `llms-full.txt` | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms-full.txt` | 规范、目录与全部组件 API |
| `registry.json` | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/registry.json` | 230 项 Registry 清单 |
| `cards.md` | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/cards.md` | 119 张卡片索引 |
| `blocks.md` | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/blocks.md` | 10 个 Blocks 索引 |
| `pages.md` | `https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/llms/pages.md` | 15 个页面索引 |

## 规则片段

直接复制根目录 `AGENTS.md`，或将以下精简规则加入 `.cursor/rules/glaze.mdc` / `CLAUDE.md`：

```markdown
# Glaze Design System (Base UI 1.9 + Tailwind v4 + Recharts v3)
- Registry: "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
- Init: npx shadcn@latest add @glaze/style
- Add: npx shadcn@latest add @glaze/<slug>
- Docs: /llms.txt, /llms-full.txt, /llms/components/<slug>.md
- Visual:
  1. Canvas #F2F4F8. <Tile> cards: NO border, NO shadow.
  2. Single-line controls: rounded-full, h-11, bg #F6F7F9.
  3. Radii: Tile/Dialog/Drawer 28px, Popups 20px, Multiline/Accordion 18px.
  4. Tokens from @/lib/tokens.
- Code:
  1. Base UI 1.9: use `render={<Button />}` or `trigger`. NEVER `asChild`.
  2. Direct imports: `@/components/ui/<slug>`, `@/components/cards/<slug>`, `@/components/blocks/<slug>`.
  3. Icons: `@phosphor-icons/react`. Class merge: `import { cn } from 'cn'`.
  4. No `backdrop-blur` on backdrops. Root providers: `<TooltipProvider>` + `<ToastProvider>`.
```

## shadcn MCP

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

## 常见误区

| 避免 | 正确 |
| --- | --- |
| `<DialogTrigger asChild><Button /></DialogTrigger>` | `<Dialog trigger={<Button />} title="..." />` |
| `className="rounded-xl border shadow-sm bg-white"` | `<Tile tone="white" size="s">` |
| `import { Plus } from 'lucide-react'` | `import { Plus } from '@phosphor-icons/react'` |
| `import { cn } from '@/lib/utils'` | `import { cn } from 'cn'` |
| `import { Button } from '@/components/ui'` | `import { Button } from '@/components/ui/button'` |
| `bg-black/40 backdrop-blur-md` | `bg-[#1B1F27]/38` |
