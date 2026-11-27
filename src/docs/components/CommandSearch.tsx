import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import {
  ArrowRight,
  BookOpen,
  Cube,
  House,
  MagnifyingGlass,
  Robot,
  Stack,
  X,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { BLOCKS_LIST, COMPONENTS_LIST, DEMOS_LIST } from '@/docs/data/catalog'
import { useRouter } from '@/docs/router'

interface SearchItem {
  id: string
  group: '文档' | '组件' | '卡片' | 'Demo'
  title: string
  subtitle: string
  to: string
  keywords: string
  external?: boolean
}

const DOC_ITEMS: SearchItem[] = [
  { id: 'doc-intro', group: '文档', title: '简介 Introduction', subtitle: '了解 Glaze 设计系统架构与核心理念', to: '/docs', keywords: 'intro 简介 概述' },
  { id: 'doc-install', group: '文档', title: '安装与 Registry 配置', subtitle: '使用 shadcn CLI 与 @glaze 命名空间安装', to: '/docs/installation', keywords: 'install shadcn cli registry components.json' },
  { id: 'doc-foundations', group: '文档', title: '设计规范与动效 Foundations', subtitle: '色彩、排版、圆角、4 列栅格与纯 CSS 动效', to: '/docs/foundations', keywords: 'tokens colors typography motion grid 色彩 动效' },
  { id: 'doc-ai', group: '文档', title: 'AI Agent 使用指南', subtitle: 'AGENTS.md、llms.txt、llms-full.txt 与 MCP 配置', to: '/docs/ai-agent', keywords: 'ai agent llms.txt claude cursor mcp' },
  { id: 'doc-publish', group: '文档', title: 'Registry 发布与托管', subtitle: 'GitHub Raw 默认分发与自托管静态部署', to: '/docs/registry-publishing', keywords: 'publish deploy github raw self host 发布 托管' },
]

const ALL_SEARCH_ITEMS: SearchItem[] = [
  ...DOC_ITEMS,
  ...COMPONENTS_LIST.map((c) => ({
    id: `comp-${c.slug}`,
    group: '组件' as const,
    title: `${c.title} · ${c.cnTitle}`,
    subtitle: c.description,
    to: `/docs/components/${c.slug}`,
    keywords: `${c.slug} ${c.title} ${c.cnTitle} ${c.category} ${c.parts.join(' ')}`,
  })),
  ...DEMOS_LIST.map((d) => ({
    id: `demo-${d.slug}`,
    group: 'Demo' as const,
    title: `Demo ${d.index} · ${d.title}`,
    subtitle: `${d.enTitle} · 支持独立打开 /view/demos/${d.slug}`,
    to: `/view/demos/${d.slug}`,
    keywords: `${d.slug} ${d.title} ${d.enTitle} ${d.badge}`,
    external: true,
  })),
  ...BLOCKS_LIST.map((b) => ({
    id: `blk-${b.slug}`,
    group: '卡片' as const,
    title: `${b.code} ${b.cnName} (${b.componentName})`,
    subtitle: b.slots,
    to: `/blocks#${b.slug}`,
    keywords: `${b.code} ${b.slug} ${b.componentName} ${b.cnName} ${b.domain} ${b.slots}`,
  })),
]

export interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const { navigate } = useRouter()
  const [query, setQuery] = React.useState('')
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  React.useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return [
        ...DOC_ITEMS,
        ...ALL_SEARCH_ITEMS.filter((i) => i.group === '组件').slice(0, 6),
        ...ALL_SEARCH_ITEMS.filter((i) => i.group === 'Demo').slice(0, 4),
      ]
    }
    return ALL_SEARCH_ITEMS.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q) ||
        i.keywords.toLowerCase().includes(q),
    ).slice(0, 24)
  }, [query])

  const selectItem = (item: SearchItem) => {
    onOpenChange(false)
    if (item.external) {
      window.open(item.to, '_blank', 'noopener,noreferrer')
    } else {
      navigate(item.to)
    }
  }

  const iconFor = (group: SearchItem['group'], id: string) => {
    if (id === 'doc-ai') return <Robot size={15} className="text-[#7B80EA]" />
    if (group === '文档') return <BookOpen size={15} className="text-[#4A9BD8]" />
    if (group === '组件') return <Cube size={15} className="text-[#7B80EA]" />
    if (group === '卡片') return <Stack size={15} className="text-[#2FA79B]" />
    return <House size={15} className="text-[#E3A33B]" />
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="glaze-dialog-backdrop fixed inset-0 z-50 bg-[#1B1F27]/38" />
        <BaseDialog.Popup className="glaze-dialog-popup fixed top-[14%] left-1/2 z-50 w-[min(600px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-[24px] bg-white shadow-[0_24px_64px_rgba(18,58,92,0.20)] outline-none">
          <div className="flex items-center gap-3 border-b border-[#EEF0F3] px-4 py-3.5">
            <MagnifyingGlass size={18} className="shrink-0 text-[#8A90A0]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActiveIndex((i) => Math.min(results.length - 1, i + 1))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActiveIndex((i) => Math.max(0, i - 1))
                } else if (e.key === 'Enter' && results[activeIndex]) {
                  e.preventDefault()
                  selectItem(results[activeIndex])
                }
              }}
              placeholder="搜索..."
              className="w-full border-0 bg-transparent text-[15px] text-[#1B1F27] placeholder-[#8A90A0] outline-none"
            />
            <BaseDialog.Close
              aria-label="关闭搜索"
              className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F2F3F5] text-[#5B6170] hover:bg-[#E8EBF0]"
            >
              <X size={14} weight="bold" />
            </BaseDialog.Close>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-[14px] text-[#8A90A0]">
                未找到与 “{query}” 匹配的内容
              </div>
            ) : (
              results.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => selectItem(item)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors',
                    idx === activeIndex ? 'bg-[#F3F4FE]' : 'hover:bg-[#F6F7F9]',
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                      {iconFor(item.group, item.id)}
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-[14px] font-semibold text-[#1B1F27]">
                        {item.title}
                      </span>
                      <span className="truncate text-[12px] text-[#6B7280]">{item.subtitle}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-[#F2F3F5] px-2 py-0.5 text-[11px] font-medium text-[#5B6170]">
                      {item.group}
                    </span>
                    <ArrowRight size={13} className="text-[#8A90A0]" />
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#EEF0F3] bg-[#F6F7F9] px-4 py-2 text-[11px] text-[#6B7280]">
            <span>↑↓ 切换 · Enter 打开 · Esc 关闭</span>
            <span>58 组件 · 112 卡片 · 6 Demos</span>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
