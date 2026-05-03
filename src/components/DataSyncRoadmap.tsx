import { Database } from 'lucide-react'
import { getStorageMode } from '../lib/plannerRepository'

export function DataSyncRoadmap() {
  const mode = getStorageMode()

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-bold text-persimmon">Data Sync Roadmap</p>
      <h2 className="section-title">SQLite / Supabase 연동 준비</h2>
      <p className="mt-3 text-sm font-bold text-stone-500">현재 저장 모드: {mode === 'supabase-ready' ? 'Supabase 설정 감지됨 + 로그인 시 동기화 가능' : 'localStorage'}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="card"><Database className="text-persimmon" /><h3 className="mt-3 text-xl font-black">현재</h3><p className="mt-2 text-sm leading-6 text-stone-600">프론트엔드 MVP는 localStorage로 상태, 문서 링크, 파일 위치를 저장합니다. 빠르고 무료이며 개인용으로 충분합니다.</p></div>
        <div className="card"><Database className="text-persimmon" /><h3 className="mt-3 text-xl font-black">SQLite 후보</h3><p className="mt-2 text-sm leading-6 text-stone-600">로컬/서버 단일 파일 DB로 백업이 쉽습니다. 나중에 Express/Fastify API를 붙이면 좋습니다.</p></div>
        <div className="card"><Database className="text-persimmon" /><h3 className="mt-3 text-xl font-black">Supabase 후보</h3><p className="mt-2 text-sm leading-6 text-stone-600">환경 변수를 넣고 로그인 기능을 붙이면 Postgres + RLS 기반으로 여러 기기 동기화가 가능합니다.</p></div>
      </div>
    </section>
  )
}
