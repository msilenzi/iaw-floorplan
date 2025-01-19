import { useMemo, useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Stack, Text } from '@mantine/core'

import { useProjectsQuery } from '@/features/project/hooks/useProjectsQuery'
import { displayProjectPurpose } from '@/features/project/utils/displayProjectPurpose'
import { displayProjectType } from '@/features/project/utils/displayProjectType'

import { Project } from '@Common/api/generated'
import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { DataTable } from '@Common/components/DataTable'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'
import { getErrorResponse } from '@Common/utils/errorHandling'

export const Route = createFileRoute(
  '/_protected/organization/$organizationId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const organizationId = Route.useParams().organizationId
  const query = useProjectsQuery(organizationId)
  const { data, isLoading, isError } = query

  const [search, setSearch] = useState('')

  const sortedProjectsByRecord: Project[] = useMemo(() => {
    if (!data) return []
    return [...data].sort((a, b) => a.record.localeCompare(b.record))
  }, [data])

  const filteredProjects = sortedProjectsByRecord.filter(({ record }) =>
    record.toLowerCase().includes(search.toLowerCase()),
  )

  if (isError) {
    return <ProjectsError organizationId={organizationId} />
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
        setValue={setSearch}
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
  projects: Project[]
  isLoading: boolean
}

function ProjectsTable({ projects, isLoading }: ProjectsTableProps) {
  const navigate = useNavigate()

  function handleClick(projectId: string) {
    void navigate({ to: '/project/$projectId', params: { projectId } })
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
          renderRow: (value, values) => (
            <>
              <Text fw={700} m={0} inline truncate>
                {value}
              </Text>
              <Text c="dimmed" fz="sm" m={0} inline truncate>
                {values.name}
              </Text>
            </>
          ),
        },
        {
          key: 'type',
          label: 'Tipo de obra',
          renderRow: (value) => (
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
          renderRow: (value) => (
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

function ProjectsError({ organizationId }: { organizationId: string }) {
  const query = useProjectsQuery(organizationId)
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
