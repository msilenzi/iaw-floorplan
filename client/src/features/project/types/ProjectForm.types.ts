import type {
  ProjectPurpose,
  ProjectRequirementDto,
  ProjectStatus,
  ProjectType,
} from '@Common/api'

export enum IdentificationType {
  DNI = 'dni',
  CUIT = 'cuit',
}

export type ProjectOwnerForm = {
  fullName: string
  dni: string
  address: string
}

export type ProjectProfessionalForm = {
  fullName: string
  dniCuit: string
  provinceRegistration: string
  cityRegistration: string
  address: string
  identificationType: IdentificationType
}

export type ProjectFormValues = {
  record: string
  name: string
  type: ProjectType | null
  purpose: ProjectPurpose | null
  location: string
  status: ProjectStatus | null
  background: string
  references: string[]
  otherRequirements: ProjectRequirementDto[]
  ownerEnabled: boolean
  owner: ProjectOwnerForm
  designers: ProjectProfessionalForm[]
  technicalDirectors: ProjectProfessionalForm[]
}
