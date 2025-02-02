import {
  Box,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core'

import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { UserInfo } from '@Common/ui/UserInfo'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { CardCrop } from '@Crops/components/CardCrop'
import { useResourceCropsQuery } from '@Crops/hooks/useResourceCropsQuery'

import { useResourceQuery } from '../../hooks/useResourceQuery'

export function ViewResourceData() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { data, isLoading } = useResourceQuery(projectId, resourceId)

  return (
    <Stack gap="lg" h="100%" style={{ overflow: 'hidden' }}>
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
              user={
                data?.createdBy ?? {
                  name: 'loading user',
                  email: 'loading email',
                  user_id: 'loading user',
                  picture: '',
                }
              }
              innerProps={{ avatar: { size: 'sm' } }}
            />
          )}
        </DataItem>
      </Stack>

      {/* RECORTES */}
      <Stack gap="sm" flex={1} mih={0}>
        <Title order={3}>Recortes</Title>
        <ScrollArea flex={1}>
          <CropsList />
        </ScrollArea>
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

function CropsList() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const query = useResourceCropsQuery(projectId, resourceId)
  const { data, isLoading } = query

  // TODO: carga
  // TODO: errores

  if (isLoading || !data) {
    return 'cargando...'
  }

  return (
    <>
      <Group justify="end" w="100%" mb="sm">
        <RefetchBtn query={query} />
      </Group>
      {data.length === 0 ? (
        <Text fs="italic" ta="center" c="dimmed">
          No hay recortes para este recurso.
        </Text>
      ) : (
        <Stack gap="lg" pb="md">
          {data.map((crop) => (
            <CardCrop crop={crop} key={crop._id} />
          ))}
        </Stack>
      )}
    </>
  )
}
