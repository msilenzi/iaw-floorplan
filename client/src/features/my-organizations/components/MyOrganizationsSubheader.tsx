import { Group } from '@mantine/core'

import { IconBuilding, IconUserPlus } from '@tabler/icons-react'

import type {
  SubheaderBreadcrumb,
  SubheaderTab,
} from '@Common/components/BaseSubheader'
import { BaseSubheader } from '@Common/components/BaseSubheader'

import { MyOrganizationsAddBtn } from './MyOrganizationAddBtn'

const tabs: SubheaderTab[] = [
  {
    label: 'Mis Organizaciones',
    Icon: IconBuilding,
    to: '/my-organizations',
  },
  {
    label: 'Mis solicitudes',
    Icon: IconUserPlus,
    to: '/my-organizations/requests',
  },
]

const breadcrumbs: SubheaderBreadcrumb[] = [
  { label: 'Mis organizaciones', to: '/my-organizations' },
]

export function MyOrganizationsSubheader() {
  return (
    <BaseSubheader breadcrumbs={breadcrumbs} tabs={tabs}>
      <Group justify="space-between">
        <BaseSubheader.Title>Mis organizaciones</BaseSubheader.Title>
        <MyOrganizationsAddBtn position="bottom-end" />
      </Group>
    </BaseSubheader>
  )
}
