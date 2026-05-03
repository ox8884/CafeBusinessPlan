import type { MenuItem, StartupTask } from '../types/planner'
import { ClipboardList } from 'lucide-react'

export function MenuSection({ menu }: { menu: MenuItem[] }) {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-bold text-persimmon">Cafe Landing</p><h2 className="section-title">샘플 메뉴 · Korean desserts for neighbors</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {menu.map((item) => <div className="card" key={item.name}><p className="text-sm font-bold text-persimmon">{item.koreanName}</p><h3 className="mt-2 text-xl font-black">{item.name}</h3><p className="mt-3 text-sm text-stone-600">{item.description}</p><p className="mt-5 text-2xl font-black">{item.price}</p></div>)}
      </div>
    </section>
  )
}

export function ContactSection({ thisMonthTasks }: { thisMonthTasks: StartupTask[] }) {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="grid gap-6 rounded-[2rem] bg-ink p-8 text-white md:grid-cols-[1fr_.8fr] md:p-12">
        <div><p className="font-bold text-orange-200">About & Contact</p><h2 className="mt-2 text-3xl font-black md:text-5xl">Wave의 베이킹과 Jay의 플래닝을 하나의 카페로</h2><p className="mt-5 leading-8 text-stone-300">한국 디저트를 처음 접하는 미국 고객도 편하게 즐길 수 있도록 설명, 시식, 선물 패키지, 커피 페어링을 준비합니다.</p></div>
        <div className="rounded-3xl bg-white/10 p-6"><ClipboardList className="text-orange-200" /><h3 className="mt-4 text-xl font-black">자동 계산된 이번 달 목표</h3><ul className="mt-4 space-y-2 text-sm text-stone-200">{thisMonthTasks.length === 0 ? <li>• 이번 달 마감 항목 없음</li> : thisMonthTasks.map((task) => <li key={task.id}>• {task.title}</li>)}</ul></div>
      </div>
    </section>
  )
}
