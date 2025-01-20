import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'

import { ORGANIZATIONS_QUERY_KEY } from '@MyOrganizations/hooks/useOrganizationsQuery'

export function useOrganizationExitMutation(organizationId: string) {
  const { organizationMembersApi } = useApi()
  const queryClient = useQueryClient()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  return useMutation({
    async mutationFn() {
      return await organizationMembersApi.removeMember(organizationId)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: [ORGANIZATIONS_QUERY_KEY],
      })
      void queryClient.removeQueries({
        queryKey: [ORGANIZATIONS_QUERY_KEY, organizationId],
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
