import { useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  ActionIcon,
  CopyButton,
  Group,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'

import {
  IconCopy,
  IconCopyCheck,
  IconUserPlus,
  IconUserQuestion,
  IconUserX,
  TablerIcon,
} from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import AccordionDataContainer from '@Common/ui/AccordionDataContainer'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'

import { MembersTable } from '@Organization/components/MembersTable'
import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/requests',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()

  const navigate = useNavigate()

  const organizationQuery = useOrganizationQuery(organizationId)
  const userStatus = organizationQuery.data?.userStatus

  const membersQuery = useOrganizationMembersQuery(organizationId)
  const { isLoading } = membersQuery

  const [searchValue, setSearchValue] = useState('')
  const [searchField, setSearchField] = useState<'name' | 'email' | null>(
    'name',
  )

  if (userStatus !== MemberStatus.Owner) {
    void navigate({
      to: '/organization/$organizationId',
      params: { organizationId },
    })

    return null
  }

  return (
    <Stack gap="sm" mb="xl">
      <AccordionDataContainer
        title="Invita a otros usuarios"
        Icon={IconUserPlus}
      >
        <Text mb="xs" mt="xs">
          Comparta el siguiente código para que otras personas puedan unirse:
        </Text>
        <Group align="center" justify="start" gap="xs">
          <Title order={3} ff="monospace">
            {organizationId}
          </Title>
          <CopyButton value={organizationId}>
            {({ copied, copy }) => (
              <Tooltip
                color="dark"
                label={copied ? 'Copiado' : 'Copiar'}
                position="right"
              >
                <ActionIcon
                  variant="transparent"
                  color={copied ? 'teal.6' : 'dark.1'}
                  onClick={copy}
                >
                  {copied ? <IconCopyCheck /> : <IconCopy />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </AccordionDataContainer>

      <RefetchBtn query={membersQuery} ms="auto" mt="lg" />

      <Group mt="xs" align="center" justify="center">
        <SearchInput
          value={searchValue}
          setValue={setSearchValue}
          placeholder={`Buscar por ${searchField === 'name' ? 'nombre' : 'correo'}`}
          disabled={isLoading}
        />
        <Select
          value={searchField}
          onChange={(value) => setSearchField(value as 'name' | 'email')}
          data={[
            { label: 'Nombre', value: 'name' },
            { label: 'Correo', value: 'email' },
          ]}
          w="12ch"
          allowDeselect={false}
        />
      </Group>

      <MembersSection
        title="Solicitudes pendientes"
        memberStatus={MemberStatus.Pending}
        searchValue={searchValue}
        searchField={searchField!}
        showActions
        Icon={IconUserQuestion}
        emptyMessage="No hay solicitudes pendientes en esta organización"
      />

      <MembersSection
        title="Solicitudes rechazadas"
        memberStatus={MemberStatus.Rejected}
        searchValue={searchValue}
        searchField={searchField!}
        showActions
        Icon={IconUserX}
        emptyMessage="No hay solicitudes rechazadas en esta organización"
      />
    </Stack>
  )
}

type MembersSectionProps = {
  title: string
  memberStatus: MemberStatus
  searchValue: string
  searchField: 'name' | 'email'
  showActions?: boolean
  Icon: TablerIcon
  emptyMessage: string
}

export function MembersSection({
  title,
  memberStatus,
  searchValue,
  searchField,
  showActions = false,
  Icon,
  emptyMessage,
}: MembersSectionProps) {
  const { organizationId } = Route.useParams()

  const organizationQuery = useOrganizationQuery(organizationId)
  const userStatus = organizationQuery.data?.userStatus

  const { data, isLoading } = useOrganizationMembersQuery(organizationId)

  const filteredData =
    data
      ?.filter(
        (member) =>
          member.status === memberStatus &&
          member[searchField].toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
      ) ?? []

  return (
    <AccordionDataContainer
      title={title}
      Icon={Icon}
      dataLength={filteredData?.length}
    >
      {!isLoading && filteredData.length === 0 ? (
        <Text mt="sm">{emptyMessage}</Text>
      ) : (
        <MembersTable
          data={filteredData}
          isLoading={isLoading}
          showActions={showActions}
          userStatus={userStatus!}
        />
      )}
    </AccordionDataContainer>
  )
}
