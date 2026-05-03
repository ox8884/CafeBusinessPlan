import type { StartupTask } from '../types/planner'

export function isSameMonth(deadline: string, now: Date) {
  const date = new Date(`${deadline}T12:00:00`)
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
}

export function daysUntil(deadline: string, now: Date) {
  const target = new Date(`${deadline}T12:00:00`).getTime()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12).getTime()
  return Math.ceil((target - today) / 86400000)
}

export function taskSearchText(task: StartupTask) {
  return [
    task.title,
    task.description,
    task.priority,
    task.owner,
    task.status,
    task.deadline,
    task.notes,
    ...task.links,
  ].join(' ').toLowerCase()
}
