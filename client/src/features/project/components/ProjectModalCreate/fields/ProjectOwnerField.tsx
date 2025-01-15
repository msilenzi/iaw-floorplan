import { Group, TextInput } from '@mantine/core'

export function ProjectOwnerField() {
  return (
    <>
      <Group gap="sm">
        <TextInput
          label="Nombre"
          flex={1}
          placeholder="William Sherlock Scott Holmes "
          withAsterisk
        />
        <TextInput label="DNI" w="12ch" placeholder="12345678" withAsterisk />
      </Group>
      <TextInput
        label="Dirección"
        placeholder="221B Baker Street, London, UK"
      />
    </>
  )
}
