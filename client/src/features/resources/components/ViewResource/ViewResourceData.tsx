import type { CropWithUrl } from '@Common/api'
import type { UseQueryResult } from '@tanstack/react-query'

import { useState } from 'react'

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
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { CardCrop } from '@Crops/components/CardCrop'
import { ViewCropModal } from '@Crops/components/CropModal/ViewCropModal'
import { useResourceCropsQuery } from '@Crops/hooks/useResourceCropsQuery'

import { useResourceQuery } from '../../hooks/useResourceQuery'

export function ViewResourceData() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { data, isLoading } = useResourceQuery(projectId, resourceId)

  return (
    <ScrollArea flex={1} h="100%">
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
        <Stack gap="sm">
          <Title order={3}>Recortes</Title>
          {/* <ScrollArea flex={1}> */}
          <CropsList />
          {/* </ScrollArea> */}
        </Stack>
      </Stack>
    </ScrollArea>
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
  const { isLoading } = query

  if (isLoading) {
    return (
      <>
        <Group justify="end" w="100%" mb="sm">
          <Skeleton w="fit-content">
            <RefetchBtn query={query} />
          </Skeleton>
        </Group>
        <Stack gap="lg">
          <CardCrop.Loading />
          <CardCrop.Loading />
          <CardCrop.Loading />
        </Stack>
      </>
    )
  }

  return (
    <>
      <Group justify="end" w="100%" mb="sm">
        <RefetchBtn query={query} />
      </Group>
      <CopsListContent query={query} />
    </>
  )
}

type CopsListContentProps = {
  query: UseQueryResult<CropWithUrl[]>
}

function CopsListContent({ query }: CopsListContentProps) {
  const { data, isError, error } = query

  const [selectedCrop, setSelectedCrop] = useState<CropWithUrl | undefined>(
    undefined,
  )

  if (isError || !data) {
    const { title, message } = getErrorResponse(error, {
      title: 'Ocurrió un error al cargar los recortes',
    })

    return (
      <>
        <Text fw={700}>{title}</Text>
        <Text>{message}</Text>
      </>
    )
  }

  if (data.length === 0) {
    return (
      <Text fs="italic" ta="center" c="dimmed">
        No hay recortes para este recurso.
      </Text>
    )
  }

  return (
    <>
      <Stack gap="lg" pb="md">
        {data.map((crop) => (
          <CardCrop
            crop={crop}
            key={crop._id}
            cardProps={{ onClick: () => setSelectedCrop(crop) }}
          />
        ))}
      </Stack>
      <ViewCropModal
        isOpen={selectedCrop != undefined}
        onClose={() => setSelectedCrop(undefined)}
        crop={selectedCrop}
        setSelectedCrop={setSelectedCrop}
      />
    </>
  )
}
