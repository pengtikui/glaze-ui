import * as React from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export function ChatPreviewCard({
  channel,
  messages,
  tone = 'white',
}: {
  channel: string
  messages: { sender: string; text: string; mine?: boolean; time: string }[]
  tone?: TileTone
}) {
  const [list, setList] = React.useState(messages)
  const [draft, setDraft] = React.useState('')

  const handleSend = () => {
    if (!draft.trim()) return
    setList((prev) => [...prev, { sender: '我', text: draft.trim(), mine: true, time: '刚刚' }])
    setDraft('')
  }

  return (
    <Tile size="l" tone={tone} className="justify-between gap-3">
      <div className="flex items-center justify-between">
        <span className="font-glaze-display text-[18px] font-extrabold">{channel}</span>
        <StatusPill status="normal" label="3 人在线" size="sm" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto py-1">
        {list.slice(-4).map((m, i) => (
          <div key={i} className={`flex flex-col ${m.mine ? 'items-end' : 'items-start'}`}>
            <div
              className="max-w-[82%] rounded-inner px-3.5 py-2 text-[13px] leading-snug"
              style={{
                backgroundColor: m.mine ? '#1B1F27' : '#F2F3F5',
                color: m.mine ? '#FFFFFF' : '#1B1F27',
              }}
            >
              {m.text}
            </div>
            <span className="mt-1 px-1 text-[10px] text-[#8A90A0]">
              {m.sender} · {m.time}
            </span>
          </div>
        ))}
      </div>
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
