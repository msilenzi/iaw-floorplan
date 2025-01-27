import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getOrganizationQueryKey } from '@Organization/hooks/useOrganizationQuery'

export function getProjectsQueryKey(organizationId: string) {
  return [...getOrganizationQueryKey(organizationId), 'projects']
}

export function useProjectsQuery(organizationId: string) {
  const { projectsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getProjectsQueryKey(organizationId),
    queryFn: async () => (await projectsApi.findAll(organizationId)).data,
    enabled: apisAvailable,
  })
}
