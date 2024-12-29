import { useState } from 'react'

import { createLazyFileRoute } from '@tanstack/react-router'

import { CloseButton, Flex, Input, Table } from '@mantine/core'

import { IconSearch } from '@tabler/icons-react'

export const Route = createLazyFileRoute('/_protected/organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex direction="column" align="center" gap="lg" pb="xl">
      <SearchInput />
      <Table verticalSpacing="md" highlightOnHover style={{ flexGrow: 1 }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Nombre organización</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Flex>
  )
}

function SearchInput() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Input
      placeholder="Buscar por nombre"
      w="60%"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Limpiar búsqueda"
          onClick={() => setSearchValue('')}
          style={{ display: searchValue ? undefined : 'none' }}
        />
      }
      rightSectionPointerEvents="all"
    />
  )
}
