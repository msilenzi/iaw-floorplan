import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { MemberStatus } from '@Common/api'
import { useCountdownTimer } from '@Common/hooks/useCountdownTimer'
import { Popconfirm } from '@Common/ui/Popconfirm'
import { DeleteOrganizationModal } from '@Organization/components/DeleteOrganizationModal'
import { OrganizationsModalEdit } from '@Organization/components/OrganizationsModalEdit'
import { useOrganizationExitMutation } from '@Organization/hooks/useOrganizationExitMutation'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const organizationQuery = useOrganizationQuery()
  const userStatus = organizationQuery.data?.userStatus

  if (userStatus === MemberStatus.Owner) {
    return (
      <Stack gap="xl">
        <EditSetting />
        <DeleteSetting />
      </Stack>
    )
  }

  if (userStatus === MemberStatus.Member) {
    return <ExitSetting />
  }

  return null
}

function EditSetting() {
  const [isOpen, { open, close }] = useDisclosure(false)

  return (
    <Group align="center" justify="space-between" wrap="nowrap">
      <Box>
        <Text fw={700}>Editar organización</Text>
        <Text c="dimmed">
          Editar el nombre y el patrón de los expedientes de la organización.
        </Text>
      </Box>
      <Button variant="filled" onClick={open}>
        Editar
      </Button>
      <OrganizationsModalEdit isOpen={isOpen} onClose={close} />
    </Group>
  )
}

function DeleteSetting() {
  const [isOpen, { open, close }] = useDisclosure()

  return (
    <>
      <Group align="center" justify="space-between" wrap="nowrap">
        <Box>
          <Text fw={700}>Eliminar organización</Text>
          <Text c="dimmed">
            Eliminar la organización, incluyendo todos sus proyectos, recursos y
            recortes.
          </Text>
          <Text fw={700} c="dimmed">
            Esta acción no se puede deshacer.
          </Text>
        </Box>
        <Button variant="filled" color="red" onClick={open}>
          Eliminar
        </Button>
      </Group>
      <DeleteOrganizationModal isOpen={isOpen} onClose={close} />
    </>
  )
}

function ExitSetting() {
  const { mutateAsync, isPending } = useOrganizationExitMutation()
  const navigate = useNavigate()

  const { counter, start, reset } = useCountdownTimer(3)

  async function handleExit() {
    await mutateAsync()
    void navigate({ to: '/' })
  }

  return (
    <Group align="center" justify="space-between" wrap="nowrap">
      <Box>
        <Text fw={700}>Salir de la organización</Text>
        <Text c="dimmed">
          Perderás el acceso a esta organización. Si deseas regresar en el
          futuro, deberás enviar una nueva solicitud de ingreso.
        </Text>
      </Box>
      <Popconfirm
        title="¿Seguro que desea salir de la organización?"
        description="Esta acción no se puede deshacer"
        confirmText={counter !== 0 ? `Confirmar (${counter})` : 'Confirmar'}
        innerProps={{
          confirmBtn: {
            color: 'red',
            onClick: () => void handleExit(),
            loading: isPending,
            disabled: counter !== 0,
          },
          popover: { onClose: reset },
        }}
      >
        <Button
          color="red"
          variant="filled"
          loading={isPending}
          onClick={start}
        >
          Salir
        </Button>
      </Popconfirm>
    </Group>
  )
}
