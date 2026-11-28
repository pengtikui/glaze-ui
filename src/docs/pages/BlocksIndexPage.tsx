import * as React from 'react'
import {
  ArrowSquareOut,
  Desktop,
  DeviceMobile,
  DeviceTablet,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { CliCommand } from '@/docs/components/CliCommand'
import { CodeBlock } from '@/docs/components/CodeBlock'
import { SiteHeader } from '@/docs/components/SiteHeader'
import { BLOCK_CATEGORIES, BLOCKS_LIST, type BlockDocMeta } from '@/docs/data/catalog'
import { BLOCK_PREVIEW_RENDERERS } from '@/docs/examples/block-previews'
import type { Hue } from '@/lib/tokens'

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

const VIEWPORT_WIDTH: Record<ViewportMode, string> = {
  desktop: '100%',
  tablet: '820px',
  mobile: '410px',
}

function BlockShowcaseItem({ block }: { block: BlockDocMeta }) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview')
  const [viewport, setViewport] = React.useState<ViewportMode>('desktop')
  const renderBlock = BLOCK_PREVIEW_RENDERERS[block.slug]
  const standaloneUrl = `/view/blocks/${block.slug}`

  return (
    <section
      id={block.slug}
      className="flex scroll-mt-24 flex-col gap-3.5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="m-0 font-glaze-display text-[21px] font-extrabold text-[#123A5C]">
              {block.title}
            </h2>
            <HueTag hue={(block.tone as Hue) || 'periwinkle'} size="xs">
              {block.exportName}
            </HueTag>
          </div>
          <p className="m-0 text-[13.5px] text-[#5B6170]">{block.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            size="sm"
            value={tab}
            onValueChange={setTab}
            listClassName="bg-[#E6E9F0]"
            options={[
              { value: 'preview', label: '预览' },
              { value: 'code', label: '源码' },
            ]}
          />

          {tab === 'preview' && (
            <div className="hidden items-center rounded-full bg-[#E6E9F0] p-1 sm:inline-flex">
              {(
                [
                  { id: 'desktop', icon: Desktop, label: '桌面' },
                  { id: 'tablet', icon: DeviceTablet, label: '平板' },
                  { id: 'mobile', icon: DeviceMobile, label: '手机' },
                ] as const
              ).map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    onClick={() => setViewport(item.id)}
                    className={cn(
                      'inline-flex h-7 w-8 cursor-pointer items-center justify-center rounded-full transition-colors',
                      viewport === item.id
                        ? 'bg-white text-[#123A5C] shadow-[0_1px_2px_rgba(16,24,40,0.08)]'
                        : 'text-[#6B7280] hover:text-[#1B1F27]',
                    )}
                  >
                    <Icon size={14} weight="bold" />
                  </button>
                )
              })}
            </div>
          )}

          <a
            href={standaloneUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1B1F27] px-3.5 text-[12px] font-semibold text-white no-underline transition-colors hover:bg-[#2B313D]"
          >
            <span>独立打开</span>
            <ArrowSquareOut size={13} weight="bold" />
          </a>
        </div>
      </div>

      <CliCommand command={`shadcn@latest add @glaze/${block.slug}`} compact />

      {tab === 'preview' ? (
        viewport === 'desktop' ? (
          <div className="rounded-[32px] bg-[#E8ECF3]/75 p-4 sm:p-6">
            {renderBlock ? renderBlock() : null}
          </div>
        ) : (
          <div className="flex justify-center overflow-x-auto rounded-[32px] bg-[#E8ECF3]/75 p-4 sm:p-6">
            <iframe
              key={`${standaloneUrl}-${viewport}`}
              src={standaloneUrl}
              title={block.title}
              style={{ width: VIEWPORT_WIDTH[viewport], height: 640 }}
              className="max-w-full rounded-[24px] border border-[#DCE1EA] bg-[#F2F4F8] transition-[width] duration-200"
            />
          </div>
        )
      ) : (
        <CodeBlock
          code={block.sourceCode}
          language="tsx"
          filename={`components/blocks/${block.slug}.tsx`}
          maxHeight={480}
        />
      )}
    </section>
  )
}

export function BlocksIndexPage({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [category, setCategory] = React.useState('all')
  const [query, setQuery] = React.useState('')

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return BLOCKS_LIST.filter((b) => {
      if (category !== 'all' && b.category !== category) return false
      if (
        q &&
        !(
          b.title.toLowerCase().includes(q) ||
          b.enTitle.toLowerCase().includes(q) ||
          b.slug.includes(q) ||
          b.description.toLowerCase().includes(q)
        )
      ) {
        return false
      }
      return true
    })
  }, [category, query])

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      {!hideHeader && <SiteHeader />}

      <main className="mx-auto flex max-w-[1340px] flex-col gap-10 px-4 pt-9 pb-24 sm:px-6">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <h1 className="m-0 font-glaze-display text-[34px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
                  Blocks
                </h1>
                <span className="text-[14px] text-[#6B7280]">
                  {filtered.length} / {BLOCKS_LIST.length} 个复合业务区块
                </span>
              </div>
              <p className="m-0 text-[13.5px] text-[#5B6170]">
                组合组件与卡片封装的通用业务区块，可直接嵌入页面。
              </p>
            </div>

            <div className="w-full sm:w-68">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索 Block 名称或能力..."
                leadingIcon={<MagnifyingGlass size={16} />}
                surface="white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {BLOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors',
                  category === cat.id
                    ? 'bg-[#123A5C] text-white'
                    : 'bg-white text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col gap-14">
          {filtered.map((block) => (
            <BlockShowcaseItem key={block.slug} block={block} />
          ))}
        </div>
      </main>
    </div>
  )
}
