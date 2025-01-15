import { createContext } from 'react'

import { UseFormReturnType } from '@mantine/form'

import { CreateProjectForm } from '../../types/form.types'

export const CreateProjectFormContext =
  createContext<UseFormReturnType<CreateProjectForm> | null>(null)
