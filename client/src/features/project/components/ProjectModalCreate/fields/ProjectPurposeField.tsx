import { Select } from '@mantine/core'

import { displayProjectPurpose } from '@/features/project/utils/displayProjectPurpose'

import { ProjectPurpose } from '@Common/api/generated'

export function ProjectPurposeField() {
  return (
    <Select
      label="Destino"
      placeholder="Destino"
      data={Object.values(ProjectPurpose).map((value) => ({
        label: displayProjectPurpose(value),
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
