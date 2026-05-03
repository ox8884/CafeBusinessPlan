import type { DocumentItem, Status } from '../types/planner'

export const statuses: Status[] = ['Not Started', 'In Progress', 'Completed', 'Need Help']

export const statusStyles: Record<Status, string> = {
  'Not Started': 'bg-stone-100 text-stone-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  'Need Help': 'bg-amber-100 text-amber-800',
}

export const storageKeys = {
  taskStatuses: 'dessert-cafe.task-statuses.v1',
  documentStatuses: 'dessert-cafe.document-statuses.v1',
  documentDetails: 'dessert-cafe.document-details.v1',
} as const

export type StatusMap = Record<string, Status>
export type DocumentDetailMap = Record<string, Pick<DocumentItem, 'officialLink' | 'fileLocation' | 'notes'>>

export interface PlannerState {
  taskStatuses: StatusMap
  documentStatuses: StatusMap
  documentDetails: DocumentDetailMap
}

export const emptyPlannerState: PlannerState = {
  taskStatuses: {},
  documentStatuses: {},
  documentDetails: {},
}

export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export function loadLocalPlannerState(): PlannerState {
  return {
    taskStatuses: loadJson(storageKeys.taskStatuses, {}),
    documentStatuses: loadJson(storageKeys.documentStatuses, {}),
    documentDetails: loadJson(storageKeys.documentDetails, {}),
  }
}

export function saveLocalPlannerState(state: PlannerState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKeys.taskStatuses, JSON.stringify(state.taskStatuses))
  window.localStorage.setItem(storageKeys.documentStatuses, JSON.stringify(state.documentStatuses))
  window.localStorage.setItem(storageKeys.documentDetails, JSON.stringify(state.documentDetails))
}

export function isStatus(value: unknown): value is Status {
  return typeof value === 'string' && statuses.includes(value as Status)
}

export function docKey(doc: DocumentItem) {
  return doc.name
}

export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
