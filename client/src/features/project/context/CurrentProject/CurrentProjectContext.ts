import { createContext } from 'react'

export type CurrentProjectContextType = {
  projectId: string
}

export const CurrentProjectContext =
  createContext<CurrentProjectContextType | null>(null)
