import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getProjectQueryKey } from '@Project/hooks/useProjectQuery'

export function getProjectResourcesQueryKey(projectId: string) {
  return [...getProjectQueryKey(projectId), 'resources']
}

export function useProjectResourcesQuery(projectId: string) {
  const { projectsResourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectResourcesQueryKey(projectId),
    queryFn: async () => (await projectsResourcesApi.findAll(projectId)).data,
    enabled: apisAvailable,
  })
}
