import { Select } from '@mantine/core'

import { ProjectStatus } from '@Common/api'
import { useCreateProjectForm } from '@Project/context/CreateProjectForm'
import { displayProjectStatus } from '@Project/utils/displayProjectStatus'

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
