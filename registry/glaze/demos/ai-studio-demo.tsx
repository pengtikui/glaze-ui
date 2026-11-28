import * as React from 'react'
import {
  Brain,
  ChatCircleDots,
  Globe,
  Paperclip,
  Plus,
  Robot,
  SidebarSimple,
  Sparkle,
  SquaresFour,
} from '@phosphor-icons/react'
import { AiAgentStatusCard } from '@/components/blocks/ai-agent-status-card'
import { AiApprovalCard } from '@/components/blocks/ai-approval-card'
import { AiAssistantCard } from '@/components/blocks/ai-assistant-card'
import { AiModelEvalCard, type AiModelEvalRow } from '@/components/blocks/ai-model-eval-card'
import { AiPlanQueueCard } from '@/components/blocks/ai-plan-queue-card'
import { AiPromptBarCard } from '@/components/blocks/ai-prompt-bar-card'
import { AiSourcesCard } from '@/components/blocks/ai-sources-card'
import { AiTokenBudgetCard } from '@/components/blocks/ai-token-budget-card'
import { AiTraceInspectorCard } from '@/components/blocks/ai-trace-inspector-card'
import {
  AiWorkspaceConsoleCard,
  type AiWorkspaceFileEntry,
} from '@/components/blocks/ai-workspace-console-card'
import {
  AiArtifact,
  AiCheckpoint,
  AiFileTree,
  type AiFileTreeNode,
} from '@/components/ui/ai-artifact'
import { AiCodeBlock, AiTerminal } from '@/components/ui/ai-code-block'
import {
  AiConfirmation,
  type AiConfirmationState,
} from '@/components/ui/ai-confirmation'
import {
  AiContextMeter,
  AiModelSelector,
  type AiContextUsage,
  type AiModelOption,
} from '@/components/ui/ai-context-meter'
import {
  AiPlan,
  AiPlanContent,
  AiPlanHeader,
  AiPlanStep,
  type AiPlanStepItem,
} from '@/components/ui/ai-plan'
import {
  AiSourceItem,
  AiSources,
  AiSourcesContent,
  AiSourcesTrigger,
  InlineCitation,
  type AiSourceEntry,
} from '@/components/ui/ai-sources'
import {
  AiQueue,
  AiSuggestion,
  AiSuggestions,
  type AiQueueTask,
} from '@/components/ui/ai-suggestions'
import { Button } from '@/components/ui/button'
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ui/chain-of-thought'
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  Message,
  MessageAvatar,
  MessageBranch,
  MessageContent,
  MessageQuickToolbar,
} from '@/components/ui/conversation'
import { Grid } from '@/components/ui/grid'
import { HueTag } from '@/components/ui/hue-tag'
import {
  PromptInput,
  PromptInputAction,
  PromptInputAttachments,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptAttachmentItem,
  type PromptInputStatus,
} from '@/components/ui/prompt-input'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ui/reasoning'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusDot } from '@/components/ui/status-dot'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'
import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
} from '@/components/ui/tool-call'

const STUDIO_MODELS: AiModelOption[] = [
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google DeepMind',
    contextWindow: '1M',
    tag: '推理',
    hue: 'periwinkle',
    description: '适合复杂架构规划、长上下文代码库分析与多步工具编排',
  },
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    provider: 'Anthropic',
    contextWindow: '200k',
    tag: '编程',
    hue: 'peach',
    description: '代码重构与 UI 组件生成稳定性极高',
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'OpenAI',
    contextWindow: '128k',
    tag: '极速',
    hue: 'mint',
    description: '超低首字延迟，适合实时问答与轻量级路由任务',
  },
]

const STUDIO_SOURCES: AiSourceEntry[] = [
  {
    id: 's1',
    title: 'Glaze Design System — 色彩与圆角分层规范',
    url: 'https://github.com/pengtikui/glaze-ui',
    domain: 'glaze-ui.dev/foundations',
    snippet: '画布固定为 #F2F4F8，卡片无描边无阴影；全圆胶囊 44px、内嵌块 18px、浮层 20px、卡片 28px。',
    score: 0.98,
    hue: 'periwinkle',
  },
  {
    id: 's2',
    title: 'Base UI v1.9 Collapsible & Popover 原语指南',
    url: 'https://base-ui.com/react/components/collapsible',
    domain: 'base-ui.com',
    snippet: '使用 render 属性组合触发器，通过 --collapsible-panel-height 与 data-starting-style 实现纯 CSS 动画。',
    score: 0.94,
    hue: 'sky',
  },
  {
    id: 's3',
    title: 'shadcn/ui AI Elements 交互模式参考',
    url: 'https://ui.shadcn.com/docs/ai-elements',
    domain: 'ui.shadcn.com',
    snippet: '涵盖 Conversation、PromptInput、Reasoning、ChainOfThought、Tool、Plan、Confirmation 与 Sources。',
    score: 0.92,
    hue: 'lilac',
  },
  {
    id: 's4',
    title: 'Glaze Registry 编译与 llms-full.txt 生成规范',
    url: 'https://github.com/pengtikui/glaze-ui',
    domain: 'glaze-ui.dev/registry',
    snippet: '单文件直接导入 @/components/ui/<slug>，自动解析 NPM 与 registryDependencies 依赖。',
    score: 0.89,
    hue: 'mint',
  },
]

