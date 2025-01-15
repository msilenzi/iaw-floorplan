import { CloseButton, Group, TextInput } from '@mantine/core'

import { AddFieldButton } from '../AddFieldButton'

export function ProjectReferencesField() {
  return (
    <>
      <AddFieldButton onClick={() => console.log('referencias')}>
        Añadir referencia
      </AddFieldButton>
      <Reference />
      <Reference />
      <Reference />
    </>
  )
}

function Reference() {
  return (
    <Group gap="xs">
      <TextInput flex={1} />
      <CloseButton />
    </Group>
  )
}
