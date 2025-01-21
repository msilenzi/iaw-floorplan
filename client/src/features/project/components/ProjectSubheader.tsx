import type {
  SubheaderBreadcrumb,
  SubheaderTab,
} from '@Common/components/BaseSubheader'

import { Group, Skeleton, Text } from '@mantine/core'
import { IconInfoSquare, IconMap, IconPaperclip } from '@tabler/icons-react'

import { BaseSubheader } from '@Common/components/BaseSubheader'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

import { useProjectQuery } from '../hooks/useProjectQuery'

type ProjectSubheaderProps = {
  organizationId: string
  projectId: string
}

export function ProjectSubheader({
  organizationId,
  projectId,
}: ProjectSubheaderProps) {
  const organizationQuery = useOrganizationQuery(organizationId)
  const projectQuery = useProjectQuery(organizationId, projectId)

  const BASE_PATH = `/project/${organizationId}/${projectId}`

  const breadcrumbs: SubheaderBreadcrumb[] = [
    {
      label: 'Mis organizaciones',
      to: '/my-organizations',
    },
    {
      label: organizationQuery.data?.name ?? '...',
      to: `/organization/${organizationId}`,
    },
    {
      label: projectQuery.data?.name ?? projectQuery.data?.record ?? '...',
      to: BASE_PATH,
    },
  ]

  const tabs: SubheaderTab[] = [
    {
      label: 'Planos',
      Icon: IconMap,
      to: BASE_PATH,
    },
    {
      label: 'Recursos',
      Icon: IconPaperclip,
      to: `${BASE_PATH}/resources`,
    },
    {
      label: 'Información',
      Icon: IconInfoSquare,
      to: `${BASE_PATH}/info`,
    },
  ]

  return (
    <BaseSubheader breadcrumbs={breadcrumbs} tabs={tabs}>
      <Group justify="space-between">
        <Skeleton visible={projectQuery.isLoading} w="fit-content">
          <BaseSubheader.Title>
            {projectQuery.isLoading
              ? 'Cargando proyecto'
              : (projectQuery.data?.name ?? projectQuery.data?.record)}
          </BaseSubheader.Title>
          {projectQuery.data?.name != null && projectQuery.data.record && (
            <Text c="dimmed" fw={700} lineClamp={1}>
              {projectQuery.data.record}
            </Text>
          )}
        </Skeleton>
      </Group>
    </BaseSubheader>
  )
}
