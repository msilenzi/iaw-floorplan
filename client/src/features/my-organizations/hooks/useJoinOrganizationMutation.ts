import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getOrganizationsQueryKey } from './useOrganizationsQuery'

export function useJoinOrganizationMutation() {
  const { organizationMembersApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(organizationId: string) {
      return await organizationMembersApi.createMember(organizationId)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getOrganizationsQueryKey(),
        exact: true,
      })
    },
  })
}
