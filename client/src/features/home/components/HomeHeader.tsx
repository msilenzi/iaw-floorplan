import { useAuth0 } from '@auth0/auth0-react'
import { Button, Container, Title } from '@mantine/core'

export default function HomeHeader() {
  const { loginWithRedirect } = useAuth0()

  return (
    <header>
      <Container
        display="flex"
        py="md"
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Title order={3}>Floorplan</Title>
        <Button
          size="xs"
          variant="default"
          onClick={() => void loginWithRedirect()}
        >
          Iniciar sesión
        </Button>
      </Container>
    </header>
  )
}
