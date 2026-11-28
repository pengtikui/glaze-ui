import * as React from 'react'
import { cn } from 'cn'
import { Drawer } from '@/components/ui/drawer'
import { GlazeProviders } from '@/docs/components/GlazeProviders'
import { SiteHeader } from '@/docs/components/SiteHeader'
import { COMPONENT_CATEGORIES, COMPONENTS_LIST } from '@/docs/data/catalog'
import { useRouter } from '@/docs/router'

export interface DocsNavItem {
  label: string
  to: string
}

export interface SiteHeaderIslandProps {
  pathname: string
  showMobileMenuButton?: boolean
  docsNav?: DocsNavItem[]
}

function SiteHeaderShell({
  showMobileMenuButton = false,
  docsNav = [],
}: {
  showMobileMenuButton?: boolean
  docsNav?: DocsNavItem[]
}) {
  const { pathname } = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      <SiteHeader
        showMobileMenuButton={showMobileMenuButton}
        onOpenMobileMenu={() => setMobileOpen(true)}
      />
      {showMobileMenuButton && (
        <Drawer
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          side="right"
          title="Glaze 文档导航"
          description={`Markdown 文档与 ${COMPONENTS_LIST.length} 个组件`}
        >
          <div className="flex flex-col gap-6 pb-12">
            {docsNav.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="px-3 text-[11px] font-bold tracking-[0.06em] text-[#8A90A0] uppercase">
                  起步指南
                </span>
                {docsNav.map((item) => {
                  const active = pathname === item.to
                  return (
                    <a
                      key={item.to}
                      href={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'rounded-[12px] px-3 py-1.5 text-[13px] no-underline transition-colors',
                        active
                          ? 'bg-white font-bold text-[#123A5C]'
                          : 'font-medium text-[#5B6170] hover:bg-white/60 hover:text-[#1B1F27]',
                      )}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            )}

            {COMPONENT_CATEGORIES.map((cat) => {
              const items = COMPONENTS_LIST.filter((c) => c.category === cat.id)
              return (
                <div key={cat.id} className="flex flex-col gap-0.5">
                  <span className="mb-1 px-3 text-[11px] font-bold tracking-[0.06em] text-[#8A90A0] uppercase">
                    {cat.title} ({items.length})
                  </span>
                  {items.map((c) => {
                    const to = `/docs/components/${c.slug}`
                    const active = pathname === to
                    return (
                      <a
                        key={c.slug}
                        href={to}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-[12px] px-3 py-1.5 text-[13px] no-underline transition-colors',
                          active
                            ? 'bg-white font-bold text-[#123A5C]'
                            : 'font-medium text-[#5B6170] hover:bg-white/60 hover:text-[#1B1F27]',
                        )}
                      >
                        <span className="truncate">{c.title}</span>
                        <span className="shrink-0 text-[11px] text-[#8A90A0]">{c.cnTitle}</span>
                      </a>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </Drawer>
      )}
    </>
  )
}

export function SiteHeaderIsland({
  pathname,
  showMobileMenuButton = false,
  docsNav = [],
}: SiteHeaderIslandProps) {
  return (
    <GlazeProviders pathname={pathname}>
      <SiteHeaderShell showMobileMenuButton={showMobileMenuButton} docsNav={docsNav} />
    </GlazeProviders>
  )
}
