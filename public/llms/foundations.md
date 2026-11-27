# Glaze Design Foundations & Strict Rules for AI Agents

## Canvas & Card Rules (CRITICAL)
- Page canvas background MUST be `#F2F4F8` (`--glaze-canvas`).
- Cards (`<Tile>`) have **NO border and NO box-shadow** on the canvas; elevation is created purely by surface contrast (white `#FFFFFF` or pastel tone against `#F2F4F8`).
- Border radius scale:
  - `rounded-tile` (`28px`): `Tile`, `Dialog`, `Drawer`
  - `rounded-overlay` (`20px`): floating popups (`Menu`, `Select`, `Popover`, `Combobox`, `ContextMenu`, `Toast`)
  - `rounded-inner` (`18px`): multiline & nested surfaces (`Textarea`, `Fieldset`, `Accordion`, `Collapsible`)
  - `rounded-full`: ALL single-line controls (`Button`, `Input`, `Select`, `Combobox`, `Autocomplete`, `NumberField`, `Switch`, `Toggle`, `Tabs`, `SegmentedControl`, `Menubar`, `Toolbar`) at standard `44px` height (`h-11`), soft background `#F6F7F9`, borderless by default.

## Color Tokens
- **9 Pastel Hue Families** (`Hue`): `sky`, `mint`, `peach`, `lilac`, `rose`, `lemon`, `aqua`, `periwinkle`, `coral` — each with 6 shades: `50, 100, 300, 500, 700, 900`.
- **14 Tile Tones** (`TileTone`): `white` + 9 pastel hues + 4 dark focus tones (`sky-dark`, `lilac-dark`, `aqua-dark`, `ink`).
- **5 Semantic Statuses** (`Status`): `normal` (mint), `warning` (peach), `error` (coral), `info` (sky), `disabled` (neutral).

## Base UI v1.9 Conventions (DO NOT USE RADIX PATTERNS)
- **NEVER** pass `asChild` (that is Radix UI). Base UI uses the `render` prop (e.g., `<BaseDialog.Trigger render={<Button>Open</Button>} />`) or Glaze's explicit `trigger={<Button>Open</Button>}` prop.
- Import directly from single component files: `@/components/ui/button`, `@/components/ui/tile`, `@/lib/tokens`, `@/lib/motion`.
- Utility class merger is `import { cn } from 'cn'` (`shadcn-ui/cn`).
- Icons come from `@phosphor-icons/react`.

## 4-Column Dense Bento Grid
- Use `<Grid>` (`.glaze-grid`: 4 cols desktop, 2 cols tablet, 1 col mobile, 16px gap, `grid-auto-flow: row dense`).
- Tile sizes:
  - `s` (1×1, min 200px)
  - `w` (2×1, min 200px)
  - `t` (1×2, min 416px)
  - `l` (2×2, min 416px)
  - `f` (full-width 4×auto)

## Motion Rules (CSS-First, GPU-Composited)
- NEVER use `backdrop-blur` on modal/drawer backdrops.
- `PRESS_SCALE` (`0.97`) is ONLY for standalone compact actions (`Button`, `Toggle`, `Checkbox`, `Radio`, `ToolbarButton`). NEVER scale popup triggers, `Select`, `Tabs`, `Switch`, or `Tile`.
- Duration tiers: Fast `150ms/120ms` (popups & press), Base `200ms/150ms` (tabs, switch, dialog, accordion), Emphasized `300ms/220ms` (drawer) & `360ms` (3D stacked toast).
