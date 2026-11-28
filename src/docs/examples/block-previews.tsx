import * as React from 'react'
import { AiChatWorkbenchBlock } from '@/components/blocks/ai-chat-workbench-block'
import { AuthLoginBlock } from '@/components/blocks/auth-login-block'
import { CalendarBookingBlock } from '@/components/blocks/calendar-booking-block'
import { DashboardKpiOverviewBlock } from '@/components/blocks/dashboard-kpi-overview-block'
import { DataManagementBlock } from '@/components/blocks/data-management-block'
import { PricingComparisonBlock } from '@/components/blocks/pricing-comparison-block'
import { SettingsAccountBlock } from '@/components/blocks/settings-account-block'
import { SplitInboxBlock } from '@/components/blocks/split-inbox-block'
import { TeamMembersBlock } from '@/components/blocks/team-members-block'
import { TopologyHealthPanelBlock } from '@/components/blocks/topology-health-panel-block'

export const BLOCK_PREVIEW_RENDERERS: Record<string, () => React.ReactNode> = {
  'auth-login-block': () => <AuthLoginBlock />,
  'dashboard-kpi-overview-block': () => <DashboardKpiOverviewBlock />,
  'data-management-block': () => <DataManagementBlock />,
  'pricing-comparison-block': () => <PricingComparisonBlock />,
  'settings-account-block': () => <SettingsAccountBlock />,
  'calendar-booking-block': () => <CalendarBookingBlock />,
  'ai-chat-workbench-block': () => <AiChatWorkbenchBlock />,
  'team-members-block': () => <TeamMembersBlock />,
  'split-inbox-block': () => <SplitInboxBlock />,
  'topology-health-panel-block': () => <TopologyHealthPanelBlock />,
}
