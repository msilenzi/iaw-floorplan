import { Box, Group, Modal, Paper } from '@mantine/core'

import { ViewResourceData } from './ViewResourceData'

type ViewResourceModalProps = {
  isOpen: boolean
  onClose: () => void
  resourceId: string
}

export function ViewResourceModal({
  isOpen,
  onClose,
  resourceId,
}: ViewResourceModalProps) {
  return (
    <Modal.Root opened={isOpen} onClose={onClose} fullScreen>
      <Modal.Content bg="dark.8">
        <Group h="100dvh" p="xs">
          <Box h="100%" w={250}>
            <ViewResourceData onClose={onClose} resourceId={resourceId} />
          </Box>

          <Paper h="100%" p="md" radius="md" shadow="xl" flex={1} bg="dark.7">
            {resourceId}
          </Paper>
        </Group>
      </Modal.Content>
    </Modal.Root>
  )
}
