import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Menu,
  Title,
} from '@mantine/core'
import { IconBuildingPlus, IconBuildings, IconPlus } from '@tabler/icons-react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container size="md" mt="3rem">
      <Breadcrumbs
        pb="md"
        styles={{
          separator: { opacity: 0.5 },
        }}
        fz="sm"
      >
        <Anchor c="dimmed" fz="sm" component={Link} disabled>
          Organizaciones
        </Anchor>
      </Breadcrumbs>
      <Group justify="space-between">
        <Title order={1}>Organizaciones</Title>
        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <Button
              rightSection={<IconPlus size={16} stroke={3} />}
              size="sm"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              Agregar
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconBuildingPlus size={14} stroke={2.5} />}
            >
              Crear organización
            </Menu.Item>
            <Menu.Item leftSection={<IconBuildings size={14} stroke={2.5} />}>
              Unirse a una organización
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  )
}
