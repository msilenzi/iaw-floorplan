import type { CropDimensions, CropSpecialty } from '@Common/api'

export type CropFormValues = {
  name: string
  specialty: CropSpecialty | null
  scale: string
  tags: string[]
}

export type CreateCrop = {
  resourceId: string
  file: File
  dimensions: CropDimensions
  name: string
  specialty: CropSpecialty
  scale: string
  tags: string[]
}
