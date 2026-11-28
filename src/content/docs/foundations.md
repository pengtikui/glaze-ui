---
title: 设计规范与动效
navLabel: 设计规范
description: 色板、字体、圆角、4 列栅格与纯 CSS 动效基线。
order: 3
interactiveWidget: foundations
---

## 核心红线

1. **画布与卡片**：画布固定 `#F2F4F8`；`<Tile>` 禁止添加 `border` 与 `shadow-*`。
2. **圆角分层**：单行控件 `rounded-full`（`h-11` / `#F6F7F9`）；内嵌块 `18px`；浮层 `20px`；卡片与弹窗 `28px`。
3. **色彩比例**：仪表盘推荐 60% 白卡 + 30% 柔彩 + 10% 深色聚焦卡（每页 1–2 张）。
4. **动效约束**：遮罩禁用 `backdrop-blur`；按压缩放（`0.97`）仅用于独立按钮，不用于浮层触发器与卡片。

```tsx
import { HUE_PALETTES, TILE_THEMES, SEMANTIC_TOKENS, DATAVIZ_PALETTES } from '@/lib/tokens'
import { DURATION, EASE_STANDARD, PRESS_CLASS } from '@/lib/motion'
```

## Token 与交互示例
