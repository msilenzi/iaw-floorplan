import { Modal, Stack } from '@mantine/core'

import { CurrentResourceProvider } from '@ProjectResources/context/CurrentResource/CurrentResourceProvider'

import { ViewResourceBody } from './ViewResourceBody'
import { ViewResourceHeader } from './ViewResourceHeader'

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
    <CurrentResourceProvider resourceId={resourceId}>
      <Modal.Root opened={isOpen} onClose={onClose} fullScreen>
        <Modal.Content bg="dark.8" p={0}>
          <Modal.Body h="100%" p={0}>
            <Stack h={'100%'} gap={0}>
              <ViewResourceHeader />
              <ViewResourceBody />
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </CurrentResourceProvider>
  )
}
