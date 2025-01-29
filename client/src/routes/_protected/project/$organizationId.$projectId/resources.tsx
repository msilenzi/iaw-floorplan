import type { ProjectResourcesFindAllDto } from '@Common/api'
import type { UseQueryResult } from '@tanstack/react-query'

import { useRef, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { Group, Menu, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { DataTable } from '@Common/components/DataTable'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'
import { TableActionButton } from '@Common/ui/TableActionButton'
import { UserInfo } from '@Common/ui/UserInfo'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { RenameResourceModal } from '@ProjectResources/components/RenameResourceModal'
import { ViewResourceModal } from '@ProjectResources/components/ViewResourceModal'
import { useProjectResourcesQuery } from '@ProjectResources/hooks/useProjectResourcesQuery'
import { getResourceIcon } from '@ProjectResources/utils/getResourceIcon'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/resources',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useParams()
  const query = useProjectResourcesQuery(projectId)
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
  const [isOpen, { open, close }] = useDisclosure(false)
  const resourceRef = useRef('')

  function showModal(resourceId: string) {
    resourceRef.current = resourceId
    open()
  }

  return (
    <>
      <DataTable
        data={resources}
        isLoading={isLoading}
        loadingRowsLength={5}
        rowKey="_id"
        props={{
          table: { highlightOnHover: true, style: { cursor: 'pointer' } },
        }}
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
            props: {
              td: (rowData) => ({ onClick: () => showModal(rowData._id) }),
            },
          },
          {
            key: 'createdAt',
            label: 'Fecha de creación',
            rowRender: (value) =>
              new Date(value).toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            props: {
              th: { w: '20ch' },
              td: (rowData) => ({ onClick: () => showModal(rowData._id) }),
            },
            hideBreakpoint: 'xs',
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
              th: { w: '30ch' },
              td: (rowData) => ({ onClick: () => showModal(rowData._id) }),
            },
            hideBreakpoint: 'sm',
          },
          {
            key: '_id',
            label: '',
            rowRender: (_, rowData) => <TableButton resource={rowData} />,
            props: { th: { w: 50 } },
          },
        ]}
      />
      <ViewResourceModal
        isOpen={isOpen}
        onClose={close}
        resourceId={resourceRef.current}
      />
    </>
  )
}

type TableButtonProps = {
  resource: ProjectResourcesFindAllDto
}

function TableButton({ resource }: TableButtonProps) {
  const [isOpen, { open, close }] = useDisclosure(false)

  return (
    <>
      <Menu withArrow position="left" shadow="md">
        <Menu.Target>
          <TableActionButton />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit width={20} height={20} stroke={1.5} />}
            onClick={open}
          >
            Renombrar
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <RenameResourceModal
        isOpen={isOpen}
        onClose={close}
        resource={resource}
      />
    </>
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