const STUDIO_TREE: AiFileTreeNode[] = [
  {
    path: 'registry',
    name: 'registry',
    type: 'folder',
    children: [
      {
        path: 'registry/ai',
        name: 'glaze/ui',
        type: 'folder',
        children: [
          { path: 'registry/glaze/ui/conversation.tsx', name: 'conversation.tsx', type: 'file', status: 'added' },
          { path: 'registry/glaze/ui/prompt-input.tsx', name: 'prompt-input.tsx', type: 'file', status: 'added' },
          { path: 'registry/glaze/ui/reasoning.tsx', name: 'reasoning.tsx', type: 'file', status: 'added' },
          { path: 'registry/glaze/ui/tool-call.tsx', name: 'tool-call.tsx', type: 'file', status: 'added' },
        ],
      },
      {
        path: 'registry/glaze/styles/glaze.css',
        name: 'glaze.css',
        type: 'file',
        status: 'modified',
      },
    ],
  },
]

const STUDIO_FILES: Record<string, AiWorkspaceFileEntry> = {
  'registry/glaze/ui/conversation.tsx': {
    path: 'registry/glaze/ui/conversation.tsx',
    language: 'tsx',
    code: `import { Conversation, ConversationContent, Message, MessageAvatar, MessageContent } from '@/components/ui/conversation'
import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ui/reasoning'

export function AgentThread() {
  return (
    <Conversation className="h-[480px] rounded-tile bg-white">
      <ConversationContent>
        <Message from="assistant">
          <MessageAvatar from="assistant" />
          <MessageContent from="assistant">
            <Reasoning duration={2.8}>
              <ReasoningTrigger />
              <ReasoningContent>
                核查 Base UI 1.9 规范与 Glaze 柔彩圆角 Token...
              </ReasoningContent>
            </Reasoning>
            <p>已为你生成 12 个 Glaze AI Elements 与 10 张 Bento 业务卡片。</p>
          </MessageContent>
        </Message>
      </ConversationContent>
    </Conversation>
  )
}`,
  },
  'registry/glaze/ui/prompt-input.tsx': {
    path: 'registry/glaze/ui/prompt-input.tsx',
    language: 'tsx',
    code: `import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from '@/components/ui/prompt-input'

export function QuickComposer({ onSend }: { onSend: (v: string) => void }) {
  return (
    <PromptInput surface="white" onSubmit={() => onSend('hello')}>
      <PromptInputTextarea placeholder="向智能体提问，Enter 发送…" />
      <PromptInputToolbar>
        <span className="text-[12px] text-[#8A90A0]">支持附件与深度思考</span>
        <PromptInputSubmit status="ready" />
      </PromptInputToolbar>
    </PromptInput>
  )
}`,
  },
  'registry/glaze/ui/reasoning.tsx': {
    path: 'registry/glaze/ui/reasoning.tsx',
    language: 'tsx',
    code: `export function ReasoningBadge({ streaming }: { streaming: boolean }) {
  return (
    <Reasoning isStreaming={streaming} duration={3.4}>
      <ReasoningTrigger />
      <ReasoningContent>
        对比 shadcn AI Elements 组件清单并映射到 Glaze Base UI 1.9 原语。
      </ReasoningContent>
    </Reasoning>
  )
}`,
  },
  'registry/glaze/ui/tool-call.tsx': {
    path: 'registry/glaze/ui/tool-call.tsx',
    language: 'tsx',
    code: `export function ToolTrace() {
  return (
    <ToolCall defaultOpen>
      <ToolCallHeader name="build_registry" title="构建 Registry" state="output-available" duration="320ms" />
      <ToolCallContent>
        <ToolCallInput input={{ target: '@glaze', validate: true }} />
        <ToolCallOutput output={{ items: 202, warnings: 0 }} />
      </ToolCallContent>
    </ToolCall>
  )
}`,
  },
  'registry/glaze/styles/glaze.css': {
    path: 'registry/glaze/styles/glaze.css',
    language: 'diff',
    diff: true,
    code: `--- a/registry/glaze/styles/glaze.css
+++ b/registry/glaze/styles/glaze.css
@@ -240,3 +240,18 @@
 .animate-glaze-blink {
   animation: glaze-blink 1.4s ease-in-out infinite;
 }
+
+@keyframes glaze-shimmer {
+  0% { background-position: 200% center; }
+  100% { background-position: -200% center; }
+}
+
+.animate-glaze-shimmer {
+  background: linear-gradient(90deg, #5B6170 0%, #7B80EA 45%, #5B6170 90%);
+  background-size: 200% auto;
+  background-clip: text;
+  color: transparent;
+  animation: glaze-shimmer 2.2s linear infinite;
+}`,
  },
}

