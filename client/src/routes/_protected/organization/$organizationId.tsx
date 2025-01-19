import { useEffect } from 'react'

import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'
import { getErrorResponse } from '@Common/utils/errorHandling'

import { OrganizationSubheader } from '@Organization/components/OrganizationSubheader'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()
  const { isError, error } = useOrganizationQuery(organizationId)

  const setOrganizationId = useOrganizationStore((s) => s.setOrganizationId)
  const clear = useOrganizationStore((s) => s.clear)

  useEffect(() => {
    setOrganizationId(organizationId)
    return () => clear()
  }, [clear, organizationId, setOrganizationId])

  if (isError) {
    return <ShowError error={error} />
  }

  return (
    <>
      <OrganizationSubheader organizationId={organizationId} />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </>
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
