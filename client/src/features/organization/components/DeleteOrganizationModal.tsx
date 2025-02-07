import { useNavigate } from '@tanstack/react-router'
import { Text } from '@mantine/core'

import { DeleteModal } from '@Common/components/DeleteModal'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useOrganizationDeleteMutation } from '@Organization/hooks/useOrganizationDeleteMutation'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

type DeleteOrganizationModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function DeleteOrganizationModal({
  isOpen,
  onClose,
}: DeleteOrganizationModalProps) {
  const { data } = useOrganizationQuery()
  const { mutateAsync, isPending } = useOrganizationDeleteMutation()
  const navigate = useNavigate()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  async function handleDelete() {
    if (!data) return

    try {
      await mutateAsync(data._id)
      onClose()
      showSuccessNotification({
        title: 'Organización eliminada correctamente',
        message:
          'Se eliminó la organización y toda su información asociada correctamente',
      })
      void navigate({ to: '/my-organizations' })
    } catch (error) {
      const errorResponse = getErrorResponse(error)
      showErrorNotification(errorResponse)
    }
  }

  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar organización"
      value={data?.name ?? ''}
      btnText="Eliminar organización"
      isLoading={isPending}
      onDelete={() => void handleDelete()}
    >
      <Text fz="sm">
        Esta acción eliminará la organización{' '}
        <strong>{data?.name ?? ''}</strong>, incluyendo todos sus proyectos,
        recursos y recortes, de forma permanente.
      </Text>
    </DeleteModal>
  )
}
