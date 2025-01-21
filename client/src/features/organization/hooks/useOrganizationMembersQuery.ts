import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { ORGANIZATION_QUERY_KEY } from './useOrganizationQuery'

export function useOrganizationMembersQuery(organizationId: string) {
  const { apisAvailable, organizationMembersApi } = useApi()

  return useQuery({
    queryKey: [ORGANIZATION_QUERY_KEY, organizationId, 'members'],
    queryFn: async () => {
      return (await organizationMembersApi.findAllMembers(organizationId)).data
    },
    enabled: apisAvailable,
  })
}
