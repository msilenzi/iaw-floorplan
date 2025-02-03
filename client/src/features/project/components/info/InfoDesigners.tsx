import { Stack, Text, Title } from '@mantine/core'

import { useProjectQuery } from '@Project/hooks/useProjectQuery'

import { InfoProfessionals } from './InfoProfessionals'

export function InfoDesigners() {
  return (
    <Stack gap="lg">
      <Title order={4}>Proyectistas</Title>
      <InfoDesignersContent />
    </Stack>
  )
}

function InfoDesignersContent() {
  const { data, isLoading } = useProjectQuery()

  if (!isLoading && (!data?.designers || data.designers.length === 0)) {
    return (
      <Text fs="italic" c="dimmed">
        No hay información sobre los proyectistas.
      </Text>
    )
  }

  return <InfoProfessionals professionals={data?.designers} />
}
