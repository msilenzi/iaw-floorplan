import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { getProjectsQueryKey } from '@Project/hooks/useProjectsQuery'

export function getProjectCropsQueryKey(projectId: string) {
  return [...getProjectsQueryKey(projectId), 'crops']
}

export function useProjectCropsQuery() {
  const { projectId } = useCurrentProject()
  const { cropsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectCropsQueryKey(projectId),
    queryFn: async () => (await cropsApi.findAllFromProject(projectId)).data,
    enabled: apisAvailable,
  })
}
