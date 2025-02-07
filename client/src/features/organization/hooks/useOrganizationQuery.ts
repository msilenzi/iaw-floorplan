import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getOrganizationsQueryKey } from '@MyOrganizations/hooks/useOrganizationsQuery'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'

export function getOrganizationQueryKey(organizationId: string) {
  return [...getOrganizationsQueryKey(), organizationId]
}

export function useOrganizationQuery() {
  const { organizationId } = useCurrentOrganization()
  const { organizationsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getOrganizationQueryKey(organizationId),
    queryFn: async () => (await organizationsApi.findOne(organizationId)).data,
    enabled: apisAvailable,
    staleTime: 15 * 60 * 1000, // 15 min
    gcTime: 30 * 60 * 1000, // 30 min
  })
}
