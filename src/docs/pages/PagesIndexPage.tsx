import * as React from 'react'
import {
  ArrowSquareOut,
  Check,
  Copy,
  Info,
  MagnifyingGlass,
  TerminalWindow,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { CliCommand } from '@/docs/components/CliCommand'
import { SiteHeader } from '@/docs/components/SiteHeader'
import { PAGE_CATEGORIES, PAGES_LIST, type PageDocMeta } from '@/docs/data/catalog'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  PAGE_CATEGORIES.map((c) => [c.id, c.title]),
)

export function PagesIndexPage({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const toast = useToast()
  const [category, setCategory] = React.useState('all')
  const [query, setQuery] = React.useState('')
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null)
  const [inspectPage, setInspectPage] = React.useState<PageDocMeta | null>(null)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return PAGES_LIST.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (
        q &&
        !(
          p.title.toLowerCase().includes(q) ||
          p.enTitle.toLowerCase().includes(q) ||
          p.slug.includes(q) ||
          p.badge.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.highlights.some((h) => h.toLowerCase().includes(q))
        )
      ) {
        return false
      }
      return true
    })
  }, [category, query])

  const copyCli = (page: PageDocMeta) => {
    const cmd = `npx shadcn@latest add @glaze/${page.registryName}`
    navigator.clipboard?.writeText(cmd).catch(() => {})
    setCopiedSlug(page.slug)
    toast({ title: `已复制 ${page.title} 安装命令`, description: cmd, status: 'normal' })
    window.setTimeout(() => setCopiedSlug((cur) => (cur === page.slug ? null : cur)), 1600)
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      {!hideHeader && <SiteHeader />}

      <main className="mx-auto flex max-w-[1360px] flex-col gap-7 px-4 pt-9 pb-24 sm:px-6">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <h1 className="m-0 font-glaze-display text-[34px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
                  页面
                </h1>
                <span className="text-[14px] text-[#6B7280]">
                  {filtered.length} / {PAGES_LIST.length} 个完整业务页面
                </span>
              </div>
              <p className="m-0 text-[13.5px] text-[#5B6170]">
                新窗口全屏体验，或直接复制 CLI 命令安装。
              </p>
            </div>

            <div className="w-full sm:w-72">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索页面名称、场景或特性..."
                leadingIcon={<MagnifyingGlass size={16} />}
                surface="white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PAGE_CATEGORIES.map((cat) => (
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

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-tile bg-white py-16 text-center">
            <span className="font-glaze-display text-[17px] font-extrabold text-[#123A5C]">
              未找到匹配的页面
            </span>
            <span className="text-[13px] text-[#6B7280]">
              尝试更换搜索关键词或切换顶部分类筛选
            </span>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((page) => {
              const theme = TILE_THEMES[(page.tone as TileTone) || 'sky']
              const standaloneUrl = `/view/pages/${page.slug}`
              const cliText = `npx shadcn@latest add @glaze/${page.registryName}`
              const copied = copiedSlug === page.slug

              return (
                <article
                  key={page.slug}
                  className="group flex flex-col justify-between gap-4 rounded-tile bg-white p-6 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="shrink-0 rounded-full px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold"
                          style={{ backgroundColor: theme.bg, color: theme.ink }}
                        >
                          {page.index} · {page.badge}
                        </span>
                        <span className="truncate text-[11.5px] font-semibold text-[#8A90A0]">
                          {CATEGORY_LABEL[page.category] ?? page.category}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setInspectPage(page)}
                        title="查看安装与依赖详情"
                        aria-label={`查看 ${page.title} 安装与依赖详情`}
                        className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F6F7F9] text-[#5B6170] transition-colors hover:bg-[#E4E6FD] hover:text-[#262B7A]"
                      >
                        <Info size={15} weight="bold" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <a
                        href={standaloneUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-2 no-underline"
                      >
                        <h2 className="m-0 font-glaze-display text-[19px] leading-snug font-extrabold text-[#123A5C] transition-colors group-hover:text-[#4A4FB8]">
                          {page.title}
                        </h2>
                      </a>
                      <span className="font-glaze-mono text-[11.5px] font-medium text-[#8A90A0]">
                        {page.enTitle}
                      </span>
                      <p className="m-0 mt-0.5 line-clamp-2 text-[13px] leading-relaxed text-[#5B6170]">
                        {page.description}
                      </p>
                    </div>

                    {page.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {page.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="rounded-full bg-[#F6F7F9] px-2.5 py-1 text-[11.5px] font-medium text-[#5B6170]"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => copyCli(page)}
                      title="点击复制安装命令"
                      className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-full bg-[#F6F7F9] px-3.5 text-left transition-colors hover:bg-[#EEF0F4]"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <TerminalWindow size={14} className="shrink-0 text-[#8A90A0]" />
                        <code className="truncate font-glaze-mono text-[11.5px] font-medium text-[#1B1F27]">
                          {cliText}
                        </code>
                      </span>
                      <span
                        className={cn(
                          'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                          copied
                            ? 'bg-[#E2F5DA] text-[#2F6B28]'
                            : 'bg-white text-[#5B6170]',
                        )}
                      >
                        {copied ? <Check size={12} weight="bold" /> : <Copy size={12} />}
                        <span>{copied ? '已复制' : '复制'}</span>
                      </span>
                    </button>

                    <a
                      href={standaloneUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#123A5C] px-4 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-[#194A73]"
                    >
                      <span>打开页面</span>
                      <ArrowSquareOut size={14} weight="bold" />
                    </a>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </main>

      <Dialog
        open={Boolean(inspectPage)}
        onOpenChange={(open) => !open && setInspectPage(null)}
        maxWidth="640px"
        title={inspectPage ? `${inspectPage.index} · ${inspectPage.title}` : ''}
        description={inspectPage ? `${inspectPage.enTitle} · @glaze/${inspectPage.registryName}` : ''}
      >
        {inspectPage && (
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[13.5px] leading-relaxed text-[#5B6170]">
              {inspectPage.description}
            </p>

            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#6B7280]">安装命令（支持切换包管理器）</span>
              <CliCommand command={`shadcn@latest add @glaze/${inspectPage.registryName}`} />
            </div>

            {inspectPage.registryDependencies.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-bold text-[#6B7280]">
                  包含的 Registry 依赖 ({inspectPage.registryDependencies.length})
                </span>
                <div className="flex max-h-36 flex-wrap gap-1.5 overflow-y-auto rounded-inner bg-[#F6F7F9] p-3">
                  {inspectPage.registryDependencies.map((dep) => (
                    <code
                      key={dep}
                      className="rounded-full bg-white px-2.5 py-0.5 font-glaze-mono text-[11px] font-semibold text-[#123A5C]"
                    >
                      {dep}
                    </code>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EEF0F3] pt-4">
              <a
                href={`/r/${inspectPage.registryName}.json`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] font-semibold text-[#4A4FB8] no-underline hover:underline"
              >
                查看 Registry JSON ↗
              </a>

              <a
                href={`/view/pages/${inspectPage.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="primary" size="sm">
                  <span>全屏打开页面</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
