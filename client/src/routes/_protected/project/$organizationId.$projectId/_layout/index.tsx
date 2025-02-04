import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { Stack, Text } from '@mantine/core'

import { BasicCtaBanner } from '@Common/components/BasicCtaBanner'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { ProjectCropsList } from '@Crops/components/ProjectCrops/ProjectCropsList'
import { ProjectCropsSearch } from '@Crops/components/ProjectCrops/ProjectCropsSearch'
import { useProjectCropsQuery } from '@Crops/hooks/useProjectCropsQuery'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/_layout/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useProjectCropsQuery()
  const { data, isLoading, isError, error } = query

  const [searchValue, setSearchValue] = useState('')
  const [searchSpecialty, setSearchSpecialty] = useState('')

  if (isError) {
    const { title, message } = getErrorResponse(error, {
      title: 'Ocurrió un error al cargar los recursos',
    })

    return (
      <Stack gap="md">
        <RefetchBtn query={query} ms="auto" />
        <BasicCtaBanner title={title} description={message} />
      </Stack>
    )
  }

  if (data && data.length === 0) {
    return (
      <Stack gap="md">
        <RefetchBtn query={query} ms="auto" />
        <BasicCtaBanner
          title="No se encontraron planos"
          description="No existen planos para este proyecto. Para agregar un plano tenés que crear un recorte de un recurso."
        />
      </Stack>
    )
  }

  const searchedCrops = data?.filter(
    ({ name, specialty }) =>
      name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (searchSpecialty === '' || searchSpecialty === specialty),
  )

  return (
    <Stack gap="md">
      <ProjectCropsSearch
        searchValue={searchValue}
        searchSpecialty={searchSpecialty}
        setSearchValue={setSearchValue}
        setSearchSpecialty={setSearchSpecialty}
        disabled={isLoading}
      />
      <RefetchBtn query={query} ms="auto" />
      {searchedCrops?.length === 0 ? (
        <Text c="dimmed" ta="center">
          No se encontraron resultados
        </Text>
      ) : (
        <ProjectCropsList crops={searchedCrops} isLoading={isLoading} />
      )}
    </Stack>
  )
}
