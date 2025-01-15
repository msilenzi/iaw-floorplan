import { Group, TextInput } from '@mantine/core'

export function ProjectOwnerField() {
  return (
    <>
      <Group gap="sm">
        <TextInput label="Nombre" flex={1} />
        <TextInput label="DNI" w="12ch" />
      </Group>
      <TextInput label="Dirección" />
    </>
  )
}
