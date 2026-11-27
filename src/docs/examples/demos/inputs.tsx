import * as React from 'react'
import {
  ArrowRight,
  At,
  BookmarkSimple,
  CircleNotch,
  Eye,
  EyeSlash,
  Lock,
  LockOpen,
  MagnifyingGlass,
  Plus,
  SpeakerHigh,
  SpeakerSlash,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
  X,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import { HueTag } from '@/components/ui/hue-tag'
import { Input } from '@/components/ui/input'
import { NumberField } from '@/components/ui/number-field'
import { OTPField } from '@/components/ui/otp-field'
import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'
import { Select } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import type { ComponentDemoGroup } from '@/docs/examples/types'

const ALL_HUES = [
  'sky',
  'mint',
  'peach',
  'lilac',
  'rose',
  'lemon',
  'aqua',
  'periwinkle',
  'coral',
] as const

function ButtonLoadingDemo() {
  const [loading, setLoading] = React.useState(false)
  const trigger = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1200)
  }
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button disabled={loading} focusableWhenDisabled onClick={trigger}>
        {loading && <CircleNotch size={16} className="animate-spin" />}
        <span>{loading ? '正在部署...' : '点击模拟异步提交'}</span>
      </Button>
      <Button variant="secondary" disabled>
        已禁用
      </Button>
      <Button
        variant="soft"
        hue="sky"
        render={<a href="#examples" className="no-underline" />}
        nativeButton={false}
      >
        <span>作为链接渲染</span>
        <ArrowRight size={15} weight="bold" />
      </Button>
    </div>
  )
}

function InputDecoratorsDemo() {
  const [keyword, setKeyword] = React.useState('glaze-ui')
  const [showPwd, setShowPwd] = React.useState(false)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="输入关键字搜索..."
        leadingIcon={<MagnifyingGlass size={16} />}
        trailingElement={
          keyword ? (
            <button
              type="button"
              onClick={() => setKeyword('')}
              aria-label="清空"
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#8A90A0] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
            >
              <X size={13} weight="bold" />
            </button>
          ) : null
        }
      />
      <Input
        type={showPwd ? 'text' : 'password'}
        defaultValue="glaze-secret-2026"
        placeholder="输入 API 密钥"
        trailingElement={
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            aria-label={showPwd ? '隐藏密钥' : '显示密钥'}
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#6B7280] hover:bg-[#E8EBF0] hover:text-[#1B1F27]"
          >
            {showPwd ? <EyeSlash size={15} /> : <Eye size={15} />}
          </button>
        }
      />
      <Input
        defaultValue="ops-team"
        leadingIcon={<At size={15} />}
        trailingElement={<span className="text-[12px] font-semibold text-[#6B7280]">.glaze.dev</span>}
      />
    </div>
  )
}

function NumberFieldControlledDemo() {
  const [replicas, setReplicas] = React.useState<number | null>(3)
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <NumberField
        label="节点副本数（拖拽标签可微调）"
        value={replicas}
        onValueChange={setReplicas}
        min={1}
        max={16}
        step={1}
        unit="台"
      />
      <div className="flex items-center justify-between text-[12px] text-[#6B7280]">
        <span>预估并发：{(replicas ?? 0) * 2500} req/s</span>
        <Button size="sm" variant="ghost" onClick={() => setReplicas(3)}>
          重置默认
        </Button>
      </div>
    </div>
  )
}

function OTPVerifyDemo() {
  const [code, setCode] = React.useState('')
  const isComplete = code.length === 6
  const isValid = code === '123456'
  return (
    <div className="flex flex-col items-center gap-3">
      <OTPField length={6} value={code} onValueChange={setCode} />
      <div className="flex items-center gap-2 text-[12px]">
        {isComplete ? (
          isValid ? (
            <HueTag hue="mint" size="sm">验证通过 ✓</HueTag>
          ) : (
            <HueTag hue="coral" size="sm">验证码不正确（测试码 123456）</HueTag>
          )
        ) : (
          <span className="text-[#6B7280]">请输入测试验证码 123456（已输入 {code.length}/6）</span>
        )}
        {code && (
          <Button size="sm" variant="ghost" onClick={() => setCode('')}>
            清空
          </Button>
        )}
      </div>
    </div>
  )
}

function CheckboxHeroDemo() {
  const [checked, setChecked] = React.useState(true)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="开启自动快照备份"
        description="每日凌晨 03:00 自动归档至 NAS"
      />
      <Checkbox indeterminate label="半选状态示例" />
      <Checkbox disabled label="禁用状态选项" />
    </div>
  )
}

function CheckboxControlledDemo() {
  const [agreed, setAgreed] = React.useState(false)
  return (
    <div className="flex flex-col items-start gap-3">
      <Checkbox
        checked={agreed}
        onCheckedChange={setAgreed}
        label="我已阅读并同意服务 SLA 协议"
        description="启用生产环境自动扩容前需确认计费策略"
      />
      <Button size="sm" variant="primary" disabled={!agreed}>
        {agreed ? '立即部署生产集群' : '请先勾选确认'}
      </Button>
    </div>
  )
}

function CheckboxGroupHeroDemo() {
  const [list, setList] = React.useState<string[]>(['auto', 'alerts'])
  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup value={list} onValueChange={setList}>
        <Checkbox name="auto" label="自动安全更新" />
        <Checkbox name="alerts" label="异常指标告警推送" />
        <Checkbox name="digest" label="每周运营摘要邮件" />
      </CheckboxGroup>
      <span className="text-[12px] text-[#6B7280]">当前已选：{list.join(', ') || '无'}</span>
    </div>
  )
}

function CheckboxGroupParentDemo() {
  const allPermissions = ['read', 'write', 'deploy', 'audit']
  const [selected, setSelected] = React.useState<string[]>(['read', 'write'])
  return (
    <div className="w-full max-w-xs rounded-[18px] bg-[#F6F7F9] p-4">
      <CheckboxGroup
        value={selected}
        onValueChange={setSelected}
        allValues={allPermissions}
      >
        <Checkbox parent label="全部项目权限（父级全选）" />
        <div className="ml-6 flex flex-col gap-2.5 border-l border-[#E5E8EE] pl-3.5">
          <Checkbox value="read" label="只读查看" />
          <Checkbox value="write" label="配置编辑" />
          <Checkbox value="deploy" label="生产发布" />
          <Checkbox value="audit" label="安全审计日志" />
        </div>
      </CheckboxGroup>
    </div>
  )
}

function RadioHeroDemo() {
  const [val, setVal] = React.useState('balanced')
  return (
    <RadioGroup value={val} onValueChange={(v) => setVal(String(v))}>
      <Radio value="eco" label="节能模式" description="夜间自动降低后台同步频率" />
      <Radio value="balanced" label="均衡模式" description="性能与能耗自动平衡（推荐）" />
      <Radio value="turbo" label="极速模式" description="满载算力，响应延迟最低" />
    </RadioGroup>
  )
}

