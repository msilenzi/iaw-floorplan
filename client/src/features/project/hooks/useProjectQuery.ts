import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api/useApi'

export const PROJECT_QUERY_KEY = 'projects'

export function useProjectQuery(organizationId?: string, projectId?: string) {
  const { apisAvailable, projectsApi } = useApi()

  return useQuery({
    queryKey: [PROJECT_QUERY_KEY, organizationId, projectId],
    queryFn: async () =>
      (await projectsApi.findOne(projectId!, organizationId!)).data,
    enabled: !!organizationId && !!projectId && apisAvailable,
  })
}
