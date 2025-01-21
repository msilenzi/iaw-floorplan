import { createContext } from 'react'

import type { UseFormReturnType } from '@mantine/form'

import type { CreateProjectDto } from '@Common/api/generated'

import type { CreateProjectForm } from '../../types/create-project-form.types'

export const CreateProjectFormContext = createContext<UseFormReturnType<
  CreateProjectForm,
  (values: CreateProjectForm) => CreateProjectDto
> | null>(null)
