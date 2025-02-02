import type { CreateCrop } from '../types/CropForm.types'

import { useMutation } from '@tanstack/react-query'

import { useApi } from '@Common/api'

export function useCreateCropMutation() {
  const { cropsApi } = useApi()

  return useMutation({
    async mutationFn({
      resourceId,
      file,
      name,
      specialty,
      tags,
      dimensions,
    }: CreateCrop) {
      await cropsApi.create(
        resourceId,
        file,
        specialty,
        JSON.stringify(dimensions),
        name,
        tags,
      )
    },
    onSuccess() {
      console.log('crop created successfully')
      // TODO: invalidar project crops
      // TODO: invalidar resource crops
    },
  })
}
