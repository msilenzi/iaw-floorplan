import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { getProjectQueryKey } from '@Project/hooks/useProjectQuery'

export function getResourcesQueryKey(projectId: string) {
  return [...getProjectQueryKey(projectId), 'resources']
}

export function useResourcesQuery() {
  const { projectId } = useCurrentProject()
  const { resourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getResourcesQueryKey(projectId),
    queryFn: async () => (await resourcesApi.findAll(projectId)).data,
    enabled: apisAvailable,
  })
}
