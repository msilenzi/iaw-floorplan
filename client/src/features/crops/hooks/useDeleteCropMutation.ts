import type { CropWithUrl } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'

import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useDeleteCropMutation(projectId: string, resourceId: string) {
  const { cropsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(cropId: string) {
      await cropsApi._delete(cropId)
      return cropId
    },
    onSuccess(deletedId) {
      console.log(getResourceCropsQueryKey(projectId, resourceId))
      console.log(
        queryClient.getQueryData(
          getResourceCropsQueryKey(projectId, resourceId),
        ),
      )

      queryClient.setQueryData(
        getResourceCropsQueryKey(projectId, resourceId),
        (oldData: CropWithUrl[]) => {
          console.log('setQueryData.oldData', oldData)
          return oldData.filter(({ _id }) => _id !== deletedId)
        },
      )
      // TODO: eliminar de projects
    },
  })
}
