import { docKey, emptyPlannerState, loadLocalPlannerState, saveLocalPlannerState, type PlannerState } from './plannerState'
import { supabase } from './supabase'

type UserStateRow = {
  task_statuses: PlannerState['taskStatuses'] | null
  document_statuses: PlannerState['documentStatuses'] | null
  document_details: PlannerState['documentDetails'] | null
}

export function getStorageMode() {
  return supabase ? 'supabase-ready' : 'localStorage'
}

export async function loadPlannerState(): Promise<PlannerState> {
  if (!supabase) return loadLocalPlannerState()

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (!userId) return loadLocalPlannerState()

  const { data, error } = await supabase
    .from('user_state')
    .select('task_statuses, document_statuses, document_details')
    .eq('user_id', userId)
    .maybeSingle<UserStateRow>()

  if (error || !data) return loadLocalPlannerState()

  return {
    taskStatuses: data.task_statuses ?? emptyPlannerState.taskStatuses,
    documentStatuses: data.document_statuses ?? emptyPlannerState.documentStatuses,
    documentDetails: data.document_details ?? emptyPlannerState.documentDetails,
  }
}

export async function savePlannerState(state: PlannerState): Promise<void> {
  saveLocalPlannerState(state)

  if (!supabase) return

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (!userId) return

  await supabase.from('user_state').upsert({
    user_id: userId,
    task_statuses: state.taskStatuses,
    document_statuses: state.documentStatuses,
    document_details: state.documentDetails,
    updated_at: new Date().toISOString(),
  })
}

export async function syncCurrentLocalStateToSupabase(): Promise<{ ok: boolean; message: string }> {
  if (!supabase) {
    return { ok: false, message: 'Supabase 환경 변수가 없어 localStorage 모드로 실행 중입니다.' }
  }

  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) {
    return { ok: false, message: 'Supabase 동기화를 사용하려면 인증된 사용자가 필요합니다.' }
  }

  await savePlannerState(loadLocalPlannerState())
  return { ok: true, message: '현재 브라우저 저장 상태를 Supabase user_state에 저장했습니다.' }
}

export { docKey }
