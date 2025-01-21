import {
  CurrentOrganizationContext,
  type CurrentOrganizationType,
} from './CurrentOrganizationContext'

type CurrentOrganizationProviderProps = {
  children: React.ReactNode
} & CurrentOrganizationType

export function CurrentOrganizationProvider({
  organizationId,
  children,
}: CurrentOrganizationProviderProps) {
  return (
    <CurrentOrganizationContext.Provider value={{ organizationId }}>
      {children}
    </CurrentOrganizationContext.Provider>
  )
}