import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getOrganizationsQueryKey } from './useOrganizationsQuery'

export function useJoinOrganizationMutation() {
  const { membersApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(organizationId: string) {
      return await membersApi.createMember(organizationId)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getOrganizationsQueryKey(),
        exact: true,
      })
    },
  })
}
