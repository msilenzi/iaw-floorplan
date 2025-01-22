import { Select } from '@mantine/core'

import { ProjectType } from '@Common/api'
import { useProjectForm } from '@Project/context/ProjectForm'
import { displayProjectType } from '@Project/utils/displayProjectType'

export function ProjectTypeField() {
  const form = useProjectForm()

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
      key={form.key('type')}
      {...form.getInputProps('type')}
    />
  )
}
