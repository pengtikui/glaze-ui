import { AiPlan, AiPlanContent, AiPlanHeader, AiPlanStep, type AiPlanStepItem } from '@/components/ui/ai-plan'
import { AiQueue, type AiQueueTask } from '@/components/ui/ai-suggestions'
import { Tile } from '@/components/ui/tile'
import type { Hue, TileTone } from '@/lib/tokens'

export interface AiPlanQueueCardProps {
  planTitle?: string
  planDescription?: string
  steps: AiPlanStepItem[]
  queueItems?: AiQueueTask[]
  hue?: Hue
  tone?: TileTone
}

export function AiPlanQueueCard({
  planTitle = '发布自动化迁移计划',
  planDescription = 'Agent 自动拆解 · 实时追踪进度',
  steps,
  queueItems = [],
  hue = 'periwinkle',
  tone = 'white',
}: AiPlanQueueCardProps) {
  const completed = steps.filter((s) => s.status === 'done').length

  return (
    <Tile size="t" tone={tone} className="justify-start gap-3">
      <AiPlan defaultOpen>
        <AiPlanHeader
          title={planTitle}
          description={planDescription}
          completed={completed}
          total={steps.length}
          hue={hue}
          streaming={steps.some((s) => s.status === 'running')}
        />
        <AiPlanContent>
          {steps.map((step) => (
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

      {queueItems.length > 0 && <AiQueue items={queueItems} title="后续排队任务" />}
    </Tile>
  )
}
