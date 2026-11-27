import * as React from 'react'
import { ArrowSquareOut, Desktop, DeviceMobile, DeviceTablet } from '@phosphor-icons/react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { CliCommand } from '@/docs/components/CliCommand'
import { SiteHeader } from '@/docs/components/SiteHeader'
import { DEMOS_LIST } from '@/docs/data/catalog'
import { Link } from '@/docs/router'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

const VIEWPORT_WIDTH: Record<ViewportMode, string> = {
  desktop: '100%',
  tablet: '820px',
  mobile: '410px',
}

export function DemosIndexPage({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [activeSlug, setActiveSlug] = React.useState(DEMOS_LIST[0]?.slug || 'homelab')
  const [viewport, setViewport] = React.useState<ViewportMode>('desktop')

  const activeDemo = DEMOS_LIST.find((d) => d.slug === activeSlug) || DEMOS_LIST[0]
  const standaloneUrl = `/view/demos/${activeDemo.slug}`

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      {!hideHeader && <SiteHeader />}

      <main className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 pt-9 pb-24 sm:px-6">
        <header className="flex items-baseline gap-3">
          <h1 className="m-0 font-glaze-display text-[34px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            示例 Demo
          </h1>
          <span className="text-[14px] text-[#6B7280]">{DEMOS_LIST.length} 个独立页面</span>
        </header>

        <section className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {DEMOS_LIST.map((demo) => {
            const theme = TILE_THEMES[(demo.tone as TileTone) || 'sky']
            const isSelected = demo.slug === activeDemo.slug
            return (
              <div
                key={demo.slug}
                onClick={() => setActiveSlug(demo.slug)}
                className={cn(
                  'flex cursor-pointer flex-col justify-between gap-3.5 rounded-tile bg-white p-5 transition-all',
                  isSelected ? 'ring-2 ring-[#7B80EA]' : 'hover:-translate-y-0.5',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-glaze-mono text-[11px] font-bold"
                    style={{ backgroundColor: theme.bg, color: theme.ink }}
                  >
                    {demo.index} · {demo.badge}
                  </span>
                  <a
                    href={`/view/demos/${demo.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-full bg-[#1B1F27] px-3 py-1 text-[11px] font-semibold text-white no-underline hover:bg-[#2B313D]"
                  >
                    <span>独立打开</span>
                    <ArrowSquareOut size={12} weight="bold" />
                  </a>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="m-0 font-glaze-display text-[18px] font-extrabold text-[#1B1F27]">
                    {demo.title}
                  </h2>
                  <Link
                    to={`/view/demos/${demo.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 text-[12px] font-semibold text-[#4A4FB8] no-underline hover:underline"
                  >
                    全屏 →
                  </Link>
                </div>
              </div>
            )
          })}
        </section>

        <section className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-glaze-display text-[16px] font-extrabold text-[#123A5C]">
                {activeDemo.index} · {activeDemo.title}
              </span>
              <code className="rounded-full bg-[#F6F7F9] px-2.5 py-0.5 font-glaze-mono text-[12px] text-[#5B6170]">
                {standaloneUrl}
              </code>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-full bg-[#F2F3F5] p-1">
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
                      onClick={() => setViewport(item.id)}
                      className={cn(
                        'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition-colors',
                        viewport === item.id
                          ? 'bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.08)]'
                          : 'text-[#6B7280] hover:text-[#1B1F27]',
                      )}
                    >
                      <Icon size={14} weight="bold" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              <a href={standaloneUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                <Button variant="primary" size="sm">
                  <span>独立打开</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </Button>
              </a>
            </div>
          </div>

          <CliCommand command={`shadcn@latest add @glaze/${activeDemo.registryName}`} compact />

          <div className="flex justify-center overflow-x-auto rounded-[28px] bg-[#E5E8EE]/80 p-3 sm:p-5">
            <iframe
              key={standaloneUrl}
              src={standaloneUrl}
              title={activeDemo.title}
              style={{ width: VIEWPORT_WIDTH[viewport], height: 760 }}
              className="max-w-full rounded-[22px] border border-[#DCE1EA] bg-[#F2F4F8] transition-[width] duration-200"
            />
          </div>
        </section>
      </main>
    </div>
  )
}
