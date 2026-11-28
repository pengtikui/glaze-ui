# CLAUDE.md

This repository is **Glaze（釉）Design System** — a shadcn Registry + Documentation Site built on **Base UI 1.9 (`@base-ui/react`)**, **Tailwind CSS v4**, **Recharts v3**, and **Phosphor Icons (`@phosphor-icons/react`)**.

Read [AGENTS.md](./AGENTS.md) for the complete architecture, strict design rules, and workflow instructions.

## Key Commands

- `pnpm run build:registry` — Regenerate `registry.json`, `public/r/*.json`, `src/docs/generated/{components,cards,blocks,pages}-api.json`, `public/llms.txt`, `public/llms-full.txt`, and `public/llms/*.md`.
- `pnpm run typecheck` — Run `astro sync`, `astro check`, and `tsc --noEmit` across `src/` and `registry/`.
- `pnpm run build` — Run `build:registry` + `astro build`.
- `pnpm dev` — Start the Astro docs site (`http://localhost:4321`).

## Critical Rules

1. **Source of truth**: All publishable artifacts live in `registry/glaze/{styles,lib,ui,cards,blocks,pages}/`. Never duplicate registry code inside `src/`.
2. **Direct imports**: Always import from `@/components/ui/<slug>`, `@/components/cards/<slug>`, `@/components/blocks/<slug>`, `@/lib/tokens`, `@/lib/motion` (never barrel imports inside `registry/`).
3. **Base UI v1.9 only**: Never use Radix `asChild`; use Base UI `render` prop or Glaze's `trigger` prop.
4. **Glaze aesthetics**: `#F2F4F8` canvas, borderless & shadowless `<Tile>` cards, `rounded-full` `44px` single-line controls, no `backdrop-blur` on modal/drawer backdrops.
5. **Standalone previews**: `/view/cards/:slug`, `/view/blocks/:slug`, and `/view/pages/:slug` render outside the docs site layout shell.
