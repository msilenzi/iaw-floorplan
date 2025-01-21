import { CurrentProjectContext } from './CurrentProjectContext'
import type { CurrentProjectContextType } from './CurrentProjectContext'

type CurrentProjectProviderProps = {
  children: React.ReactNode
} & CurrentProjectContextType

export function CurrentProjectProvider({
  organizationId,
  projectId,
  children,
}: CurrentProjectProviderProps) {
  return (
    <CurrentProjectContext.Provider
      value={{
        organizationId,
        projectId,
      }}
    >
      {children}
    </CurrentProjectContext.Provider>
  )
}