function RadioCardDemo() {
  const [plan, setPlan] = React.useState('pro')
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <RadioGroup value={plan} onValueChange={(v) => setPlan(String(v))}>
        <Radio
          card
          value="starter"
          label="Starter · 免费"
          description="适合个人 Homelab，包含 3 个边缘节点"
        />
        <Radio
          card
          value="pro"
          label="Pro · ¥99 / 月"
          description="无限节点与自动异地冷备，团队协作推荐"
        />
        <Radio
          card
          value="enterprise"
          label="Enterprise · 私有化部署"
          description="专属集群隔离、mTLS 零信任与 7×24 SLA"
        />
      </RadioGroup>
      <span className="text-[12px] text-[#6B7280]">当前所选方案：{plan}</span>
    </div>
  )
}

function SwitchHeroDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-6">
      <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
        <Switch checked={a} onCheckedChange={setA} hue="mint" />
        <span>广告拦截</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
        <Switch checked={b} onCheckedChange={setB} hue="periwinkle" />
        <span>暗色聚焦模式</span>
      </label>
      <label className="flex items-center gap-2.5 text-[14px] text-[#8A90A0]">
        <Switch checked disabled />
        <span>系统锁定</span>
      </label>
    </div>
  )
}

function SwitchSettingsListDemo() {
  const [state, setState] = React.useState({
    autoBackup: true,
    edgeCache: true,
    maintenance: false,
  })
  return (
    <div className="flex w-full max-w-md flex-col gap-2.5">
      {[
        { key: 'autoBackup' as const, title: '每日快照备份', desc: '凌晨 03:00 自动上传对象存储', hue: 'mint' as const },
        { key: 'edgeCache' as const, title: '边缘智能缓存', desc: '静态资源自动分发至全球 CDN', hue: 'sky' as const },
        { key: 'maintenance' as const, title: '维护模式', desc: '开启后仅允许白名单 IP 访问', hue: 'coral' as const },
      ].map((item) => (
        <label
          key={item.key}
          className="flex cursor-pointer items-center justify-between gap-4 rounded-[18px] bg-[#F6F7F9] px-4 py-3"
        >
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#1B1F27]">{item.title}</span>
            <span className="text-[12px] text-[#6B7280]">{item.desc}</span>
          </div>
          <Switch
            hue={item.hue}
            checked={state[item.key]}
            onCheckedChange={(checked) => setState((prev) => ({ ...prev, [item.key]: checked }))}
          />
        </label>
      ))}
    </div>
  )
}

function SliderHeroDemo() {
  const [val, setVal] = React.useState(68)
  const [range, setRange] = React.useState<[number, number]>([25, 78])
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Slider value={val} onValueChange={(v) => setVal(Number(v))} label="亮度调节" unit="%" hue="periwinkle" />
      <Slider
        value={range}
        onValueChange={(v) => Array.isArray(v) && setRange([v[0], v[1]])}
        label="告警阈值区间"
        unit="%"
        hue="aqua"
      />
    </div>
  )
}

function SliderInteractiveRadiusDemo() {
  const [radius, setRadius] = React.useState(24)
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5">
      <div
        className="flex h-20 w-full items-center justify-center bg-[#EEF7FD] font-glaze-display text-[15px] font-extrabold text-[#123A5C] transition-[border-radius] duration-150"
        style={{ borderRadius: radius }}
      >
        实时圆角预览：{radius}px
      </div>
      <Slider
        value={radius}
        onValueChange={(v) => setRadius(Number(v))}
        min={4}
        max={36}
        step={2}
        label="容器圆角"
        unit="px"
        hue="sky"
      />
    </div>
  )
}

function ToggleHeroDemo() {
  const [pressed, setPressed] = React.useState(true)
  return (
    <div className="flex items-center gap-2.5">
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="加粗">
        <TextB size={16} weight="bold" />
        <span>加粗</span>
      </Toggle>
      <Toggle aria-label="斜体">
        <TextItalic size={16} weight="bold" />
        <span>斜体</span>
      </Toggle>
    </div>
  )
}

function ToggleControlledDemo() {
  const [saved, setSaved] = React.useState(false)
  const [muted, setMuted] = React.useState(true)
  const [locked, setLocked] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle pressed={saved} onPressedChange={setSaved} aria-label="收藏">
        <BookmarkSimple size={16} weight={saved ? 'fill' : 'regular'} />
        <span>{saved ? '已收藏' : '收藏'}</span>
      </Toggle>
      <Toggle pressed={muted} onPressedChange={setMuted} aria-label="静音">
        {muted ? <SpeakerSlash size={16} weight="bold" /> : <SpeakerHigh size={16} weight="bold" />}
        <span>{muted ? '已静音' : '声音开启'}</span>
      </Toggle>
      <Toggle size="sm" pressed={locked} onPressedChange={setLocked} aria-label="锁定">
        {locked ? <Lock size={14} weight="bold" /> : <LockOpen size={14} weight="bold" />}
        <span>{locked ? '已锁定' : '未锁定'}</span>
      </Toggle>
    </div>
  )
}

function ToggleGroupHeroDemo() {
  const [align, setAlign] = React.useState<string[]>(['left'])
  return (
    <ToggleGroup value={align} onValueChange={setAlign}>
      <Toggle value="left" aria-label="左对齐"><TextAlignLeft size={16} /></Toggle>
      <Toggle value="center" aria-label="居中"><TextAlignCenter size={16} /></Toggle>
      <Toggle value="right" aria-label="右对齐"><TextAlignRight size={16} /></Toggle>
    </ToggleGroup>
  )
}

function ToggleGroupMultipleDemo() {
  const [styles, setStyles] = React.useState<string[]>(['bold', 'underline'])
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup multiple value={styles} onValueChange={setStyles}>
        <Toggle value="bold" aria-label="加粗">
          <TextB size={16} weight="bold" />
        </Toggle>
        <Toggle value="italic" aria-label="斜体">
          <TextItalic size={16} weight="bold" />
        </Toggle>
        <Toggle value="underline" aria-label="下划线">
          <TextUnderline size={16} weight="bold" />
        </Toggle>
      </ToggleGroup>
      <span className="text-[12px] text-[#6B7280]">
        当前启用样式：{styles.length ? styles.join(' + ') : '无'}
      </span>
    </div>
  )
}

function FieldValidationDemo() {
  return (
    <Form className="w-full max-w-sm" validationMode="onBlur" onSubmit={(e) => e.preventDefault()}>
      <Field name="slug">
        <FieldLabel>仓库名称</FieldLabel>
        <Input
          required
          pattern="^[a-z0-9-]+$"
          placeholder="例如 glaze-design-system"
        />
        <FieldDescription>失焦时自动触发原生正则校验（仅小写字母、数字和连字符）</FieldDescription>
        <FieldError match="valueMissing">仓库名称不能为空</FieldError>
        <FieldError match="patternMismatch">只能包含小写字母、数字和连字符 (-)</FieldError>
      </Field>
      <Button type="submit" size="sm" className="w-fit">
        验证字段
      </Button>
    </Form>
  )
}

