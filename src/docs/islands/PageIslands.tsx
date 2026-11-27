import * as React from 'react'
import { ArrowRight, ArrowSquareOut, Check, Copy, FileText, MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { ComponentPreview } from '@/docs/components/ComponentPreview'
import { GlazeProviders } from '@/docs/components/GlazeProviders'
import { COMPONENT_CATEGORIES, COMPONENTS_LIST } from '@/docs/data/catalog'
import { COMPONENT_DEMOS } from '@/docs/examples/component-demos'
import { BlocksIndexPage } from '@/docs/pages/BlocksIndexPage'
import { DemosIndexPage } from '@/docs/pages/DemosIndexPage'
import { FoundationsPage } from '@/docs/pages/FoundationsContent'
import { StandaloneBlockViewPage, StandaloneDemoViewPage } from '@/docs/pages/StandaloneViewPage'

export function FoundationsIsland() {
  return (
    <GlazeProviders pathname="/docs/foundations">
      <FoundationsPage hideHeader />
    </GlazeProviders>
  )
}

export function AiEndpointsIsland() {
  const endpoints = [
    { title: '/llms.txt', tag: '目录索引', href: '/llms.txt' },
    { title: '/llms-full.txt', tag: '全量参考', href: '/llms-full.txt' },
    { title: '/r/registry.json', tag: 'Registry 清单', href: '/r/registry.json' },
    { title: '/llms/components/button.md', tag: '单组件 MD', href: '/llms/components/button.md' },
  ]
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {endpoints.map((ep) => (
        <a
          key={ep.title}
          href={ep.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded-[18px] bg-white px-4 py-3.5 no-underline transition-transform hover:-translate-y-0.5"
        >
          <span className="inline-flex items-center gap-2 font-glaze-mono text-[13px] font-bold text-[#123A5C]">
            <FileText size={15} className="text-[#7B80EA]" />
            {ep.title}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F3F4FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#4A4FB8]">
            {ep.tag}
            <ArrowSquareOut size={12} />
          </span>
        </a>
      ))}
    </div>
  )
}

export function ComponentsIndexIsland() {
  const [query, setQuery] = React.useState('')
  const q = query.trim().toLowerCase()

  return (
    <GlazeProviders pathname="/docs/components">
      <div className="flex flex-col gap-9">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 font-glaze-display text-[34px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
              组件
            </h1>
            <span className="text-[14px] text-[#6B7280]">{COMPONENTS_LIST.length} 个组件与图表</span>
          </div>
          <div className="w-full sm:w-68">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="筛选组件..."
              leadingIcon={<MagnifyingGlass size={16} />}
              surface="white"
            />
          </div>
        </header>

        {COMPONENT_CATEGORIES.map((cat) => {
          const items = COMPONENTS_LIST.filter(
            (c) =>
              c.category === cat.id &&
              (!q ||
                c.title.toLowerCase().includes(q) ||
                c.cnTitle.toLowerCase().includes(q) ||
                c.slug.includes(q)),
          )
          if (items.length === 0) return null

          return (
            <section key={cat.id} id={`cat-${cat.id}`} className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between border-b border-[#E5E8EE] pb-2">
                <h2 className="m-0 font-glaze-display text-[18px] font-extrabold text-[#1B1F27]">
                  {cat.title}
                </h2>
                <span className="text-[12px] font-semibold text-[#8A90A0]">{items.length}</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {items.map((c) => (
                  <a
                    key={c.slug}
                    href={`/docs/components/${c.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-[18px] bg-white px-4 py-3.5 no-underline transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex min-w-0 items-baseline gap-2">
                      <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C] group-hover:text-[#4A4FB8]">
                        {c.title}
                      </span>
                      <span className="truncate text-[12px] text-[#6B7280]">{c.cnTitle}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <code className="hidden rounded bg-[#F6F7F9] px-1.5 py-0.5 font-glaze-mono text-[11px] text-[#6B7280] sm:inline">
                        @{c.slug}
                      </code>
                      <ArrowRight
                        size={14}
                        className="text-[#8A90A0] transition-transform group-hover:translate-x-0.5 group-hover:text-[#4A4FB8]"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </GlazeProviders>
  )
}

function CopyMarkdownButtonInner({ slug, variant = 'pill' }: { slug: string; variant?: 'pill' | 'link' }) {
  const toast = useToast()
  const [copiedMd, setCopiedMd] = React.useState(false)

  const handleCopyMarkdown = async () => {
    try {
      const res = await fetch(`/llms/components/${slug}.md`)
      const text = await res.text()
      await navigator.clipboard?.writeText(text)
      setCopiedMd(true)
      toast({ title: '已复制 Markdown', status: 'normal' })
      window.setTimeout(() => setCopiedMd(false), 1600)
    } catch {
      toast({ title: '复制失败', status: 'warning' })
    }
  }

  if (variant === 'link') {
    return (
      <button
        type="button"
        onClick={handleCopyMarkdown}
        className="flex cursor-pointer items-center gap-1.5 py-1 text-left text-[12px] font-medium text-[#5B6170] hover:text-[#123A5C]"
      >
        {copiedMd ? <Check size={13} className="text-[#2F6B28]" /> : <Copy size={13} />}
        <span>{copiedMd ? '已复制 MD' : '复制 Markdown'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleCopyMarkdown}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#1B1F27] transition-colors hover:bg-[#E8EBF0]"
    >
      {copiedMd ? <Check size={13} weight="bold" className="text-[#2F6B28]" /> : <Copy size={13} />}
      <span>Markdown</span>
    </button>
  )
}

export function CopyMarkdownButtonIsland(props: { slug: string; variant?: 'pill' | 'link' }) {
  return (
    <GlazeProviders pathname={`/docs/components/${props.slug}`}>
      <CopyMarkdownButtonInner {...props} />
    </GlazeProviders>
  )
}

export function ComponentDemoIsland({
  slug,
  exampleId,
  highlightedCodeHtml,
}: {
  slug: string
  exampleId?: string
  highlightedCodeHtml?: string
}) {
  const group = COMPONENT_DEMOS[slug]
  if (!group) return null

  const demo = exampleId
    ? group.examples.find((ex) => ex.id === exampleId)
    : group.hero
  if (!demo) return null

  return (
    <GlazeProviders pathname={`/docs/components/${slug}`}>
      <ComponentPreview
        code={demo.code}
        highlightedCodeHtml={highlightedCodeHtml}
        filename={exampleId ? `${slug}-${exampleId}.tsx` : `${slug}-demo.tsx`}
        minHeight={demo.minHeight ?? 180}
        align={demo.align ?? 'center'}
        surface={demo.surface ?? 'white'}
      >
        {demo.render()}
      </ComponentPreview>
    </GlazeProviders>
  )
}

export function BlocksIndexIsland() {
  return (
    <GlazeProviders pathname="/blocks">
      <BlocksIndexPage hideHeader />
    </GlazeProviders>
  )
}

export function DemosIndexIsland() {
  return (
    <GlazeProviders pathname="/demos">
      <DemosIndexPage hideHeader />
    </GlazeProviders>
  )
}

export function StandaloneDemoIsland({ slug }: { slug: string }) {
  return (
    <GlazeProviders pathname={`/view/demos/${slug}`}>
      <StandaloneDemoViewPage slug={slug} />
    </GlazeProviders>
  )
}

export function StandaloneBlockIsland({ slug }: { slug: string }) {
  return (
    <GlazeProviders pathname={`/view/blocks/${slug}`}>
      <StandaloneBlockViewPage slug={slug} />
    </GlazeProviders>
  )
}
