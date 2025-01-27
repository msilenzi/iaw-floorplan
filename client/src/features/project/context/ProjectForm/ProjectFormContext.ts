import type { ProjectCreateDto } from '@Common/api'
import type { ProjectFormValues } from '@Project/types/ProjectForm.types'

import { createFormContext } from '@mantine/form'

export const [FormProvider, useProjectForm, useForm] = createFormContext<
  ProjectFormValues,
  (values: ProjectFormValues) => ProjectCreateDto
>()
