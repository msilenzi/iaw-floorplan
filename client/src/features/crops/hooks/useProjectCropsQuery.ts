import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { getProjectQueryKey } from '@Project/hooks/useProjectQuery'

export function getProjectCropsQueryKey(
  organizationId: string,
  projectId: string,
) {
  return [...getProjectQueryKey(organizationId, projectId), 'crops']
}

export function useProjectCropsQuery() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { cropsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectCropsQueryKey(organizationId, projectId),
    queryFn: async () => (await cropsApi.findAllFromProject(projectId)).data,
    enabled: apisAvailable,
    staleTime: 10 * 60 * 1000, // 3 min
    gcTime: 20 * 60 * 1000, // 10 min
  })
}
