import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { getResourceQueryKey } from '@Resources/hooks/useResourceQuery'

export function getResourceCropsQueryKey(
  projectId: string,
  resourceId: string,
) {
  return [...getResourceQueryKey(projectId, resourceId), 'crops']
}

export function useResourceCropsQuery() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { cropsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourceCropsQueryKey(projectId, resourceId),
    queryFn: async () => (await cropsApi.findAllFromResource(resourceId)).data,
    enabled: apisAvailable,
  })
}
