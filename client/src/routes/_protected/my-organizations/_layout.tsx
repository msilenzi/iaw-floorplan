import { Outlet, createFileRoute } from '@tanstack/react-router'

import { SectionContainer } from '@Common/components/SectionContainer'

import { MyOrganizationsSubheader } from '@MyOrganizations/components/MyOrganizationsSubheader'

export const Route = createFileRoute('/_protected/my-organizations/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <MyOrganizationsSubheader />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </>
  )
}
