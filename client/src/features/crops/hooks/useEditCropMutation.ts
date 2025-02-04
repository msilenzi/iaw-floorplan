import type { CropUpdateDto } from '@Common/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getProjectCropsQueryKey } from './useProjectCropsQuery'
import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useEditCropMutation(cropId: string) {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { cropsApi } = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: CropUpdateDto) {
      return (await cropsApi.update(cropId, data)).data
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getProjectCropsQueryKey(projectId),
      })

      void queryClient.invalidateQueries({
        queryKey: getResourceCropsQueryKey(projectId, resourceId),
      })
    },
  })
}
