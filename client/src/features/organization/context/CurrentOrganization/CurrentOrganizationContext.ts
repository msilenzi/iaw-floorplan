import { createContext } from 'react'

export type CurrentOrganizationType = {
  organizationId: string
}

export const CurrentOrganizationContext =
  createContext<CurrentOrganizationType | null>(null)
