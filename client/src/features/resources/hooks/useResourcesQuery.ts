import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { getProjectQueryKey } from '@Project/hooks/useProjectQuery'

export function getResourcesQueryKey(
  organizationId: string,
  projectId: string,
) {
  return [...getProjectQueryKey(organizationId, projectId), 'resources']
}

export function useResourcesQuery() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourcesQueryKey(organizationId, projectId),
    queryFn: async () => (await resourcesApi.findAll(projectId)).data,
    enabled: apisAvailable,
    staleTime: 10 * 60 * 1000, // 10 min
    gcTime: 20 * 60 * 1000, // 20 min
  })
}
