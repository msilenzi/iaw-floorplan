import { isAxiosError } from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { isServerException } from '@Common/api/types/ServerException'
import { useApi } from '@Common/api/useApi'
import useNotifications from '@Common/hooks/useNotifications'

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
