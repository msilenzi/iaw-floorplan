import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mantine/core'

import { BaseHeader } from './BaseHeader'

export function UnauthenticatedHeader() {
  const { loginWithRedirect } = useAuth0()

  return (
    <BaseHeader>
      <Button
        size="xs"
        variant="default"
        onClick={() => void loginWithRedirect()}
      >
        Iniciar sesión
      </Button>
    </BaseHeader>
  )
}
