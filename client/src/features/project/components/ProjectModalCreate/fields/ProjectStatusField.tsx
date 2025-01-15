import { Select } from '@mantine/core'

import { displayProjectStatus } from '@/features/project/utils/displayProjectStatus'

import { ProjectStatus } from '@Common/api/generated'

export function ProjectStatusField() {
  return (
    <Select
      label="Estado"
      placeholder="Estado"
      data={Object.values(ProjectStatus).map((value) => ({
        label: displayProjectStatus(value),
        value,
      }))}
      styles={{
        option: { textTransform: 'capitalize' },
        input: { textTransform: 'capitalize' },
      }}
      allowDeselect={false}
    />
  )
}
