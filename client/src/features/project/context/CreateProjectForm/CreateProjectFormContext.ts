import { createContext } from 'react'

import { UseFormReturnType } from '@mantine/form'

import { CreateProjectDto } from '@Common/api/generated'

import { CreateProjectForm } from '../../types/form.types'

export const CreateProjectFormContext = createContext<UseFormReturnType<
  CreateProjectForm,
  (values: CreateProjectForm) => CreateProjectDto
> | null>(null)
