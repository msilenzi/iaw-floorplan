import { useContext } from 'react'

import { CurrentResourceContext } from './CurrentResourceContext'

export function useCurrentResource() {
  const context = useContext(CurrentResourceContext)

  if (!context) {
    throw new Error(
      'useCurrentResource must be used within CurrentResourceProvider',
    )
  }

  return { resourceId: context.resourceId }
}
