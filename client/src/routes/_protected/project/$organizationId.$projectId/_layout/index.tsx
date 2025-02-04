import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { Group, Select, Stack } from '@mantine/core'

import { CropSpecialty } from '@Common/api'
import { RefetchBtn } from '@Common/ui/RefetchBtn'
import { SearchInput } from '@Common/ui/SearchInput'
import { CropsList } from '@Crops/components/CropsList'
import { useProjectCropsQuery } from '@Crops/hooks/useProjectCropsQuery'
import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

export const Route = createFileRoute(
  '/_protected/project/$organizationId/$projectId/_layout/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useProjectCropsQuery()
  const { data, isLoading, isError } = query

  const [searchValue, setSearchValue] = useState('')
  const [searchSpecialty, setSearchSpecialty] = useState('')

  if (isLoading) {
    return 'loading'
  }

  if (isError || !data) {
    return 'error'
  }

  if (data.length === 0) {
    return 'Crea recortes'
  }

  // TODO: búsqueda por nombre y filtrar por tipo

  return (
    <Stack gap="md">
      <Group justify="center">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
        />
        <Select
          value={searchSpecialty}
          onChange={(value) => value != null && setSearchSpecialty(value)}
          allowDeselect={false}
          data={[
            { label: 'Todas las especialidades', value: '' },
            ...Object.values(CropSpecialty).map((value) => ({
              label: displayCropSpecialty(value),
              value,
            })),
          ]}
          styles={{
            input: { textTransform: 'capitalize' },
            option: { textTransform: 'capitalize' },
          }}
          w={'24ch'}
        />
      </Group>
      <RefetchBtn query={query} ms="auto" />
      <CropsList crops={data} />
    </Stack>
  )
}
