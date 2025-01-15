import { CloseButton, Group, TextInput } from '@mantine/core'

import { AddFieldButton } from '../AddFieldButton'

export function ProjectOtherRequirementsField() {
  return (
    <>
      <AddFieldButton onClick={() => console.log('otras exigencias')}>
        Añadir campo
      </AddFieldButton>
      <Group wrap="nowrap" gap="xs">
        <TextInput placeholder="Clave" />
        <TextInput placeholder="Valor" />
        <CloseButton />
      </Group>
    </>
  )
}
