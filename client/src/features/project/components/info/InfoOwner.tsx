import { Box, Group, Stack, Text, Title } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'

import { InfoItem } from './InfoItem'

export function InfoOwner() {
  return (
    <Stack gap="lg">
      <Title order={4}>Propietario</Title>
      <InfoOwnerContent />
    </Stack>
  )
}

function InfoOwnerContent() {
  const { organizationId, projectId } = useCurrentProject()
  const { data, isLoading } = useProjectQuery(organizationId, projectId)

  if (!isLoading && !data?.owner) {
    return (
      <Text fs="italic" c="dimmed">
        No hay información sobre el propietario.
      </Text>
    )
  }

  return (
    <Stack gap="xs">
      <Group>
        <Box flex={1}>
          <InfoItem label="Nombre" data={data?.owner?.fullName} />
        </Box>
        <Box w="15ch">
          <InfoItem label="DNI" data={data?.owner?.dni} />
        </Box>
      </Group>
      <InfoItem label="Dirección" data={data?.owner?.address} />
    </Stack>
  )
}
