import { useQuery } from '@tanstack/react-query'

import useApi from '@Common/api/useApi'

export default function useOrganizationsQuery() {
  const { organizationsApi, apisAvailable } = useApi()

  const query = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => (await organizationsApi.findAll()).data,
    enabled: apisAvailable,
    staleTime: 300_000, //  5 min
    gcTime: 600_000, // 10 min
  })

  return query
}
