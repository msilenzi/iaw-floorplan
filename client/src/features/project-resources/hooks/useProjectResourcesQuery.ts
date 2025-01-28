import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getProjectQueryKey } from '@Project/hooks/useProjectQuery'

export function getProjectResourcesQueryKey(
  organizationId: string,
  projectId: string,
) {
  return [...getProjectQueryKey(organizationId, projectId), 'projects']
}

export function useProjectResourcesQuery(
  organizationId: string,
  projectId: string,
) {
  const { projectsResourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectResourcesQueryKey(organizationId, projectId),
    queryFn: async () => (await projectsResourcesApi.findAll(projectId)).data,
    enabled: apisAvailable,
  })
}
