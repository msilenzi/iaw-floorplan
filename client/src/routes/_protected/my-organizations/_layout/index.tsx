import { useState } from 'react'

import { isAxiosError } from 'axios'

import { UseQueryResult, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Box, Space, Stack, Text, Title, rem } from '@mantine/core'

import { BasicOrganizationDto, MemberStatus } from '@Common/api/generated'
import { isServerException } from '@Common/api/types/ServerException'
import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
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
  const { data, isLoading, isError } = query

  const [searchValue, setSearchValue] = useState('')

  const activeOrganizations = filterActiveOrganizations(data)

  if (isError) {
    return <MyOrganizationsError query={query} />
  }

  if (!isLoading && activeOrganizations.length === 0) {
    return (
      <Box m="0" style={{ maxWidth: rem('500px') }}>
        <Space h="lg" />
        <Title order={2} mb="xs">
          No se encontraron organizaciones
        </Title>
        <Text style={{ textWrap: 'balance' }} mb="lg">
          Parece que todavía no pertenecés a ninguna organización. Podés crear
          una nueva, o unirte a una utilizando su código.
        </Text>
        <Text style={{ textWrap: 'balance' }} mb="lg">
          En la sección <i>&quot;Mis solicitudes&quot;</i> podés ver el estado
          de tus solicitudes.
        </Text>
        <MyOrganizationsAddBtn />
      </Box>
    )
  }

  const searchedOrganizations = searchOrganizations(
    activeOrganizations,
    searchValue,
  )

  return (
    <Stack gap="sm" pb="xl" align="center">
      <SearchInput
        value={searchValue}
        setValue={setSearchValue}
        placeholder="Buscar por nombre"
        disabled={isLoading}
      />
      <RefetchBtn query={query} ms="auto" mt="xl" />
      {!isLoading && searchedOrganizations.length === 0 ? (
        <Text>
          No se encontraron organizaciones con el nombre &quot;{searchValue}
          &quot;
        </Text>
      ) : (
        <OrganizationsTable
          organizations={searchedOrganizations}
          isLoading={isLoading}
        />
      )}
    </Stack>
  )
}

function MyOrganizationsError({ query }: { query: UseQueryResult }) {
  const { error } = query

  let title = 'Error de conexión'
  let message = 'No pudimos establecer la conexión con el servidor.'

  if (isAxiosError(error) && isServerException(error.response?.data)) {
    const e = error.response.data
    if (e.statusCode >= 500) {
      title = '¡Ups! Algo salió mal'
      message =
        'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    } else if (e.statusCode >= 400) {
      title = 'No pudimos listar las organizaciones'
      message = e.message
    }
  }

  return (
    <Stack gap="md" align="start">
      <RefetchBtn query={query} ms="auto" mt="xl" />
      <BasicCtaBanner title={title} description={message} />
    </Stack>
  )
}

type OrganizationsTableProps = {
  organizations: BasicOrganizationDto[]
  isLoading: boolean
}

function OrganizationsTable({
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
        tr: ({ _id }) => ({
          onClick: () => handleClick(_id),
          role: 'link',
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick(_id)
          },
        }),
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

function filterActiveOrganizations(
  organizations?: BasicOrganizationDto[],
): BasicOrganizationDto[] {
  return (
    organizations?.filter(
      ({ status }) =>
        status === MemberStatus.Owner || status === MemberStatus.Member,
    ) ?? []
  )
}

function searchOrganizations(
  organizations: BasicOrganizationDto[],
  searchValue: string,
): BasicOrganizationDto[] {
  return organizations
    .filter(({ name }) => {
      return name.toLowerCase().includes(searchValue.toLowerCase())
    })
    .sort(
      (a, b) =>
        new Date(b.lastAccessedAt ?? 0).getTime() -
        new Date(a.lastAccessedAt ?? 0).getTime(),
    )
}
