import type { UploadResourceValues } from '@Resources/types/UploadResourceForm'

import { useForm } from '@mantine/form'

import { mibToBytes } from '@Resources/utils/mibToBytes'
import { validateResourceName } from '@Resources/utils/validateResourceName'

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
        if (value.size > mibToBytes(15)) {
          return 'El archivo no puede pesar más de 15 MiB'
        }
        return null
      },
    },
  })
}
