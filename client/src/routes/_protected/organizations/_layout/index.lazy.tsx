import { Container } from '@mantine/core'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container size="md" mt="lg">
      Organizaciones
    </Container>
  )
}

/**
 * [x] Agregar menu para elegir entre unirse o crear organización.
 *     [x] El menú se muestra al hacer click en agregar
 * [-] Agregar tabs con las secciones de la organización
 *     [ ] Organizaciones
 *     [ ] Solicitudes
 * [x] Actualizar colores de las secciones para lograr un estilo parecido a la
 *     documentación de mantine
 * [ ] Mostrar listado de organizaciones con paginación
 */
