import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

export function getOrganizationsQueryKey() {
  return ['organizations']
}

export function useOrganizationsQuery() {
  const { organizationsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getOrganizationsQueryKey(),
    queryFn: async () => (await organizationsApi.findAll()).data,
    enabled: apisAvailable,
    staleTime: 300_000, //  5 min
    gcTime: 600_000, // 10 min
  })
}
