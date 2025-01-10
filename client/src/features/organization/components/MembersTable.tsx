import { DefaultMantineColor, Group, Menu, Text } from '@mantine/core'

import { TablerIcon } from '@tabler/icons-react'

import { MemberStatus, OrganizationMemberDto } from '@Common/api/generated'
import { DataTable } from '@Common/components/DataTable'
import { LastAccessedAtTd } from '@Common/ui/LastAccessedAtTd'
import { TableActionButton } from '@Common/ui/TableActionButton'
import { UserAvatar } from '@Common/ui/UserAvatar'

import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

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
  const organizationId = useOrganizationStore((state) => state.organizationId!)
  const userStatus = useOrganizationStore((state) => state.userStatus!)
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
          renderRow: (_, rowData) =>
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
  return (
    <Menu withArrow position="left" shadow="md">
      <Menu.Target>
        <TableActionButton />
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
