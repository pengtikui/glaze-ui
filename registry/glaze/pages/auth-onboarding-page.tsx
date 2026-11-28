import * as React from 'react'
import { CheckCircle, RocketLaunch, Sparkle } from '@phosphor-icons/react'
import { AuthLoginBlock } from '@/components/blocks/auth-login-block'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { RadioGroup } from '@/components/ui/radio-group'
import { Radio } from '@/components/ui/radio'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select } from '@/components/ui/select'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'

const TEMPLATES = [
  { value: 'saas', label: 'SaaS 控制台与运营后台', desc: '预装侧边栏、TanStack 数据台账与账单设置' },
  { value: 'ai', label: 'AI 智能体与应用工作台', desc: '预装流式对话、思维链追踪与产物预览分栏' },
  { value: 'ops', label: '云原生运维与拓扑监控', desc: '预装 ELK 拓扑画布、SLA 可用性矩阵与告警流' },
]

export function AuthOnboardingPage() {
  const toast = useToast()
  const [flow, setFlow] = React.useState<'login' | 'wizard'>('login')
  const [step, setStep] = React.useState<1 | 2 | 3>(1)
  const [workspaceName, setWorkspaceName] = React.useState('Glaze Studio')
  const [region, setRegion] = React.useState('cn-east')
  const [template, setTemplate] = React.useState('saas')
  const [inviteEmails, setInviteEmails] = React.useState('chen@glaze.design, zhou@glaze.design')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2F4F8] px-4 py-10 text-[#1B1F27]">
      <div className="flex w-full max-w-[1040px] flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#123A5C] font-glaze-display text-[16px] font-extrabold text-white">
              G
            </span>
            <div>
              <div className="font-glaze-display text-[18px] font-extrabold text-[#123A5C]">
                Glaze Cloud Portal
              </div>
              <div className="text-[12px] text-[#6B7280]">
                PAGE 15 · AUTH.FLOW · 认证登录与多步入驻引导
              </div>
            </div>
          </div>

          <SegmentedControl
            size="sm"
            value={flow}
            onValueChange={setFlow}
            options={[
              { value: 'login', label: '登录认证' },
              { value: 'wizard', label: '新空间入驻向导' },
            ]}
          />
        </header>

        {flow === 'login' ? (
          <AuthLoginBlock
            onSuccess={() => {
              setFlow('wizard')
              setStep(1)
            }}
          />
        ) : (
          <Tile tone="white" className="gap-6 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <HueTag hue="periwinkle" size="sm">
                  步骤 {step} / 3
                </HueTag>
                <h2 className="m-0 mt-2 font-glaze-display text-[26px] font-extrabold text-[#123A5C]">
                  {step === 1
                    ? '创建你的团队工作空间'
                    : step === 2
                      ? '选择起始场景与邀请协作者'
                      : '空间初始化完成，准备出发'}
                </h2>
              </div>
              <div className="w-48">
                <Progress value={(step / 3) * 100} hue="periwinkle" height="sm" />
              </div>
            </div>

            {step === 1 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#1B1F27]">工作空间名称</label>
                  <Input
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="输入团队或产品名称"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#1B1F27]">数据驻留区域</label>
                  <Select
                    value={region}
                    onValueChange={(v) => setRegion(v ?? 'cn-east')}
                    options={[
                      { value: 'cn-east', label: '华东 · 上海可用区' },
                      { value: 'ap-sg', label: '亚太 · 新加坡节点' },
                      { value: 'us-west', label: '美西 · 硅谷节点' },
                    ]}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <RadioGroup
                  value={template}
                  onValueChange={(v) => setTemplate(String(v))}
                  className="grid grid-cols-1 gap-3 md:grid-cols-3"
                >
                  {TEMPLATES.map((tpl) => (
                    <label
                      key={tpl.value}
                      className="flex cursor-pointer flex-col gap-2 rounded-inner bg-[#F6F7F9] p-4 transition-colors hover:bg-[#EEF0F4]"
                    >
                      <Radio value={tpl.value} label={tpl.label} />
                      <span className="pl-7 text-[12px] text-[#6B7280]">{tpl.desc}</span>
                    </label>
                  ))}
                </RadioGroup>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#1B1F27]">
                    首批协作者邮箱（逗号分隔）
                  </label>
                  <Input
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center gap-4 rounded-inner bg-[#E7F4E4]/70 p-8 text-center">
                <CheckCircle size={44} weight="duotone" className="text-[#2F6B28]" />
                <div className="flex items-center gap-2">
                  <span className="font-glaze-display text-[22px] font-extrabold text-[#123A5C]">
                    {workspaceName} 已就绪
                  </span>
                  <StatusPill status="normal" label="部署完成" size="sm" />
                </div>
                <p className="m-0 max-w-md text-[13.5px] text-[#2B5825]">
                  已为你在 {region} 区域初始化「{TEMPLATES.find((t) => t.value === template)?.label}」模板，并向协作者发送了入驻邀请。
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <Button
                    variant="primary"
                    onClick={() =>
                      toast({
                        title: `欢迎进入 ${workspaceName}`,
                        description: '全部组件与默认权限已激活',
                        status: 'normal',
                      })
                    }
                  >
                    <RocketLaunch size={16} weight="bold" />
                    <span>立即进入控制台</span>
                  </Button>
                  <Button variant="secondary" onClick={() => setStep(1)}>
                    <Sparkle size={15} weight="bold" />
                    <span>重新配置</span>
                  </Button>
                </div>
              </div>
            )}

            {step < 3 && (
              <div className="flex items-center justify-between border-t border-[#EEF0F3] pt-4">
                <Button
                  variant="ghost"
                  disabled={step === 1}
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : 1))}
                >
                  上一步
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : 3))}
                >
                  {step === 1 ? '下一步：选择模板' : '完成并初始化空间'}
                </Button>
              </div>
            )}
          </Tile>
        )}
      </div>
    </div>
  )
}
