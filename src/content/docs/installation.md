---
title: 安装与 Registry
navLabel: 安装与 Registry
description: 通过 shadcn CLI 安装 Glaze 样式、组件、卡片、Blocks 与页面。
order: 2
---

## 1. 配置 `components.json`

注册 `@glaze` 命名空间（默认直连 GitHub Raw，无需额外托管）：

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

## 2. 安装基础样式

```bash
npx shadcn@latest add @glaze/style
```

在应用入口引入样式：

```tsx
import './styles/glaze.css'
```

## 3. 挂载 Providers

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

## 4. 按需安装

```bash
# 基础组件
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/calendar @glaze/data-table

# 专用卡片
npx shadcn@latest add @glaze/status-card @glaze/metric-card @glaze/area-trend-card

# 通用 Blocks
npx shadcn@latest add @glaze/auth-login-block @glaze/data-management-block

# 完整页面
npx shadcn@latest add @glaze/page-mail-desk
```

## 5. 最小示例

```tsx
import { Grid } from '@/components/ui/grid'
import { StatusCard } from '@/components/cards/status-card'
import { MetricCard } from '@/components/cards/metric-card'
import { AreaTrendCard } from '@/components/cards/area-trend-card'

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

详见 [Registry 发布](/docs/registry-publishing)：

```bash
REGISTRY_BASE_URL=https://ui.example.com pnpm run build
```
