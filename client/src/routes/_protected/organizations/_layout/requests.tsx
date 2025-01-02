import { createFileRoute } from '@tanstack/react-router'

import { Accordion, ActionIcon, Badge, Group, Text, Title } from '@mantine/core'

import { IconUserQuestion, IconUserX, IconX } from '@tabler/icons-react'

import { FindAllOrganizationsDto, MemberStatus } from '@Common/api/generated'

import useOrganizationsQuery from '@Organizations/hooks/useOrganizationsQuery'

export const Route = createFileRoute(
  '/_protected/organizations/_layout/requests',
)({
  component: RouteComponent,
})

type GroupedRequestsByStatus = {
  [MemberStatus.Pending]: FindAllOrganizationsDto[]
  [MemberStatus.Rejected]: FindAllOrganizationsDto[]
}

function RouteComponent() {
  const { data, isLoading } = useOrganizationsQuery()

  if (isLoading || !data) {
    return <>Loading...</>
  }

  const requests = data.reduce(
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
    <Accordion variant="separated" defaultValue={MemberStatus.Pending}>
      <Accordion.Item value={MemberStatus.Pending} style={{ border: 'none' }}>
        <Accordion.Control icon={<IconUserQuestion stroke={2} />}>
          <Group align="center" gap="xs">
            <Badge color="gray" size="md" radius="sm" bg="dark.4" bd="none">
              {requests[MemberStatus.Pending].length}
            </Badge>
            <Title order={4}>Solicitudes pendientes </Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <RequestList
            requests={requests[MemberStatus.Pending]}
            showDeleteBtn
            onDelete={handleCancelRequest}
          />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value={MemberStatus.Rejected} style={{ border: 'none' }}>
        <Accordion.Control icon={<IconUserX stroke={2} />}>
          <Group align="center" gap="xs">
            <Badge color="gray" size="md" radius="sm" bg="dark.4" bd="none">
              {requests[MemberStatus.Rejected].length}
            </Badge>
            <Title order={4}>Solicitudes rechazadas</Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <RequestList requests={requests[MemberStatus.Rejected]} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

type RequestListProps = {
  requests: FindAllOrganizationsDto[]
  showDeleteBtn?: boolean
  onDelete?: (id: string) => void
}

function RequestList({
  requests,
  showDeleteBtn = false,
  onDelete,
}: RequestListProps) {
  if (requests.length === 0) {
    return 'No hay solicitudes'
  }

  return requests.map(({ _id, name }) => (
    <Group
      key={_id}
      wrap="nowrap"
      gap="xs"
      py="sm"
      style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}
    >
      <Text
        size="md"
        span
        truncate="end"
        display="inline-block"
        style={{ overflow: 'hidden', flexGrow: 1 }}
      >
        {name}
      </Text>
      {showDeleteBtn && (
        <ActionIcon
          size="md"
          variant="default"
          color="red"
          aria-label="Cancelar solicitud"
          title="Cancelar solicitud"
          onClick={() => onDelete && onDelete(_id)}
        >
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      )}
    </Group>
  ))
}
