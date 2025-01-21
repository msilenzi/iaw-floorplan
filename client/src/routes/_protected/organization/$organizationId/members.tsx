import { createFileRoute } from '@tanstack/react-router'
import {
  IconUser,
  IconUserCancel,
  IconUserCheck,
  IconUserShield,
} from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import { MembersSection } from '@Organization/components/MembersSection'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useUpdateMemberStatusMutation } from '@Organization/hooks/useUpdateMemberStatusMutation'
import { OrganizationMembersLayout } from '@Organization/layout/OrganizationMembersLayout'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/members',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()

  const organizationQuery = useOrganizationQuery(organizationId)
  const userStatus = organizationQuery.data?.userStatus

  const { mutateAsync } = useUpdateMemberStatusMutation()

  return (
    <OrganizationMembersLayout>
      <MembersSection
        title="Propietario"
        memberStatus={MemberStatus.Owner}
        Icon={IconUserShield}
        emptyMessage="No hay miembro propietario para esta organización"
      />

      <MembersSection
        title="Miembros activos"
        memberStatus={MemberStatus.Member}
        Icon={IconUser}
        emptyMessage="No hay miembros activos en esta organización"
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
          Icon={IconUserCancel}
          emptyMessage="No hay miembros bloqueados en esta organización"
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
    </OrganizationMembersLayout>
  )
}
