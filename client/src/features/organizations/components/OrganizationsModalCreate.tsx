import { useEffect, useState } from 'react'

import { Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { IconPlus } from '@tabler/icons-react'

import PrimaryButton from '@Common/ui/PrimaryButton'

type CreateOrganizationForm = {
  name: string
  regex: string
  regexTest: string
}

type OrganizationsModalCreateProps = {
  isOpen: boolean
  onClose: () => void
}

export default function OrganizationsModalCreate({
  isOpen,
  onClose,
}: OrganizationsModalCreateProps) {
  const form = useForm<CreateOrganizationForm>({
    mode: 'controlled',
    initialValues: {
      name: '',
      regex: '.*',
      regexTest: '',
    },
    transformValues: (values) => ({
      name: values.name.trim(),
      regex: values.regex.trim(),
      regexTest: values.regexTest.trim(),
    }),
    validate: {
      name: (value) =>
        value.trim().length === 0 ? 'El nombre es obligatorio' : null,

      regex: (value) => {
        if (value.trim().length === 0) return 'El RegExp es obligatorio'
        try {
          new RegExp(value)
          return null
        } catch {
          return 'RegExp inválido'
        }
      },
    },
    validateInputOnChange: true,
  })

  const [isTestValid, setIsTestValid] = useState(true)

  useEffect(() => {
    const { regex, regexTest } = form.getValues()
    try {
      const reg = new RegExp(regex)
      setIsTestValid(reg.test(regexTest))
    } catch {
      setIsTestValid(false)
    }
  }, [form])

  const handleSubmit = form.onSubmit((values) => {
    console.log('formSubmit', values)
  })

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Crear organización"
      styles={{ title: { fontWeight: 700 } }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset style={{ margin: 0, padding: 0, border: 'none' }}>
          <TextInput
            label="Nombre"
            placeholder="Nombre de la organización"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
            mb="xl"
          />
          <TextInput
            label="Patrón RegExp de los expedientes"
            placeholder=".*"
            withAsterisk
            key={form.key('regex')}
            {...form.getInputProps('regex')}
            mb="sm"
          />
          <TextInput
            description="Podés usar el campo a continuación para verificar como funciona tu patrón"
            key={form.key('regexTest')}
            {...form.getInputProps('regexTest')}
            error={
              form.getValues().regexTest && !isTestValid ?
                'No cumple con el patrón'
              : null
            }
            color={
              (
                form.getValues().regex.trim().length > 0 &&
                form.getValues().regexTest.trim().length > 0 &&
                isTestValid
              ) ?
                'green'
              : undefined
            }
            styles={{
              input: {
                borderColor:
                  // Si no hay test no poner bordes
                  form.getValues().regexTest.trim().length === 0 ? undefined
                    // Si no hay expresión regular o no es válida, poner bordes rojos
                  : form.getValues().regex.trim().length === 0 || !isTestValid ?
                    'var(--mantine-color-red-filled)'
                  : 'var(--mantine-color-green-filled)',

                // borderColor:
                //   (
                //     form.getValues().regex.trim().length > 0 &&
                //     form.getValues().regexTest.trim().length > 0
                //   ) ?
                //     isTestValid ? 'var(--mantine-color-green-filled)'
                //     : 'var(--mantine-color-red-filled)'
                //   : undefined,
              },
            }}
            mb="xl"
          />
          <Group justify="end">
            <PrimaryButton
              type="submit"
              rightSection={<IconPlus size={16} stroke={3} />}
            >
              Crear organización
            </PrimaryButton>
          </Group>
        </fieldset>
      </form>
    </Modal>
  )
}
