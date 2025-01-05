import { Outlet, createFileRoute } from '@tanstack/react-router'

import { Container } from '@mantine/core'

import { AuthenticatedHeader } from '@Common/components/Header'

import { MyOrganizationsSubheader } from '@MyOrganizations/components/MyOrganizationsSubheader'

export const Route = createFileRoute('/_protected/my-organizations/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthenticatedHeader />
      <MyOrganizationsSubheader />
      <Container size="md" mt="3rem">
        <Outlet />
      </Container>
    </>
  )
}
