import type { BasicOrganizationDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getOrganizationsQueryKey } from './useOrganizationsQuery'

export function useDeleteRequestMutation() {
  const { organizationMembersApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(organizationId: string) {
      await organizationMembersApi.removeMember(organizationId)
      return organizationId
    },
    onSuccess(deletedId) {
      queryClient.setQueryData(
        getOrganizationsQueryKey(),
        (oldData: BasicOrganizationDto[]) =>
          oldData.filter(({ _id }) => _id !== deletedId),
      )
    },
  })
}
