import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Modal, Stack } from '@mantine/core'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { ViewResourceBody } from '@ProjectResources/components/ViewResource/ViewResourceBody'
import { ViewResourceHeader } from '@ProjectResources/components/ViewResource/ViewResourceHeader'
import { CurrentResourceProvider } from '@ProjectResources/context/CurrentResource/CurrentResourceProvider'
import { useProjectResourceQuery } from '@ProjectResources/hooks/useProjectResourceQuery'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/resource/$resourceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId, projectId, resourceId } = Route.useParams()
  const resourceQuery = useProjectResourceQuery(projectId, resourceId)

  const navigate = useNavigate()

  if (resourceQuery.isError) {
    return <ShowError error={resourceQuery.error} />
  }

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

type ShowErrorProps = {
  error: Error
}

function ShowError({ error }: ShowErrorProps) {
  const { organizationId, projectId } = Route.useParams()
  const navigate = useNavigate()

  const { title, message } = getErrorResponse(error, {
    title: 'No pudimos obtener el recurso',
  })

  return (
    <SectionContainer>
      <BasicCtaBanner
        title={title}
        description={message}
        buttonText="Volver a recursos"
        onClick={() =>
          void navigate({
            to: '/project/$organizationId/$projectId/resources',
            params: { organizationId, projectId },
          })
        }
      />
    </SectionContainer>
  )
}
