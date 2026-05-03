import type { LucideIcon } from 'lucide-react'
import { statuses, statusStyles } from '../lib/plannerState'
import type { Status } from '../types/planner'

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge ${statusStyles[status]}`}>{status}</span>
}

export function StatusSelect({ value, onChange, label }: { value: Status; onChange: (status: Status) => void; label: string }) {
  return (
    <label className="flex items-center gap-2 text-xs font-bold text-stone-600">
      <span className="sr-only">{label}</span>
      <select
        className="rounded-full border border-orange-100 bg-white px-3 py-2 text-xs font-bold text-ink outline-none transition focus:border-orange-300"
        value={value}
        onChange={(event) => onChange(event.target.value as Status)}
      >
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </label>
  )
}

export function StatCard({ icon: Icon, label, value, note }: { icon: LucideIcon; label: string; value: string; note: string }) {
  return (
    <div className="card">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-persimmon">
        <Icon size={22} />
      </div>
      <p className="text-sm font-semibold text-stone-500">{label}</p>
      <p className="mt-1 text-3xl font-black text-ink">{value}</p>
      <p className="mt-2 text-sm text-stone-600">{note}</p>
    </div>
  )
}
