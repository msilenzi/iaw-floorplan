import type { ResourcesFindAllDto } from '@Common/api'

import { Text } from '@mantine/core'

import { DeleteModal } from '@Common/components/DeleteModal'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useResourceDeleteMutation } from '@Resources/hooks/useResourceDeleteMutation'

type DeleteResourceModalProps = {
  isOpen: boolean
  onClose: () => void
  resource: ResourcesFindAllDto
}

export function DeleteResourceModal({
  isOpen,
  onClose,
  resource,
}: DeleteResourceModalProps) {
  const { mutateAsync, isPending } = useResourceDeleteMutation()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  async function handleDelete() {
    try {
      await mutateAsync(resource._id)
      onClose()
      showSuccessNotification({
        title: 'Recurso eliminado correctamente',
        message: 'Se eliminó el recurso y todos sus recortes correctamente',
      })
    } catch (error) {
      const errorResponse = getErrorResponse(error)
      showErrorNotification(errorResponse)
    }
  }

  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar recurso"
      value={resource.name}
      btnText="Eliminar recurso"
      isLoading={isPending}
      onDelete={() => void handleDelete()}
    >
      <Text fz="sm">
        Esta acción eliminará el recurso <strong>{resource.name}</strong> y
        todos sus recortes asociados de forma permanente.
      </Text>
    </DeleteModal>
  )
}
