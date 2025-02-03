import type { CropWithUrl } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useDeleteCropMutation() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
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
