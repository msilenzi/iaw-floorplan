import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getProjectResourcesQueryKey } from './useProjectResourcesQuery'

export function getProjectResourceQueryKey(
  organizationId: string,
  projectId: string,
  resourceId: string,
) {
  return [...getProjectResourcesQueryKey(organizationId, projectId), resourceId]
}

export function useProjectResourceQuery(
  organizationId: string,
  projectId: string,
  resourceId: string,
) {
  const { projectsResourcesApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectResourceQueryKey(organizationId, projectId, resourceId),
    queryFn: async () => {
      return (await projectsResourcesApi.findOne(resourceId, projectId)).data
    },
    enabled: apisAvailable,
  })
}
