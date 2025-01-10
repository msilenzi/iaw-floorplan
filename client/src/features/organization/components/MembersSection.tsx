import { Text } from '@mantine/core'

import { TablerIcon } from '@tabler/icons-react'

import { MemberStatus } from '@Common/api/generated'
import AccordionDataContainer from '@Common/ui/AccordionDataContainer'

import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

import { MembersTable, MembersTableAction } from './MembersTable'

type MembersSectionProps = {
  title: string
  memberStatus: MemberStatus
  Icon: TablerIcon
  emptyMessage: string
  actions?: MembersTableAction[]
}

export function MembersSection({
  title,
  memberStatus,
  Icon,
  emptyMessage,
  actions,
}: MembersSectionProps) {
  const organizationId = useOrganizationStore((state) => state.organizationId!)
  const searchValue = useOrganizationStore((state) => state.searchValue)
  const searchField = useOrganizationStore((state) => state.searchField)

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
        <MembersTable data={filteredData} actions={actions} />
      )}
    </AccordionDataContainer>
  )
}
