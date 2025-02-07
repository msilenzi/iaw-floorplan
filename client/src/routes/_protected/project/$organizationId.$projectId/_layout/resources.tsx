import type { ResourcesFindAllDto } from '@Common/api'
import type { UseQueryResult } from '@tanstack/react-query'

import { useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Group, Menu, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { DataTable } from '@Common/components/DataTable'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'
import { TableActionButton } from '@Common/ui/TableActionButton'
import { UserInfo } from '@Common/ui/UserInfo'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { DeleteResourceModal } from '@Resources/components/DeleteResourceModal'
import { RenameResourceModal } from '@Resources/components/RenameResourceModal'
import { useResourcesQuery } from '@Resources/hooks/useResourcesQuery'
import { getResourceIcon } from '@Resources/utils/getResourceIcon'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/_layout/resources',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useResourcesQuery()
  const { data, isLoading, isError } = query

  const [searchValue, setSearchValue] = useState('')

  if (isError) {
    return <ResourcesError query={query} />
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

function ResourcesError({ query }: { query: UseQueryResult }) {
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
  resources: ResourcesFindAllDto[]
  isLoading: boolean
}

export function ResourcesTable({ resources, isLoading }: ResourcesTableProps) {
  const { organizationId, projectId } = Route.useParams()
  const navigate = useNavigate()

  function handleClick(resourceId: string) {
    void navigate({
      to: '/project/$organizationId/$projectId/resource/$resourceId',
      params: { organizationId, projectId, resourceId },
    })
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
                <Group align="center" wrap="nowrap">
                  <Icon />
                  <Text fs="sm" truncate>
                    {value}
                  </Text>
                </Group>
              )
            },
            props: {
              td: (rowData) => ({ onClick: () => handleClick(rowData._id) }),
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
              td: (rowData) => ({ onClick: () => handleClick(rowData._id) }),
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
              td: (rowData) => ({ onClick: () => handleClick(rowData._id) }),
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
    </>
  )
}

type TableButtonProps = {
  resource: ResourcesFindAllDto
}

function TableButton({ resource }: TableButtonProps) {
  const [renameIsOpen, { open: openRename, close: closeRename }] =
    useDisclosure(false)

  const [deleteIsOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)

  return (
    <>
      <Menu withArrow position="left" shadow="md">
        <Menu.Target>
          <TableActionButton />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit width={20} height={20} stroke={1.5} />}
            onClick={openRename}
          >
            Renombrar
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash width={20} height={20} stroke={1.5} />}
            onClick={openDelete}
          >
            Eliminar
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <RenameResourceModal
        isOpen={renameIsOpen}
        onClose={closeRename}
        resource={resource}
      />
      <DeleteResourceModal
        isOpen={deleteIsOpen}
        onClose={closeDelete}
        resource={resource}
      />
    </>
  )
}

function searchResources(
  resources: ResourcesFindAllDto[] | undefined,
  searchValue: string,
) {
  if (!resources) return []
  return resources.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  )
}
