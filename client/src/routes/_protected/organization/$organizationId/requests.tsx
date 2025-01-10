import { useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Group, Select, Stack } from '@mantine/core'

import { IconUserCheck, IconUserQuestion, IconUserX } from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'

import { InvitationCode } from '@Organization/components/InvitationCode'
import { MembersSection } from '@Organization/components/MembersSection'
import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useUpdateMemberStatusMutation } from '@Organization/hooks/useUpdateMemberStatusMutation'

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

  const { mutateAsync } = useUpdateMemberStatusMutation()

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
      <InvitationCode organizationId={organizationId} />

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
        organizationId={organizationId}
        memberStatus={MemberStatus.Pending}
        searchValue={searchValue}
        searchField={searchField!}
        Icon={IconUserQuestion}
        emptyMessage="No hay solicitudes pendientes en esta organización"
        actions={[
          {
            label: 'Aceptar',
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
          {
            label: 'Rechazar',
            Icon: IconUserX,
            color: 'red',
            onClick: (m) => {
              void mutateAsync({
                organizationId: organizationId,
                memberId: m.user_id,
                newStatus: MemberStatus.Rejected,
              })
            },
          },
        ]}
      />

      <MembersSection
        title="Solicitudes rechazadas"
        organizationId={organizationId}
        memberStatus={MemberStatus.Rejected}
        searchValue={searchValue}
        searchField={searchField!}
        Icon={IconUserQuestion}
        emptyMessage="No hay solicitudes rechazadas en esta organización"
        actions={[
          {
            label: 'Aceptar',
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
    </Stack>
  )
}
