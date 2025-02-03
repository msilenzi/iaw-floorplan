import { Stack, Text, Title } from '@mantine/core'

import { useProjectQuery } from '@Project/hooks/useProjectQuery'

import { InfoProfessionals } from './InfoProfessionals'

export function InfoTechnicalDirectors() {
  return (
    <Stack gap="lg">
      <Title order={4}>Dirección técnica</Title>
      <InfoTechnicalDirectorsContent />
    </Stack>
  )
}

function InfoTechnicalDirectorsContent() {
  const { data, isLoading } = useProjectQuery()

  if (
    !isLoading &&
    (!data?.technicalDirectors || data.technicalDirectors.length === 0)
  ) {
    return (
      <Text fs="italic" c="dimmed">
        No hay información sobre la dirección técnica.
      </Text>
    )
  }

  return <InfoProfessionals professionals={data?.technicalDirectors} />
}
