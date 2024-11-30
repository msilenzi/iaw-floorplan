import { Button, Container, Title } from '@mantine/core'

export default function HomeHeader() {
  return (
    <header>
      <Container
        display="flex"
        py="md"
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Title order={3}>Floorplan</Title>
        <Button size="xs" variant="default">
          Iniciar sesión
        </Button>
      </Container>
    </header>
  )
}