const EVAL_ROWS: AiModelEvalRow[] = [
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google',
    contextWindow: '1M',
    tag: '推理旗舰',
    hue: 'periwinkle',
    ttft: '0.42s',
    throughput: '118 tok/s',
    costPer1M: '$1.25',
    reasoningScore: 96,
    codingScore: 95,
    status: 'normal',
  },
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    provider: 'Anthropic',
    contextWindow: '200k',
    tag: '编码优先',
    hue: 'peach',
    ttft: '0.58s',
    throughput: '92 tok/s',
    costPer1M: '$3.00',
    reasoningScore: 93,
    codingScore: 97,
    status: 'normal',
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'OpenAI',
    contextWindow: '128k',
    tag: '极速路由',
    hue: 'mint',
    ttft: '0.21s',
    throughput: '185 tok/s',
    costPer1M: '$0.30',
    reasoningScore: 86,
    codingScore: 88,
    status: 'info',
  },
  {
    id: 'deepseek-r2',
    name: 'DeepSeek R2',
    provider: 'DeepSeek',
    contextWindow: '128k',
    tag: '高性价比',
    hue: 'sky',
    ttft: '0.66s',
    throughput: '78 tok/s',
    costPer1M: '$0.55',
    reasoningScore: 92,
    codingScore: 90,
    status: 'normal',
  },
]

const SESSIONS = [
  { id: 's-1', title: 'Glaze AI Elements 架构设计', model: 'Gemini 3 Pro', time: '刚刚', active: true },
  { id: 's-2', title: 'K8s 延迟毛刺根因排查', model: 'Claude 4 Sonnet', time: '24 分钟前', active: false },
  { id: 's-3', title: 'Q4 营收预测 SQL 与图表', model: 'GPT-5 Mini', time: '昨天', active: false },
]

interface DynamicTurn {
  id: string
  role: 'user' | 'assistant'
  text: string
  reasoning?: string
  duration?: number
  streaming?: boolean
}

