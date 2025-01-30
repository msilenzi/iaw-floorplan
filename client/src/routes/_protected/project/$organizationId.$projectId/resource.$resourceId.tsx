import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Modal, Stack } from '@mantine/core'

import { ViewResourceBody } from '@ProjectResources/components/ViewResourceModal/ViewResourceBody'
import { ViewResourceHeader } from '@ProjectResources/components/ViewResourceModal/ViewResourceHeader'
import { CurrentResourceProvider } from '@ProjectResources/context/CurrentResource/CurrentResourceProvider'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/resource/$resourceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId, projectId, resourceId } = Route.useParams()
  const navigate = useNavigate()

  // TODO: validar resourceId

  function handleClose() {
    void navigate({
      to: '/project/$organizationId/$projectId/resources',
      params: { organizationId, projectId },
    })
  }

  return (
    <CurrentResourceProvider resourceId={resourceId}>
      <Modal.Root opened onClose={handleClose} fullScreen closeOnEscape={false}>
        <Modal.Content bg="dark.8" p={0}>
          <Modal.Body h="100%" p={0}>
            <Stack h="100%" mah="100%" gap={0}>
              <ViewResourceHeader />
              <ViewResourceBody />
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </CurrentResourceProvider>
  )
}
