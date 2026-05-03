import { daysUntil } from '../lib/plannerUtils'
import type { StartupTask } from '../types/planner'
import { StatusBadge } from './ui'

export function ThisMonth({ tasks, now }: { tasks: StartupTask[]; now: Date }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-bold text-persimmon">This Month</p><h2 className="section-title">마감일 기준 이번 달 해야 할 일</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {tasks.length === 0 ? <div className="card text-stone-600">이번 달 마감인 미완료 항목이 없습니다.</div> : tasks.map((task) => {
          const remainingDays = daysUntil(task.deadline, now)
          return (
            <div className="card" key={task.id}>
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-black">{task.title}</h3><StatusBadge status={task.status} /></div>
              <p className="mt-2 text-sm text-stone-600">{task.deadline} 마감 · {remainingDays >= 0 ? `${remainingDays}일 남음` : `${Math.abs(remainingDays)}일 지남`}</p>
              <p className="mt-3 text-stone-600">{task.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
