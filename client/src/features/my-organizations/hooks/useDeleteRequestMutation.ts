import { useMutation, useQueryClient } from '@tanstack/react-query'

import { BasicOrganizationDto } from '@Common/api/generated'
import { useApi } from '@Common/api/useApi'

import { ORGANIZATIONS_QUERY_KEY } from './useOrganizationsQuery'

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
        [ORGANIZATIONS_QUERY_KEY],
        (oldData: BasicOrganizationDto[]) =>
          oldData.filter(({ _id }) => _id !== deletedId),
      )
    },
  })
}
