import { Group, Title } from '@mantine/core'

import { IconBuilding, IconUsersPlus } from '@tabler/icons-react'

import {
  BaseSubheader,
  SubheaderBreadcrumb,
  SubheaderTab,
} from '@Common/components/BaseSubheader'

import { OrganizationsAddBtn } from './OrganizationAddBtn'

const tabs: SubheaderTab[] = [
  {
    label: 'Tus Organizaciones',
    Icon: IconBuilding,
    to: '/my-organizations',
  },
  {
    label: 'Tus solicitudes',
    Icon: IconUsersPlus,
    to: '/my-organizations/requests',
  },
]

const breadcrumbs: SubheaderBreadcrumb[] = [
  { label: 'Tus organizaciones', to: '/my-organizations' },
]

export function MyOrganizationsSubheader() {
  return (
    <BaseSubheader breadcrumbs={breadcrumbs} tabs={tabs}>
      <Group justify="space-between">
        <Title order={1}>Tus organizaciones</Title>
        <OrganizationsAddBtn position="bottom-end" />
      </Group>
    </BaseSubheader>
  )
}
