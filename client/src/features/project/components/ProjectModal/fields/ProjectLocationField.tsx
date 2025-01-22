import { TextInput } from '@mantine/core'

import { useProjectForm } from '@Project/context/ProjectForm'

export function ProjectLocationField() {
  const form = useProjectForm()

  return (
    <TextInput
      label="Ubicación"
      placeholder="1725 Slough Avenue, Scranton, PA, USA"
      key={form.key('location')}
      {...form.getInputProps('location')}
    />
  )
}
