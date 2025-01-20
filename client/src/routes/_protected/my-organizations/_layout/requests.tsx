import { createFileRoute } from '@tanstack/react-router'

import { ActionIcon, Group, Stack, Text } from '@mantine/core'

import { IconUserQuestion, IconUserX, IconX } from '@tabler/icons-react'

import { BasicOrganizationDto, MemberStatus } from '@Common/api/generated'
import { DataTable } from '@Common/components/DataTable'
import { AccordionDataContainer } from '@Common/ui/AccordionDataContainer'
import { Popconfirm } from '@Common/ui/Popconfirm'
import { RefetchBtn } from '@Common/ui/RefetchBtn'

import { useDeleteRequestMutation } from '@MyOrganizations/hooks/useDeleteRequestMutation'
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

  return (
    <Stack gap="xl" mb="xl">
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
              },
              {
                key: '_id',
                label: '',
                rowRender: (value) => <CancelRequestBtn requestId={value} />,
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
            columnsConfiguration={[{ key: 'name', label: 'Organización' }]}
          />
        )}
      </AccordionDataContainer>
    </Stack>
  )
}

type CancelRequestBtnProps = {
  requestId: string
}

export function CancelRequestBtn({ requestId }: CancelRequestBtnProps) {
  const { isPending, mutateAsync } = useDeleteRequestMutation()

  return (
    <Popconfirm
      title="¿Desea cancelar la solicitud?"
      description="Esta acción no se puede deshacer. Si cancelas, deberás realizar una nueva solicitud en caso de querer unirte nuevamente."
      confirmText="Si, cancelar"
      cancelText="No, mantener"
      innerProps={{
        confirmBtn: {
          color: 'red.8',
          loading: isPending,
          onClick: () => void mutateAsync(requestId),
        },
      }}
    >
      <ActionIcon
        size="md"
        variant="default"
        aria-label="Cancelar solicitud"
        title="Cancelar solicitud"
        loading={isPending}
      >
        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Popconfirm>
  )
}
