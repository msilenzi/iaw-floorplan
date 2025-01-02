import { Link, useLocation, useNavigate } from '@tanstack/react-router'

import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Group,
  Tabs,
  Title,
} from '@mantine/core'

import { IconBuilding, IconUsersPlus } from '@tabler/icons-react'

import OrganizationsAddBtn from './OrganizationAddBtn'

import classes from './OrganizationsHeader.module.css'

export default function OrganizationsHeader() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box className={classes.header} pt="3rem">
      <Container size="md">
        <OrganizationsHeaderBreadcrumbs />
        <Group justify="space-between" mb="3rem">
          <Title order={1}>Tus organizaciones</Title>
          <OrganizationsAddBtn position="bottom-end" />
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
              Tus organizaciones
            </Tabs.Tab>
            <Tabs.Tab
              value="/organizations/requests"
              leftSection={<IconUsersPlus size={14} stroke={2.5} />}
              classNames={{ tab: classes.tab }}
            >
              Tus solicitudes
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
        Tus organizaciones
      </Anchor>
    </Breadcrumbs>
  )
}
