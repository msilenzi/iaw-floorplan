import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { OrganizationSubheader } from '@Organization/components/OrganizationSubheader'
import { CurrentOrganizationProvider } from '@Organization/context/CurrentOrganization'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()
  const { isError, error } = useOrganizationQuery(organizationId)

  if (isError) {
    return <ShowError error={error} />
  }

  return (
    <CurrentOrganizationProvider organizationId={organizationId}>
      <OrganizationSubheader organizationId={organizationId} />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </CurrentOrganizationProvider>
  )
}

function ShowError({ error }: { error: Error }) {
  const navigate = useNavigate()

  const { title, message } = getErrorResponse(error, {
    title: 'No pudimos obtener la organización',
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
