import * as React from 'react'
import { EnvelopeSimple, Key, LockKey, ShieldCheck, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { OTPField } from '@/components/ui/otp-field'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { Tile } from '@/components/ui/tile'
import { useToast } from '@/components/ui/toast'

export interface AuthLoginBlockProps {
  brandName?: string
  headline?: string
  subtitle?: string
  onSuccess?: (payload: { mode: 'password' | 'otp'; email: string }) => void
}

export function AuthLoginBlock({
  brandName = 'Glaze Cloud',
  headline = '欢迎回到你的工作空间',
  subtitle = '使用企业邮箱密码或 6 位动态口令登录，保障多团队协作安全。',
  onSuccess,
}: AuthLoginBlockProps) {
  const toast = useToast()
  const [mode, setMode] = React.useState<'password' | 'otp'>('password')
  const [otpValue, setOtpValue] = React.useState('')
  const [remember, setRemember] = React.useState(true)

  const form = useForm({
    defaultValues: {
      email: 'alex@glaze.design',
      password: '',
    },
    onSubmit: async ({ value }) => {
      if (mode === 'otp' && otpValue.length < 6) {
        toast({ title: '请输入完整 6 位动态口令', status: 'warning' })
        return
      }
      toast({
        title: '登录成功',
        description: `已通过${mode === 'password' ? '密码' : '动态口令'}认证：${value.email}`,
        status: 'normal',
      })
      onSuccess?.({ mode, email: value.email })
    },
  })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Tile
        tone="sky-dark"
        className="min-w-0 justify-between gap-8 p-8 lg:col-span-5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 font-glaze-display text-[18px] font-extrabold text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/15">
              <Sparkle size={16} weight="fill" />
            </span>
            {brandName}
          </span>
          <StatusPill status="normal" label="SSO 就绪" size="sm" />
        </div>

        <div className="flex flex-col gap-3">
          <HueTag hue="aqua" size="sm" className="self-start">
            企业级安全工作台
          </HueTag>
          <h2 className="m-0 font-glaze-display text-[28px] leading-9 font-extrabold tracking-[-0.02em] text-white">
            {headline}
          </h2>
          <p className="m-0 text-[14px] leading-relaxed text-white/75">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-inner bg-white/10 p-3.5">
            <div className="text-[11px] font-medium text-white/65">可用性保障</div>
            <div className="mt-1 font-glaze-display text-[22px] font-extrabold text-white tabular-nums">
              99.99%
            </div>
          </div>
          <div className="rounded-inner bg-white/10 p-3.5">
            <div className="text-[11px] font-medium text-white/65">端到端加密</div>
            <div className="mt-1 font-glaze-display text-[22px] font-extrabold text-white">
              AES-256
            </div>
          </div>
        </div>
      </Tile>

      <Tile
        tone="white"
        className="min-w-0 justify-between gap-6 p-8 lg:col-span-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="m-0 font-glaze-display text-[22px] font-extrabold text-[#123A5C]">
              账号登录
            </h3>
            <p className="m-0 mt-1 text-[13px] text-[#6B7280]">
              支持密码与 2FA 一次性口令两种认证方式
            </p>
          </div>
          <SegmentedControl
            size="sm"
            value={mode}
            onValueChange={setMode}
            options={[
              { value: 'password', label: '密码登录' },
              { value: 'otp', label: '验证码登录' },
            ]}
          />
        </div>

        <Form form={form} className="flex flex-col gap-4">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '请输入有效的企业邮箱地址' : undefined,
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
                    placeholder="name@company.com"
                    leadingIcon={<EnvelopeSimple size={16} />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </form.Field>

          {mode === 'password' ? (
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.length < 6 ? '密码长度不能少于 6 位' : undefined,
              }}
            >
              {(field) => (
                <FormItem field={field}>
                  <FormLabel required>登录密码</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="输入 6 位以上密码"
                      leadingIcon={<LockKey size={16} />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#1B1F27]">
                  6 位动态验证码
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOtpValue('248910')
                    toast({ title: '已填入演示验证码 248910', status: 'info' })
                  }}
                  className="cursor-pointer border-0 bg-transparent p-0 text-[12px] font-semibold text-[#4A4FB8] hover:underline"
                >
                  获取 / 填入示例口令
                </button>
              </div>
              <OTPField value={otpValue} onValueChange={setOtpValue} />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <Checkbox
              checked={remember}
              onCheckedChange={setRemember}
              label="保持 30 天登录状态"
            />
            <button
              type="button"
              onClick={() => toast({ title: '重置链接已发送至邮箱', status: 'info' })}
              className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-[#4A4FB8] hover:underline"
            >
              忘记密码？
            </button>
          </div>

          <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
            <FormSubmit variant="primary" className="flex-1">
              <ShieldCheck size={16} weight="bold" />
              <span>{mode === 'password' ? '立即登录' : '验证并进入空间'}</span>
            </FormSubmit>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                toast({ title: 'Passkey 硬件密钥认证已触发', status: 'info' })
              }
            >
              <Key size={16} weight="bold" />
              <span>Passkey 登录</span>
            </Button>
          </div>
        </Form>
      </Tile>
    </div>
  )
}
