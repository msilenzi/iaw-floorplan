import { Textarea } from '@mantine/core'

import { useProjectForm } from '@Project/context/ProjectForm'

export function ProjectBackgroundField() {
  const form = useProjectForm()

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
