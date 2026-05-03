export function Header() {
  return (
    <nav className="sticky top-0 z-20 border-b border-orange-100 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2 font-black">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white">달</span>
          Dessert Cafe Planner
        </a>
        <div className="hidden gap-5 text-sm font-bold text-stone-600 md:flex">
          <a href="#dashboard">Dashboard</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#tasks">Tasks</a>
          <a href="#documents">Documents</a>
          <a href="#research">Research</a>
          <a href="#menu">Menu</a>
        </div>
      </div>
    </nav>
  )
}
