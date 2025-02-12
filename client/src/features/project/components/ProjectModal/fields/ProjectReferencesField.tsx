import { CloseButton, Group, TextInput } from '@mantine/core'

import { useKeyedArrayFormField } from '@Common/hooks/useKeyedArrayFormField'
import { useProjectForm } from '@Project/context/ProjectForm'

import { FormSectionHeader } from '../FormSectionHeader'

export function ProjectReferencesField() {
  const form = useProjectForm()
  const { addItem, removeItem, ids } = useKeyedArrayFormField({
    form,
    fieldName: 'references',
    initialValue: '',
  })

  return (
    <>
      <FormSectionHeader
        title="Referencias"
        rightSection={<FormSectionHeader.AddButton onClick={addItem} />}
      />
      {form.getValues().references.map((_, i) => (
        <Reference key={ids[i]} index={i} removeItem={removeItem} />
      ))}
    </>
  )
}

type ReferenceProps = {
  index: number
  removeItem: (index: number) => void
}

function Reference({ index, removeItem }: ReferenceProps) {
  const form = useProjectForm()

  return (
    <Group gap="xs">
      <TextInput
        flex={1}
        placeholder="Nro. expediente"
        key={form.key(`references.${index}`)}
        {...form.getInputProps(`references.${index}`)}
      />
      <CloseButton onClick={() => removeItem(index)} />
    </Group>
  )
}
