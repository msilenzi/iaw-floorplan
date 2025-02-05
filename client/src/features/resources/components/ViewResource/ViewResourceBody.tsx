import { Box, Flex, Group, Loader, Paper } from '@mantine/core'

import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

import { ViewResourceData } from './ViewResourceData'
import { ViewResourceImage } from './ViewResourceImage'
import { ViewResourcePdf } from './ViewResourcePdf'

type ViewResourceBodyProps = {
  sidebarOpened: boolean
}

export function ViewResourceBody({ sidebarOpened }: ViewResourceBodyProps) {
  return (
    <Group
      p="xs"
      gap={sidebarOpened ? 'md' : 0}
      h="100%"
      mah="100%"
      style={{ overflow: 'hidden' }}
    >
      <Box h="100%" w={sidebarOpened ? 250 : 0}>
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
