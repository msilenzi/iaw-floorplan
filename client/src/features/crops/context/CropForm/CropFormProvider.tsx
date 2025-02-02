import type { CropFormValues } from '@Crops/types/CropForm.types'
import type { UseFormInput } from '@mantine/form'

import { isNotEmpty, matches } from '@mantine/form'

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
      scale: '',
      tags: [],
    },
    transformValues: (values) => ({
      name: values.name.trim(),
      specialty: values.specialty,
      scale: values.scale.trim(),
      tags: values.tags.map((tag) => tag.trim()),
    }),
    validate: {
      name: isNotEmpty('El nombre es obligatorio'),
      specialty: isNotEmpty('La especialidad es obligatoria'),
      scale: matches(/^\d+:\d+$/, 'La escala debe seguir el formato n:n'),
    },
  })

  return <FormProvider form={form}>{children}</FormProvider>
}
