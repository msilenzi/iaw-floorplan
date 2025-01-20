import { Stack, Text, Title } from '@mantine/core'

import { useCurrentProject } from '../../context/CurrentProject'
import { useProjectQuery } from '../../hooks/useProjectQuery'
import { InfoProfessionals } from './_InfoProfessionals'

export function InfoDesigners() {
  return (
    <Stack gap="lg">
      <Title order={4}>Proyectistas</Title>
      <InfoDesignersContent />
    </Stack>
  )
}

function InfoDesignersContent() {
  const { organizationId, projectId } = useCurrentProject()
  const { data, isLoading } = useProjectQuery(organizationId, projectId)

  if (!isLoading && (!data?.designers || data.designers.length === 0)) {
    return (
      <Text fs="italic" c="dimmed">
        No hay información sobre los proyectistas.
      </Text>
    )
  }

  return <InfoProfessionals professionals={data?.designers} />
}
