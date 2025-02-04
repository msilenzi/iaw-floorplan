import type { CropWithUrl } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getProjectCropsQueryKey } from './useProjectCropsQuery'
import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useDeleteCropMutation() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { cropsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(cropId: string) {
      await cropsApi._delete(cropId)
      return cropId // Pasar el id eliminado a onSuccess
    },
    onSuccess(deletedId) {
      queryClient.setQueryData(
        getProjectCropsQueryKey(projectId),
        (oldData: CropWithUrl[]) => filterDeletedCrop(deletedId, oldData),
      )

      queryClient.setQueryData(
        getResourceCropsQueryKey(projectId, resourceId),
        (oldData: CropWithUrl[]) => filterDeletedCrop(deletedId, oldData),
      )
    },
  })
}

function filterDeletedCrop(
  deletedCropId: string,
  crops: CropWithUrl[] | undefined,
) {
  return crops?.filter(({ _id }) => _id !== deletedCropId)
}
