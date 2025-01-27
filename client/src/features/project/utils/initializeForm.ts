import type {
  ProjectCreateDto,
  ProjectFindOneDto,
  ProjectProfessional,
} from '@Common/api'
import type {
  ProjectFormValues,
  ProjectProfessionalForm,
} from '@Project/types/ProjectForm.types'

import { IdentificationType } from '@Project/types/ProjectForm.types'

import { isDni } from './isDni'

function initializeProfessionals(
  professionals?: ProjectProfessional[],
): ProjectProfessionalForm[] {
  if (professionals == null) return []
  return professionals.map((professional) => ({
    fullName: professional.fullName,
    identificationType: isDni(professional.dniCuit)
      ? IdentificationType.DNI
      : IdentificationType.CUIT,
    dniCuit: professional.dniCuit,
    address: professional.address ?? '',
    cityRegistration: professional.cityRegistration ?? '',
    provinceRegistration: professional.provinceRegistration ?? '',
  }))
}

export function initializeForm(
  data: ProjectFindOneDto | ProjectCreateDto,
): ProjectFormValues {
  return {
    record: data.record,
    name: data.name ?? '',
    type: data.type,
    purpose: data.purpose,
    location: data.location ?? '',
    status: data.status ?? null,
    background: data.background ?? '',
    references: data.references ?? [],
    otherRequirements: data.otherRequirements ?? [],
    ownerEnabled: data.owner != null,
    owner: {
      dni: data.owner?.dni ?? '',
      fullName: data.owner?.fullName ?? '',
      address: data.owner?.address ?? '',
    },
    designers: initializeProfessionals(data.designers),
    technicalDirectors: initializeProfessionals(data.technicalDirectors),
  }
}
