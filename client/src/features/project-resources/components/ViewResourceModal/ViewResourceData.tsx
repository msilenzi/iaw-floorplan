import {
  Box,
  CloseButton,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconScissors } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { UserInfo } from '@Common/ui/UserInfo'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'

import { useProjectResourceQuery } from '../../hooks/useProjectResourceQuery'

type ViewResourceDataProps = {
  onClose: () => void
}

export function ViewResourceData({ onClose }: ViewResourceDataProps) {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { data, isLoading } = useProjectResourceQuery(projectId, resourceId)

  return (
    <Stack gap="lg">
      {/* HEADER: */}
      <Group align="baseline" wrap="nowrap">
        <Skeleton
          visible={isLoading}
          maw={'100%'}
          style={{ overflowWrap: 'break-word', overflow: 'hidden' }}
        >
          <Title
            order={2}
            component="h2"
            mb="xs"
            flex={1}
            maw={'100%'}
            style={{ overflowWrap: 'break-word', overflow: 'hidden' }}
          >
            {data?.name ?? 'Recurso'}
          </Title>
        </Skeleton>
        <CloseButton onClick={onClose} />
      </Group>

      {/* DATA */}
      <Stack gap="sm">
        <DataItem label="Fecha de creación">
          <Skeleton visible={isLoading}>
            <Text>
              {new Date(data?.createdAt ?? '2001-11-12').toLocaleDateString(
                'es-AR',
                { dateStyle: 'long' },
              )}
            </Text>
          </Skeleton>
        </DataItem>

        <DataItem label="Creado por">
          {isLoading ? (
            <Skeleton h={40} />
          ) : (
            <UserInfo
              user={data!.createdBy}
              innerProps={{ avatar: { size: 'sm' } }}
            />
          )}
        </DataItem>
      </Stack>

      {/* RESOURCES */}
      <Stack gap="sm">
        <Title order={3}>Recortes</Title>
        <PrimaryButton
          rightSection={<IconScissors height={20} width={20} stroke={2} />}
        >
          Agregar recorte
        </PrimaryButton>
        <Text fs="italic" ta="center" c="dimmed">
          No hay recortes para este recurso.
        </Text>
      </Stack>
    </Stack>

    // Data
    // Recortes
  )
}

type DataItemProps = {
  label: string
  children: React.ReactNode
}

function DataItem({ label, children }: DataItemProps) {
  return (
    <Box>
      <Text fw={700} c="dimmed" fz="sm">
        {label}
      </Text>
      {children}
    </Box>
  )
}
