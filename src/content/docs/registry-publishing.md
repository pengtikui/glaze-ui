---
title: Registry 发布
navLabel: Registry 发布
description: 编译 230 项静态 Registry JSON，支持 GitHub Raw 与自托管部署。
order: 5
---

## 构建产物

执行 `pnpm run build:registry` 生成以下静态文件：

- `registry.json` 与 `public/r/registry.json`：根索引清单
- `public/r/<name>.json`：230 项独立 JSON（4 核心 + 82 组件 + 119 卡片 + 10 Blocks + 15 页面）
- `public/llms.txt`、`public/llms-full.txt` 与 `public/llms/*.md`：AI 检索索引

## 默认分发（GitHub Raw）

```json
{
  "registries": {
    "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
  }
}
```

## 自托管域名

```bash
# 命名空间模式（推荐）
REGISTRY_BASE_URL=https://ui.your-company.com pnpm run build

# 直链模式（无需配置 components.json）
REGISTRY_BASE_URL=https://ui.your-company.com REGISTRY_DEP_MODE=url pnpm run build
```

直链模式安装示例：

```bash
npx shadcn@latest add https://ui.your-company.com/r/button.json
```

## 部署要点

`pnpm run build` 将文档站与所有独立预览路由（`/view/{cards,blocks,pages}/*`）编译为纯静态产物至 `dist/`：

1. `/r/*.json` 需返回 `application/json` 并允许跨域。
2. `/llms.txt`、`/llms-full.txt` 与 `/llms/**/*.md` 保持静态可访问。
3. 根目录已包含 `wrangler.jsonc`，可直接部署至 Cloudflare Pages / Workers Assets。
