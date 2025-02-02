import type { CropDimensions, CropSpecialty } from '@Common/api'

export type CropFormValues = {
  name: string
  specialty: CropSpecialty | null
  tags: string[]
}

export type CreateCrop = {
  resourceId: string
  file: File
  name: string
  specialty: CropSpecialty
  tags: string[]
  dimensions: CropDimensions
}
