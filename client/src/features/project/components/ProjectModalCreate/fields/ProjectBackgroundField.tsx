import { Textarea } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'

export function ProjectBackgroundField() {
  const form = useCreateProjectForm()

  return (
    <Textarea
      label="Antecedentes"
      autosize
      minRows={3}
      maxRows={8}
      placeholder="Texto con los antecedentes de la obra"
      key={form.key('background')}
      {...form.getInputProps('background')}
    />
  )
}