export function AiStudioDemoPage() {
  const toast = useToast()
  const [workspaceMode, setWorkspaceMode] = React.useState<'studio' | 'bento'>('studio')
  const [activeSession, setActiveSession] = React.useState('s-1')
  const [inspectorOpen, setInspectorOpen] = React.useState(true)
  const [inspectorTab, setInspectorTab] = React.useState<'artifact' | 'terminal' | 'files'>('artifact')
  const [selectedFile, setSelectedFile] = React.useState('registry/glaze/ui/conversation.tsx')

  const [model, setModel] = React.useState('gemini-3-pro')
  const [deepThink, setDeepThink] = React.useState(true)
  const [webSearch, setWebSearch] = React.useState(true)
  const [draft, setDraft] = React.useState('')
  const [promptStatus, setPromptStatus] = React.useState<PromptInputStatus>('ready')
  const [attachments, setAttachments] = React.useState<PromptAttachmentItem[]>([
    { id: 'att-1', name: 'tokens.ts', size: '14 KB', kind: 'code', hue: 'periwinkle' },
  ])

  const [branchIdx, setBranchIdx] = React.useState(1)
  const [approvalState, setApprovalState] = React.useState<AiConfirmationState>('requested')
  const [dynamicTurns, setDynamicTurns] = React.useState<DynamicTurn[]>([])
  const [usage, setUsage] = React.useState<AiContextUsage>({
    usedTokens: 48_200,
    maxTokens: 200_000,
    inputTokens: 18_400,
    cachedTokens: 21_500,
    reasoningTokens: 5_100,
    outputTokens: 3_200,
    estimatedCost: '$0.14',
  })

  const streamTimer = React.useRef<number | null>(null)
  React.useEffect(() => {
    return () => {
      if (streamTimer.current) window.clearTimeout(streamTimer.current)
    }
  }, [])

  const planSteps: AiPlanStepItem[] = [
    { id: 'p1', title: '梳理 shadcn AI Elements 交互范式', detail: '映射至 Glaze Base UI 1.9 与柔彩圆角规范', status: 'done', duration: '0.8s' },
    { id: 'p2', title: '实现 12 个核心 AI UI 原语', detail: 'Conversation · PromptInput · Reasoning · ToolCall 等', status: 'done', duration: '2.1s' },
    { id: 'p3', title: '扩展 10 张 S/W/T/L/F AI Bento 卡片', detail: '支持直接嵌入 4 列密集栅格', status: 'done', duration: '1.6s' },
    {
      id: 'p4',
      title: '运行 Registry 构建与 TypeScript 校验',
      detail: '等待人工审批确认后执行',
      status: approvalState === 'approved' ? 'done' : approvalState === 'rejected' ? 'skipped' : 'running',
      duration: approvalState === 'approved' ? '1.2s' : undefined,
    },
  ]

  const queueTasks: AiQueueTask[] = [
    { id: 'q1', title: '生成 public/r/*.json 与 llms-full.txt', meta: 'Registry', status: approvalState === 'approved' ? 'completed' : 'running' },
    { id: 'q2', title: '校验 Astro 静态文档路由构建', meta: 'Astro', status: approvalState === 'approved' ? 'completed' : 'pending' },
    { id: 'q3', title: '同步 12 个组件交互演示示例', meta: 'Docs', status: 'completed' },
  ]

  const handleApprove = () => {
    setApprovalState('approved')
    setInspectorOpen(true)
    setInspectorTab('terminal')
    toast({
      title: '已批准并执行构建命令',
      description: 'build:registry 与 typecheck 全部通过，0 报错。',
      status: 'normal',
    })
  }

  const handleReject = () => {
    setApprovalState('rejected')
    toast({
      title: '已拒绝命令执行',
      description: 'Agent 已暂停构建步骤，等待进一步指示。',
      status: 'warning',
    })
  }

  const handleSend = (overrideText?: string) => {
    const text = (overrideText ?? draft).trim()
    if (!text || promptStatus === 'streaming') return

    const userId = `dyn-u-${Date.now()}`
    const assistantId = `dyn-a-${Date.now()}`

    setDynamicTurns((prev) => [
      ...prev,
      { id: userId, role: 'user', text },
      {
        id: assistantId,
        role: 'assistant',
        reasoning: deepThink
          ? `1. 正在解析用户请求「${text}」并检索当前会话上下文与代码库索引。\n2. 结合 ${STUDIO_MODELS.find((m) => m.id === model)?.name ?? model} 规划最优 Glaze 组件组合方案…`
          : undefined,
        text: '',
        streaming: true,
      },
    ])
    setDraft('')
    setPromptStatus('streaming')

    streamTimer.current = window.setTimeout(() => {
      setDynamicTurns((prev) =>
        prev.map((t) =>
          t.id === assistantId
            ? {
                ...t,
                streaming: false,
                duration: deepThink ? 1.8 : undefined,
                text: `已针对「${text}」完成分析：建议在 Glaze 4 列栅格中组合使用 PromptInput、Reasoning、ToolCall 与 AiArtifact，保留 60% 纯白卡片 + 30% 柔彩卡片比例，并通过 Base UI Collapsible 实现零抖动的纯 CSS 展开过渡。`,
              }
            : t,
        ),
      )
      setUsage((prev) => ({
        ...prev,
        usedTokens: prev.usedTokens + 1_450,
        outputTokens: (prev.outputTokens ?? 0) + 620,
        reasoningTokens: (prev.reasoningTokens ?? 0) + (deepThink ? 830 : 0),
      }))
      setPromptStatus('ready')
    }, 1100)
  }

  const handleAddMockAttachment = () => {
    const id = `att-${Date.now()}`
    setAttachments((prev) => [
      ...prev,
      {
        id,
        name: `schema-${prev.length + 1}.json`,
        size: '8.4 KB',
        kind: 'file',
        hue: 'mint',
      },
    ])
  }

  const branchReplies = [
    '已完成 Glaze AI Elements 体系设计：所有 12 个核心 AI 原语全部基于 Base UI 1.9 与 Glaze 柔彩圆角规范实现，并扩展了 10 张覆盖 S/W/T/L/F 五档尺寸的 Bento 业务卡片。',
    '推荐采用「工作台 + Bento 看板」双模式落地：日常交互用 Conversation + PromptInput + AiArtifact 分栏协作，团队监控则通过顶部切换进入 4 列 AI Ops 运营总览。',
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F8] text-[#1B1F27]">
      {/* Top Studio Header */}
      <header className="sticky top-0 z-30 border-b border-[#E5E8EE]/90 bg-[#F2F4F8]/95 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#123A5C] text-white">
              <Sparkle size={18} weight="duotone" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="m-0 font-glaze-display text-[18px] leading-tight font-extrabold text-[#123A5C]">
                  Glaze AI Studio
                </h1>
                <HueTag hue="periwinkle" size="xs">
                  AI.STUDIO
                </HueTag>
              </div>
              <p className="m-0 text-[12px] text-[#6B7280]">
                智能体对话 · 思维链追踪 · 产物审查 · AI Ops 看板
              </p>
            </div>
          </div>

          <SegmentedControl
            size="sm"
            value={workspaceMode}
            onValueChange={setWorkspaceMode}
            options={[
              {
                value: 'studio',
                label: '智能体工作台',
                icon: <ChatCircleDots size={14} weight="duotone" />,
              },
              {
                value: 'bento',
                label: 'AI Ops 看板',
                icon: <SquaresFour size={14} weight="duotone" />,
              },
            ]}
          />

          <div className="flex items-center gap-2">
            <AiModelSelector
              models={STUDIO_MODELS}
              value={model}
              onValueChange={setModel}
              surface="white"
              side="bottom"
            />
            <AiContextMeter usage={usage} surface="white" />
            {workspaceMode === 'studio' && (
              <Button
                size="sm"
                variant={inspectorOpen ? 'soft' : 'secondary'}
                hue="periwinkle"
                onClick={() => setInspectorOpen((v) => !v)}
              >
                <SidebarSimple size={14} weight="bold" />
                <span className="hidden sm:inline">{inspectorOpen ? '收起产物栏' : '展开产物栏'}</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {workspaceMode === 'studio' ? (
        <main className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-12">
          {/* Left Session Rail */}
          <aside className="flex flex-col justify-between gap-4 rounded-tile bg-white p-4 lg:col-span-3 xl:col-span-2">
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setDynamicTurns([])
                  setApprovalState('requested')
                  toast({ title: '已重置新会话', description: '已开启干净上下文窗口', status: 'info' })
                }}
              >
                <Plus size={14} weight="bold" />
                <span>新建智能体会话</span>
              </Button>

              <div className="flex flex-col gap-1">
                <span className="px-2 text-[11px] font-bold tracking-[0.04em] text-[#8A90A0] uppercase">
                  最近会话
                </span>
                {SESSIONS.map((s) => {
                  const selected = s.id === activeSession
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSession(s.id)}
                      className={
                        selected
                          ? 'flex w-full cursor-pointer flex-col gap-0.5 rounded-[14px] bg-[#F3F4FE] px-3 py-2.5 text-left outline-none'
                          : 'flex w-full cursor-pointer flex-col gap-0.5 rounded-[14px] px-3 py-2.5 text-left transition-colors hover:bg-[#F6F7F9] outline-none'
                      }
                    >
                      <span
                        className={
                          selected
                            ? 'truncate text-[13px] font-bold text-[#262B7A]'
                            : 'truncate text-[13px] font-semibold text-[#1B1F27]'
                        }
                      >
                        {s.title}
                      </span>
                      <span className="flex items-center justify-between text-[11px] text-[#8A90A0]">
                        <span>{s.model}</span>
                        <span>{s.time}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-inner bg-[#F1FAEC] p-3.5 text-[#173F12]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold">
                  <Robot size={14} weight="duotone" />
                  <span>Agent 集群</span>
                </span>
                <StatusDot status="normal" animated size="sm" />
              </div>
              <span className="text-[11.5px] text-[#2F6B28]">
                3 个子智能体在线 · 平均首字延迟 0.42s
              </span>
            </div>
          </aside>

          {/* Center Conversation Canvas */}
          <section
            className={
              inspectorOpen
                ? 'flex min-h-[700px] flex-col overflow-hidden rounded-tile bg-white lg:col-span-9 xl:col-span-6'
                : 'flex min-h-[700px] flex-col overflow-hidden rounded-tile bg-white lg:col-span-9 xl:col-span-10'
            }
          >
            <div className="flex items-center justify-between gap-2 border-b border-[#EEF0F3] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
                  {SESSIONS.find((s) => s.id === activeSession)?.title}
                </span>
                <StatusPill
                  status={promptStatus === 'streaming' ? 'info' : 'normal'}
                  label={promptStatus === 'streaming' ? '正在生成' : '就绪'}
                  size="sm"
                />
              </div>
              <span className="font-glaze-mono text-[11.5px] text-[#8A90A0]">
                {STUDIO_MODELS.find((m) => m.id === model)?.name}
              </span>
            </div>

            <Conversation className="min-h-0 flex-1">
              <ConversationContent>
                {activeSession !== 's-1' && dynamicTurns.length === 0 ? (
                  <ConversationEmptyState
                    title={SESSIONS.find((s) => s.id === activeSession)?.title}
                    description="切换到此历史会话或直接输入新指令，体验实时流式思考、工具调用与引用溯源。"
                  >
                    <AiSuggestions>
                      <AiSuggestion
                        suggestion="生成一份可交互的延迟诊断报告"
                        variant="tinted"
                        hue="sky"
                        onSelect={(s) => handleSend(s)}
                      />
                      <AiSuggestion
                        suggestion="编写 Glaze Bento 看板代码"
                        variant="tinted"
                        hue="periwinkle"
                        onSelect={(s) => handleSend(s)}
                      />
                    </AiSuggestions>
                  </ConversationEmptyState>
                ) : (
                  <>
                    {/* Turn 1: User */}
                    <Message from="user">
                      <MessageAvatar from="user" label="PT" />
                      <MessageContent from="user">
                        参考 shadcn AI Elements，为 Glaze UI 设计一组 AI 智能体组件，并配套 Bento 卡片与可交互工作台。
                      </MessageContent>
                    </Message>

                    {/* Turn 2: Rich Assistant with Reasoning + CoT + Tool + Plan + Citations + Sources */}
                    <Message from="assistant">
                      <MessageAvatar from="assistant" />
                      <MessageContent from="assistant">
                        <Reasoning duration={3.6} defaultOpen={false}>
                          <ReasoningTrigger />
                          <ReasoningContent>
                            1. 对照 shadcn AI Elements 清单（Conversation、PromptInput、Reasoning、ChainOfThought、Tool、Plan、Confirmation、Sources、CodeBlock、Terminal、Queue、Context、Artifact）。{'\n'}
                            2. 严格遵循 Glaze 设计红线：画布 #F2F4F8、卡片无描边无阴影、Base UI 1.9 render 属性组合、Phosphor 图标体系。{'\n'}
                            3. 扩展 S/W/T/L/F 五种尺寸共 10 张 AI 业务卡片，便于直接编排 AI Ops 仪表盘。
                          </ReasoningContent>
                        </Reasoning>

                        <ChainOfThought defaultOpen={false}>
                          <ChainOfThoughtHeader
                            badge={
                              <HueTag hue="mint" size="xs">
                                3 步完成
                              </HueTag>
                            }
                          >
                            已完成 3 步仓库分析与规范检索
                          </ChainOfThoughtHeader>
                          <ChainOfThoughtContent>
                            <ChainOfThoughtStep
                              label="读取 Glaze Design Tokens 与样式表"
                              description="确认 9 组柔彩色板、4 组深色卡与 28/20/18/full 圆角分层"
                              duration="180ms"
                              status="complete"
                            />
                            <ChainOfThoughtStep
                              label="对照 shadcn AI Elements 组件生态"
                              description="覆盖对话流、思考过程、工具追踪、审批确认与产物预览"
                              duration="420ms"
                              status="complete"
                            >
                              <ChainOfThoughtSearchResults>
                                <ChainOfThoughtSearchResult href="https://ui.shadcn.com/docs/ai-elements" hue="periwinkle">
                                  ui.shadcn.com/docs/ai-elements
                                </ChainOfThoughtSearchResult>
                                <ChainOfThoughtSearchResult href="https://base-ui.com/react/components" hue="sky">
                                  base-ui.com/react
                                </ChainOfThoughtSearchResult>
                              </ChainOfThoughtSearchResults>
                            </ChainOfThoughtStep>
                            <ChainOfThoughtStep
                              label="生成单文件 Registry 组件与 API 文档元数据"
                              duration="310ms"
                              status="complete"
                            />
                          </ChainOfThoughtContent>
                        </ChainOfThought>

                        <ToolCall defaultOpen={false}>
                          <ToolCallHeader
                            name="inspect_glaze_registry"
                            title="扫描现有组件与依赖树"
                            state="output-available"
                            duration="240ms"
                          />
                          <ToolCallContent>
                            <ToolCallInput input={{ scope: 'registry/glaze', checkBaseUi: true }} />
                            <ToolCallOutput
                              output={{
                                uiPrimitives: 60,
                                newAiElements: 12,
                                newAiBlocks: 10,
                                radixImportsFound: 0,
                              }}
                            />
                          </ToolCallContent>
                        </ToolCall>

                        <AiPlan defaultOpen>
                          <AiPlanHeader
                            title="Glaze AI Elements 实施路线图"
                            description="12 核心组件 · 10 扩展卡片 · 1 独立工作台"
                            completed={planSteps.filter((s) => s.status === 'done').length}
                            total={planSteps.length}
                            streaming={approvalState === 'requested'}
                          />
                          <AiPlanContent>
                            {planSteps.map((step) => (
                              <AiPlanStep
                                key={step.id}
                                title={step.title}
                                detail={step.detail}
                                status={step.status}
                                duration={step.duration}
                              />
                            ))}
                          </AiPlanContent>
                        </AiPlan>

                        <p className="m-0 text-[14px] leading-relaxed text-[#1B1F27]">
                          {branchReplies[branchIdx - 1]}
                          <InlineCitation
                            index={1}
                            title={STUDIO_SOURCES[0].title}
                            url={STUDIO_SOURCES[0].url}
                            domain={STUDIO_SOURCES[0].domain}
                            snippet={STUDIO_SOURCES[0].snippet}
                          />
                          <InlineCitation
                            index={2}
                            title={STUDIO_SOURCES[2].title}
                            url={STUDIO_SOURCES[2].url}
                            domain={STUDIO_SOURCES[2].domain}
                            snippet={STUDIO_SOURCES[2].snippet}
                            hue="sky"
                          />
                        </p>

                        <AiSources defaultOpen={false}>
                          <AiSourcesTrigger count={STUDIO_SOURCES.length} />
                          <AiSourcesContent>
                            {STUDIO_SOURCES.map((src) => (
                              <AiSourceItem
                                key={src.id}
                                title={src.title}
                                url={src.url}
                                domain={src.domain}
                                snippet={src.snippet}
                                score={src.score}
                                hue={src.hue}
                              />
                            ))}
                          </AiSourcesContent>
                        </AiSources>

                        <div className="flex flex-wrap items-center gap-2">
                          <MessageBranch
                            current={branchIdx}
                            total={branchReplies.length}
                            onChange={setBranchIdx}
                          />
                          <MessageQuickToolbar
                            textToCopy={branchReplies[branchIdx - 1]}
                            onRegenerate={() =>
                              setBranchIdx((i) => (i === 1 ? 2 : 1))
                            }
                            onFeedback={(v) =>
                              v &&
                              toast({
                                title: v === 'up' ? '感谢正向反馈' : '已记录改进意见',
                                status: v === 'up' ? 'normal' : 'info',
                              })
                            }
                          />
                        </div>
                      </MessageContent>
                    </Message>

                    <AiCheckpoint
                      label="检查点 #1 · 组件代码已写入"
                      timestamp="11:28"
                      onRestore={() =>
                        toast({
                          title: '已回溯至检查点 #1',
                          description: '后续未提交会话已安全归档。',
                          status: 'info',
                        })
                      }
                    />

                    {/* Turn 3: Human-in-the-loop Confirmation */}
                    <Message from="assistant">
                      <MessageAvatar from="assistant" />
                      <MessageContent from="assistant">
                        <AiConfirmation
                          state={approvalState}
                          risk="medium"
                          title="请求执行 Registry 编译与类型校验"
                          description="该命令将重新生成 public/r/*.json、llms-full.txt 并运行 TypeScript 严格校验。"
                          command="pnpm run build:registry && pnpm run typecheck"
                          onApprove={handleApprove}
                          onReject={handleReject}
                        />
                      </MessageContent>
                    </Message>

                    {/* Dynamic user-submitted turns */}
                    {dynamicTurns.map((turn) => (
                      <Message key={turn.id} from={turn.role}>
                        <MessageAvatar from={turn.role} label={turn.role === 'user' ? 'PT' : undefined} />
                        <MessageContent from={turn.role}>
                          {turn.reasoning && (
                            <Reasoning
                              isStreaming={turn.streaming}
                              duration={turn.duration}
                              defaultOpen={Boolean(turn.streaming)}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{turn.reasoning}</ReasoningContent>
                            </Reasoning>
                          )}
                          {turn.text && <p className="m-0 text-[14px] leading-relaxed">{turn.text}</p>}
                          {turn.role === 'assistant' && !turn.streaming && (
                            <MessageQuickToolbar textToCopy={turn.text} />
                          )}
                        </MessageContent>
                      </Message>
                    ))}
                  </>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            {/* Bottom Suggestions + Prompt Composer */}
            <div className="flex flex-col gap-2.5 border-t border-[#EEF0F3] p-4">
              <AiSuggestions layout="scroll">
                {[
                  '总结 12 个 AI Elements 的安装命令',
                  '如何接入 Vercel AI SDK useChat？',
                  '给 AiConfirmation 增加审计日志',
                ].map((s) => (
                  <AiSuggestion key={s} suggestion={s} onSelect={(text) => handleSend(text)} />
                ))}
              </AiSuggestions>

              <PromptInput surface="soft" onSubmit={() => handleSend()}>
                <PromptInputAttachments
                  items={attachments}
                  onRemove={(id) => setAttachments((prev) => prev.filter((a) => a.id !== id))}
                />
                <PromptInputTextarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="继续向 Glaze AI 提问，Enter 发送，Shift + Enter 换行…"
                />
                <PromptInputToolbar>
                  <PromptInputTools>
                    <PromptInputAction
                      icon={<Paperclip size={14} weight="bold" />}
                      onClick={handleAddMockAttachment}
                    >
                      附件
                    </PromptInputAction>
                    <PromptInputAction
                      active={deepThink}
                      hue="lilac"
                      icon={<Brain size={14} weight="duotone" />}
                      onClick={() => setDeepThink((v) => !v)}
                    >
                      深度思考
                    </PromptInputAction>
                    <PromptInputAction
                      active={webSearch}
                      hue="sky"
                      icon={<Globe size={14} weight="bold" />}
                      onClick={() => setWebSearch((v) => !v)}
                    >
                      联网检索
                    </PromptInputAction>
                  </PromptInputTools>

                  <div className="flex items-center gap-2">
                    <AiContextMeter usage={usage} surface="white" />
                    <PromptInputSubmit
                      status={promptStatus}
                      disabled={!draft.trim()}
                      onStop={() => {
                        if (streamTimer.current) window.clearTimeout(streamTimer.current)
                        setPromptStatus('ready')
                      }}
                    />
                  </div>
                </PromptInputToolbar>
              </PromptInput>
            </div>
          </section>

          {/* Right Inspector Panel */}
          {inspectorOpen && (
            <aside className="flex flex-col gap-3 rounded-tile bg-white p-4 lg:col-span-12 xl:col-span-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-glaze-display text-[15px] font-extrabold text-[#123A5C]">
                  工作区审查器
                </span>
                <SegmentedControl
                  size="sm"
                  value={inspectorTab}
                  onValueChange={setInspectorTab}
                  options={[
                    { value: 'artifact', label: '产物' },
                    { value: 'terminal', label: '终端' },
                    { value: 'files', label: '文件树' },
                  ]}
                />
              </div>

              {inspectorTab === 'artifact' && (
                <AiArtifact
                  title="Glaze AI 卡片预览"
                  subtitle="实时组件产物 · 可切换源码"
                  badge="TSX"
                  copyText={STUDIO_FILES['registry/glaze/ui/conversation.tsx'].code}
                  className="flex-1 bg-[#F6F7F9]/60"
                  preview={
                    <div className="flex flex-col gap-3">
                      <Tile tone="periwinkle" padding="compact" className="min-h-28">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold">Glaze AI Elements</span>
                          <HueTag hue="periwinkle" size="xs" tone="solid">
                            v2.0
                          </HueTag>
                        </div>
                        <span className="mt-2 font-glaze-display text-[32px] leading-none font-extrabold">
                          12 + 10
                        </span>
                        <span className="mt-1 text-[12px] opacity-80">
                          12 个 AI 原语组件 · 10 张 Bento 业务卡片
                        </span>
                      </Tile>
                      <div className="grid grid-cols-2 gap-2.5">
                        <Tile tone="mint" padding="compact" className="min-h-24">
                          <span className="text-[11px] font-bold opacity-80">Base UI 1.9</span>
                          <span className="mt-auto font-glaze-display text-[20px] font-extrabold">
                            100%
                          </span>
                        </Tile>
                        <Tile tone="sky" padding="compact" className="min-h-24">
                          <span className="text-[11px] font-bold opacity-80">无描边圆角</span>
                          <span className="mt-auto font-glaze-display text-[20px] font-extrabold">
                            28px
                          </span>
                        </Tile>
                      </div>
                    </div>
                  }
                  code={
                    <AiCodeBlock
                      code={STUDIO_FILES['registry/glaze/ui/conversation.tsx'].code}
                      language="tsx"
                      filename="conversation-example.tsx"
                      maxHeight={340}
                    />
                  }
                />
              )}

              {inspectorTab === 'terminal' && (
                <div className="flex flex-1 flex-col gap-3">
                  <AiTerminal
                    command="pnpm run build:registry && pnpm run typecheck"
                    status={
                      approvalState === 'approved'
                        ? 'success'
                        : approvalState === 'rejected'
                          ? 'error'
                          : 'running'
                    }
                    exitCode={
                      approvalState === 'approved' ? 0 : approvalState === 'rejected' ? 1 : undefined
                    }
                    output={
                      approvalState === 'approved'
                        ? '▶ Building @glaze registry...\n✓ Generated 202 registry items in public/r/\n✓ Updated public/llms.txt & public/llms-full.txt\n✓ astro check: 0 errors, 0 warnings\n✓ tsc --noEmit: passed cleanly'
                        : approvalState === 'rejected'
                          ? '✖ Command execution rejected by human reviewer.'
                          : '⏳ Waiting for human approval in conversation thread...\n   Click "批准执行" to run build & typecheck.'
                    }
                    maxHeight={220}
                  />
                  <AiQueue items={queueTasks} title="后台执行队列" />
                </div>
              )}

              {inspectorTab === 'files' && (
                <div className="flex flex-1 flex-col gap-3">
                  <AiFileTree
                    nodes={STUDIO_TREE}
                    selectedPath={selectedFile}
                    onSelectPath={(p) => {
                      if (STUDIO_FILES[p]) setSelectedFile(p)
                    }}
                    defaultExpanded={['registry', 'registry/ai']}
                  />
                  {STUDIO_FILES[selectedFile] && (
                    <AiCodeBlock
                      code={STUDIO_FILES[selectedFile].code}
                      language={STUDIO_FILES[selectedFile].language}
                      filename={STUDIO_FILES[selectedFile].path}
                      diff={STUDIO_FILES[selectedFile].diff}
                      maxHeight={260}
                    />
                  )}
                </div>
              )}
            </aside>
          )}
        </main>
      ) : (
        /* Mode 2: 4-Column Glaze AI Ops Bento Dashboard */
        <main className="mx-auto flex w-full max-w-312 flex-col gap-6 px-4 py-8 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="m-0 font-glaze-display text-[32px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
                AI Ops 智能体总控台
              </h2>
              <p className="m-0 mt-1 text-[14px] text-[#5B6170]">
                10 张 Glaze AI Bento 业务卡片在 4 列密集栅格中的全景编排示例
              </p>
            </div>
            <StatusPill status="normal" label="4 个模型网关健康" />
          </div>

          <Grid>
            <AiAgentStatusCard
              agentName="Glaze Coder"
              modelName="Gemini 3 Pro"
              status="normal"
              statusText="自主运行中"
              activeSubagents={3}
              ttft="0.42s"
              tone="mint"
            />
            <AiTokenBudgetCard
              label="当前上下文预算"
              usage={usage}
              cacheHitRate="64%"
              hue="periwinkle"
              tone="white"
            />
            <AiPromptBarCard
              title="快速下发 Agent 指令"
              onSubmitPrompt={(prompt) =>
                toast({
                  title: '已派发至智能体队列',
                  description: prompt,
                  status: 'info',
                })
              }
            />

            <AiAssistantCard title="AI 运维副驾驶" modelLabel="Gemini 3 Pro" />
            <AiTraceInspectorCard
              title="根因排查 Trace"
              summary="已完成 3 步指标与日志溯源"
              steps={[
                { id: '1', label: '拉取 ap-east-1 网关 P99 延迟', status: 'complete', duration: '140ms' },
                {
                  id: '2',
                  label: '比对最近 2 小时发布记录与缓存命中率',
                  status: 'complete',
                  duration: '260ms',
                  links: [{ label: 'grafana/latency', href: 'https://github.com/pengtikui/glaze-ui' }],
                },
                { id: '3', label: '生成限速与读副本分流方案', status: 'complete', duration: '390ms' },
              ]}
              toolCall={{
                name: 'query_prometheus',
                title: '查询集群延迟指标',
                state: 'output-available',
                duration: '140ms',
                input: { cluster: 'ap-east-1', metric: 'http_p99_ms', window: '4h' },
                output: { peakMs: 842, baselineMs: 112, cacheHitDrop: '-33%' },
              }}
            />

            <AiPlanQueueCard
              steps={planSteps}
              queueItems={queueTasks}
              tone="white"
            />
            <AiSourcesCard sources={STUDIO_SOURCES} tone="white" />

            <AiApprovalCard
              title="生产集群滚动扩缩容"
              description="将 inference-gateway 副本数由 6 扩展至 10，预计增加月度预算 $420。"
              command="kubectl scale deploy/inference-gateway --replicas=10 -n prod-ai"
              risk="high"
              onDecision={(d) =>
                toast({
                  title: d === 'approved' ? '已批准扩容操作' : '已拒绝扩容操作',
                  status: d === 'approved' ? 'normal' : 'warning',
                })
              }
            />

            <AiWorkspaceConsoleCard
              tree={STUDIO_TREE}
              files={STUDIO_FILES}
              defaultPath="registry/glaze/styles/glaze.css"
            />

            <AiModelEvalCard
              rows={EVAL_ROWS}
              defaultModelId={model}
              onSelectDefault={(id) => {
                setModel(id)
                toast({ title: '默认推理路由已切换', description: id, status: 'normal' })
              }}
            />
          </Grid>
        </main>
      )}
    </div>
  )
}
