import type { MemberStatus } from '@Common/api'

import React, { useEffect } from 'react'

import { useNavigate } from '@tanstack/react-router'
import { Stack } from '@mantine/core'

import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { OrganizationMemberSearch } from '@Organization/components/OrganizationMemberSearch'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { MemberSearchFormProvider } from '@Organization/context/MemberSearchForm/MemberSearchFormProvider'
import { useMembersQuery } from '@Organization/hooks/useMembersQuery'
import { useOrganizationQuery } from '@Organization/hooks/useOrganizationQuery'

type OrganizationMembersLayoutProps = {
  requiredStatus?: MemberStatus
  header?: React.ReactNode
  children: React.ReactNode
}

export function OrganizationMembersLayout({
  requiredStatus,
  header,
  children,
}: OrganizationMembersLayoutProps) {
  const navigate = useNavigate()

  const { organizationId } = useCurrentOrganization()

  const organizationQuery = useOrganizationQuery()
  const userStatus = organizationQuery.data?.userStatus

  const membersQuery = useMembersQuery()

  useEffect(() => {
    if (organizationId && requiredStatus && requiredStatus !== userStatus) {
      void navigate({
        to: '/organization/$organizationId',
        params: { organizationId },
      })
    }
  }, [requiredStatus, organizationId, userStatus, navigate])

  if (organizationId && requiredStatus && requiredStatus !== userStatus) {
    void navigate({
      to: '/organization/$organizationId',
      params: { organizationId },
    })
    return null
  }

  return (
    <MemberSearchFormProvider>
      <Stack gap="xl" mb="xl">
        {header}
        <OrganizationMemberSearch isLoading={membersQuery.isLoading} />
        <RefetchBtn query={membersQuery} ms="auto" />
        {children}
      </Stack>
    </MemberSearchFormProvider>
  )
}
