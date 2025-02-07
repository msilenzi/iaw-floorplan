import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'

import { getOrganizationQueryKey } from './useOrganizationQuery'

export function getMembersQueryKey(organizationId: string) {
  return [...getOrganizationQueryKey(organizationId), 'members']
}

export function useMembersQuery() {
  const { organizationId } = useCurrentOrganization()
  const { apisAvailable, membersApi } = useApi()

  return useQuery({
    queryKey: getMembersQueryKey(organizationId),
    queryFn: async () => (await membersApi.findAllMembers(organizationId)).data,
    enabled: apisAvailable,
    staleTime: 15 * 60 * 1000, // 15 min
    gcTime: 30 * 60 * 1000, // 30 min
  })
}
