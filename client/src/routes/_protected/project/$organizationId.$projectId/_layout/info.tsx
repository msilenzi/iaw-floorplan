import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash } from '@tabler/icons-react'

import { MemberStatus } from '@Common/api'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { DeleteProjectModal } from '@Project/components/DeleteProjectModal'
import { InfoDesigners } from '@Project/components/info/InfoDesigners'
import { InfoGeneralInformation } from '@Project/components/info/InfoGeneralInformation'
import { InfoOtherRequirements } from '@Project/components/info/InfoOtherRequirements'
import { InfoOwner } from '@Project/components/info/InfoOwner'
import { InfoReferences } from '@Project/components/info/InfoReferences'
import { InfoTechnicalDirectors } from '@Project/components/info/InfoTechnicalDirectors'
import { ProjectModalEdit } from '@Project/components/ProjectModal/ProjectModalEdit'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/_layout/info',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useOrganizationQuery()

  const [isEditOpen, { open: openEdit, close: closeEdit }] =
    useDisclosure(false)
  const [isDeleteOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)

  return (
    <>
      <Group justify="end">
        <Button
          variant="filled"
          rightSection={<IconPencil size={16} stroke={2.5} />}
          color="dark.5"
          onClick={openEdit}
        >
          Editar
        </Button>
        {data?.userStatus === MemberStatus.Owner && (
          <Button
            variant="filled"
            rightSection={<IconTrash size={16} stroke={2.5} />}
            color="red"
            onClick={openDelete}
          >
            Eliminar
          </Button>
        )}
      </Group>

      <Flex direction="row" wrap="wrap" gap="lg" pb="lg">
        <Stack flex={1} miw={350} gap="xl">
          <InfoGeneralInformation />
          <InfoReferences />
          <InfoOtherRequirements />
        </Stack>

        <Stack flex={1} miw={350} gap="xl">
          <InfoOwner />
          <InfoDesigners />
          <InfoTechnicalDirectors />
        </Stack>
      </Flex>

      <ProjectModalEdit isOpen={isEditOpen} onClose={closeEdit} />
      {data?.userStatus === MemberStatus.Owner && (
        <DeleteProjectModal isOpen={isDeleteOpen} onClose={closeDelete} />
      )}
    </>
  )
}
