import { Store } from 'lucide-react'

export function Hero({ progress, thisMonthCount }: { progress: number; thisMonthCount: number }) {
  return (
    <section id="top" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_.9fr] md:px-8 md:py-24">
      <div>
        <span className="badge bg-white text-persimmon shadow-sm">Celina, Texas · Korean Dessert Cafe Startup</span>
        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
          VA Veteran 부부를 위한<br />디저트 카페 창업 플래너
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          한국식 디저트와 커피 경험을 바탕으로 Celina와 인근 커뮤니티에 따뜻한 카페를 준비하는 과정을 로드맵, 체크리스트, 문서, Veteran 혜택, 공식 링크로 관리하는 MVP 웹앱입니다.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a className="rounded-full bg-ink px-6 py-3 text-center font-bold text-white shadow-soft" href="#dashboard">준비 현황 보기</a>
          <a className="rounded-full border border-orange-200 bg-white px-6 py-3 text-center font-bold text-ink" href="#tasks">체크리스트 관리</a>
        </div>
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>중요 안내:</strong> 법률, 세금, 허가, 식품 규정, Veteran 혜택은 실제 적용 여부와 조건이 자주 바뀔 수 있습니다. 이 앱의 정보는 준비용 체크리스트이며 반드시 공식 기관 또는 전문가에게 확인해야 합니다.
        </div>
      </div>
      <div className="card relative min-h-[420px] overflow-hidden bg-white">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-200 blur-3xl" />
        <div className="relative">
          <div className="rounded-[2rem] bg-gradient-to-br from-orange-100 to-amber-50 p-6">
            <Store className="text-persimmon" size={34} />
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-stone-500">Concept</p>
            <h2 className="mt-2 text-3xl font-black">Warm Korean Dessert House</h2>
            <p className="mt-4 text-stone-700">약과 타르트, 인절미 라떼, 과일 타르트, 호두과자를 미국 로컬 고객도 이해하기 쉬운 메뉴와 스토리로 소개합니다.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-ink p-5 text-white"><p className="text-3xl font-black">{progress}%</p><p className="text-sm text-stone-300">MVP progress</p></div>
            <div className="rounded-3xl bg-orange-500 p-5 text-white"><p className="text-3xl font-black">{thisMonthCount}</p><p className="text-sm text-orange-50">This month tasks</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
