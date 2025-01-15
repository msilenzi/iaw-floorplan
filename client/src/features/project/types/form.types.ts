import {
  ProjectPurpose,
  ProjectStatus,
  ProjectType,
} from '@Common/api/generated'

export enum IdentificationType {
  DNI = 'dni',
  CUIT = 'cuit',
}

export type ProjectOwnerForm = {
  fullName: string
  dni: string
  address?: string
}

export type ProjectProfessionalForm = {
  fullName: string
  dniCuit: string
  provinceRegistration?: string
  cityRegistration?: string
  address?: string
  identificationType: IdentificationType
}

export type CreateProjectForm = {
  record: string
  name?: string
  type?: ProjectType | null
  purpose?: ProjectPurpose
  location?: string
  status?: ProjectStatus
  background?: string
  references: Array<string>
  otherRequirements?: Record<string, string>
  ownerEnabled: boolean
  owner?: ProjectOwnerForm
  designers: Array<ProjectProfessionalForm>
  technicalDirectors: Array<ProjectProfessionalForm>
}
