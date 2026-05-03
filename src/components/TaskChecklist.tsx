import { ExternalLink, Search } from 'lucide-react'
import { statuses } from '../lib/plannerState'
import type { StartupTask, Status } from '../types/planner'
import { StatusSelect } from './ui'

export function TaskChecklist({
  tasks,
  query,
  statusFilter,
  priorityFilter,
  onQueryChange,
  onStatusFilterChange,
  onPriorityFilterChange,
  onTaskStatusChange,
}: {
  tasks: StartupTask[]
  query: string
  statusFilter: 'All' | Status
  priorityFilter: 'All' | StartupTask['priority']
  onQueryChange: (query: string) => void
  onStatusFilterChange: (status: 'All' | Status) => void
  onPriorityFilterChange: (priority: 'All' | StartupTask['priority']) => void
  onTaskStatusChange: (taskId: string, status: Status) => void
}) {
  return (
    <section id="tasks" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="font-bold text-persimmon">Task Checklist</p><h2 className="section-title">우선순위 체크리스트</h2></div>
        <div className="flex flex-col gap-3 rounded-3xl border border-orange-100 bg-white/80 p-3 md:flex-row">
          <label className="flex items-center gap-2 rounded-2xl bg-stone-50 px-3 py-2 text-sm text-stone-600">
            <Search size={16} />
            <input className="bg-transparent outline-none" placeholder="검색: permit, Wave, High..." value={query} onChange={(event) => onQueryChange(event.target.value)} />
          </label>
          <select className="rounded-2xl border border-orange-100 bg-white px-3 py-2 text-sm font-bold" value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value as 'All' | Status)}>
            <option value="All">All Status</option>
            {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <select className="rounded-2xl border border-orange-100 bg-white px-3 py-2 text-sm font-bold" value={priorityFilter} onChange={(event) => onPriorityFilterChange(event.target.value as 'All' | StartupTask['priority'])}>
            <option value="All">All Priority</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option>
          </select>
        </div>
      </div>
      <p className="mt-3 text-sm font-bold text-stone-500">검색/필터 결과: {tasks.length}개 · 상태 변경은 브라우저 localStorage에 자동 저장됩니다.</p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-black">{task.title}</h3>
              <StatusSelect label={`${task.title} 상태`} value={task.status} onChange={(status) => onTaskStatusChange(task.id, status)} />
            </div>
            <p className="mt-3 text-stone-600">{task.description}</p>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <p><b>우선순위:</b> {task.priority}</p><p><b>기간:</b> {task.estimatedDuration}</p><p><b>예상 비용:</b> {task.estimatedCost}</p><p><b>담당:</b> {task.owner}</p><p><b>마감:</b> {task.deadline}</p><p><b>메모:</b> {task.notes}</p>
            </div>
            {task.links.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{task.links.map((link) => <a className="badge bg-orange-50 text-persimmon" href={link} key={link} target="_blank" rel="noreferrer">관련 링크 <ExternalLink size={12} /></a>)}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
