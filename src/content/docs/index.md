---
title: 简介
navLabel: 简介
description: 基于 Base UI 1.9、Tailwind CSS v4 与 Recharts v3 的无障碍设计系统与 shadcn Registry。
order: 1
---

## 概览

**Glaze（釉）** 是一套面向现代控制台、效率应用与数据仪表盘的无障碍 React 19 设计系统，完全遵循 **shadcn Custom Registry** 规范分发，包含：

- **58 个单文件 UI 与图表组件**：39 个 `@base-ui/react` v1.9 交互原语 + 9 个 Glaze 布局与设计原语 + 10 个 Recharts v3 自适应主题图表。
- **112 张业务卡片（Blocks）**：按 `S / W / T / L / F` 五种尺寸与 7 大业务域分类，全部支持单卡按需安装与独立预览。
- **6 个独立业务 Demo**：覆盖 HomeLab、Workspace、Smart Home、Analytics、Personal OS 与 Cloud Ops，注册在 `/view/demos/:slug` 全屏路由。
- **AI Agent 友好文档体系**：随构建自动产出 `public/llms.txt`、`public/llms-full.txt` 与 62 份组件/专题 Markdown 文档。

## 核心规范

| 维度 | 规范要点 |
| --- | --- |
| **画布与卡片** | 页面画布固定 `#F2F4F8`；`<Tile>` 卡片无描边、无投影、统一 `28px` 圆角（`rounded-tile`）。 |
| **单行控件** | 所有单行控件采用 `rounded-full` 全圆胶囊、标准 `44px` (`h-11`) 高度与柔灰底色 `#F6F7F9`。 |
| **底层原语** | 底层基于 `@base-ui/react` v1.9，组合触发器使用 `render` 或 Glaze `trigger` 属性，**不使用 Radix `asChild`**。 |
| **图标与工具** | 统一从 `@phosphor-icons/react` 导入图标，类名合并使用 `import { cn } from 'cn'`。 |
| **分发与 AI** | 179 项 shadcn Registry 产物默认经 GitHub Raw 分发，零配置即可配合 `shadcn@latest add` 与 MCP 使用。 |

## 目录结构

```text
├── AGENTS.md                   # AI Coding Agent 核心规范
├── components.json             # shadcn CLI 配置
├── registry.json               # shadcn Registry 根清单 (179 items)
├── registry/glaze/             # 单一事实来源 (Source of Truth)
│   ├── styles/glaze.css        # 样式变量、4 列 dense 栅格与纯 CSS 动效
│   ├── lib/{tokens,motion}.ts  # 色板、语义状态、动效与表面预设
│   ├── ui/*.tsx                # 58 个单文件 UI 与图表组件
│   ├── blocks/*.tsx            # 112 个单文件业务卡片
│   └── demos/*.tsx             # 6 个完整业务 Demo 页面
├── public/
│   ├── r/*.json                # 180 个静态 Registry JSON 产物
│   └── llms*.txt               # AI Agent 机器可读索引
└── src/
    ├── content/docs/*.md       # Markdown 文档源文件（Astro Content Collections）
    ├── pages/                  # Astro 静态路由与 /view/* 独立画布
    └── docs/                   # 交互式预览、组件示例与目录数据
```

## 快速导航

- 前往 [安装与 Registry](/docs/installation) 配置 `components.json` 并拉取基础样式。
- 查阅 [设计规范与动效](/docs/foundations) 复制 9×6 色板与测试响应式栅格。
- 浏览 [组件目录 (58)](/docs/components)、[业务卡片 (112)](/blocks) 与 [示例 Demo (6)](/demos)。
