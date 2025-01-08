import { createFileRoute } from '@tanstack/react-router'

import { ActionIcon, Group, Text } from '@mantine/core'

import { IconUserQuestion, IconUserX, IconX } from '@tabler/icons-react'

import { BasicOrganizationDto, MemberStatus } from '@Common/api/generated'
import { DataTable } from '@Common/components/DataTable'
import AccordionDataContainer from '@Common/ui/AccordionDataContainer'
import { RefetchBtn } from '@Common/ui/RefetchBtn'

import { useOrganizationsQuery } from '@MyOrganizations/hooks/useOrganizationsQuery'

export const Route = createFileRoute(
  '/_protected/my-organizations/_layout/requests',
)({
  component: RouteComponent,
})

type GroupedRequestsByStatus = {
  [MemberStatus.Pending]: BasicOrganizationDto[]
  [MemberStatus.Rejected]: BasicOrganizationDto[]
}

function RouteComponent() {
  const query = useOrganizationsQuery()
  const { data, isLoading } = query

  const requests = data?.reduce(
    (acc, request) => {
      if (request.status === MemberStatus.Pending) {
        acc[MemberStatus.Pending].push(request)
      } else if (request.status === MemberStatus.Rejected) {
        acc[MemberStatus.Rejected].push(request)
      }
      return acc
    },
    {
      [MemberStatus.Pending]: [],
      [MemberStatus.Rejected]: [],
    } as GroupedRequestsByStatus,
  )

  function handleCancelRequest(id: string) {
    console.log('delete', id)
  }

  return (
    <>
      <Group>
        <RefetchBtn query={query} ms="auto" />
      </Group>
      <AccordionDataContainer
        title="Solicitudes pendientes"
        Icon={IconUserQuestion}
        dataLength={requests?.[MemberStatus.Pending].length}
      >
        {!isLoading && requests?.[MemberStatus.Pending].length === 0 ? (
          <Text mt="sm">No tienes solicitudes pendientes</Text>
        ) : (
          <DataTable
            data={requests?.[MemberStatus.Pending] ?? []}
            isLoading={isLoading}
            loadingRowsLength={3}
            rowKey="_id"
            columnsConfiguration={[
              {
                key: 'name',
                label: 'Organización',
                renderRow: (value) => value,
              },
              {
                key: '_id',
                label: '',
                renderRow: (value) => (
                  <ActionIcon
                    size="md"
                    variant="default"
                    aria-label="Cancelar solicitud"
                    title="Cancelar solicitud"
                    onClick={() => handleCancelRequest(value)}
                  >
                    <IconX
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                ),
                props: { th: { w: 50 } },
              },
            ]}
          />
        )}
      </AccordionDataContainer>
      <AccordionDataContainer
        title="Solicitudes rechazadas"
        Icon={IconUserX}
        dataLength={requests?.[MemberStatus.Rejected].length}
      >
        {!isLoading && requests?.[MemberStatus.Pending].length === 0 ? (
          <Text mt="sm">No tienes solicitudes rechazadas</Text>
        ) : (
          <DataTable
            data={requests?.[MemberStatus.Rejected] ?? []}
            isLoading={isLoading}
            loadingRowsLength={3}
            rowKey="_id"
            columnsConfiguration={[
              {
                key: 'name',
                label: 'Organización',
                renderRow: (value) => value,
              },
            ]}
          />
        )}
      </AccordionDataContainer>
    </>
  )
}
