import { ExternalLink, FileText, HeartHandshake, Link as LinkIcon } from 'lucide-react'
import type { DocumentItem, Status, VeteranBenefit } from '../types/planner'
import { StatusBadge, StatusSelect } from './ui'

export function DocumentsAndBenefits({
  documents,
  benefits,
  onDocumentStatusChange,
  onDocumentDetailChange,
}: {
  documents: DocumentItem[]
  benefits: VeteranBenefit[]
  onDocumentStatusChange: (name: string, status: Status) => void
  onDocumentDetailChange: (name: string, field: 'officialLink' | 'fileLocation' | 'notes', value: string) => void
}) {
  return (
    <section id="documents" className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:px-8">
      <div>
        <p className="font-bold text-persimmon">Document Tracker</p><h2 className="section-title">준비 문서 목록</h2>
        <div className="mt-8 space-y-3">
          {documents.map((doc) => (
            <div className="rounded-2xl border border-orange-100 bg-white p-4" key={doc.name}>
              <div className="flex justify-between gap-3">
                <div><h3 className="font-black"><FileText className="mr-2 inline text-persimmon" size={18} />{doc.name}</h3><p className="mt-1 text-sm text-stone-600">{doc.purpose}</p><p className="mt-1 text-xs text-stone-500">{doc.source}</p></div>
                <StatusSelect label={`${doc.name} 상태`} value={doc.status} onChange={(status) => onDocumentStatusChange(doc.name, status)} />
              </div>
              <div className="mt-4 grid gap-3">
                <input className="rounded-2xl border border-orange-100 px-3 py-2 text-sm outline-none focus:border-orange-300" placeholder="문서 링크 / 공식 링크" value={doc.officialLink ?? ''} onChange={(event) => onDocumentDetailChange(doc.name, 'officialLink', event.target.value)} />
                <input className="rounded-2xl border border-orange-100 px-3 py-2 text-sm outline-none focus:border-orange-300" placeholder="파일 위치 예: Google Drive/Cafe/Permit.pdf" value={doc.fileLocation ?? ''} onChange={(event) => onDocumentDetailChange(doc.name, 'fileLocation', event.target.value)} />
                <textarea className="min-h-20 rounded-2xl border border-orange-100 px-3 py-2 text-sm outline-none focus:border-orange-300" placeholder="메모" value={doc.notes ?? ''} onChange={(event) => onDocumentDetailChange(doc.name, 'notes', event.target.value)} />
                {doc.officialLink && <a className="inline-flex items-center gap-1 text-sm font-bold text-persimmon" href={doc.officialLink} target="_blank" rel="noreferrer"><LinkIcon size={14} /> 링크 열기</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="veterans">
        <p className="font-bold text-persimmon">Veteran Benefits Tracker</p><h2 className="section-title">Veteran 리소스 확인 보드</h2>
        <div className="mt-8 space-y-3">
          {benefits.map((benefit) => (
            <div className="rounded-2xl border border-orange-100 bg-white p-4" key={benefit.name}>
              <div className="flex justify-between gap-3">
                <div><h3 className="font-black"><HeartHandshake className="mr-2 inline text-persimmon" size={18} />{benefit.name}</h3><p className="mt-1 text-sm text-stone-600">{benefit.description}</p><a className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-persimmon" href={benefit.officialLink} target="_blank" rel="noreferrer">공식 링크 <ExternalLink size={13} /></a></div>
                <StatusBadge status={benefit.status} />
              </div>
              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">{benefit.verification}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
