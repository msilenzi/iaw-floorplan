import type { CropWithUrl } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getProjectCropsQueryKey } from './useProjectCropsQuery'
import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useDeleteCropMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { cropsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(cropId: string) {
      await cropsApi.remove(cropId)
      return cropId // Pasar el id eliminado a onSuccess
    },
    onSuccess(deletedId) {
      queryClient.setQueryData(
        getProjectCropsQueryKey(organizationId, projectId),
        (oldData: CropWithUrl[]) => filterDeletedCrop(deletedId, oldData),
      )

      queryClient.setQueryData(
        getResourceCropsQueryKey(organizationId, projectId, resourceId),
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
