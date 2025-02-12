import type { ProjectBasicDto } from '@Common/api'

import { useMemo, useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Stack, Text } from '@mantine/core'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { DataTable } from '@Common/components/DataTable'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { useProjectsQuery } from '@Project/hooks/useProjectsQuery'
import { displayProjectPurpose } from '@Project/utils/displayProjectPurpose'
import { displayProjectType } from '@Project/utils/displayProjectType'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useProjectsQuery()
  const { data, isLoading, isError } = query

  const [search, setSearch] = useState('')

  const sortedProjectsByRecord: ProjectBasicDto[] = useMemo(() => {
    if (!data) return []
    return [...data].sort((a, b) => a.record.localeCompare(b.record))
  }, [data])

  const filteredProjects = sortedProjectsByRecord.filter(({ record }) =>
    record.toLowerCase().includes(search.toLowerCase()),
  )

  if (isError) {
    return <ProjectsError />
  }

  if (!isLoading && data?.length === 0) {
    return (
      <Stack gap="md" align="start">
        <RefetchBtn query={query} ms="auto" mt="xl" />
        <BasicCtaBanner
          title="No se encontraron proyectos"
          description='Esta organización no tiene proyectos. Podés crearlos haciendo click en "Agregar".'
        />
      </Stack>
    )
  }

  return (
    <Stack gap="sm" pb="xl" align="center">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onClear={() => setSearch('')}
        placeholder="Buscar por expediente"
        disabled={isLoading}
      />
      <RefetchBtn query={query} ms="auto" mt="xl" />
      {!isLoading && filteredProjects.length === 0 ? (
        <Text>
          No se encontraron organizaciones con el nombre &quot;{search}
          &quot;
        </Text>
      ) : (
        <ProjectsTable projects={filteredProjects} isLoading={isLoading} />
      )}
    </Stack>
  )
}

type ProjectsTableProps = {
  projects: ProjectBasicDto[]
  isLoading: boolean
}

function ProjectsTable({ projects, isLoading }: ProjectsTableProps) {
  const organizationId = Route.useParams().organizationId
  const navigate = useNavigate()

  function handleClick(projectId: string) {
    void navigate({
      to: '/project/$organizationId/$projectId',
      params: { organizationId, projectId },
    })
  }

  return (
    <DataTable
      data={projects}
      isLoading={isLoading}
      loadingRowsLength={10}
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
          key: 'record',
          label: 'Expediente y nombre',
          rowRender: (value, values) => (
            <>
              <Text fw={700} m={0} truncate style={{ lineHeight: 1.35 }}>
                {value}
              </Text>
              <Text
                c="dimmed"
                fz="sm"
                m={0}
                truncate
                style={{ lineHeight: 1.35 }}
              >
                {values.name}
              </Text>
            </>
          ),
        },
        {
          key: 'type',
          label: 'Tipo de obra',
          rowRender: (value) => (
            <Text tt="capitalize" size="sm" truncate>
              {displayProjectType(value)}
            </Text>
          ),
          hideBreakpoint: 'sm',
          props: { th: { w: '25ch' } },
        },
        {
          key: 'purpose',
          label: 'Destino',
          rowRender: (value) => (
            <Text tt="capitalize" size="sm" truncate>
              {displayProjectPurpose(value)}
            </Text>
          ),
          hideBreakpoint: 'sm',
          props: { th: { w: '30ch' } },
        },
      ]}
    />
  )
}

function ProjectsError() {
  const query = useProjectsQuery()
  const { error } = query

  const { title, message } = getErrorResponse(error, {
    title: 'No pudimos actualizar la información de la organización',
  })

  return (
    <Stack gap="md" align="start">
      <RefetchBtn query={query} ms="auto" mt="xl" />
      <BasicCtaBanner title={title} description={message} />
    </Stack>
  )
}
