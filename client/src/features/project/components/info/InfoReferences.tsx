import { List, Skeleton, Stack, Text, Title } from '@mantine/core'

import { useProjectQuery } from '@Project/hooks/useProjectQuery'

export function InfoReferences() {
  return (
    <Stack gap="lg">
      <Title order={4}>Referencias</Title>
      <InfoReferencesContent />
    </Stack>
  )
}

function InfoReferencesContent() {
  const { data, isLoading } = useProjectQuery()

  if (isLoading) {
    return (
      <Stack gap="xs">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} h="1.5rem" w="100%" />
        ))}
      </Stack>
    )
  }

  if (!data?.references || data.references.length === 0) {
    return (
      <Text fs="italic" c="dimmed">
        No hay referencias.
      </Text>
    )
  }

  return (
    <List>
      {data.references.map((reference, id) => (
        <List.Item key={id}>{reference}</List.Item>
      ))}
    </List>
  )
}
