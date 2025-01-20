import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

export const ORGANIZATIONS_QUERY_KEY = 'organizations'

export function useOrganizationsQuery() {
  const { organizationsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: [ORGANIZATIONS_QUERY_KEY],
    queryFn: async () => (await organizationsApi.findAll()).data,
    enabled: apisAvailable,
    staleTime: 300_000, //  5 min
    gcTime: 600_000, // 10 min
  })
}
