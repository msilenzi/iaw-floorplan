import { createContext } from 'react'

export type CurrentProjectContextType = {
  organizationId: string
  projectId: string
}

export const CurrentProjectContext =
  createContext<CurrentProjectContextType | null>(null)
