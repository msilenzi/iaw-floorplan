import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getProjectResourcesQueryKey } from './useProjectResourcesQuery'

export function getProjectResourceQueryKey(
  projectId: string,
  resourceId: string,
) {
  return [...getProjectResourcesQueryKey(projectId), resourceId]
}

export function useProjectResourceQuery(projectId: string, resourceId: string) {
  const { resourcesApi: projectsResourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectResourceQueryKey(projectId, resourceId),
    queryFn: async () => {
      return (await projectsResourcesApi.findOne(resourceId, projectId)).data
    },
    enabled: apisAvailable,
  })
}
