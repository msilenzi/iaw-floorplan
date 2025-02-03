import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getResourcesQueryKey } from './useResourcesQuery'

export function getResourceQueryKey(projectId: string, resourceId: string) {
  return [...getResourcesQueryKey(projectId), resourceId]
}

export function useResourceQuery() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()

  const { resourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourceQueryKey(projectId, resourceId),
    queryFn: async () => {
      return (await resourcesApi.findOne(resourceId)).data
    },
    enabled: apisAvailable,
  })
}
