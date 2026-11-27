# Glaze shadcn Registry 发布与托管指南

Glaze 完全遵循 [shadcn/ui Custom Registry](https://ui.shadcn.com/docs/registry) 规范，所有组件、设计 Token、112 张业务卡片与 6 个完整 Demo 页面均编译为静态 JSON 文件输出到 `public/r/`。

---

## 1. Registry 产物结构

运行 `pnpm run build:registry` 后，会自动生成：

- `registry.json`（仓库根目录，符合 `https://ui.shadcn.com/schema/registry.json`）
- `public/r/registry.json`（对外静态托管的索引清单）
- `public/r/<name>.json`（共 179 个独立 item JSON，符合 `https://ui.shadcn.com/schema/registry-item.json`）：
  - `style.json` (`registry:style`)：包含 `glaze.css`、Tailwind v4 `cssVars` 与核心 `.glaze-grid` CSS 规则
  - `tokens.json` (`registry:lib`)：`lib/tokens.ts`
  - `motion.json` (`registry:lib`)：`lib/motion.ts`
  - 58 个 `registry:ui`：`button.json`、`dialog.json`、`bar-chart.json` 等
  - 112 个 `registry:block`：`status-card.json`、`area-trend-card.json`、`data-table-card.json` 等
  - 6 个 `registry:block` 整页示例：`demo-homelab.json` ~ `demo-cloud-ops.json`

---

## 2. 默认 GitHub Raw 分发与自定义托管域名

默认情况下，`public/r/*.json` 已随仓库提交到 GitHub（[`github.com/pengtikui/glaze-ui`](https://github.com/pengtikui/glaze-ui)），用户无需等待自定义域名即可直接通过 GitHub Raw 地址安装：

```text
https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json
```

如果你希望部署到自己的静态域名，构建时可通过环境变量指定实际部署域名与依赖引用模式：

```bash
# 使用 @glaze/<name> 命名空间依赖（默认，推荐搭配 components.json 的 registries 字段）
REGISTRY_BASE_URL=https://ui.your-company.com pnpm run build

# 如果希望用户无需配置 components.json 直接通过完整 URL 安装：
REGISTRY_BASE_URL=https://ui.your-company.com REGISTRY_DEP_MODE=url pnpm run build
```

部署 `dist/` 到任意静态托管平台（Vercel、Cloudflare Pages、Netlify、GitHub Pages、Nginx）后，确保：
1. `/r/*.json` 返回 `application/json` 且允许 CORS（静态托管默认支持）。
2. `/llms.txt`、`/llms-full.txt`、`/llms/**/*.md` 可直接静态访问。
3. SPA 路由（如 `/docs/components/button`、`/view/demos/homelab`）回退到 `index.html`。

---

## 3. 用户端安装方式

### 方式一：命名空间安装（推荐）

在目标项目 `components.json` 中添加（如已自托管，替换为你的自定义域名 `https://ui.your-company.com/r/{name}.json`）：

```json
{
  "registries": {
    "@glaze": "https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/{name}.json"
  }
}
```

然后执行：

```bash
npx shadcn@latest add @glaze/style
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/status-card
```

### 方式二：直接 URL 安装（零配置）

使用 `REGISTRY_DEP_MODE=url` 构建后，用户可直接执行：

```bash
npx shadcn@latest add https://raw.githubusercontent.com/pengtikui/glaze-ui/main/public/r/button.json
```
