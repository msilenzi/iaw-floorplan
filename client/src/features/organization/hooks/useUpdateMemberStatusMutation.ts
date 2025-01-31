import type { MemberStatus } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'

import { getMembersQueryKey } from './useMembersQuery'

type UpdateOptions = {
  organizationId: string
  memberId: string
  newStatus: MemberStatus
}

export function useUpdateMemberStatusMutation() {
  const { membersApi } = useApi()
  const queryClient = useQueryClient()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  return useMutation({
    async mutationFn({ organizationId, memberId, newStatus }: UpdateOptions) {
      return await membersApi.updateMemberStatus(memberId, organizationId, {
        newMemberStatus: newStatus,
      })
    },
    onSuccess(_, { organizationId }) {
      void queryClient.invalidateQueries({
        queryKey: getMembersQueryKey(organizationId),
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
