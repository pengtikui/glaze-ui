# AiArtifact (产物预览、文件树与检查点)

> 提供预览/源码双态切换的 AI 产物面板 AiArtifact、带 A/M/D 变更标记的目录树 AiFileTree 与对话回溯节点 AiCheckpoint。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/ai-artifact
```

- **Registry JSON**: `/r/ai-artifact.json`
- **Import Path**: `@/components/ui/ai-artifact`
- **Exports**: `AiArtifact`, `AiFileTree`, `AiCheckpoint`
- **NPM Dependencies**: `@phosphor-icons/react`, `cn`
- **Registry Dependencies**: `@glaze/motion`, `@glaze/segmented-control`, `@glaze/style`, `@glaze/tokens`

## API Reference

### AiArtifact

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | — |
| `subtitle?` | `string` | — | — |
| `badge?` | `string` | — | — |
| `hue?` | `Hue` | `'periwinkle'` | — |
| `preview?` | `React.ReactNode` | — | Dual-mode view: interactive preview and raw source code |
| `code?` | `React.ReactNode` | — | — |
| `copyText?` | `string` | — | — |
| `defaultView?` | `'preview' \| 'code'` | `'preview'` | — |
| `extraActions?` | `React.ReactNode` | — | — |

### AiFileTree

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `nodes` | `AiFileTreeNode[]` | — | — |
| `selectedPath?` | `string` | — | — |
| `onSelectPath?` | `(path: string) => void` | — | — |
| `defaultExpanded?` | `string[]` | `[]` | — |

### AiCheckpoint

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label?` | `string` | `'检查点已保存'` | — |
| `timestamp?` | `string` | — | — |
| `onRestore?` | `() => void` | — | — |
| `restoreLabel?` | `string` | `'回溯到此节点'` | — |

### Supporting Types

#### `AiFileTreeNode`

| Property | Type | Required |
| --- | --- | --- |
| `path` | `string` | Yes |
| `name` | `string` | Yes |
| `type` | `'file' \| 'folder'` | Yes |
| `status` | `'added' \| 'modified' \| 'deleted'` | No |
| `children` | `AiFileTreeNode[]` | No |

### CSS Variables

- `--radius-tile`
- `--radius-inner`

## Source Code

