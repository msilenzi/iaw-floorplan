import { useNavigate } from '@tanstack/react-router'
import { Text } from '@mantine/core'

import { DeleteModal } from '@Common/components/DeleteModal'
import { useNotifications } from '@Common/hooks/useNotifications'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useDeleteProjectMutation } from '@Project/hooks/useDeleteProjectMutation'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'

type DeleteProjectModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function DeleteProjectModal({
  isOpen,
  onClose,
}: DeleteProjectModalProps) {
  const { organizationId } = useCurrentOrganization()
  const { data } = useProjectQuery()
  const { mutateAsync, isPending } = useDeleteProjectMutation()
  const navigate = useNavigate()

  const { showErrorNotification, showSuccessNotification } = useNotifications()

  async function handleDelete() {
    if (!data) return

    try {
      await mutateAsync(data._id)
      onClose()
      showSuccessNotification({
        title: 'Proyecto eliminado correctamente',
        message: 'Se eliminó el proyecto correctamente',
      })
      void navigate({
        to: '/organization/$organizationId',
        params: { organizationId },
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
      title="Eliminar proyecto"
      value={data?.name ?? data?.record ?? ''}
      btnText="Eliminar proyecto"
      isLoading={isPending}
      onDelete={() => void handleDelete()}
    >
      <Text fz="sm">
        Esta acción eliminará el proyecto <strong>{data?.name ?? ''}</strong> y
        todos sus recursos y recortes de forma permanente.
      </Text>
    </DeleteModal>
  )
}
