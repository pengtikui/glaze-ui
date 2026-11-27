---
title: 设计规范与动效
navLabel: 设计规范
description: 色板、字体、圆角、4 列密集栅格与纯 CSS GPU 合成动效规范（下方支持点击复制 HEX 与实时交互体验）。
order: 3
interactiveWidget: foundations
---

## 核心视觉红线

在编写或使用 AI 生成 Glaze 页面时，请始终遵守以下四条视觉与交互基线：

1. **画布与卡片层级**：画布固定为 `#F2F4F8`（`--glaze-canvas`）；`<Tile>` 卡片严禁添加 `border` 与 `shadow-*`，层级仅由底色反差建立。
2. **圆角体系分层**：单行控件统一 `rounded-full` + `44px` (`h-11`) 柔灰底 `#F6F7F9`；多行内嵌块 `18px`（`rounded-inner`）；弹出浮层 `20px`（`rounded-overlay`）；卡片与弹窗 `28px`（`rounded-tile`）。
3. **仪表盘色彩比例**：推荐 **60% 纯白卡 + 30% 柔彩卡 + 10% 深色聚焦卡（每页最多 1–2 张）**，避免满屏高饱和色块。
4. **纯 CSS 优先动效**：禁止在 `Dialog` / `Drawer` 遮罩使用 `backdrop-blur`；`PRESS_SCALE (0.97)` 仅限独立紧凑操作控件，严禁用于浮层触发器与卡片。

```tsx
import { HUE_PALETTES, TILE_THEMES, SEMANTIC_TOKENS, DATAVIZ_PALETTES } from '@/lib/tokens'
import { DURATION, EASE_STANDARD, PRESS_CLASS } from '@/lib/motion'
```

## 交互式 Token 与动效规范
