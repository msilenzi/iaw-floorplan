import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getResourcesQueryKey } from './useResourcesQuery'

export function getResourceQueryKey(
  organizationId: string,
  projectId: string,
  resourceId: string,
) {
  return [...getResourcesQueryKey(organizationId, projectId), resourceId]
}

export function useResourceQuery() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()

  const { resourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourceQueryKey(organizationId, projectId, resourceId),
    queryFn: async () => (await resourcesApi.findOne(resourceId)).data,
    enabled: apisAvailable,
    staleTime: 10 * 60 * 1000, // 10 min
    gcTime: 20 * 60 * 1000, // 20 min
  })
}
