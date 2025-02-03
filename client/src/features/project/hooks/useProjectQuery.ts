import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'

export function getProjectQueryKey(projectId: string) {
  return ['project', projectId]
}

export function useProjectQuery() {
  const { projectId } = useCurrentProject()
  const { apisAvailable, projectsApi } = useApi()

  return useQuery({
    queryKey: getProjectQueryKey(projectId),
    queryFn: async () => (await projectsApi.findOne(projectId)).data,
    enabled: apisAvailable,
  })
}
