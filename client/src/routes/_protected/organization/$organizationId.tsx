import { Outlet, createFileRoute } from '@tanstack/react-router'

import { SectionContainer } from '@Common/components/SectionContainer'

import { OrganizationSubheader } from '@Organization/components/OrganizationSubheader'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()

  return (
    <>
      <OrganizationSubheader organizationId={organizationId} />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </>
  )
}
