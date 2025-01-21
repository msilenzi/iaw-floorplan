import type { MemberStatus } from '@Common/api'
import type { TablerIcon } from '@tabler/icons-react'
import type { MembersTableAction } from './MembersTable'

import { Text } from '@mantine/core'

import { AccordionDataContainer } from '@Common/ui/AccordionDataContainer'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useMemberSearchForm } from '@Organization/context/MemberSearchForm/MemberSearchFormContext'
import { useOrganizationMembersQuery } from '@Organization/hooks/useOrganizationMembersQuery'

import { MembersTable } from './MembersTable'

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
  const { organizationId } = useCurrentOrganization()
  const form = useMemberSearchForm()
  const { searchValue, searchField } = form.getValues()

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
      dataLength={filteredData.length}
    >
      {!isLoading && filteredData.length === 0 ? (
        <Text mt="sm">{emptyMessage}</Text>
      ) : (
        <MembersTable data={filteredData} actions={actions} />
      )}
    </AccordionDataContainer>
  )
}
