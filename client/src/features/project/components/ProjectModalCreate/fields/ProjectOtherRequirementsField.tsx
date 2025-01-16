import { CloseButton, Group, TextInput } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'

import { useKeyedArrayFormField } from '@Common/hooks/useKeyedArrayFormField'

import { AddFieldButton } from '../AddFieldButton'

export function ProjectOtherRequirementsField() {
  const form = useCreateProjectForm()
  const { ids, addItem, removeItem } = useKeyedArrayFormField({
    form,
    fieldName: 'otherRequirements',
    initialValue: { key: '', value: '' },
  })

  return (
    <>
      <AddFieldButton onClick={addItem}>Añadir campo</AddFieldButton>
      {form.getValues().otherRequirements.map((_, i) => (
        <Group wrap="nowrap" gap="xs" key={ids[i]} align="start">
          <TextInput
            flex={1}
            placeholder="Clave"
            key={form.key(`otherRequirements.${i}.key`)}
            {...form.getInputProps(`otherRequirements.${i}.key`)}
          />
          <TextInput
            value=":"
            disabled
            w="1ch"
            styles={{
              input: {
                paddingInline: 0,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                color: 'dark.1',
                fontWeight: 700,
                textAlign: 'center',
              },
            }}
          />
          <TextInput
            flex={1}
            placeholder="Valor"
            key={form.key(`otherRequirements.${i}.value`)}
            {...form.getInputProps(`otherRequirements.${i}.value`)}
          />
          <CloseButton onClick={() => removeItem(i)} />
        </Group>
      ))}
    </>
  )
}
