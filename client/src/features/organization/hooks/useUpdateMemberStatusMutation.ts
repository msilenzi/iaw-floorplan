import { useMutation, useQueryClient } from '@tanstack/react-query'

import { MemberStatus } from '@Common/api/generated'
import { useApi } from '@Common/api/useApi'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'

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
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos actualizar el estado del miembro',
      })
      showErrorNotification(errorResponse)
    },
  })
}
