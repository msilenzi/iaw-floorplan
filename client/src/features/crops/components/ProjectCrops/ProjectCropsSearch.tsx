import { Group, Select } from '@mantine/core'

import { CropSpecialty } from '@Common/api'
import { SearchInput } from '@Common/ui/SearchInput'
import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

type ProjectCropsSearchProps = {
  searchValue: string
  searchSpecialty: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setSearchSpecialty: React.Dispatch<React.SetStateAction<string>>
  disabled: boolean
}

export function ProjectCropsSearch({
  searchValue,
  searchSpecialty,
  setSearchValue,
  setSearchSpecialty,
  disabled,
}: ProjectCropsSearchProps) {
  return (
    <Group justify="center" mb="xl">
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClear={() => setSearchValue('')}
        disabled={disabled}
        placeholder="Buscar por nombre"
      />
      <Select
        value={searchSpecialty}
        onChange={(value) => value != null && setSearchSpecialty(value)}
        disabled={disabled}
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
  )
}
