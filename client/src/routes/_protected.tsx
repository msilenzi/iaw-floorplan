import { useEffect } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'

import { AuthenticatedHeader } from '@Common/components/Header'
import { LoadingPage } from '@Common/components/LoadingPage'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({
        appState: {
          returnTo: router.state.location.pathname,
        },
      })
    }
  }, [
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    router.state.location.pathname,
  ])

  if (isLoading || !isAuthenticated) {
    return <LoadingPage />
  }

  return (
    <>
      <AuthenticatedHeader />
      <Outlet />
    </>
  )
}
