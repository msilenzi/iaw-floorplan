import { isAxiosError } from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { MemberStatus } from '@Common/api/generated'
import { isServerException } from '@Common/api/types/ServerException'
import { useApi } from '@Common/api/useApi'
import { useNotifications } from '@Common/hooks/useNotifications'

import { ORGANIZATION_QUERY_KEY } from './useOrganizationQuery'

type UpdateOptions = {
  organizationId: string
  memberId: string
  newStatus: MemberStatus
}

export function useUpdateMemberStatusMutation() {
  const { organizationMembersApi } = useApi()
  const queryClient = useQueryClient()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  return useMutation({
    async mutationFn({ organizationId, memberId, newStatus }: UpdateOptions) {
      return await organizationMembersApi.updateMemberStatus(
        memberId,
        organizationId,
        { newMemberStatus: newStatus },
      )
    },
    onSuccess(_, { organizationId }) {
      void queryClient.invalidateQueries({
        queryKey: [ORGANIZATION_QUERY_KEY, organizationId, 'members'],
      })
      showSuccessNotification({
        title: 'Miembro actualizado con éxito',
        message: 'El estado del miembro ha sido actualizado exitosamente',
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
          title = 'No pudimos actualizar el estado del miembro'
          message = `${e.message}`
        }
      }
      showErrorNotification({ title, message })
    },
  })
}
