import { Text } from '@mantine/core'

import { DeleteModal } from '@Common/components/DeleteModal'

type DeleteResourceModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function DeleteResourceModal({
  isOpen,
  onClose,
}: DeleteResourceModalProps) {
  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar recurso"
      value="un recurso"
      btnText="Eliminar recurso"
      isLoading={false}
      onDelete={() => console.log('delete')}
    >
      <Text fz="sm">
        Esta acción eliminará el recurso &apos;....&apos; y todos sus recortes
        asociados de forma permanente.
      </Text>
    </DeleteModal>
  )
}
