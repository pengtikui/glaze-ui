import * as React from 'react'
import { useToast } from '@/components/ui/toast'
import { BLOCKS_MAP, CARDS_MAP, PAGES_MAP } from '@/docs/data/catalog'
import { BLOCK_PREVIEW_RENDERERS } from '@/docs/examples/block-previews'
import { CARD_PREVIEW_RENDERERS } from '@/docs/examples/card-previews'
import { AdminShellDemoPage } from '@/registry/glaze/pages/admin-shell-demo'
import { AiStudioDemoPage } from '@/registry/glaze/pages/ai-studio-demo'
import { AnalyticsDemoPage } from '@/registry/glaze/pages/analytics-demo'
import { AuthOnboardingPage } from '@/registry/glaze/pages/auth-onboarding-page'
import { CalendarPlannerPage } from '@/registry/glaze/pages/calendar-planner-page'
import { CloudOpsDemoPage } from '@/registry/glaze/pages/cloud-ops-demo'
import { CrmPipelinePage } from '@/registry/glaze/pages/crm-pipeline-page'
import { HomeNetworkDemoPage } from '@/registry/glaze/pages/home-network-demo'
import { HomelabDemoPage } from '@/registry/glaze/pages/homelab-demo'
import { MailDeskPage } from '@/registry/glaze/pages/mail-desk-page'
import { NetworkTopologyDemoPage } from '@/registry/glaze/pages/network-topology-demo'
import { PersonalOsDemoPage } from '@/registry/glaze/pages/personal-os-demo'
import { SettingsPortalPage } from '@/registry/glaze/pages/settings-portal-page'
import { SmartHomeDemoPage } from '@/registry/glaze/pages/smart-home-demo'
import { WorkspaceDemoPage } from '@/registry/glaze/pages/workspace-demo'

const PAGE_COMPONENTS: Record<string, React.ComponentType> = {
  'mail-desk': MailDeskPage,
  'calendar-planner': CalendarPlannerPage,
  'crm-pipeline': CrmPipelinePage,
  'settings-portal': SettingsPortalPage,
  'auth-onboarding': AuthOnboardingPage,
  'admin-shell': AdminShellDemoPage,
  'ai-studio': AiStudioDemoPage,
  'network-topology': NetworkTopologyDemoPage,
  'home-network': HomeNetworkDemoPage,
  homelab: HomelabDemoPage,
  workspace: WorkspaceDemoPage,
  'smart-home': SmartHomeDemoPage,
  analytics: AnalyticsDemoPage,
  'personal-os': PersonalOsDemoPage,
  'cloud-ops': CloudOpsDemoPage,
}

/**
 * Pure standalone full Page canvas — completely outside the docs site frame.
 */
export function StandalonePageViewPage({ slug }: { slug: string }) {
  const PageComp = PAGE_COMPONENTS[slug]
  const meta = PAGES_MAP[slug]

  if (!PageComp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6 text-[#1B1F27]">
        <div className="rounded-tile bg-white p-8 text-center">
          <h1 className="m-0 font-glaze-display text-[24px] font-extrabold">未找到页面：{slug}</h1>
        </div>
      </div>
    )
  }

  if (meta?.fullBleed) {
    return <PageComp />
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <main className="mx-auto max-w-312 px-6 py-10">
        <PageComp />
      </main>
    </div>
  )
}

/**
 * Pure standalone Card canvas — renders a single card cleanly outside the docs frame.
 */
export function StandaloneCardViewPage({ slug }: { slug: string }) {
  const toast = useToast()
  const [demoSwitch, setDemoSwitch] = React.useState(true)
  const card = CARDS_MAP[slug]
  const renderPreview = CARD_PREVIEW_RENDERERS[slug]

  if (!card || !renderPreview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6 text-[#1B1F27]">
        <div className="rounded-tile bg-white p-8 text-center">
          <h1 className="m-0 font-glaze-display text-[22px] font-extrabold">未找到卡片：{slug}</h1>
        </div>
      </div>
    )
  }

  const maxW =
    card.size === 's' || card.size === 't'
      ? 'max-w-[340px]'
      : card.size === 'w' || card.size === 'l'
        ? 'max-w-[680px]'
        : 'max-w-[1200px]'

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6 text-[#1B1F27]">
      <div className={`w-full ${maxW}`}>
        {renderPreview({ toast, demoSwitch, setDemoSwitch })}
      </div>
    </div>
  )
}

/**
 * Pure standalone Block canvas — renders a reusable composite Block outside the docs frame.
 */
export function StandaloneBlockViewPage({ slug }: { slug: string }) {
  const block = BLOCKS_MAP[slug]
  const renderPreview = BLOCK_PREVIEW_RENDERERS[slug]

  if (!block || !renderPreview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6 text-[#1B1F27]">
        <div className="rounded-tile bg-white p-8 text-center">
          <h1 className="m-0 font-glaze-display text-[22px] font-extrabold">未找到 Block：{slug}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">{renderPreview()}</main>
    </div>
  )
}
