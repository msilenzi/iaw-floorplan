import { Textarea } from '@mantine/core'

export function ProjectBackgroundField() {
  return (
    <Textarea
      label="Antecedentes"
      autosize
      minRows={3}
      maxRows={8}
      placeholder="Texto con los antecedentes de la obra"
    />
  )
}
