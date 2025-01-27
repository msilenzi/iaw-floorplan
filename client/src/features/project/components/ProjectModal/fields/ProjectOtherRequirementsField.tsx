import { CloseButton, Group, TextInput } from '@mantine/core'

import { useKeyedArrayFormField } from '@Common/hooks/useKeyedArrayFormField'
import { useProjectForm } from '@Project/context/ProjectForm'

import { FormSectionHeader } from '../FormSectionHeader'

export function ProjectOtherRequirementsField() {
  const form = useProjectForm()
  const { ids, addItem, removeItem } = useKeyedArrayFormField({
    form,
    fieldName: 'otherRequirements',
    initialValue: { key: '', value: '' },
  })

  return (
    <>
      <FormSectionHeader
        title="Otras exigencias"
        rightSection={<FormSectionHeader.AddButton onClick={addItem} />}
      />
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
            ms={-6}
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
