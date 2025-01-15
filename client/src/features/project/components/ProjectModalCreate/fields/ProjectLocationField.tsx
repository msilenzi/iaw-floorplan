import { TextInput } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'

export function ProjectLocationField() {
  const form = useCreateProjectForm()

  return (
    <TextInput
      label="Ubicación"
      placeholder="1725 Slough Avenue, Scranton, PA, USA"
      key={form.key('location')}
      {...form.getInputProps('location')}
    />
  )
}
