import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getResourcesQueryKey } from './useResourcesQuery'

export function getResourceQueryKey(projectId: string, resourceId: string) {
  return [...getResourcesQueryKey(projectId), resourceId]
}

export function useResourceQuery(projectId: string, resourceId: string) {
  const { resourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourceQueryKey(projectId, resourceId),
    queryFn: async () => {
      return (await resourcesApi.findOne(resourceId, projectId)).data
    },
    enabled: apisAvailable,
  })
}
