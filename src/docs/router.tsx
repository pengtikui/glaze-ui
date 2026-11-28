import * as React from 'react'

export interface RouterContextValue {
  pathname: string
  hash: string
  navigate: (to: string, opts?: { replace?: boolean }) => void
}

function normalizePath(p: string) {
  const clean = p.replace(/\/+$/, '')
  return clean || '/'
}

async function performClientNavigate(to: string, replace?: boolean) {
  if (typeof window === 'undefined') return
  try {
    const mod = await import('astro:transitions/client')
    if (typeof mod.navigate === 'function') {
      await mod.navigate(to, { history: replace ? 'replace' : 'push' })
      return
    }
  } catch {
    // Fall back to standard browser navigation when ClientRouter is unavailable
  }
  if (replace) {
    window.location.replace(to)
  } else {
    window.location.assign(to)
  }
}

const RouterContext = React.createContext<RouterContextValue>({
  pathname: '/',
  hash: '',
  navigate: (to, opts) => {
    void performClientNavigate(to, opts?.replace)
  },
})

export function RouterProvider({
  children,
  pathname: initialPathname,
}: {
  children: React.ReactNode
  pathname?: string
}) {
  const [pathname, setPathname] = React.useState(() => {
    if (initialPathname) return normalizePath(initialPathname)
    if (typeof window !== 'undefined') return normalizePath(window.location.pathname)
    return '/'
  })
  const [hash, setHash] = React.useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '',
  )

  React.useEffect(() => {
    const syncLocation = () => {
      setPathname(normalizePath(window.location.pathname))
      setHash(window.location.hash)
    }
    const onHash = () => setHash(window.location.hash)

    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', syncLocation)
    document.addEventListener('astro:after-swap', syncLocation)
    document.addEventListener('astro:page-load', syncLocation)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', syncLocation)
      document.removeEventListener('astro:after-swap', syncLocation)
      document.removeEventListener('astro:page-load', syncLocation)
    }
  }, [])

  const navigate = React.useCallback((to: string, opts?: { replace?: boolean }) => {
    void performClientNavigate(to, opts?.replace)
  }, [])

  const value = React.useMemo(
    () => ({ pathname, hash, navigate }),
    [pathname, hash, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  return React.useContext(RouterContext)
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  external?: boolean
}

export function Link({ to, external, target, rel, ...props }: LinkProps) {
  const resolvedTarget = target ?? (external ? '_blank' : undefined)
  return (
    <a
      href={to}
      target={resolvedTarget}
      rel={resolvedTarget === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
      {...props}
    />
  )
}
