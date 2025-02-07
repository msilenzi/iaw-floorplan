import type { CreateCrop } from '../types/CropForm.types'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useApi } from '@Common/api'
import { useCurrentOrganization } from '@Organization/context/CurrentOrganization'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'

import { getProjectCropsQueryKey } from './useProjectCropsQuery'
import { getResourceCropsQueryKey } from './useResourceCropsQuery'

export function useCreateCropMutation() {
  const { organizationId } = useCurrentOrganization()
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
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
      pageNumber,
    }: CreateCrop) {
      await cropsApi.create(
        resourceId,
        file,
        specialty,
        scale,
        JSON.stringify(dimensions),
        name,
        tags,
        pageNumber,
      )
    },
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getProjectCropsQueryKey(organizationId, projectId),
        exact: true,
      })

      void queryClient.invalidateQueries({
        queryKey: getResourceCropsQueryKey(
          organizationId,
          projectId,
          resourceId,
        ),
        exact: true,
      })
    },
  })
}
