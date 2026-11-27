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

const RouterContext = React.createContext<RouterContextValue>({
  pathname: '/',
  hash: '',
  navigate: (to) => {
    if (typeof window !== 'undefined') {
      window.location.assign(to)
    }
  },
})

export function RouterProvider({
  children,
  pathname: initialPathname,
}: {
  children: React.ReactNode
  pathname?: string
}) {
  const [pathname] = React.useState(() => {
    if (initialPathname) return normalizePath(initialPathname)
    if (typeof window !== 'undefined') return normalizePath(window.location.pathname)
    return '/'
  })
  const [hash, setHash] = React.useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '',
  )

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = React.useCallback((to: string, opts?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return
    if (opts?.replace) {
      window.location.replace(to)
    } else {
      window.location.assign(to)
    }
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
