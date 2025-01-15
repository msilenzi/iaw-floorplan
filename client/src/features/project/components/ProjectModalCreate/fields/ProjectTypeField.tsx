import { Select } from '@mantine/core'

import { displayProjectType } from '@/features/project/utils/displayProjectType'

import { ProjectType } from '@Common/api/generated'

export function ProjectTypeField() {
  return (
    <Select
      label="Tipo de obra"
      placeholder="Tipo de obra"
      data={Object.values(ProjectType).map((value) => ({
        label: displayProjectType(value),
        value,
      }))}
      styles={{
        option: { textTransform: 'capitalize' },
        input: { textTransform: 'capitalize' },
      }}
      allowDeselect={false}
      withAsterisk
    />
  )
}
