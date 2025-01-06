import { Skeleton, Title } from '@mantine/core'

import { IconBox, IconUsers, IconUsersPlus } from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import {
  BaseSubheader,
  type SubheaderBreadcrumb,
  type SubheaderTab,
} from '@Common/components/BaseSubheader'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

type OrganizationSubheaderProps = {
  organizationId: string
}

export function OrganizationSubheader({
  organizationId,
}: OrganizationSubheaderProps) {
  const { isLoading, data } = useOrganizationQuery(organizationId)

  const breadcrumbs: SubheaderBreadcrumb[] = [
    {
      label: 'Tus organizaciones',
      to: '/my-organizations',
    },
    {
      label: data?.name ?? '...',
      to: `/organization/${organizationId}`,
    },
  ]

  const tabs: SubheaderTab[] = [
    {
      label: 'Proyectos',
      Icon: IconBox,
      to: `/organization/${organizationId}`,
    },
    {
      label: 'Miembros',
      Icon: IconUsers,
      to: `/organization/${organizationId}/members`,
    },
    {
      label: 'Solicitudes',
      Icon: IconUsersPlus,
      to: `/organization/${organizationId}/requests`,
      hidden: isLoading || data?.userStatus !== MemberStatus.Owner,
    },
    // { label: 'Configuración', Icon: IconX },
  ]

  return (
    <BaseSubheader breadcrumbs={breadcrumbs} tabs={tabs}>
      <Skeleton visible={isLoading} w={isLoading ? 300 : '100%'}>
        <Title order={1}>{isLoading ? 'Is loading' : data?.name}</Title>
      </Skeleton>
    </BaseSubheader>
  )
}
