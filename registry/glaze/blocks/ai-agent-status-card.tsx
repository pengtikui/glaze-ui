import { Robot } from '@phosphor-icons/react'
import { HueTag } from '@/components/ui/hue-tag'
import { StatusDot } from '@/components/ui/status-dot'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type Status, type TileTone } from '@/lib/tokens'

export interface AiAgentStatusCardProps {
  agentName: string
  modelName: string
  status?: Status
  statusText?: string
  activeSubagents?: number
  ttft?: string
  hue?: Hue
  tone?: TileTone
}

export function AiAgentStatusCard({
  agentName,
  modelName,
  status = 'normal',
  statusText = '推理中',
  activeSubagents = 3,
  ttft = '0.42s',
  hue = 'mint',
  tone = 'mint',
}: AiAgentStatusCardProps) {
  const theme = TILE_THEMES[tone]

  return (
    <Tile size="s" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Robot size={16} weight="duotone" style={{ color: theme.ink }} />
          <span className="truncate text-[13px] font-bold" style={{ color: theme.soft }}>
            {agentName}
          </span>
        </div>
        <StatusDot status={status} animated size="md" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-glaze-display text-[28px] leading-tight font-extrabold tracking-[-0.02em]">
          {statusText}
        </span>
        <span className="truncate font-glaze-mono text-[12px]" style={{ color: theme.soft }}>
          {modelName}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <HueTag hue={hue} size="xs" tone={theme.dark ? 'solid' : 'neutral'}>
          {activeSubagents} 子智能体
        </HueTag>
        <span className="font-glaze-mono text-[11.5px] font-semibold" style={{ color: theme.soft }}>
          TTFT {ttft}
        </span>
      </div>
    </Tile>
  )
}
