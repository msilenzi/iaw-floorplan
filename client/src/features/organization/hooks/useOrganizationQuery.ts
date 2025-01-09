import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api/useApi'

export const ORGANIZATION_QUERY_KEY = 'organizations'

export function useOrganizationQuery(organizationId: string) {
  const { organizationsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: [ORGANIZATION_QUERY_KEY, organizationId],
    queryFn: async () => (await organizationsApi.findOne(organizationId)).data,
    enabled: apisAvailable,
  })
}
