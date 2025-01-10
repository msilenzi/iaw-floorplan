import { useEffect } from 'react'

import { useForm } from '@mantine/form'

import { useOrganizationQuery } from './useOrganizationQuery'

type EditOrganizationForm = {
  name: string
  regex: string
  regexTest: string
}

export function useEditOrganizationForm(organizationId: string) {
  const { data } = useOrganizationQuery(organizationId)

  const form = useForm<EditOrganizationForm>({
    mode: 'controlled',
    initialValues: {
      name: '',
      regex: '',
      regexTest: '',
    },
    enhanceGetInputProps: (payload) => {
      if (!payload.form.initialized) return { disabled: true }
      return {}
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

  useEffect(() => {
    if (data) {
      form.initialize({
        name: data.name,
        regex: data.recordRegex.slice(1, data.recordRegex.length - 1), // Elimina ^ y $,
        regexTest: '',
      })
    }
    // https://mantine.dev/form/values/#initialize-form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return form
}
