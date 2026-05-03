import { AlertTriangle } from 'lucide-react'

export function LegalNotice() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <AlertTriangle className="mb-3" />
        <h2 className="text-xl font-black">법률/세금/허가 확인 항목</h2>
        <p className="mt-3 leading-7">LLC 설립, EIN, Texas sales tax, 식품 영업 허가, Cottage Food Law 적용 여부, 상업용 주방, zoning, lease, 보험, 직원 고용 규정, VA/Disabled Veteran 혜택은 모두 공식 기관과 전문가에게 최신 조건을 확인해야 합니다.</p>
      </div>
    </section>
  )
}
