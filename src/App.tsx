import { useEffect, useMemo, useState } from 'react'
import { benefits, documents, menu, officialResearch, resources, roadmap, tasks } from './data/plannerData'
import { ContactSection, MenuSection } from './components/CafeSections'
import { Dashboard } from './components/Dashboard'
import { DataSyncRoadmap } from './components/DataSyncRoadmap'
import { DocumentsAndBenefits } from './components/DocumentsAndBenefits'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ImportExportPanel } from './components/ImportExportPanel'
import { LegalNotice } from './components/LegalNotice'
import { OfficialResearch } from './components/OfficialResearch'
import { ResourceLibrary } from './components/ResourceLibrary'
import { Roadmap } from './components/Roadmap'
import { TaskChecklist } from './components/TaskChecklist'
import { ThisMonth } from './components/ThisMonth'
import { docKey, loadPlannerState, savePlannerState } from './lib/plannerRepository'
import { emptyPlannerState, type PlannerState } from './lib/plannerState'
import { isSameMonth, taskSearchText } from './lib/plannerUtils'
import type { StartupTask, Status } from './types/planner'

export default function App() {
  const [plannerState, setPlannerState] = useState<PlannerState>(emptyPlannerState)
  const [stateLoaded, setStateLoaded] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All')
  const [priorityFilter, setPriorityFilter] = useState<'All' | StartupTask['priority']>('All')

  useEffect(() => {
    void loadPlannerState().then((state) => {
      setPlannerState(state)
      setStateLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (stateLoaded) void savePlannerState(plannerState)
  }, [plannerState, stateLoaded])

  const hydratedTasks = useMemo(
    () => tasks.map((task) => ({ ...task, status: plannerState.taskStatuses[task.id] ?? task.status })),
    [plannerState.taskStatuses],
  )

  const hydratedDocuments = useMemo(
    () => documents.map((doc) => ({ ...doc, status: plannerState.documentStatuses[docKey(doc)] ?? doc.status, ...plannerState.documentDetails[docKey(doc)] })),
    [plannerState.documentDetails, plannerState.documentStatuses],
  )

  const now = useMemo(() => new Date(), [])
  const completed = hydratedTasks.filter((task) => task.status === 'Completed').length
  const progress = Math.round(((roadmap.filter((item) => item.status === 'Completed').length + completed) / (roadmap.length + hydratedTasks.length)) * 100)
  const verificationNeeded = benefits.filter((benefit) => benefit.verification.includes('확인 필요')).length
  const thisMonthTasks = hydratedTasks
    .filter((task) => task.status !== 'Completed' && isSameMonth(task.deadline, now))
    .sort((a, b) => a.deadline.localeCompare(b.deadline))

  const filteredTasks = hydratedTasks.filter((task) => {
    const matchesQuery = query.trim() === '' || taskSearchText(task).includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
    return matchesQuery && matchesStatus && matchesPriority
  })

  const updateTaskStatus = (taskId: string, status: Status) => {
    setPlannerState((current) => ({ ...current, taskStatuses: { ...current.taskStatuses, [taskId]: status } }))
  }

  const updateDocumentStatus = (name: string, status: Status) => {
    setPlannerState((current) => ({ ...current, documentStatuses: { ...current.documentStatuses, [name]: status } }))
  }

  const updateDocumentDetail = (name: string, field: 'officialLink' | 'fileLocation' | 'notes', value: string) => {
    setPlannerState((current) => ({
      ...current,
      documentDetails: {
        ...current.documentDetails,
        [name]: { ...current.documentDetails[name], [field]: value },
      },
    }))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_32%),linear-gradient(180deg,#fff8ed,#fff)] text-ink">
      <Header />
      <Hero progress={progress} thisMonthCount={thisMonthTasks.length} />
      <Dashboard progress={progress} completed={completed} thisMonthCount={thisMonthTasks.length} verificationNeeded={verificationNeeded} now={now} />
      <ImportExportPanel state={plannerState} onImport={setPlannerState} />
      <ThisMonth tasks={thisMonthTasks} now={now} />
      <Roadmap stages={roadmap} />
      <TaskChecklist
        tasks={filteredTasks}
        query={query}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onQueryChange={setQuery}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onTaskStatusChange={updateTaskStatus}
      />
      <DocumentsAndBenefits documents={hydratedDocuments} benefits={benefits} onDocumentStatusChange={updateDocumentStatus} onDocumentDetailChange={updateDocumentDetail} />
      <OfficialResearch items={officialResearch} />
      <DataSyncRoadmap />
      <ResourceLibrary resources={resources} />
      <MenuSection menu={menu} />
      <ContactSection thisMonthTasks={thisMonthTasks} />
      <LegalNotice />
    </main>
  )
}
