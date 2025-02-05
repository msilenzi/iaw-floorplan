import type { ResourcesFindAllDto } from '@Common/api'

import { useForm } from '@mantine/form'

import { validateResourceName } from '@Resources/utils/validateResourceName'

type RenameResourceValues = {
  name: string
}

export function useRenameResourceForm(resource: ResourcesFindAllDto) {
  return useForm<RenameResourceValues>({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: resource.name,
    },
    transformValues: (values) => ({
      name: values.name.trim(),
    }),
    validate: {
      name: validateResourceName,
    },
  })
}
