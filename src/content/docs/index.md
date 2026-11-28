---
title: 简介
navLabel: 简介
description: 基于 Base UI 1.9、Tailwind CSS v4 与 Recharts v3 的无障碍设计系统。
order: 1
---

## 架构分层

| 层级 | 路径 | 数量 | 说明 |
| --- | --- | --- | --- |
| **组件** | `@/components/ui/*` | 82 | Base UI 1.9 原语、表单、表格、日历、分栏、图表、AI 与拓扑组件 |
| **卡片** | `@/components/cards/*` | 119 | 按 `S / W / T / L / F` 尺寸划分的 Bento 专用卡片（`/cards`） |
| **Blocks** | `@/components/blocks/*` | 10 | 组合组件与卡片封装的通用业务区块（`/blocks`） |
| **页面** | `@/components/pages/*` | 15 | 独立可运行的完整业务页面（`/pages`） |

## 设计约束

- **画布与卡片**：画布固定 `#F2F4F8`；`<Tile>` 卡片无描边、无阴影，圆角 `28px`。
- **单行控件**：统一 `rounded-full`、`h-11`（`44px`）、柔灰底 `#F6F7F9`。
- **Base UI 1.9**：组合触发器使用 `render` 或 `trigger`，不使用 Radix `asChild`。
- **依赖约定**：图标来自 `@phosphor-icons/react`，类名合并使用 `import { cn } from 'cn'`。

## 目录结构

```text
registry/glaze/
├── styles/glaze.css             # 主题变量、4 列栅格与纯 CSS 动效
├── lib/{tokens,motion,topology}.ts
├── ui/*.tsx                     # 82 个基础组件
├── cards/*.tsx                  # 119 张业务卡片
├── blocks/*.tsx                 # 10 个通用 Blocks
└── pages/*.tsx                  # 15 个完整页面
```

## 快速入口

- [安装与 Registry](/docs/installation) · [设计规范](/docs/foundations) · [AI Agent](/docs/ai-agent)
- [组件 (82)](/docs/components) · [卡片 (119)](/cards) · [Blocks (10)](/blocks) · [页面 (15)](/pages)
