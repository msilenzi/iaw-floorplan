import type { UploadResourceValues } from '@Resources/types/UploadResourceForm'

import { useForm } from '@mantine/form'

import { mibToBytes } from '@Resources/utils/mibToBytes'
import { validateResourceName } from '@Resources/utils/validateResourceName'

export function useUploadResourceForm() {
  return useForm<UploadResourceValues>({
    mode: 'controlled',
    validateInputOnChange: true,
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
        if (!/^(image\/(jpeg|png)|application\/pdf)$/.test(value.type)) {
          return 'Tipo de archivo no soportado '
        }
        return null
      },
    },
  })
}
