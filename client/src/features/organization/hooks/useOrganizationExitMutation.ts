import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { getOrganizationsQueryKey } from '@MyOrganizations/hooks/useOrganizationsQuery'

import { getOrganizationQueryKey } from './useOrganizationQuery'

export function useOrganizationExitMutation(organizationId: string) {
  const { membersApi: organizationMembersApi } = useApi()
  const queryClient = useQueryClient()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  return useMutation({
    async mutationFn() {
      return await organizationMembersApi.removeMember(organizationId)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getOrganizationsQueryKey(),
      })
      queryClient.removeQueries({
        queryKey: getOrganizationQueryKey(organizationId),
      })
      showSuccessNotification({
        title: 'Saliste de la organización',
        message: 'Has salido correctamente de la organización',
        autoClose: 3_000,
      })
    },
    onError(error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos actualizar la información de la organización',
      })
      showErrorNotification(errorResponse)
    },
  })
}
