import React, { useEffect } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { Stack } from '@mantine/core'

import { MemberStatus } from '@Common/api/generated'
import { RefetchBtn } from '@Common/ui/RefetchBtn'

import { OrganizationMemberSearch } from '@Organization/components/OrganizationMemberSearch'
import useOrganizationMembersQuery from '@Organization/hooks/useOrganizationMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'
import { useOrganizationStore } from '@Organization/store/useOrganizationStore'

type OrganizationMembersLayoutProps = {
  organizationId: string
  requiredStatus?: MemberStatus
  header?: React.ReactNode
  children: React.ReactNode
}

export function OrganizationMembersLayout({
  organizationId,
  requiredStatus,
  header,
  children,
}: OrganizationMembersLayoutProps) {
  const navigate = useNavigate()

  const setOrganizationId = useOrganizationStore((s) => s.setOrganizationId)
  const setUserStatus = useOrganizationStore((s) => s.setUserStatus)
  const reset = useOrganizationStore((s) => s.reset)

  const organizationQuery = useOrganizationQuery(organizationId)
  const userStatus = organizationQuery.data?.userStatus

  const membersQuery = useOrganizationMembersQuery(organizationId)

  useEffect(() => {
    setOrganizationId(organizationId)
    if (userStatus) setUserStatus(userStatus)
    return () => reset()
  }, [organizationId, reset, setOrganizationId, setUserStatus, userStatus])

  if (requiredStatus && requiredStatus !== userStatus) {
    void navigate({
      to: '/organization/$organizationId',
      params: { organizationId },
    })
    return null
  }

  return (
    <Stack gap="xl" mb="xl">
      {header}
      <OrganizationMemberSearch isLoading={membersQuery.isLoading} />
      <RefetchBtn query={membersQuery} ms="auto" />
      {children}
    </Stack>
  )
}
