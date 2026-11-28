import * as React from 'react'
import { Check, Code, Copy, TerminalWindow, TextAlignLeft } from '@phosphor-icons/react'
import { cn } from 'cn'
import { StatusPill } from '@/components/ui/status-pill'
import { PRESS_CLASS } from '@/lib/motion'

export interface AiCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  /** Highlight +/- unified diff lines */
  diff?: boolean
  /** Surface variant: light (inside white/pastel card) or dark (ink terminal style) */
  variant?: 'light' | 'dark'
  maxHeight?: number
}

export function AiCodeBlock({
  code,
  language = 'tsx',
  filename,
  showLineNumbers = true,
  diff = false,
  variant = 'light',
  maxHeight = 360,
  className,
  ...props
}: AiCodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [wrap, setWrap] = React.useState(false)
  const lines = React.useMemo(() => code.replace(/\n$/, '').split('\n'), [code])

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const isDark = variant === 'dark'

  return (
    <div
      data-variant={variant}
      className={cn(
        'w-full overflow-hidden rounded-inner',
        isDark ? 'bg-[#1B1F27] text-[#F2F4F8]' : 'bg-[#F6F7F9] text-[#1B1F27]',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 px-3.5 py-2',
          isDark ? 'border-b border-white/10' : 'border-b border-[#E8EBF0]',
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <Code size={14} weight="bold" className={isDark ? 'text-[#B5BAF6]' : 'text-[#4A4FB8]'} />
          <span
            className={cn(
              'truncate font-glaze-mono text-[12px] font-semibold',
              isDark ? 'text-[#C5CAD3]' : 'text-[#5B6170]',
            )}
          >
            {filename ?? language}
          </span>
          {filename && (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 font-glaze-mono text-[10px] font-bold uppercase',
                isDark ? 'bg-white/10 text-[#B5BAF6]' : 'bg-white text-[#6B7280]',
              )}
            >
              {language}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setWrap((w) => !w)}
            aria-label="切换自动换行"
            className={cn(
              'inline-flex h-7 cursor-pointer items-center gap-1 rounded-full px-2 text-[11px] font-semibold outline-none',
              PRESS_CLASS,
              isDark
                ? wrap
                  ? 'bg-white/20 text-white'
                  : 'text-[#C5CAD3] hover:bg-white/10'
                : wrap
                  ? 'bg-[#E4E6FD] text-[#262B7A]'
                  : 'text-[#6B7280] hover:bg-white',
            )}
          >
            <TextAlignLeft size={12} weight="bold" />
            <span className="hidden sm:inline">{wrap ? '不换行' : '换行'}</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'inline-flex h-7 cursor-pointer items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold outline-none',
              PRESS_CLASS,
              isDark
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white text-[#1B1F27] hover:bg-[#E8EBF0]',
            )}
          >
            {copied ? <Check size={12} weight="bold" /> : <Copy size={12} />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
        </div>
      </div>

      <div
        className="overflow-auto px-3 py-3 font-glaze-mono text-[12.5px] leading-[1.6]"
        style={{ maxHeight }}
      >
        <div className={cn('min-w-max', wrap && 'min-w-0')}>
          {lines.map((line, i) => {
            const isAdd = diff && line.startsWith('+') && !line.startsWith('+++')
            const isDel = diff && line.startsWith('-') && !line.startsWith('---')
            return (
              <div
                key={i}
                className={cn(
                  'flex rounded-[6px] px-1.5',
                  wrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre',
                  isAdd && (isDark ? 'bg-[#49A851]/20 text-[#B2DE9F]' : 'bg-[#E2F5DA] text-[#173F12]'),
                  isDel && (isDark ? 'bg-[#E5603B]/20 text-[#F7B39C]' : 'bg-[#FDE5DC] text-[#A6360F]'),
                )}
              >
                {showLineNumbers && (
                  <span
                    className={cn(
                      'mr-3 inline-block w-6 shrink-0 text-right text-[11px] select-none',
                      isDark ? 'text-white/30' : 'text-[#8A90A0]',
                    )}
                  >
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">{line || ' '}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export interface AiTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string
  output: string
  status?: 'running' | 'success' | 'error'
  exitCode?: number
  cwd?: string
  maxHeight?: number
}

export function AiTerminal({
  command,
  output,
  status = 'success',
  exitCode,
  cwd = '~/workspace/glaze-ui',
  maxHeight = 260,
  className,
  ...props
}: AiTerminalProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    const text = command ? `$ ${command}\n${output}` : output
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={cn('w-full overflow-hidden rounded-inner bg-[#1B1F27] text-[#F2F4F8]', className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3.5 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <TerminalWindow size={14} weight="duotone" className="shrink-0 text-[#93DAD3]" />
          <span className="truncate font-glaze-mono text-[11.5px] font-semibold text-[#C5CAD3]">
            {cwd}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {status === 'running' && <StatusPill status="info" label="运行中" size="sm" />}
          {status === 'success' && (
            <StatusPill
              status="normal"
              label={exitCode !== undefined ? `exit ${exitCode}` : '完成'}
              size="sm"
            />
          )}
          {status === 'error' && (
            <StatusPill
              status="error"
              label={exitCode !== undefined ? `exit ${exitCode}` : '失败'}
              size="sm"
            />
          )}
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-white/10 px-2 text-[11px] font-semibold text-white hover:bg-white/20',
              PRESS_CLASS,
            )}
          >
            {copied ? <Check size={11} weight="bold" /> : <Copy size={11} />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
        </div>
      </div>

      <div
        className="overflow-auto px-3.5 py-3 font-glaze-mono text-[12px] leading-relaxed"
        style={{ maxHeight }}
      >
        {command && (
          <div className="mb-1.5 flex items-baseline gap-2 text-[#B5BAF6]">
            <span className="select-none text-[#93DAD3]">$</span>
            <span className="font-semibold text-white">{command}</span>
          </div>
        )}
        <pre className="m-0 whitespace-pre-wrap text-[#C5CAD3]">
          {output}
          {status === 'running' && (
            <span
              aria-hidden="true"
              className="animate-glaze-caret ml-1 inline-block h-3.5 w-1.5 bg-[#93DAD3] align-middle"
            />
          )}
        </pre>
      </div>
    </div>
  )
}
