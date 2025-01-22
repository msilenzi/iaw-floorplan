import { useContext } from 'react'

import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'

import { CurrentProjectContext } from './CurrentProjectContext'

export function useCurrentProject() {
  const context = useContext(CurrentProjectContext)
  const { organizationId } = useCurrentOrganization()

  if (!context) {
    throw new Error(
      'useCurrentProject must be used within CurrentProjectProvider',
    )
  }

  return {
    organizationId,
    projectId: context.projectId,
  }
}
