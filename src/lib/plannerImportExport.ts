import { isPlainRecord, isStatus, type DocumentDetailMap, type PlannerState, type StatusMap } from './plannerState'

export interface PlannerExportFile {
  app: 'dessert-cafe-startup-planner'
  version: 1
  exportedAt: string
  state: PlannerState
}

function validateStatusMap(value: unknown, label: string): StatusMap {
  if (!isPlainRecord(value)) throw new Error(`${label} 형식이 올바르지 않습니다.`)

  return Object.fromEntries(
    Object.entries(value).map(([key, status]) => {
      if (!isStatus(status)) throw new Error(`${label}에 지원하지 않는 상태값이 있습니다: ${key}`)
      return [key, status]
    }),
  )
}

function validateDocumentDetails(value: unknown): DocumentDetailMap {
  if (!isPlainRecord(value)) throw new Error('문서 상세 정보 형식이 올바르지 않습니다.')

  return Object.fromEntries(
    Object.entries(value).map(([key, detail]) => {
      if (!isPlainRecord(detail)) throw new Error(`문서 상세 정보가 올바르지 않습니다: ${key}`)

      const officialLink = typeof detail.officialLink === 'string' ? detail.officialLink : undefined
      const fileLocation = typeof detail.fileLocation === 'string' ? detail.fileLocation : undefined
      const notes = typeof detail.notes === 'string' ? detail.notes : undefined

      return [key, { officialLink, fileLocation, notes }]
    }),
  )
}

export function createPlannerExport(state: PlannerState): PlannerExportFile {
  return {
    app: 'dessert-cafe-startup-planner',
    version: 1,
    exportedAt: new Date().toISOString(),
    state,
  }
}

export function parsePlannerExport(jsonText: string): PlannerState {
  const parsed = JSON.parse(jsonText) as unknown
  if (!isPlainRecord(parsed)) throw new Error('JSON 최상위 형식이 올바르지 않습니다.')
  if (parsed.app !== 'dessert-cafe-startup-planner') throw new Error('Dessert Cafe Planner 백업 파일이 아닙니다.')
  if (parsed.version !== 1) throw new Error('지원하지 않는 백업 파일 버전입니다.')
  if (!isPlainRecord(parsed.state)) throw new Error('저장 상태 데이터가 없습니다.')

  return {
    taskStatuses: validateStatusMap(parsed.state.taskStatuses, '작업 상태'),
    documentStatuses: validateStatusMap(parsed.state.documentStatuses, '문서 상태'),
    documentDetails: validateDocumentDetails(parsed.state.documentDetails),
  }
}

export function downloadPlannerState(state: PlannerState) {
  const file = createPlannerExport(state)
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `dessert-cafe-planner-${new Date().toISOString().slice(0, 10)}.json`
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
