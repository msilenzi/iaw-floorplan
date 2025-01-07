import { ActionIcon, Group, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'

import { IconDotsVertical } from '@tabler/icons-react'

import { MemberStatus, OrganizationMemberDto } from '@Common/api/generated'
import { DataTable } from '@Common/components/DataTable'
import { LastAccessedAtTd } from '@Common/ui/LastAccessedAtTd'
import { UserAvatar } from '@Common/ui/UserAvatar'

type MembersTableProps = {
  data: OrganizationMemberDto[]
  isLoading: boolean
  userStatus: MemberStatus
  showActions: boolean
}

export function MembersTable({
  data,
  isLoading,
  userStatus,
  showActions,
}: MembersTableProps) {
  const { hovered, ref } = useHover()

  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      loadingRowsLength={1}
      rowKey="user_id"
      columnsConfiguration={[
        {
          key: 'name',
          label: 'Nombre',
          renderRow: (value, { picture }) => (
            <Group wrap="nowrap">
              <UserAvatar
                username={value}
                picture={picture}
                radius="xl"
                size="md"
              />
              <Text span size="sm" truncate="end">
                {value}
              </Text>
            </Group>
          ),
        },
        {
          key: 'email',
          label: 'Correo',
          renderRow: (value) => value,
          hideBreakpoint: 'xs',
        },
        {
          exclude: userStatus !== MemberStatus.Owner,
          key: 'lastAccessedAt',
          label: 'Último acceso',
          renderRow: (value) => <LastAccessedAtTd value={value!} />,
          props: {
            th: { w: 120 },
          },
        },
        {
          exclude: userStatus !== MemberStatus.Owner,
          key: 'user_id',
          label: '',
          renderRow: () => {
            if (!showActions) return null
            return (
              <ActionIcon
                size="md"
                variant={hovered ? 'default' : 'transparent'}
                color={hovered ? undefined : 'dimmed'}
                ref={ref}
              >
                <IconDotsVertical />
              </ActionIcon>
            )
          },
          props: { th: { w: 50 } },
        },
      ]}
    />
  )
}
