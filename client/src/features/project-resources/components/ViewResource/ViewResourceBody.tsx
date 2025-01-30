import { Box, Flex, Group, Loader, Paper } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'
import { useProjectResourceQuery } from '@ProjectResources/hooks/useProjectResourceQuery'

import { ViewResourceData } from './ViewResourceData'
import { ViewResourceImage } from './ViewResourceImage'

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
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { isLoading, data } = useProjectResourceQuery(projectId, resourceId)

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
    return 'Todavía no soportamos la visualización de archivos PDF'
  }

  return 'Tipo de archivo inválido'
}
