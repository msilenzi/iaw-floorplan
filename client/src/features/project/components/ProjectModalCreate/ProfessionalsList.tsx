import { useState } from 'react'

import {
  Accordion,
  Center,
  CloseButton,
  Group,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'

import { useKeyedArrayFormField } from '@Common/hooks/useKeyedArrayFormField'

import { useCreateProjectForm } from '../../context/CreateProjectForm'
import {
  CreateProjectForm,
  IdentificationType,
  ProjectProfessionalForm,
} from '../../types/create-project-form.types'
import { FormSectionHeader } from './FormSectionHeader'

type ProfessionalField = keyof {
  [K in keyof CreateProjectForm as CreateProjectForm[K] extends Array<ProjectProfessionalForm>
    ? K
    : never]: CreateProjectForm[K]
}

type ProfessionalsListProps = {
  field: ProfessionalField
  title: string
}

export function ProfessionalsList({ field, title }: ProfessionalsListProps) {
  const form = useCreateProjectForm()

  const { ids, addItem, removeItem } = useKeyedArrayFormField({
    form,
    fieldName: field,
    initialValue: {
      dniCuit: '',
      fullName: '',
      identificationType: IdentificationType.DNI,
      address: '',
      cityRegistration: '',
      provinceRegistration: '',
    },
  })

  return (
    <>
      <FormSectionHeader
        title={title}
        rightSection={<FormSectionHeader.AddButton onClick={addItem} />}
      />
      {form.getValues()[field].length !== 0 && (
        <Accordion chevronPosition="left" variant="separated">
          {form.getValues()[field].map((_, i) => (
            <AccordionItem
              field={field}
              id={ids[i]}
              key={ids[i]}
              index={i}
              removeItem={removeItem}
            />
          ))}
        </Accordion>
      )}
    </>
  )
}

type AccordionItemProps = {
  field: ProfessionalField
  id: string
  index: number
  removeItem: (index: number) => void
}

function AccordionItem({ field, id, index, removeItem }: AccordionItemProps) {
  const form = useCreateProjectForm()

  const [fullName, setFullName] = useState(
    form.getValues()[field][index].fullName,
  )

  form.watch(`${field}.${index}.fullName`, ({ value }) =>
    setFullName(value as string),
  )

  return (
    <Accordion.Item key={id} value={id}>
      <Center>
        <Accordion.Control>
          {fullName ? fullName : `Sin nombre #${index + 1}`}
        </Accordion.Control>
        <CloseButton onClick={() => removeItem(index)} />
      </Center>
      <Accordion.Panel>
        <Professional key={id} field={field} index={index} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}

type ProfessionalProps = {
  field: ProfessionalField
  index: number
}

export function Professional({ field, index }: ProfessionalProps) {
  const form = useCreateProjectForm()

  return (
    <>
      <Stack gap="xs">
        <TextInput
          label="Nombre"
          withAsterisk
          placeholder="Lionel Andrés Messi Cuccittini"
          key={form.key(`${field}.${index}.fullName`)}
          {...form.getInputProps(`${field}.${index}.fullName`)}
        />
        <DniCuit field={field} index={index} />
        <TextInput
          label="Dirección"
          placeholder="Av. Siempreviva 742, Springfield, USA"
          key={form.key(`${field}.${index}.address`)}
          {...form.getInputProps(`${field}.${index}.address`)}
        />
        <Group>
          <TextInput
            flex={1}
            label="Matrícula provincial"
            placeholder="CAPBA 1234"
            key={form.key(`${field}.${index}.provinceRegistration`)}
            {...form.getInputProps(`${field}.${index}.provinceRegistration`)}
          />
          <TextInput
            flex={1}
            label="Matrícula municipal"
            placeholder="MLP 5678"
            key={form.key(`${field}.${index}.cityRegistration`)}
            {...form.getInputProps(`${field}.${index}.cityRegistration`)}
          />
        </Group>
      </Stack>
    </>
  )
}

type DniCuitProps = {
  field: ProfessionalField
  index: number
}

function DniCuit({ field, index }: DniCuitProps) {
  const form = useCreateProjectForm()
  const [currentType, setCurrentType] = useState(
    form.getValues()[field][index].identificationType,
  )

  form.watch(`${field}.${index}.identificationType`, ({ value }) =>
    setCurrentType(value as IdentificationType),
  )

  return (
    <Group gap="sm" align="start">
      <Select
        data={[
          { label: 'DNI', value: 'dni' },
          { label: 'CUIT', value: 'cuit' },
        ]}
        w={'10ch'}
        allowDeselect={false}
        defaultValue="dni"
        withAsterisk
        label="Tipo"
        key={form.key(`${field}.${index}.identificationType`)}
        {...form.getInputProps(`${field}.${index}.identificationType`)}
      />
      <TextInput
        flex={1}
        withAsterisk
        label={currentType.toUpperCase()}
        placeholder={
          currentType === IdentificationType.DNI ? '12345678' : '20-12345678-1'
        }
        key={form.key(`${field}.${index}.dniCuit`)}
        {...form.getInputProps(`${field}.${index}.dniCuit`)}
      />
    </Group>
  )
}
