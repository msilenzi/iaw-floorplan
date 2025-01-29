import type { CurrentResourceContextType } from './CurrentResourceContext'

import { CurrentResourceContext } from './CurrentResourceContext'

type CurrentResourceProviderProps = {
  children: React.ReactNode
} & CurrentResourceContextType

export function CurrentResourceProvider({
  resourceId,
  children,
}: CurrentResourceProviderProps) {
  return (
    <CurrentResourceContext.Provider value={{ resourceId }}>
      {children}
    </CurrentResourceContext.Provider>
  )
}
