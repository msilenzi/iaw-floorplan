import { MemberStatus } from '@Common/api/generated'

export default function displayMemberStatus(status: MemberStatus) {
  const mapStatus: Record<MemberStatus, string> = {
    [MemberStatus.Blocked]: 'bloqueado',
    [MemberStatus.Deleted]: 'eliminado',
    [MemberStatus.Member]: 'miembro',
    [MemberStatus.Owner]: 'propietario',
    [MemberStatus.Pending]: 'pendiente',
    [MemberStatus.Rejected]: 'rechazado',
  }
  return mapStatus[status]
}
