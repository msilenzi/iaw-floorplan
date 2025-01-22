import { Select } from '@mantine/core'

import { ProjectStatus } from '@Common/api'
import { useProjectForm } from '@Project/context/ProjectForm'
import { displayProjectStatus } from '@Project/utils/displayProjectStatus'

export function ProjectStatusField() {
  const form = useProjectForm()

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
