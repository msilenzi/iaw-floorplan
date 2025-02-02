import type { CropFormValues } from '@Crops/types/CropForm.types'

import { createFormContext } from '@mantine/form'

export const [FormProvider, useCropForm, useForm] =
  createFormContext<CropFormValues>()
