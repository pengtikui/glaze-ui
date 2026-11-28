import * as React from 'react'
import { Brain, Globe, Paperclip, Sparkle } from '@phosphor-icons/react'
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
  type AiModelOption,
} from '@/components/ui/ai-context-meter'
import { AiPlan, AiPlanContent, AiPlanFooter, AiPlanHeader, AiPlanStep } from '@/components/ui/ai-plan'
import {
  AiSourceItem,
  AiSources,
  AiSourcesContent,
  AiSourcesTrigger,
  InlineCitation,
} from '@/components/ui/ai-sources'
import { AiQueue, AiSuggestion, AiSuggestions } from '@/components/ui/ai-suggestions'
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
import { Tile } from '@/components/ui/tile'
import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
} from '@/components/ui/tool-call'
import type { ComponentDemoGroup } from '@/docs/examples/types'

const DEMO_MODELS: AiModelOption[] = [
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro', provider: 'Google', contextWindow: '1M', tag: '推理', hue: 'periwinkle' },
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', provider: 'Anthropic', contextWindow: '200k', tag: '编程', hue: 'peach' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'OpenAI', contextWindow: '128k', tag: '极速', hue: 'mint' },
]

function ConversationBranchDemo() {
  const [branch, setBranch] = React.useState(1)
  const variants = [
    '建议将高频读接口接入边缘缓存，并在网关层设置 60s SWR 策略，可将 P99 延迟稳定控制在 45ms 以内。',
    '也可以从数据库层入手：为 created_at 与 tenant_id 建立联合覆盖索引，减少回表扫描开销。',
  ]
  return (
    <div className="w-full max-w-2xl">
      <Message from="assistant">
        <MessageAvatar from="assistant" />
        <MessageContent from="assistant">
          <p className="m-0">{variants[branch - 1]}</p>
          <div className="flex items-center gap-2">
            <MessageBranch current={branch} total={variants.length} onChange={setBranch} />
            <MessageQuickToolbar
              textToCopy={variants[branch - 1]}
              onRegenerate={() => setBranch((b) => (b === 1 ? 2 : 1))}
            />
          </div>
        </MessageContent>
      </Message>
    </div>
  )
}

function PromptInputInteractiveDemo() {
  const [value, setValue] = React.useState('')
  const [status, setStatus] = React.useState<PromptInputStatus>('ready')
  const [deepThink, setDeepThink] = React.useState(true)
  const [webSearch, setWebSearch] = React.useState(false)
  const [attachments, setAttachments] = React.useState<PromptAttachmentItem[]>([
    { id: 'a1', name: 'tokens.ts', size: '14 KB', kind: 'code', hue: 'periwinkle' },
    { id: 'a2', name: 'bento-spec.png', size: '420 KB', kind: 'image', hue: 'lilac' },
  ])

  const handleSubmit = () => {
    if (!value.trim()) return
    setStatus('streaming')
    setValue('')
    window.setTimeout(() => setStatus('ready'), 1200)
  }

  return (
    <div className="w-full max-w-2xl">
      <PromptInput surface="white" onSubmit={handleSubmit}>
        <PromptInputAttachments
          items={attachments}
          onRemove={(id) => setAttachments((prev) => prev.filter((a) => a.id !== id))}
        />
        <PromptInputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入指令，按 Enter 模拟流式发送…"
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputAction
              icon={<Paperclip size={14} weight="bold" />}
              onClick={() =>
                setAttachments((prev) => [
                  ...prev,
                  { id: `f-${Date.now()}`, name: `report-${prev.length + 1}.md`, size: '6 KB', hue: 'sky' },
                ])
              }
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
              联网搜索
            </PromptInputAction>
          </PromptInputTools>
          <PromptInputSubmit
            status={status}
            disabled={!value.trim()}
            onStop={() => setStatus('ready')}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  )
}

