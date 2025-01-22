import { Group, Switch, TextInput } from '@mantine/core'

import { useProjectForm } from '@Project/context/ProjectForm'

import { FormSectionHeader } from '../FormSectionHeader'

export function ProjectOwnerField() {
  const form = useProjectForm()

  return (
    <>
      <FormSectionHeader
        title="Propietario"
        rightSection={
          <Switch
            style={{ cursor: 'pointer' }}
            styles={{
              track: { cursor: 'pointer' },
            }}
            key={form.key('ownerEnabled')}
            {...form.getInputProps('ownerEnabled', { type: 'checkbox' })}
          />
        }
      />
      {form.getValues().ownerEnabled && (
        <>
          <Group gap="sm" align="start">
            <TextInput
              label="Nombre"
              flex={1}
              placeholder="William Sherlock Scott Holmes "
              withAsterisk
              key={form.key('owner.fullName')}
              {...form.getInputProps('owner.fullName')}
            />
            <TextInput
              label="DNI"
              w="10ch"
              placeholder="12345678"
              withAsterisk
              key={form.key('owner.dni')}
              {...form.getInputProps('owner.dni')}
            />
          </Group>
          <TextInput
            label="Dirección"
            placeholder="221B Baker Street, London, UK"
            key={form.key('owner.address')}
            {...form.getInputProps('owner.address')}
          />
        </>
      )}
    </>
  )
}
