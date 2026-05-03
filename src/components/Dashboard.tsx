import { CalendarClock, CheckCircle2, Flag, TrendingUp } from 'lucide-react'
import { StatCard } from './ui'

export function Dashboard({ progress, completed, thisMonthCount, verificationNeeded, now }: { progress: number; completed: number; thisMonthCount: number; verificationNeeded: number; now: Date }) {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div><p className="font-bold text-persimmon">Dashboard</p><h2 className="section-title">한눈에 보는 창업 준비 현황</h2></div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={TrendingUp} label="전체 진행률" value={`${progress}%`} note="로드맵과 체크리스트 기준" />
        <StatCard icon={CheckCircle2} label="완료된 항목" value={`${completed}`} note="localStorage 반영" />
        <StatCard icon={CalendarClock} label="이번 달 할 일" value={`${thisMonthCount}`} note={`${now.getFullYear()}년 ${now.getMonth() + 1}월 마감 기준`} />
        <StatCard icon={Flag} label="혜택 확인 필요" value={`${verificationNeeded}`} note="공식 링크 확인 필요" />
      </div>
    </section>
  )
}
