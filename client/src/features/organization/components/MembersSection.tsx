import { Text } from '@mantine/core'

import { TablerIcon } from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import AccordionDataContainer from '@Common/ui/AccordionDataContainer'

import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

import { MembersTable, MembersTableAction } from './MembersTable'

type MembersSectionProps = {
  title: string
  organizationId: string
  memberStatus: MemberStatus
  searchValue: string
  searchField: 'name' | 'email'
  Icon: TablerIcon
  emptyMessage: string
  actions?: MembersTableAction[]
}

export function MembersSection({
  title,
  organizationId,
  memberStatus,
  searchValue,
  searchField,
  Icon,
  emptyMessage,
  actions,
}: MembersSectionProps) {
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
          actions={actions}
          userStatus={userStatus!}
        />
      )}
    </AccordionDataContainer>
  )
}
