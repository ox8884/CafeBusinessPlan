export type Status = 'Not Started' | 'In Progress' | 'Completed' | 'Need Help'
export type Priority = 'High' | 'Medium' | 'Low'
export type VerificationStatus = 'Verified' | 'Needs Review' | 'Blocked'

export interface RoadmapStage {
  id: string
  title: string
  description: string
  phase: string
  status: Status
}

export interface StartupTask {
  id: string
  title: string
  description: string
  priority: Priority
  estimatedDuration: string
  estimatedCost: string
  owner: string
  status: Status
  deadline: string
  links: string[]
  notes: string
}

export interface DocumentItem {
  name: string
  purpose: string
  status: Status
  source: string
  officialLink?: string
  fileLocation?: string
  notes?: string
}

export interface VeteranBenefit {
  name: string
  category: string
  description: string
  status: Status
  verification: string
  officialLink: string
}

export interface ResourceItem {
  name: string
  type: string
  url: string
  notes: string
}

export interface OfficialResearchItem {
  name: string
  agency: 'Celina' | 'Collin County' | 'Texas' | 'Federal' | 'Veteran'
  topic: string
  url: string
  verificationStatus: VerificationStatus
  lastChecked: string
  notes: string
}

export interface MenuItem {
  name: string
  koreanName: string
  description: string
  price: string
}
