---
title: Registry 发布与托管
navLabel: Registry 发布
description: 编译 179 项静态 shadcn Registry JSON 产物，并支持 GitHub Raw 默认分发或自托管静态域名部署。
order: 5
---

## 产物结构

运行 `pnpm run build:registry` 后，会自动从 `registry/glaze/` 编译生成全部静态分发文件：

- `registry.json`（仓库根目录，符合 `https://ui.shadcn.com/schema/registry.json`）
- `public/r/registry.json`（对外静态托管的索引清单）
- `public/r/<name>.json`（共 179 个独立 item JSON）：
  - `style.json`、`tokens.json`、`motion.json`（核心样式、色板与动效预设）
  - 58 个 `registry:ui` 组件与 Recharts 图表
  - 112 个 `registry:block` 独立业务卡片
  - 6 个 `registry:block` 整页 Demo

## 默认 GitHub Raw 分发

由于 `public/r/*.json` 已随仓库提交到 [`github.com/pengtikui/glaze-ui`](https://github.com/pengtikui/glaze-ui)，用户无需等待自定义域名即可直接在 `components.json` 中指向 GitHub Raw 地址：

```json
{
  "registries": {
    "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
  }
}
```

## 自定义托管域名

如需将文档站与 Registry 一并托管到 Vercel、Cloudflare Pages、Netlify、GitHub Pages 或自建 Nginx，可通过环境变量覆盖基础地址：

```bash
# 1. 命名空间模式（推荐，配合 components.json 的 registries 字段）
REGISTRY_BASE_URL=https://ui.your-company.com pnpm run build

# 2. 直链模式（用户无需配置 components.json，直接传完整 JSON URL 安装）
REGISTRY_BASE_URL=https://ui.your-company.com REGISTRY_DEP_MODE=url pnpm run build
```

使用直链模式构建后，用户可直接执行：

```bash
npx shadcn@latest add https://ui.your-company.com/r/button.json
```

## 部署注意事项

Astro 会将全部文档页、58 个组件页、6 个独立 Demo 路由（`/view/demos/*`）与 112 个单卡片预览路由（`/view/blocks/*`）编译为纯静态 HTML 文件输出到 `dist/`：

1. 确保 `/r/*.json` 返回 `application/json` 且允许跨域访问（主流静态托管默认开启）。
2. 确保 `/llms.txt`、`/llms-full.txt` 与 `/llms/**/*.md` 可直接静态访问。
3. 本仓库根目录已包含 `wrangler.jsonc`，可直接部署 `dist/` 到 Cloudflare Workers Assets / Pages。
