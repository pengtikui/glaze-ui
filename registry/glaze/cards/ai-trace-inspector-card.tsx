import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
  type ChainStepStatus,
} from '@/components/ui/chain-of-thought'
import { HueTag } from '@/components/ui/hue-tag'
import { Tile } from '@/components/ui/tile'
import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
  type ToolCallState,
} from '@/components/ui/tool-call'
import type { TileTone } from '@/lib/tokens'

export interface AiTraceStepItem {
  id: string
  label: string
  description?: string
  status: ChainStepStatus
  duration?: string
  links?: { label: string; href: string }[]
}

export interface AiTraceToolItem {
  name: string
  title?: string
  state: ToolCallState
  duration?: string
  input: unknown
  output?: unknown
  errorText?: string
}

export interface AiTraceInspectorCardProps {
  title?: string
  summary?: string
  steps: AiTraceStepItem[]
  toolCall?: AiTraceToolItem
  tone?: TileTone
}

export function AiTraceInspectorCard({
  title = '智能体执行链路',
  summary = '已完成 3 步调研',
  steps,
  toolCall,
  tone = 'white',
}: AiTraceInspectorCardProps) {
  return (
    <Tile size="l" tone={tone} className="justify-start gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-glaze-display text-[17px] font-extrabold">{title}</span>
        <HueTag hue="periwinkle" size="xs">
          Trace
        </HueTag>
      </div>

      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader
          badge={
            <HueTag hue="mint" size="xs">
              {steps.length} 步
            </HueTag>
          }
        >
          {summary}
        </ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          {steps.map((step) => (
            <ChainOfThoughtStep
              key={step.id}
              label={step.label}
              description={step.description}
              status={step.status}
              duration={step.duration}
            >
              {step.links && step.links.length > 0 && (
                <ChainOfThoughtSearchResults>
                  {step.links.map((link) => (
                    <ChainOfThoughtSearchResult key={link.label} href={link.href}>
                      {link.label}
                    </ChainOfThoughtSearchResult>
                  ))}
                </ChainOfThoughtSearchResults>
              )}
            </ChainOfThoughtStep>
          ))}
        </ChainOfThoughtContent>
      </ChainOfThought>

      {toolCall && (
        <ToolCall defaultOpen={false}>
          <ToolCallHeader
            name={toolCall.name}
            title={toolCall.title}
            state={toolCall.state}
            duration={toolCall.duration}
          />
          <ToolCallContent>
            <ToolCallInput input={toolCall.input} />
            <ToolCallOutput output={toolCall.output} errorText={toolCall.errorText} />
          </ToolCallContent>
        </ToolCall>
      )}
    </Tile>
  )
}
