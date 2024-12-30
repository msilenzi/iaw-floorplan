import { Link, useLocation, useNavigate } from '@tanstack/react-router'

import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Group,
  Menu,
  Tabs,
  Title,
} from '@mantine/core'

import {
  IconBuilding,
  IconBuildingPlus,
  IconBuildings,
  IconPlus,
  IconUsersPlus,
} from '@tabler/icons-react'

import PrimaryButton from '@Common/ui/PrimaryButton'

import classes from './OrganizationsHeader.module.css'

export default function OrganizationsHeader() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box className={classes.header}>
      <Container size="md">
        <OrganizationsHeaderBreadcrumbs />
        <Group justify="space-between" mb="3rem">
          <Title order={1}>Organizaciones</Title>
          <OrganizationsHeaderAddBtn />
        </Group>

        <Tabs
          variant="outline"
          radius="md"
          defaultValue="organizations"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
          value={location.pathname}
          onChange={(value) => void navigate({ to: value! })}
        >
          <Tabs.List classNames={{ list: classes.tabList }}>
            <Tabs.Tab
              value="/organizations"
              leftSection={<IconBuilding size={14} stroke={2.5} />}
              classNames={{ tab: classes.tab }}
            >
              Organizaciones
            </Tabs.Tab>
            <Tabs.Tab
              value="/organizations/requests"
              leftSection={<IconUsersPlus size={14} stroke={2.5} />}
              classNames={{ tab: classes.tab }}
            >
              Solicitudes
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Container>
    </Box>
  )
}

function OrganizationsHeaderBreadcrumbs() {
  return (
    <Breadcrumbs pb="sm" fz="sm" styles={{ separator: { opacity: 0.5 } }}>
      <Anchor c="dimmed" fz="sm" component={Link} disabled>
        Organizaciones
      </Anchor>
    </Breadcrumbs>
  )
}

function OrganizationsHeaderAddBtn() {
  return (
    <Menu position="bottom-end" shadow="md">
      <Menu.Target>
        <PrimaryButton
          rightSection={<IconPlus size={16} stroke={3} />}
          size="sm"
        >
          Agregar
        </PrimaryButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconBuildingPlus size={14} stroke={2.5} />}>
          Crear organización
        </Menu.Item>
        <Menu.Item leftSection={<IconBuildings size={14} stroke={2.5} />}>
          Unirse a una organización
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
