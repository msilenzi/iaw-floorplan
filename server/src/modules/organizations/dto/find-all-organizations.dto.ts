import { MemberStatus } from '../types/member-status.enum'

class FindAllOrganizationDto {
  readonly _id: string
  readonly name: string
}

export class FindAllOrganizationsDto {
  _id: MemberStatus
  organizations: FindAllOrganizationDto[]
}
