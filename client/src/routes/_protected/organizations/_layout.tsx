import OrganizationsNavbar from '@/organizations/components/OrganizationsNavbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/organizations/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <OrganizationsNavbar />
      <Outlet />
    </>
  )
}
