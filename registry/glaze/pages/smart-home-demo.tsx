import * as React from 'react'
import { Fan, Lamp, LockKey, Moon, ShieldCheck, Sun, Television } from '@phosphor-icons/react'
import { AreaTrendCard } from '@/components/cards/area-trend-card'
import { BatteryCard } from '@/components/cards/battery-card'
import { CommandPaletteBarCard } from '@/components/cards/command-palette-bar-card'
import { DeviceControlStripCard } from '@/components/cards/device-control-strip-card'
import { FloorPlanSensorCard } from '@/components/cards/floor-plan-sensor-card'
import { MediaPlayerCard } from '@/components/cards/media-player-card'
import { MetricCard } from '@/components/cards/metric-card'
import { QuickActionGridCard } from '@/components/cards/quick-action-grid-card'
import { QuickSettingsCard } from '@/components/cards/quick-settings-card'
import { ScheduleAgendaCard } from '@/components/cards/schedule-agenda-card'
import { SliderControlCard } from '@/components/cards/slider-control-card'
import { SwitchCard } from '@/components/cards/switch-card'
import { TemperatureCard } from '@/components/cards/temperature-card'
import { WeatherCard } from '@/components/cards/weather-card'
import { WeatherForecastCard } from '@/components/cards/weather-forecast-card'
import { Grid } from '@/components/ui/grid'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { StatusPill } from '@/components/ui/status-pill'
import { useToast } from '@/components/ui/toast'