function FormHeroDemo() {
  const [msg, setMsg] = React.useState('')
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault()
        setMsg('表单已通过原生约束校验并提交！')
      }}
    >
      <Field name="project">
        <FieldLabel>项目标识</FieldLabel>
        <Input required placeholder="例如 glaze-console" />
        <FieldDescription>仅支持小写字母与连字符</FieldDescription>
        <FieldError match="valueMissing">请输入项目标识</FieldError>
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit">提交校验</Button>
        {msg && <span className="text-[12px] font-medium text-[#2F6B28]">{msg}</span>}
      </div>
    </Form>
  )
}

function FormServerErrorsDemo() {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [loading, setLoading] = React.useState(false)
  const [ok, setOk] = React.useState(false)

  return (
    <Form
      className="w-full max-w-sm"
      errors={errors}
      onFormSubmit={(values) => {
        setLoading(true)
        setOk(false)
        window.setTimeout(() => {
          setLoading(false)
          if (String(values.username || '').toLowerCase() === 'admin') {
            setErrors({ username: '用户名 "admin" 已被系统保留，请更换其他名称' })
          } else {
            setErrors({})
            setOk(true)
          }
        }, 450)
      }}
    >
      <Field name="username">
        <FieldLabel>管理员账号</FieldLabel>
        <Input required defaultValue="admin" placeholder="输入非 admin 即可通过" />
        <FieldDescription>尝试直接提交 &quot;admin&quot; 观察服务端 errors 注入</FieldDescription>
        <FieldError />
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading} focusableWhenDisabled>
          {loading ? '校验中...' : '模拟服务端提交'}
        </Button>
        {ok && <HueTag hue="mint" size="sm">提交成功</HueTag>}
      </div>
    </Form>
  )
}

function FormCompleteDemo() {
  const [region, setRegion] = React.useState('cn-sh')
  const [submitted, setSubmitted] = React.useState<string | null>(null)
  return (
    <Form
      className="w-full max-w-md"
      onFormSubmit={(values) => {
        setSubmitted(JSON.stringify({ ...values, region }, null, 0))
      }}
    >
      <Field name="service">
        <FieldLabel>服务名称</FieldLabel>
        <Input required defaultValue="edge-gateway" placeholder="服务名" />
        <FieldError match="valueMissing">请填写服务名称</FieldError>
      </Field>
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-[#1B1F27]">部署区域</span>
        <Select
          value={region}
          onValueChange={setRegion}
          options={[
            { value: 'cn-sh', label: '华东 · 上海' },
            { value: 'ap-sg', label: '亚太 · 新加坡' },
            { value: 'us-w', label: '美西 · 硅谷' },
          ]}
        />
      </div>
      <Field name="notes">
        <FieldLabel>备注说明</FieldLabel>
        <Textarea rows={2} placeholder="可选发布备注..." />
      </Field>
      <Checkbox name="tls" defaultChecked label="强制启用 HTTPS / TLS 1.3" />
      <div className="flex items-center gap-2">
        <Button type="submit">创建服务</Button>
        <Button type="reset" variant="secondary" onClick={() => setSubmitted(null)}>
          重置
        </Button>
      </div>
      {submitted && (
        <code className="rounded-[12px] bg-[#F6F7F9] px-3 py-2 font-glaze-mono text-[11px] text-[#123A5C]">
          {submitted}
        </code>
      )}
    </Form>
  )
}

export const INPUTS_DEMOS: Record<string, ComponentDemoGroup> = {
  button: {
    hero: {
      render: () => (
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="primary">主按钮</Button>
          <Button variant="secondary">次级按钮</Button>
          <Button variant="soft" hue="periwinkle">柔和色</Button>
          <Button variant="soft" hue="mint">薄荷色</Button>
          <Button variant="danger">危险操作</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="primary" size="icon" aria-label="新增"><Plus size={18} weight="bold" /></Button>
        </div>
      ),
      code: `import { Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button variant="primary">主按钮</Button>
      <Button variant="secondary">次级按钮</Button>
      <Button variant="soft" hue="periwinkle">柔和色</Button>
      <Button variant="danger">危险操作</Button>
      <Button variant="ghost">幽灵按钮</Button>
      <Button variant="primary" size="icon" aria-label="新增"><Plus size={18} weight="bold" /></Button>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'sizes',
        title: '四种尺寸（sm / md / lg / icon）',
        description: '默认 md 严格遵循 44px 胶囊高度规范，sm 适用于卡片内操作，lg 用于落地页主 CTA。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">小型 sm</Button>
            <Button size="md">标准 md (44px)</Button>
            <Button size="lg">大型 lg</Button>
            <Button size="icon" aria-label="添加"><Plus size={18} weight="bold" /></Button>
          </div>
        ),
        code: `import { Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">小型 sm</Button>
      <Button size="md">标准 md</Button>
      <Button size="lg">大型 lg</Button>
      <Button size="icon" aria-label="添加"><Plus size={18} /></Button>
    </div>
  )
}`,
      },
      {
        id: 'soft-hues',
        title: '柔和变体与 9 组色相（soft + hue）',
        description: 'variant="soft" 支持全部 9 组 Glaze 柔彩色相，自动计算高对比度文字与底色。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ALL_HUES.map((hue) => (
              <Button key={hue} variant="soft" hue={hue} size="sm">
                {hue}
              </Button>
            ))}
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="soft" hue="sky">sky</Button>
      <Button variant="soft" hue="mint">mint</Button>
      <Button variant="soft" hue="peach">peach</Button>
      <Button variant="soft" hue="periwinkle">periwinkle</Button>
    </div>
  )
}`,
      },
      {
        id: 'dark-variants',
        title: '深色表面变体（dark-surface / dark-on-coral）',
        description: '在深色釉面聚焦卡上使用 dark-surface 半透明胶囊按钮，在暖珊瑚卡上使用 dark-on-coral。',
        surface: 'dark',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="dark-surface">深色卡次级操作</Button>
            <Button variant="dark-surface" size="icon" aria-label="新增">
              <Plus size={18} weight="bold" />
            </Button>
            <Button variant="dark-on-coral">珊瑚卡高对比按钮</Button>
          </div>
        ),
        code: `import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <div className="flex gap-3">
      <Button variant="dark-surface">深色卡操作</Button>
      <Button variant="dark-on-coral">珊瑚卡按钮</Button>
    </div>
  )
}`,
      },
      {
        id: 'states-and-render',
        title: '加载、聚焦禁用与 render 多态链接',
        description: '支持 Base UI 的 focusableWhenDisabled（加载中保持焦点）以及 render={<a />} 多态渲染（不使用 Radix asChild）。',
        minHeight: 150,
        render: () => <ButtonLoadingDemo />,
        code: `import * as React from 'react'
import { ArrowRight, CircleNotch } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function Example() {
  const [loading, setLoading] = React.useState(false)
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button disabled={loading} focusableWhenDisabled onClick={() => setLoading(true)}>
        {loading && <CircleNotch size={16} className="animate-spin" />}
        <span>{loading ? '正在部署...' : '提交'}</span>
      </Button>
      <Button variant="soft" hue="sky" render={<a href="#examples" />} nativeButton={false}>
        <span>作为链接渲染</span>
        <ArrowRight size={15} />
      </Button>
    </div>
  )
}`,
      },
    ],
  },

  input: {
    hero: {
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input placeholder="搜索组件或节点名称..." leadingIcon={<MagnifyingGlass size={16} />} />
          <Input defaultValue="glaze-prod-01" surface="soft" />
        </div>
      ),
      code: `import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Input placeholder="搜索组件..." leadingIcon={<MagnifyingGlass size={16} />} />
      <Input defaultValue="glaze-prod-01" />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'decorators',
        title: '前后装饰元素（一键清空 / 密码显隐 / 域名后缀）',
        description: '组合 leadingIcon 与 trailingElement 打造搜索框、密钥输入与前缀后缀输入控件。',
        render: () => <InputDecoratorsDemo />,
        code: `import * as React from 'react'
import { Eye, EyeSlash, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'

export function Example() {
  const [value, setValue] = React.useState('glaze-ui')
  const [show, setShow] = React.useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leadingIcon={<MagnifyingGlass size={16} />}
        trailingElement={value && <button type="button" onClick={() => setValue('')}><X size={13} /></button>}
      />
      <Input
        type={show ? 'text' : 'password'}
        defaultValue="secret"
        trailingElement={<button type="button" onClick={() => setShow((v) => !v)}>{show ? <EyeSlash size={15} /> : <Eye size={15} />}</button>}
      />
    </div>
  )
}`,
      },
      {
        id: 'sizes-and-surface',
        title: '尺寸规格与画布纯白表面',
        description: '支持 inputSize="sm" / "md"；置于 #F2F4F8 画布时使用 surface="white"。',
        surface: 'canvas',
        minHeight: 160,
        render: () => (
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Input inputSize="sm" surface="white" placeholder="紧凑尺寸 sm（36px）" />
            <Input inputSize="md" surface="white" placeholder="标准尺寸 md（44px）" />
          </div>
        ),
        code: `import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Input inputSize="sm" surface="white" placeholder="紧凑尺寸 sm" />
      <Input inputSize="md" surface="white" placeholder="标准尺寸 md" />
    </div>
  )
}`,
      },
      {
        id: 'disabled-readonly',
        title: '禁用与只读状态',
        description: '清晰区分不可交互的 disabled 状态与可选中复制的 readOnly 状态。',
        minHeight: 150,
        render: () => (
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Input disabled defaultValue="已锁定不可编辑" />
            <Input readOnly defaultValue="https://raw.githubusercontent.com/pengtikui/glaze-ui" />
          </div>
        ),
        code: `import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Input disabled defaultValue="已锁定不可编辑" />
      <Input readOnly defaultValue="只读地址，可复制" />
    </div>
  )
}`,
      },
    ],
  },

  'number-field': {
    hero: {
      render: () => (
        <div className="w-full max-w-xs">
          <NumberField defaultValue={24} min={16} max={32} unit="°C" />
        </div>
      ),
      code: `import { NumberField } from '@/components/ui/number-field'

