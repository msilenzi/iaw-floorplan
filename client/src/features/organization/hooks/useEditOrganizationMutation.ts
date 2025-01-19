import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UpdateOrganizationDto } from '@Common/api/generated'
import { useApi } from '@Common/api/useApi'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'

import { ORGANIZATIONS_QUERY_KEY } from '@MyOrganizations/hooks/useOrganizationsQuery'

export function useEditOrganizationMutation(organizationId: string) {
  const { organizationsApi } = useApi()
  const queryClient = useQueryClient()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  return useMutation({
    async mutationFn(data: UpdateOrganizationDto) {
      return await organizationsApi.update(organizationId, data)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: [ORGANIZATIONS_QUERY_KEY],
        exact: true,
      })
      void queryClient.invalidateQueries({
        queryKey: [ORGANIZATIONS_QUERY_KEY, organizationId],
        exact: true,
      })
      showSuccessNotification({
        title: 'Organización editada con éxito',
        message:
          'La información de la organización ha sido actualizada correctamente',
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
