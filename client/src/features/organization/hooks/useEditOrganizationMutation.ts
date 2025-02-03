import type { UpdateOrganizationDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { getOrganizationsQueryKey } from '@MyOrganizations/hooks/useOrganizationsQuery'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'

import { getOrganizationQueryKey } from './useOrganizationQuery'

export function useEditOrganizationMutation() {
  const { organizationId } = useCurrentOrganization()
  const { organizationsApi } = useApi()
  const queryClient = useQueryClient()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  return useMutation({
    async mutationFn(data: UpdateOrganizationDto) {
      return await organizationsApi.update(organizationId, data)
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getOrganizationsQueryKey(),
        exact: true,
      })
      void queryClient.invalidateQueries({
        queryKey: getOrganizationQueryKey(organizationId),
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
