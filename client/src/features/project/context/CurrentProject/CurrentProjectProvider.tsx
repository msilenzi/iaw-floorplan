import type { CurrentOrganizationType } from '@Organization/context/CurrentOrganization/CurrentOrganizationContext'
import type { CurrentProjectContextType } from './CurrentProjectContext'

import { CurrentOrganizationProvider } from '@Organization/context/CurrentOrganization'

import { CurrentProjectContext } from './CurrentProjectContext'

type CurrentProjectProviderProps = {
  children: React.ReactNode
} & CurrentProjectContextType &
  CurrentOrganizationType

export function CurrentProjectProvider({
  organizationId,
  projectId,
  children,
}: CurrentProjectProviderProps) {
  return (
    <CurrentOrganizationProvider organizationId={organizationId}>
      <CurrentProjectContext.Provider value={{ projectId }}>
        {children}
      </CurrentProjectContext.Provider>
    </CurrentOrganizationProvider>
  )
}
