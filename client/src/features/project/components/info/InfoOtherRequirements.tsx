import { Stack, Text, Title } from '@mantine/core'

import { DataTable } from '@Common/components/DataTable'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'

export function InfoOtherRequirements() {
  return (
    <Stack gap="lg">
      <Title order={4}>Otras exigencias</Title>
      <InfoOtherRequirementsContent />
    </Stack>
  )
}

function InfoOtherRequirementsContent() {
  const { projectId } = useCurrentProject()
  const { data, isLoading } = useProjectQuery(projectId)

  if (
    !isLoading &&
    (!data?.otherRequirements || data.otherRequirements.length === 0)
  ) {
    return (
      <Text fs="italic" c="dimmed">
        No hay otras exigencias.
      </Text>
    )
  }

  return (
    <DataTable
      data={data?.otherRequirements ?? []}
      rowKey="key"
      isLoading={isLoading}
      loadingRowsLength={3}
      columnsConfiguration={[
        { key: 'key', label: 'Clave' },
        { key: 'value', label: 'Valor' },
      ]}
      props={{
        table: {
          withTableBorder: true,
          withColumnBorders: true,
          verticalSpacing: 'sm',
        },
      }}
    />
  )
}
