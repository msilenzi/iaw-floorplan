import { TextInput } from '@mantine/core'

import { useProjectForm } from '@Project/context/ProjectForm'

export function ProjectNameField() {
  const form = useProjectForm()

  return (
    <TextInput
      label="Nombre"
      placeholder="Basílica de la Sagrada Familia"
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  )
}
