import { useQuery } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getOrganizationQueryKey } from './useOrganizationQuery'

export function getOrganizationMembersQueryKey(organizationId: string) {
  return [...getOrganizationQueryKey(organizationId), 'members']
}

export function useOrganizationMembersQuery(organizationId: string) {
  const { apisAvailable, membersApi: organizationMembersApi } = useApi()

  return useQuery({
    queryKey: getOrganizationMembersQueryKey(organizationId),
    queryFn: async () => {
      return (await organizationMembersApi.findAllMembers(organizationId)).data
    },
    enabled: apisAvailable,
  })
}
