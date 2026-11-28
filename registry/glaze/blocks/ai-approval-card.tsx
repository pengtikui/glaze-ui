import * as React from 'react'
import {
  AiConfirmation,
  type AiConfirmationRisk,
  type AiConfirmationState,
} from '@/components/ui/ai-confirmation'
import { Tile } from '@/components/ui/tile'
import type { TileTone } from '@/lib/tokens'

export interface AiApprovalCardProps {
  title: string
  description: string
  command?: string
  risk?: AiConfirmationRisk
  initialState?: AiConfirmationState
  onDecision?: (decision: 'approved' | 'rejected') => void
  tone?: TileTone
}

export function AiApprovalCard({
  title,
  description,
  command,
  risk = 'high',
  initialState = 'requested',
  onDecision,
  tone = 'white',
}: AiApprovalCardProps) {
  const [state, setState] = React.useState<AiConfirmationState>(initialState)

  const decide = (next: 'approved' | 'rejected') => {
    setState(next)
    onDecision?.(next)
  }

  return (
    <Tile size="w" tone={tone} padding="compact" className="justify-between gap-2">
      <AiConfirmation
        state={state}
        risk={risk}
        title={title}
        description={description}
        command={command}
        onApprove={() => decide('approved')}
        onReject={() => decide('rejected')}
      />
      {state !== 'requested' && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setState('requested')}
            className="cursor-pointer rounded-full bg-[#F2F3F5] px-3 py-1 text-[11px] font-semibold text-[#5B6170] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
          >
            重置演示状态
          </button>
        </div>
      )}
    </Tile>
  )
}
