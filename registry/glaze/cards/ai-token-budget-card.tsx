import { Sparkle } from '@phosphor-icons/react'
import { AiContextMeter, type AiContextUsage } from '@/components/ui/ai-context-meter'
import { Progress } from '@/components/ui/progress'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type Hue, type TileTone } from '@/lib/tokens'

export interface AiTokenBudgetCardProps {
  label?: string
  usage: AiContextUsage
  cacheHitRate?: string
  hue?: Hue
  tone?: TileTone
}

export function AiTokenBudgetCard({
  label = '上下文窗口',
  usage,
  cacheHitRate = '64%',
  hue = 'periwinkle',
  tone = 'white',
}: AiTokenBudgetCardProps) {
  const theme = TILE_THEMES[tone]
  const pct = Math.min(100, Math.round((usage.usedTokens / Math.max(1, usage.maxTokens)) * 100))

  return (
    <Tile size="s" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkle size={14} weight="duotone" style={{ color: theme.accent }} />
          <span className="text-[13px] font-semibold" style={{ color: theme.soft }}>
            {label}
          </span>
        </div>
        <AiContextMeter usage={usage} surface={tone === 'white' ? 'soft' : 'white'} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-glaze-display text-[36px] leading-none font-extrabold tracking-[-0.03em]">
            {(usage.usedTokens / 1000).toFixed(1)}k
          </span>
          <span className="text-[13px] font-semibold" style={{ color: theme.soft }}>
            / {Math.round(usage.maxTokens / 1000)}k
          </span>
        </div>
        <span className="text-[12px]" style={{ color: theme.soft }}>
          缓存命中 {cacheHitRate} · {usage.estimatedCost ?? '$0.18'}
        </span>
      </div>

      <Progress value={pct} hue={hue} height="sm" />
    </Tile>
  )
}
