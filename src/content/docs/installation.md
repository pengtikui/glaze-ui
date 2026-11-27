---
title: 安装与 Registry
navLabel: 安装与 Registry
description: 通过 shadcn CLI 与 @glaze 命名空间按需安装组件、业务卡片与完整 Demo 页面。
order: 2
---

## 1. 配置 `components.json`

在目标项目根目录的 `components.json` 中注册 `@glaze` 命名空间。默认直接通过 GitHub Raw（`github.com/pengtikui/glaze-ui`）拉取静态 JSON，无需额外部署：

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

## 2. 安装基础样式与 Token

首次接入必须先安装 `@glaze/style`，它会自动同步 `glaze.css`、Tailwind v4 主题变量、色板 Token 与动效预设：

```bash
npx shadcn@latest add @glaze/style
```

随后在应用入口（例如 `src/main.tsx`）中引入生成的样式表：

```tsx
import './styles/glaze.css'
```

## 3. 挂载根部 Providers

Glaze 的提示框与 3D 堆叠通知依赖应用根部的 `TooltipProvider` 与 `ToastProvider`（建议同时挂载 Phosphor `IconContext.Provider`）：

```tsx
import { IconContext } from '@phosphor-icons/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToastProvider } from '@/components/ui/toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: 'regular' }}>
      <TooltipProvider delay={160}>
        <ToastProvider>{children}</ToastProvider>
      </TooltipProvider>
    </IconContext.Provider>
  )
}
```

## 4. 按需安装组件、卡片或 Demo

所有 58 个 UI 组件、112 张业务卡片与 6 个完整 Demo 均可按 kebab-case 名称独立安装并自动补齐依赖：

```bash
# 安装基础 UI 原语与图表组件
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/select @glaze/area-chart

# 按需安装单张业务卡片
npx shadcn@latest add @glaze/status-card @glaze/metric-card @glaze/area-trend-card

# 安装完整业务 Demo 页面
npx shadcn@latest add @glaze/demo-homelab
```

## 5. 最小页面示例

```tsx
import { Grid } from '@/components/ui/grid'
import { StatusCard } from '@/components/blocks/status-card'
import { MetricCard } from '@/components/blocks/metric-card'
import { AreaTrendCard } from '@/components/blocks/area-trend-card'

export function DashboardExample() {
  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <main className="mx-auto flex max-w-312 flex-col gap-8 px-6 py-10">
        <Grid>
          <StatusCard label="核心集群" statusText="运行正常" description="14/14 节点在线" tone="mint" />
          <MetricCard label="今日请求" value="1.28" unit="M" tone="sky" />
          <AreaTrendCard
            title="实时吞吐"
            summary="48.2 k/s"
            points={[32, 38, 41, 45, 48, 52]}
            axisLabels={['00:00', '06:00', '12:00']}
          />
        </Grid>
      </main>
    </div>
  )
}
```

## 6. 自托管构建

如需将 Registry 与文档站部署到企业内网或自定义域名，构建时传入 `REGISTRY_BASE_URL` 即可（详见 [Registry 发布与托管](/docs/registry-publishing)）：

```bash
# 命名空间模式（推荐）
REGISTRY_BASE_URL=https://ui.example.com pnpm run build

# 零配置直链模式
REGISTRY_BASE_URL=https://ui.example.com REGISTRY_DEP_MODE=url pnpm run build
```
