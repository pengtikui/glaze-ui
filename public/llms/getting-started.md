# Glaze UI — Getting Started & Registry Setup

Glaze is an accessible React 19 design system built on **Base UI 1.9** (`@base-ui/react`), **Tailwind CSS v4**, **Recharts v3**, **Phosphor Icons** (`@phosphor-icons/react`), and **shadcn/ui Registry**.

## 1. Configure `components.json`

Add the `@glaze` registry namespace to your project's `components.json`:

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

## 2. Install Base Style & Tokens

```bash
npx shadcn@latest add @glaze/style
```

Import the generated stylesheet in your app entry (e.g., `src/main.tsx`):

```tsx
import './styles/glaze.css'
```

Wrap your app root with `TooltipProvider` and `ToastProvider` (plus optional `IconContext.Provider` from `@phosphor-icons/react`):

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

## 3. Install Components, Cards, Blocks, or Full Pages

```bash
# Install UI primitives & charts (82 available)
npx shadcn@latest add @glaze/button @glaze/dialog @glaze/calendar @glaze/data-table

# Install Bento business cards (119 available)
npx shadcn@latest add @glaze/status-card @glaze/area-trend-card @glaze/data-table-card

# Install reusable composite Blocks (10 available)
npx shadcn@latest add @glaze/auth-login-block @glaze/data-management-block @glaze/calendar-booking-block

# Install a complete application Page (15 available)
npx shadcn@latest add @glaze/page-mail-desk
```
