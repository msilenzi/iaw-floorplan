import type { OrganizationMemberDto } from '@Common/api'
import type { DefaultMantineColor } from '@mantine/core'
import type { TablerIcon } from '@tabler/icons-react'

import { Group, Menu, Text } from '@mantine/core'

import { MemberStatus } from '@Common/api'
import { DataTable } from '@Common/components/DataTable'
import { LastAccessedAtTd } from '@Common/ui/LastAccessedAtTd'
import { TableActionButton } from '@Common/ui/TableActionButton'
import { UserAvatar } from '@Common/ui/UserAvatar'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useOrganizationMembersQuery } from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

export type MembersTableAction = {
  onClick: (member: OrganizationMemberDto) => void
  Icon: TablerIcon
  label: string
  color?: DefaultMantineColor
}

type MembersTableProps = {
  data: OrganizationMemberDto[]
  actions?: MembersTableAction[]
}

export function MembersTable({ data, actions }: MembersTableProps) {
  const { organizationId } = useCurrentOrganization()

  const organizationQuery = useOrganizationQuery(organizationId)
  const userStatus = organizationQuery.data?.userStatus

  const { isLoading } = useOrganizationMembersQuery(organizationId)

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
          rowRender: (value, { picture }) => (
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
          hideBreakpoint: 'xs',
        },
        {
          exclude: userStatus !== MemberStatus.Owner,
          key: 'lastAccessedAt',
          label: 'Último acceso',
          rowRender: (value) => <LastAccessedAtTd value={value} />,
          props: {
            th: { w: 120 },
          },
        },
        {
          exclude: userStatus !== MemberStatus.Owner,
          key: 'user_id',
          label: '',
          rowRender: (_, rowData) =>
            actions ? <TableButton actions={actions} member={rowData} /> : null,
          props: { th: { w: 50 } },
        },
      ]}
    />
  )
}

type TableButton = {
  member: OrganizationMemberDto
  actions: MembersTableAction[]
}

function TableButton({ member, actions }: TableButton) {
  const { organizationId } = useCurrentOrganization()

  const { isFetching } = useOrganizationMembersQuery(organizationId)

  return (
    <Menu withArrow position="left" shadow="md">
      <Menu.Target>
        <TableActionButton loading={isFetching} />
      </Menu.Target>
      <Menu.Dropdown>
        {actions.map(({ label, Icon, color, onClick }) => (
          <Menu.Item
            key={label}
            leftSection={<Icon width={20} height={20} stroke={1.5} />}
            color={color}
            onClick={() => onClick(member)}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
