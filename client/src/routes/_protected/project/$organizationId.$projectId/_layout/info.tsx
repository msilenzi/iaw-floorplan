import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil } from '@tabler/icons-react'

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
  const [isOpen, { open, close }] = useDisclosure(false)

  return (
    <>
      <Group justify="end">
        <Button
          variant="filled"
          rightSection={<IconPencil size={16} stroke={2.5} />}
          color="dark.5"
          onClick={open}
        >
          Editar
        </Button>
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

      <ProjectModalEdit isOpen={isOpen} onClose={close} />
    </>
  )
}
