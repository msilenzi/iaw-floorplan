import { useContext } from 'react'

import { CurrentOrganizationContext } from './CurrentOrganizationContext'

export function useCurrentOrganization() {
  const context = useContext(CurrentOrganizationContext)
  if (!context) {
    throw new Error(
      'useCurrentOrganization must be used within CurrentOrganizationProvider',
    )
  }
  return context
}
