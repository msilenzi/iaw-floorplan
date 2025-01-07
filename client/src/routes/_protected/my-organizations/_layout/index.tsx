import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Box, Space, Stack, Text, Title, rem } from '@mantine/core'

import { BasicOrganizationDto, MemberStatus } from '@Common/api/generated'
import { DataTable } from '@Common/components/DataTable'
import { LastAccessedAtTd } from '@Common/ui/LastAccessedAtTd'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'

import { MyOrganizationsAddBtn } from '@MyOrganizations/components/MyOrganizationAddBtn'
import {
  ORGANIZATIONS_QUERY_KEY,
  useOrganizationsQuery,
} from '@MyOrganizations/hooks/useOrganizationsQuery'
import { displayMemberStatus } from '@MyOrganizations/utils/displayMemberStatus'

export const Route = createFileRoute('/_protected/my-organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useOrganizationsQuery()
  const { data, isLoading } = query

  const [searchValue, setSearchValue] = useState('')

  if (!isLoading && data?.length === 0) {
    return (
      <Box m="0" style={{ maxWidth: rem('500px') }}>
        <Space h="lg" />
        <Title order={2} mb="xs">
          No se encontraron organizaciones
        </Title>
        <Text style={{ textWrap: 'balance' }} mb="lg">
          Parece que todavía no perteneces a ninguna organización. Podés crear
          una nueva o unirte a una utilizando su código.
        </Text>
        <MyOrganizationsAddBtn />
      </Box>
    )
  }

  const activeOrganizations = filterOrganizations(data, searchValue)

  return (
    <Stack gap="sm" pb="xl" align="center">
      <SearchInput
        value={searchValue}
        setValue={setSearchValue}
        placeholder="Buscar por nombre"
        disabled={isLoading}
      />
      <RefetchBtn query={query} ms="auto" mt="xl" />
      <OrganizationTable
        organizations={activeOrganizations}
        isLoading={isLoading}
      />
    </Stack>
  )
}

type OrganizationsTableProps = {
  organizations: BasicOrganizationDto[]
  isLoading: boolean
}

function OrganizationTable({
  organizations,
  isLoading,
}: OrganizationsTableProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  function handleClick(organizationId: string) {
    void navigate({
      to: `/organization/$organizationId`,
      params: { organizationId },
    })

    queryClient.setQueryData(
      [ORGANIZATIONS_QUERY_KEY],
      (oldData: BasicOrganizationDto[]) => {
        return oldData.map((org) => {
          if (org._id !== organizationId) return org
          return { ...org, lastAccessedAt: new Date().toISOString() }
        })
      },
    )
  }

  return (
    <DataTable
      data={organizations}
      isLoading={isLoading}
      loadingRowsLength={5}
      rowKey="_id"
      props={{
        table: { highlightOnHover: true, style: { cursor: 'pointer' } },
        tr: ({ _id }) => ({ onClick: () => handleClick(_id) }),
      }}
      columnsConfiguration={[
        {
          key: 'name',
          label: 'Nombre',
          renderRow: (value) => value,
        },
        {
          key: 'status',
          label: 'Estado',
          renderRow: (value) => displayMemberStatus(value),
          props: {
            th: { w: 100 },
            td: { tt: 'capitalize' },
          },
          hideBreakpoint: 'xs',
        },
        {
          key: 'lastAccessedAt',
          label: 'Último acceso',
          renderRow: (value) => <LastAccessedAtTd value={value} />,
          props: {
            th: { w: 120 },
          },
          hideBreakpoint: 'xxs',
        },
      ]}
    />
  )
}

function filterOrganizations(
  data: BasicOrganizationDto[] | undefined,
  searchValue: string,
): BasicOrganizationDto[] {
  if (!data) return []

  return data
    .filter(({ status, name }) => {
      if (status !== MemberStatus.Owner && status !== MemberStatus.Member) {
        return false
      }
      return name.toLowerCase().includes(searchValue.toLowerCase())
    })
    .sort(
      (a, b) =>
        new Date(b.lastAccessedAt ?? 0).getTime() -
        new Date(a.lastAccessedAt ?? 0).getTime(),
    )
}
