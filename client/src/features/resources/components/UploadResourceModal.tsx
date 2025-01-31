import {
  FileInput,
  Group,
  Loader,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { useNotifications } from '@Common/hooks/useNotifications'
import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useUploadResourceForm } from '@Resources/hooks/useUploadResourceForm'

import { useResourceUploadMutation } from '../hooks/useResourceUploadMutation'

type UploadResourceModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function UploadResourceModal({
  isOpen,
  onClose,
}: UploadResourceModalProps) {
  const { isPending, mutateAsync } = useResourceUploadMutation()
  const { showErrorNotification, showSuccessNotification } = useNotifications()

  const form = useUploadResourceForm()

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await mutateAsync(values)
      form.reset()
      onClose()
      showSuccessNotification({
        title: 'Recurso subido con éxito',
        message: `El recurso ${values.name} fue subido correctamente`,
      })
    } catch (error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos subir el recurso',
      })
      showErrorNotification(errorResponse)
    }
  })

  function handleClose() {
    if (!isPending) onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Subir recurso"
      styles={{ title: { fontWeight: 700 } }}
      closeButtonProps={{ disabled: isPending }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{ margin: 0, padding: 0, border: 'none' }}
          disabled={isPending}
        >
          <Stack gap="md">
            <TextInput
              label="Nombre"
              placeholder="Nombre del recurso"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <FileInput
              label="Recurso"
              description="Subí una imagen o PDF de hasta 5 MiB"
              placeholder="Hace click acá para elegir un archivo"
              withAsterisk
              clearable
              accept="image/png,image/jpeg,application/pdf"
              key={form.key('file')}
              {...form.getInputProps('file')}
            />

            <Group justify="end" mt="xs">
              <PrimaryButton
                type="submit"
                rightSection={
                  isPending ? (
                    <Loader size="14" color="dark.2" />
                  ) : (
                    <IconPlus size={16} stroke={3} />
                  )
                }
                disabled={isPending}
              >
                {isPending ? 'Subiendo recurso' : 'Subir recurso'}
              </PrimaryButton>
            </Group>
          </Stack>
        </fieldset>
      </form>
    </Modal>
  )
}
