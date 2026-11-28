import * as React from 'react'
import {
  CreditCard,
  Key,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Trash,
  UsersThree,
} from '@phosphor-icons/react'
import { cn } from 'cn'
import { PricingComparisonBlock } from '@/components/blocks/pricing-comparison-block'
import { SettingsAccountBlock } from '@/components/blocks/settings-account-block'
import { TeamMembersBlock } from '@/components/blocks/team-members-block'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/ui/status-pill'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'

type SectionKey = 'account' | 'team' | 'billing' | 'keys'

interface ApiKeyRow {
  id: string
  name: string
  prefix: string
  scope: string
  lastUsed: string
}

const INITIAL_KEYS: ApiKeyRow[] = [
  { id: 'k1', name: 'Production Registry CI', prefix: 'glz_live_98f1…a4c2', scope: 'Read & Publish', lastUsed: '3 分钟前' },
  { id: 'k2', name: 'Design Token Sync Bot', prefix: 'glz_live_42d0…7e19', scope: 'Read Only', lastUsed: '2 小时前' },
  { id: 'k3', name: 'Staging Preview Worker', prefix: 'glz_test_11b7…3f08', scope: 'Read Only', lastUsed: '昨天' },
]

export function SettingsPortalPage() {
  const toast = useToast()
  const [section, setSection] = React.useState<SectionKey>('account')
  const [keys, setKeys] = React.useState<ApiKeyRow[]>(INITIAL_KEYS)
  const [newKeyOpen, setNewKeyOpen] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState('')
  const [revokeTarget, setRevokeTarget] = React.useState<ApiKeyRow | null>(null)

  const navItems: { id: SectionKey; label: string; desc: string; icon: React.ComponentType<{ size?: number; weight?: 'regular' | 'fill' }> }[] = [
    { id: 'account', label: '账户与偏好', desc: '资料、MFA 与通知', icon: SlidersHorizontal },
    { id: 'team', label: '成员与权限', desc: 'RBAC 角色与邀请', icon: UsersThree },
    { id: 'billing', label: '订阅与账单', desc: '席位配额与升级', icon: CreditCard },
    { id: 'keys', label: 'API 密钥', desc: 'CI/CD 令牌与审计', icon: Key },
  ]

  const createKey = () => {
    if (!newKeyName.trim()) return
    const rand = Math.random().toString(16).slice(2, 6)
    const next: ApiKeyRow = {
      id: `k-${Date.now()}`,
      name: newKeyName.trim(),
      prefix: `glz_live_${rand}…9c0e`,
      scope: 'Read & Publish',
      lastUsed: '尚未使用',
    }
    setKeys((prev) => [next, ...prev])
    setNewKeyName('')
    setNewKeyOpen(false)
    toast({ title: '已签发新 API 密钥', description: `${next.name} (${next.prefix})`, status: 'normal' })
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-[#1B1F27]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-4 py-8 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
              PAGE 14 · SPACE.CFG · 工作空间与账单设置中心
            </span>
            <h1 className="m-0 font-glaze-display text-[32px] leading-10 font-extrabold tracking-[-0.02em] text-[#123A5C]">
              工作空间设置中心
            </h1>
            <p className="m-0 text-[14px] text-[#5B6170]">
              统一管理账户安全、团队权限、订阅方案与自动化 API 令牌
            </p>
          </div>
          <StatusPill status="normal" label="Pro 团队版 · 正常计费" />
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Tile tone="white" className="min-h-0 justify-start gap-1.5 p-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = section === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 rounded-inner border-0 px-3.5 py-3 text-left transition-colors',
                      active
                        ? 'bg-[#123A5C] text-white'
                        : 'bg-transparent text-[#1B1F27] hover:bg-[#F6F7F9]',
                    )}
                  >
                    <Icon size={18} weight={active ? 'fill' : 'regular'} />
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-bold">{item.label}</div>
                      <div
                        className={cn(
                          'truncate text-[11.5px]',
                          active ? 'text-white/75' : 'text-[#6B7280]',
                        )}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </button>
                )
              })}
            </Tile>
          </aside>

          <main className="lg:col-span-9">
            {section === 'account' && <SettingsAccountBlock />}
            {section === 'team' && <TeamMembersBlock />}
            {section === 'billing' && <PricingComparisonBlock />}
            {section === 'keys' && (
              <Tile tone="white" className="gap-5 p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="m-0 font-glaze-display text-[22px] font-extrabold text-[#123A5C]">
                      API 访问密钥
                    </h2>
                    <p className="m-0 mt-1 text-[13px] text-[#6B7280]">
                      用于自动化发布私有 Registry、同步 Design Tokens 与 CI 校验
                    </p>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setNewKeyOpen(true)}>
                    <Plus size={14} weight="bold" />
                    <span>签发新密钥</span>
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>名称</TableHead>
                        <TableHead>密钥前缀</TableHead>
                        <TableHead>权限范围</TableHead>
                        <TableHead>最近使用</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keys.map((k) => (
                        <TableRow key={k.id}>
                          <TableCell className="font-semibold text-[#1B1F27]">{k.name}</TableCell>
                          <TableCell>
                            <code className="rounded-md bg-[#F6F7F9] px-2 py-0.5 font-glaze-mono text-[12px] text-[#123A5C]">
                              {k.prefix}
                            </code>
                          </TableCell>
                          <TableCell>
                            <HueTag hue={k.scope.includes('Publish') ? 'periwinkle' : 'mint'} size="xs">
                              {k.scope}
                            </HueTag>
                          </TableCell>
                          <TableCell className="text-[13px] text-[#6B7280]">{k.lastUsed}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setRevokeTarget(k)}
                            >
                              <Trash size={14} className="text-[#C83D2B]" />
                              <span>吊销</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center gap-2.5 rounded-inner bg-[#E7F4E4] px-4 py-3 text-[13px] text-[#1E4B18]">
                  <ShieldCheck size={18} weight="fill" />
                  <span>所有密钥均已启用 IP 白名单与 90 天自动轮换提醒。</span>
                </div>
              </Tile>
            )}
          </main>
        </div>
      </div>

      <Dialog
        open={newKeyOpen}
        onOpenChange={setNewKeyOpen}
        title="签发新 API 密钥"
        description="密钥明文仅展示一次，请立即保存至环境变量"
      >
        <div className="flex flex-col gap-4">
          <Input
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="例如：GitHub Actions Release Bot"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNewKeyOpen(false)}>
              取消
            </Button>
            <Button variant="primary" disabled={!newKeyName.trim()} onClick={createKey}>
              生成密钥
            </Button>
          </div>
        </div>
      </Dialog>

      <AlertDialog
        open={Boolean(revokeTarget)}
        onOpenChange={(open) => !open && setRevokeTarget(null)}
        title="确认吊销该 API 密钥？"
        description={
          revokeTarget
            ? `吊销 ${revokeTarget.name}（${revokeTarget.prefix}）后，使用该密钥的自动化流水线将立即失效。`
            : ''
        }
        confirmLabel="立即吊销"
        cancelLabel="取消"
        danger
        onConfirm={() => {
          if (!revokeTarget) return
          setKeys((prev) => prev.filter((k) => k.id !== revokeTarget.id))
          toast({ title: `已吊销 ${revokeTarget.name}`, status: 'warning' })
          setRevokeTarget(null)
        }}
      />
    </div>
  )
}
