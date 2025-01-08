import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Group, Select, Stack, Text } from '@mantine/core'

import {
  IconUser,
  IconUserCancel,
  IconUserShield,
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
  '/_protected/organization/$organizationId/members',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()

  const organizationQuery = useOrganizationQuery(organizationId)
  const userStatus = organizationQuery.data?.userStatus

  const membersQuery = useOrganizationMembersQuery(organizationId)
  const { isLoading } = membersQuery

  const [searchValue, setSearchValue] = useState('')
  const [searchField, setSearchField] = useState<'name' | 'email' | null>(
    'name',
  )

  return (
    <Stack gap="sm" mb="xl">
      <RefetchBtn query={membersQuery} ms="auto" />

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
        title="Propietario"
        memberStatus={MemberStatus.Owner}
        searchValue={searchValue}
        searchField={searchField!}
        Icon={IconUserShield}
        emptyMessage="No hay miembro propietario para esta organización"
      />

      <MembersSection
        title="Miembros activos"
        memberStatus={MemberStatus.Member}
        searchValue={searchValue}
        searchField={searchField!}
        showActions
        Icon={IconUser}
        emptyMessage="No hay miembros activos en esta organización"
      />

      {userStatus === MemberStatus.Owner && (
        <MembersSection
          title="Miembros bloqueados"
          memberStatus={MemberStatus.Blocked}
          searchValue={searchValue}
          searchField={searchField!}
          showActions
          Icon={IconUserCancel}
          emptyMessage="No hay miembros bloqueados en esta organización"
        />
      )}
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
