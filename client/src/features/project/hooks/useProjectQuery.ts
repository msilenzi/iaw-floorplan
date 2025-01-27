import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getProjectsQueryKey } from './useProjectsQuery'

export function getProjectQueryKey(organizationId: string, projectId: string) {
  return [...getProjectsQueryKey(organizationId), projectId]
}

export function useProjectQuery(organizationId: string, projectId: string) {
  const { apisAvailable, projectsApi } = useApi()

  return useQuery({
    queryKey: getProjectQueryKey(organizationId, projectId),
    queryFn: async () => (await projectsApi.findOne(projectId)).data,
    enabled: apisAvailable,
  })
}
