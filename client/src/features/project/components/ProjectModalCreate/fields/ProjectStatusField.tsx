import { Select } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'
import { displayProjectStatus } from '@/features/project/utils/displayProjectStatus'

import { ProjectStatus } from '@Common/api/generated'

export function ProjectStatusField() {
  const form = useCreateProjectForm()

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
      key={form.key('status')}
      {...form.getInputProps('status')}
    />
  )
}
