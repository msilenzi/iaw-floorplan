import { isAxiosError } from 'axios'

import { Alert, Group, Loader, Modal, TextInput } from '@mantine/core'

import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react'

import { isServerException } from '@Common/api/types/ServerException'
import useNotifications from '@Common/hooks/useNotifications'
import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { useJoinOrganizationMutation } from '@MyOrganizations/hooks/useJoinOrganizationMutation'
import useJointOrganizationForm from '@MyOrganizations/hooks/useJointOrganizationForm'

type MyOrganizationsModalJoinProps = {
  isOpen: boolean
  onClose: () => void
}

export function MyOrganizationsModalJoin({
  isOpen,
  onClose,
}: MyOrganizationsModalJoinProps) {
  const { isPending, mutateAsync, isError, error, reset } =
    useJoinOrganizationMutation()

  const { showSuccessNotification } = useNotifications()

  const form = useJointOrganizationForm()

  function handleClose() {
    if (!isPending) onClose()
  }

  const handleSubmit = form.onSubmit(async ({ organizationId }) => {
    await mutateAsync(organizationId)
    form.reset()
    onClose()
    showSuccessNotification({
      title: 'Solicitud enviada con éxito',
      message:
        'Se ha enviado una solicitud para unirte a la organización. Podrás acceder a ella cuando el administrador la acepte',
      autoClose: 10_000,
    })
  })

  const handleInputChange = (value: string) => {
    form.setFieldValue('organizationId', value)
    if (isError) reset() // Limpiar errores
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Unirse a una organización"
      styles={{ title: { fontWeight: 700 } }}
      closeButtonProps={{
        disabled: isPending,
      }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{ margin: 0, padding: 0, border: 'none' }}
          disabled={isPending}
        >
          <TextInput
            label="Código"
            placeholder="Código de la organización"
            withAsterisk
            key={form.key('organizationId')}
            {...form.getInputProps('organizationId')}
            onChange={(e) => handleInputChange(e.currentTarget.value)}
            mb="lg"
          />

          <Group justify="end">
            <PrimaryButton
              type="submit"
              rightSection={
                isPending ? (
                  <Loader size="14" color="dark.2" />
                ) : (
                  <IconArrowRight size={16} stroke={3} />
                )
              }
              disabled={isPending}
              mb="lg"
            >
              {isPending ? 'Uniéndose...' : 'Unirse'}
            </PrimaryButton>
          </Group>
        </fieldset>
      </form>
      <AlertError isPending={isPending} isError={isError} error={error} />
    </Modal>
  )
}

type AlertErrorProps = {
  isPending: boolean
  isError: boolean
  error: Error | null
}

function AlertError({ error, isError, isPending }: AlertErrorProps) {
  if (isPending || !isError) return null

  let title: string = 'Error de conexión'
  let description: string = 'No pudimos establecer la conexión con el servidor'

  if (isAxiosError(error) && isServerException(error.response?.data)) {
    const e = error.response.data
    if (e.statusCode >= 500) {
      title = 'Algo salió mal'
      description = 'No pudimos acceder a la organización'
    } else if (e.statusCode >= 400) {
      title = 'No puedes unirte a esta organización'
      description = e.message
    }
  }

  return (
    <Alert variant="light" color="red" icon={<IconInfoCircle />} title={title}>
      {description}
    </Alert>
  )
}
