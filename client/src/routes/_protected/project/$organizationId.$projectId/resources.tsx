import type { ProjectResourcesFindAllDto } from '@Common/api'
import type { UseQueryResult } from '@tanstack/react-query'

import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { Group, Stack, Text } from '@mantine/core'

import { useProjectResourcesQuery } from '@/features/project-resources/hooks/useProjectResourcesQuery'
import { getResourceIcon } from '@/features/project-resources/utils/getResourceIcon'
import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { DataTable } from '@Common/components/DataTable'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'
import { UserInfo } from '@Common/ui/UserInfo'
import { getErrorResponse } from '@Common/utils/errorHandling'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/resources',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizationId, projectId } = Route.useParams()
  const query = useProjectResourcesQuery(organizationId, projectId)
  const { data, isLoading, isError } = query

  const [searchValue, setSearchValue] = useState('')

  if (isError) {
    return <ProjectResourcesError query={query} />
  }

  if (!isLoading && data?.length === 0) {
    return (
      <Stack gap="sm" pb="xl" align="start">
        <RefetchBtn query={query} ms="auto" />
        <BasicCtaBanner
          title="No se encontraron recursos"
          description='No se encontraron recursos para este proyecto. Podés añadir nuevos recursos haciendo click en el botón "Agregar".'
        />
      </Stack>
    )
  }

  const searchedResources = searchResources(data, searchValue)

  return (
    <Stack gap="sm" pb="xl" align="center">
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        onClear={() => setSearchValue('')}
        placeholder="Buscar por nombre"
        disabled={isLoading}
      />
      <RefetchBtn query={query} ms="auto" mt="xl" />
      {!isLoading && searchedResources.length === 0 ? (
        <Text>
          No se encontraron recursos con el nombre &quot;{searchValue}&quot;
        </Text>
      ) : (
        <ResourcesTable isLoading={isLoading} resources={searchedResources} />
      )}
    </Stack>
  )
}

function ProjectResourcesError({ query }: { query: UseQueryResult }) {
  const { error } = query

  const { title, message } = getErrorResponse(error, {
    title: 'No pudimos listar los recursos del proyecto',
  })

  return (
    <Stack gap="md" align="start">
      <RefetchBtn query={query} ms="auto" mt="xl" />
      <BasicCtaBanner title={title} description={message} />
    </Stack>
  )
}

type ResourcesTableProps = {
  resources: ProjectResourcesFindAllDto[]
  isLoading: boolean
}

export function ResourcesTable({ resources, isLoading }: ResourcesTableProps) {
  return (
    <DataTable
      data={resources}
      isLoading={isLoading}
      loadingRowsLength={5}
      rowKey="_id"
      columnsConfiguration={[
        {
          key: 'name',
          label: 'Nombre',
          rowRender: (value, rowData) => {
            const Icon = getResourceIcon(rowData.mimetype)

            return (
              <Group align="center">
                <Icon />
                {value}
              </Group>
            )
          },
        },
        {
          key: 'createdBy',
          label: 'Creado por',
          rowRender: (value) => (
            <UserInfo
              user={value}
              innerProps={{
                avatar: { size: 'sm' },
                name: { fz: 'sm' },
                email: { hidden: true },
              }}
            />
          ),
          props: {
            th: { w: 200 },
          },
          hideBreakpoint: 'sm',
        },
      ]}
    />
  )
}

function searchResources(
  resources: ProjectResourcesFindAllDto[] | undefined,
  searchValue: string,
) {
  if (!resources) return []
  return resources.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  )
}
