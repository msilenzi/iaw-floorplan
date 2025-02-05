import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Modal, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { ViewResourceBody } from '@Resources/components/ViewResource/ViewResourceBody'
import { ViewResourceHeader } from '@Resources/components/ViewResource/ViewResourceHeader'
import { CurrentResourceProvider } from '@Resources/context/CurrentResource/CurrentResourceProvider'
import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/resource/$resourceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { resourceId } = Route.useParams()

  return (
    <CurrentResourceProvider resourceId={resourceId}>
      <Content />
    </CurrentResourceProvider>
  )
}

function Content() {
  const { organizationId, projectId } = Route.useParams()
  const resourceQuery = useResourceQuery()

  const navigate = useNavigate()

  const [sidebarOpened, setSidebarOpened] = useLocalStorage<boolean>({
    key: 'iaw-floorplan__sidebarOpened',
    defaultValue: true,
  })

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
    <Modal.Root opened onClose={handleClose} fullScreen closeOnEscape={false}>
      <Modal.Content bg="dark.8" p={0}>
        <Modal.Body h="100%" p={0}>
          <Stack h="100%" mah="100%" gap={0}>
            <ViewResourceHeader
              sidebarOpened={sidebarOpened}
              setSidebarOpened={setSidebarOpened}
            />
            <ViewResourceBody sidebarOpened={sidebarOpened} />
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
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
