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
    queryFn: async () => {
      return (await membersApi.findAllMembers(organizationId)).data
    },
    enabled: apisAvailable,
  })
}
