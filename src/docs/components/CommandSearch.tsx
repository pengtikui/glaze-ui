import * as React from 'react'
import {
  ArrowRight,
  BookOpen,
  Cube,
  House,
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
import { BLOCKS_LIST, COMPONENTS_LIST, DEMOS_LIST } from '@/docs/data/catalog'
import { useRouter } from '@/docs/router'

interface SearchItem {
  id: string
  group: '文档' | '组件' | '卡片' | 'Demo'
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
    title: '简介 Introduction',
    subtitle: '了解 Glaze 设计系统架构与核心理念',
    to: '/docs',
    keywords: ['intro', '简介', '概述'],
  },
  {
    id: 'doc-install',
    group: '文档',
    title: '安装与 Registry 配置',
    subtitle: '使用 shadcn CLI 与 @glaze 命名空间安装',
    to: '/docs/installation',
    keywords: ['install', 'shadcn', 'cli', 'registry', 'components.json'],
  },
  {
    id: 'doc-foundations',
    group: '文档',
    title: '设计规范与动效 Foundations',
    subtitle: '色彩、排版、圆角、4 列栅格与纯 CSS 动效',
    to: '/docs/foundations',
    keywords: ['tokens', 'colors', 'typography', 'motion', 'grid', '色彩', '动效'],
  },
  {
    id: 'doc-ai',
    group: '文档',
    title: 'AI Agent 使用指南',
    subtitle: 'AGENTS.md、llms.txt、llms-full.txt 与 MCP 配置',
    to: '/docs/ai-agent',
    keywords: ['ai', 'agent', 'llms.txt', 'claude', 'cursor', 'mcp'],
  },
  {
    id: 'doc-publish',
    group: '文档',
    title: 'Registry 发布与托管',
    subtitle: 'GitHub Raw 默认分发与自托管静态部署',
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

const DEMO_ITEMS: SearchItem[] = DEMOS_LIST.map((d) => ({
  id: `demo-${d.slug}`,
  group: 'Demo',
  title: `Demo ${d.index} · ${d.title}`,
  subtitle: `${d.enTitle} · 支持独立打开 /view/demos/${d.slug}`,
  to: `/view/demos/${d.slug}`,
  keywords: [d.slug, d.title, d.enTitle, d.badge],
  external: true,
}))

const BLOCK_ITEMS: SearchItem[] = BLOCKS_LIST.map((b) => ({
  id: `blk-${b.slug}`,
  group: '卡片',
  title: `${b.code} ${b.cnName} (${b.componentName})`,
  subtitle: b.slots,
  to: `/blocks#${b.slug}`,
  keywords: [b.code, b.slug, b.componentName, b.cnName, b.domain, b.slots],
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
    return <House size={15} className="text-[#E3A33B]" />
  }

  const hasQuery = query.trim().length > 0
  const visibleComponents = hasQuery ? COMPONENT_ITEMS : COMPONENT_ITEMS.slice(0, 6)
  const visibleDemos = hasQuery ? DEMO_ITEMS : DEMO_ITEMS.slice(0, 4)
  const visibleBlocks = hasQuery ? BLOCK_ITEMS : BLOCK_ITEMS.slice(0, 4)

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
      description="按关键字搜索 Glaze 文档、组件、卡片与示例 Demo"
    >
      <CommandInput
        autoFocus
        value={query}
        onValueChange={setQuery}
        placeholder="搜索文档、组件、卡片或 Demo..."
      />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>未找到与 “{query}” 匹配的内容</CommandEmpty>

        <CommandGroup heading="文档">{DOC_ITEMS.map(renderEntry)}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? '组件' : '常用组件'}>
          {visibleComponents.map(renderEntry)}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? '示例 Demo' : '精选示例 Demo'}>
          {visibleDemos.map(renderEntry)}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={hasQuery ? '卡片' : '热门卡片'}>
          {visibleBlocks.map(renderEntry)}
        </CommandGroup>
      </CommandList>
      <CommandFooter>
        <span>↑↓ 切换 · Enter 打开 · Esc 关闭</span>
        <span>
          {COMPONENTS_LIST.length} 组件 · {BLOCKS_LIST.length} 卡片 · {DEMOS_LIST.length} Demos
        </span>
      </CommandFooter>
    </CommandDialog>
  )
}
