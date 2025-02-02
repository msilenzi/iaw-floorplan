import { CropSpecialty } from '@Common/api'

export function displayCropSpecialty(specialty: CropSpecialty) {
  switch (specialty) {
    case CropSpecialty.Architecture:
      return 'arquitectura'
    case CropSpecialty.Electrical:
      return 'inst. eléctricas'
    case CropSpecialty.Other:
      return 'otros'
    case CropSpecialty.Sanitary:
      return 'inst. sanitarias'
    case CropSpecialty.Structure:
      return 'estructura'
    default:
      throw new Error('Invalid specialty')
  }
}
