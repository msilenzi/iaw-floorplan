import type { CropUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useEditCropMutation(
  projectId: string,
  resourceId: string,
  cropId: string,
) {
  const { cropsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: CropUpdateDto) {
      return (await cropsApi.update(cropId, data)).data
    },
    onSuccess() {
      // TODO: invalidar project crops

      void queryClient.invalidateQueries({
        queryKey: getResourceCropsQueryKey(projectId, resourceId),
      })
    },
  })
}
