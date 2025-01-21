import { MemberStatus } from '@Common/api'

export function displayMemberStatus(status: MemberStatus) {
  switch (status) {
    case MemberStatus.Blocked:
      return 'bloqueado'
    case MemberStatus.Deleted:
      return 'eliminado'
    case MemberStatus.Member:
      return 'miembro'
    case MemberStatus.Owner:
      return 'propietario'
    case MemberStatus.Pending:
      return 'pendiente'
    case MemberStatus.Rejected:
      return 'rechazado'
    default:
      throw new Error('Invalid status')
  }
}