export function Example() {
  return <NumberField defaultValue={24} min={16} max={32} unit="°C" />
}`,
    },
    examples: [
      {
        id: 'scrub-and-controlled',
        title: '拖拽标签微调（ScrubArea）与受控联动',
        description: '传入 label 自动启用 Base UI ScrubArea，按住标签左右拖动即可丝滑调整数值。',
        render: () => <NumberFieldControlledDemo />,
        code: `import * as React from 'react'
import { NumberField } from '@/components/ui/number-field'

export function Example() {
  const [replicas, setReplicas] = React.useState<number | null>(3)
  return (
    <NumberField
      label="节点副本数（按住标签左右拖动）"
      value={replicas}
      onValueChange={setReplicas}
      min={1}
      max={16}
      unit="台"
    />
  )
}`,
      },
      {
        id: 'formatting-steps',
        title: '小数步长、货币与百分比格式',
        description: '透传 Intl.NumberFormatOptions（format）与 step / smallStep / largeStep（Alt / Shift 微调）。',
        render: () => (
          <div className="flex w-full max-w-md flex-wrap items-end justify-center gap-4">
            <NumberField
              label="月度预算"
              defaultValue={1200}
              min={0}
              step={100}
              format={{ style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }}
            />
            <NumberField
              label="缩放比例"
              defaultValue={0.75}
              min={0}
              max={1}
              step={0.05}
              smallStep={0.01}
              format={{ style: 'percent' }}
            />
          </div>
        ),
        code: `import { NumberField } from '@/components/ui/number-field'

export function Example() {
  return (
    <div className="flex flex-wrap gap-4">
      <NumberField
        label="月度预算"
        defaultValue={1200}
        step={100}
        format={{ style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }}
      />
      <NumberField
        label="缩放比例"
        defaultValue={0.75}
        min={0}
        max={1}
        step={0.05}
        format={{ style: 'percent' }}
      />
    </div>
  )
}`,
      },
      {
        id: 'surface-disabled',
        title: '纯白表面与禁用状态',
        description: '支持画布背景下的 surface="white" 与 disabled 禁用态。',
        surface: 'canvas',
        minHeight: 160,
        render: () => (
          <div className="flex flex-wrap items-end justify-center gap-4">
            <NumberField surface="white" label="最大连接数" defaultValue={128} step={16} />
            <NumberField surface="white" label="已锁定配额" defaultValue={64} disabled />
          </div>
        ),
        code: `import { NumberField } from '@/components/ui/number-field'

export function Example() {
  return (
    <div className="flex gap-4">
      <NumberField surface="white" label="最大连接数" defaultValue={128} step={16} />
      <NumberField surface="white" label="已锁定配额" defaultValue={64} disabled />
    </div>
  )
}`,
      },
    ],
  },

  'otp-field': {
    hero: {
      render: () => <OTPField length={6} defaultValue="482" />,
      code: `import { OTPField } from '@/components/ui/otp-field'

export function Example() {
  return <OTPField length={6} defaultValue="482" />
}`,
    },
    examples: [
      {
        id: 'controlled-verify',
        title: '受控输入与自动核验反馈',
        description: '通过 value 与 onValueChange 监听输入进度，完整输入 6 位后即时校验。',
        render: () => <OTPVerifyDemo />,
        code: `import * as React from 'react'
