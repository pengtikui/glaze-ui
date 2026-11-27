import * as React from 'react'
import { Check, Copy } from '@phosphor-icons/react'
import { cn } from 'cn'
import { useToast } from '@/components/ui/toast'

export interface CodeBlockProps {
  code: string
  highlightedHtml?: string
  language?: 'tsx' | 'ts' | 'bash' | 'json' | 'css' | 'markdown' | 'html' | 'text'
  filename?: string
  maxHeight?: number
  className?: string
}

const clientHighlightCache = new Map<string, string>()

export function CodeBlock({
  code,
  highlightedHtml,
  language = 'tsx',
  filename,
  maxHeight,
  className,
}: CodeBlockProps) {
  const toast = useToast()
  const [copied, setCopied] = React.useState(false)
  const trimmed = code.trim()
  const cacheKey = `${language}:${trimmed}`

  const [clientHtml, setClientHtml] = React.useState<string | null>(() => {
    if (highlightedHtml) return highlightedHtml
    return clientHighlightCache.get(cacheKey) ?? null
  })

  React.useEffect(() => {
    if (highlightedHtml) {
      setClientHtml(highlightedHtml)
      return
    }
    const cached = clientHighlightCache.get(cacheKey)
    if (cached) {
      setClientHtml(cached)
      return
    }
    let cancelled = false
    import('shiki/bundle/web')
      .then(({ codeToHtml }) =>
        codeToHtml(trimmed, {
          lang: language,
          theme: 'one-dark-pro',
        }),
      )
      .then((html) => {
        clientHighlightCache.set(cacheKey, html)
        if (!cancelled) setClientHtml(html)
      })
      .catch(() => {
        // Fallback to plain code if Shiki client load fails
      })
    return () => {
      cancelled = true
    }
  }, [highlightedHtml, cacheKey, trimmed, language])

  const handleCopy = () => {
    navigator.clipboard?.writeText(trimmed).catch(() => {})
    setCopied(true)
    toast({ title: '已复制代码', description: filename || language.toUpperCase(), status: 'normal' })
    window.setTimeout(() => setCopied(false), 1600)
  }

  const resolvedHtml = highlightedHtml ?? clientHtml

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[20px] bg-[#161922] text-[#E6EAF2]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="font-glaze-mono text-[12px] font-medium text-[#9CA3B5]">
            {filename || language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-[12px] font-medium text-[#D5DAE5] transition-colors hover:bg-white/14 hover:text-white"
        >
          {copied ? <Check size={13} weight="bold" className="text-[#93DAD3]" /> : <Copy size={13} />}
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
      {resolvedHtml ? (
        <div
          className="docs-codeblock-body docs-code-scroll overflow-auto"
          style={maxHeight ? { maxHeight } : undefined}
          dangerouslySetInnerHTML={{ __html: resolvedHtml }}
        />
      ) : (
        <pre
          className="docs-code-scroll m-0 overflow-auto p-4 font-glaze-mono text-[13px] leading-6 text-[#E6EAF2]"
          style={maxHeight ? { maxHeight } : undefined}
        >
          <code>{trimmed}</code>
        </pre>
      )}
    </div>
  )
}
