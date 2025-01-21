import { createContext } from 'react'

import type { CreateProjectForm } from '../../types/create-project-form.types'
import type { CreateProjectDto } from '@Common/api/generated'
import type { UseFormReturnType } from '@mantine/form'

export const CreateProjectFormContext = createContext<UseFormReturnType<
  CreateProjectForm,
  (values: CreateProjectForm) => CreateProjectDto
> | null>(null)
