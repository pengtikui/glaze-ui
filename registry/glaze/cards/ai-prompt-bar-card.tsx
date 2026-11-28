import * as React from 'react'
import { Brain, Globe } from '@phosphor-icons/react'
import { AiModelSelector, type AiModelOption } from '@/components/ui/ai-context-meter'
import { AiSuggestion, AiSuggestions } from '@/components/ui/ai-suggestions'
import {
  PromptInput,
  PromptInputAction,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ui/prompt-input'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

const DEFAULT_MODELS: AiModelOption[] = [
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro', provider: 'Google', contextWindow: '1M', tag: '推理', hue: 'periwinkle' },
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', provider: 'Anthropic', contextWindow: '200k', tag: '编程', hue: 'peach' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'OpenAI', contextWindow: '128k', tag: '极速', hue: 'mint' },
]

export interface AiPromptBarCardProps {
  title?: string
  placeholder?: string
  suggestions?: string[]
  models?: AiModelOption[]
  onSubmitPrompt?: (prompt: string, opts: { model: string; deepThink: boolean; webSearch: boolean }) => void
  tone?: TileTone
}

export function AiPromptBarCard({
  title = '向 Glaze AI 提问',
  placeholder = '描述需求、分析指标或生成组件代码…',
  suggestions = ['排查线上延迟毛刺', '生成本周营收摘要', '编写单元测试'],
  models = DEFAULT_MODELS,
  onSubmitPrompt,
  tone = 'white',
}: AiPromptBarCardProps) {
  const [value, setValue] = React.useState('')
  const [model, setModel] = React.useState(models[0]?.id ?? 'gemini-3-pro')
  const [deepThink, setDeepThink] = React.useState(true)
  const [webSearch, setWebSearch] = React.useState(false)
  const [lastSent, setLastSent] = React.useState<string | null>(null)

  const submit = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setLastSent(trimmed)
    setValue('')
    onSubmitPrompt?.(trimmed, { model, deepThink, webSearch })
  }

  return (
    <Tile size="w" tone={tone} className="justify-between gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        {lastSent && (
          <span className="max-w-[240px] truncate rounded-full bg-[#E4E6FD] px-2.5 py-0.5 text-[11px] font-semibold text-[#262B7A]">
            已发送：{lastSent}
          </span>
        )}
      </div>

      <PromptInput surface={tone === 'white' ? 'soft' : 'white'} onSubmit={() => submit(value)}>
        <PromptInputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          maxRows={3}
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <AiModelSelector
              models={models}
              value={model}
              onValueChange={setModel}
              surface={tone === 'white' ? 'white' : 'soft'}
            />
            <PromptInputAction
              active={deepThink}
              hue="lilac"
              icon={<Brain size={13} weight="duotone" />}
              onClick={() => setDeepThink((v) => !v)}
            >
              思考
            </PromptInputAction>
            <PromptInputAction
              active={webSearch}
              hue="sky"
              icon={<Globe size={13} weight="bold" />}
              onClick={() => setWebSearch((v) => !v)}
            >
              联网
            </PromptInputAction>
          </PromptInputTools>
          <PromptInputSubmit disabled={!value.trim()} />
        </PromptInputToolbar>
      </PromptInput>

      <AiSuggestions layout="scroll">
        {suggestions.map((s) => (
          <AiSuggestion key={s} suggestion={s} onSelect={(text) => submit(text)} />
        ))}
      </AiSuggestions>
    </Tile>
  )
}
