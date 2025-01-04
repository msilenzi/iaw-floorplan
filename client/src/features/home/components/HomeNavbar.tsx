import { useAuth0 } from '@auth0/auth0-react'

import { Button, Title } from '@mantine/core'

import BaseNavbar from '@Common/ui/BaseNavbar'

export default function HomeNavbar() {
  const { loginWithRedirect } = useAuth0()

  return (
    <BaseNavbar>
      <Title order={3}>Floorplan</Title>
      <Button
        size="xs"
        variant="default"
        onClick={() => void loginWithRedirect()}
      >
        Iniciar sesión
      </Button>
    </BaseNavbar>
  )
}