import { OTPField } from '@/components/ui/otp-field'

export function Example() {
  const [code, setCode] = React.useState('')
  return (
    <div className="flex flex-col items-center gap-2">
      <OTPField length={6} value={code} onValueChange={setCode} />
      <span className="text-[12px]">当前输入：{code || '空'}</span>
    </div>
  )
}`,
      },
      {
        id: 'length-and-separator',
        title: '自定义长度与分隔位置',
        description: '设置 length={4} separatorAt={0} 生成无分隔 4 位 PIN，或 length={8} separatorAt={4} 用于恢复码。',
        minHeight: 170,
        render: () => (
          <div className="flex flex-col items-center gap-4">
            <OTPField length={4} separatorAt={0} defaultValue="2026" />
            <OTPField length={8} separatorAt={4} defaultValue="9481" />
          </div>
        ),
        code: `import { OTPField } from '@/components/ui/otp-field'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <OTPField length={4} separatorAt={0} />
      <OTPField length={8} separatorAt={4} />
    </div>
  )
}`,
      },
      {
        id: 'mask-disabled',
        title: '掩码输入（mask）与禁用态',
        description: '开启 mask 以圆点隐藏敏感 PIN 码，disabled 用于锁定已提交验证码。',
        minHeight: 170,
        render: () => (
          <div className="flex flex-col items-center gap-4">
            <OTPField length={4} separatorAt={0} mask defaultValue="7391" />
            <OTPField length={6} disabled defaultValue="604218" />
          </div>
        ),
        code: `import { OTPField } from '@/components/ui/otp-field'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <OTPField length={4} separatorAt={0} mask defaultValue="7391" />
      <OTPField length={6} disabled defaultValue="604218" />
    </div>
  )
}`,
      },
    ],
  },

  checkbox: {
    hero: {
      render: () => <CheckboxHeroDemo />,
      code: `import { Checkbox } from '@/components/ui/checkbox'

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox defaultChecked label="开启自动快照备份" description="每日 03:00 执行" />
      <Checkbox indeterminate label="半选状态示例" />
      <Checkbox disabled label="禁用状态选项" />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'controlled',
        title: '受控状态与按钮联动',
        description: '通过 checked 与 onCheckedChange 控制提交按钮的可用状态。',
        render: () => <CheckboxControlledDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export function Example() {
  const [agreed, setAgreed] = React.useState(false)
  return (
    <div className="flex flex-col items-start gap-3">
      <Checkbox checked={agreed} onCheckedChange={setAgreed} label="我已阅读并同意服务 SLA 协议" />
      <Button size="sm" disabled={!agreed}>立即部署</Button>
    </div>
  )
}`,
      },
      {
        id: 'disabled-states',
        title: '禁用态组合',
        description: '同时支持未选禁用、已选禁用和半选禁用，用于展示只读权限项。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-col gap-2.5">
            <Checkbox disabled label="未选中禁用项" />
            <Checkbox disabled defaultChecked label="已选中禁用项（系统必选）" />
            <Checkbox disabled indeterminate label="半选禁用项" />
          </div>
        ),
        code: `import { Checkbox } from '@/components/ui/checkbox'

export function Example() {
  return (
    <div className="flex flex-col gap-2.5">
      <Checkbox disabled label="未选中禁用项" />
      <Checkbox disabled defaultChecked label="已选中禁用项" />
      <Checkbox disabled indeterminate label="半选禁用项" />
    </div>
  )
}`,
      },
    ],
  },

  'checkbox-group': {
    hero: {
      render: () => <CheckboxGroupHeroDemo />,
      code: `import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'

export function Example() {
  const [value, setValue] = React.useState(['auto', 'alerts'])
  return (
    <CheckboxGroup value={value} onValueChange={setValue}>
      <Checkbox name="auto" label="自动安全更新" />
      <Checkbox name="alerts" label="异常指标告警推送" />
      <Checkbox name="digest" label="每周运营摘要邮件" />
    </CheckboxGroup>
  )
}`,
    },
    examples: [
      {
        id: 'parent-select-all',
        title: '父级全选与自动半选（allValues + parent）',
        description: '参考 Base UI 经典模式：为 CheckboxGroup 传入 allValues 并在顶部复选框添加 parent，自动联动全选与半选态。',
        render: () => <CheckboxGroupParentDemo />,
        code: `import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'

const ALL = ['read', 'write', 'deploy', 'audit']

export function Example() {
  const [selected, setSelected] = React.useState(['read', 'write'])
  return (
    <CheckboxGroup value={selected} onValueChange={setSelected} allValues={ALL}>
      <Checkbox parent label="全部项目权限" />
      <div className="ml-6 flex flex-col gap-2">
        <Checkbox value="read" label="只读查看" />
        <Checkbox value="write" label="配置编辑" />
        <Checkbox value="deploy" label="生产发布" />
        <Checkbox value="audit" label="安全审计日志" />
      </div>
    </CheckboxGroup>
  )
}`,
      },
      {
        id: 'disabled-group',
        title: '整组禁用与 Fieldset 组合',
        description: '在 CheckboxGroup 上设置 disabled 一次性禁用组内所有选项。',
        minHeight: 170,
        render: () => (
          <Fieldset className="w-full max-w-xs">
            <FieldsetLegend>只读合规策略</FieldsetLegend>
            <CheckboxGroup defaultValue={['tls', 'audit']} disabled>
              <Checkbox name="tls" label="强制 TLS 1.3 加密" />
              <Checkbox name="audit" label="保留 90 天审计日志" />
              <Checkbox name="public" label="允许匿名公网访问" />
            </CheckboxGroup>
          </Fieldset>
        ),
        code: `import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'

export function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>只读合规策略</FieldsetLegend>
      <CheckboxGroup defaultValue={['tls']} disabled>
        <Checkbox name="tls" label="强制 TLS 1.3" />
        <Checkbox name="public" label="允许匿名访问" />
      </CheckboxGroup>
    </Fieldset>
  )
}`,
      },
    ],
  },

  radio: {
    hero: {
      render: () => <RadioHeroDemo />,
      code: `import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  return (
    <RadioGroup defaultValue="balanced">
      <Radio value="eco" label="节能模式" description="夜间自动降低后台同步频率" />
      <Radio value="balanced" label="均衡模式" description="性能与能耗自动平衡" />
      <Radio value="turbo" label="极速模式" description="满载算力，响应延迟最低" />
    </RadioGroup>
  )
}`,
    },
    examples: [
      {
        id: 'card-style',
        title: '卡片模式（card）',
        description: '传入 card 属性将 Radio 渲染为 Glaze 圆角选中卡片，选中时自动高亮浅薰衣草底色与边框环。',
        render: () => <RadioCardDemo />,
        code: `import * as React from 'react'
