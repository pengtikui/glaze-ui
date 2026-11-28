import * as React from 'react'
import { Sparkle } from '@phosphor-icons/react'
import {
  Conversation,
  ConversationContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageQuickToolbar,
} from '@/components/ui/conversation'
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  type PromptInputStatus,
} from '@/components/ui/prompt-input'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ui/reasoning'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export interface AiAssistantTurn {
  id: string
  role: 'user' | 'assistant'
  text: string
  reasoning?: string
  duration?: number
}

export interface AiAssistantCardProps {
  title?: string
  modelLabel?: string
  initialTurns?: AiAssistantTurn[]
  tone?: TileTone
}

const DEFAULT_TURNS: AiAssistantTurn[] = [
  {
    id: 'm1',
    role: 'user',
    text: '帮我分析下今天集群 P99 延迟为什么升高了？',
  },
  {
    id: 'm2',
    role: 'assistant',
    reasoning:
      '1. 检索过去 4 小时网关与数据库指标。\n2. 发现 10:15 起 ap-east-1 节点缓存命中率由 94% 跌至 61%。\n3. 关联发布记录，确认新版本批量索引任务触发了连接池排队。',
    duration: 2.4,
    text: 'P99 延迟升高主要由 10:15 上线的批量重建索引任务导致 Redis 缓存命中率下降（94% → 61%），建议将重建任务限速至 200 req/s 并开启读副本分流。',
  },
]

export function AiAssistantCard({
  title = 'AI 运维副驾驶',
  modelLabel = 'Gemini 3 Pro',
  initialTurns = DEFAULT_TURNS,
  tone = 'white',
}: AiAssistantCardProps) {
  const [turns, setTurns] = React.useState<AiAssistantTurn[]>(initialTurns)
  const [draft, setDraft] = React.useState('')
  const [status, setStatus] = React.useState<PromptInputStatus>('ready')
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const handleSend = () => {
    const text = draft.trim()
    if (!text || status === 'streaming') return
    const userId = `u-${Date.now()}`
    setTurns((prev) => [...prev, { id: userId, role: 'user', text }])
    setDraft('')
    setStatus('streaming')

    timerRef.current = window.setTimeout(() => {
      setTurns((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          reasoning: `正在解析问题「${text}」并关联当前集群上下文指标与最近变更记录。`,
          duration: 1.3,
          text: `已收到你的指令「${text}」。已为你生成可执行建议与风险核查清单，可直接在右侧终端或工作台中一键应用。`,
        },
      ])
      setStatus('ready')
    }, 850)
  }

  return (
    <Tile size="l" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#E4E6FD] text-[#4A4FB8]">
            <Sparkle size={15} weight="duotone" />
          </span>
          <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        </div>
        <StatusPill
          status={status === 'streaming' ? 'info' : 'normal'}
          label={status === 'streaming' ? '思考中' : modelLabel}
          size="sm"
        />
      </div>

      <Conversation className="max-h-[260px] min-h-[200px] rounded-inner bg-[#F6F7F9]/60">
        <ConversationContent className="gap-3.5 px-3 py-3">
          {turns.map((turn) => (
            <Message key={turn.id} from={turn.role}>
              <MessageAvatar from={turn.role} />
              <MessageContent from={turn.role}>
                {turn.reasoning && (
                  <Reasoning duration={turn.duration} defaultOpen={false}>
                    <ReasoningTrigger />
                    <ReasoningContent>{turn.reasoning}</ReasoningContent>
                  </Reasoning>
                )}
                <p className="m-0 text-[13px] leading-relaxed">{turn.text}</p>
                {turn.role === 'assistant' && <MessageQuickToolbar textToCopy={turn.text} />}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <PromptInput surface="soft" onSubmit={handleSend}>
        <PromptInputTextarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="继续追问或下发排查指令…"
          maxRows={2}
        />
        <PromptInputToolbar>
          <span className="text-[11px] text-[#8A90A0]">Enter 发送 · 支持推理折叠</span>
          <PromptInputSubmit
            status={status}
            disabled={!draft.trim()}
            onStop={() => {
              if (timerRef.current) window.clearTimeout(timerRef.current)
              setStatus('ready')
            }}
          />
        </PromptInputToolbar>
      </PromptInput>
    </Tile>
  )
}
