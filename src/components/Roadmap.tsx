import type { RoadmapStage } from '../types/planner'
import { StatusBadge } from './ui'

export function Roadmap({ stages }: { stages: RoadmapStage[] }) {
  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-bold text-persimmon">Startup Roadmap</p><h2 className="section-title">단계별 카페 창업 로드맵</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.id} className="card">
            <p className="text-xs font-black uppercase tracking-widest text-sesame">{stage.phase}</p>
            <h3 className="mt-2 text-xl font-black">{stage.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">{stage.description}</p>
            <div className="mt-4"><StatusBadge status={stage.status} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}
