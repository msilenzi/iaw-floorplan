import { Group, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import {
  IconBox,
  IconPlus,
  IconSettings,
  IconUsers,
  IconUsersPlus,
} from '@tabler/icons-react'

import { ProjectModalCreate } from '@/features/project/components/ProjectModalCreate/ProjectModalCreate'

import { MemberStatus } from '@Common/api/generated'
import {
  BaseSubheader,
  type SubheaderBreadcrumb,
  type SubheaderTab,
} from '@Common/components/BaseSubheader'
import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

type OrganizationSubheaderProps = {
  organizationId: string
}

export function OrganizationSubheader({
  organizationId,
}: OrganizationSubheaderProps) {
  const { isLoading, data } = useOrganizationQuery(organizationId)
  const [isOpen, { open, close }] = useDisclosure(false)

  const breadcrumbs: SubheaderBreadcrumb[] = [
    {
      label: 'Mis organizaciones',
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
    {
      label: 'Ajustes',
      Icon: IconSettings,
      to: `/organization/${organizationId}/settings`,
    },
  ]

  return (
    <BaseSubheader breadcrumbs={breadcrumbs} tabs={tabs}>
      <Group justify="space-between">
        <Skeleton visible={isLoading} w={isLoading ? 300 : 'fit-content'}>
          <BaseSubheader.Title>
            {isLoading ? 'Is loading' : data?.name}
          </BaseSubheader.Title>
        </Skeleton>
        <Skeleton visible={isLoading} w="fit-content">
          <PrimaryButton
            rightSection={<IconPlus size={16} stroke={3} />}
            size="sm"
            onClick={open}
          >
            Agregar
          </PrimaryButton>
        </Skeleton>
      </Group>
      <ProjectModalCreate isOpen={isOpen} onClose={close} />
    </BaseSubheader>
  )
}
