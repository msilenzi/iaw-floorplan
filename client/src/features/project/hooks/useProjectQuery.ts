import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'

import { getProjectsQueryKey } from './useProjectsQuery'

export function getProjectQueryKey(organizationId: string, projectId: string) {
  return [...getProjectsQueryKey(organizationId), projectId]
}

export function useProjectQuery() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { apisAvailable, projectsApi } = useApi()

  return useQuery({
    queryKey: getProjectQueryKey(organizationId, projectId),
    queryFn: async () => (await projectsApi.findOne(projectId)).data,
    enabled: apisAvailable,
    staleTime: 15 * 60 * 1000, // 15 min
    gcTime: 30 * 60 * 1000, // 30 min
  })
}
