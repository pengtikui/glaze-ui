import * as React from 'react'
import { AiArtifact } from '@/components/ui/ai-artifact'
import { AiCodeBlock } from '@/components/ui/ai-code-block'
import { AiContextMeter, AiModelSelector } from '@/components/ui/ai-context-meter'
import { AiSuggestion, AiSuggestions } from '@/components/ui/ai-suggestions'
import {
  Conversation,
  ConversationContent,
  Message,
  MessageContent,
} from '@/components/ui/conversation'
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ui/prompt-input'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ui/reasoning'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'

const SAMPLE_CODE = `import { Grid } from '@/components/ui/grid'
import { StatusCard } from '@/components/cards/status-card'
import { SparkAreaCard } from '@/components/cards/spark-area-card'

export function LiveMetricsStrip() {
  return (
    <Grid>
      <StatusCard label="边缘节点" statusText="在线" description="24/24 健康" tone="mint" />
      <SparkAreaCard label="QPS" value="54.2" unit="k" delta="+18%" points={[32, 39, 44, 49, 54]} tone="sky" />
    </Grid>
  )
}`

export function AiChatWorkbenchBlock() {
  const [model, setModel] = React.useState('glaze-pro')
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState<
    { role: 'user' | 'assistant'; text: string; reasoning?: string }[]
  >([
    {
      role: 'user',
      text: '帮我用 Glaze 卡片生成一个边缘监控指标带，要求无描边无阴影。',
    },
    {
      role: 'assistant',
      reasoning:
        '检查 Glaze 视觉规范：画布 #F2F4F8，卡片统一使用 <Tile> 与直接文件导入 @/components/cards/*。挑选 StatusCard 与 SparkAreaCard 组成指标行。',
      text: '已为你生成符合 Glaze 规范的 LiveMetricsStrip 组件代码，右侧可实时预览渲染效果与拷贝源码。',
    },
  ])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      {
        role: 'assistant',
        text: `已收到指令「${trimmed}」，已将更新后的代码同步至右侧产物面板。`,
      },
    ])
    setInput('')
  }

  return (
    <Tile tone="white" className="h-[560px] gap-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2.5">
          <span className="font-glaze-display text-[17px] font-extrabold text-[#123A5C]">
            AI 协作工作台
          </span>
          <AiModelSelector
            value={model}
            onValueChange={setModel}
            models={[
              { id: 'glaze-pro', name: 'Glaze Coder Pro', provider: 'Glaze', tag: '推荐', hue: 'periwinkle' },
              { id: 'glaze-fast', name: 'Glaze Flash', provider: 'Glaze', tag: '极速', hue: 'mint' },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <AiContextMeter
            usage={{
              usedTokens: 28400,
              maxTokens: 128000,
              inputTokens: 18200,
              cachedTokens: 6400,
              outputTokens: 3800,
              estimatedCost: '$0.04',
            }}
          />
          <StatusPill status="normal" label="实时同步" size="sm" />
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="52%" minSize="34%">
            <div className="flex h-full flex-col justify-between gap-3 rounded-inner bg-[#F6F7F9] p-3">
              <Conversation className="min-h-0 flex-1">
                <ConversationContent className="gap-3 px-2 py-2">
                  {messages.map((m, idx) => (
                    <Message key={idx} from={m.role}>
                      <MessageContent from={m.role}>
                        {m.reasoning && (
                          <Reasoning defaultOpen={false} duration={2} className="mb-2">
                            <ReasoningTrigger />
                            <ReasoningContent>{m.reasoning}</ReasoningContent>
                          </Reasoning>
                        )}
                        <div className="text-[13.5px] leading-relaxed">{m.text}</div>
                      </MessageContent>
                    </Message>
                  ))}
                </ConversationContent>
              </Conversation>

              <div className="flex flex-col gap-2">
                <AiSuggestions>
                  <AiSuggestion
                    suggestion="补充一个深色聚焦卡片"
                    onSelect={(s) => sendMessage(s)}
                  >
                    补充深色聚焦卡
                  </AiSuggestion>
                  <AiSuggestion
                    suggestion="接入 Recharts 面积趋势图"
                    onSelect={(s) => sendMessage(s)}
                  >
                    接入面积趋势图
                  </AiSuggestion>
                </AiSuggestions>

                <PromptInput onSubmit={() => sendMessage(input)}>
                  <PromptInputTextarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="描述你想要的组件调整或新增卡片…"
                  />
                  <PromptInputToolbar>
                    <PromptInputTools>
                      <span className="text-[11px] font-medium text-[#8A90A0]">
                        Enter 发送 · Shift+Enter 换行
                      </span>
                    </PromptInputTools>
                    <PromptInputSubmit disabled={!input.trim()} />
                  </PromptInputToolbar>
                </PromptInput>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle variant="gap" hue="periwinkle" />

          <ResizablePanel defaultSize="48%" minSize="32%">
            <AiArtifact
              title="LiveMetricsStrip.tsx"
              subtitle="Glaze React 19 产物"
              className="h-full"
              copyText={SAMPLE_CODE}
              preview={
                <div className="flex h-full flex-col justify-center gap-3 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-tile bg-[#E7F4E4] p-5 text-[#1E4B18]">
                      <div className="text-[12px] font-medium opacity-75">边缘节点</div>
                      <div className="mt-2 font-glaze-display text-[28px] font-extrabold">在线</div>
                      <div className="mt-1 text-[12px] opacity-80">24/24 健康</div>
                    </div>
                    <div className="rounded-tile bg-[#DDF0FB] p-5 text-[#123A5C]">
                      <div className="text-[12px] font-medium opacity-75">实时 QPS</div>
                      <div className="mt-2 font-glaze-display text-[28px] font-extrabold tabular-nums">
                        54.2k
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-[#2F6B28]">+18% 环比</div>
                    </div>
                  </div>
                </div>
              }
              code={<AiCodeBlock code={SAMPLE_CODE} language="tsx" variant="dark" />}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Tile>
  )
}
