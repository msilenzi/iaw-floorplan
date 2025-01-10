import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Group, Select, Stack } from '@mantine/core'

import {
  IconUser,
  IconUserCancel,
  IconUserCheck,
  IconUserShield,
} from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'

import { MembersSection } from '@Organization/components/MembersSection'
import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useUpdateMemberStatusMutation } from '@Organization/hooks/useUpdateMemberStatusMutation'

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

  const { mutateAsync } = useUpdateMemberStatusMutation()

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
        organizationId={organizationId}
      />

      <MembersSection
        title="Miembros activos"
        memberStatus={MemberStatus.Member}
        searchValue={searchValue}
        searchField={searchField!}
        Icon={IconUser}
        emptyMessage="No hay miembros activos en esta organización"
        organizationId={organizationId}
        actions={[
          {
            label: 'Bloquear',
            Icon: IconUserCancel,
            color: 'red',
            onClick: (m) => {
              void mutateAsync({
                organizationId: organizationId,
                memberId: m.user_id,
                newStatus: MemberStatus.Blocked,
              })
            },
          },
        ]}
      />

      {userStatus === MemberStatus.Owner && (
        <MembersSection
          title="Miembros bloqueados"
          memberStatus={MemberStatus.Blocked}
          searchValue={searchValue}
          searchField={searchField!}
          Icon={IconUserCancel}
          emptyMessage="No hay miembros bloqueados en esta organización"
          organizationId={organizationId}
          actions={[
            {
              label: 'Desbloquear',
              Icon: IconUserCheck,
              color: 'teal',
              onClick: (m) => {
                void mutateAsync({
                  organizationId: organizationId,
                  memberId: m.user_id,
                  newStatus: MemberStatus.Member,
                })
              },
            },
          ]}
        />
      )}
    </Stack>
  )
}
