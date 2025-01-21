import { createFileRoute } from '@tanstack/react-router'
import { IconUserCheck, IconUserQuestion, IconUserX } from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import { InvitationCode } from '@Organization/components/InvitationCode'
import { MembersSection } from '@Organization/components/MembersSection'
import { useUpdateMemberStatusMutation } from '@Organization/hooks/useUpdateMemberStatusMutation'
import { OrganizationMembersLayout } from '@Organization/layout/OrganizationMembersLayout'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/requests',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId } = Route.useParams()
  const { mutateAsync } = useUpdateMemberStatusMutation()

  return (
    <OrganizationMembersLayout
      header={<InvitationCode />}
      requiredStatus={MemberStatus.Owner}
    >
      <MembersSection
        title="Solicitudes pendientes"
        memberStatus={MemberStatus.Pending}
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
        memberStatus={MemberStatus.Rejected}
        Icon={IconUserX}
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
    </OrganizationMembersLayout>
  )
}
