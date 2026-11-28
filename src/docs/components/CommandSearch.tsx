import * as React from 'react'
import {
  ArrowRight,
  BookOpen,
  Cube,
  House,
  Layout,
  Robot,
  Stack,
} from '@phosphor-icons/react'
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { BLOCKS_LIST, CARDS_LIST, COMPONENTS_LIST, PAGES_LIST } from '@/docs/data/catalog'
import { useRouter } from '@/docs/router'

interface SearchItem {
  id: string
  group: '文档' | '组件' | '卡片' | 'Block' | '页面'
  title: string
  subtitle: string
  to: string
  keywords: string[]
  external?: boolean
}

const DOC_ITEMS: SearchItem[] = [
  {
    id: 'doc-intro',
    group: '文档',
    title: '简介',
    subtitle: '四层架构与核心约束',
    to: '/docs',
    keywords: ['intro', '简介', '概述'],
  },
  {
    id: 'doc-install',
    group: '文档',
    title: '安装与 Registry',
    subtitle: 'shadcn CLI 与 @glaze 配置',
    to: '/docs/installation',
    keywords: ['install', 'shadcn', 'cli', 'registry', 'components.json'],
  },
  {
    id: 'doc-foundations',
    group: '文档',
    title: '设计规范',
    subtitle: '色板、排版、圆角、栅格与动效',
    to: '/docs/foundations',
    keywords: ['tokens', 'colors', 'typography', 'motion', 'grid', '色彩', '动效'],
  },
  {
    id: 'doc-ai',
    group: '文档',
    title: 'AI Agent',
    subtitle: 'llms.txt、规则片段与 MCP',
    to: '/docs/ai-agent',
    keywords: ['ai', 'agent', 'llms.txt', 'claude', 'cursor', 'mcp'],
  },
  {
    id: 'doc-publish',
    group: '文档',
    title: 'Registry 发布',
    subtitle: 'GitHub Raw 与自托管部署',
    to: '/docs/registry-publishing',
    keywords: ['publish', 'deploy', 'github', 'raw', 'self', 'host', '发布', '托管'],
  },
]

const COMPONENT_ITEMS: SearchItem[] = COMPONENTS_LIST.map((c) => ({
  id: `comp-${c.slug}`,
  group: '组件',
  title: `${c.title} · ${c.cnTitle}`,
  subtitle: c.description,
  to: `/docs/components/${c.slug}`,
  keywords: [c.slug, c.title, c.cnTitle, c.category, ...c.parts],
}))

const CARD_ITEMS: SearchItem[] = CARDS_LIST.map((c) => ({
  id: `card-${c.slug}`,
  group: '卡片',
  title: `${c.code} ${c.cnName} (${c.componentName})`,
  subtitle: c.slots,
  to: `/cards#${c.slug}`,
  keywords: [c.code, c.slug, c.componentName, c.cnName, c.domain, c.slots],
}))

const BLOCK_ITEMS: SearchItem[] = BLOCKS_LIST.map((b) => ({
  id: `blk-${b.slug}`,
  group: 'Block',
  title: `${b.title} (${b.exportName})`,
  subtitle: b.description,
  to: `/blocks#${b.slug}`,
  keywords: [b.slug, b.title, b.enTitle, b.exportName, b.category],
}))

const PAGE_ITEMS: SearchItem[] = PAGES_LIST.map((p) => ({
  id: `page-${p.slug}`,
  group: '页面',
  title: `Page ${p.index} · ${p.title}`,
  subtitle: `${p.enTitle} · 独立预览 /view/pages/${p.slug}`,
  to: `/view/pages/${p.slug}`,
  keywords: [p.slug, p.title, p.enTitle, p.badge, p.category],
  external: true,
}))

export interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const { navigate } = useRouter()
  const [query, setQuery] = React.useState('')

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
    }
  }, [open])

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
    if (group === 'Block') return <Layout size={15} className="text-[#E06D94]" />
    return <House size={15} className="text-[#E3A33B]" />
  }

  const hasQuery = query.trim().length > 0
  const visibleComponents = hasQuery ? COMPONENT_ITEMS : COMPONENT_ITEMS.slice(0, 5)
  const visibleCards = hasQuery ? CARD_ITEMS : CARD_ITEMS.slice(0, 4)
  const visibleBlocks = hasQuery ? BLOCK_ITEMS : BLOCK_ITEMS.slice(0, 4)
  const visiblePages = hasQuery ? PAGE_ITEMS : PAGE_ITEMS.slice(0, 5)

  const renderEntry = (item: SearchItem) => (
    <CommandItem
      key={item.id}
      value={`${item.title} ${item.subtitle}`}
      keywords={item.keywords}
      onSelect={() => selectItem(item)}
      className="justify-between gap-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
          {iconFor(item.group, item.id)}
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[14px] font-semibold">{item.title}</span>
          <span className="truncate text-[12px] text-[#6B7280]">{item.subtitle}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full bg-[#F2F3F5] px-2 py-0.5 text-[11px] font-medium text-[#5B6170]">
          {item.group}
        </span>
        <ArrowRight size={13} className="text-[#8A90A0]" />
      </div>
    </CommandItem>
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="全局文档搜索"
      description="按关键字搜索 Glaze 文档、组件、卡片、Blocks 与完整页面"
    >
      <CommandInput
        autoFocus
        value={query}
        onValueChange={setQuery}
        placeholder="搜索文档、组件、卡片、Blocks 或页面..."
      />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>未找到与 “{query}” 匹配的内容</CommandEmpty>

        <CommandGroup heading="文档">{DOC_ITEMS.map(renderEntry)}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? '组件' : '常用组件'}>
          {visibleComponents.map(renderEntry)}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? 'Blocks' : '精选 Blocks'}>
          {visibleBlocks.map(renderEntry)}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? '页面' : '精选页面'}>
          {visiblePages.map(renderEntry)}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? '卡片' : '热门卡片'}>
          {visibleCards.map(renderEntry)}
        </CommandGroup>
      </CommandList>
      <CommandFooter>
        <span>↑↓ 切换 · Enter 打开 · Esc 关闭</span>
        <span>
          {COMPONENTS_LIST.length} 组件 · {CARDS_LIST.length} 卡片 · {BLOCKS_LIST.length} Blocks ·{' '}
          {PAGES_LIST.length} 页面
        </span>
      </CommandFooter>
    </CommandDialog>
  )
}
