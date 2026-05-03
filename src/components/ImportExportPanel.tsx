import { useRef, useState } from 'react'
import { Download, Upload } from 'lucide-react'
import { downloadPlannerState, parsePlannerExport } from '../lib/plannerImportExport'
import type { PlannerState } from '../lib/plannerState'

export function ImportExportPanel({ state, onImport }: { state: PlannerState; onImport: (state: PlannerState) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)

  const handleImport = async (file: File | undefined) => {
    if (!file) return
    try {
      const text = await file.text()
      const nextState = parsePlannerExport(text)
      onImport(nextState)
      setIsError(false)
      setMessage('백업 JSON을 불러왔습니다. 현재 화면과 localStorage에 반영되었습니다.')
    } catch (error) {
      setIsError(true)
      setMessage(error instanceof Error ? error.message : '백업 파일을 불러오지 못했습니다.')
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="card flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-bold text-persimmon">Backup</p>
          <h2 className="text-2xl font-black text-ink">localStorage 내보내기 / 가져오기</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">체크리스트 상태, 문서 상태, 문서 링크/파일 위치/메모를 JSON으로 백업하거나 다른 브라우저에 가져올 수 있습니다.</p>
          {message && <p className={`mt-3 rounded-2xl px-3 py-2 text-sm font-bold ${isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{message}</p>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white" type="button" onClick={() => { downloadPlannerState(state); setIsError(false); setMessage('현재 저장 상태를 JSON 파일로 내보냈습니다.') }}><Download size={16} /> JSON 내보내기</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-ink" type="button" onClick={() => inputRef.current?.click()}><Upload size={16} /> JSON 가져오기</button>
          <input ref={inputRef} className="hidden" type="file" accept="application/json,.json" onChange={(event) => void handleImport(event.target.files?.[0])} />
        </div>
      </div>
    </section>
  )
}
