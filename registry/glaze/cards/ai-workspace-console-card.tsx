import * as React from 'react'
import { AiArtifact, AiFileTree, type AiFileTreeNode } from '@/components/ui/ai-artifact'
import { AiCodeBlock, AiTerminal } from '@/components/ui/ai-code-block'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export interface AiWorkspaceFileEntry {
  path: string
  language: string
  code: string
  diff?: boolean
}

export interface AiWorkspaceConsoleCardProps {
  title?: string
  subtitle?: string
  tree: AiFileTreeNode[]
  files: Record<string, AiWorkspaceFileEntry>
  defaultPath: string
  terminalCommand?: string
  terminalOutput?: string
  tone?: TileTone
}

export function AiWorkspaceConsoleCard({
  title = 'AI 代码产物与工作区',
  subtitle = '文件变更树 · 实时差异审查 · 终端构建验证',
  tree,
  files,
  defaultPath,
  terminalCommand = 'pnpm run typecheck && pnpm test',
  terminalOutput = '✓ 12 AI Elements compiled cleanly\n✓ 0 TypeScript diagnostics\n✓ 42/42 assertions passed in 1.18s',
  tone = 'white',
}: AiWorkspaceConsoleCardProps) {
  const [selectedPath, setSelectedPath] = React.useState(defaultPath)
  const activeFile = files[selectedPath] ?? Object.values(files)[0]

  return (
    <Tile size="f" tone={tone} className="gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="font-glaze-display text-[19px] font-extrabold">{title}</span>
          <p className="m-0 mt-0.5 text-[13px] text-[#6B7280]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <HueTag hue="mint" size="sm">
            +3 新增
          </HueTag>
          <HueTag hue="peach" size="sm">
            1 修改
          </HueTag>
          <StatusPill status="normal" label="测试通过" size="sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-4">
          <AiFileTree
            nodes={tree}
            selectedPath={selectedPath}
            onSelectPath={(p) => {
              if (files[p]) setSelectedPath(p)
            }}
            defaultExpanded={['registry', 'registry/ai']}
          />
          <AiTerminal
            command={terminalCommand}
            output={terminalOutput}
            status="success"
            exitCode={0}
            maxHeight={160}
          />
        </div>

        <div className="lg:col-span-8">
          {activeFile && (
            <AiArtifact
              title={activeFile.path.split('/').pop() ?? activeFile.path}
              subtitle={activeFile.path}
              badge={activeFile.language.toUpperCase()}
              copyText={activeFile.code}
              className="bg-[#F6F7F9]/60"
              code={
                <AiCodeBlock
                  code={activeFile.code}
                  language={activeFile.language}
                  filename={activeFile.path}
                  diff={activeFile.diff}
                  maxHeight={300}
                />
              }
            />
          )}
        </div>
      </div>
    </Tile>
  )
}
