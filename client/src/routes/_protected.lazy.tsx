import { useAuth0 } from '@auth0/auth0-react'

import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return <>loading...</>
  }

  if (!isAuthenticated) {
    return loginWithRedirect()
  }

  return <Outlet />
}
