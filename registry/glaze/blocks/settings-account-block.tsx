import * as React from 'react'
import { QuickSettingsCard } from '@/components/cards/quick-settings-card'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmit,
  useForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { OTPField } from '@/components/ui/otp-field'
import { Select } from '@/components/ui/select'
import { StatusPill } from '@/components/ui/status-pill'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'

export function SettingsAccountBlock() {
  const toast = useToast()
  const [mfaCode, setMfaCode] = React.useState('')
  const [mfaEnabled, setMfaEnabled] = React.useState(false)
  const [dangerOpen, setDangerOpen] = React.useState(false)

  const profileForm = useForm({
    defaultValues: {
      displayName: '林知夏',
      email: 'lin@glaze.design',
      timezone: 'Asia/Shanghai',
      bio: '设计系统工程师，专注无障碍交互与高性能微动效。',
    },
    onSubmit: async ({ value }) => {
      toast({
        title: '个人资料已保存',
        description: `${value.displayName} · ${value.timezone}`,
        status: 'normal',
      })
    },
  })

  return (
    <Tile tone="white" className="gap-6 p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Avatar fallback="林" hue="periwinkle" size="lg" />
          <div>
            <h2 className="m-0 font-glaze-display text-[22px] font-extrabold text-[#123A5C]">
              账户与安全设置
            </h2>
            <p className="m-0 mt-0.5 text-[13px] text-[#6B7280]">
              管理个人档案、双重验证 (MFA) 与消息通知偏好
            </p>
          </div>
        </div>
        <StatusPill
          status={mfaEnabled ? 'normal' : 'warning'}
          label={mfaEnabled ? 'MFA 已保护' : '建议开启 MFA'}
        />
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="security">安全与 MFA</TabsTrigger>
          <TabsTrigger value="notifications">通知偏好</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="pt-4">
          <Form form={profileForm} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <profileForm.Field
                name="displayName"
                validators={{
                  onChange: ({ value }) => (!value.trim() ? '请填写显示名称' : undefined),
                }}
              >
                {(field) => (
                  <FormItem field={field}>
                    <FormLabel required>显示名称</FormLabel>
                    <FormControl>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              </profileForm.Field>

              <profileForm.Field name="timezone">
                {(field) => (
                  <FormItem field={field}>
                    <FormLabel>默认时区</FormLabel>
                    <FormControl>
                      <Select
                        value={field.state.value}
                        onValueChange={(v) => field.handleChange(v ?? 'Asia/Shanghai')}
                        options={[
                          { value: 'Asia/Shanghai', label: 'UTC+8 · 上海 / 北京' },
                          { value: 'Asia/Tokyo', label: 'UTC+9 · 东京' },
                          { value: 'America/Los_Angeles', label: 'UTC-8 · 旧金山' },
                        ]}
                      />
                    </FormControl>
                  </FormItem>
                )}
              </profileForm.Field>
            </div>

            <profileForm.Field name="bio">
              {(field) => (
                <FormItem field={field}>
                  <FormLabel>个人简介</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            </profileForm.Field>

            <div className="flex justify-end">
              <FormSubmit variant="primary">保存更改</FormSubmit>
            </div>
          </Form>
        </TabsContent>

        <TabsContent value="security" className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col gap-3 rounded-inner bg-[#F6F7F9] p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-glaze-display text-[16px] font-extrabold text-[#1B1F27]">
                绑定 TOTP 验证器
              </span>
              <StatusPill
                status={mfaEnabled ? 'normal' : 'info'}
                label={mfaEnabled ? '已启用' : '未启用'}
                size="sm"
              />
            </div>
            <p className="m-0 text-[13px] text-[#5B6170]">
              输入验证器应用显示的 6 位口令完成二次验证绑定（演示任意 6 位数字即可）。
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <OTPField surface="white" value={mfaCode} onValueChange={setMfaCode} />
              <Button
                variant="primary"
                size="sm"
                disabled={mfaCode.length < 6}
                onClick={() => {
                  setMfaEnabled(true)
                  setMfaCode('')
                  toast({ title: '双重验证已启用', status: 'normal' })
                }}
              >
                确认绑定
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-inner bg-[#FDECE9] p-5">
            <div>
              <div className="font-glaze-display text-[15px] font-extrabold text-[#7D2419]">
                危险区域 · 吊销所有活跃会话
              </div>
              <div className="mt-0.5 text-[12.5px] text-[#7D2419]/80">
                立即强制所有设备下线并重新进行身份认证。
              </div>
            </div>
            <Button variant="danger" size="sm" onClick={() => setDangerOpen(true)}>
              全部下线
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="pt-4">
          <QuickSettingsCard
            tone="sky"
            title="消息通道偏好"
            className="min-h-0"
            settings={[
              { id: 'n1', label: '生产告警短信通知', desc: 'P0/P1 告警即时触达手机', defaultChecked: true, hue: 'coral' },
              { id: 'n2', label: '每周经营汇总邮件', desc: '每周一 09:00 推送周报', defaultChecked: true, hue: 'periwinkle' },
              { id: 'n3', label: '安全登录与异地提醒', desc: '新设备登录时发送邮件校验', defaultChecked: true, hue: 'mint' },
              { id: 'n4', label: '产品更新与变更日志', desc: '新组件与版本发布提醒', defaultChecked: false, hue: 'sky' },
            ]}
          />
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={dangerOpen}
        onOpenChange={setDangerOpen}
        title="强制吊销所有设备会话？"
        description="除当前浏览器外，所有手机与桌面客户端均需重新登录。"
        confirmLabel="确认全部下线"
        cancelLabel="取消"
        danger
        onConfirm={() => {
          setDangerOpen(false)
          toast({ title: '已吊销 4 个历史会话', status: 'warning' })
        }}
      />
    </Tile>
  )
}
