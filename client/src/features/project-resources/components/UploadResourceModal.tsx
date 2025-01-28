import type { UploadResourceValues } from '../types/UploadResourceForm'

import {
  FileInput,
  Group,
  Loader,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPlus } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { useProjectResourceUploadMutation } from '../hooks/useProjectResourceUploadMutation'

type UploadResourceModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function UploadResourceModal({
  isOpen,
  onClose,
}: UploadResourceModalProps) {
  const { isPending, mutateAsync } = useProjectResourceUploadMutation()

  const form = useForm<UploadResourceValues>({
    initialValues: {
      name: '',
      file: null,
    },
    validate: {
      name: (value) => {
        if (value.length === 0) return 'El nombre es requerido'
        if (value.length < 3) {
          return 'El nombre debe tener al menos 3 caracteres'
        }
        if (value.length > 50) {
          return 'El nombre debe tener como máximo 50 caracteres'
        }
        if (!/^[a-zA-Z0-9_\-\s]+$/.test(value)) {
          return 'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos'
        }
        return null
      },
      file: (value) => {
        if (!value) return 'El archivo es requerido'
        if (value.size > 5 * 1024 * 1024) {
          return 'El archivo no puede pesar más de 5 MiB'
        }
        return null
      },
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await mutateAsync(values)
      form.reset()
      onClose()
      // TODO: mostar notificación de éxito
    } catch (error) {
      // TODO: mostar notificación de error
      console.error('Error al subir el recurso:', error)
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
