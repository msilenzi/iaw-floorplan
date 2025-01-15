import { Select } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'
import { displayProjectPurpose } from '@/features/project/utils/displayProjectPurpose'

import { ProjectPurpose } from '@Common/api/generated'

export function ProjectPurposeField() {
  const form = useCreateProjectForm()

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
