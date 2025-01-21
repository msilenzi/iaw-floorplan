import { ProjectStatus } from '@Common/api'

export function displayProjectStatus(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.Approved:
      return 'Aprobado'
    case ProjectStatus.NotApproved:
      return 'Rechazado'
    case ProjectStatus.Pending:
      return 'Pendiente'
    default:
      throw new Error('Invalid status')
  }
}
