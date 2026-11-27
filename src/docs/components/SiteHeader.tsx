import * as React from 'react'
import { GithubLogo, List, MagnifyingGlass, Robot } from '@phosphor-icons/react'
import { cn } from 'cn'
import { HueTag } from '@/components/ui/hue-tag'
import { SITE_CONFIG } from '@/docs/data/catalog'
import { Link, useRouter } from '@/docs/router'
import { CommandSearch } from './CommandSearch'

const TOP_NAV = [
  {
    label: '文档',
    to: '/docs',
    match: (p: string) =>
      p.startsWith('/docs') && !p.startsWith('/docs/components') && p !== '/docs/ai-agent',
  },
  { label: '组件', to: '/docs/components', match: (p: string) => p.startsWith('/docs/components') },
  { label: '卡片', to: '/blocks', match: (p: string) => p.startsWith('/blocks') },
  { label: '示例 Demo', to: '/demos', match: (p: string) => p.startsWith('/demos') },
  { label: 'AI Agent', to: '/docs/ai-agent', match: (p: string) => p === '/docs/ai-agent' },
]

export interface SiteHeaderProps {
  onOpenMobileMenu?: () => void
  showMobileMenuButton?: boolean
}

export function SiteHeader({ onOpenMobileMenu, showMobileMenuButton = false }: SiteHeaderProps) {
  const { pathname } = useRouter()
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 h-15 border-b border-[#E5E8EE]/90 bg-[#F2F4F8]/96">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              {showMobileMenuButton && (
                <button
                  type="button"
                  onClick={onOpenMobileMenu}
                  aria-label="打开文档导航"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1B1F27] lg:hidden"
                >
                  <List size={18} weight="bold" />
                </button>
              )}
              <Link to="/" className="flex items-center gap-2.5 no-underline">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#123A5C] font-glaze-display text-[15px] font-extrabold text-white">
                  G
                </span>
                <span className="font-glaze-display text-[16px] font-extrabold text-[#123A5C]">
                  Glaze
                </span>
                <HueTag hue="periwinkle" size="xs" className="hidden sm:inline-flex">
                  Registry v2
                </HueTag>
              </Link>
            </div>

            <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
              {TOP_NAV.map((item) => {
                const active = item.match(pathname)
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-[13px] font-semibold no-underline transition-colors',
                      active
                        ? 'bg-white text-[#123A5C] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                        : 'text-[#5B6170] hover:bg-white/60 hover:text-[#1B1F27]',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-white px-3.5 text-[13px] text-[#6B7280] transition-colors hover:bg-[#FAFBFD] hover:text-[#1B1F27]"
            >
              <MagnifyingGlass size={15} />
              <span className="hidden sm:inline">搜索...</span>
              <span className="sm:hidden">搜索</span>
              <kbd className="hidden rounded-md bg-[#F2F3F5] px-1.5 py-0.5 font-glaze-mono text-[11px] font-semibold text-[#5B6170] sm:inline">
                ⌘K
              </kbd>
            </button>

            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="打开 GitHub 仓库"
              title="GitHub: pengtikui/glaze-ui"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1B1F27] no-underline transition-colors hover:bg-[#FAFBFD] hover:text-[#123A5C]"
            >
              <GithubLogo size={17} weight="bold" />
            </a>

            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              title="打开机器可读 llms.txt 索引"
              className="hidden h-9 items-center gap-1.5 rounded-full bg-[#1B1F27] px-3.5 text-[12px] font-semibold text-white no-underline transition-colors hover:bg-[#2B313D] sm:inline-flex"
            >
              <Robot size={15} weight="bold" />
              <span>llms.txt</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Secondary Nav Bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-[#E5E8EE]/70 bg-[#EEF1F6]/90 px-4 py-2 md:hidden">
        {TOP_NAV.map((item) => {
          const active = item.match(pathname)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold no-underline',
                active ? 'bg-white text-[#123A5C]' : 'text-[#5B6170]',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
