import * as React from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { HueTag } from '@/components/ui/hue-tag'
import { NumberField } from '@/components/ui/number-field'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface PricingComparisonBlockProps {
  title?: string
  subtitle?: string
}

const PLANS: {
  id: string
  name: string
  badge?: string
  tone: TileTone
  monthlyPrice: number
  desc: string
  features: string[]
  cta: string
}[] = [
  {
    id: 'starter',
    name: 'Starter 个人版',
    tone: 'white',
    monthlyPrice: 0,
    desc: '适合独立开发者与小规模原型验证',
    features: ['最多 3 个项目空间', '基础组件与卡片全部免费', '社区工单响应', '7 天操作审计日志'],
    cta: '免费开始',
  },
  {
    id: 'pro',
    name: 'Pro 团队协作版',
    badge: '最受欢迎',
    tone: 'sky-dark',
    monthlyPrice: 129,
    desc: '面向成长型研发与设计团队的完整工作流',
    features: ['无限项目与私有 Registry 托管', 'AI Copilot 与实时多端协同', '99.95% SLA 与专属技术支持', '180 天审计日志与角色权限'],
    cta: '升级至 Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise 企业版',
    tone: 'periwinkle',
    monthlyPrice: 369,
    desc: '金融与大型组织私有化部署与安全合规',
    features: ['SAML SSO / SCIM 自动同步', '独立专享集群与 VPC 对等连接', '自定义数据保留策略与合规报告', '7×24 专属架构师驻场响应'],
    cta: '联系商务顾问',
  },
]

export function PricingComparisonBlock({
  title = '透明灵活的团队订阅方案',
  subtitle = '按需增减协作席位，年付立享 8 折优惠，随时可无损切换档位',
}: PricingComparisonBlockProps) {
  const toast = useToast()
  const [billing, setBilling] = React.useState<'monthly' | 'yearly'>('yearly')
  const [seats, setSeats] = React.useState<number | null>(5)
  const seatCount = Math.max(1, seats ?? 5)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <HueTag hue="periwinkle" size="sm">
            Pricing & Plans
          </HueTag>
          <h2 className="m-0 mt-2 font-glaze-display text-[26px] font-extrabold text-[#123A5C]">
            {title}
          </h2>
          <p className="m-0 mt-1 text-[14px] text-[#5B6170]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-[13px] font-semibold text-[#5B6170]">团队席位</span>
            <NumberField
              surface="white"
              unit="席"
              value={seatCount}
              onValueChange={setSeats}
              min={1}
              max={200}
              step={1}
              className="w-40"
            />
          </div>

          <SegmentedControl
            size="sm"
            value={billing}
            onValueChange={setBilling}
            listClassName="bg-white"
            options={[
              { value: 'monthly', label: '按月付费' },
              { value: 'yearly', label: '按年省 20%' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const theme = TILE_THEMES[plan.tone]
          const unitPrice =
            billing === 'yearly' ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice
          const total = unitPrice * seatCount
          const isDark = Boolean(theme.dark)

          return (
            <Tile key={plan.id} tone={plan.tone} size="s" className="justify-between gap-6 p-7">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-glaze-display text-[19px] font-extrabold">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <HueTag hue="lemon" size="xs">
                      {plan.badge}
                    </HueTag>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-glaze-display text-[40px] leading-none font-extrabold tabular-nums">
                    {unitPrice === 0 ? '免费' : `¥${unitPrice}`}
                  </span>
                  {unitPrice > 0 && (
                    <span className="text-[13px]" style={{ color: theme.soft }}>
                      / 席位 / 月
                    </span>
                  )}
                </div>

                <p className="m-0 text-[13px]" style={{ color: theme.soft }}>
                  {plan.desc}
                  {unitPrice > 0 && ` · ${seatCount} 席位合计 ¥${total.toLocaleString('zh-CN')}/月`}
                </p>

                <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 p-0 text-[13.5px]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle
                        size={16}
                        weight="fill"
                        style={{ color: isDark ? '#7DD3FC' : theme.accent }}
                        className="shrink-0"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={isDark ? 'secondary' : 'primary'}
                onClick={() =>
                  toast({
                    title: `已选择 ${plan.name}`,
                    description: `${seatCount} 席位 · ${billing === 'yearly' ? '年付方案' : '月付方案'}`,
                    status: 'normal',
                  })
                }
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Tile>
          )
        })}
      </div>

      <Tile tone="white" size="s" className="gap-3 p-6">
        <span className="font-glaze-display text-[16px] font-extrabold text-[#123A5C]">
          计费常见问题
        </span>
        <Accordion defaultValue={['q1']}>
          <AccordionItem value="q1" title="可以随时升级或减少团队席位吗？">
            可以。所有变更按天自动折算差价并在下个账单周期抵扣，无需联系人工客服。
          </AccordionItem>
          <AccordionItem value="q2" title="私有 Registry 与组件源码归属权如何约定？">
            你通过 shadcn CLI 安装的所有源码与自定义组件 100% 归属你的仓库，无任何运行时锁定。
          </AccordionItem>
        </Accordion>
      </Tile>
    </section>
  )
}
