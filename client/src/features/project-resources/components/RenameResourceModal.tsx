import type { ResourcesFindAllDto } from '@Common/api'

import { Button, Group, Loader, Modal, Stack, TextInput } from '@mantine/core'
import { IconPencil, IconReload } from '@tabler/icons-react'

import { useNotifications } from '@Common/hooks/useNotifications'
import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { getErrorResponse } from '@Common/utils/errorHandling'

import { useProjectResourceUpdateMutation } from '../hooks/useProjectResourceUpdateMutation'
import { useRenameResourceForm } from '../hooks/useRenameResourceForm'

type RenameResourceModalProps = {
  isOpen: boolean
  onClose: () => void
  resource: ResourcesFindAllDto
}

export function RenameResourceModal({
  isOpen,
  onClose,
  resource,
}: RenameResourceModalProps) {
  const { isPending, mutateAsync } = useProjectResourceUpdateMutation(
    resource._id,
  )
  const { showErrorNotification } = useNotifications()

  const form = useRenameResourceForm(resource)

  function handleClose() {
    if (!isPending) onClose()
  }

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await mutateAsync(values)
      form.setInitialValues({
        name: values.name,
      })
      form.reset()
      onClose()
    } catch (error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos renombrar el recurso',
      })
      showErrorNotification(errorResponse)
    }
  })

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Renombrar"
      styles={{ title: { fontWeight: 700 } }}
      closeButtonProps={{
        disabled: isPending,
      }}
    >
      <form onSubmit={handleSubmit} onReset={() => form.reset()}>
        <fieldset
          style={{ margin: 0, padding: 0, border: 'none' }}
          disabled={isPending}
        >
          <Stack gap="lg">
            <TextInput
              label="Nombre"
              placeholder="Nombre del recurso"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Group align="center" justify="end">
              <Button
                type="reset"
                variant="filled"
                rightSection={<IconReload size={16} stroke={2.5} />}
                color="dark.5"
                disabled={isPending || !form.isDirty()}
              >
                Restablecer
              </Button>
              <PrimaryButton
                type="submit"
                rightSection={
                  isPending ? (
                    <Loader size="14" color="dark.2" />
                  ) : (
                    <IconPencil size={16} stroke={2.5} />
                  )
                }
                disabled={isPending || !form.isValid() || !form.isDirty('name')}
              >
                Cambiar nombre
              </PrimaryButton>
            </Group>
          </Stack>
        </fieldset>
      </form>
    </Modal>
  )
}
