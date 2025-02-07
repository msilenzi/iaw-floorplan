import type { BasicOrganizationDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { getOrganizationsQueryKey } from '@MyOrganizations/hooks/useOrganizationsQuery'

import { getOrganizationQueryKey } from './useOrganizationQuery'

export function useOrganizationDeleteMutation() {
  const { organizationsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(organizationId: string) {
      await organizationsApi.remove(organizationId)
      return organizationId
    },
    onSuccess(deletedId) {
      queryClient.removeQueries({
        queryKey: getOrganizationQueryKey(deletedId),
      })

      if (queryClient.getQueryData(getOrganizationsQueryKey()) != null) {
        queryClient.setQueryData(
          getOrganizationsQueryKey(),
          (oldData: BasicOrganizationDto[]) =>
            oldData.filter(({ _id }) => _id !== deletedId),
        )
      }
    },
  })
}
