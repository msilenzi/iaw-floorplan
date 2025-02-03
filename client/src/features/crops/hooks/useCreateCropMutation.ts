import type { CreateCrop } from '../types/CropForm.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useCreateCropMutation(projectId: string, resourceId: string) {
  const { cropsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({
      resourceId,
      file,
      name,
      specialty,
      scale,
      tags,
      dimensions,
    }: CreateCrop) {
      await cropsApi.create(
        resourceId,
        file,
        specialty,
        scale,
        JSON.stringify(dimensions),
        name,
        tags,
      )
    },
    onSuccess() {
      // TODO: invalidar project crops

      void queryClient.invalidateQueries({
        queryKey: getResourceCropsQueryKey(projectId, resourceId),
      })
    },
  })
}
