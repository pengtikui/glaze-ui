import * as React from 'react'
import { useToast } from '@/components/ui/toast'
import { AdminShellDemoPage } from '@/registry/glaze/demos/admin-shell-demo'
import { AiStudioDemoPage } from '@/registry/glaze/demos/ai-studio-demo'
import { AnalyticsDemoPage } from '@/registry/glaze/demos/analytics-demo'
import { CloudOpsDemoPage } from '@/registry/glaze/demos/cloud-ops-demo'
import { HomelabDemoPage } from '@/registry/glaze/demos/homelab-demo'
import { PersonalOsDemoPage } from '@/registry/glaze/demos/personal-os-demo'
import { SmartHomeDemoPage } from '@/registry/glaze/demos/smart-home-demo'
import { WorkspaceDemoPage } from '@/registry/glaze/demos/workspace-demo'
import { BLOCKS_MAP } from '@/docs/data/catalog'
import { BLOCK_PREVIEW_RENDERERS } from '@/docs/examples/block-previews'

const DEMO_COMPONENTS: Record<string, React.ComponentType> = {
  homelab: HomelabDemoPage,
  workspace: WorkspaceDemoPage,
  'smart-home': SmartHomeDemoPage,
  analytics: AnalyticsDemoPage,
  'personal-os': PersonalOsDemoPage,
  'cloud-ops': CloudOpsDemoPage,
  'admin-shell': AdminShellDemoPage,
  'ai-studio': AiStudioDemoPage,
}

const FULL_BLEED_DEMOS = new Set(['admin-shell', 'ai-studio'])

/**
 * Pure standalone Demo canvas — completely outside the docs site header/sidebar/frame.
 */
export function StandaloneDemoViewPage({ slug }: { slug: string }) {
  const DemoComp = DEMO_COMPONENTS[slug]

  if (!DemoComp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6 text-[#1B1F27]">
        <div className="rounded-tile bg-white p-8 text-center">
          <h1 className="m-0 font-glaze-display text-[24px] font-extrabold">未找到 Demo：{slug}</h1>
          <p className="m-0 mt-2 text-[14px] text-[#6B7280]">
            可用路径：homelab · workspace · smart-home · analytics · personal-os · cloud-ops · admin-shell
          </p>
        </div>
      </div>
    )
  }

  if (FULL_BLEED_DEMOS.has(slug)) {
    return <DemoComp />
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <main className="mx-auto max-w-312 px-6 py-10">
        <DemoComp />
      </main>
    </div>
  )
}

/**
 * Pure standalone Block canvas — renders a single card cleanly outside the docs frame.
 */
export function StandaloneBlockViewPage({ slug }: { slug: string }) {
  const toast = useToast()
  const [demoSwitch, setDemoSwitch] = React.useState(true)
  const block = BLOCKS_MAP[slug]
  const renderPreview = BLOCK_PREVIEW_RENDERERS[slug]

  if (!block || !renderPreview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F4F8] p-6 text-[#1B1F27]">
        <div className="rounded-tile bg-white p-8 text-center">
          <h1 className="m-0 font-glaze-display text-[22px] font-extrabold">未找到卡片：{slug}</h1>
        </div>
      </div>
    )
  }

  const maxW =
    block.size === 's' || block.size === 't'
      ? 'max-w-[340px]'
      : block.size === 'w' || block.size === 'l'
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
