import * as React from 'react'
import { Check, Copy, TerminalWindow } from '@phosphor-icons/react'
import { cn } from 'cn'
import { useToast } from '@/components/ui/toast'

type Pm = 'pnpm' | 'npm' | 'yarn' | 'bun'

const PM_PREFIX: Record<Pm, string> = {
  pnpm: 'pnpm dlx',
  npm: 'npx',
  yarn: 'yarn dlx',
  bun: 'bunx --bun',
}

export interface CliCommandProps {
  /** Command arguments after runner, e.g. "shadcn@latest add @glaze/button" */
  command: string
  className?: string
  compact?: boolean
}

export function CliCommand({ command, className, compact = false }: CliCommandProps) {
  const toast = useToast()
  const [pm, setPm] = React.useState<Pm>('pnpm')
  const [copied, setCopied] = React.useState(false)

  const fullCommand = `${PM_PREFIX[pm]} ${command}`

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullCommand).catch(() => {})
    setCopied(true)
    toast({ title: '已复制安装命令', description: fullCommand, status: 'normal' })
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[20px] bg-[#161922] text-[#E6EAF2]',
        className,
      )}
    >
      {!compact && (
        <div className="flex items-center justify-between border-b border-white/8 px-3.5 py-2">
          <div className="flex items-center gap-1">
            <TerminalWindow size={14} className="mr-1.5 text-[#8A90A0]" />
            {(['pnpm', 'npm', 'yarn', 'bun'] as Pm[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPm(item)}
                className={cn(
                  'cursor-pointer rounded-full px-2.5 py-1 font-glaze-mono text-[11px] font-semibold transition-colors',
                  pm === item
                    ? 'bg-white/14 text-white'
                    : 'text-[#8A90A0] hover:text-[#D5DAE5]',
                )}
              >
                {item}
              </button>
            ))}
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
      )}

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <code className="docs-code-scroll overflow-x-auto font-glaze-mono text-[13px] whitespace-nowrap text-[#E6EAF2]">
          <span className="text-[#93DAD3]">{PM_PREFIX[pm]}</span>{' '}
          <span className="text-[#E6EAF2]">{command}</span>
        </code>
        {compact && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="复制命令"
            className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-[#D5DAE5] hover:bg-white/20 hover:text-white"
          >
            {copied ? <Check size={13} weight="bold" className="text-[#93DAD3]" /> : <Copy size={13} />}
          </button>
        )}
      </div>
    </div>
  )
}
