import { ProjectPurpose } from '@Common/api'

export function displayProjectPurpose(purpose: ProjectPurpose) {
  switch (purpose) {
    case ProjectPurpose.SingleFamily:
      return 'vivienda unifamiliar'
    case ProjectPurpose.MultiFamily:
      return 'vivienda multifamiliar'
    case ProjectPurpose.GroupedSingleFamily:
      return 'vivienda Unifamiliar Agrupada'
    case ProjectPurpose.Office:
      return 'oficina'
    case ProjectPurpose.Commercial:
      return 'local comercial'
    case ProjectPurpose.Industry:
      return 'industria'
    default:
      throw new Error('Invalid purpose')
  }
}
