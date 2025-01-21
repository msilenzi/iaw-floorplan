import { createContext } from 'react'

import type { CreateProjectDto } from '@Common/api'
import type { UseFormReturnType } from '@mantine/form'
import type { CreateProjectForm } from '@Project/types/create-project-form.types'

export const CreateProjectFormContext = createContext<UseFormReturnType<
  CreateProjectForm,
  (values: CreateProjectForm) => CreateProjectDto
> | null>(null)
