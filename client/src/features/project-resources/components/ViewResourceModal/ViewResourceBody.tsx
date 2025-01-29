import { Box, Group, Paper } from '@mantine/core'

import { ViewResource } from './ViewResource'
import { ViewResourceData } from './ViewResourceData'

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
        <ViewResource />
      </Paper>
    </Group>
  )
}
