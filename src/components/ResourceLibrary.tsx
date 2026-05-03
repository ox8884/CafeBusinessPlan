import { MapPin } from 'lucide-react'
import type { ResourceItem } from '../types/planner'

export function ResourceLibrary({ resources }: { resources: ResourceItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <p className="font-bold text-persimmon">Resource Library</p><h2 className="section-title">공식 기관과 지역 리소스</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <a key={resource.name} href={resource.url} target="_blank" rel="noreferrer" className="card transition hover:-translate-y-1">
            <MapPin className="text-persimmon" />
            <p className="mt-4 text-sm font-bold text-sesame">{resource.type}</p>
            <h3 className="text-xl font-black">{resource.name}</h3>
            <p className="mt-2 text-sm text-stone-600">{resource.notes}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
