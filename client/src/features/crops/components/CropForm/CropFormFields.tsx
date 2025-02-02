import { Select, TagsInput, TextInput } from '@mantine/core'

import { CropSpecialty } from '@Common/api'
import { useCropForm } from '@Crops/context/CropForm'
import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

export function CropFormFields() {
  const form = useCropForm()

  return (
    <>
      <TextInput
        label="Nombre"
        placeholder="Nombre del recorte"
        withAsterisk
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <Select
        label="Especialidad"
        placeholder="Especialidad"
        data={Object.values(CropSpecialty).map((value) => ({
          label: displayCropSpecialty(value),
          value,
        }))}
        styles={{
          option: { textTransform: 'capitalize' },
          input: { textTransform: 'capitalize' },
        }}
        allowDeselect={false}
        withAsterisk
        key={form.key('specialty')}
        {...form.getInputProps('specialty')}
      />

      <TagsInput
        label="Etiquetas"
        description="Presioná Enter para agregar la etiqueta"
        key={form.key('tags')}
        {...form.getInputProps('tags')}
      />
    </>
  )
}
