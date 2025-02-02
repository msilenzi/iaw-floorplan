import type { CropFormValues } from '@Crops/types/CropForm.types'
import type { UseFormInput } from '@mantine/form'

import { isNotEmpty } from '@mantine/form'

import { FormProvider, useForm } from './CropFormContext'

type CropFormProviderProps = {
  children: React.ReactNode
  formOptions?: UseFormInput<CropFormValues>
}

export function CropFormProvider({
  children,
  formOptions,
}: CropFormProviderProps) {
  const form = useForm({
    ...formOptions,
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      specialty: null,
      tags: [],
    },
    transformValues: (values) => ({
      name: values.name.trim(),
      specialty: values.specialty,
      tags: values.tags.map((tag) => tag.trim()),
    }),
    validate: {
      name: isNotEmpty('El nombre es obligatorio'),
      specialty: isNotEmpty('La especialidad es obligatoria'),
    },
  })

  return <FormProvider form={form}>{children}</FormProvider>
}
