import { Select } from '@mantine/core'

import { ProjectPurpose } from '@Common/api'
import { useProjectForm } from '@Project/context/ProjectForm'
import { displayProjectPurpose } from '@Project/utils/displayProjectPurpose'

export function ProjectPurposeField() {
  const form = useProjectForm()

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
      key={form.key('purpose')}
      {...form.getInputProps('purpose')}
    />
  )
}
