import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api/useApi'

export const PROJECTS_QUERY_KEY = 'projects'

export function useProjectsQuery(organizationId: string) {
  const { projectsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, organizationId],
    queryFn: async () => (await projectsApi.findAll(organizationId)).data,
    enabled: apisAvailable,
  })
}
