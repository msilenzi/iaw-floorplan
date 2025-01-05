import { Outlet, createFileRoute } from '@tanstack/react-router'

import { Container } from '@mantine/core'

import { MyOrganizationsSubheader } from '@MyOrganizations/components/MyOrganizationsSubheader'

export const Route = createFileRoute('/_protected/my-organizations/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <MyOrganizationsSubheader />
      <Container size="md" mt="3rem">
        <Outlet />
      </Container>
    </>
  )
}
