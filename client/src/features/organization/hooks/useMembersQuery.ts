import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getOrganizationQueryKey } from './useOrganizationQuery'

export function getMembersQueryKey(organizationId: string) {
  return [...getOrganizationQueryKey(organizationId), 'members']
}

export function useMembersQuery(organizationId: string) {
  const { apisAvailable, membersApi } = useApi()

  return useQuery({
    queryKey: getMembersQueryKey(organizationId),
    queryFn: async () => {
      return (await membersApi.findAllMembers(organizationId)).data
    },
    enabled: apisAvailable,
  })
}
