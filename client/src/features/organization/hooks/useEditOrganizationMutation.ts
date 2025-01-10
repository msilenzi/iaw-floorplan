import { isAxiosError } from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UpdateOrganizationDto } from '@Common/api/generated'
import { isServerException } from '@Common/api/types/ServerException'
import { useApi } from '@Common/api/useApi'
import useNotifications from '@Common/hooks/useNotifications'

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
      let title = 'Error de conexión'
      let message = 'No pudimos establecer la conexión con el servidor'

      if (isAxiosError(error) && isServerException(error.response?.data)) {
        const e = error.response.data
        if (e.statusCode >= 500) {
          title = '¡Ups! Algo salió mal'
          message =
            'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
        } else if (e.statusCode >= 400) {
          title = 'No pudimos actualizar la información de la organización'
          message = `${e.message}`
        }
      }
      showErrorNotification({ title, message })
    },
  })
}
