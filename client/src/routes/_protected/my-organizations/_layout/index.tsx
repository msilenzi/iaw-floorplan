import { useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  Box,
  CloseButton,
  Skeleton,
  Space,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core'

import { IconSearch } from '@tabler/icons-react'

import { BasicOrganizationDto, MemberStatus } from '@Common/api/generated'
import RefetchBtn from '@Common/ui/RefetchBtn'

import OrganizationsAddBtn from '@Organizations/components/OrganizationAddBtn'
import useOrganizationsQuery from '@Organizations/hooks/useOrganizationsQuery'
import displayMemberStatus from '@Organizations/utils/displayMemberStatus'

import classes from '@Organizations/styles/OrganizationsPage.module.css'

export const Route = createFileRoute('/_protected/my-organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useOrganizationsQuery()
  const { data, isLoading } = query

  const [searchValue, setSearchValue] = useState('')

  if (!isLoading && data?.length === 0) {
    return (
      <Box m="0 auto" style={{ maxWidth: rem('500px') }} ta="center">
        <Space h="lg" />
        <Title order={2} mb="xs">
          No se encontraron organizaciones
        </Title>
        <Text style={{ textWrap: 'balance' }} mb="lg">
          Parece que todavía no perteneces a ninguna organización. Podés crear
          una nueva o unirte a una utilizando su código.
        </Text>
        <OrganizationsAddBtn />
      </Box>
    )
  }

  const activeOrganizations =
    data?.filter(({ status, name }) => {
      if (status !== MemberStatus.Owner && status !== MemberStatus.Member) {
        return false
      }
      return name.toLowerCase().includes(searchValue.toLowerCase())
    }) ?? []

  return (
    <Stack gap="sm" pb="xl" align="center">
      <SearchInput value={searchValue} setValue={setSearchValue} />
      <RefetchBtn query={query} ms="auto" mt="xl" />
      <Table verticalSpacing="md" highlightOnHover className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={classes['name-cell']}>Nombre</Table.Th>
            <Table.Th className={classes['status-cell']}>Estado</Table.Th>
            <Table.Th className={classes['lastAccessedAt-cell']}>
              Último acceso
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading ? (
            <SkeletonTableBody />
          ) : (
            <OrganizationTableBody organizations={activeOrganizations} />
          )}
        </Table.Tbody>
      </Table>
    </Stack>
  )
}

type OrganizationsTableProps = {
  organizations: BasicOrganizationDto[]
}

function OrganizationTableBody({ organizations }: OrganizationsTableProps) {
  const navigate = useNavigate()

  return organizations.map(({ _id, name, status, lastAccessedAt }) => (
    <Table.Tr
      key={_id}
      onClick={() => void navigate({ to: `/organizations/${_id}` })}
    >
      <Table.Td className={classes['name-cell']}>
        <Text
          size="sm"
          span
          truncate="end"
          display="inline-block"
          w="100%"
          style={{ overflow: 'hidden' }}
        >
          {name}
        </Text>
      </Table.Td>
      <Table.Td className={classes['status-cell']} tt="capitalize">
        {displayMemberStatus(status)}
      </Table.Td>
      <Table.Td className={classes['lastAccessedAt-cell']}>
        {lastAccessedAt ? (
          new Date(lastAccessedAt).toLocaleDateString('es-ES')
        ) : (
          <Text component="span" size="sm" c="dimmed" fs="italic">
            No accedido
          </Text>
        )}
      </Table.Td>
    </Table.Tr>
  ))
}

function SkeletonTableBody() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Table.Tr key={index}>
      <Table.Td className={classes['name-cell']}>
        <Skeleton height={20} width="80%" />
      </Table.Td>
      <Table.Td className={classes['status-cell']}>
        <Skeleton height={20} width={60} />
      </Table.Td>
      <Table.Td className={classes['lastAccessedAt-cell']}>
        <Skeleton height={20} width={90} />
      </Table.Td>
    </Table.Tr>
  ))
}

type SearchInputProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}
function SearchInput({ value, setValue }: SearchInputProps) {
  const { isLoading } = useOrganizationsQuery()

  return (
    <TextInput
      placeholder="Buscar por nombre"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leftSection={<IconSearch size={16} />}
      disabled={isLoading}
      rightSection={
        <CloseButton
          aria-label="Limpiar búsqueda"
          onClick={() => setValue('')}
          style={{ display: value ? undefined : 'none' }}
        />
      }
      rightSectionPointerEvents="all"
      className={classes.search}
    />
  )
}
