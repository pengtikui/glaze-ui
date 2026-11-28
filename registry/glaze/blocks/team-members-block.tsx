import * as React from 'react'
import { MagnifyingGlass, UserPlus } from '@phosphor-icons/react'
import { MembersCard } from '@/components/cards/members-card'
import { QuotaCard } from '@/components/cards/quota-card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmit,
  useForm,
} from '@/components/ui/form'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
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
import type { Hue, Status } from '@/lib/tokens'

interface TeamMember {
  id: string
  name: string
  email: string
  initials: string
  hue: Hue
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  status: Status
  statusLabel: string
  lastActive: string
}

const INITIAL_MEMBERS: TeamMember[] = [
  { id: 'm1', name: '林知夏', email: 'lin@glaze.design', initials: '林', hue: 'periwinkle', role: 'owner', status: 'normal', statusLabel: '在线', lastActive: '刚刚' },
  { id: 'm2', name: '陈思远', email: 'chen@glaze.design', initials: '陈', hue: 'sky', role: 'admin', status: 'normal', statusLabel: '在线', lastActive: '5 分钟前' },
  { id: 'm3', name: '周明哲', email: 'zhou@glaze.design', initials: '周', hue: 'mint', role: 'editor', status: 'info', statusLabel: '会议中', lastActive: '28 分钟前' },
  { id: 'm4', name: '许清禾', email: 'xu@glaze.design', initials: '许', hue: 'rose', role: 'editor', status: 'normal', statusLabel: '在线', lastActive: '1 小时前' },
  { id: 'm5', name: '陆远', email: 'lu@glaze.design', initials: '陆', hue: 'peach', role: 'viewer', status: 'disabled', statusLabel: '离线', lastActive: '昨天' },
]

export function TeamMembersBlock() {
  const toast = useToast()
  const [members, setMembers] = React.useState<TeamMember[]>(INITIAL_MEMBERS)
  const [query, setQuery] = React.useState('')
  const [inviteOpen, setInviteOpen] = React.useState(false)

  const inviteForm = useForm({
    defaultValues: { name: '', email: '', role: 'editor' as TeamMember['role'] },
    onSubmit: async ({ value }) => {
      const next: TeamMember = {
        id: `m-${Date.now()}`,
        name: value.name,
        email: value.email,
        initials: value.name.slice(0, 1),
        hue: 'aqua',
        role: value.role,
        status: 'info',
        statusLabel: '已邀请',
        lastActive: '待接受',
      }
      setMembers((prev) => [next, ...prev])
      setInviteOpen(false)
      inviteForm.reset()
      toast({ title: '邀请邮件已发出', description: `${value.name} (${value.email})`, status: 'normal' })
    },
  })

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return members
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q),
    )
  }, [members, query])

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MembersCard
          tone="white"
          label="工作空间成员"
          countLabel={`${members.length} 人`}
          description="含 2 位管理员与 2 位核心编辑"
          members={members.slice(0, 5).map((m) => ({ label: m.initials, hue: m.hue }))}
        />
        <QuotaCard
          tone="periwinkle"
          label="团队协作席位配额"
          used={members.length}
          total={20}
          unit="席位"
          resetNote="Pro 订阅可随时扩容至 200 席位"
        />
      </div>

      <Tile tone="white" className="gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="m-0 font-glaze-display text-[19px] font-extrabold text-[#123A5C]">
              成员与角色权限
            </h3>
            <p className="m-0 mt-0.5 text-[12.5px] text-[#6B7280]">
              支持实时检索成员与按行调整 RBAC 访问角色
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-56">
              <Input
                inputSize="sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索姓名或邮箱…"
                leadingIcon={<MagnifyingGlass size={14} />}
              />
            </div>
            <Button variant="primary" size="sm" onClick={() => setInviteOpen(true)}>
              <UserPlus size={14} weight="bold" />
              <span>邀请成员</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table density="comfortable">
            <TableHeader>
              <TableRow>
                <TableHead>成员</TableHead>
                <TableHead>角色权限</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">最近活跃</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={m.initials} hue={m.hue} size="sm" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1B1F27]">{m.name}</span>
                        <span className="text-[12px] text-[#6B7280]">{m.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {m.role === 'owner' ? (
                      <HueTag hue="periwinkle">空间所有者</HueTag>
                    ) : (
                      <div className="w-36">
                        <Select
                          size="sm"
                          value={m.role}
                          onValueChange={(nextRole) => {
                            if (!nextRole) return
                            setMembers((prev) =>
                              prev.map((item) =>
                                item.id === m.id
                                  ? { ...item, role: nextRole as TeamMember['role'] }
                                  : item,
                              ),
                            )
                            toast({
                              title: `已更新 ${m.name} 的角色`,
                              description: `当前权限：${nextRole}`,
                              status: 'info',
                            })
                          }}
                          options={[
                            { value: 'admin', label: '管理员 Admin' },
                            { value: 'editor', label: '编辑者 Editor' },
                            { value: 'viewer', label: '只读 Viewer' },
                          ]}
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={m.status} label={m.statusLabel} size="sm" />
                  </TableCell>
                  <TableCell className="text-right text-[13px] text-[#6B7280]">
                    {m.lastActive}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tile>

      <Dialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        title="邀请新成员加入"
        description="受邀成员将收到带有 48 小时有效链接的邮箱邀请"
      >
        <Form form={inviteForm} className="flex flex-col gap-4">
          <inviteForm.Field
            name="name"
            validators={{
              onChange: ({ value }) => (!value.trim() ? '请填写成员姓名' : undefined),
            }}
          >
            {(field) => (
              <FormItem field={field}>
                <FormLabel required>姓名</FormLabel>
                <FormControl>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="如：高翔"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </inviteForm.Field>

          <inviteForm.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '请输入有效邮箱' : undefined,
            }}
          >
            {(field) => (
              <FormItem field={field}>
                <FormLabel required>企业邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="member@company.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </inviteForm.Field>

          <inviteForm.Field name="role">
            {(field) => (
              <FormItem field={field}>
                <FormLabel>初始角色</FormLabel>
                <FormControl>
                  <Select
                    value={field.state.value}
                    onValueChange={(v) =>
                      field.handleChange((v ?? 'editor') as TeamMember['role'])
                    }
                    options={[
                      { value: 'admin', label: '管理员 Admin' },
                      { value: 'editor', label: '编辑者 Editor' },
                      { value: 'viewer', label: '只读 Viewer' },
                    ]}
                  />
                </FormControl>
              </FormItem>
            )}
          </inviteForm.Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setInviteOpen(false)}>
              取消
            </Button>
            <FormSubmit variant="primary">发送邀请</FormSubmit>
          </div>
        </Form>
      </Dialog>
    </section>
  )
}
