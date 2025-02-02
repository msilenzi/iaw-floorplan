import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getResourceQueryKey } from '@Resources/hooks/useResourceQuery'

export function getResourceCropsQueryKey(
  projectId: string,
  resourceId: string,
) {
  return [...getResourceQueryKey(projectId, resourceId), 'crops']
}

export function useResourceCropsQuery(projectId: string, resourceId: string) {
  const { cropsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourceCropsQueryKey(projectId, resourceId),
    queryFn: async () => (await cropsApi.findAllFromResource(resourceId)).data,
    enabled: apisAvailable,
  })
}
