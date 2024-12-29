import { useAuth0 } from '@auth0/auth0-react'

import { Button, Title } from '@mantine/core'

import GenericNavbar from '@Common/components/GenericNavbar'

export default function HomeNavbar() {
  const { loginWithRedirect } = useAuth0()

  return (
    <GenericNavbar>
      <Title order={3}>Floorplan</Title>
      <Button
        size="xs"
        variant="default"
        onClick={() => void loginWithRedirect()}
      >
        Iniciar sesión
      </Button>
    </GenericNavbar>
  )
}
