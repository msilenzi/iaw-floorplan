import { useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  Box,
  CloseButton,
  Flex,
  Skeleton,
  Space,
  Table,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core'

import { IconSearch } from '@tabler/icons-react'

import { FindAllOrganizationsDto, MemberStatus } from '@Common/api/generated'

import OrganizationsAddBtn from '@Organizations/components/OrganizationAddBtn'
import useOrganizationsQuery from '@Organizations/hooks/useOrganizationsQuery'
import displayMemberStatus from '@Organizations/utils/displayMemberStatus'

import classes from '@Organizations/styles/Organizations.module.css'

export const Route = createFileRoute('/_protected/organizations/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useOrganizationsQuery()

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
    <Flex direction="column" align="center" gap="lg" pb="xl">
      <TextInput
        placeholder="Buscar por nombre"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        leftSection={<IconSearch size={16} />}
        disabled={isLoading}
        rightSection={
          <CloseButton
            aria-label="Limpiar búsqueda"
            onClick={() => setSearchValue('')}
            style={{ display: searchValue ? undefined : 'none' }}
          />
        }
        rightSectionPointerEvents="all"
        className={classes.search}
      />
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
        {isLoading ?
          <SkeletonTableBody />
        : <OrganizationTableBody organizations={activeOrganizations} />}
      </Table>
    </Flex>
  )
}

type OrganizationsTableProps = {
  organizations: FindAllOrganizationsDto[]
}

function OrganizationTableBody({ organizations }: OrganizationsTableProps) {
  const navigate = useNavigate()

  return (
    <Table.Tbody>
      {organizations.map(({ _id, name, status, lastAccessedAt }) => (
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
            {lastAccessedAt ?
              new Date(lastAccessedAt).toLocaleDateString('es-ES')
            : <Text component="span" size="sm" c="dimmed" fs="italic">
                No accedido
              </Text>
            }
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  )
}

function SkeletonTableBody() {
  return (
    <Table.Tbody>
      {Array.from({ length: 5 }).map((_, index) => (
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
      ))}
    </Table.Tbody>
  )
}
