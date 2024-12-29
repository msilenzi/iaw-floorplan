import { Outlet, createFileRoute } from '@tanstack/react-router'

import { Container } from '@mantine/core'

import OrganizationsHeader from '@Organizations/components/OrganizationsHeader'
import OrganizationsNavbar from '@Organizations/components/OrganizationsNavbar'

export const Route = createFileRoute('/_protected/organizations/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <OrganizationsNavbar />
      <OrganizationsHeader />
      <Container size="md" mt="3rem">
        <Outlet />
      </Container>
    </>
  )
}
