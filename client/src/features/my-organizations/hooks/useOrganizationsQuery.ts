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
    staleTime: 15 * 60 * 1000, // 15 min
    gcTime: 30 * 60 * 1000, // 30 min
  })
}
