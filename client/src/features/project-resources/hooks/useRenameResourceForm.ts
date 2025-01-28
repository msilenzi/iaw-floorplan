import type { ProjectResourcesFindAllDto } from '@Common/api'

import { useForm } from '@mantine/form'

import { validateResourceName } from '@ProjectResources/utils/validateResourceName'

type RenameResourceValues = {
  name: string
}

export function useRenameResourceForm(resource: ProjectResourcesFindAllDto) {
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
