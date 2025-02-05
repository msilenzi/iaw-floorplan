import { Box, Flex, Group, Loader, Paper } from '@mantine/core'

import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

import { ViewResourceData } from './ViewResourceData'
import { ViewResourceImage } from './ViewResourceImage'
import { ViewResourcePdf } from './ViewResourcePdf'

export function ViewResourceBody() {
  return (
    <Group p="xs" h="100%" mah="100%" style={{ overflow: 'hidden' }}>
      <Box h="100%" w={250}>
        <ViewResourceData />
      </Box>
      <Paper
        h="100%"
        radius="md"
        shadow="xl"
        flex={1}
        bg="dark.7"
        style={{ overflow: 'hidden' }}
      >
        <ResourceContent />
      </Paper>
    </Group>
  )
}

function ResourceContent() {
  const { isLoading, data } = useResourceQuery()

  if (isLoading || !data) {
    return (
      <Flex align="center" justify="center" h="100%">
        <Loader size="6rem" color="dark.5" />
      </Flex>
    )
  }

  if (data.mimetype === 'image/jpeg' || data.mimetype === 'image/png') {
    return <ViewResourceImage />
  }

  if (data.mimetype === 'application/pdf') {
    return <ViewResourcePdf />
  }

  return 'Tipo de archivo inválido'
}
