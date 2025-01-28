import type { ProjectResourcesFindAllDto } from '@Common/api'

import { matches, useForm } from '@mantine/form'

type RenameResourceValues = {
  name: string
}

export function useRenameResourceForm(resource: ProjectResourcesFindAllDto) {
  const form = useForm<RenameResourceValues>({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: resource.name,
    },
    // enhanceGetInputProps: (payload) => {
    //   return !payload.form.initialized ? { disabled: true } : {}
    // },
    transformValues: (values) => ({
      name: values.name.trim(),
    }),
    validate: {
      name: matches(
        /^[a-zA-Z0-9_\-\s]+$/,
        'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos',
      ),
    },
  })

  return form
}
