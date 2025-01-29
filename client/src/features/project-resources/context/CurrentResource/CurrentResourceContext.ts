import { createContext } from 'react'

export type CurrentResourceContextType = {
  resourceId: string
}

export const CurrentResourceContext =
  createContext<CurrentResourceContextType | null>(null)
