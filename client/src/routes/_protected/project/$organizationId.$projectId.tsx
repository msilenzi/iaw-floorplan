import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Group, Loader } from '@mantine/core'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { CurrentOrganizationProvider } from '@Organization/context/CurrentOrganization'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { CurrentProjectProvider } from '@Project/context/CurrentProject'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId, projectId } = Route.useParams()

  return (
    <CurrentOrganizationProvider organizationId={organizationId}>
      <CurrentProjectProvider projectId={projectId}>
        <Content />
      </CurrentProjectProvider>
    </CurrentOrganizationProvider>
  )
}

function Content() {
  const organizationQuery = useOrganizationQuery()
  const projectQuery = useProjectQuery()

  if (organizationQuery.isLoading) {
    return (
      <Group mt={'20dvh'} w="100%" justify="center">
        <Loader size={'6rem'} color="dark.5" />
      </Group>
    )
  }

  if (organizationQuery.isError) {
    return (
      <ShowError
        error={organizationQuery.error}
        defaultTitle="No pudimos obtener la organización"
      />
    )
  }

  if (projectQuery.isError) {
    return (
      <ShowError
        error={projectQuery.error}
        defaultTitle="No pudimos obtener el proyecto"
      />
    )
  }

  return <Outlet />
}

type ShowErrorProps = {
  error: Error
  defaultTitle: string
}

function ShowError({ error, defaultTitle }: ShowErrorProps) {
  const navigate = useNavigate()

  const { title, message } = getErrorResponse(error, { title: defaultTitle })

  return (
    <SectionContainer>
      <BasicCtaBanner
        title={title}
        description={message}
        buttonText="Volver al inicio"
        onClick={() => void navigate({ to: '/my-organizations' })}
      />
    </SectionContainer>
  )
}
