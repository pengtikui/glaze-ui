import * as React from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Conversation,
  ConversationContent,
  Message,
  MessageContent,
} from '@/components/ui/conversation'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export interface ChatPreviewMessage {
  sender: string
  text: string
  mine?: boolean
  time: string
}

export interface ChatPreviewCardProps {
  channel: string
  messages: ChatPreviewMessage[]
  onlineLabel?: string
  tone?: TileTone
}

export function ChatPreviewCard({
  channel,
  messages,
  onlineLabel = '3 人在线',
  tone = 'white',
}: ChatPreviewCardProps) {
  const [list, setList] = React.useState(messages)
  const [draft, setDraft] = React.useState('')

  const handleSend = () => {
    if (!draft.trim()) return
    setList((prev) => [...prev, { sender: '我', text: draft.trim(), mine: true, time: '刚刚' }])
    setDraft('')
  }

  return (
    <Tile size="l" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-glaze-display text-[18px] font-extrabold">{channel}</span>
        <StatusPill status="normal" label={onlineLabel} size="sm" />
      </div>

      <Conversation className="min-h-0 flex-1 rounded-inner bg-[#F6F7F9]/75">
        <ConversationContent className="gap-3 px-3.5 py-3">
          {list.slice(-6).map((m, i) => (
            <Message key={i} from={m.mine ? 'user' : 'assistant'}>
              <MessageContent
                from={m.mine ? 'user' : 'assistant'}
                className="px-3.5 py-2 text-[13px] leading-snug"
              >
                <div>{m.text}</div>
                <div
                  className={
                    m.mine
                      ? 'mt-1 text-right text-[10px] text-white/65'
                      : 'mt-1 text-[10px] text-[#8A90A0]'
                  }
                >
                  {m.sender} · {m.time}
                </div>
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <div className="flex items-center gap-2">
        <Input
          inputSize="sm"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="快速回复一条消息…"
        />
        <Button size="icon" variant="primary" onClick={handleSend} aria-label="发送">
          <PaperPlaneTilt size={16} weight="fill" />
        </Button>
      </div>
    </Tile>
  )
}
