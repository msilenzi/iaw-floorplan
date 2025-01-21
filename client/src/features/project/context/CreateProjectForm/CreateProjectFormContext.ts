import type { CreateProjectDto } from '@Common/api'
import type { UseFormReturnType } from '@mantine/form'
import type { ProjectFormValues } from '@Project/types/ProjectForm.types'

import { createContext } from 'react'

export const CreateProjectFormContext = createContext<UseFormReturnType<
  ProjectFormValues,
  (values: ProjectFormValues) => CreateProjectDto
> | null>(null)
