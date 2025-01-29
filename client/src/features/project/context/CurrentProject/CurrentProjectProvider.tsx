import type { CurrentProjectContextType } from './CurrentProjectContext'

import { CurrentProjectContext } from './CurrentProjectContext'

type CurrentProjectProviderProps = {
  children: React.ReactNode
} & CurrentProjectContextType

export function CurrentProjectProvider({
  projectId,
  children,
}: CurrentProjectProviderProps) {
  return (
    <CurrentProjectContext.Provider value={{ projectId }}>
      {children}
    </CurrentProjectContext.Provider>
  )
}
