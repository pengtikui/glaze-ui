import * as React from 'react'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormReset,
  FormSubmit,
  useForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { StatusPill } from '@/components/ui/status-pill'
import { Textarea } from '@/components/ui/textarea'
import { Tile } from '@/components/ui/tile'
import { TILE_THEMES, type TileTone } from '@/lib/tokens'

export interface QuickFormValues {
  title: string
  category: string
  notes: string
}

export interface QuickFormCardProps {
  title?: string
  subtitle?: string
  submitLabel?: string
  tone?: TileTone
  onSubmitValues?: (values: QuickFormValues) => void
}

export function QuickFormCard({
  title = '快速提交工单',
  subtitle = '基于 TanStack Form 实时校验与状态订阅',
  submitLabel = '立即提交',
  tone = 'white',
  onSubmitValues,
}: QuickFormCardProps) {
  const theme = TILE_THEMES[tone]
  const [submittedTitle, setSubmittedTitle] = React.useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      title: '',
      category: 'incident',
      notes: '',
    },
    onSubmit: async ({ value }) => {
      setSubmittedTitle(value.title)
      onSubmitValues?.(value)
      form.reset()
    },
  })

  return (
    <Tile size="l" tone={tone} className="justify-between gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-glaze-display text-[19px] font-extrabold">{title}</div>
          <div className="mt-0.5 text-[12px]" style={{ color: theme.soft }}>
            {subtitle}
          </div>
        </div>
        {submittedTitle && <StatusPill status="normal" label="已提交" size="sm" />}
      </div>

      <Form form={form} className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? '请填写事项标题' : value.trim().length < 3 ? '至少输入 3 个字符' : undefined,
              }}
            >
              {(field) => (
                <FormItem field={field}>
                  <FormLabel required>事项标题</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="sm"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="例如：华东网关证书续期"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>

            <form.Field name="category">
              {(field) => (
                <FormItem field={field}>
                  <FormLabel>分类</FormLabel>
                  <FormControl>
                    <Select
                      size="sm"
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v ?? 'incident')}
                      options={[
                        { value: 'incident', label: '线上告警' },
                        { value: 'feature', label: '需求变更' },
                        { value: 'access', label: '权限申请' },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            </form.Field>
          </div>

          <form.Field name="notes">
            {(field) => (
              <FormItem field={field}>
                <FormLabel>补充说明</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="填写影响范围或期望完成时间（可选）"
                  />
                </FormControl>
              </FormItem>
            )}
          </form.Field>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <FormReset size="sm" variant="ghost">
            重置
          </FormReset>
          <FormSubmit size="sm" variant="primary">
            {submitLabel}
          </FormSubmit>
        </div>
      </Form>
    </Tile>
  )
}
