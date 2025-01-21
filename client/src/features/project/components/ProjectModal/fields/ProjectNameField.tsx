import { TextInput } from '@mantine/core'

import { useCreateProjectForm } from '@Project/context/CreateProjectForm'

export function ProjectNameField() {
  const form = useCreateProjectForm()

  return (
    <TextInput
      label="Nombre"
      placeholder="Basílica de la Sagrada Familia"
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  )
}