export function SmartHomeDemoPage() {
  const toast = useToast()
  const [scene, setScene] = React.useState<'home' | 'movie' | 'sleep' | 'away'>('home')
  const [securityArmed, setSecurityArmed] = React.useState(true)
  const [nightWarmth, setNightWarmth] = React.useState(true)

  const handleScene = (next: 'home' | 'movie' | 'sleep' | 'away') => {
    setScene(next)
    const names = { home: '回家舒适', movie: '影院氛围', sleep: '晚安助眠', away: '离家布防' }
    toast({
      title: `已切换至「${names[next]}」场景`,
      description: '全屋照明、空调与窗帘已联动更新',
      status: 'normal',
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
            DEMO 03 · SMART HOME · 全屋智能中控面板
          </span>
          <h1 className="m-0 font-glaze-display text-[36px] sm:text-[40px] leading-11 font-extrabold tracking-[-0.02em] text-[#123A5C]">
            客厅舒适 · 23.4°C
          </h1>
          <p className="m-0 text-[15px] text-[#5B6170]">
            Matter + Zigbee 62 台设备在线 · 当前能耗 420W · 空气质量优 (PM2.5 11)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status="normal" label="全屋安防正常" />
          <SegmentedControl
            value={scene}
            onValueChange={handleScene}
            listClassName="bg-[#E6E9F0]"
            options={[
              { value: 'home', label: '回家' },
              { value: 'movie', label: '影院' },
              { value: 'sleep', label: '睡眠' },
              { value: 'away', label: '离家' },
            ]}
          />
        </div>
      </header>

      <Grid>
        <WeatherCard
          tone="sky"
          city="上海 · 浦东"
          temp={21}
          condition="多云转晴"
          feelsLike="体感 20° · 湿度 54%"
        />
        <TemperatureCard
          tone="aqua"
          room="客厅新风空调"
          initialTemp={23}
          mode={scene === 'sleep' ? '静音' : '舒适'}
        />
        <SliderControlCard
          tone="white"
          label="客厅主灯亮度"
          defaultValue={scene === 'movie' ? 20 : 75}
          unit="%"
          hue="peach"
        />
        <BatteryCard
          tone="mint"
          device="扫拖机器人"
          percent={92}
          charging
          remaining="基站快充中 · 预计 12 分钟满"
        />

        <FloorPlanSensorCard
          tone="aqua"
          title="全屋房间环境总览"
          rooms={[
            { name: '客厅', temp: '23.4°', humidity: '52%', lightOn: true, hue: 'peach' },
            { name: '主卧', temp: '22.1°', humidity: '55%', lightOn: false, hue: 'lilac' },
            { name: '书房', temp: '24.0°', humidity: '49%', lightOn: true, hue: 'sky' },
            { name: '儿童房', temp: '23.0°', humidity: '54%', lightOn: false, hue: 'mint' },
          ]}
        />

        <DeviceControlStripCard
          tone="white"
          title="客厅常用设备开关"
          devices={[
            { id: 'd1', name: '氛围灯带', sub: '暖光 2700K', hue: 'peach', defaultOn: true },
            { id: 'd2', name: '空气净化', sub: '自动低风', hue: 'mint', defaultOn: true },
            { id: 'd3', name: '加湿器', sub: '目标 55%', hue: 'sky', defaultOn: false },
          ]}
        />

        <MediaPlayerCard
          tone="lilac-dark"
          title="Midnight City (Acoustic)"
          artist="HomePod 客厅立体声 · AirPlay 2"
          duration="04:08"
          progress={58}
        />

        <ScheduleAgendaCard
          tone="sky"
          dateLabel="今日自动化联动"
          events={[
            { time: '07:30', title: '主卧窗帘缓缓开启', room: '日出唤醒 · 已执行', hue: 'peach' },
            { time: '10:00', title: '扫拖机器人全屋巡航', room: '离家自动 · 已完成', hue: 'mint' },
            { time: '18:30', title: '玄关与客厅灯带点亮', room: '日落触发 · 已执行', hue: 'lilac' },
            { time: '23:00', title: '门锁自检并切换静音', room: '晚安模式 · 待执行', hue: 'periwinkle' },
          ]}
        />

        <QuickSettingsCard
          tone="white"
          title="安防与节能策略"
          settings={[
            { id: 's1', label: '人体存在感应开灯', desc: '走廊与卫生间自动照明', hue: 'peach', defaultChecked: true },
            { id: 's2', label: '开窗自动暂停空调', desc: '门窗传感器联动节能', hue: 'mint', defaultChecked: true },
            { id: 's3', label: '访客门铃推送截图', desc: '手机与电视同步提醒', hue: 'sky', defaultChecked: true },
            { id: 's4', label: '夜间儿童锁', desc: '22:00 后锁定插座开关', hue: 'coral', defaultChecked: false },
          ]}
        />

        <QuickActionGridCard
          tone="white"
          label="一键场景快捷按钮"
          actions={[
            { id: 'a1', label: '全关灯光', icon: <Lamp size={15} />, hue: 'peach', onClick: () => toast({ title: '已关闭全屋灯光', status: 'info' }) },
            { id: 'a2', label: '新风强排', icon: <Fan size={15} />, hue: 'aqua', onClick: () => toast({ title: '新风强排已开启 15 分钟', status: 'normal' }) },
            { id: 'a3', label: '影院模式', icon: <Television size={15} />, hue: 'lilac', onClick: () => handleScene('movie') },
            { id: 'a4', label: '门锁落锁', icon: <LockKey size={15} />, hue: 'mint', onClick: () => toast({ title: '入户门已确认反锁', status: 'normal' }) },
          ]}
        />

        <SwitchCard
          tone="peach"
          title="全屋离家布防"
          description={securityArmed ? '门磁与红外传感器已布防' : '布防已暂停'}
          checked={securityArmed}
          onCheckedChange={setSecurityArmed}
          icon={<ShieldCheck size={18} weight="duotone" />}
          iconHue="peach"
        />

        <MetricCard
          tone="lemon"
          label="今日累计用电"
          value="8.6"
          unit="kWh"
        />

        <SwitchCard
          tone="white"
          title="日落护眼色温"
          description={nightWarmth ? '18:00 自动过渡至 3000K' : '已暂停自动色温调节'}
          checked={nightWarmth}
          onCheckedChange={setNightWarmth}
          icon={scene === 'sleep' ? <Moon size={18} /> : <Sun size={18} />}
          iconHue="lemon"
        />

        <WeatherForecastCard
          tone="sky"
          location="未来五日户外天气"
          days={[
            { day: '今天', high: 22, low: 14, rain: '10%' },
            { day: '周六', high: 24, low: 15, rain: '5%' },
            { day: '周日', high: 20, low: 13, rain: '45%' },
            { day: '周一', high: 19, low: 11, rain: '20%' },
            { day: '周二', high: 23, low: 14, rain: '0%' },
          ]}
        />

        <AreaTrendCard
          tone="white"
          title="今日全屋实时功耗"
          summary="峰值 680W"
          points={[260, 290, 340, 520, 680, 590, 440, 420]}
          axisLabels={['00:00', '06:00', '12:00', '18:00', '23:59']}
          accentColor="#2FA79B"
        />

        <CommandPaletteBarCard
          tone="ink"
          placeholder="输入语音/文本指令，例如：把书房空调调到 24 度并拉上窗帘…"
          quickActions={[
            { label: '全屋关灯', shortcut: '⌘L' },
            { label: '开启影院', shortcut: '⌘M' },
            { label: '检查门锁', shortcut: '⌘K' },
          ]}
          onAction={(label) => toast({ title: `已执行：${label}`, status: 'normal' })}
        />
      </Grid>
    </div>
  )
}