```tsx
import * as React from 'react'
import {
  ArrowCounterClockwise,
  CaretRight,
  Check,
  Copy,
  FileCode,
  FlagBanner,
  Folder,
  FolderOpen,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { HUE_PALETTES, SEMANTIC_TOKENS, type Hue } from '@/lib/tokens'
import { PRESS_CLASS } from '@/lib/motion'

export interface AiArtifactProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  badge?: string
  hue?: Hue
  /** Dual-mode view: interactive preview and raw source code */
  preview?: React.ReactNode
  code?: React.ReactNode
  copyText?: string
  defaultView?: 'preview' | 'code'
  extraActions?: React.ReactNode
}

export function AiArtifact({
  title,
  subtitle,
  badge,
  hue = 'periwinkle',
  preview,
  code,
  copyText,
  defaultView = 'preview',
  extraActions,
  className,
  children,
  ...props
}: AiArtifactProps) {
  const [view, setView] = React.useState<'preview' | 'code'>(
    preview ? defaultView : 'code',
  )
  const [copied, setCopied] = React.useState(false)
  const palette = HUE_PALETTES[hue]
  const hasToggle = Boolean(preview && code)

  const handleCopy = () => {
    if (copyText) navigator.clipboard?.writeText(copyText).catch(() => {})
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={cn('flex w-full flex-col overflow-hidden rounded-tile bg-white', className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EEF0F3] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: palette[100], color: palette[700] }}
          >
            <FileCode size={16} weight="duotone" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-glaze-display text-[14px] font-extrabold text-[#1B1F27]">
                {title}
              </span>
              {badge && (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 font-glaze-mono text-[10.5px] font-bold"
                  style={{ backgroundColor: palette[50], color: palette[700] }}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <div className="truncate text-[11.5px] text-[#6B7280]">{subtitle}</div>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {hasToggle && (
            <SegmentedControl
              size="sm"
              value={view}
              onValueChange={setView}
              options={[
                { value: 'preview', label: '预览' },
                { value: 'code', label: '源码' },
              ]}
            />
          )}
          {copyText && (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'inline-flex h-8 cursor-pointer items-center gap-1 rounded-full bg-[#F2F3F5] px-3 text-[12px] font-semibold text-[#1B1F27] hover:bg-[#E8EBF0]',
                PRESS_CLASS,
              )}
            >
              {copied ? <Check size={13} weight="bold" /> : <Copy size={13} />}
              <span>{copied ? '已复制' : '复制'}</span>
            </button>
          )}
          {extraActions}
        </div>
      </div>

      <div className="min-h-0 flex-1 p-4">
        {hasToggle ? (view === 'preview' ? preview : code) : (preview ?? code ?? children)}
      </div>
    </div>
  )
}

export interface AiFileTreeNode {
  path: string
  name: string
  type: 'file' | 'folder'
  status?: 'added' | 'modified' | 'deleted'
  children?: AiFileTreeNode[]
}

export interface AiFileTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: AiFileTreeNode[]
  selectedPath?: string
  onSelectPath?: (path: string) => void
  defaultExpanded?: string[]
}

export function AiFileTree({
  nodes,
  selectedPath,
  onSelectPath,
  defaultExpanded = [],
  className,
  ...props
}: AiFileTreeProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set(defaultExpanded))

  const toggle = (p: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  const renderNode = (node: AiFileTreeNode, depth: number) => {
    const isFolder = node.type === 'folder'
    const isOpen = expanded.has(node.path)
    const isSelected = selectedPath === node.path
    const statusBadge =
      node.status === 'added'
        ? { label: 'A', color: SEMANTIC_TOKENS.normal.ink, bg: SEMANTIC_TOKENS.normal.pillBg }
        : node.status === 'modified'
          ? { label: 'M', color: SEMANTIC_TOKENS.warning.ink, bg: SEMANTIC_TOKENS.warning.pillBg }
          : node.status === 'deleted'
            ? { label: 'D', color: SEMANTIC_TOKENS.error.ink, bg: SEMANTIC_TOKENS.error.pillBg }
            : null

    return (
      <div key={node.path}>
        <button
          type="button"
          onClick={() => (isFolder ? toggle(node.path) : onSelectPath?.(node.path))}
          style={{ paddingLeft: 10 + depth * 14 }}
          className={cn(
            'flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] py-1.5 pr-2.5 text-left text-[12.5px] transition-colors outline-none',
            isSelected
              ? 'bg-[#E4E6FD] font-bold text-[#262B7A]'
              : 'font-medium text-[#1B1F27] hover:bg-white',
          )}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            {isFolder ? (
              <>
                <CaretRight
                  size={11}
                  weight="bold"
                  className={cn(
                    'shrink-0 text-[#8A90A0] transition-transform duration-150',
                    isOpen && 'rotate-90',
                  )}
                />
                {isOpen ? (
                  <FolderOpen size={14} weight="duotone" className="shrink-0 text-[#4A9BD8]" />
                ) : (
                  <Folder size={14} weight="duotone" className="shrink-0 text-[#4A9BD8]" />
                )}
              </>
            ) : (
              <>
                <span className="w-[11px] shrink-0" />
                <FileCode size={14} weight="duotone" className="shrink-0 text-[#7B80EA]" />
              </>
            )}
            <span className="truncate font-glaze-mono">{node.name}</span>
          </span>
          {statusBadge && (
            <span
              className="shrink-0 rounded-full px-1.5 py-0.5 font-glaze-mono text-[10px] font-bold"
              style={{ backgroundColor: statusBadge.bg, color: statusBadge.color }}
            >
              {statusBadge.label}
            </span>
          )}
        </button>
        {isFolder && isOpen && node.children?.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div
      className={cn('flex w-full flex-col gap-0.5 rounded-inner bg-[#F6F7F9] p-2', className)}
      {...props}
    >
      {nodes.map((n) => renderNode(n, 0))}
    </div>
  )
}

export interface AiCheckpointProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  timestamp?: string
  onRestore?: () => void
  restoreLabel?: string
}

export function AiCheckpoint({
  label = '检查点已保存',
  timestamp,
  onRestore,
  restoreLabel = '回溯到此节点',
  className,
  ...props
}: AiCheckpointProps) {
  return (
    <div className={cn('flex w-full items-center gap-3 py-1', className)} {...props}>
      <span className="h-px flex-1 bg-[#E8EBF0]" />
      <div className="flex items-center gap-2 rounded-full bg-[#F6F7F9] py-1 pr-2 pl-3 text-[11.5px] font-semibold text-[#5B6170]">
        <FlagBanner size={13} weight="duotone" className="text-[#4A4FB8]" />
        <span>{label}</span>
        {timestamp && <span className="font-glaze-mono text-[10.5px] text-[#8A90A0]">{timestamp}</span>}
        {onRestore && (
          <button
            type="button"
            onClick={onRestore}
            className={cn(
              'ml-1 inline-flex cursor-pointer items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#123A5C] hover:bg-[#E4E6FD] hover:text-[#262B7A]',
              PRESS_CLASS,
            )}
          >
            <ArrowCounterClockwise size={11} weight="bold" />
            <span>{restoreLabel}</span>
          </button>
        )}
      </div>
      <span className="h-px flex-1 bg-[#E8EBF0]" />
    </div>
  )
}
```
