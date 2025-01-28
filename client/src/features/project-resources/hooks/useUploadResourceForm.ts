import type { UploadResourceValues } from '@ProjectResources/types/UploadResourceForm'

import { useForm } from '@mantine/form'

import { mibToBytes } from '@ProjectResources/utils/mibToBytes'
import { validateResourceName } from '@ProjectResources/utils/validateResourceName'

export function useUploadResourceForm() {
  return useForm<UploadResourceValues>({
    initialValues: {
      name: '',
      file: null,
    },
    transformValues: (values) => ({
      name: values.name.trim(),
      file: values.file,
    }),
    validate: {
      name: validateResourceName,
      file: (value) => {
        if (!value) return 'El archivo es requerido'
        if (value.size > mibToBytes(5)) {
          return 'El archivo no puede pesar más de 5 MiB'
        }
        return null
      },
    },
  })
}
