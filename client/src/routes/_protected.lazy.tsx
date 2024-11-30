import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mantine/core'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  const { logout, isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return <>loading...</>
  }

  if (!isAuthenticated) {
    void loginWithRedirect()
    return <></>
  }

  return (
    <>
      <h1>/_protected</h1>
      <pre>{JSON.stringify({ isLoading, isAuthenticated })}</pre>
      <Button onClick={() => void logout()}>Cerrar sesión</Button>
      <hr />
      <Outlet />
      <hr />

      <h4 style={{ textAlign: 'center' }}>Footer</h4>
    </>
  )
}
