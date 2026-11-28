import * as React from 'react'
import {
  ArrowSquareOut,
  Check,
  Code,
  Copy,
  MagnifyingGlass,
  TerminalWindow,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { useToast } from '@/components/ui/toast'
import { CliCommand } from '@/docs/components/CliCommand'
import { CodeBlock } from '@/docs/components/CodeBlock'
import { SiteHeader } from '@/docs/components/SiteHeader'
import { CARD_DOMAIN_CATEGORIES, CARDS_LIST, type CardDocMeta } from '@/docs/data/catalog'
import { CARD_PREVIEW_RENDERERS } from '@/docs/examples/card-previews'

type SizeFilter = 'all' | 's' | 'w' | 't' | 'l' | 'f'

const SIZE_GRID_CLASS: Record<CardDocMeta['size'], string> = {
  s: 'col-span-1',
  w: 'col-span-1 sm:col-span-2',
  t: 'col-span-1',
  l: 'col-span-1 sm:col-span-2',
  f: 'col-span-1 sm:col-span-2 lg:col-span-4',
}

const SIZE_HEIGHT_CLASS: Record<CardDocMeta['size'], string> = {
  s: 'min-h-50',
  w: 'min-h-50',
  t: 'min-h-104',
  l: 'min-h-104',
  f: '',
}

export function CardsIndexPage({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const toast = useToast()
  const [domain, setDomain] = React.useState<string>('all')
  const [size, setSize] = React.useState<SizeFilter>('all')
  const [query, setQuery] = React.useState('')
  const [demoSwitch, setDemoSwitch] = React.useState(true)
  const [inspectCard, setInspectCard] = React.useState<CardDocMeta | null>(null)
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARDS_LIST.filter((c) => {
      if (domain !== 'all' && c.domain !== domain) return false
      if (size !== 'all' && c.size !== size) return false
      if (
        q &&
        !(
          c.code.toLowerCase().includes(q) ||
          c.slug.includes(q) ||
          c.componentName.toLowerCase().includes(q) ||
          c.cnName.toLowerCase().includes(q) ||
          c.slots.toLowerCase().includes(q)
        )
      ) {
        return false
      }
      return true
    })
  }, [domain, size, query])

  const copyCli = (slug: string) => {
    const cmd = `npx shadcn@latest add @glaze/${slug}`
    navigator.clipboard?.writeText(cmd).catch(() => {})
    setCopiedSlug(slug)
    toast({ title: '已复制 CLI 命令', description: cmd, status: 'normal' })
    window.setTimeout(() => setCopiedSlug(null), 1500)
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      {!hideHeader && <SiteHeader />}

      <main className="mx-auto flex max-w-[1340px] flex-col gap-7 px-4 pt-9 pb-24 sm:px-6">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <h1 className="m-0 font-glaze-display text-[34px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
                  卡片
                </h1>
                <span className="text-[14px] text-[#6B7280]">
                  {filtered.length} / {CARDS_LIST.length}
                </span>
              </div>
              <p className="m-0 text-[13.5px] text-[#5B6170]">
                S / W / T / L / F 五种栅格尺寸，均支持单卡安装。
              </p>
            </div>
            <div className="w-full sm:w-68">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="筛选编号、名称或结构..."
                leadingIcon={<MagnifyingGlass size={16} />}
                surface="white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {CARD_DOMAIN_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setDomain(cat.id)}
                  className={cn(
                    'cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors',
                    domain === cat.id
                      ? 'bg-[#123A5C] text-white'
                      : 'bg-white text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]',
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <SegmentedControl
              size="sm"
              value={size}
              onValueChange={setSize}
              listClassName="bg-[#E6E9F0]"
              options={[
                { value: 'all', label: '全部' },
                { value: 's', label: 'S' },
                { value: 'w', label: 'W' },
                { value: 't', label: 'T' },
                { value: 'l', label: 'L' },
                { value: 'f', label: 'F' },
              ]}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((card) => {
            const renderPreview = CARD_PREVIEW_RENDERERS[card.slug]
            return (
              <div
                key={card.slug}
                id={card.slug}
                className={cn('flex min-w-0 flex-col gap-2', SIZE_GRID_CLASS[card.size])}
              >
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="rounded-md bg-white px-1.5 py-0.5 font-glaze-mono text-[11px] font-bold text-[#123A5C]">
                      {card.code}
                    </span>
                    <span className="truncate text-[13px] font-bold text-[#1B1F27]">
                      {card.cnName}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyCli(card.slug)}
                      title={`npx shadcn@latest add @glaze/${card.slug}`}
                      className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-full bg-white px-2.5 text-[11px] font-semibold text-[#5B6170] transition-colors hover:bg-[#1B1F27] hover:text-white"
                    >
                      {copiedSlug === card.slug ? <Check size={12} weight="bold" /> : <TerminalWindow size={12} />}
                      <span className="hidden sm:inline">CLI</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInspectCard(card)}
                      title="源码与 Props"
                      className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-[#5B6170] transition-colors hover:bg-[#E4E6FD] hover:text-[#262B7A]"
                    >
                      <Code size={13} weight="bold" />
                    </button>
                    <a
                      href={`/view/cards/${card.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="独立打开"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#5B6170] no-underline transition-colors hover:bg-[#DDF0FB] hover:text-[#123A5C]"
                    >
                      <ArrowSquareOut size={13} weight="bold" />
                    </a>
                  </div>
                </div>

                <div
                  className={cn(
                    'flex min-w-0 flex-1 flex-col [&>*]:w-full [&>*]:flex-1',
                    SIZE_HEIGHT_CLASS[card.size],
                  )}
                >
                  {renderPreview ? renderPreview({ toast, demoSwitch, setDemoSwitch }) : null}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Dialog
        open={Boolean(inspectCard)}
        onOpenChange={(open) => !open && setInspectCard(null)}
        maxWidth="760px"
        title={inspectCard ? `${inspectCard.code} ${inspectCard.cnName}` : ''}
        description={inspectCard ? `@glaze/${inspectCard.slug}` : ''}
      >
        {inspectCard && (
          <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
            <CliCommand command={`shadcn@latest add @glaze/${inspectCard.slug}`} />

            {inspectCard.props.length > 0 && (
              <div className="overflow-x-auto rounded-[16px] border border-[#EEF0F3]">
                <table className="w-full border-collapse text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-[#EEF0F3] bg-[#F6F7F9] text-[#6B7280]">
                      <th className="px-3 py-2">Prop</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F3F5]">
                    {inspectCard.props.map((p) => (
                      <tr key={p.name}>
                        <td className="px-3 py-2 font-glaze-mono font-semibold text-[#4A4FB8]">
                          {p.name}
                          {p.required ? '*' : '?'}
                        </td>
                        <td className="px-3 py-2 font-glaze-mono text-[#24557F]">{p.type}</td>
                        <td className="px-3 py-2 font-glaze-mono text-[#5B6170]">
                          {p.defaultValue || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <CodeBlock
              code={inspectCard.sourceCode}
              language="tsx"
              filename={`components/cards/${inspectCard.slug}.tsx`}
              maxHeight={340}
            />

            <div className="flex items-center justify-end">
              <a
                href={`/r/${inspectCard.slug}.json`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#4A4FB8] no-underline hover:underline"
              >
                <Copy size={12} />
                <span>Registry JSON</span>
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
