import { Box, Skeleton, Stack, Text, Title } from '@mantine/core'

import { UserInfo } from '@Common/ui/UserInfo'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'

import { useProjectResourceQuery } from '../../hooks/useProjectResourceQuery'

export function ViewResourceData() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { data, isLoading } = useProjectResourceQuery(projectId, resourceId)

  return (
    <Stack gap="lg">
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

      {/* RECORTES */}
      <Stack gap="sm">
        <Title order={3}>Recortes</Title>
        <Text fs="italic" ta="center" c="dimmed">
          No hay recortes para este recurso.
        </Text>
      </Stack>
    </Stack>
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
