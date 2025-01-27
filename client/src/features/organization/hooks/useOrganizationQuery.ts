import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getOrganizationsQueryKey } from '@MyOrganizations/hooks/useOrganizationsQuery'

export function getOrganizationQueryKey(organizationId: string) {
  return [...getOrganizationsQueryKey(), organizationId]
}

export function useOrganizationQuery(organizationId: string) {
  const { organizationsApi, apisAvailable } = useApi()

  return useQuery({
    queryKey: getOrganizationQueryKey(organizationId),
    queryFn: async () => (await organizationsApi.findOne(organizationId)).data,
    enabled: apisAvailable,
  })
}
