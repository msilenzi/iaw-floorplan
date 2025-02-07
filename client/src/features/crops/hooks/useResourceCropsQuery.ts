import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { getResourceQueryKey } from '@Resources/hooks/useResourceQuery'

export function getResourceCropsQueryKey(
  organizationId: string,
  projectId: string,
  resourceId: string,
) {
  return [
    ...getResourceQueryKey(organizationId, projectId, resourceId),
    'crops',
  ]
}

export function useResourceCropsQuery() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { cropsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourceCropsQueryKey(organizationId, projectId, resourceId),
    queryFn: async () => (await cropsApi.findAllFromResource(resourceId)).data,
    enabled: apisAvailable,
    staleTime: 10 * 60 * 1000, // 3 min
    gcTime: 20 * 60 * 1000, // 10 min
  })
}