function ReasoningStreamingDemo() {
  const [streaming, setStreaming] = React.useState(true)
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Reasoning isStreaming={streaming} duration={3.4} defaultOpen>
        <ReasoningTrigger />
        <ReasoningContent>
          {streaming
            ? '正在检索 Base UI 1.9 Collapsible 规范，检查 --collapsible-panel-height 纯 CSS 动画参数…'
            : '已确认使用 Base UI Collapsible + 200ms cubic-bezier(0.22, 1, 0.36, 1) 过渡，无任何 JS 动画帧开销。'}
        </ReasoningContent>
      </Reasoning>
      <div className="flex justify-end">
        <Button size="sm" variant="secondary" onClick={() => setStreaming((s) => !s)}>
          {streaming ? '切换为已完成态' : '重新模拟流式思考'}
        </Button>
      </div>
    </div>
  )
}

function ConfirmationInteractiveDemo() {
  const [state, setState] = React.useState<AiConfirmationState>('requested')
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <AiConfirmation
        state={state}
        risk="high"
        title="申请执行数据库索引迁移"
        description="将在主库 orders 表创建并发索引，预计耗时 18 秒且不阻塞读写。"
        command="CREATE INDEX CONCURRENTLY idx_orders_tenant_created ON orders (tenant_id, created_at DESC);"
        onApprove={() => setState('approved')}
        onReject={() => setState('rejected')}
      />
      {state !== 'requested' && (
        <div className="flex justify-end">
          <Button size="sm" variant="ghost" onClick={() => setState('requested')}>
            重置为待确认
          </Button>
        </div>
      )}
    </div>
  )
}

function ContextAndModelDemo() {
  const [model, setModel] = React.useState('gemini-3-pro')
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AiModelSelector models={DEMO_MODELS} value={model} onValueChange={setModel} side="bottom" />
      <AiContextMeter
        usage={{
          usedTokens: 64_200,
          maxTokens: 200_000,
          inputTokens: 24_800,
          cachedTokens: 28_400,
          reasoningTokens: 6_800,
          outputTokens: 4_200,
          estimatedCost: '$0.19',
        }}
      />
    </div>
  )
}

function FileTreeDemo() {
  const [selected, setSelected] = React.useState('registry/glaze/ui/reasoning.tsx')
  const nodes: AiFileTreeNode[] = [
    {
      path: 'registry',
      name: 'registry/glaze/ui',
      type: 'folder',
      children: [
        { path: 'registry/glaze/ui/conversation.tsx', name: 'conversation.tsx', type: 'file', status: 'added' },
        { path: 'registry/glaze/ui/reasoning.tsx', name: 'reasoning.tsx', type: 'file', status: 'added' },
        { path: 'registry/glaze/ui/index.ts', name: 'index.ts', type: 'file', status: 'modified' },
      ],
    },
  ]
  return (
    <div className="w-full max-w-sm">
      <AiFileTree
        nodes={nodes}
        selectedPath={selected}
        onSelectPath={setSelected}
        defaultExpanded={['registry']}
      />
    </div>
  )
}