import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  const [plan, setPlan] = React.useState('pro')
  return (
    <RadioGroup value={plan} onValueChange={(v) => setPlan(String(v))}>
      <Radio card value="starter" label="Starter · 免费" description="适合个人 Homelab" />
      <Radio card value="pro" label="Pro · ¥99 / 月" description="无限节点与自动异地冷备" />
    </RadioGroup>
  )
}`,
      },
      {
        id: 'horizontal-and-disabled',
        title: '横向排列与禁用选项',
        description: '通过 className="flex-row" 横向排布选项，单项支持 disabled 属性。',
        minHeight: 140,
        render: () => (
          <RadioGroup defaultValue="monthly" className="flex-row flex-wrap gap-5">
            <Radio value="monthly" label="按月计费" />
            <Radio value="yearly" label="按年计费（省 20%）" />
            <Radio value="lifetime" label="买断授权（已停售）" disabled />
          </RadioGroup>
        ),
        code: `import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  return (
    <RadioGroup defaultValue="monthly" className="flex-row gap-5">
      <Radio value="monthly" label="按月计费" />
      <Radio value="yearly" label="按年计费" />
      <Radio value="lifetime" label="买断授权" disabled />
    </RadioGroup>
  )
}`,
      },
    ],
  },

  'radio-group': {
    hero: {
      render: () => <RadioHeroDemo />,
      code: `import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  return (
    <RadioGroup defaultValue="balanced">
      <Radio value="eco" label="节能模式" description="降低同步频率" />
      <Radio value="balanced" label="均衡模式" description="性能与能耗平衡" />
      <Radio value="turbo" label="极速模式" description="满载算力输出" />
    </RadioGroup>
  )
}`,
    },
    examples: [
      {
        id: 'cards',
        title: '受控卡片单选组',
        description: '在配置面板与计费方案页中结合 Radio card 属性呈现清晰的点击热区。',
        render: () => <RadioCardDemo />,
        code: `import * as React from 'react'
import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  const [plan, setPlan] = React.useState('pro')
  return (
    <RadioGroup value={plan} onValueChange={(v) => setPlan(String(v))}>
      <Radio card value="starter" label="Starter" description="3 个节点" />
      <Radio card value="pro" label="Pro" description="无限节点与冷备" />
    </RadioGroup>
  )
}`,
      },
      {
        id: 'with-fieldset',
        title: '结合 Fieldset 与表单语义',
        description: '使用 Fieldset + FieldsetLegend 为单选组提供无障碍分组标题。',
        render: () => (
          <Fieldset className="w-full max-w-sm">
            <FieldsetLegend>默认发布通道</FieldsetLegend>
            <RadioGroup defaultValue="stable" name="channel">
              <Radio value="stable" label="Stable 稳定版" description="仅推送通过全量回归验证的版本" />
              <Radio value="canary" label="Canary 金丝雀" description="第一时间体验最新实验特性" />
            </RadioGroup>
          </Fieldset>
        ),
        code: `import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Radio } from '@/components/ui/radio'
import { RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>默认发布通道</FieldsetLegend>
      <RadioGroup defaultValue="stable" name="channel">
        <Radio value="stable" label="Stable 稳定版" />
        <Radio value="canary" label="Canary 金丝雀" />
      </RadioGroup>
    </Fieldset>
  )
}`,
      },
    ],
  },

  switch: {
    hero: {
      render: () => <SwitchHeroDemo />,
      code: `import * as React from 'react'
import { Switch } from '@/components/ui/switch'

export function Example() {
  const [enabled, setEnabled] = React.useState(true)
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium">
      <Switch checked={enabled} onCheckedChange={setEnabled} hue="mint" />
      <span>启用广告拦截</span>
    </label>
  )
}`,
    },
    examples: [
      {
        id: 'hues-and-sizes',
        title: '尺寸与色相主题',
        description: '支持 sm / md 两种尺寸，以及全部 9 组柔彩与 ink 深墨色相。',
        minHeight: 160,
        render: () => (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Switch defaultChecked hue="mint" />
              <Switch defaultChecked hue="sky" />
              <Switch defaultChecked hue="periwinkle" />
              <Switch defaultChecked hue="peach" />
              <Switch defaultChecked hue="coral" />
              <Switch defaultChecked hue="ink" />
            </div>
            <div className="flex items-center gap-5 text-[12px] text-[#6B7280]">
              <label className="flex cursor-pointer items-center gap-2">
                <Switch defaultChecked size="sm" hue="periwinkle" />
                <span>sm 紧凑</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <Switch defaultChecked size="md" hue="periwinkle" />
                <span>md 标准</span>
              </label>
            </div>
          </div>
        ),
        code: `import { Switch } from '@/components/ui/switch'

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Switch defaultChecked size="sm" hue="sky" />
      <Switch defaultChecked size="md" hue="mint" />
      <Switch defaultChecked size="md" hue="ink" />
    </div>
  )
}`,
      },
      {
        id: 'settings-list',
        title: '设置项列表卡片',
        description: '将 Switch 包裹在柔灰圆角行内，点击整行即可切换状态，常用于系统偏好设置。',
        render: () => <SwitchSettingsListDemo />,
        code: `import * as React from 'react'
import { Switch } from '@/components/ui/switch'

export function Example() {
  const [backup, setBackup] = React.useState(true)
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-[18px] bg-[#F6F7F9] px-4 py-3">
      <div>
        <div className="text-[14px] font-semibold">每日快照备份</div>
        <div className="text-[12px] text-[#6B7280]">凌晨 03:00 自动归档</div>
      </div>
      <Switch checked={backup} onCheckedChange={setBackup} hue="mint" />
    </label>
  )
}`,
      },
    ],
  },

  slider: {
    hero: {
      render: () => <SliderHeroDemo />,
      code: `import * as React from 'react'
import { Slider } from '@/components/ui/slider'

