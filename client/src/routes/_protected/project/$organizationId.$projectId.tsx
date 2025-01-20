import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'

import { ProjectSubheader } from '@/features/project/components/ProjectSubheader'
import { CurrentProjectProvider } from '@/features/project/context/CurrentProject'
import { useProjectQuery } from '@/features/project/hooks/useProjectQuery'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'
import { getErrorResponse } from '@Common/utils/errorHandling'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId, projectId } = Route.useParams()
  const { isError, error } = useProjectQuery(organizationId, projectId)

  if (isError) {
    return <ShowError error={error} />
  }

  return (
    <CurrentProjectProvider
      organizationId={organizationId}
      projectId={projectId}
    >
      <ProjectSubheader organizationId={organizationId} projectId={projectId} />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </CurrentProjectProvider>
  )
}

function ShowError({ error }: { error: Error }) {
  const navigate = useNavigate()

  const { title, message } = getErrorResponse(error, {
    title: 'No pudimos obtener el proyecto',
  })

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
