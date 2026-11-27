import { AudioNowPlayingCard } from '@/components/blocks/audio-now-playing-card'
import { ChatPreviewCard } from '@/components/blocks/chat-preview-card'
import { ChecklistCard } from '@/components/blocks/checklist-card'
import { ClockCard } from '@/components/blocks/clock-card'
import { FlightRouteCard } from '@/components/blocks/flight-route-card'
import { GalleryMosaicCard } from '@/components/blocks/gallery-mosaic-card'
import { HabitTrackerCard } from '@/components/blocks/habit-tracker-card'
import { HealthPulseCard } from '@/components/blocks/health-pulse-card'
import { MiniCalendarDayCard } from '@/components/blocks/mini-calendar-day-card'
import { PomodoroCard } from '@/components/blocks/pomodoro-card'
import { ProfileSummaryCard } from '@/components/blocks/profile-summary-card'
import { QuickNoteCard } from '@/components/blocks/quick-note-card'
import { QuoteCard } from '@/components/blocks/quote-card'
import { StreakCard } from '@/components/blocks/streak-card'
import { WaterIntakeCard } from '@/components/blocks/water-intake-card'
import { Grid } from '@/components/ui/grid'

export function PersonalOsDemoPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold tracking-[0.06em] text-[#6B7280]">
          DEMO 05 · PERSONAL OS · 个人效率与数字生活仪表盘
        </span>
        <h1 className="m-0 font-glaze-display text-[36px] sm:text-[40px] leading-11 font-extrabold tracking-[-0.02em] text-[#123A5C]">
          早安，今天有 3 件重要小事
        </h1>
        <p className="m-0 text-[15px] text-[#5B6170]">
          专注番茄钟、健康习惯、出行航班与灵感速记同屏聚合
        </p>
      </header>

      <Grid>
        <MiniCalendarDayCard
          tone="rose"
          month="十一月"
          day={27}
          weekday="星期五"
          eventsCount={3}
        />
        <ClockCard tone="white" weekday="上海 · 周五" live />
        <WaterIntakeCard tone="sky" initialCups={5} goal={8} />
        <HealthPulseCard tone="rose" bpm={64} zone="今日状态极佳 · 恢复良好" />

        <PomodoroCard
          tone="coral"
          task="深度写作：设计系统动效规范章节"
          minutes={25}
        />
        <FlightRouteCard
          tone="sky-dark"
          flightNo="MU 5109"
          fromCode="SHA"
          fromCity="上海虹桥"
          toCode="PEK"
          toCity="北京首都"
          departTime="14:30"
          arriveTime="16:45"
          gate="T2 · B18"
        />

        <ChecklistCard
          tone="white"
          title="今日优先清单"
          items={[
            { id: 'c1', label: '完成设计系统 2.0 验收截图', checked: true, tag: '工作', hue: 'periwinkle' },
            { id: 'c2', label: '预订下周北京差旅酒店', checked: true, tag: '出行', hue: 'sky' },
            { id: 'c3', label: '整理 11 月阅读笔记与摘录', checked: false, tag: '学习', hue: 'mint' },
            { id: 'c4', label: '晚间 5 公里轻松跑', checked: false, tag: '运动', hue: 'peach' },
            { id: 'c5', label: '给家里老人寄送体检报告', checked: false, tag: '生活', hue: 'rose' },
          ]}
        />

        <HabitTrackerCard
          tone="mint"
          title="本周习惯打卡"
          habits={[
            { name: '晨间阅读 30 分钟', hue: 'mint', days: [true, true, true, true, true, false, false] },
            { name: '午后冥想呼吸', hue: 'aqua', days: [true, false, true, true, true, false, false] },
            { name: '晚间无手机阅读', hue: 'periwinkle', days: [true, true, false, true, true, false, false] },
            { name: '核心力量训练', hue: 'peach', days: [true, false, true, false, true, false, false] },
          ]}
        />

        <GalleryMosaicCard
          tone="white"
          title="近期摄影与灵感收藏"
          count="1,248 张"
          albums={[
            { title: '京都秋日', items: '86 张 · 胶片', hue: 'coral' },
            { title: '建筑光影', items: '142 张 · 极简', hue: 'sky' },
            { title: '界面灵感', items: '214 张 · Glaze', hue: 'periwinkle' },
            { title: '咖啡地图', items: '39 家 · 上海', hue: 'peach' },
          ]}
        />

        <ProfileSummaryCard
          tone="white"
          name="林一 · Design Engineer"
          role="上海 · 专注组件库与交互动效"
          initials="林"
          hue="periwinkle"
          status="normal"
          statusLabel="专注写作中"
          stats={[
            { label: '本周专注', value: '18.5h' },
            { label: '阅读完本', value: '2 本' },
            { label: '跑步里程', value: '24 km' },
          ]}
        />

        <QuickNoteCard
          tone="lemon"
          title="随手灵感便签"
          tag="可编辑"
          initialText="下一版组件库可以考虑补充快捷键面板与暗色模式完整映射，并保持 220ms 统一轻柔阻尼手感。"
        />

        <StreakCard
          tone="peach"
          label="早起打卡"
          days={19}
          week={[true, true, true, true, true, true, false]}
        />
        <AudioNowPlayingCard
          tone="lilac-dark"
          track="Lo-Fi Rainy Desk"
          artist="白噪音 · 专注歌单"
        />

        <ChatPreviewCard
          tone="white"
          channel="家庭群 · 周末聚餐"
          messages={[
            { sender: '妈妈', text: '这周六晚上回家吃火锅吗？买了新鲜牛羊肉', time: '10:12' },
            { sender: '妹妹', text: '我带一盒刚烤好的焦糖布丁回去！', time: '10:15' },
            { sender: '我', text: '太棒了，我下午五点半准时到家～', mine: true, time: '10:18' },
          ]}
        />

        <QuoteCard
          tone="lilac"
          tag="今日摘录"
          quote="少即是多，但更好的少胜过简单的少。"
          author="Dieter Rams"
        />
        <StreakCard
          tone="aqua"
          label="英语听力"
          days={42}
          week={[true, true, true, false, true, true, true]}
        />
      </Grid>
    </div>
  )
}