export function Example() {
  const [val, setVal] = React.useState(68)
  const [range, setRange] = React.useState<[number, number]>([25, 78])
  return (
    <div className="flex flex-col gap-5">
      <Slider value={val} onValueChange={(v) => setVal(Number(v))} label="亮度调节" unit="%" hue="periwinkle" />
      <Slider value={range} onValueChange={(v) => Array.isArray(v) && setRange([v[0], v[1]])} label="告警阈值区间" unit="%" hue="aqua" />
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'live-preview',
        title: '受控实时联动与步长（step）',
        description: '结合 min / max / step 实时驱动视觉参数预览。',
        render: () => <SliderInteractiveRadiusDemo />,
        code: `import * as React from 'react'
import { Slider } from '@/components/ui/slider'

export function Example() {
  const [radius, setRadius] = React.useState(24)
  return (
    <Slider
      value={radius}
      onValueChange={(v) => setRadius(Number(v))}
      min={4}
      max={36}
      step={2}
      label="容器圆角"
      unit="px"
      hue="sky"
    />
  )
}`,
      },
      {
        id: 'hues-and-disabled',
        title: '色相主题、隐藏数值与禁用态',
        description: '支持多种色相，可通过 showValue={false} 隐藏右上角数值或通过 disabled 禁用拖动。',
        render: () => (
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Slider defaultValue={82} label="薄荷主题" unit="%" hue="mint" />
            <Slider defaultValue={54} label="隐藏数值显示" showValue={false} hue="coral" />
            <Slider defaultValue={40} label="只读锁定阈值" unit="%" hue="ink" disabled />
          </div>
        ),
        code: `import { Slider } from '@/components/ui/slider'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Slider defaultValue={82} label="薄荷主题" unit="%" hue="mint" />
      <Slider defaultValue={54} label="隐藏数值" showValue={false} hue="coral" />
      <Slider defaultValue={40} label="禁用状态" unit="%" disabled />
    </div>
  )
}`,
      },
    ],
  },

  toggle: {
    hero: {
      render: () => <ToggleHeroDemo />,
      code: `import { TextB, TextItalic } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'

export function Example() {
  return (
    <div className="flex items-center gap-2.5">
      <Toggle defaultPressed aria-label="加粗"><TextB size={16} weight="bold" /><span>加粗</span></Toggle>
      <Toggle aria-label="斜体"><TextItalic size={16} weight="bold" /><span>斜体</span></Toggle>
    </div>
  )
}`,
    },
    examples: [
      {
        id: 'controlled-states',
        title: '受控状态与动态图标反馈',
        description: '结合 pressed 与 onPressedChange 动态切换图标字重、文案及紧凑 sm 尺寸。',
        minHeight: 150,
        render: () => <ToggleControlledDemo />,
        code: `import * as React from 'react'
import { BookmarkSimple } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'

export function Example() {
  const [saved, setSaved] = React.useState(false)
  return (
    <Toggle pressed={saved} onPressedChange={setSaved} aria-label="收藏">
      <BookmarkSimple size={16} weight={saved ? 'fill' : 'regular'} />
      <span>{saved ? '已收藏' : '收藏'}</span>
    </Toggle>
  )
}`,
      },
      {
        id: 'disabled',
        title: '禁用状态',
        description: '禁用后自动移除按压缩放并降低不透明度。',
        minHeight: 140,
        render: () => (
          <div className="flex items-center gap-3">
            <Toggle disabled aria-label="禁用未激活">
              <TextB size={16} weight="bold" />
              <span>未激活禁用</span>
            </Toggle>
            <Toggle disabled defaultPressed aria-label="禁用已激活">
              <Lock size={16} weight="bold" />
              <span>已激活锁定</span>
            </Toggle>
          </div>
        ),
        code: `import { Toggle } from '@/components/ui/toggle'

export function Example() {
  return (
    <div className="flex gap-3">
      <Toggle disabled>未激活禁用</Toggle>
      <Toggle disabled defaultPressed>已激活锁定</Toggle>
    </div>
  )
}`,
      },
    ],
  },

  'toggle-group': {
    hero: {
      render: () => <ToggleGroupHeroDemo />,
      code: `import { TextAlignCenter, TextAlignLeft, TextAlignRight } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'

export function Example() {
  return (
    <ToggleGroup defaultValue={['left']}>
      <Toggle value="left" aria-label="左对齐"><TextAlignLeft size={16} /></Toggle>
      <Toggle value="center" aria-label="居中"><TextAlignCenter size={16} /></Toggle>
      <Toggle value="right" aria-label="右对齐"><TextAlignRight size={16} /></Toggle>
    </ToggleGroup>
  )
}`,
    },
    examples: [
      {
        id: 'multiple',
        title: '多选模式（multiple）',
        description: '设置 multiple 允许同时激活多个切换按钮，非常适合富文本格式或标签组合筛选。',
        minHeight: 160,
        render: () => <ToggleGroupMultipleDemo />,
        code: `import * as React from 'react'
import { TextB, TextItalic, TextUnderline } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'

export function Example() {
  const [styles, setStyles] = React.useState(['bold', 'underline'])
  return (
    <ToggleGroup multiple value={styles} onValueChange={setStyles}>
      <Toggle value="bold"><TextB size={16} /></Toggle>
      <Toggle value="italic"><TextItalic size={16} /></Toggle>
      <Toggle value="underline"><TextUnderline size={16} /></Toggle>
    </ToggleGroup>
  )
}`,
      },
      {
        id: 'text-and-disabled',
        title: '文本选项与禁用状态',
        description: '支持纯文字紧凑按钮组，可单独禁用某项或禁用整组。',
        minHeight: 150,
        render: () => (
          <div className="flex flex-wrap items-center gap-4">
            <ToggleGroup defaultValue={['7d']}>
              <Toggle value="24h" size="sm">24h</Toggle>
              <Toggle value="7d" size="sm">7 天</Toggle>
              <Toggle value="30d" size="sm">30 天</Toggle>
              <Toggle value="all" size="sm" disabled>全部</Toggle>
            </ToggleGroup>
          </div>
        ),
        code: `import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'

export function Example() {
  return (
    <ToggleGroup defaultValue={['7d']}>
      <Toggle value="24h" size="sm">24h</Toggle>
      <Toggle value="7d" size="sm">7 天</Toggle>
      <Toggle value="30d" size="sm">30 天</Toggle>
      <Toggle value="all" size="sm" disabled>全部</Toggle>
    </ToggleGroup>
  )
}`,
      },
    ],
  },

  field: {
    hero: {
      render: () => (
        <div className="w-full max-w-sm">
          <Field name="domain">
            <FieldLabel>自定义 Registry 域名</FieldLabel>
            <Input defaultValue="https://example.com" />
            <FieldDescription>用于生成 shadcn CLI 安装地址</FieldDescription>
          </Field>
        </div>
      ),
      code: `import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Field name="domain">
      <FieldLabel>自定义 Registry 域名</FieldLabel>
      <Input placeholder="https://example.com" />
      <FieldDescription>用于生成 shadcn CLI 安装地址</FieldDescription>
    </Field>
  )
}`,
    },
    examples: [
      {
        id: 'validation-errors',
        title: '约束校验与 FieldError 匹配',
        description: '结合 FieldError 的 match 属性按原生 ValidityState 精确展示不同错误提示。',
        render: () => <FieldValidationDemo />,
        code: `import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Form validationMode="onBlur" onSubmit={(e) => e.preventDefault()}>
      <Field name="slug">
        <FieldLabel>仓库名称</FieldLabel>
        <Input required pattern="^[a-z0-9-]+$" placeholder="glaze-design-system" />
        <FieldDescription>仅小写字母、数字和连字符</FieldDescription>
        <FieldError match="valueMissing">仓库名称不能为空</FieldError>
        <FieldError match="patternMismatch">只能包含小写字母、数字和连字符 (-)</FieldError>
      </Field>
      <Button type="submit" size="sm">验证字段</Button>
    </Form>
  )
}`,
      },
      {
        id: 'disabled-and-invalid',
        title: '禁用字段与手动标记无效状态',
        description: '在 Field 上设置 disabled 会自动同步给内部控件；invalid={true} 可强制显示 FieldError。',
        render: () => (
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Field name="org" disabled>
              <FieldLabel>所属组织（只读锁定）</FieldLabel>
              <Input defaultValue="glaze-core" />
              <FieldDescription>如需迁移组织请联系管理员</FieldDescription>
            </Field>
            <Field name="token" invalid>
              <FieldLabel>访问令牌</FieldLabel>
              <Input defaultValue="glz_expired_920" />
              <FieldError match={true}>该令牌已过期，请重新生成</FieldError>
            </Field>
          </div>
        ),
        code: `import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Field name="org" disabled>
        <FieldLabel>所属组织</FieldLabel>
        <Input defaultValue="glaze-core" />
      </Field>
      <Field name="token" invalid>
        <FieldLabel>访问令牌</FieldLabel>
        <Input defaultValue="glz_expired_920" />
        <FieldError match={true}>该令牌已过期</FieldError>
      </Field>
    </div>
  )
}`,
      },
    ],
  },

  fieldset: {
    hero: {
      render: () => (
        <Fieldset className="w-full max-w-md">
          <FieldsetLegend>通知通道设置</FieldsetLegend>
          <label className="flex cursor-pointer items-center justify-between text-[14px]">
            <span>Webhook 告警</span>
            <Switch defaultChecked hue="sky" />
          </label>
          <label className="flex cursor-pointer items-center justify-between text-[14px]">
            <span>邮件日报汇总</span>
            <Switch hue="periwinkle" />
          </label>
        </Fieldset>
      ),
      code: `import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Switch } from '@/components/ui/switch'

export function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>通知通道设置</FieldsetLegend>
      <label className="flex items-center justify-between">
        <span>Webhook 告警</span>
        <Switch defaultChecked hue="sky" />
      </label>
      <label className="flex items-center justify-between">
        <span>邮件日报汇总</span>
        <Switch hue="periwinkle" />
      </label>
    </Fieldset>
  )
}`,
    },
    examples: [
      {
        id: 'multi-field-group',
        title: '表单区块分组',
        description: '将多个相关联的 Field 组合在一个 Fieldset 内，自动拥有柔和圆角面板与语义化 legend。',
        render: () => (
          <Fieldset className="w-full max-w-md">
            <FieldsetLegend>TLS 证书配置</FieldsetLegend>
            <Field name="cn">
              <FieldLabel>主域名</FieldLabel>
              <Input surface="white" defaultValue="registry.glaze.dev" />
            </Field>
            <Field name="email">
              <FieldLabel>ACME 续期邮箱</FieldLabel>
              <Input surface="white" type="email" defaultValue="ops@glaze.dev" />
            </Field>
          </Fieldset>
        ),
        code: `import { Field, FieldLabel } from '@/components/ui/field'
import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>TLS 证书配置</FieldsetLegend>
      <Field name="cn">
        <FieldLabel>主域名</FieldLabel>
        <Input surface="white" defaultValue="registry.glaze.dev" />
      </Field>
      <Field name="email">
        <FieldLabel>ACME 续期邮箱</FieldLabel>
        <Input surface="white" type="email" defaultValue="ops@glaze.dev" />
      </Field>
    </Fieldset>
  )
}`,
      },
      {
        id: 'disabled-fieldset',
        title: '整组禁用（disabled）',
        description: '为 Fieldset 传入 disabled，一键禁用分组内的所有输入框与开关。',
        render: () => (
          <Fieldset disabled className="w-full max-w-md opacity-70">
            <FieldsetLegend>企业版专属配额（未开通）</FieldsetLegend>
            <Field name="ip">
              <FieldLabel>固定出口 IP</FieldLabel>
              <Input surface="white" defaultValue="103.24.18.9" />
            </Field>
            <label className="flex items-center justify-between text-[14px]">
              <span>独享物理网关</span>
              <Switch defaultChecked hue="periwinkle" />
            </label>
          </Fieldset>
        ),
        code: `import { Field, FieldLabel } from '@/components/ui/field'
import { Fieldset, FieldsetLegend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Fieldset disabled>
      <FieldsetLegend>企业版专属配额</FieldsetLegend>
      <Field name="ip">
        <FieldLabel>固定出口 IP</FieldLabel>
        <Input surface="white" defaultValue="103.24.18.9" />
      </Field>
    </Fieldset>
  )
}`,
      },
    ],
  },

  form: {
    hero: {
      render: () => <FormHeroDemo />,
      code: `import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Field name="project">
        <FieldLabel>项目标识</FieldLabel>
        <Input required placeholder="例如 glaze-console" />
        <FieldDescription>仅支持小写字母与连字符</FieldDescription>
        <FieldError match="valueMissing">请输入项目标识</FieldError>
      </Field>
      <Button type="submit">提交校验</Button>
    </Form>
  )
}`,
    },
    examples: [
      {
        id: 'server-errors',
        title: '服务端错误映射（errors + onFormSubmit）',
        description: '参考 Base UI Form 核心范式：使用 onFormSubmit 直接获取序列化字段对象，并将后端校验错误通过 errors 精准路由到对应 FieldError。',
        render: () => <FormServerErrorsDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function Example() {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  return (
    <Form
      errors={errors}
      onFormSubmit={(values) => {
        if (values.username === 'admin') {
          setErrors({ username: '用户名 "admin" 已被系统保留' })
        } else {
          setErrors({})
        }
      }}
    >
      <Field name="username">
        <FieldLabel>管理员账号</FieldLabel>
        <Input required defaultValue="admin" />
        <FieldError />
      </Field>
      <Button type="submit">提交</Button>
    </Form>
  )
}`,
      },
      {
        id: 'complete-form',
        title: '综合配置表单（多控件与重置）',
        description: '组合 Input、Select、Textarea 与 Checkbox，演示原生重置与表单数据汇总。',
        render: () => <FormCompleteDemo />,
        code: `import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function Example() {
  const [region, setRegion] = React.useState('cn-sh')
  return (
    <Form onFormSubmit={(values) => console.log({ ...values, region })}>
      <Field name="service">
        <FieldLabel>服务名称</FieldLabel>
        <Input required defaultValue="edge-gateway" />
      </Field>
      <Select value={region} onValueChange={setRegion} options={[{ value: 'cn-sh', label: '华东 · 上海' }]} />
      <Field name="notes">
        <FieldLabel>备注说明</FieldLabel>
        <Textarea rows={2} placeholder="可选发布备注..." />
      </Field>
      <Checkbox name="tls" defaultChecked label="强制启用 TLS 1.3" />
      <Button type="submit">创建服务</Button>
    </Form>
  )
}`,
      },
    ],
  },
}
