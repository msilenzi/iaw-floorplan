import type {
  SubheaderBreadcrumb,
  SubheaderTab,
} from '@Common/components/BaseSubheader'

import { Group, Skeleton, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconInfoSquare,
  IconMap,
  IconPaperclip,
  IconPlus,
} from '@tabler/icons-react'

import { BaseSubheader } from '@Common/components/BaseSubheader'
import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { UploadResourceModal } from '@ProjectResources/components/UploadResourceModal'

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
  const projectQuery = useProjectQuery(projectId)
  const [isOpen, { open, close }] = useDisclosure(false)

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
      <Group justify="space-between" align="ceneter">
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
        <Skeleton visible={projectQuery.isLoading} w="fit-content">
          <PrimaryButton
            rightSection={<IconPlus size={16} stroke={3} />}
            size="sm"
            onClick={open}
          >
            Agregar
          </PrimaryButton>
        </Skeleton>
      </Group>
      <UploadResourceModal isOpen={isOpen} onClose={close} />
    </BaseSubheader>
  )
}