export const AI_DEMOS: Record<string, ComponentDemoGroup> = {
  conversation: {
    hero: {
      align: 'start',
      surface: 'canvas',
      render: () => (
        <Conversation className="h-[320px] w-full rounded-tile bg-white">
          <ConversationContent>
            <Message from="user">
              <MessageAvatar from="user" label="PT" />
              <MessageContent from="user">
                帮我总结一下 Glaze UI 的卡片圆角和色彩规则。
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar from="assistant" />
              <MessageContent from="assistant">
                <p className="m-0">
                  Glaze 画布固定为 #F2F4F8，卡片统一采用 28px 圆角且严禁添加描边或阴影，依靠纯白与 9 组柔彩底色建立自然层级。
                </p>
                <MessageQuickToolbar textToCopy="Glaze 画布固定为 #F2F4F8，卡片统一采用 28px 圆角且严禁添加描边或阴影。" />
              </MessageContent>
            </Message>
          </ConversationContent>
          <ConversationScrollButton forceVisible />
        </Conversation>
      ),
      code: `import {
  Conversation,
  ConversationContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageQuickToolbar,
} from '@/components/ui/conversation'

export function Example() {
  return (
    <Conversation className="h-[320px] rounded-tile bg-white">
      <ConversationContent>
        <Message from="user">
          <MessageAvatar from="user" label="PT" />
          <MessageContent from="user">帮我总结一下 Glaze UI 的圆角规范。</MessageContent>
        </Message>
        <Message from="assistant">
          <MessageAvatar from="assistant" />
          <MessageContent from="assistant">
            <p className="m-0">卡片统一 28px 圆角，无描边无阴影。</p>
            <MessageQuickToolbar textToCopy="卡片统一 28px 圆角，无描边无阴影。" />
          </MessageContent>
        </Message>
      </ConversationContent>
    </Conversation>
  )
}`,
    },
    examples: [
      {
        id: 'branch-and-actions',
        title: '多版本分支切换与快捷操作栏',
        description: '结合 MessageBranch 与 MessageQuickToolbar 实现类似 ChatGPT/Claude 的多候选回复切换与一键复制。',
        render: () => <ConversationBranchDemo />,
        code: `import { Message, MessageAvatar, MessageBranch, MessageContent, MessageQuickToolbar } from '@/components/ui/conversation'`,
      },
      {
        id: 'empty-state',
        title: '空会话引导态（ConversationEmptyState）',
        description: '新会话尚未产生消息时，展示柔和色块图标、标题与快捷提示插槽。',
        render: () => (
          <ConversationEmptyState
            title="Glaze AI 助手已就绪"
            description="支持代码审查、指标诊断与 Bento 看板生成。"
            hue="periwinkle"
          >
            <AiSuggestions>
              <AiSuggestion suggestion="生成 4 列监控大屏" variant="tinted" hue="sky" />
              <AiSuggestion suggestion="检查无障碍键盘导航" variant="tinted" hue="mint" />
            </AiSuggestions>
          </ConversationEmptyState>
        ),
        code: `import { ConversationEmptyState } from '@/components/ui/conversation'`,
      },
    ],
  },

  'prompt-input': {
    hero: {
      surface: 'canvas',
      render: () => <PromptInputInteractiveDemo />,
      code: `import {
  PromptInput,
  PromptInputAttachments,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputAction,
  PromptInputSubmit,
} from '@/components/ui/prompt-input'

export function Example() {
  return (
    <PromptInput onSubmit={() => {}}>
      <PromptInputTextarea placeholder="向智能体提问，Enter 发送…" />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputAction active hue="lilac">深度思考</PromptInputAction>
        </PromptInputTools>
        <PromptInputSubmit status="ready" />
      </PromptInputToolbar>
    </PromptInput>
  )
}`,
    },
    examples: [
      {
        id: 'submit-states',
        title: '发送按钮四种状态（ready / submitted / streaming / error）',
        description: 'PromptInputSubmit 自动根据流式状态在发送箭头、停止方块与异常提示间切换。',
        minHeight: 140,
        render: () => (
          <div className="flex flex-wrap items-center gap-6">
            {(['ready', 'submitted', 'streaming', 'error'] as const).map((st) => (
              <div key={st} className="flex flex-col items-center gap-1.5">
                <PromptInputSubmit status={st} />
                <span className="font-glaze-mono text-[11px] text-[#6B7280]">{st}</span>
              </div>
            ))}
          </div>
        ),
        code: `import { PromptInputSubmit } from '@/components/ui/prompt-input'`,
      },
    ],
  },

  reasoning: {
    hero: {
      render: () => <ReasoningStreamingDemo />,
      code: `import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ui/reasoning'

export function Example() {
  return (
    <Reasoning isStreaming={false} duration={3.4} defaultOpen>
      <ReasoningTrigger />
      <ReasoningContent>
        对比候选架构并确认纯 CSS 过渡参数，确保零卡顿。
      </ReasoningContent>
    </Reasoning>
  )
}`,
    },
    examples: [
      {
        id: 'hues',
        title: '多柔彩色相变体',
        description: '可通过 hue 属性切换 lilac / periwinkle / sky 等柔彩表面，适配不同类型模型或子智能体。',
        render: () => (
          <div className="flex w-full max-w-xl flex-col gap-2.5">
            <Reasoning hue="periwinkle" duration={1.9} defaultOpen={false}>
              <ReasoningTrigger title="架构规划思考 · 1.9 秒" />
              <ReasoningContent>已拆解为 4 个独立模块并检查循环依赖。</ReasoningContent>
            </Reasoning>
            <Reasoning hue="aqua" duration={0.8} defaultOpen={false}>
              <ReasoningTrigger title="SQL 查询优化思考 · 0.8 秒" />
              <ReasoningContent>已将全表扫描改写为覆盖索引分页查询。</ReasoningContent>
            </Reasoning>
          </div>
        ),
        code: `import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ui/reasoning'`,
      },
    ],
  },

  'chain-of-thought': {
    hero: {
      render: () => (
        <div className="w-full max-w-xl">
          <ChainOfThought defaultOpen>
            <ChainOfThoughtHeader badge={<HueTag hue="mint" size="xs">3 步</HueTag>}>
              已完成 3 步文档与代码库调研
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="检索 Glaze Token 定义"
                description="定位 HUE_PALETTES 与 TILE_THEMES 柔彩映射表"
                duration="120ms"
                status="complete"
              />
              <ChainOfThoughtStep
                label="对比 shadcn AI Elements 组件清单"
                duration="340ms"
                status="complete"
              >
                <ChainOfThoughtSearchResults>
                  <ChainOfThoughtSearchResult href="https://ui.shadcn.com/docs/ai-elements" hue="periwinkle">
                    ui.shadcn.com/docs/ai-elements
                  </ChainOfThoughtSearchResult>
                  <ChainOfThoughtSearchResult href="https://base-ui.com" hue="sky">
                    base-ui.com
                  </ChainOfThoughtSearchResult>
                </ChainOfThoughtSearchResults>
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="验证 Astro 静态构建与类型检查"
                status="active"
              />
            </ChainOfThoughtContent>
          </ChainOfThought>
        </div>
      ),
      code: `import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
} from '@/components/ui/chain-of-thought'`,
    },
    examples: [],
  },

  'tool-call': {
    hero: {
      render: () => (
        <div className="flex w-full max-w-xl flex-col gap-3">
          <ToolCall defaultOpen>
            <ToolCallHeader
              name="query_cluster_metrics"
              title="查询集群延迟指标"
              state="output-available"
              duration="184ms"
            />
            <ToolCallContent>
              <ToolCallInput input={{ region: 'ap-east-1', metric: 'p99_ms', window: '1h' }} />
              <ToolCallOutput output={{ p99_ms: 42.6, error_rate: 0.001, healthy: true }} />
            </ToolCallContent>
          </ToolCall>
          <ToolCall defaultOpen={false}>
            <ToolCallHeader
              name="deploy_edge_worker"
              title="推送边缘函数"
              state="output-error"
              duration="620ms"
            />
            <ToolCallContent>
              <ToolCallInput input={{ env: 'staging', region: 'global' }} />
              <ToolCallOutput errorText="Error: Missing CLOUDFLARE_API_TOKEN in environment." />
            </ToolCallContent>
          </ToolCall>
        </div>
      ),
      code: `import { ToolCall, ToolCallHeader, ToolCallContent, ToolCallInput, ToolCallOutput } from '@/components/ui/tool-call'`,
    },
    examples: [],
  },

  'ai-plan': {
    hero: {
      render: () => (
        <div className="w-full max-w-xl">
          <AiPlan defaultOpen>
            <AiPlanHeader
              title="重构认证中间件执行计划"
              description="共 4 个阶段 · 自动校验单元测试"
              completed={2}
              total={4}
              streaming
            />
            <AiPlanContent>
              <AiPlanStep title="提取 JWT 校验工具函数" status="done" duration="0.6s" />
              <AiPlanStep title="替换旧版 Session Cookie 解析逻辑" status="done" duration="1.1s" />
              <AiPlanStep title="补充刷新令牌并发锁测试" detail="正在运行 vitest auth.spec.ts" status="running" />
              <AiPlanStep title="更新 API 迁移文档" status="pending" />
            </AiPlanContent>
            <AiPlanFooter>
              <Button size="sm" variant="secondary">暂停计划</Button>
              <Button size="sm" variant="primary">查看完整日志</Button>
            </AiPlanFooter>
          </AiPlan>
        </div>
      ),
      code: `import { AiPlan, AiPlanHeader, AiPlanContent, AiPlanStep } from '@/components/ui/ai-plan'`,
    },
    examples: [],
  },

  'ai-confirmation': {
    hero: {
      render: () => <ConfirmationInteractiveDemo />,
      code: `import { AiConfirmation } from '@/components/ui/ai-confirmation'

export function Example() {
  return (
    <AiConfirmation
      state="requested"
      risk="high"
      title="申请执行数据库索引迁移"
      description="将在主库 orders 表创建并发索引。"
      command="CREATE INDEX CONCURRENTLY idx_orders_tenant ON orders (tenant_id);"
      onApprove={() => {}}
      onReject={() => {}}
    />
  )
}`,
    },
    examples: [
      {
        id: 'risk-levels',
        title: '低 / 中 / 高三级风险色板',
        description: '自动映射至 Glaze 天蓝（low）、杏桃（medium）与珊瑚（high）柔彩色板。',
        render: () => (
          <div className="flex w-full max-w-xl flex-col gap-3">
            <AiConfirmation risk="low" state="approved" title="读取只读监控指标" description="已自动放行只读 Prometheus 查询。" />
            <AiConfirmation risk="medium" state="requested" title="更新 Staging 环境变量" description="将新增 FEATURE_AI_TRACE=true。" />
            <AiConfirmation risk="high" state="rejected" title="清空生产缓存分片" description="已被值班工程师拒绝。" />
          </div>
        ),
        code: `import { AiConfirmation } from '@/components/ui/ai-confirmation'`,
      },
    ],
  },

  'ai-sources': {
    hero: {
      render: () => (
        <div className="flex w-full max-w-xl flex-col gap-4">
          <p className="m-0 text-[14px] leading-relaxed text-[#1B1F27]">
            Glaze 组件基于 Base UI 1.9 原语构建，通过 <code className="rounded bg-[#F2F3F5] px-1 py-0.5 text-[12px]">render</code> 属性实现无障碍触发器组合
            <InlineCitation
              index={1}
              title="Base UI Composition Guide"
              url="https://base-ui.com/react/handbook/composition"
              domain="base-ui.com"
              snippet="Use the render prop instead of Radix asChild to compose custom triggers safely."
            />
            ，并遵循 4 列 Dense Bento 栅格与无描边卡片体系
            <InlineCitation
              index={2}
              title="Glaze Design Foundations"
              url="https://github.com/pengtikui/glaze-ui"
              domain="glaze-ui.dev"
              snippet="画布背景 #F2F4F8，卡片 28px 圆角无描边，推荐 60% 纯白 + 30% 柔彩 + 10% 深色卡。"
              hue="sky"
            />
            。
          </p>
          <AiSources defaultOpen>
            <AiSourcesTrigger count={2} />
            <AiSourcesContent>
              <AiSourceItem
                title="Base UI v1.9 Composition Handbook"
                url="https://base-ui.com/react/handbook/composition"
                domain="base-ui.com"
                snippet="详解 render prop、Floating UI 定位与纯 CSS data-starting-style 动画。"
                score={0.97}
                hue="sky"
              />
              <AiSourceItem
                title="shadcn/ui AI Elements Patterns"
                url="https://ui.shadcn.com/docs/ai-elements"
                domain="ui.shadcn.com"
                snippet="面向 Agentic 应用的标准化对话、思维链、工具与引用模式。"
                score={0.93}
                hue="periwinkle"
              />
            </AiSourcesContent>
          </AiSources>
        </div>
      ),
      code: `import { AiSources, AiSourcesTrigger, AiSourcesContent, AiSourceItem, InlineCitation } from '@/components/ui/ai-sources'`,
    },
    examples: [],
  },

  'ai-code-block': {
    hero: {
      render: () => (
        <div className="flex w-full max-w-2xl flex-col gap-3">
          <AiCodeBlock
            filename="registry/glaze/styles/glaze.css"
            language="diff"
            diff
            code={`--- a/glaze.css\n+++ b/glaze.css\n- .old-pulse { opacity: 0.5; }\n+ .animate-glaze-shimmer {\n+   animation: glaze-shimmer 2.2s linear infinite;\n+ }`}
          />
          <AiTerminal
            command="pnpm run build:registry && pnpm run typecheck"
            output={`✓ Built 202 registry items to public/r/\n✓ Generated public/llms-full.txt\n✓ TypeScript strict check passed (0 errors)`}
            status="success"
            exitCode={0}
          />
        </div>
      ),
      code: `import { AiCodeBlock, AiTerminal } from '@/components/ui/ai-code-block'`,
    },
    examples: [
      {
        id: 'dark-code-block',
        title: '深色代码表面与运行中终端光标',
        description: 'AiCodeBlock 支持 dark 表面变体，AiTerminal 在 status="running" 时自动显示闪烁光标。',
        render: () => (
          <div className="flex w-full max-w-2xl flex-col gap-3">
            <AiCodeBlock
              variant="dark"
              filename="agent.ts"
              language="ts"
              code={`const result = await streamText({\n  model: google('gemini-3-pro'),\n  prompt: '设计 Glaze AI Elements',\n})`}
            />
            <AiTerminal
              command="pnpm test --watch"
              output="Running 18 test suites..."
              status="running"
            />
          </div>
        ),
        code: `import { AiCodeBlock, AiTerminal } from '@/components/ui/ai-code-block'`,
      },
    ],
  },

  'ai-suggestions': {
    hero: {
      render: () => (
        <div className="flex w-full max-w-xl flex-col gap-4">
          <AiSuggestions>
            <AiSuggestion suggestion="总结今天集群告警" variant="tinted" hue="sky" />
            <AiSuggestion suggestion="生成 SQL 性能诊断" variant="tinted" hue="periwinkle" />
            <AiSuggestion suggestion="编写组件单元测试" variant="neutral" />
          </AiSuggestions>
          <AiQueue
            items={[
              { id: '1', title: '运行 TypeScript 严格校验', meta: '运行中', status: 'running' },
              { id: '2', title: '生成静态文档站产物', meta: '待执行', status: 'pending' },
              { id: '3', title: '编译 12 个 AI Elements 组件', meta: '1.1s', status: 'completed' },
            ]}
          />
        </div>
      ),
      code: `import { AiSuggestions, AiSuggestion, AiQueue } from '@/components/ui/ai-suggestions'`,
    },
    examples: [],
  },

  'ai-context-meter': {
    hero: {
      render: () => <ContextAndModelDemo />,
      code: `import { AiContextMeter, AiModelSelector } from '@/components/ui/ai-context-meter'`,
    },
    examples: [],
  },

  'ai-artifact': {
    hero: {
      surface: 'canvas',
      render: () => (
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <AiArtifact
            title="KPI 摘要卡产物"
            subtitle="由 Glaze AI 生成 · 支持预览/源码切换"
            badge="TSX"
            copyText={`<Tile tone="periwinkle">48.2k tokens</Tile>`}
            preview={
              <Tile tone="periwinkle" padding="compact" className="min-h-28">
                <div className="flex items-center gap-1.5 text-[12px] font-bold">
                  <Sparkle size={14} weight="duotone" />
                  <span>实时推理吞吐</span>
                </div>
                <span className="mt-2 font-glaze-display text-[32px] font-extrabold">118 tok/s</span>
              </Tile>
            }
            code={
              <AiCodeBlock
                language="tsx"
                code={`<Tile tone="periwinkle" padding="compact">\n  <span>实时推理吞吐</span>\n  <strong>118 tok/s</strong>\n</Tile>`}
              />
            }
          />
          <AiCheckpoint label="检查点 #2 · 产物已生成" timestamp="11:32" onRestore={() => {}} />
        </div>
      ),
      code: `import { AiArtifact, AiFileTree, AiCheckpoint } from '@/components/ui/ai-artifact'`,
    },
    examples: [
      {
        id: 'file-tree',
        title: '变更文件树（AiFileTree）',
        description: '展示智能体在工作区中新增（A）、修改（M）或删除（D）的文件结构，支持展开折叠与选中回调。',
        render: () => <FileTreeDemo />,
        code: `import { AiFileTree } from '@/components/ui/ai-artifact'`,
      },
    ],
  },
}
