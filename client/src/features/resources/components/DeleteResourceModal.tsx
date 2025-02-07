import type { ResourcesFindAllDto } from '@Common/api'

import { Text } from '@mantine/core'

import { DeleteModal } from '@Common/components/DeleteModal'

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
  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar recurso"
      value={resource.name}
      btnText="Eliminar recurso"
      isLoading={false}
      onDelete={() => console.log('delete')}
    >
      <Text fz="sm">
        Esta acción eliminará el recurso <strong>{resource.name}</strong> y
        todos sus recortes asociados de forma permanente.
      </Text>
    </DeleteModal>
  )
}
