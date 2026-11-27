import * as React from 'react'
import { ArrowsClockwise, Code, Eye } from '@phosphor-icons/react'
import { cn } from 'cn'
import type { PreviewSurface } from '@/docs/examples/types'
import { CodeBlock } from './CodeBlock'

export interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  highlightedCodeHtml?: string
  filename?: string
  minHeight?: number
  align?: 'center' | 'start'
  surface?: PreviewSurface
  className?: string
}

export function ComponentPreview({
  children,
  code,
  highlightedCodeHtml,
  filename,
  minHeight = 200,
  align = 'center',
  surface = 'white',
  className,
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview')
  const [mountKey, setMountKey] = React.useState(0)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex rounded-full bg-[#E6E9F0] p-1">
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors',
              tab === 'preview'
                ? 'bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.08)]'
                : 'text-[#5B6170] hover:text-[#1B1F27]',
            )}
          >
            <Eye size={14} weight="bold" />
            <span>预览</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('code')}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors',
              tab === 'code'
                ? 'bg-white text-[#1B1F27] shadow-[0_1px_2px_rgba(16,24,40,0.08)]'
                : 'text-[#5B6170] hover:text-[#1B1F27]',
            )}
          >
            <Code size={14} weight="bold" />
            <span>代码</span>
          </button>
        </div>

        {tab === 'preview' && (
          <button
            type="button"
            onClick={() => setMountKey((k) => k + 1)}
            title="重置示例状态"
            className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[#5B6170] transition-colors hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
          >
            <ArrowsClockwise size={13} />
            <span>重置</span>
          </button>
        )}
      </div>

      {tab === 'preview' ? (
        <div
          key={mountKey}
          className={cn(
            'flex w-full rounded-[24px] p-6 sm:p-8',
            surface === 'white' && 'bg-white text-[#1B1F27]',
            surface === 'canvas' && 'bg-[#E9ECF2] text-[#1B1F27]',
            surface === 'dark' && 'bg-[#123A5C] text-white',
            align === 'center'
              ? 'items-center justify-center'
              : 'flex-col items-stretch justify-start',
          )}
          style={{ minHeight }}
        >
          {children}
        </div>
      ) : (
        <CodeBlock
          code={code}
          highlightedHtml={highlightedCodeHtml}
          language="tsx"
          filename={filename || 'example.tsx'}
          maxHeight={460}
        />
      )}
    </div>
  )
}
