import { useContext } from 'react'

import { CreateProjectFormContext } from './CreateProjectFormContext'

export function useCreateProjectForm() {
  const form = useContext(CreateProjectFormContext)
  if (!form) {
    throw new Error('useProjectForm must be used inside ProjectFormProvider')
  }
  return form
}
