import { createFileRoute, Outlet } from '@tanstack/react-router'

import { SectionContainer } from '@Common/components/SectionContainer'
import { ProjectSubheader } from '@Project/components/ProjectSubheader'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId, projectId } = Route.useParams()

  return (
    <>
      <ProjectSubheader organizationId={organizationId} projectId={projectId} />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </>
  )
}
