import { isAxiosError } from 'axios'

import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'

import { isServerException } from '@Common/api/types/ServerException'
import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { SectionContainer } from '@Common/components/SectionContainer'

import { OrganizationSubheader } from '@Organization/components/OrganizationSubheader'
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

  let title = 'Error de conexión'
  let description = 'No pudimos establecer la conexión con el servidor'

  if (isAxiosError(error) && isServerException(error.response?.data)) {
    const e = error.response.data
    if (e.statusCode >= 500) {
      title = '¡Ups! Algo salió mal'
      description =
        'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    } else if (e.statusCode >= 400) {
      title = 'No pudimos obtener la organización'
      description = `${e.message}`
    }
  }

  return (
    <BasicCtaBanner
      title={title}
      description={description}
      buttonText="Volver al inicio"
      onClick={() => void navigate({ to: '/my-organizations' })}
    />
  )
}
