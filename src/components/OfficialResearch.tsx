import { ExternalLink } from 'lucide-react'
import type { OfficialResearchItem } from '../types/planner'

export function OfficialResearch({ items }: { items: OfficialResearchItem[] }) {
  return (
    <section id="research" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-bold text-persimmon">Official Link Research</p>
      <h2 className="section-title">Celina / Collin County / Texas 공식 링크 검증</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
        공식 링크는 주기 검증 스크립트로 다시 확인할 수 있습니다. Verified는 URL 접속 확인, Needs Review는 링크는 있으나 로그인/세부 조건/담당 부서 확인이 더 필요한 항목입니다.
      </p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-soft">
        <div className="grid hidden bg-orange-50 px-4 py-3 text-xs font-black uppercase tracking-wider text-stone-500 md:grid md:grid-cols-[1fr_.7fr_.7fr_.6fr]">
          <span>기관/페이지</span><span>주제</span><span>상태</span><span>확인일</span>
        </div>
        {items.map((item) => (
          <div className="grid gap-3 border-t border-orange-100 px-4 py-4 md:grid-cols-[1fr_.7fr_.7fr_.6fr]" key={item.url}>
            <div>
              <p className="font-black">{item.name}</p>
              <p className="text-xs font-bold text-sesame">{item.agency}</p>
              <a className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-persimmon" href={item.url} target="_blank" rel="noreferrer">공식 링크 <ExternalLink size={13} /></a>
            </div>
            <p className="text-sm text-stone-700">{item.topic}</p>
            <div>
              <span className={`badge ${item.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>{item.verificationStatus}</span>
              <p className="mt-2 text-xs leading-5 text-stone-500">{item.notes}</p>
            </div>
            <p className="text-sm font-bold text-stone-600">{item.lastChecked}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
