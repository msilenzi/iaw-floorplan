import { useForm } from '@mantine/form'

type CreateOrganizationForm = {
  name: string
  regex: string
  regexTest: string
}

export function useCreateOrganizationForm() {
  const form = useForm<CreateOrganizationForm>({
    mode: 'controlled',
    initialValues: {
      name: '',
      regex: '.*',
      regexTest: '',
    },
    transformValues: (values) => ({
      name: values.name.trim(),
      regex: `^${values.regex.trim()}$`,
      regexTest: values.regexTest.trim(),
    }),
    validate: {
      name: (value) =>
        value.trim().length === 0 ? 'El nombre es obligatorio' : null,

      regex: (value) => {
        if (value.trim().length === 0) return 'El RegExp es obligatorio'
        try {
          new RegExp(`^${value.trim()}$`)
          return null
        } catch {
          return 'RegExp inválido'
        }
      },
    },
    validateInputOnChange: true,
  })

  return { form }
}
