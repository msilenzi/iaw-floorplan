import { CloseButton, Group, TextInput } from '@mantine/core'

import { useCreateProjectForm } from '@/features/project/context/CreateProjectForm'
import { useKeyedArrayFormField } from '@Common/hooks/useKeyedArrayFormField'

import { FormSectionHeader } from '../FormSectionHeader'

export function ProjectReferencesField() {
  const form = useCreateProjectForm()
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
  const form = useCreateProjectForm()

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
